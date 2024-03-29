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
	Promise = require('bluebird'),
	leche = require('leche');

// Modules to Fake
var TokenManager = require('../../lib/token-manager'),
	APIRequestManager = require('../../lib/api-request-manager'),
	AppAuthSession = require('../../lib/sessions/app-auth-session'),
	Webhooks = require('../../lib/managers/webhooks'),
	EventEmitter = require('events').EventEmitter;

describe('box-node-sdk', function() {

	// ------------------------------------------------------------------------------
	// Setup
	// ------------------------------------------------------------------------------
	var sandbox = sinon.createSandbox(),
		BoxSDKNode,
		sdk,
		TokenManagerConstructorStub,
		tokenManagerFake,
		APIRequestManagerConstructorStub,
		requestManagerFake,
		BasicClient,
		BasicAPISession,
		PersistentAPISession,
		CCGAPISession,
		AppAuthSessionConstructorStub,
		WebhooksFake,
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
				}
			},
			enterpriseID: 'myEnterpriseID'
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
		CCGAPISession = sandbox.stub();
		appAuthSessionFake = leche.fake(AppAuthSession.prototype);
		AppAuthSessionConstructorStub = sandbox.stub();
		WebhooksFake = leche.fake(Webhooks);

		// Setup Mockery
		mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
		mockery.registerMock('./token-manager', TokenManagerConstructorStub);
		mockery.registerMock('./api-request-manager', APIRequestManagerConstructorStub);
		mockery.registerMock('./box-client', BasicClient);
		mockery.registerMock('./sessions/basic-session', BasicAPISession);
		mockery.registerMock('./sessions/persistent-session', PersistentAPISession);
		mockery.registerMock('./sessions/ccg-session', CCGAPISession);
		mockery.registerMock('./sessions/app-auth-session', AppAuthSessionConstructorStub);
		mockery.registerMock('./managers/webhooks', WebhooksFake);

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

			assert.ok(CCGAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(CCGAPISession.calledWithMatch(TEST_CONFIG), 'Anonymous session should be passed config');
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

			assert.ok(CCGAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(CCGAPISession.calledWithMatch(TEST_APP_SETTINGS_CONFIG), 'Anonymous session should be passed config');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should create an API Request Manager with config when called', function() {

			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);

			assert.ok(APIRequestManagerConstructorStub.calledWithNew(), 'Should construct new APIRequestManager');
			assert.ok(APIRequestManagerConstructorStub.calledWithMatch(TEST_APP_SETTINGS_CONFIG), 'APIRequestManager should be passed config');
			assert.instanceOf(APIRequestManagerConstructorStub.getCall(0).args[1], EventEmitter, 'APIRequestManager should be passed event bus');
			assert.ok(sdk, 'SDK should be constructed');
		});

		it('should correctly preconfigure instance when app auth settings are not filled in', function() {

			var settings = {
				boxAppSettings: {
					clientID: 'id',
					clientSecret: 'secret',
					appAuth: {
						publicKeyID: '',
						privateKey: '',
						passphrase: ''
					}
				}
			};

			sdk = BoxSDKNode.getPreconfiguredInstance(settings);
			assert.ok(sdk, 'SDK object should be constucted without error');
		});

		it('should throw when nested settings object is not present', function() {

			var settings = {
				clientID: 'id',
				clientSecret: 'secret'
			};

			assert.throws(function() {
				BoxSDKNode.getPreconfiguredInstance(settings);
			});
		});

		it('should set webhook signature keys when present in the config', function() {

			var primaryKey = 'aljhglsdkjfbglsjdfg',
				secondaryKey = 'ihdlfkgjbsldjfhgsdfg';
			var settings = {
				boxAppSettings: {
					clientID: 'id',
					clientSecret: 'secret'
				},
				webhooks: { primaryKey, secondaryKey }

			};

			sandbox.mock(WebhooksFake).expects('setSignatureKeys')
				.withArgs(primaryKey, secondaryKey);

			sdk = BoxSDKNode.getPreconfiguredInstance(settings);

			assert.ok(sdk, 'SDK should be constructed correctly');
		});

		it('should throw when client ID and secret are not present in config', function() {

			var settings = {
				webhooks: {
					primaryKey: 'alsdhg',
					secondaryKey: 'luhlshdbfg'
				}
			};

			sandbox.stub(WebhooksFake, 'setSignatureKeys');

			assert.throws(function() {
				BoxSDKNode.getPreconfiguredInstance(settings);
			});
		});

		it('should throw when passphrase is not present in app auth config', function() {

			var settings = {
				boxAppSettings: {
					clientID: 'id',
					clientSecret: 'secret',
					appAuth: {
						publicKeyID: 'kjsdi45',
						privateKey: 'iq3yo8byv4ov7weiorntie7byro8wyeort7ybweo8'
					}
				}
			};

			assert.throws(function() {
				BoxSDKNode.getPreconfiguredInstance(settings);
			});
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
			assert.nestedPropertyVal(sdk, 'config.clientID', 'myId');
			assert.nestedPropertyVal(sdk, 'config.apiRootURL', 'myUrl');
			assert.nestedPropertyVal(sdk, 'config.retryIntervalMS', 11111);
			assert.nestedPropertyVal(sdk, 'config.numMaxRetries', 3);
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

		it('should return an instance of a Basic Client when called as a static method', function() {
			var basicClient = BoxSDKNode.getBasicClient('abc');
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
		const CCG_CONFIG = {
			clientID: 'client-id',
			clientSecret: 'client-secret',
			enterpriseID: 'enterprise-id'
		};

		it('should return an instance of an Anonymous Client when called', function() {
			sdk = new BoxSDKNode(CCG_CONFIG);
			const anonymousClient = sdk.getAnonymousClient();
			assert.ok((anonymousClient instanceof BasicClient), 'Returned instance of Anonymous Client');
		});

		it('should use the SDK anonymous session when called', function() {
			// Reconstruct the SDK instance so it uses the stub
			const anonymousSession = {tokenInfo: 'anon'};
			CCGAPISession.returns(anonymousSession);

			sdk = new BoxSDKNode(CCG_CONFIG);

			sdk.getAnonymousClient();

			assert.ok(BasicClient.calledWithNew(), 'New client should be created');
			assert.ok(CCGAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(CCGAPISession.calledWithMatch(CCG_CONFIG), 'Anonymous session should be passed config');
			assert.ok(BasicClient.calledWithMatch(anonymousSession, CCG_CONFIG), 'Anonymous session should be passed in');
			assert.ok(TokenManagerConstructorStub.calledWithNew(), 'New token manager should be created');
			assert.ok(TokenManagerConstructorStub
				.calledWithMatch({boxSubjectType: 'enterprise', boxSubjectId: 'enterprise-id'}, requestManagerFake),
			'New token manager should be configured for CCG'
			);
		});
	});

	describe('getCCGClientForUser()', function() {
		const CCG_CONFIG = {
			clientID: 'client-id',
			clientSecret: 'client-secret'
		};

		it('should return an instance of an Anonymous Client when called', function() {
			sdk = new BoxSDKNode(CCG_CONFIG);
			const anonymousClient = sdk.getCCGClientForUser('user-id');
			assert.ok((anonymousClient instanceof BasicClient), 'Returned instance of Anonymous Client');
		});

		it('should use the SDK anonymous session when called', function() {
			// Reconstruct the SDK instance so it uses the stub
			const anonymousSession = {tokenInfo: 'anon'};
			CCGAPISession.returns(anonymousSession);

			sdk = new BoxSDKNode(CCG_CONFIG);

			sdk.getCCGClientForUser('user-id');

			assert.ok(BasicClient.calledWithNew(), 'New client should be created');
			assert.ok(CCGAPISession.calledWithNew(), 'Should construct new anonymous session');
			assert.ok(CCGAPISession.calledWithMatch(CCG_CONFIG), 'Anonymous session should be passed config');
			assert.ok(BasicClient.calledWithMatch(anonymousSession, CCG_CONFIG), 'Anonymous session should be passed in');
			assert.ok(TokenManagerConstructorStub.calledWithNew(), 'New token manager should be created');
			assert.ok(TokenManagerConstructorStub
				.calledWithMatch({boxSubjectType: 'user', boxSubjectId: 'user-id'}, requestManagerFake),
			'New token manager should be configured for CCG'
			);
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

		it('should throw an error when enterprise id is not passed and the SDK instance is not created from boxAppSettings', function() {
			assert.throws(function() {
				sdk.getAppAuthClient('enterprise');
			}, Error, 'Enterprise ID must be passed');
		});

		it('should use the enterprise id that is passed as a parameter and should not use the config', function() {
			var id = '87346',
				type = 'enterprise';


			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);
			sdk.getAppAuthClient(type, id);

			assert.ok(AppAuthSessionConstructorStub.calledWithNew(), 'New client should be created');
			assert.ok(AppAuthSessionConstructorStub.calledWithMatch(type, id, TEST_APP_SETTINGS_CONFIG, tokenManagerFake), 'Enterprise id should match the parameter value');
		});

		it('should use enterprise ID from config when one is set and none is passed in', function() {

			var type = 'enterprise';

			sdk = BoxSDKNode.getPreconfiguredInstance(TEST_APP_SETTINGS);
			sdk.getAppAuthClient(type);

			assert.ok(AppAuthSessionConstructorStub.calledWithNew(), 'New client should be created');
			assert.ok(AppAuthSessionConstructorStub.calledWithMatch(type, TEST_APP_SETTINGS.enterpriseID, TEST_APP_SETTINGS_CONFIG, tokenManagerFake), 'Enterprise id should match the parameter value');
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
				options = {some: 'options'},
				fakeTokenInfo = {at: 'at'};
			sandbox.mock(tokenManagerFake).expects('getTokensAuthorizationCodeGrant')
				.withExactArgs(ac, options)
				.returns(Promise.resolve(fakeTokenInfo));

			sdk.getTokensAuthorizationCodeGrant(ac, options, function(err, tokenInfo) {
				assert.ifError(err);
				assert.equal(tokenInfo, fakeTokenInfo);
				done();
			});
		});
	});

	describe('getTokensRefreshGrant()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensRefreshGrant() and propagate result when called', function(done) {
			var refreshToken = 'rt';
			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.withExactArgs(refreshToken, null)
				.returns(Promise.resolve());

			sdk.getTokensRefreshGrant(refreshToken, done);
		});

		it('should call to token manager getTokensRefreshGrant() with null options and propagate result when called', function(done) {
			var refreshToken = 'rt';
			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.withExactArgs(refreshToken, null)
				.returns(Promise.resolve());

			sdk.getTokensRefreshGrant(refreshToken, null, done);
		});

		it('should call to token manager getTokensRefreshGrant() with options.ip and propagate result when called', function(done) {
			var refreshToken = 'rt';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.withExactArgs(refreshToken, options)
				.returns(Promise.resolve());

			sdk.getTokensRefreshGrant(refreshToken, options, done);
		});

	});

	describe('getEnterpriseAppAuthTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensJWTGrant() and propagate result when called', function(done) {
			var enterpriseID = '8273698724';
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs('enterprise', enterpriseID, null)
				.returns(Promise.resolve());

			sdk.getEnterpriseAppAuthTokens(enterpriseID, done);
		});


		it('should call to token manager getTokensJWTGrant() with options.ip and propagate result when called', function(done) {
			var enterpriseID = '8273698724';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs('enterprise', enterpriseID, options)
				.returns(Promise.resolve());

			sdk.getEnterpriseAppAuthTokens(enterpriseID, options, done);
		});

		it('should call to token manager getTokensJWTGrant() without options.ip and propagate result when called', function(done) {
			var enterpriseID = '8273698724';
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs('enterprise', enterpriseID, null)
				.returns(Promise.resolve());

			sdk.getEnterpriseAppAuthTokens(enterpriseID, null, done);
		});

		it('should use enterprise ID from config when one is present and none is passed in', function(done) {

			var id = '98273649';
			var settings = {
				boxAppSettings: {
					clientID: 'id',
					clientSecret: 'secret'
				},
				enterpriseID: id
			};

			sdk = BoxSDKNode.getPreconfiguredInstance(settings);

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs('enterprise', id, null)
				.returns(Promise.resolve());

			sdk.getEnterpriseAppAuthTokens(id, done);
		});

		it('should throw when no enterprise ID is passed in or in config', function() {

			sdk = new BoxSDKNode({
				clientID: 'id',
				clientSecret: 'secret'
			});

			assert.throws(function() {
				sdk.getEnterpriseAppAuthTokens(null, () => { /**/ });
			});
		});
	});

	describe('getAppUserTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager getTokensJWTGrant() without options.ip and propagate result when called', function(done) {

			var userID = '138475693475';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withExactArgs('user', userID, null)
				.returns(Promise.resolve());

			sdk.getAppUserTokens(userID, done);
		});

		it('should call to token manager getTokensJWTGrant() with options.ip and propagate result when called', function(done) {
			var userID = '138475693475';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withExactArgs('user', userID, options)
				.returns(Promise.resolve());

			sdk.getAppUserTokens(userID, options, done);
		});

		it('should call to token manager getTokensJWTGrant() without options.ip and propagate result when called', function(done) {

			var userID = '138475693475';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withExactArgs('user', userID, null)
				.returns(Promise.resolve());

			sdk.getAppUserTokens(userID, null, done);
		});
	});

	describe('revokeTokens()', function() {

		beforeEach(function() {
			sdk = new BoxSDKNode(TEST_CONFIG);
		});

		it('should call to token manager revokeTokens() without options.ip and propagate result when called', function(done) {
			var refreshToken = 'rt';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(refreshToken, null)
				.returns(Promise.resolve());

			sdk.revokeTokens(refreshToken, done);
		});

		it('should call to token manager revokeTokens() with options.ip and propagate result when called', function(done) {
			var refreshToken = 'rt';
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(refreshToken, options)
				.returns(Promise.resolve());

			sdk.revokeTokens(refreshToken, options, done);
		});

		it('should call to token manager revokeTokens() without options.ip and propagate result when called', function(done) {
			var refreshToken = 'rt';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(refreshToken, null)
				.returns(Promise.resolve());

			sdk.revokeTokens(refreshToken, null, done);
		});
	});
});
