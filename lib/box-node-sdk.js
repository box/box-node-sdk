/**
 * @fileoverview Box SDK for Node.js
 */

'use strict';

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * Object representing interface functions for PersistentClient to interact with the consumer app's central storage layer.
 * @typedef {Object} TokenStore
 * @property {ReadTokenInfoFromStore} read - read TokenInfo from app central store.
 * @property {WriteTokenInfoToStore} write - write TokenInfo to the app's central store.
 * @property {ClearTokenInfoFromStore} clear - delete TokenInfo from the app's central store.
 */

/**
 * Acquires TokenInfo from the consumer app's central store.
 * @typedef {Function} ReadTokenInfoFromStore
 * @param {Function} callback - err if store read issue occurred, otherwise propagates a TokenInfo object
 */

/**
 * Writes TokenInfo to the consumer app's central store
 * @typedef {Function} WriteTokenInfoToStore
 * @param {TokenInfo} tokenInfo - the token info to be written
 * @param {Function} callback - err if store write issue occurred, otherwise propagates null err
 *  and null result to indicate success
 */

/**
 * Clears TokenInfo from the consumer app's central store
 * @typedef {Function} ClearTokenInfoFromStore
 * @param {Function} callback - err if store delete issue occurred, otherwise propagates null err
 *  and null result to indicate success
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter,
	util = require('util'),
	qs = require('querystring'),
	Config = require('./util/config'),
	APIRequestManager = require('./api-request-manager'),
	TokenManager = require('./token-manager'),
	BasicAPISession = require('./sessions/basic-session'),
	PersistentAPISession = require('./sessions/persistent-session'),
	AnonymousAPISession = require('./sessions/anonymous-session'),
	AppAuthSession = require('./sessions/app-auth-session'),
	BoxClient = require('./box-client'),
	Webhooks = require('./managers/webhooks');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A backend NodeJS SDK to interact with the Box V2 API.
 * This is the single entry point for all SDK consumer interactions. This is the only file that a 3rd party app
 * should require. All other components are private and reached out to via this component.
 * 1. Provides getters to spawn client instances for users to interact with the Box API.
 * 2. Provides manual capability to acquire tokens via token grant endpoints.
 *    However, it is recommended to use clients to do this for you.
 * 3. Emits notification events about relevant request/response events. Useful for logging Box API interactions.
 *    Notification events: request retries, exceeding max retries, permanent failures.
 *
 * @param {UserConfigurationOptions} params User settings used to initialize and customize the SDK
 * @constructor
 */
function BoxSDKNode(params) {
	EventEmitter.call(this);

	var eventBus = new EventEmitter();

	var self = this;
	eventBus.on('response', function() {
		var args = [].slice.call(arguments);
		args.unshift('response');
		self.emit.apply(self, args);
	});

	// Setup the configuration with the given params
	this.config = new Config(params);

	// Instantiate the request manager
	this.requestManager = new APIRequestManager(this.config, eventBus);

	// Initialize the rest of the SDK with the given configuration
	this.tokenManager = new TokenManager(this.config, this.requestManager);
	this.anonymousSession = new AnonymousAPISession(this.config, this.tokenManager);
}

util.inherits(BoxSDKNode, EventEmitter);

/**
 * Expose the BoxClient property enumerations to the SDK as a whole. This allows
 * the consumer to access and use these values from anywhere in their application
 * (like a helper) by requiring the SDK, instead of needing to pass the client.
 */
BoxSDKNode.accessLevels = BoxSDKNode.prototype.accessLevels = BoxClient.prototype.accessLevels;
BoxSDKNode.collaborationRoles = BoxSDKNode.prototype.collaborationRoles = BoxClient.prototype.collaborationRoles;
BoxSDKNode.CURRENT_USER_ID = BoxSDKNode.prototype.CURRENT_USER_ID = BoxClient.prototype.CURRENT_USER_ID;

/**
 * Gets the BoxSDKNode instance by passing boxAppSettings json downloaded from the developer console.
 *
 * @param {Object} appConfig boxAppSettings object retrieved from Dev Console.
 * @returns {BoxSDKNode} an instance that has been preconfigured with the values from the Dev Console
 */
