/**
 * @fileoverview App Auth Box API Session.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const Promise = require('bluebird');

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
	this._type = type;
	this._id = id;
	this._config = config;
	this._tokenManager = tokenManager;

	// The TokenInfo object for this app auth session
	this._tokenInfo = null;

	// Indicates if tokens are currently being refreshed
	this._refreshPromise = null;
}

/**
 * Initiate a refresh of the app auth access tokens. New tokens should be passed
 * to the caller, and then cached for later use.
 *
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<string>} Promise resolving to the access token
 * @private
 */
AppAuthSession.prototype._refreshAppAuthAccessToken = function(options) {

	// If tokens aren't already being refreshed, start the refresh
	if (!this._refreshPromise) {

		this._refreshPromise = this._tokenManager.getTokensJWTGrant(this._type, this._id, options)
			.then(tokenInfo => {
				// Set new token info and propagate the new access token
				this._tokenInfo = tokenInfo;
				return tokenInfo.accessToken;
			})
			.finally(() => {
				// Refresh complete, clear promise
				this._refreshPromise = null;
			});
	}

	return this._refreshPromise;
};

/**
 * Produces a valid, app auth access token.
 * Performs a refresh before returning if the current token is expired. If the current
 * token is considered stale but still valid, return the current token but initiate a
 * new refresh in the background.
 *
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<string>} Promise resolving to the access token
 */
AppAuthSession.prototype.getAccessToken = function(options) {
	// If the current token is not fresh, get a new token. All incoming
	// requests will be held until a fresh token is retrieved.
	var expirationBuffer = Math.max(this._config.expiredBufferMS, this._config.staleBufferMS);
	if (!this._tokenInfo || !this._tokenManager.isAccessTokenValid(this._tokenInfo, expirationBuffer)) {
		return this._refreshAppAuthAccessToken(options);
	}

	// Your token is not currently stale! Return the current access token.
	return Promise.resolve(this._tokenInfo.accessToken);
};

/**
 * Revokes the app auth token used by this session, and clears the saved tokenInfo.
 *
 * @param {TokenRequestOptions} [options]- Sets optional behavior for the token grant
 * @returns {Promise} Promise resolving if the revoke succeeds
 */
AppAuthSession.prototype.revokeTokens = function(options) {
	// The current app auth token is revoked (but a new one will be created automatically as needed).
	var tokenInfo = this._tokenInfo || {},
		accessToken = tokenInfo.accessToken;
	this._tokenInfo = null;
	return this._tokenManager.revokeTokens(accessToken, options);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<TokenInfo>} Promise resolving to the new token info
 */
AppAuthSession.prototype.exchangeToken = function(scopes, resource, options) {
	return this.getAccessToken(options)
		.then(accessToken => this._tokenManager.exchangeToken(accessToken, scopes, resource, options));
};

/**
 * @module box-node-sdk/lib/sessions/app-auth-session
 * @see {@Link AppAuthSession}
 */
module.exports = AppAuthSession;
