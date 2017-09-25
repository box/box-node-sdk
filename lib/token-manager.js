/**
 * @fileoverview Token Manager
 */

'use strict';

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * Token request options. Set by the consumer to add/modify the params sent to the
 * request.
 *
 * @typedef {Object} TokenRequestOptions
 * @property {string} [ip] The IP Address of the requesting user. This IP will be reflected in authentication
 *                         notification emails sent to your users on login. Defaults to the IP address of the
 *                         server requesting the tokens.
 */

/**
 * An object representing all token information for a single Box user.
 *
 * @typedef {Object} TokenInfo
 * @property {string} accessToken    The API access token. Used to authenticate API requests to a certain
 *                                   user and/or application.
 * @property {int} acquiredAtMS      The time that the tokens were acquired.
 * @property {int} accessTokenTTLMS  The TTL of the access token. Can be used with acquiredAtMS to
 *                                   calculate if the current access token has expired.
 * @property {string} [refreshToken] The API refresh token is a Longer-lasting than an access token, and can
 *                                   be used to gain a new access token if the current access token becomes
 *                                   expired. Grants like the 'client credentials' grant don't return a
 *                                   refresh token, and have no refresh capabilities.
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var errors = require('./util/errors'),
	jwt = require('jsonwebtoken'),
	uuid = require('uuid'),
	httpStatusCodes = require('http-status'),
	Promise = require('bluebird');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/**
 * Collection of grant types that can be used to acquire tokens via OAuth2
 *
 * @readonly
 * @enum {string}
 */
var grantTypes = {
	AUTHORIZATION_CODE: 'authorization_code',
	REFRESH_TOKEN: 'refresh_token',
	CLIENT_CREDENTIALS: 'client_credentials',
	JWT: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	TOKEN_EXCHANGE: 'urn:ietf:params:oauth:grant-type:token-exchange'
};

/**
 * Collection of paths to interact with Box OAuth2 tokening system
 *
 * @readonly
 * @enum {string}
 */
var tokenPaths = {
	ROOT: '/oauth2',
	GET: '/token',
	REVOKE: '/revoke'
};

// The XFF header label - Used to give the API better information for uploads, rate-limiting, etc.
var HEADER_XFF = 'X-Forwarded-For';
var ACCESS_TOKEN_TYPE = 'urn:ietf:params:oauth:token-type:access_token';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Parse the response body to create a new TokenInfo object.
 *
 * @param {Object} grantResponseBody - (Request lib) response body containing granted token info from API
 * @returns {TokenInfo} A TokenInfo object.
 * @private
 */
function getTokensFromGrantResponse(grantResponseBody) {
	return {
		// Set the access token & refresh token (if passed)
		accessToken: grantResponseBody.access_token,
		refreshToken: grantResponseBody.refresh_token,
		// Box API sends back expires_in in seconds, we convert to ms for consistency of keeping all time in ms
		accessTokenTTLMS: parseInt(grantResponseBody.expires_in, 10) * 1000,
		acquiredAtMS: Date.now()
	};
}

/**
 * Determines if a given string could represent an authorization code or token.
 *
 * @param {string} codeOrToken The code or token to check.
 * @returns {boolean} True if codeOrToken is valid, false if not.
 * @private
 */
function isValidCodeOrToken(codeOrToken) {
	return (typeof codeOrToken === 'string' && codeOrToken.length > 0);
}

/**
 * Determines if a token grant response is valid
 *
 * @param {string} grantType the type of token grant
 * @param {object} responseBody the body of the response to check
 * @returns {boolean} True if response body has expected fields, false if not.
 * @private
 */
function isValidTokenResponse(grantType, responseBody) {
	if (!isValidCodeOrToken(responseBody.access_token)) {
		return false;
	}
	if (typeof responseBody.expires_in !== 'number') {
		return false;
	}
	// Check the refresh_token for certain types of grants
	if (grantType === 'authorization_code' || grantType === 'refresh_token') {
		if (!isValidCodeOrToken(responseBody.refresh_token)) {
			return false;
		}
	}
	return true;
}


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Manager for API access abd refresh tokens
 *
 * @param {Config} config The config object
 * @param {APIRequestManager} requestManager The API Request Manager
 * @constructor
 */
