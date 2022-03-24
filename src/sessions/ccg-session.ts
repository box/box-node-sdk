/**
 * @fileoverview An Anonymous Box API Session.
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { Promise } from 'bluebird';

// ------------------------------------------------------------------------------
// Typedefs
// ------------------------------------------------------------------------------

type Config = any /* FIXME */;
type TokenManager = any /* FIXME */;
type TokenInfo = any /* FIXME */;
type TokenRequestOptions = any /* FIXME */;

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * The Client Credentials Grant Box API Session.
 *
 * The Client Credentials Grant API Session holds a Client Credentials accessToken, which it
 * returns to the client so that it may make calls on behalf of service account or specified users.
 *
 * Tokens will be refreshed in the background if a request is made within the
 * "stale buffer" (defaults to 10 minutes before the token is set to expire).
 * If the token is also expired, all incoming requests will be held until a fresh token
 * is retrieved.
 *
 * @param {Config} config The SDK configuration options
 * @param {TokenManager} tokenManager The TokenManager
 * @constructor
 */
class CCGSession {
	_config: Config;
	_tokenManager: TokenManager;
	_tokenInfo: TokenInfo;
	_refreshPromise: Promise<any> | null;

	constructor(config: Config, tokenManager: TokenManager) {
		this._config = config;
		this._tokenManager = tokenManager;

		// The TokenInfo object for this anonymous session
		this._tokenInfo = null;

		this._refreshPromise = null;
	}

	/**
	 * Initiate a refresh of the access tokens. New tokens should be passed to the
	 * caller, and then cached for later use.
	 *
	 * @param {?TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<string>} Promise resolving to the access token
	 * @private
	 */
	_refreshAccessToken(options?: TokenRequestOptions) {
		// If tokens aren't already being refreshed, start the refresh
		if (!this._refreshPromise) {
			// Initiate a refresh
			this._refreshPromise = this._tokenManager
				.getTokensClientCredentialsGrant(options)
				.then((tokenInfo: TokenInfo) => {
					// Set new token info and propagate the new access token
					this._tokenInfo = tokenInfo;
					return tokenInfo.accessToken;
				})
				.finally(() => {
					// Refresh complete, clear promise
					this._refreshPromise = null;
				});
		}

		return this._refreshPromise as Promise<any>;
	}

	/**
	 * Produces a valid, anonymous access token.
	 * Performs a refresh before returning if the current token is expired. If the current
	 * token is considered stale but still valid, return the current token but initiate a
	 * new refresh in the background.
	 *
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<string>} Promise resolving to the access token
	 */
	getAccessToken(options?: TokenRequestOptions) {
		// If the current token is no longer fresh, get a new token. All incoming
		// requests will be held until a fresh token is retrieved.
		var expirationBuffer = Math.max(
			this._config.expiredBufferMS,
			this._config.staleBufferMS
		);
		if (
			!this._tokenInfo ||
			!this._tokenManager.isAccessTokenValid(this._tokenInfo, expirationBuffer)
		) {
			return this._refreshAccessToken(options);
		}

		// Your token is not currently stale! Return the current access token.
		return Promise.resolve(this._tokenInfo.accessToken);
	}

	/**
	 * Revokes the anonymous token used by this anonymous session, and clears the saved tokenInfo.
	 *
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise} Promise resolving if the revoke succeeds
	 */
	revokeTokens(options?: TokenRequestOptions) {
		// The current anonymous token is revoked (but a new one will be created automatically as needed).
		var tokenInfo = this._tokenInfo || {},
			accessToken = tokenInfo.accessToken;
		this._tokenInfo = null;
		return this._tokenManager.revokeTokens(accessToken, options);
	}

	/**
	 * Exchange the client access token for one with lower scope
	 *
	 * @param {string|string[]} scopes The scope(s) requested for the new token
	 * @param {string} [resource] The absolute URL of an API resource to scope the new token to
	 * @param {Object} [options] - Optional parameters
	 * @param {TokenRequestOptions} [options.tokenRequestOptions] - Sets optional behavior for the token grant
	 * @returns {void}
	 */
	exchangeToken(
		scopes: string | string[],
		resource?: string,
		options?: {
			tokenRequestOptions?: TokenRequestOptions;
		}
	) {
		// We need to get the access token, in case it hasn't been generated yet
		return this.getAccessToken(options).then((accessToken) =>
			this._tokenManager.exchangeToken(accessToken, scopes, resource, options)
		);
	}
}

/**
 * @module box-node-sdk/lib/sessions/ccg-session
 * @see {@Link CCGSession}
 */
export = CCGSession;
