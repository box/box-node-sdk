/**
 * @fileoverview Tests for Anonymous Box API Session.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const assert = require('chai').assert,
	sinon = require('sinon'),
	leche = require('leche'),
	Promise = require('bluebird'),
	mockery = require('mockery');

const TokenManager = require('../../../lib/token-manager');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
let sandbox = sinon.createSandbox(),
	tokenManagerFake,
	CCGAPISession,
	ccgSession,
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
	MODULE_FILE_PATH = '../../../lib/sessions/ccg-session';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('CCGAPISession', function() {

	beforeEach(function() {

		tokenManagerFake = leche.fake(TokenManager.prototype);

		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		// Setup File Under Test
		CCGAPISession = require(MODULE_FILE_PATH);
		ccgSession = new CCGAPISession(config, tokenManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getAccessToken()', function() {

		let newTokenInfo;

		beforeEach(function() {

			newTokenInfo = {
				accessToken: 'newAT',
				accessTokenTTLMS: 100,
				acquiredAtMS: 50
			};
		});

		it('should resolve to stored access token when access tokens are fresh', function() {

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.never();
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(true);

			return ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, testTokenInfo.accessToken);
				});
		});

		it('should request new tokens when current tokens are no longer fresh', function() {

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should request new tokens with options when options are passed in', function() {

			const options = {ip: '127.0.0.1'};

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.withArgs(options)
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return ccgSession.getAccessToken(options)
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});
		});

		it('should only make a single request for new tokens when called multiple times', function() {

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			const promise1 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			const promise2 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			]);
		});

		it('should allow a new request for tokens once in-progress call completes', function() {

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.twice()
				.returns(Promise.resolve(newTokenInfo));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			const promise1 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			const promise2 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			])
				.then(() => ccgSession.getAccessToken());
		});

		it('should return a promise that rejects when the request for new tokens fails', function() {

			const tokensError = new Error('Oh no!');

			ccgSession._tokenInfo = testTokenInfo;
			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.returns(Promise.reject(tokensError));
			sandbox.stub(tokenManagerFake, 'isAccessTokenValid').returns(false);

			return ccgSession.getAccessToken()
				.catch(err => {
					assert.equal(err, tokensError);
				});
		});

		it('should return promise resolving to new tokens when called after refresh', function() {


			sandbox.mock(tokenManagerFake).expects('getTokensClientCredentialsGrant')
				.once()
				.returns(Promise.resolve(newTokenInfo));
			const tokensValidStub = sandbox.stub(tokenManagerFake, 'isAccessTokenValid');
			tokensValidStub.withArgs(testTokenInfo).returns(false);
			tokensValidStub.withArgs(newTokenInfo).returns(true);

			const promise1 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			const promise2 = ccgSession.getAccessToken()
				.then(token => {
					assert.equal(token, newTokenInfo.accessToken);
				});

			return Promise.all([
				promise1,
				promise2
			])
				.then(() => ccgSession.getAccessToken())
				.then(accessToken => {
					assert.equal(accessToken, newTokenInfo.accessToken);
				});
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens with options.ip when called', function() {
			ccgSession._tokenInfo = testTokenInfo;
			const options = {ip: '127.0.0.1, 192.168.10.10'};

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, options)
				.returns(Promise.resolve());

			return ccgSession.revokeTokens(options);
		});

		it('should call tokenManager.revokeTokens without options.ip when called', function() {
			ccgSession._tokenInfo = testTokenInfo;

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withExactArgs(testTokenInfo.accessToken, null)
				.returns(Promise.resolve());

			return ccgSession.revokeTokens(null);
		});

	});

	describe('exchangeToken()', function() {
		const TEST_SCOPE = 'item_preview';
		const TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should get access token with options.ip and return promise resolving to its own token info when called', function() {
			const exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};
			ccgSession._tokenInfo = {accessToken: 'laksjhdksaertiwndgsrdlfk'};

			const options = {ip: '127.0.0.1, 192.168.10.10'};

			sandbox.mock(ccgSession).expects('getAccessToken')
				.withArgs(options)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, options)
				.returns(Promise.resolve(exchangedTokenInfo));

			return ccgSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, options)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should get access token and exchange for lower scope with null options when called', function() {

			const exchangedTokenInfo = {accessToken: 'poaisdlknbadfjg'};

			sandbox.mock(ccgSession).expects('getAccessToken')
				.withArgs(null)
				.returns(Promise.resolve(testTokenInfo.accessToken));
			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(testTokenInfo.accessToken, TEST_SCOPE, TEST_RESOURCE, null)
				.returns(Promise.resolve(exchangedTokenInfo));

			return ccgSession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should return promise that rejects when getting the access token fails', function() {

			const error = new Error('Could not get tokens');

			sandbox.mock(ccgSession)
				.expects('getAccessToken')
				.returns(Promise.reject(error));

			return ccgSession.exchangeToken('item_preview', null)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

});