BoxSDKNode.getPreconfiguredInstance = function(appConfig) {
	if (typeof appConfig.boxAppSettings !== 'object') {
		throw new Error('Configuration does not include boxAppSettings object.');
	}

	var boxAppSettings = appConfig.boxAppSettings;
	var webhooks = appConfig.webhooks;
	if (typeof webhooks === 'object') {
		Webhooks.setSignatureKeys(webhooks.primaryKey, webhooks.secondaryKey);
	}

	var params = {};
	if (typeof boxAppSettings.clientID === 'string') {
		params.clientID = boxAppSettings.clientID;
	}

	if (typeof boxAppSettings.clientSecret === 'string') {
		params.clientSecret = boxAppSettings.clientSecret;
	}

	// Only try to assign app auth settings if they are present
	// Some configurations do not include them (but might include other info, e.g. webhooks)
	if (typeof boxAppSettings.appAuth === 'object' && boxAppSettings.appAuth.publicKeyID) {

		var appAuth = {};
		// Assign publicKeyID to keyID
		appAuth.keyID = boxAppSettings.appAuth.publicKeyID;

		appAuth.privateKey = boxAppSettings.appAuth.privateKey;

		var passphrase = boxAppSettings.appAuth.passphrase;
		if (typeof passphrase === 'string') {
			appAuth.passphrase = passphrase;
		}
		params.appAuth = appAuth;
	}

	if (typeof appConfig.enterpriseID === 'string') {
		params.enterpriseID = appConfig.enterpriseID;
	}

	return new BoxSDKNode(params);
};

/**
 * Updates the SDK configuration with new parameters.
 *
 * @param {UserConfigurationOptions} params User settings
 * @returns {void}
 */
BoxSDKNode.prototype.configure = function(params) {
	this.config = this.config.extend(params);
};

/**
 * Returns a Box Client with a Basic API Session. The client is able to make requests on behalf of a user.
 * A basic session has no access to a user's refresh token. Because of this, once the session's tokens
 * expire the client cannot recover and a new session will need to be generated.
 *
 * @param {string} accessToken A user's Box API access token
 * @returns {BoxClient} Returns a new Box Client paired to a new BasicAPISession
 */
BoxSDKNode.prototype.getBasicClient = function(accessToken) {
	var apiSession = new BasicAPISession(accessToken, this.tokenManager);
	return new BoxClient(apiSession, this.config, this.requestManager);
};

/**
 * Returns a Box Client with a persistent API session. A persistent API session helps manage the user's tokens,
 * and can refresh them automatically if the access token expires. If a central data-store is given, the session
 * can read & write tokens to it.
 *
 * @NOTE: If tokenInfo or tokenStore are formatted incorrectly, this method will throw an error. If you
 * haven't explicitly created either of these objects or are otherwise not completly confident in their validity,
 * you should wrap your call to getPersistentClient in a try-catch to handle any potential errors.
 *
 * @param {TokenInfo} tokenInfo A tokenInfo object to use for authentication
 * @param {TokenStore} [tokenStore] An optional token store for reading/writing tokens to session
 * @returns {BoxClient} Returns a new Box Client paired to a new PersistentAPISession
 */
BoxSDKNode.prototype.getPersistentClient = function(tokenInfo, tokenStore) {
	var apiSession = new PersistentAPISession(tokenInfo, tokenStore, this.config, this.tokenManager);
	return new BoxClient(apiSession, this.config, this.requestManager);
};

/**
 * Returns A Box Client with an Anonymous API Session. An Anonymous API Session has access to an anonymous
 * client-credentials token, which isn't tied to any specific user. Because of this, the client will only
 * have access to endpoints that allow client-credential tokens. All Anonymous API Sessions share the
 * same tokens, which allows them to refresh them efficiently and reduce load on both the application and
 * the API.
 *
 * @returns {BoxClient} Returns a new Box Client paired to a AnonymousAPISession
 */
BoxSDKNode.prototype.getAnonymousClient = function() {
	return new BoxClient(this.anonymousSession, this.config, this.requestManager);
};

