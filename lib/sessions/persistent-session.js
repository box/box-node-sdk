/**
 * @fileoverview A Persistent Box API Session.
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('assert'),
	CallbackQueue = require('../util/lazy-async-queue'),
	errors = require('../util/errors'),
	httpStatusCodes = require('http-status');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Validate that an object is a valid TokenInfo object
 *
 * @param {Object} obj The object to validate
 * @returns {boolean} True if the passed in object is a valid TokenInfo object that
 *  has all the expected properties, false otherwise
 * @private
 */
function isObjectValidTokenInfo(obj) {
	return !!(obj &&
		obj.accessToken &&
		obj.refreshToken &&
		obj.accessTokenTTLMS &&
		obj.acquiredAtMS);
}

/**
 * Validate that an object is a valid TokenStore object
 *
 * @param {Object} obj the object to validate
 * @returns {boolean} returns true if the passed in object is a valid TokenStore object that
 * has all the expected properties. false otherwise.
 * @private
 */
function isObjectValidTokenStore(obj) {
	return !!(obj && obj.read && obj.write && obj.clear);
}


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A Persistent API Session has the ability to refresh its access token once it becomes expired.
 * It takes in a full tokenInfo object for authentication. It can detect when its tokens have
 * expired and will request new, valid tokens if needed. It can also interface with a token
 * data-store if one is provided.
 *
 * Persistent API Session a good choice for long-running applications or web servers that
 * must remember users across sessions.
 *
 * @param {TokenInfo} tokenInfo A valid TokenInfo object. Will throw if improperly formatted.
 * @param {TokenStore} [tokenStore] A valid TokenStore object. Will throw if improperly formatted.
 * @param {Config} config The SDK configuration options
 * @param {TokenManager} tokenManager The token manager
 * @constructor
 */
function PersistentSession(tokenInfo, tokenStore, config, tokenManager) {
	this._config = config;
	this.tokenManager = tokenManager;

	// Contains client requests which are waiting for an existing client request to finish refreshing tokens.
	// For example: client request 1 begins initializing tokens - calls to Box to get tokens.
	// At the same time, client request 2 executes. It should not also get tokens from Box - instead, the request is
	// adds a callback to this array. When client request 1 finishes getting tokens from Box, it will flush
	// this queue by invoking all callbacks. This will allow client request 2 to proceed, guaranteed to have tokens.
	this._upkeepQueue = new CallbackQueue();

	// Set default properties
	this._isRefreshingTokens = false;

	// Set valid PersistentSession credentials. Throw if expected credentials are invalid or not given.
	assert(isObjectValidTokenInfo(tokenInfo), 'tokenInfo is improperly formatted. Properties required: accessToken, refreshToken, accessTokenTTLMS and acquiredAtMS.');
	this._setTokenInfo(tokenInfo);

	// If tokenStore was provided, set the persistent data & current store operations
	if (tokenStore) {
		assert(isObjectValidTokenStore(tokenStore), 'Token store provided but is improperly formatted. Methods required: read(), write(), clear().');
		this._tokenStore = tokenStore;
	}
}

/**
 * Sets all relevant token info for this client.
 *
 * @param {TokenInfo} tokenInfo A valid TokenInfo object.
 * @returns {void}
 * @private
 */
PersistentSession.prototype._setTokenInfo = function(tokenInfo) {
	this._tokenInfo = {
		accessToken: tokenInfo.accessToken,
		refreshToken: tokenInfo.refreshToken,
		accessTokenTTLMS: tokenInfo.accessTokenTTLMS,
		acquiredAtMS: tokenInfo.acquiredAtMS
	};
};

/**
 * Finishes the token refresh. If given error, refresh lock is released, and an err is propagated
 * to all waiting callbacks. Otherwise, the lock is released, and the new token is propagated to
 * all waiting callbacks.
 *
 * @param {?Error} err An error, if one occurred. Null if refresh was successful.
 * @param {TokenInfo} tokenInfo A valid TokenInfo object.
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 * @private
 */
PersistentSession.prototype._finishTokenRefresh = function(err, tokenInfo, callback) {
	this._isRefreshingTokens = false;

	// Handle Error
	if (err) {
		this.handleExpiredTokensError(err, callback);
		return;
	}

	// Set and propagate the new access token
	this._setTokenInfo(tokenInfo);
	this._upkeepQueue.flush(null, tokenInfo.accessToken);
	callback(null, tokenInfo.accessToken);
};

/**
 * Attempts to refresh tokens for the client.
 * Will use the Box refresh token grant to complete the refresh. On refresh failure, we'll
 * check the token store for more recently updated tokens and load them if found. Otherwise
 * an error will be propagated.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 * @private
 */
