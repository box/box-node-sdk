/**
 * @fileoverview Tests for Anonymous Box API Session.
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

var TokenManager = require('../../../lib/token-manager');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	tokenManagerFake,
	AnonymousAPISession,
	anonymousSession,
	testTokenInfo = {
		accessToken: 'at',
		accessTokenTTLMS: 100,
		acquiredAtMS: 50
	},
	config = {
		clientID: 'cID123',
		clientSecret: 'cSecret456',
		expiredBufferMS: 30000,
		staleBufferMS: 120000
	},
	MODULE_FILE_PATH = '../../../lib/sessions/anonymous-session';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('AnonymousAPISession', function() {

	beforeEach(function() {

		tokenManagerFake = leche.fake(TokenManager.prototype);

		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		// Setup File Under Test
		AnonymousAPISession = require(MODULE_FILE_PATH);
		anonymousSession = new AnonymousAPISession(config, tokenManagerFake);
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

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant').never();
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(true);

			return anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, testTokenInfo.accessToken);
				});
		});

		it('should request new tokens when current tokens are no longer fresh', function() {

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should request new tokens with options when options are passed in', function() {

			var options = {ip: '127.0.0.1'};

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.withArgs(options)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return anonymousSession.getAccessToken(options)
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should only make a single request for new tokens when called multiple times', function() {

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2]);
		});

		it('should allow a new request for tokens once in-progress call completes', function() {

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.twice()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			var promise1 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2])
				.then(() => anonymousSession.getAccessToken());
		});

		it('should return a promise that rejects when the request for new tokens fails', function() {

			var tokensError = new Error('Oh no!');

			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return anonymousSession.getAccessToken()
				.catch(err => {
					assert.equal(err, tokensError);
				});
		});

		it('should return promise resolving to new tokens when called after refresh', function() {


			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			var tokensValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
			tokensValidStub.withArgs(testTokenInfo).returns(false);
			tokensValidStub.withArgs(newTokenInfo).returns(true);

			var promise1 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			var promise2 = anonymousSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([promise1, promise2])
				.then(() => anonymousSession.getAccessToken());
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with options.ip when called', function() {
			anonymousSession.tokenInfo = testTokenInfo;
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, options)
				.returns(Promise.resolve());

			return anonymousSession.revokeTokens(options);
		});

		it('should call tokenManager.revokeTokens without options.ip when called', function() {
			anonymousSession.tokenInfo = testTokenInfo;

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, null)
				.returns(Promise.resolve());

			return anonymousSession.revokeTokens(null);
		});

	});

	describe('exchangeToken()', function() {

		it('should get access token with options.ip and return promise resolving to its own token info when called', function() {

			var tokenInfo = {accessToken: 'laksjhdksaertiwndgsrdlfk'};
			anonymousSession.tokenInfo = tokenInfo;

			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(anonymousSession).expects('getAccessToken')
				.withArgs(options)
				.returns(Promise.resolve(tokenInfo.accessToken));

			return anonymousSession.exchangeToken('item_preview', null, options)
				.then(data => {
					assert.equal(data, tokenInfo);
				});
		});

		it('should get access token with null options and return promise resolving to its own token info when called', function() {

			var tokenInfo = {accessToken: 'laksjhdksaertiwndgsrdlfk'};
			anonymousSession.tokenInfo = tokenInfo;

			sandbox.mock(anonymousSession).expects('getAccessToken')
				.withArgs(null)
				.returns(Promise.resolve(tokenInfo.accessToken));

			return anonymousSession.exchangeToken('item_preview', null, null)
				.then(data => {
					assert.equal(data, tokenInfo);
				});
		});

		it('should return promise that rejects when getting the access token fails', function() {

			var error = new Error('Could not get tokens');

			sandbox.mock(anonymousSession)
				.expects('getAccessToken')
				.returns(Promise.reject(error));

			return anonymousSession.exchangeToken('item_preview', null)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

});
