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
		AnonymousAPISession = require(MODULE_FILE_PATH);
		anonymousSession = new AnonymousAPISession(config, tokenManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	// @NOTE(fschott) 2014-04-03: This private method is called in multiple places. To reduce
	// the number of redundent tests, we decided to test this private function.
	describe('_refreshAnonymousAccessToken()', function() {

		var refreshError,
			getTokensStub;

		beforeEach(function() {
			refreshError = new Error();
			getTokensStub = sandbox.stub(tokenManagerFake, 'getTokensClientCredentialsGrant');
		});

		it('should add callback to the upkeep queue when tokens are curently being refreshed', function() {
			var callback1 = sandbox.stub();
			var callback2 = sandbox.stub();
			sandbox.mock(callbackQueueFake).expects('push').withExactArgs(callback2);
			anonymousSession._refreshAnonymousAccessToken(null, callback1);
			anonymousSession._refreshAnonymousAccessToken(null, callback2);
		});

		it('should call getTokensClientCredentialsGrant when called', function() {
			getTokensStub.restore(); // Unstub so that we can mock it out instead
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant');
			anonymousSession._refreshAnonymousAccessToken(null);
		});

		it('should call getTokensClientCredentialsGrant without options when called', function() {
			var tokenInfo = {accessToken: 'at'};

			getTokensStub.restore(); // Unstub so that we can mock it out instead
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant').withArgs(null).returns(tokenInfo);
			anonymousSession._refreshAnonymousAccessToken(null);
		});

		it('should call getTokensClientCredentialsGrant with options when called', function() {
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';
			var tokenInfo = {accessToken: 'at'};

			getTokensStub.restore(); // Unstub so that we can mock it out instead
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant').withArgs(options).returns(tokenInfo);
			anonymousSession._refreshAnonymousAccessToken(options);
		});

		it('should propagate a token refresh grant error when called', function(done) {
			getTokensStub.yields(refreshError);
			sandbox.stub(callbackQueueFake, 'flush');
			anonymousSession._refreshAnonymousAccessToken(null, function(err) {
				assert.strictEqual(err, refreshError);
				done();
			});
		});

		it('should flush the upkeep queue with a token refresh grant error when one occurs', function() {
			getTokensStub.yields(refreshError);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(refreshError);
			anonymousSession._refreshAnonymousAccessToken(null);
		});


		it('should propagate an access token when TokenInfo is propagated', function(done) {
			getTokensStub.yields(null, testTokenInfo);
			sandbox.stub(callbackQueueFake, 'flush');
			anonymousSession._refreshAnonymousAccessToken(null, function(err, accessToken) {
				assert.strictEqual(accessToken, testTokenInfo.accessToken);
				done();
			});
		});

		it('should flush the upkeep queue with an access token when TokenInfo is propagated', function() {
			getTokensStub.yields(null, testTokenInfo);
			sandbox.mock(callbackQueueFake).expects('flush').withExactArgs(null, testTokenInfo.accessToken);
			anonymousSession._refreshAnonymousAccessToken(null);
		});

	});

	describe('getAccessToken()', function() {

		it('should call refreshAnonymousAccessToken() with the callback when tokens are expired', function(done) {
			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').withArgs(testTokenInfo, 120000).returns(false); // expired
			sandbox.mock(anonymousSession).expects('_refreshAnonymousAccessToken').withArgs(null, done).yieldsAsync();
			anonymousSession.getAccessToken(null, done);
		});

		it('should call refreshAnonymousAccessToken() with options when tokens are expired', function(done) {
			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').withArgs(testTokenInfo, 120000).returns(false);

			var options = {ip: '127.0.0.1, 192.168.10.10'};
			sandbox.mock(anonymousSession).expects('_refreshAnonymousAccessToken').withArgs(options, done).yieldsAsync();

			anonymousSession.getAccessToken(options, done);
		});

		it('should pass tokens to callback when tokens are not expired', function(done) {
			sandbox.mock(anonymousSession).expects('_refreshAnonymousAccessToken').never();
			anonymousSession.tokenInfo = testTokenInfo;
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').withArgs(testTokenInfo, 120000).returns(true); // stale
			anonymousSession.getAccessToken(null, function(err, token) {

				assert.ifError(err);
				assert.equal(token, testTokenInfo.accessToken);
				done();
			});
		});

	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with options.ip when called', function(done) {
			anonymousSession.tokenInfo = testTokenInfo;
			var options = {ip: '127.0.0.1, 192.168.10.10'};

			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.accessToken, options, done).yields();
			anonymousSession.revokeTokens(options, done);
		});

		it('should call tokenManager.revokeTokens without options.ip when called', function(done) {
			anonymousSession.tokenInfo = testTokenInfo;

			sandbox.mock(tokenManagerFake).expects('revokeTokens').withExactArgs(testTokenInfo.accessToken, null, done).yields();
			anonymousSession.revokeTokens(null, done);
		});

	});

	describe('exchangeToken()', function() {

		it('should get access token with options.ip and call callback with its own token info when called', function(done) {

			var tokenInfo = {accessToken: 'laksjhdksaertiwndgsrdlfk'};
			anonymousSession.tokenInfo = tokenInfo;

			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(anonymousSession).expects('getAccessToken').withArgs(options).yieldsAsync(null, tokenInfo.accessToken);
			anonymousSession.exchangeToken('item_preview', null, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, tokenInfo);
				done();
			});
		});

		it('should get access token with null options and call callback with its own token info when called', function(done) {

			var tokenInfo = {accessToken: 'laksjhdksaertiwndgsrdlfk'};
			anonymousSession.tokenInfo = tokenInfo;

			sandbox.mock(anonymousSession).expects('getAccessToken').withArgs(null).yieldsAsync(null, tokenInfo.accessToken);
			anonymousSession.exchangeToken('item_preview', null, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, tokenInfo);
				done();
			});
		});

		it('should call callback with error when getting the access token fails', function(done) {

			var error = new Error('Could not get tokens');

			sandbox.mock(anonymousSession).expects('getAccessToken').yieldsAsync(error);
			anonymousSession.exchangeToken('item_preview', null, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});

});
