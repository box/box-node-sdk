/**
 * @fileoverview Tests for App Auth Box API Session.
 */

/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	leche = require('leche'),
	mockery = require('mockery');

var TokenManager = require('../../../lib/token-manager'),
	Config = require('../../../lib/util/config');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	tokenManagerFake,
	callbackQueue,
	callbackQueueFake,
	CallbackQueueConstructor,
	AppAuthSession,
	appAuthSession,
	config,
	testTokenInfo = {
		accessToken: 'at',
		accessTokenTTLMS: 100,
		acquiredAtMS: 50
	},
	MODULE_FILE_PATH = '../../../lib/sessions/app-auth-session';

var TEST_KEY_ID = 'hbf723ib',
	TEST_PRIVATE_KEY = 'jhdbf8qch34ygq8wefiqehr7t2q3rfgq03e84t2e',
	TEST_PASSPHRASE = 'So secret!',
	TEST_TYPE = 'enterprise',
	TEST_ID = '2938745293';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('AppAuthSession', function() {

	beforeEach(function() {

		config = new Config({
			clientID: 'cID123',
			clientSecret: 'cSecret456',
			expiredBufferMS: 30000,
			staleBufferMS: 120000,
			appAuth: {
				keyID: TEST_KEY_ID,
				privateKey: TEST_PRIVATE_KEY,
				passphrase: TEST_PASSPHRASE
			}
		});

		tokenManagerFake = leche.fake(TokenManager.prototype);
		callbackQueue = leche.create(['push', 'flush']);
		callbackQueueFake = leche.fake(callbackQueue);
		CallbackQueueConstructor = function() {
			return callbackQueueFake;
		};

		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerMock('../util/lazy-async-queue', CallbackQueueConstructor);
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		// Setup File Under Test
		AppAuthSession = require(MODULE_FILE_PATH);
		appAuthSession = new AppAuthSession(TEST_TYPE, TEST_ID, config, tokenManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	// @NOTE(mwiller) 2016-04-12: This private method is called in multiple places. To reduce
	// the number of redundant tests, we decided to test this private function.
	describe('_refreshAppAuthAccessToken()', function() {

		var refreshError;

		beforeEach(function() {
			refreshError = new Error();
		});

		it('should add callback to the upkeep queue when tokens are curently being refreshed', function() {
			var callback1 = sandbox.stub();
			var callback2 = sandbox.stub();
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant');
			sandbox.mock(callbackQueueFake).expects('push').withExactArgs(callback2);
			appAuthSession._refreshAppAuthAccessToken(null, callback1);
			appAuthSession._refreshAppAuthAccessToken(null, callback2);
		});

		it('should call getTokensJWTGrant() with options.ip when called', function() {
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').withArgs(TEST_TYPE, TEST_ID, options);
			appAuthSession._refreshAppAuthAccessToken(options);
		});

		it('should call getTokensJWTGrant() with null options when called', function() {
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').withArgs(TEST_TYPE, TEST_ID, null);
			appAuthSession._refreshAppAuthAccessToken(null);
		});

		it('should propagate a token refresh grant error when called', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			appAuthSession._refreshAppAuthAccessToken(null, function(err) {
				assert.strictEqual(err, refreshError);
				done();
			});
		});

		it('should flush the upkeep queue with a token refresh grant error when one occurs', function() {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(refreshError);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(refreshError);
			appAuthSession._refreshAppAuthAccessToken(null);
		});


		it('should propagate an access token when TokenInfo is propagated', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(null, testTokenInfo);
			sandbox.stub(callbackQueueFake, 'flush');
			appAuthSession._refreshAppAuthAccessToken(null, function(err, accessToken) {
				assert.strictEqual(accessToken, testTokenInfo.accessToken);
				done();
			});
		});

		it('should flush the upkeep queue with an access token when TokenInfo is propagated', function() {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(null, testTokenInfo);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(null, testTokenInfo.accessToken);
			appAuthSession._refreshAppAuthAccessToken(null);
		});

	});


	describe('getAccessToken()', function() {

		it('should call _refreshAppAuthAccessToken() with options.ip and the callback when tokens are not set', function(done) {
			var options = {ip: '127.0.0.1, 192.168.10.10'};

			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').withArgs(options, done).yieldsAsync();
			appAuthSession.getAccessToken(options, done);
		});

		it('should call _refreshAppAuthAccessToken() with null options the callback when tokens are not set', function(done) {
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').withArgs(null, done).yieldsAsync();
			appAuthSession.getAccessToken(null, done);
		});

		it('should call _refreshAppAuthAccessToken() with the callback when tokens are expired', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').withArgs(testTokenInfo, 120000).returns(false); // expired
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').withArgs(null, done).yieldsAsync();
			appAuthSession.getAccessToken(null, done);
		});

		it('should pass tokens to callback when tokens are not expired', function(done) {
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').never();
			appAuthSession.tokenInfo = testTokenInfo;
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').withArgs(testTokenInfo, 120000).returns(true); // expired
			appAuthSession.getAccessToken(null, function(err, token) {

				assert.ifError(err);
				assert.equal(token, testTokenInfo.accessToken);
				done();
			});
		});

	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with null options and its access token when called', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.accessToken, null, done).yields();
			appAuthSession.revokeTokens(null, done);
		});

		it('should call tokenManager.revokeTokens with options.ip and its access token when called', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.accessToken, options, done).yields();
			appAuthSession.revokeTokens(options, done);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should get access token and exchange for lower scope when called with null options', function(done) {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};

			sandbox.mock(appAuthSession).expects('getAccessToken').withArgs(null).yieldsAsync(null, testTokenInfo.accessToken);
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, null)
				.yieldsAsync(null, exchangedTokenInfo);

			appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, exchangedTokenInfo);
				done();
			});
		});

		it('should get access token and exchange for lower scope when called with options.ip', function(done) {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(appAuthSession).expects('getAccessToken').withArgs(options).yieldsAsync(null, testTokenInfo.accessToken);
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, options)
				.yieldsAsync(null, exchangedTokenInfo);

			appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, exchangedTokenInfo);
				done();
			});
		});

		it('should call callback with error when getting the access token fails', function(done) {

			var error = new Error('Could not get access token');

			sandbox.stub(appAuthSession, 'getAccessToken').yieldsAsync(error);

			appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should call callback with error when the token exchange fails', function(done) {

			var error = new Error('Could not exchange token');

			sandbox.stub(appAuthSession, 'getAccessToken').yieldsAsync(null, testTokenInfo.accessToken);
			sandbox.stub(tokenManagerFake, 'exchangeToken').yieldsAsync(error);

			appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});
});
