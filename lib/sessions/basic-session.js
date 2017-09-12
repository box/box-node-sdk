/**
 * @fileoverview A Basic Box API Session.
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const Promise = require('bluebird');

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
	this._accessToken = accessToken;
	this._tokenManager = tokenManager;
}

/**
 * Returns the clients access token. BasicSession never returns an error, since it doesn't
 * know the status of its own token.
 *
 * @returns {Promise<string>} Promise resolving to the access token
 */
BasicSession.prototype.getAccessToken = function() {
	return Promise.resolve(this._accessToken);
};

/**
 * Revokes the session's access token.
 *
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise} Promise resolving if the revoke succeeds
 */
BasicSession.prototype.revokeTokens = function(options) {
	return this._tokenManager.revokeTokens(this._accessToken, options);
};

/**
 * Exchange the client access token for one with lower scope
 * @param {string|string[]} scopes The scope(s) requested for the new token
 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
 * @returns {Promise<TokenInfo>} Promise resolving to the new token info
 */
BasicSession.prototype.exchangeToken = function(scopes, resource, options) {
	return this._tokenManager.exchangeToken(this._accessToken, scopes, resource, options);
};

/**
 * @module box-node-sdk/lib/sessions/basic-session
 * @see {@Link BasicSession}
 */
module.exports = BasicSession;
