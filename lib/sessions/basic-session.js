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
 * @param {UpdateTokensCallback} [callback] Called on completion with valid access token or error
 * @returns {void}
 */
BasicSession.prototype.getAccessToken = function(callback) {
	callback(null, this._accessToken);
};

/**
 * Revokes the session's access token.
 *
 * @param {Function} callback Called after tokens have been revoked
 * @returns {void}
 */
BasicSession.prototype.revokeTokens = function(callback) {
	this.tokenManager.revokeTokens(this._accessToken, callback);
};


/**
 * @module box-node-sdk/lib/sessions/basic-session
 * @see {@Link BasicSession}
 */
module.exports = BasicSession;
