/**
* @fileoverview Box SDK Node Tests
*/
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

// Modules to Fake
var TokenManager = require('../../lib/token-manager'),
	APIRequestManager = require('../../lib/api-request-manager'),
	AppAuthSession = require('../../lib/sessions/app-auth-session'),
	EventEmitter = require('events').EventEmitter;

describe('box-node-sdk', function() {

	// ------------------------------------------------------------------------------
	// Setup
	// ------------------------------------------------------------------------------
	var sandbox = sinon.sandbox.create(),
		BoxSDKNode,
		sdk,
		TokenManagerConstructorStub,
		tokenManagerFake,
		APIRequestManagerConstructorStub,
		requestManagerFake,
		BasicClient,
		BasicAPISession,
		PersistentAPISession,
		AnonymousAPISession,
		AppAuthSessionConstructorStub,
		appAuthSessionFake,
		DEFAULT_BOX_ROOT_URL = 'https://api.box.com',
		TEST_CONFIG = {
			clientID: 'myId',
			clientSecret: 'mySecret',
			apiRootURL: 'myUrl',
			retryIntervalMS: 11111,
			numMaxRetries: 3,
			appAuth: {
				keyID: 'keyID',
				privateKey: 'privateKey',
				passphrase: 'passphrase'
			},
			enterpriseID: 'myEnterpriseID'
		},
		TEST_APP_SETTINGS_CONFIG = {
			clientID: 'myId',
			clientSecret: 'mySecret',
			appAuth: {
				keyID: 'keyID',
				privateKey: 'privateKey',
				passphrase: 'passphrase'
			},
			enterpriseID: 'myEnterpriseID'
		},
		TEST_APP_SETTINGS = {
			boxAppSettings: {
				clientID: 'myId',
				clientSecret: 'mySecret',
				appAuth: {
					publicKeyID: 'keyID',
					privateKey: 'privateKey',
					passphrase: 'passphrase'
				},
				enterpriseID: 'myEnterpriseID'
			}
		};


	beforeEach(function() {
		TokenManagerConstructorStub = sandbox.stub();
		tokenManagerFake = leche.fake(TokenManager.prototype);
		TokenManagerConstructorStub.returns(tokenManagerFake);
		APIRequestManagerConstructorStub = sandbox.stub();
		requestManagerFake = leche.fake(APIRequestManager.prototype);
		APIRequestManagerConstructorStub.returns(requestManagerFake);
		BasicClient = sandbox.stub();
		BasicAPISession = sandbox.stub();
		PersistentAPISession = sandbox.stub();
		AnonymousAPISession = sandbox.stub();
		appAuthSessionFake = leche.fake(AppAuthSession.prototype);
		AppAuthSessionConstructorStub = sandbox.stub();

		// Setup Mockery
		mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
		mockery.registerMock('./token-manager', TokenManagerConstructorStub);
		mockery.registerMock('./api-request-manager', APIRequestManagerConstructorStub);
		mockery.registerMock('./box-client', BasicClient);
		mockery.registerMock('./sessions/basic-session', BasicAPISession);
		mockery.registerMock('./sessions/persistent-session', PersistentAPISession);
		mockery.registerMock('./sessions/anonymous-session', AnonymousAPISession);
		mockery.registerMock('./sessions/app-auth-session', AppAuthSessionConstructorStub);

		// Setup File Under Test
		mockery.registerAllowable('../../lib/box-node-sdk', true);
		BoxSDKNode = require('../../lib/box-node-sdk');
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});


	// ------------------------------------------------------------------------------
	// Tests
	// ------------------------------------------------------------------------------

	describe('constructor', function() {
		it('should set config for all passed in params when called', function() {

			sdk = new BoxSDKNode(TEST_CONFIG);

			assert.ok(TokenManagerConstructorStub.calledWithNew(), 'Should construct new TokenManager');
			assert.ok(TokenManagerConstructorStub.calledWithMatch(TEST_CONFIG), 'TokenManager should be passed config');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should create an anonymous session with config when called', function() {

			sdk = new BoxSDKNode(TEST_CONFIG);

			assert.ok(AnonymousAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(AnonymousAPISession.calledWithMatch(TEST_CONFIG), 'Anonymous session should be passed config');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should create an API Request Manager with config when called', function() {

			sdk = new BoxSDKNode(TEST_CONFIG);

			assert.ok(APIRequestManagerConstructorStub.calledWithNew(), 'Should construct new APIRequestManager');
			assert.ok(APIRequestManagerConstructorStub.calledWithMatch(TEST_CONFIG), 'APIRequestManager should be passed config');
			assert.instanceOf(APIRequestManagerConstructorStub.getCall(0).args[1], EventEmitter, 'APIRequestManager should be passed event bus');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should set default apiRootURL when one is given', function() {
			var inputConfig = {
				clientID: 'myId',
				clientSecret: 'mySecret'
			};
			var expectedParams = {
				clientID: 'myId',
				clientSecret: 'mySecret',
				apiRootURL: DEFAULT_BOX_ROOT_URL
			};

			sdk = new BoxSDKNode(inputConfig);

			assert.ok(TokenManagerConstructorStub.calledWithMatch(expectedParams), 'TokenManager should be passed correct config values');
			assert.ok(sdk, 'SDK should be constructed');
		});
	});

	describe('getPreconfiguredInstance()', function() {
		it('should set config for all passed in params when called', function() {

			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);

			assert.ok(TokenManagerConstructorStub.calledWithNew(), 'Should construct new TokenManager');
			assert.ok(TokenManagerConstructorStub.calledWithMatch(TEST_APP_SETTINGS_CONFIG), 'TokenManager should be passed config');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should create an anonymous session with config when called', function() {

			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);

			assert.ok(AnonymousAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(AnonymousAPISession.calledWithMatch(TEST_APP_SETTINGS_CONFIG), 'Anonymous session should be passed config');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should create an API Request Manager with config when called', function() {

			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);

			assert.ok(APIRequestManagerConstructorStub.calledWithNew(), 'Should construct new APIRequestManager');
			assert.ok(APIRequestManagerConstructorStub.calledWithMatch(TEST_APP_SETTINGS_CONFIG), 'APIRequestManager should be passed config');
			assert.instanceOf(APIRequestManagerConstructorStub.getCall(0).args[1], EventEmitter, 'APIRequestManager should be passed event bus');
			assert.ok(sdk, 'SDK should be constructed');
		});
	});

	describe('configure()', function() {
		beforeEach(function() {
			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);
		});

		it('should verify that additional parameters can be passed to the BoxSDKNode instance', function() {
			var additonalParams = {
				apiRootURL: 'myUrl',
				retryIntervalMS: 11111,
				numMaxRetries: 3
			};

			sdk.configure(additonalParams);
			assert.deepPropertyVal(sdk, 'config.clientID', 'myId');
			assert.deepPropertyVal(sdk, 'config.apiRootURL', 'myUrl');
			assert.deepPropertyVal(sdk, 'config.retryIntervalMS', 11111);
			assert.deepPropertyVal(sdk, 'config.numMaxRetries', 3);
		});
	});

	describe('getBasicClient()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should return an instance of a Basic Client when called', function() {
			var basicClient = sdk.getBasicClient('abc');
			assert.ok((basicClient instanceof BasicClient), 'Returned instance of Basic Client');
		});
	});

	describe('getPersistentClient()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should return an instance of a Persistent Client when called', function() {
			var persistentClient = sdk.getPersistentClient({}, {});
			assert.ok((persistentClient instanceof BasicClient), 'Returned instance of Peristent Client');
		});
	});

	describe('getAnonymousClient()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should return an instance of an Anonymous Client when called', function() {
			var anonymousClient = sdk.getAnonymousClient();
			assert.ok((anonymousClient instanceof BasicClient), 'Returned instance of Anonymous Client');
		});

		it('should use the SDK anonymous session when called', function() {
			var anonymousSession = {tokenInfo: 'anon'};
			AnonymousAPISession.returns(anonymousSession);

			// Reconstruct the SDK instance so it uses the stub
			sdk = new BoxSDKNode(TEST_CONFIG);

			sdk.getAnonymousClient();

			assert.ok(BasicClient.calledWithNew(), 'New client should be created');
			assert.ok(BasicClient.calledWithMatch(anonymousSession, TEST_CONFIG), 'Anonymous session should be passed in');
		});
	});

	describe('getAppAuthClient()', function() {

		var appAuthConfig = {
			clientID: 'id',
			clientSecret: 'secret',
			appAuth: {
				keyID: 'fh83745',
				privateKey: new Buffer(50),
				passphrase: 'Such secrets, wow!'
			}
		};

		beforeEach(function() {
			sdk = new BoxSDKNode(appAuthConfig);
		});

		it('should return a client using AppAuthSession when called', function() {
			var id = '8734659235',
				type = 'user';

			AppAuthSessionConstructorStub.returns(appAuthSessionFake);

			var appAuthClient = sdk.getAppAuthClient(type, id);
			assert.isDefined(appAuthClient);
			assert.ok(BasicClient.calledWithNew(), 'New client should be created');
			assert.ok(BasicClient.calledWithMatch(appAuthSessionFake), 'App auth session should be passed in');
		});
	});

	describe('getAuthorizeURL', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should return URL for authorize page when called', function() {

			var params = {
				response_type: 'code',
				redirect_url: 'https://example.com/',
				state: 'foo'
			};

			var url = sdk.getAuthorizeURL(params);

			assert.equal(url, 'https://account.box.com/api/oauth2/authorize?response_type=code&redirect_url=https%3A%2F%2Fexample.com%2F&state=foo&client_id=myId');
		});
	});

	describe('getTokensAuthorizationCodeGrant()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensAuthorizationCodeGrant() and propagate result when called', function(done) {
			var ac = 'ac',
				options = {some: 'options'};
			sandbox.mock(tokenManagerFake).expects('getTokensAuthorizationCodeGrant').withExactArgs(ac, options, done).yields();

			sdk.getTokensAuthorizationCodeGrant(ac, options, done);
		});
	});

	describe('getTokensRefreshGrant()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensRefreshGrant() and propagate result when called', function(done) {
			var refreshToken = 'rt';
			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant').withExactArgs(refreshToken, done).yields();

			sdk.getTokensRefreshGrant(refreshToken, done);
		});
	});

	describe('getEnterpriseAppAuthTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensJWTGrant() and propagate result when called', function(done) {

			var enterpriseID = '8273698724';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').withArgs('enterprise', enterpriseID, done).yieldsAsync();

			sdk.getEnterpriseAppAuthTokens(enterpriseID, done);
		});
	});

	describe('getAppUserTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensJWTGrant() and propagate result when called', function(done) {

			var userID = '138475693475';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').withArgs('user', userID, done).yieldsAsync();

			sdk.getAppUserTokens(userID, done);
		});
	});

	describe('revokeTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager revokeTokens() and propagate result when called', function(done) {
			var refreshToken = 'rt';

			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(refreshToken, done).yields();

			sdk.revokeTokens(refreshToken, done);
		});
	});
});