/**
 * Create a new client using App Auth for the given entity.  This allows either
 * managing App Users (as the enterprise) or performing operations as the App
 * Users themselves (as a user).
 *
 * @param {string} type The type of entity to operate as, "enterprise" or "user"
 * @param {string} id The Box ID of the entity to operate as
 * @returns {BoxClient} A new client authorized as the app user or enterprise
 */
BoxSDKNode.prototype.getAppAuthClient = function(type, id) {
	if (type === 'enterprise' && !id) {
		if (this.config.enterpriseID) {
			id = this.config.enterpriseID;
		} else {
			throw new Error('Enterprise ID must be passed');
		}
	}

	var appAuthSession = new AppAuthSession(type, id, this.config, this.tokenManager);
	return new BoxClient(appAuthSession, this.config, this.requestManager);
};

/**
 * Generate the URL for the authorize page to send users to for the first leg of
 * the OAuth2 flow.
 *
 * @param {Object} params The OAuth2 parameters
 * @returns {string} The authorize page URL
 */
BoxSDKNode.prototype.getAuthorizeURL = function(params) {

	params.client_id = this.config.clientID;

	return this.config.authorizeRootURL + '/oauth2/authorize?' + qs.stringify(params);
};

/**
 * Acquires token info using an authorization code
 *
 * @param {string} authorizationCode - authorization code issued by Box
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} [callback] - passed a TokenInfo object if tokens were granted successfully
 * @returns {Promise<TokenInfo>} Promise resolving to the token info
 */
BoxSDKNode.prototype.getTokensAuthorizationCodeGrant = function(authorizationCode, options, callback) {
	return this.tokenManager.getTokensAuthorizationCodeGrant(authorizationCode, options)
		.asCallback(callback);
};

/**
 * Refreshes the access and refresh tokens for a given refresh token.
 *
 * @param {string} refreshToken - A valid OAuth refresh token
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} [callback] - passed a TokenInfo object if tokens were granted successfully
 * @returns {Promise<TokenInfo>} Promise resolving to the token info
 */
BoxSDKNode.prototype.getTokensRefreshGrant = function(refreshToken, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	return this.tokenManager.getTokensRefreshGrant(refreshToken, options)
		.asCallback(callback);
};

/**
 * Gets tokens for enterprise administration of app users
 * @param {string} enterpriseID The ID of the enterprise to generate a token for
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} [callback] Passed the tokens if successful
 * @returns {Promise<TokenInfo>} Promise resolving to the token info
 */
BoxSDKNode.prototype.getEnterpriseAppAuthTokens = function(enterpriseID, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	if (!enterpriseID) {
		if (this.config.enterpriseID) {
			enterpriseID = this.config.enterpriseID;
		} else {
			throw new Error('Enterprise id must be passed');
		}
	}

	return this.tokenManager.getTokensJWTGrant('enterprise', enterpriseID, options)
		.asCallback(callback);
};

/**
 * Gets tokens for App Users via a JWT grant
 * @param {string} userID The ID of the App User to generate a token for
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} [callback] Passed the tokens if successful
 * @returns {Promise<TokentInfo>} Promise reolving to the token infp
 */
BoxSDKNode.prototype.getAppUserTokens = function(userID, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	return this.tokenManager.getTokensJWTGrant('user', userID, options)
		.asCallback(callback);
};

/**
 * Revokes a token pair associated with a given access or refresh token.
 *
 * @param {string} token - A valid access or refresh token to revoke
 * @param {TokenRequestOptions} [options] - Sets optional behavior for the token grant, null for default behavior
 * @param {Function} [callback] - If err, revoke failed. Otherwise, revoke succeeded.
 * @returns {Promise<TokenInfo>} Promise resolving to the token info
 */
BoxSDKNode.prototype.revokeTokens = function(token, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	return this.tokenManager.revokeTokens(token, options)
		.asCallback(callback);
};

/**
 * Expose Webhooks.validateMessage() to the SDK as a whole. This allows
 * the consumer to call BoxSDK.validateWebhookMessage() by just requiring the SDK,
 * instead of needing to create a client (which is not needed to validate messages).
 */
BoxSDKNode.validateWebhookMessage = Webhooks.validateMessage;

/** @module box-node-sdk/lib/box-node-sdk */
module.exports = BoxSDKNode;
