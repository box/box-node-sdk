/**
 * @fileoverview Unit tests for getSdkGenClient() method
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
  sinon = require('sinon'),
  mockery = require('mockery'),
  leche = require('leche');

var TokenManager = require('@/lib/token-manager').default,
  Config = require('@/lib/util/config').default;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
  BasicClient,
  BasicAPISession,
  PersistentAPISession,
  AppAuthSession,
  CCGAPISession,
  basicClient;

var MODULE_FILE_PATH = '@/lib/box-client';
var BASIC_SESSION_PATH = '@/lib/sessions/basic-session';
var PERSISTENT_SESSION_PATH = '@/lib/sessions/persistent-session';
var APP_AUTH_SESSION_PATH = '@/lib/sessions/app-auth-session';
var CCG_SESSION_PATH = '@/lib/sessions/ccg-session';

// Default config for tests
var defaultParams = {
  clientID: 'abc123',
  clientSecret: 'xyz456',
  apiRootURL: 'https://api.box.com',
  uploadAPIRootURL: 'https://upload.box.com/api',
  authorizeRootURL: 'https://account.box.com/api',
  apiVersion: '2.0',
  numMaxRetries: 5,
  retryIntervalMS: 2000,
  request: {
    headers: {
      'User-Agent': 'Box Node SDK',
    },
    agentOptions: {
      keepAlive: true,
    },
  },
};

// Config with app auth (JWT)
var jwtParams = {
  ...defaultParams,
  appAuth: {
    keyID: 'key123',
    privateKey:
      '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----',
    passphrase: 'password',
  },
  enterpriseID: 'ent123',
};

// Config for CCG
var ccgParams = {
  ...defaultParams,
  boxSubjectType: 'enterprise',
  boxSubjectId: 'ent456',
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('getSdkGenClient()', function () {
  var tokenManagerFake, requestManagerFake;

  beforeEach(function () {
    tokenManagerFake = leche.fake(TokenManager.prototype);
    requestManagerFake = {};

    // Setup Mockery
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false,
    });

    // Register allowed modules
    mockery.registerAllowable(MODULE_FILE_PATH, true);
    mockery.registerAllowable(BASIC_SESSION_PATH, true);
    mockery.registerAllowable(PERSISTENT_SESSION_PATH, true);
    mockery.registerAllowable(APP_AUTH_SESSION_PATH, true);
    mockery.registerAllowable(CCG_SESSION_PATH, true);

    // Load modules
    BasicClient = require(MODULE_FILE_PATH).default;
    BasicAPISession = require(BASIC_SESSION_PATH).default;
    PersistentAPISession = require(PERSISTENT_SESSION_PATH).default;
    AppAuthSession = require(APP_AUTH_SESSION_PATH).default;
    CCGAPISession = require(CCG_SESSION_PATH).default;
  });

  afterEach(function () {
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('Basic SDK-Gen client creation (Developer token)', function () {
    it('should return an SDK-Gen BoxClient instance for BasicAPISession', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      assert.isObject(sdkGenClient);
      // Verify auth and networkSession are configured
      assert.property(sdkGenClient, 'auth');
      assert.property(sdkGenClient, 'networkSession');
      // Verify resource managers are present
      assert.property(sdkGenClient, 'users');
      assert.property(sdkGenClient, 'folders');
      assert.property(sdkGenClient, 'files');
    });

    it('should return an SDK-Gen BoxClient instance for PersistentAPISession', function () {
      var config = new Config(defaultParams);
      var tokenInfo = {
        accessToken: 'oauth-access-token',
        refreshToken: 'oauth-refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      assert.isObject(sdkGenClient);
      assert.property(sdkGenClient, 'auth');
      assert.property(sdkGenClient, 'networkSession');
      assert.property(sdkGenClient, 'users');
      assert.property(sdkGenClient, 'folders');
      assert.property(sdkGenClient, 'files');
    });

    it('should return an SDK-Gen BoxClient instance for AppAuthSession', function () {
      var config = new Config(jwtParams);
      var session = new AppAuthSession(
        'enterprise',
        'ent123',
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      assert.isObject(sdkGenClient);
      assert.property(sdkGenClient, 'auth');
      assert.property(sdkGenClient, 'networkSession');
      assert.property(sdkGenClient, 'users');
      assert.property(sdkGenClient, 'folders');
      assert.property(sdkGenClient, 'files');
    });

    it('should return an SDK-Gen BoxClient instance for CCGAPISession', function () {
      var config = new Config(ccgParams);
      var session = new CCGAPISession(config, tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      assert.isObject(sdkGenClient);
      assert.property(sdkGenClient, 'auth');
      assert.property(sdkGenClient, 'networkSession');
      assert.property(sdkGenClient, 'users');
      assert.property(sdkGenClient, 'folders');
      assert.property(sdkGenClient, 'files');
    });
  });

  describe('Integration with getAuthentication()', function () {
    it('should call getAuthentication() internally', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getAuthSpy = sandbox.spy(basicClient, 'getAuthentication');

      basicClient.getSdkGenClient();

      assert.isTrue(getAuthSpy.calledOnce);
    });

    it('should pass authOptions to getAuthentication()', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getAuthSpy = sandbox.spy(basicClient, 'getAuthentication');

      var customTokenStorage = {
        store: function () {},
        get: function () {},
        clear: function () {},
      };

      basicClient.getSdkGenClient({
        authOptions: {
          tokenStorage: customTokenStorage,
        },
      });

      assert.isTrue(getAuthSpy.calledOnce);
      assert.deepEqual(getAuthSpy.firstCall.args[0], {
        tokenStorage: customTokenStorage,
      });
    });

    it('should call getAuthentication() with undefined when no authOptions provided', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getAuthSpy = sandbox.spy(basicClient, 'getAuthentication');

      basicClient.getSdkGenClient();

      assert.isTrue(getAuthSpy.calledOnce);
      assert.isUndefined(getAuthSpy.firstCall.args[0]);
    });
  });

  describe('Integration with getNetworkSession()', function () {
    it('should call getNetworkSession() internally', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getNetworkSpy = sandbox.spy(basicClient, 'getNetworkSession');

      basicClient.getSdkGenClient();

      assert.isTrue(getNetworkSpy.calledOnce);
    });

    it('should pass networkOptions to getNetworkSession()', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getNetworkSpy = sandbox.spy(basicClient, 'getNetworkSession');

      var customHeaders = { 'X-Custom': 'value' };

      basicClient.getSdkGenClient({
        networkOptions: {
          additionalHeaders: customHeaders,
        },
      });

      assert.isTrue(getNetworkSpy.calledOnce);
      assert.deepEqual(getNetworkSpy.firstCall.args[0], {
        additionalHeaders: customHeaders,
      });
    });

    it('should call getNetworkSession() with undefined when no networkOptions provided', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getNetworkSpy = sandbox.spy(basicClient, 'getNetworkSession');

      basicClient.getSdkGenClient();

      assert.isTrue(getNetworkSpy.calledOnce);
      assert.isUndefined(getNetworkSpy.firstCall.args[0]);
    });

    it('should pass custom retry strategy through networkOptions', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getNetworkSpy = sandbox.spy(basicClient, 'getNetworkSession');

      var customRetryStrategy = {
        maxAttempts: 10,
        shouldRetry: function () {
          return Promise.resolve(true);
        },
        retryAfter: function () {
          return 5;
        },
      };

      basicClient.getSdkGenClient({
        networkOptions: {
          retryStrategy: customRetryStrategy,
        },
      });

      assert.isTrue(getNetworkSpy.calledOnce);
      assert.strictEqual(
        getNetworkSpy.firstCall.args[0].retryStrategy,
        customRetryStrategy
      );
    });
  });

  describe('Combined options', function () {
    it('should pass both authOptions and networkOptions when both provided', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var getAuthSpy = sandbox.spy(basicClient, 'getAuthentication');
      var getNetworkSpy = sandbox.spy(basicClient, 'getNetworkSession');

      var customTokenStorage = {
        store: function () {},
        get: function () {},
        clear: function () {},
      };
      var customHeaders = { 'X-Custom': 'value' };

      basicClient.getSdkGenClient({
        authOptions: {
          tokenStorage: customTokenStorage,
        },
        networkOptions: {
          additionalHeaders: customHeaders,
        },
      });

      assert.isTrue(getAuthSpy.calledOnce);
      assert.isTrue(getNetworkSpy.calledOnce);

      assert.deepEqual(getAuthSpy.firstCall.args[0], {
        tokenStorage: customTokenStorage,
      });

      assert.deepEqual(getNetworkSpy.firstCall.args[0], {
        additionalHeaders: customHeaders,
      });
    });
  });

  describe('Multiple calls', function () {
    it('should create independent SDK-Gen clients on each call', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient1 = basicClient.getSdkGenClient();
      var sdkGenClient2 = basicClient.getSdkGenClient();

      assert.notStrictEqual(sdkGenClient1, sdkGenClient2);
    });

    it('should allow different options for each call', function () {
      var config = new Config(defaultParams);
      var session = new BasicAPISession('test-token', tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      // First call with custom headers
      var sdkGenClient1 = basicClient.getSdkGenClient({
        networkOptions: {
          additionalHeaders: { 'X-Header-1': 'value1' },
        },
      });

      // Second call with different headers
      var sdkGenClient2 = basicClient.getSdkGenClient({
        networkOptions: {
          additionalHeaders: { 'X-Header-2': 'value2' },
        },
      });

      assert.notStrictEqual(sdkGenClient1, sdkGenClient2);
    });
  });

  describe('Configuration transfer from legacy to SDK-Gen', function () {
    it('should transfer base URLs from legacy config to SDK-Gen networkSession', function () {
      var config = new Config(defaultParams);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify base URLs match the ones from legacy sdk config
      assert.equal(
        sdkGenClient.networkSession.baseUrls.baseUrl,
        defaultParams.apiRootURL
      );
      assert.equal(
        sdkGenClient.networkSession.baseUrls.uploadUrl,
        defaultParams.uploadAPIRootURL
      );
    });

    it('should transfer retry strategy settings from legacy config to SDK-Gen networkSession', function () {
      var config = new Config(defaultParams);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify retry settings match legacy config
      assert.equal(
        sdkGenClient.networkSession.retryStrategy.maxAttempts,
        defaultParams.numMaxRetries
      );
      assert.equal(
        sdkGenClient.networkSession.retryStrategy.retryBaseInterval,
        defaultParams.retryIntervalMS/1000
      );
    });

    it('should transfer headers from legacy config to SDK-Gen networkSession', function () {
      var config = new Config(defaultParams);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify headers from legacy config are transferred
      assert.equal(
        sdkGenClient.networkSession.additionalHeaders['User-Agent'],
        defaultParams.request.headers['User-Agent']
      );
    });

    it('should transfer client credentials from legacy to SDK-Gen auth (OAuth)', function () {
      var config = new Config(defaultParams);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify auth has the correct client credentials
      assert.equal(sdkGenClient.auth.config.clientId, defaultParams.clientID);
      assert.equal(
        sdkGenClient.auth.config.clientSecret,
        defaultParams.clientSecret
      );
    });

    it('should transfer JWT config from legacy to SDK-Gen auth (JWT)', function () {
      var config = new Config(jwtParams);
      var session = new AppAuthSession(
        'enterprise',
        'ent123',
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify JWT auth has correct config
      assert.equal(sdkGenClient.auth.config.clientId, jwtParams.clientID);
      assert.equal(sdkGenClient.auth.config.jwtKeyId, jwtParams.appAuth.keyID);
      assert.equal(sdkGenClient.auth.config.enterpriseId, 'ent123');
    });

    it('should transfer CCG config from legacy to SDK-Gen auth (CCG)', function () {
      var config = new Config(ccgParams);
      var session = new CCGAPISession(config, tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify CCG auth has correct config
      assert.equal(sdkGenClient.auth.config.clientId, ccgParams.clientID);
      assert.equal(
        sdkGenClient.auth.config.enterpriseId,
        ccgParams.boxSubjectId
      );
    });

    it('should transfer proxy config from legacy to SDK-Gen networkSession', function () {
      var configWithProxy = {
        ...defaultParams,
        proxy: {
          url: 'http://proxy.example.com:8080',
          username: 'proxyuser',
          password: 'proxypass',
        },
      };
      var config = new Config(configWithProxy);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify proxy config is transferred
      assert.isObject(sdkGenClient.networkSession.proxyConfig);
      assert.equal(
        sdkGenClient.networkSession.proxyConfig.url,
        'http://proxy.example.com:8080'
      );
      assert.equal(
        sdkGenClient.networkSession.proxyConfig.username,
        'proxyuser'
      );
      assert.equal(
        sdkGenClient.networkSession.proxyConfig.password,
        'proxypass'
      );
    });

    it('should transfer custom URLs from legacy to SDK-Gen networkSession', function () {
      var customUrlConfig = {
        ...defaultParams,
        apiRootURL: 'https://custom-api.box.com',
        uploadAPIRootURL: 'https://custom-upload.box.com/api',
        authorizeRootURL: 'https://custom-account.box.com/api',
      };
      var config = new Config(customUrlConfig);
      var tokenInfo = {
        accessToken: 'oauth-token',
        refreshToken: 'refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Verify custom URLs are transferred
      assert.equal(
        sdkGenClient.networkSession.baseUrls.baseUrl,
        'https://custom-api.box.com'
      );
      assert.equal(
        sdkGenClient.networkSession.baseUrls.uploadUrl,
        'https://custom-upload.box.com/api'
      );
      assert.equal(
        sdkGenClient.networkSession.baseUrls.oauth2Url,
        'https://custom-account.box.com/api/oauth2'
      );
    });
  });

  describe('Token sharing between legacy and SDK-Gen', function () {
    it('should share access token from legacy OAuth session to SDK-Gen auth', async function () {
      var config = new Config(defaultParams);
      var legacyAccessToken = 'shared-oauth-access-token-12345';
      var tokenInfo = {
        accessToken: legacyAccessToken,
        refreshToken: 'shared-refresh-token',
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Get token from SDK-Gen auth's token storage
      var sdkGenToken = await sdkGenClient.auth.config.tokenStorage.get();

      assert.isObject(sdkGenToken);
      assert.equal(sdkGenToken.accessToken, legacyAccessToken);
    });

    it('should share access token from legacy BasicAPISession to SDK-Gen auth', function () {
      var config = new Config(defaultParams);
      var legacyAccessToken = 'shared-developer-token';
      var session = new BasicAPISession(legacyAccessToken, tokenManagerFake);

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      assert.equal(sdkGenClient.auth.token, legacyAccessToken);
    });

    it('should share access token from legacy JWT session to SDK-Gen auth', async function () {
      var config = new Config(jwtParams);
      var session = new AppAuthSession(
        'enterprise',
        'ent123',
        config,
        tokenManagerFake
      );
      var legacyAccessToken = 'shared-jwt-access-token';
      session._tokenInfo = {
        accessToken: legacyAccessToken,
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Get token from SDK-Gen auth's token storage
      var sdkGenToken = await sdkGenClient.auth.config.tokenStorage.get();

      assert.isObject(sdkGenToken);
      assert.equal(sdkGenToken.accessToken, legacyAccessToken);
    });

    it('should share access token from legacy CCG session to SDK-Gen auth', async function () {
      var config = new Config(ccgParams);
      var session = new CCGAPISession(config, tokenManagerFake);
      var legacyAccessToken = 'shared-ccg-access-token';
      session._tokenInfo = {
        accessToken: legacyAccessToken,
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Get token from SDK-Gen auth's token storage
      var sdkGenToken = await sdkGenClient.auth.config.tokenStorage.get();
      assert.isObject(sdkGenToken);
      assert.equal(sdkGenToken.accessToken, legacyAccessToken);
    });

    it('should share refresh token from legacy OAuth session to SDK-Gen auth', async function () {
      var config = new Config(defaultParams);
      var legacyRefreshToken = 'shared-refresh-token';
      var tokenInfo = {
        accessToken: 'access-token',
        refreshToken: legacyRefreshToken,
        accessTokenTTLMS: 3600000,
        acquiredAtMS: Date.now(),
      };
      var session = new PersistentAPISession(
        tokenInfo,
        null,
        config,
        tokenManagerFake
      );

      basicClient = new BasicClient(session, config, requestManagerFake);

      var sdkGenClient = basicClient.getSdkGenClient();

      // Get token from SDK-Gen auth's token storage
      var sdkGenToken = await sdkGenClient.auth.config.tokenStorage.get();
      assert.isObject(sdkGenToken);
      assert.equal(sdkGenToken.refreshToken, legacyRefreshToken);
    });
  });
});
