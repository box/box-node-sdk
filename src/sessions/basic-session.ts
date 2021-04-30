/**
 * @fileoverview A Basic Box API Session.
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { Promise } from 'bluebird';

// ------------------------------------------------------------------------------
// Typedefs
// ------------------------------------------------------------------------------

type TokenManager = any /* FIXME */;
type TokenRequestOptions = Record<string, any> /*FIXME*/;

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

class BasicSession {
	_accessToken: string;
	_tokenManager: TokenManager;

	constructor(accessToken: string, tokenManager: TokenManager) {
		this._accessToken = accessToken;
		this._tokenManager = tokenManager;
	}

	/**
	 * Returns the clients access token. BasicSession never returns an error, since it doesn't
	 * know the status of its own token.
	 *
	 * @returns {Promise<string>} Promise resolving to the access token
	 */
	getAccessToken() {
		return Promise.resolve(this._accessToken);
	}

	/**
	 * Revokes the session's access token.
	 *
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise} Promise resolving if the revoke succeeds
	 */
	revokeTokens(options?: TokenRequestOptions) {
		return this._tokenManager.revokeTokens(this._accessToken, options);
	}

	/**
	 * Exchange the client access token for one with lower scope
	 * @param {string|string[]} scopes The scope(s) requested for the new token
	 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
	 * @param {Object} [options] - Optional parameters
	 * @param {TokenRequestOptions} [options.tokenRequestOptions] - Sets optional behavior for the token grant
	 * @param {ActorParams} [options.actor] - Optional actor parameters for creating annotator tokens
	 * @returns {Promise<TokenInfo>} Promise resolving to the new token info
	 */
	exchangeToken(
		scopes: string | string[],
		resource?: string,
		options?: {
			tokenRequestOptions?: TokenRequestOptions;
			actor?: any /* FIXME */;
		}
	) {
		return this._tokenManager.exchangeToken(
			this._accessToken,
			scopes,
			resource,
			options
		);
	}
}

/**
 * @module box-node-sdk/lib/sessions/basic-session
 * @see {@Link BasicSession}
 */
export = BasicSession;
