/**
 * @fileoverview An Anonymous Box API Session.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var CallbackQueue = require('../util/lazy-async-queue');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * An Anonymous Box API Session.
 *
 * The Anonymous API Session holds a Client Credentials accessToken, which it
 * returns to the client so that it may make calls on behalf of anonymous users.
 *
 * Anonymous tokens will be refreshed in the background if a request is made within the
 * "stale buffer" (defaults to 10 minutes before the token is set to expire).
 * If the token is also expired, all incoming requests will be held until a fresh token
 * is retrieved.
 *
 * @param {Config} config The SDK configuration options
 * @param {TokenManager} tokenManager The TokenManager
 * @constructor
 */
function AnonymousSession(config, tokenManager) {
	this._config = config;
	this.tokenManager = tokenManager;

	// The TokenInfo object for this anonymous session
	this.tokenInfo = null;

	// Queue of all callbacks waiting for a fresh token
	this._upkeepQueue = new CallbackQueue();

	// Indicates if tokens are currently being refreshed
	this._isRefreshingTokens = false;
}

/**
 * Initiate a refresh of the anonymous access tokens. New tokens should be passed to the
 * callback, and then cached for later use.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 * @private
 */
AnonymousSession.prototype._refreshAnonymousAccessToken = function(options, callback) {
	// If tokens are already being refreshed, push the callback into the queue
	// to be called when refresh is complete.
	if (this._isRefreshingTokens) {
		if (callback) {
			this._upkeepQueue.push(callback);
		}
		return;
	}

	// Initiate a refresh
	callback = callback || function() {};
	this._isRefreshingTokens = true;
	var self = this;
	this.tokenManager.getTokensClientCredentialsGrant(options, function(err, tokenInfo) {

		// Refresh complete, set status to false
		self._isRefreshingTokens = false;

		// Propagate an error
		if (err) {
			self._upkeepQueue.flush(err);
			callback(err);
			return;
		}

		// Set new token info and propagate the new access token
		self.tokenInfo = tokenInfo;
		self._upkeepQueue.flush(null, tokenInfo.accessToken);
		callback(null, tokenInfo.accessToken);
	});
};

/**
 * Returns a valid, anonymous access token to the callback.
 * Performs a refresh before returning if the current token is expired. If the current
 * token is considered stale but still valid, return the current token but initiate a
 * new refresh in the background.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {UpdateTokensCallback} callback Called on completion with valid access token or error
 * @returns {void}
 */
AnonymousSession.prototype.getAccessToken = function(options, callback) {
	// If the current token is expired, get a new token. All incoming
	// requests will be held until a fresh token is retrieved.
	if (!this.tokenInfo || !this.tokenManager.isAccessTokenValid(this.tokenInfo, this._config.expiredBufferMS)) {
		this._refreshAnonymousAccessToken(options, callback);
		return;
	}

	// If the current token is getting stale, fire off a refresh in the background. We still return the
	// current, valid access token below.
	// A token object is considered stale before it expires, usually in the range of a few minutes.
	// This gives the session a chance to optimistically refresh the session's tokens in the background without
	// holding up the user request.
	if (!this.tokenManager.isAccessTokenValid(this.tokenInfo, this._config.staleBufferMS)) {
		this._refreshAnonymousAccessToken(options);
	}

	// Your token is not currently stale! Return the current access token.
	callback(null, this.tokenInfo.accessToken);
};

/**
 * Revokes the anonymous token used by this anonymous session, and clears the saved tokenInfo.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called after tokens have been revoked
 * @returns {void}
 */
AnonymousSession.prototype.revokeTokens = function(options, callback) {
	// The current anonymous token is revoked (but a new one will be created automatically as needed).
	var tokenInfo = this.tokenInfo || {},
		accessToken = tokenInfo.accessToken;
	this.tokenInfo = null;
	this.tokenManager.revokeTokens(accessToken, options, callback);
};

/**
 * Return the anonymous session token, since there is no need to downscope a
 * token that does not have any associated user credentials.
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {?string} resource The absolute URL of an API resource to scope the new token to
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called with the session token
 * @returns {void}
 */
AnonymousSession.prototype.exchangeToken = function(scopes, resource, options, callback) {
	var self = this;

	// We need to get the access token, in case it hasn't been generated yet
	this.getAccessToken(options, function(err) {

		if (err) {
			callback(err);
			return;
		}

		// Pass back the entire token info object, not just the acces token,
		// to maintain parity with the other session classes
		callback(null, self.tokenInfo);
	});
};

/**
 * @module box-node-sdk/lib/sessions/anonymous-session
 * @see {@Link AnonymousSession}
 */
module.exports = AnonymousSession;
