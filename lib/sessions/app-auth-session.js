/**
 * @fileoverview App Auth Box API Session.
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
 * App Auth Box API Session.
 *
 * The App Auth API Session holds an accessToken for an app user or enterprise,
 * which it returns to the client so that it may make calls on behalf of
 * these entities.
 *
 * These access tokens will be refreshed in the background if a request is made within the
 * "stale buffer" (defaults to 10 minutes before the token is set to expire).
 * If the token is also expired, all incoming requests will be held until a fresh token
 * is retrieved.
 *
 * @param {string} type The type of the entity to authenticate the app auth session as, "user" or "enterprise"
 * @param {string} id The Box ID of the entity to authenticate as
 * @param {Config} config The SDK configuration options
 * @param {TokenManager} tokenManager The TokenManager
 * @constructor
 */
function AppAuthSession(type, id, config, tokenManager) {
	this.type = type;
	this.id = id;
	this._config = config;
	this.tokenManager = tokenManager;

	// The TokenInfo object for this app auth session
	this.tokenInfo = null;

	// Queue of all callbacks waiting for a fresh token
	this.upkeepQueue = new CallbackQueue();

	// Indicates if tokens are currently being refreshed
	this.isRefreshingTokens = false;
}

/**
 * Initiate a refresh of the app auth access tokens. New tokens should be passed
 * to the callback, and then cached for later use.
 *
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 * @private
 */
AppAuthSession.prototype._refreshAppAuthAccessToken = function(callback) {

	// If tokens are already being refreshed, push the callback into the queue
	// to be called when refresh is complete.
	if (this.isRefreshingTokens) {
		if (callback) {
			this.upkeepQueue.push(callback);
		}
		return;
	}

	// Initiate a refresh
	callback = callback || function() {};
	this.isRefreshingTokens = true;
	var self = this;
	this.tokenManager.getTokensJWTGrant(this.type, this.id, function(err, tokenInfo) {

		// Refresh complete, set status to false
		self.isRefreshingTokens = false;

		// Propagate an error
		if (err) {
			self.upkeepQueue.flush(err);
			callback(err);
			return;
		}

		// Set new token info and propagate the new access token
		self.tokenInfo = tokenInfo;
		self.upkeepQueue.flush(null, tokenInfo.accessToken);
		callback(null, tokenInfo.accessToken);
	});
};

/**
 * Returns a valid, app auth access token to the callback.
 * Initiates a refresh before returning if the current token is expired. If the current
 * token is considered stale but still valid, return the current token but initiate a
 * new refresh in the background.
 *
 * @param {UpdateTokensCallback} callback Called on completion with valid access token or error
 * @returns {void}
 */
AppAuthSession.prototype.getAccessToken = function(callback) {

	// If the current token is completly expired, get a new token. All incoming
	// requests will be held until a fresh token is retrieved.
	if (!this.tokenInfo || !this.tokenManager.isAccessTokenValid(this.tokenInfo, this._config.expiredBufferMS)) {
		this._refreshAppAuthAccessToken(callback);
		return;
	}

	// If the current token is are getting stale, fire off a refresh in the background. We can still return the
	// current, valid access token below.
	// A token object is considered stale before its considered expired, usually in the range of a few minutes.
	// This gives the session a chance to optomistically refresh the session's tokens in the background without
	// holding up the user request.
	if (!this.tokenManager.isAccessTokenValid(this.tokenInfo, this._config.staleBufferMS)) {
		this._refreshAppAuthAccessToken();
	}

	// Your token is not currently stale! Return the current access token.
	callback(null, this.tokenInfo.accessToken);
};

/**
 * Revokes the app auth token used by this sessions, and clears the saved tokenInfo.
 *
 * @param {Function} callback Called after tokens have been revoked
 * @returns {void}
 */
AppAuthSession.prototype.revokeTokens = function(callback) {
	// @TODO(fschott) 2014-04-03: Clarify the full anonymous revoke flow. Currently this token
	// will be revoked, but then a new one will be gotten on the next call by any anonymous
	// session. Is that correct? Should this session be manually shut down as well to prevent
	// it from calling with the new tokens? Should anything happen globally? (probably not).
	var tokenInfo = this.tokenInfo || {},
		accessToken = tokenInfo.accessToken;
	this.tokenInfo = null;
	this.tokenManager.revokeTokens(accessToken, callback);
};


/**
 * @module box-node-sdk/lib/sessions/app-auth-session
 * @see {@Link AppAuthSession}
 */
module.exports = AppAuthSession;