PersistentSession.prototype._refreshTokens = function(options, callback) {
	var self = this;

	// If this client is already in the process of refreshing tokens, we don't want to initiate another refresh.
	// Add the callback (if any) to the update queue to be called later with the fresh access token.
	if (this._isRefreshingTokens) {
		if (callback) {
			this._upkeepQueue.push(callback);
		}
		return;
	}

	// Otherwise, kick off a token refresh request and set a lock so that additional
	// client requests don't try as well. Set a missing callback to an empty function
	// so that we don't get any errors from calling undefined as a function.
	callback = callback || function() {};
	this._isRefreshingTokens = true;
	this.tokenManager.getTokensRefreshGrant(this._tokenInfo.refreshToken, options, function(err, tokenInfo) {

		// Handle any errors from refreshing the token
		if (err) {

			// If we got an error response from Box API, but it was 400 invalid_grant, it indicates we may have just
			// made the request with an invalidated refresh token. Since only a max of 2 refresh tokens can be valid
			// at any point in time, and a horizontally scaled app could have multiple Node instances running in parallel,
			// it is possible to hit cases where too many servers all refresh a user's tokens at once
			// and cause this server's token to become invalidated. However, the user should still be alive, but
			// we'll need to check the central data store for the latest valid tokens that some other server in the app
			// cluster would have received. So, instead pull tokens from the central store and attempt to use them.
			if (err.statusCode === httpStatusCodes.BAD_REQUEST && self._tokenStore) {
				var invalidGrantError = err;

				// Check the tokenStore to see if tokens have been updated recently. If they have, then another
				// instance of the session may have already refreshed the user tokens, which would explain why
				// we couldn't refresh.
				self._tokenStore.read(function(storeErr, storeTokenInfo) {

					// If there was an error getting from the app's central store, propagate a permanent error.
					// This should only happen if the central store itself failed (ex: DB is unreachable) or if
					// the database contains nothing in the store.
					if (storeErr) {
						self._finishTokenRefresh(storeErr, null, callback);
						return;
					}

					// if the tokens we got from the central store are the same as the tokens we made the failed request with
					// already, then we can be sure that no other servers have valid tokens for this server either.
					// Thus, this user truly has an expired refresh token. So, propagate an "Expired Tokens" error.
					if (!storeTokenInfo || storeTokenInfo.refreshToken === self._tokenInfo.refreshToken) {
						var expiredTokensError = errors.buildExpiredAuthError(invalidGrantError.response);
						self._finishTokenRefresh(expiredTokensError, null, callback);
						return;
					}

					// Propogate the fresh tokens that we found in the session
					self._finishTokenRefresh(null, storeTokenInfo, callback);
				});
				return;
			}

			// Box API returned a permanent error that is not retryable and we can't recover.
			// We have no usable tokens for the user and no way to refresh them - propagate a permanent error.
			self._finishTokenRefresh(err, null, callback);
			return;
		}

		// Success! We got back a TokenInfo object from the API.
		// If we have a token store, we'll write it there now before finishing up the request.
		if (self._tokenStore) {
			self._tokenStore.write(tokenInfo, function(storeErr) {
				// Propagate any error that might have occurred on write with the tokenInfo
				self._finishTokenRefresh(storeErr, tokenInfo, callback);
			});
		} else {
			// If no token store, Set and propagate the access token immediately
			self._finishTokenRefresh(null, tokenInfo, callback);
		}
	});
};


// ------------------------------------------------------------------------------
// Public Instance
// ------------------------------------------------------------------------------

/**
 * Returns the clients access token.
 *
 * If tokens don't yet exist, first attempt to retrieve them.
 * If tokens are expired, first attempt to refresh them.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 */
PersistentSession.prototype.getAccessToken = function(options, callback) {
	// If our tokens are expired, we need to refresh them before passing the access token to the callback
	if (!this.tokenManager.isAccessTokenValid(this._tokenInfo, this._config.expiredBufferMS)) {
		this._refreshTokens(options, callback);
		return;
	}

	// If our tokens are getting stale, fire off a refresh in the background. We can still return the current
	// valid access token below.
	// A token object is considered stale before it is considered expired, usually in the range of a few minutes.
	// This gives the session a chance to optimistically refresh the session's tokens in the background without
	// holding up a user request.
	if (!this.tokenManager.isAccessTokenValid(this._tokenInfo, this._config.staleBufferMS)) {
		this._refreshTokens(options);
	}

	// Current access token is still valid. Return it.
	callback(null, this._tokenInfo.accessToken);
};

/**
 * Revokes the session's tokens. If the session has a refresh token we'll use that,
 * since it is more likely to be up to date. Otherwise, we'll revoke the accessToken.
 * Revoking either one will disable the other as well.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called after tokens have been revoked
 * @returns {void}
 */
PersistentSession.prototype.revokeTokens = function(options, callback) {
	var revokeToken = this._tokenInfo.refreshToken;
	this.tokenManager.revokeTokens(revokeToken, options, callback);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {?string} resource The absolute URL of an API resource to scope the new token to
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called with the new token
 * @returns {void}
 */
PersistentSession.prototype.exchangeToken = function(scopes, resource, options, callback) {
	var self = this;
	this.getAccessToken(options, function(err, accessToken) {

		if (err) {
			callback(err);
			return;
		}

		self.tokenManager.exchangeToken(accessToken, scopes, resource, options, callback);
	});
};

/**
 * Handle an an "Expired Tokens" Error. If our tokens are expired, we need to clear the token
 * store (if present) before continuing.
 *
 * @param {?Errors~ExpiredTokensError} err An "expired tokens" error including information
 *  about the request/response.
 * @param {Function} callback called with the results of the response handling. This will
 *  usually be the original response error, but could an error from trying to access the
 *  token store as well.
 * @returns {void}
 */
PersistentSession.prototype.handleExpiredTokensError = function(err, callback) {
	// No token store, so just call the callback
	if (!this._tokenStore) {
		this._upkeepQueue.flush(err);
		callback(err);
		return;
	}

	var self = this;
	// Otherwise, call the clear method to delete the old tokens from the store
	this._tokenStore.clear(function(clearError) {
		var returnError = clearError || err;
		self._upkeepQueue.flush(returnError);
		callback(returnError);
	});
};

/**
 * @module box-node-sdk/lib/sessions/persistent-session
 * @see {@Link PersistentSession}
 */
module.exports = PersistentSession;