function TokenManager(config, requestManager) {

	this.config = config;
	this.oauthBaseURL = config.apiRootURL + tokenPaths.ROOT;
	this.requestManager = requestManager;
}

TokenManager.prototype = {

	/**
	 * Given a TokenInfo object, returns whether its access token is expired. An access token is considered
	 * expired once its TTL surpasses the current time outside of the given buffer. This is a public method so
	 * that other modules may check the validity of their tokens.
	 *
	 * @param {TokenInfo} tokenInfo the token info to be written
	 * @param {int} [bufferMS] An optional buffer we'd like to test against. The greater this buffer, the more aggressively
	 * we'll call a token invalid.
	 * @returns {boolean} True if token is valid outside of buffer, otherwise false
	 */
	isAccessTokenValid: function(tokenInfo, bufferMS) {
		if (typeof tokenInfo.acquiredAtMS === 'undefined' || typeof tokenInfo.accessTokenTTLMS === 'undefined') {
			return false;
		}
		bufferMS = bufferMS || 0;
		var expireTime = tokenInfo.acquiredAtMS + tokenInfo.accessTokenTTLMS - bufferMS;
		return (expireTime > Date.now());
	},

	/**
	 * Acquires OAuth2 tokens using a grant type (authorization_code, password, refresh_token)
	 *
	 * @param {Object} formParams - should contain all params expected by Box OAuth2 token endpoint
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
	 * @returns {Promise<TokenInfo>} Promise resolving to the token info
	 * @private
	 */
	getTokens: function(formParams, options) {
		var params = {
			method: 'POST',
			url: this.oauthBaseURL + tokenPaths.GET,
			headers: {},
			form: formParams
		};
		options = options || {};

		// add in app-specific id and secret to auth with Box
		params.form.client_id = this.config.clientID;
		params.form.client_secret = this.config.clientSecret;

		if (options.ip) {
			params.headers[HEADER_XFF] = options.ip;
		}

		return this.requestManager.makeRequest(params)
			.then(response => {

				// Response Error: The API is telling us that we attempted an invalid token grant. This
				// means that our refresh token or auth code has exipred, so propagate an "Expired Tokens"
				// error.
				if (response.body && response.body.error && response.body.error === 'invalid_grant') {
					throw errors.buildExpiredAuthError(response);
				}

				// Unexpected Response: If the token request couldn't get a valid response, then we're
				// out of options. Build an "Unexpected Response" error and propagate it out for the
				// consumer to handle.
				if (response.statusCode !== httpStatusCodes.OK || response.body instanceof Buffer) {
					throw errors.buildUnexpectedResponseError(response);
				}

				// Check to see if token response is valid in case the API returns us a 200 with a malformed token
				if (!isValidTokenResponse(formParams.grant_type, response.body)) {
					throw errors.buildResponseError(response, 'Token format from response invalid');
				}

				// Got valid token response. Parse out the TokenInfo and propagate it back.
				return getTokensFromGrantResponse(response.body);
			});
	},

	/**
	 * Acquires token info using an authorization code
	 *
	 * @param {string} authorizationCode - authorization code issued by Box
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<TokenInfo>} Promise resolving to the token info
	 */
	getTokensAuthorizationCodeGrant: function(authorizationCode, options) {
		if (!isValidCodeOrToken(authorizationCode)) {
			return Promise.reject(new Error('Invalid authorization code.'));
		}

		var params = {
			grant_type: grantTypes.AUTHORIZATION_CODE,
			code: authorizationCode
		};

		return this.getTokens(params, options);
	},

	/**
	 * Acquires token info using the client credentials grant.
	 *
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<TokenInfo>} Promise resolving to the token info
	 */
	getTokensClientCredentialsGrant: function(options) {

		var params = {
			grant_type: grantTypes.CLIENT_CREDENTIALS
		};
		return this.getTokens(params, options);
	},

	/**
	 * Refreshes the access and refresh tokens for a given refresh token.
	 *
	 * @param {string} refreshToken - A valid OAuth refresh token
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<TokenInfo>} Promise resolving to the token info
	 */
	getTokensRefreshGrant: function(refreshToken, options) {
		if (!isValidCodeOrToken(refreshToken)) {
			return Promise.reject(new Error('Invalid refresh token.'));
		}

		var params = {
			grant_type: grantTypes.REFRESH_TOKEN,
			refresh_token: refreshToken
		};

		return this.getTokens(params, options);
	},

	/**
	 * Gets tokens for enterprise administration of app users
	 * @param {string} type The type of token to create, "user" or "enterprise"
	 * @param {string} id The ID of the enterprise to generate a token for
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<TokenInfo>} Promise resolving to the token info
	 */
	getTokensJWTGrant: function(type, id, options) {
		if (!this.config.appAuth.keyID) {
			return Promise.reject(new Error('Must provide app auth configuration to use JWT Grant'));
		}

		var claims = {
			exp: Math.floor(Date.now() / 1000) + this.config.appAuth.expirationTime,
			box_sub_type: type
		};
		var jwtOptions = {
			algorithm: this.config.appAuth.algorithm,
			audience: 'https://api.box.com/oauth2/token',
			subject: id,
			issuer: this.config.clientID,
			jwtid: uuid.v4(),
			noTimestamp: !this.config.appAuth.verifyTimestamp,
			headers: {
				kid: this.config.appAuth.keyID
			}
		};
		var keyParams = {
			key: this.config.appAuth.privateKey,
			passphrase: this.config.appAuth.passphrase
		};

		var assertion;
		try {
			assertion = jwt.sign(claims, keyParams, jwtOptions);
		} catch (jwtErr) {

			return Promise.reject(jwtErr);
		}

		var params = {
			grant_type: grantTypes.JWT,
			assertion: assertion
		};
		return this.getTokens(params, options)
			.catch(err => {

				// When a client's clock is out of sync with Box API servers, they'll get an error about the exp claim
				// In these cases, we can attempt to retry the grant request with a new exp claim calculated frem the
				// Date header sent by the server
				if (err.authExpired && err.response.body.error_description.indexOf('exp') > -1 && err.response.headers.date) {

					var serverTime = Math.floor(Date.parse(err.response.headers.date) / 1000);
					claims.exp = serverTime + this.config.appAuth.expirationTime;

					try {
						params.assertion = jwt.sign(claims, keyParams, jwtOptions);
					} catch (jwtErr) {
						throw jwtErr;
					}

					return this.getTokens(params, options);
				}

				throw err;
			});
	},

	/**
	 * Exchange a valid access token for one with a lower scope, or delegated to
	 * an external user identifier.
	 *
	 * @param {string} accessToken - The valid access token to exchange
	 * @param {string|string[]} scopes - The scope(s) of the new access token
	 * @param {string} [resource] - The absolute URL of an API resource to restrict the new token to
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise<TokenInfo>} Promise resolving to the new token info
	 */
	exchangeToken: function(accessToken, scopes, resource, options) {
		var params = {
			grant_type: grantTypes.TOKEN_EXCHANGE,
			subject_token_type: ACCESS_TOKEN_TYPE,
			subject_token: accessToken,
			scope: (typeof scopes === 'string' ? scopes : scopes.join(','))
		};

		if (resource) {
			params.resource = resource;
		}

		return this.getTokens(params, options);
	},

	/**
	 * Revokes a token pair associated with a given access or refresh token.
	 *
	 * @param {string} token - A valid access or refresh token to revoke
	 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant
	 * @returns {Promise} Promise resolving if the revoke succeeds
	 */
	revokeTokens: function(token, options) {
		var params = {
			method: 'POST',
			url: this.oauthBaseURL + tokenPaths.REVOKE,
			form: {
				token: token,
				client_id: this.config.clientID,
				client_secret: this.config.clientSecret
			}
		};

		if (options && options.ip) {
			params.headers = {};
			params.headers[HEADER_XFF] = options.ip;
		}

		return this.requestManager.makeRequest(params);
	}
};

/**
 * Provides interactions with Box OAuth2 tokening system.
 *
 * @module box-node-sdk/lib/token-manager
 */
module.exports = TokenManager;
