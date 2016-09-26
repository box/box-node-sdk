/**
 * @fileoverview Tests for Basic Box API Session.
 * @author mwiller
 */
/* eslint no-new: 0 */
/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	leche = require('leche'),
	mockery = require('mockery');

var TokenManager = require('../../../lib/token-manager');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	tokenManagerFake,
	callbackQueue,
	callbackQueueFake,
	CallbackQueueConstructor,
	tokenStore,
	tokenStoreFake,
	PersistentAPISession,
	persistentAPISession,
	persistentAPISessionWithTokenStore;

var config = {
		clientID: 'cID123',
		clientSecret: 'cSecret456',
		expiredBufferMS: 30000,
		staleBufferMS: 120000
	},
	testTokenInfo = {
		accessToken: 'at',
		refreshToken: 'rt',
		accessTokenTTLMS: 100,
		acquiredAtMS: 50
	},
	MODULE_FILE_PATH = '../../../lib/sessions/persistent-session';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('PersistentAPISession', function() {

	beforeEach(function() {

		tokenManagerFake = leche.fake(TokenManager.prototype);
		callbackQueue = leche.create(['push', 'flush']);
		callbackQueueFake = leche.fake(callbackQueue);
		CallbackQueueConstructor = function() {
			return callbackQueueFake;
		};
		tokenStore = leche.create(['read', 'write', 'clear']);
		tokenStoreFake = leche.fake(tokenStore);

		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerMock('../util/lazy-async-queue', CallbackQueueConstructor);
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('assert');
		mockery.registerAllowable('util');
		mockery.registerAllowable('../util/errors');
		mockery.registerAllowable(MODULE_FILE_PATH);

		// Setup File Under Test
		PersistentAPISession = require(MODULE_FILE_PATH);
		persistentAPISession = new PersistentAPISession(testTokenInfo, null, config, tokenManagerFake);
		persistentAPISessionWithTokenStore = new PersistentAPISession(testTokenInfo, tokenStoreFake, config, tokenManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should create an instance of a PersistentAPISession when given TokenInfo', function() {
			var newSession = new PersistentAPISession(testTokenInfo);
			assert(newSession instanceof PersistentAPISession, 'Instance of PersistentAPISession created');
		});

		it('should throw an exception when not given any tokenInfo', function() {
			assert.throws(function() {
				new PersistentAPISession({ bogus: 'data' });
			});
		});

		it('should throw an exception when given an invalid tokenInfo', function() {
			assert.throws(function() {
				new PersistentAPISession(null);
			});
			assert.throws(function() {
				var invalidTokenInfo = Object.create(testTokenInfo);
				invalidTokenInfo.refreshToken = undefined;
				new PersistentAPISession(invalidTokenInfo);
			});
		});

		it('should throw an exception when given an incomplete token store', function() {
			var tokenStoreMissingGet = {
				write: function() {}
			};
			var tokenStoreMissingSet = {
				read: function() {}
			};

			assert.throws(function() {
				new PersistentAPISession(testTokenInfo, tokenStoreMissingGet);
			});
			assert.throws(function() {
				new PersistentAPISession(testTokenInfo, tokenStoreMissingSet);
			});
		});

	});

	// @NOTE(fschott) 2014-04-03: This private method is called in multiple places. To reduce
	// the number of redundent tests, we decided to test this private function.
	describe('_refreshTokens()', function() {

		var refreshError,
			error;

		beforeEach(function() {
			refreshError = new Error();
			error = new Error();
			refreshError.statusCode = 400;
		});

		it('should only make 1 call to refresh tokens when called multiple times', function() {
			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant').once();
			persistentAPISession._refreshTokens();
			persistentAPISession._refreshTokens();
			persistentAPISession._refreshTokens();
		});

		it('should add callback to the upkeep queue when tokens are curently being refreshed', function() {
			var callback1 = sandbox.stub();
			var callback2 = sandbox.stub();
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant');
			sandbox.mock(callbackQueueFake).expects('push').withExactArgs(callback2);
			persistentAPISession._refreshTokens(callback1);
			persistentAPISession._refreshTokens(callback2);
		});

		it('should call getTokensRefreshGrant with the current refresh token when called', function() {
			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant').withArgs(testTokenInfo.refreshToken);
			persistentAPISession._refreshTokens();
		});

		it('should propagate an access token when TokenInfo is propagated', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(null, testTokenInfo);
			sandbox.stub(callbackQueueFake, 'flush');
			persistentAPISession._refreshTokens(function(err, accessToken) {
				assert.strictEqual(accessToken, testTokenInfo.accessToken);
				done();
			});
		});

		it('should flush the upkeep queue with an access token when TokenInfo is propagated', function() {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(null, testTokenInfo);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(null, testTokenInfo.accessToken);
			persistentAPISession._refreshTokens();
		});

		it('should propagate a 400 BAD REQUEST error when called without token store', function(done) {
			refreshError.statusCode = 400;
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			persistentAPISession._refreshTokens(function(err) {
				assert.strictEqual(err, refreshError);
				done();
			});
		});

		it('should flush the upkeep queue with an error when one is propagated and there is a token store', function() {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(error);
			sandbox.stub(tokenStoreFake, 'clear').yields();
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(error);
			persistentAPISessionWithTokenStore._refreshTokens();
		});

		it('should propagate a normal error when there is a token store', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(error);
			sandbox.stub(callbackQueueFake, 'flush');
			sandbox.stub(tokenStoreFake, 'clear').yields();
			persistentAPISessionWithTokenStore._refreshTokens(function(err) {
				assert.strictEqual(err, error);
				done();
			});
		});

		it('should read from token store on 400 BAD REQUEST error when called and when there is a token store', function() {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(refreshError);
			sandbox.mock(tokenStoreFake).expects('read');
			persistentAPISessionWithTokenStore._refreshTokens();
		});

		it('should call tokenStore.clear() when _finishTokenRefresh() is called with an error and there is a token store', function() {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			sandbox.stub(tokenStoreFake, 'read').yields(error);
			sandbox.mock(tokenStoreFake).expects('clear').withExactArgs(sinon.match.func).yields();
			persistentAPISessionWithTokenStore._refreshTokens();
		});

		it('should propagate error when token store is present and token store read returns an error', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			sandbox.mock(tokenStoreFake).expects('read').yields(error);
			sandbox.stub(tokenStoreFake, 'clear').yields();
			persistentAPISessionWithTokenStore._refreshTokens(function(err) {
				assert.strictEqual(err, error);
				done();
			});
		});

		it('should compare refresh token in store with current refresh token and propagate "expired tokens" error if they match when called and token store exists', function(done) {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			sandbox.mock(tokenStoreFake).expects('read').yields(null, testTokenInfo);
			sandbox.stub(tokenStoreFake, 'clear').yields();
			persistentAPISessionWithTokenStore._refreshTokens(function(err) {
				assert(err.authExpired);
				done();
			});
		});

		it('should propagate tokens from store when refresh fails but tokens were already refreshed and stored', function(done) {

			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yieldsAsync(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			sandbox.mock(tokenStoreFake).expects('read').yields(null, Object.assign(testTokenInfo, {
				accessToken: 'newAT',
				refreshToken: 'newRT'
			}));
			sandbox.stub(tokenStoreFake, 'clear').yields();
			persistentAPISessionWithTokenStore._refreshTokens(function(err, accessToken) {
				assert.ifError(err);
				assert.strictEqual(accessToken, 'newAT');
				done();
			});
		});

		it('should write the new token to the store when grant is successful when called and token store exists', function() {
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').yields(null, testTokenInfo);
			sandbox.mock(tokenStoreFake).expects('write');
			persistentAPISessionWithTokenStore._refreshTokens();
		});
	});


	describe('getAccessToken()', function() {

		var isAccessTokenValidStub;

		beforeEach(function() {
			isAccessTokenValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
		});

		it('should call _refreshTokens() with the callback when tokens are expired', function(done) {
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(false); // expired
			sandbox.mock(persistentAPISession).expects('_refreshTokens').yields();
			persistentAPISession.getAccessToken(done);
		});

		it('should call _refreshTokens() in the background when tokens are stale', function(done) {
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(true); // expired
			isAccessTokenValidStub.withArgs(testTokenInfo, 120000).returns(false); // stale
			sandbox.mock(persistentAPISession).expects('_refreshTokens');
			persistentAPISession.getAccessToken(done);
		});

		it('should pass tokens to callback when tokens are not expired', function(done) {
			isAccessTokenValidStub.withArgs(testTokenInfo, 30000).returns(true); // expired
			isAccessTokenValidStub.withArgs(testTokenInfo, 120000).returns(true); // stale
			persistentAPISession.getAccessToken(done);
		});

	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with its refresh token when called', function(done) {
			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.refreshToken, done).yields();
			persistentAPISession.revokeTokens(done);
		});

	});

	describe('handleExpiredTokensError()', function() {

		it('should clear the token store (if one exists) and flush the upkeep queue with an error when called', function(done) {
			var expiredTokensError = new Error('Uh Oh! Expired Tokens');
			sandbox.mock(tokenStoreFake).expects('clear').yieldsAsync();
			sandbox.stub(callbackQueueFake, 'flush');
			persistentAPISessionWithTokenStore.handleExpiredTokensError(expiredTokensError, function() {
				done();
			});
		});

		it('should flush the upkeep queue with an error after clear() finishes when called', function(done) {
			var expiredTokensError = new Error('Uh Oh! Expired Tokens');
			tokenStoreFake.clear = function(callback) {
				sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(expiredTokensError);
				callback(expiredTokensError);
			};
			persistentAPISessionWithTokenStore.handleExpiredTokensError(expiredTokensError, function() {
				done();
			});
		});

		it('should propagate any token store clear errors when they occur', function(done) {
			var tokenStoreError = new Error('Uh Oh! Clearing the token store failed');
			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync(tokenStoreError);
			sandbox.stub(callbackQueueFake, 'flush');
			persistentAPISessionWithTokenStore.handleExpiredTokensError(tokenStoreError, function(err) {
				assert.equal(err, tokenStoreError);
				done();
			});
		});

		it('should propagate the original error when clearing the token store is successful', function(done) {
			var expiredTokensError = new Error('Uh Oh! Expired Tokens');
			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync();
			sandbox.stub(callbackQueueFake, 'flush');
			persistentAPISessionWithTokenStore.handleExpiredTokensError(expiredTokensError, function(err) {
				assert.equal(err, expiredTokensError);
				done();
			});
		});

		it('should propagate the original error and flush the upkeep queue with an error when no token store exists', function(done) {
			var expiredTokensError = new Error('Uh Oh! Expired Tokens');
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(expiredTokensError);
			persistentAPISession.handleExpiredTokensError(expiredTokensError, function(err) {
				assert.equal(err, expiredTokensError);
				done();
			});
		});

	});

});
