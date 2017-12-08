/**
 * @fileoverview Tests for Basic Box API Session.
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
	Promise = require('bluebird'),
	mockery = require('mockery');

var TokenManager = require('../../../lib/token-manager');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	tokenManagerFake,
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
		tokenStore = leche.create([
			'read',
			'write',
			'clear'
		]);
		tokenStoreFake = leche.fake(tokenStore);

		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);

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
				write() { /**/ }
			};
			var tokenStoreMissingSet = {
				read() { /**/ }
			};

			assert.throws(function() {
				new PersistentAPISession(testTokenInfo, tokenStoreMissingGet);
			});
			assert.throws(function() {
				new PersistentAPISession(testTokenInfo, tokenStoreMissingSet);
			});
		});

	});

	describe('getAccessToken()', function() {

		var newTokenInfo;

		beforeEach(function() {

			newTokenInfo = {
				accessToken: 'newAT',
				refreshToken: 'newRT',
				accessTokenTTLMS: 100,
				acquiredAtMS: 50
			};
		});

		it('should resolve to stored access token when access tokens are fresh', function() {

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.never();
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(true);

			return persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, testTokenInfo.accessToken);
				});
		});

		it('should request new tokens when current tokens are no longer fresh', function() {

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.withArgs(testTokenInfo.refreshToken)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should request new tokens with options when options are passed in', function() {

			var options = {ip: '127.0.0.1'};

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.withArgs(testTokenInfo.refreshToken, options)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return persistentAPISession.getAccessToken(options)
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should only make a single request for new tokens when called multiple times', function() {

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			]);
		});

		it('should allow a new request for tokens once in-progress call completes', function() {

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.twice()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			])
				.then(() => persistentAPISession.getAccessToken());
		});

		it('should return a promise that rejects when the request for new tokens fails', function() {

			var tokensError = new Error('Oh no!');

			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return persistentAPISession.getAccessToken()
				.catch(err => {
					assert.equal(err, tokensError);
				});
		});

		it('should read tokens from token store when one is present and the refresh request fails with a 400 error', function() {

			var tokensError = new Error('Refresh token is old');
			tokensError.statusCode = 400;

			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);
			sandbox.mock(tokenStoreFake).expects('read')
				.yieldsAsync(null, newTokenInfo);
			sandbox.stub(tokenStoreFake, 'write').yieldsAsync();

			return persistentAPISessionWithTokenStore.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should return a promise that rejects with auth error when the refresh fails and there are no new tokens in the store', function() {

			var tokensError = new Error('Refresh token is old');
			tokensError.statusCode = 400;
			tokensError.response = {
				statusCode: 400
			};

			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);
			sandbox.mock(tokenStoreFake).expects('read')
				.yieldsAsync(null, testTokenInfo);
			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync();

			return persistentAPISessionWithTokenStore.getAccessToken()
				.catch(err => {
					assert.propertyVal(err, 'authExpired', true);
				});
		});

		it('should write new tokens to store when they are acquired', function() {

			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').returns(Promise.resolve(newTokenInfo));
			sandbox.mock(tokenStoreFake).expects('write')
				.withArgs(newTokenInfo)
				.yieldsAsync();

			return persistentAPISessionWithTokenStore.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should return a promise that rejects when store write fails', function() {

			var storeError = new Error('Write failed!');

			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);
			sandbox.stub(tokenManagerFake, 'getTokensRefreshGrant').returns(Promise.resolve(newTokenInfo));
			sandbox.mock(tokenStoreFake).expects('write')
				.withArgs(newTokenInfo)
				.yieldsAsync(storeError);
			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync();

			return persistentAPISessionWithTokenStore.getAccessToken()
				.catch(err => {
					assert.equal(err, storeError);
				});
		});

		it('should return promise resolving to new tokens when called after refresh', function() {


			sandbox.mock(tokenManagerFake).expects('getTokensRefreshGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			var tokensValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
			tokensValidStub.withArgs(testTokenInfo).returns(false);
			tokensValidStub.withArgs(newTokenInfo).returns(true);

			var promise1 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = persistentAPISession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			])
				.then(() => persistentAPISession.getAccessToken())
				.then(accessToken => {
					assert.equal(accessToken, newTokenInfo.accessToken);
				});
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with its refresh token and options.ip when called', function() {
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.refreshToken, options)
				.returns(Promise.resolve());

			return persistentAPISession.revokeTokens(options);
		});

		it('should call tokenManager.revokeTokens with its refresh token and null options when called', function() {
			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.refreshToken, null)
				.returns(Promise.resolve());

			persistentAPISession.revokeTokens(null);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should get access token and exchange for lower scope with null options when called', function() {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};

			sandbox.mock(persistentAPISession).expects('getAccessToken')
				.withArgs(null)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, null)
				.returns(Promise.resolve(exchangedTokenInfo));

			return persistentAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should get access token and exchange for lower scope with options.ip when called', function() {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(persistentAPISession).expects('getAccessToken')
				.withArgs(options)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, options)
				.returns(Promise.resolve(exchangedTokenInfo));

			return persistentAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, options)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should reject when getting the access token fails', function() {

			var error = new Error('Could not get access token');

			sandbox.stub(persistentAPISession, 'getAccessToken').returns(Promise.reject(error));

			return persistentAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should reject when the token exchange fails', function() {

			var error = new Error('Could not exchange token');

			sandbox.stub(persistentAPISession, 'getAccessToken').returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.stub(tokenManagerFake, 'exchangeToken').returns(Promise.reject(error));

			return persistentAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

	describe('handleExpiredTokensError()', function() {

		it('should return a promise that rejects with passed-in error when no token store is available', function() {

			var error = new Error('Something bad happened.');

			return persistentAPISession.handleExpiredTokensError(error)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should clear token store when one is available', function() {

			sandbox.mock(tokenStoreFake).expects('clear');

			persistentAPISessionWithTokenStore.handleExpiredTokensError();
		});

		it('should return promise that rejects with passed-in error when token store clear succeeds', function() {

			var error = new Error('Something bad happened.');

			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync();

			return persistentAPISessionWithTokenStore.handleExpiredTokensError(error)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise that rejects with token store error when token store clear fails', function() {

			var error = new Error('Something bad happened.'),
				tokenStoreError = new Error('Token store is busted');

			sandbox.stub(tokenStoreFake, 'clear').yieldsAsync(tokenStoreError);

			return persistentAPISessionWithTokenStore.handleExpiredTokensError(error)
				.catch(err => {
					assert.equal(err, tokenStoreError);
				});
		});
	});
});
