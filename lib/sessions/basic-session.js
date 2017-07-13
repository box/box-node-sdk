/**
 * @fileoverview A Basic Box API Session.
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A BasicSession holds only a single accessToken. It has no idea how to authenticate,
 * refresh, or persist its token information. When that token expires, the session
 * and any clients using it will become useless.
 *
 * Basic API Session is the most simple API Session to use, which makes it a good choice
 * for simple applications, developers who are just getting started, and applications
 * that wish to manage tokens themselves.
 *
 * @param {string} accessToken The existing access token for a user
 * @param {TokenManager} tokenManager The token manager
 * @constructor
 */
function BasicSession(accessToken, tokenManager) {
	// An Access Token
	this._accessToken = accessToken;
	this.tokenManager = tokenManager;
}

/**
 * Returns the clients access token. BasicSession never returns an error, since it doesn't
 * know the status of it's own token.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {UpdateTokensCallback} callback Called on completion with valid access token or error
 * @returns {void}
 */
BasicSession.prototype.getAccessToken = function(options, callback) {
	callback(null, this._accessToken);
};

/**
 * Revokes the session's access token.
 *
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called after tokens have been revoked
 * @returns {void}
 */
BasicSession.prototype.revokeTokens = function(options, callback) {
	this.tokenManager.revokeTokens(this._accessToken, options, callback);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {?string} resource The absolute URL of an API resource to scope the new token to
 * @param {?TokenRequestOptions} options - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} callback Called with the new token
 * @returns {void}
 */
BasicSession.prototype.exchangeToken = function(scopes, resource, options, callback) {
	this.tokenManager.exchangeToken(this._accessToken, scopes, resource, options, callback);
};

/**
 * @module box-node-sdk/lib/sessions/basic-session
 * @see {@Link BasicSession}
 */
module.exports = BasicSession;
