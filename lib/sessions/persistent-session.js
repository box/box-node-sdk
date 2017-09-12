/**
 * @fileoverview A Persistent Box API Session.
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const assert = require('assert'),
	Promise = require('bluebird'),
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
	this._tokenManager = tokenManager;

	// Keeps track of if tokens are currently being refreshed
	this._refreshPromise = null;

	// Set valid PersistentSession credentials. Throw if expected credentials are invalid or not given.
	assert(isObjectValidTokenInfo(tokenInfo), 'tokenInfo is improperly formatted. Properties required: accessToken, refreshToken, accessTokenTTLMS and acquiredAtMS.');
	this._setTokenInfo(tokenInfo);

	// If tokenStore was provided, set the persistent data & current store operations
	if (tokenStore) {
		assert(isObjectValidTokenStore(tokenStore), 'Token store provided but is improperly formatted. Methods required: read(), write(), clear().');
		this._tokenStore = Promise.promisifyAll(tokenStore);
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
 * Attempts to refresh tokens for the client.
 * Will use the Box refresh token grant to complete the refresh. On refresh failure, we'll
 * check the token store for more recently updated tokens and load them if found. Otherwise
 * an error will be propagated.
 *
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<string>} Promise resolving to the access token
 * @private
 */
PersistentSession.prototype._refreshTokens = function(options) {
	// If not already refreshing, kick off a token refresh request and set a lock so that additional
	// client requests don't try as well
	if (!this._refreshPromise) {

		this._refreshPromise = this._tokenManager.getTokensRefreshGrant(this._tokenInfo.refreshToken, options)
			.catch(err => {
				// If we got an error response from Box API, but it was 400 invalid_grant, it indicates we may have just
				// made the request with an invalidated refresh token. Since only a max of 2 refresh tokens can be valid
				// at any point in time, and a horizontally scaled app could have multiple Node instances running in parallel,
				// it is possible to hit cases where too many servers all refresh a user's tokens at once
				// and cause this server's token to become invalidated. However, the user should still be alive, but
				// we'll need to check the central data store for the latest valid tokens that some other server in the app
				// cluster would have received. So, instead pull tokens from the central store and attempt to use them.
				if (err.statusCode === httpStatusCodes.BAD_REQUEST && this._tokenStore) {
					var invalidGrantError = err;

					// Check the tokenStore to see if tokens have been updated recently. If they have, then another
					// instance of the session may have already refreshed the user tokens, which would explain why
					// we couldn't refresh.
					return this._tokenStore.readAsync()
						.catch(e => errors.unwrapAndThrow(e))
						.then(storeTokenInfo => {
							// if the tokens we got from the central store are the same as the tokens we made the failed request with
							// already, then we can be sure that no other servers have valid tokens for this server either.
							// Thus, this user truly has an expired refresh token. So, propagate an "Expired Tokens" error.
							if (!storeTokenInfo || storeTokenInfo.refreshToken === this._tokenInfo.refreshToken) {
								throw errors.buildExpiredAuthError(invalidGrantError.response);
							}

							// Propagate the fresh tokens that we found in the session
							return storeTokenInfo;
						});
				}

				// Box API returned a permanent error that is not retryable and we can't recover.
				// We have no usable tokens for the user and no way to refresh them - propagate a permanent error.
				throw err;
			})
			.then(tokenInfo => {
				// Success! We got back a TokenInfo object from the API.
				// If we have a token store, we'll write it there now before finishing up the request.
				if (this._tokenStore) {
					return this._tokenStore.writeAsync(tokenInfo)
						.catch(e => errors.unwrapAndThrow(e))
						.then(() => tokenInfo);
				}

				// If no token store, Set and propagate the access token immediately
				return tokenInfo;
			})
			.then(tokenInfo => {
				// Set and propagate the new access token
				this._setTokenInfo(tokenInfo);
				return tokenInfo.accessToken;
			})
			.catch(err => this.handleExpiredTokensError(err))
			.finally(() => {
				// Refresh complete, clear promise
				this._refreshPromise = null;
			});
	}

	return this._refreshPromise;
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
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<string>} Promise resolving to the access token
 */
PersistentSession.prototype.getAccessToken = function(options) {
	// If our tokens are not fresh, we need to refresh them
	var expirationBuffer = Math.max(this._config.expiredBufferMS, this._config.staleBufferMS);
	if (!this._tokenManager.isAccessTokenValid(this._tokenInfo, expirationBuffer)) {
		return this._refreshTokens(options);
	}

	// Current access token is still valid. Return it.
	return Promise.resolve(this._tokenInfo.accessToken);
};

/**
 * Revokes the session's tokens. If the session has a refresh token we'll use that,
 * since it is more likely to be up to date. Otherwise, we'll revoke the accessToken.
 * Revoking either one will disable the other as well.
 *
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise} Promise that resolves when the revoke succeeds
 */
PersistentSession.prototype.revokeTokens = function(options) {
	return this._tokenManager.revokeTokens(this._tokenInfo.refreshToken, options);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {void}
 */
PersistentSession.prototype.exchangeToken = function(scopes, resource, options) {

	return this.getAccessToken(options)
		.then(accessToken => this._tokenManager.exchangeToken(accessToken, scopes, resource, options));
};

/**
 * Handle an an "Expired Tokens" Error. If our tokens are expired, we need to clear the token
 * store (if present) before continuing.
 *
 * @param {Errors~ExpiredTokensError} err An "expired tokens" error including information
 *  about the request/response.
 * @returns {Promise<Error>} Promise resolving to an error.  This will
 *  usually be the original response error, but could an error from trying to access the
 *  token store as well.
 */
PersistentSession.prototype.handleExpiredTokensError = function(err) {

	if (!this._tokenStore) {
		return Promise.resolve(err);
	}

	// If a token store is available, clear the store and throw either error
	return this._tokenStore.clearAsync()
		.catch(e => errors.unwrapAndThrow(e))
		.then(() => {
			throw err;
		});
};

/**
 * @module box-node-sdk/lib/sessions/persistent-session
 * @see {@Link PersistentSession}
 */
module.exports = PersistentSession;
