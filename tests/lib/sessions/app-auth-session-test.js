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
	Promise = require('bluebird'),
	mockery = require('mockery');

var TokenManager = require('../../../lib/token-manager'),
	Config = require('../../../lib/util/config');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	tokenManagerFake,
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

		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
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

	describe('getAccessToken()', function() {

		var newTokenInfo;

		beforeEach(function() {

			newTokenInfo = {
				accessToken: 'newAT',
				accessTokenTTLMS: 100,
				acquiredAtMS: 50
			};
		});

		it('should resolve to stored access token when access tokens are fresh', function() {

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant').never();
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(true);

			return appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, testTokenInfo.accessToken);
				});
		});

		it('should request new tokens when current tokens are no longer fresh', function() {

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs(TEST_TYPE, TEST_ID)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should request new tokens with options when options are passed in', function() {

			var options = {ip: '127.0.0.1'};

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.withArgs(TEST_TYPE, TEST_ID, options)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return appAuthSession.getAccessToken(options)
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should only make a single request for new tokens when called multiple times', function() {

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2]);
		});

		it('should allow a new request for tokens once in-progress call completes', function() {

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.twice()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2])
				.then(() => appAuthSession.getAccessToken());
		});

		it('should return a promise that rejects when the request for new tokens fails', function() {

			var tokensError = new Error('Oh no!');

			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return appAuthSession.getAccessToken()
				.catch(err => {
					assert.equal(err, tokensError);
				});
		});

		it('should return promise resolving to new tokens when called after refresh', function() {


			sandbox.mock(tokenManagerFake).expects('getTokensJWTGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			var tokensValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
			tokensValidStub.withArgs(testTokenInfo).returns(false);
			tokensValidStub.withArgs(newTokenInfo).returns(true);

			var promise1 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = appAuthSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2])
				.then(() => appAuthSession.getAccessToken())
				.then(accessToken => {
					assert.equal(accessToken, newTokenInfo.accessToken);
				});
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with null options and its access token when called', function() {
			appAuthSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, null)
				.returns(Promise.resolve());

			return appAuthSession.revokeTokens(null);
		});

		it('should call tokenManager.revokeTokens with options.ip and its access token when called', function() {
			appAuthSession._tokenInfo = testTokenInfo;
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, options)
				.returns(Promise.resolve());

			return appAuthSession.revokeTokens(options);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should get access token and exchange for lower scope when called with null options', function() {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};

			sandbox.mock(appAuthSession).expects('getAccessToken')
				.withArgs(null)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, null)
				.returns(Promise.resolve(exchangedTokenInfo));

			return appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should get access token and exchange for lower scope when called with options.ip', function() {

			var exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(appAuthSession).expects('getAccessToken')
				.withArgs(options)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, options)
				.returns(Promise.resolve(exchangedTokenInfo));

			return appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, options)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should return promise that rejects when getting the access token fails', function() {

			var error = new Error('Could not get access token');

			sandbox.stub(appAuthSession, 'getAccessToken').returns(Promise.reject(error));

			return appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise that rejects when the token exchange fails', function() {

			var error = new Error('Could not exchange token');

			sandbox.stub(appAuthSession, 'getAccessToken').returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.stub(tokenManagerFake, 'exchangeToken').returns(Promise.reject(error));

			return appAuthSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});
});
