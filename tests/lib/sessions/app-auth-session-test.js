/**
 * @fileoverview Tests for App Auth Box API Session.
 * @author mwiller
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
		CallbackQueueConstructor = function() { return callbackQueueFake; };

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
			appAuthSession._refreshAppAuthAccessToken(callback1);
			appAuthSession._refreshAppAuthAccessToken(callback2);
		});

		it('should call getTokensJWTGrant() when called', function() {
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').withArgs(TEST_TYPE, TEST_ID);
			appAuthSession._refreshAppAuthAccessToken();
		});

		it('should propagate a token refresh grant error when called', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			appAuthSession._refreshAppAuthAccessToken(function(err) {
				assert.strictEqual(err, refreshError);
				done();
			});
		});

		it('should flush the upkeep queue with a token refresh grant error when one occurs', function() {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(refreshError);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(refreshError);
			appAuthSession._refreshAppAuthAccessToken();
		});


		it('should propagate an access token when TokenInfo is propagated', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(null, testTokenInfo);
			sandbox.stub(callbackQueueFake, 'flush');
			appAuthSession._refreshAppAuthAccessToken(function(err, accessToken) {
				assert.strictEqual(accessToken, testTokenInfo.accessToken);
				done();
			});
		});

		it('should flush the upkeep queue with an access token when TokenInfo is propagated', function() {
			sandbox.stub(tokenManagerFake, 'getTokensJWTGrant').yields(null, testTokenInfo);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(null, testTokenInfo.accessToken);
			appAuthSession._refreshAppAuthAccessToken();
		});

	});


	describe('getAccessToken()', function() {

		var isAccessTokenValidStub;

		beforeEach(function() {
			isAccessTokenValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
		});

		it('should call _refreshAppAuthAccessToken() with the callback when tokens are not set', function(done) {
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').yields();
			appAuthSession.getAccessToken(done);
		});

		it('should call _refreshAppAuthAccessToken() with the callback when tokens are expired', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(false); // expired
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').yields();
			appAuthSession.getAccessToken(done);
		});

		it('should call _refreshAppAuthAccessToken() in the background when tokens are stale', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(true); // expired
			isAccessTokenValidStub.withArgs(testTokenInfo, 120000).returns(false); // stale

			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').withExactArgs();

			appAuthSession.getAccessToken(done);
		});

		it('should pass tokens to callback when tokens are not expired', function(done) {
			sandbox.mock(appAuthSession).expects('_refreshAppAuthAccessToken').never();
			appAuthSession.tokenInfo = testTokenInfo;
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(true); // expired
			isAccessTokenValidStub.withArgs(testTokenInfo, 120000).returns(true); // stale
			appAuthSession.getAccessToken(done);
		});

	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with its refresh token when called', function(done) {
			appAuthSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.accessToken, done).yields();
			appAuthSession.revokeTokens(done);
		});

	});

});
