/**
 * @fileoverview Tests for Basic Box API Session.
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
	BasicAPISession,
	basicAPISession,
	ACCESS_TOKEN = 'abc123imatoken',
	MODULE_FILE_PATH = '../../../lib/sessions/basic-session';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('BasicAPISession', function() {

	var tokenManagerFake;

	beforeEach(function() {

		tokenManagerFake = leche.fake(TokenManager.prototype);

		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		// Setup File Under Test
		BasicAPISession = require(MODULE_FILE_PATH);
		basicAPISession = new BasicAPISession(ACCESS_TOKEN, tokenManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getAccessToken()', function() {

		it('should return the current access token when called', function() {
			return basicAPISession.getAccessToken(null)
				.then(data => {
					assert.strictEqual(data, ACCESS_TOKEN);
				});
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens() with the current access token and null options when called', function() {
			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withArgs(ACCESS_TOKEN, null)
				.returns(Promise.resolve());

			return basicAPISession.revokeTokens(null);
		});

		it('should call tokenManager.revokeTokens() with the current access token and null options when called', function() {
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('revokeTokens')
				.withArgs(ACCESS_TOKEN, options)
				.returns(Promise.resolve());

			return basicAPISession.revokeTokens(options);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should exchange access token with null options and return promise resolving to exchanged token info when called', function() {

			var exchangedTokenInfo = {accessToken: 'bnmdsbfjbsdlkfjblsdt'};

			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(ACCESS_TOKEN, TEST_SCOPE, TEST_RESOURCE, null)
				.returns(Promise.resolve(exchangedTokenInfo));

			return basicAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should exchange access token with options.ip and return promise resolving to exchanged token info when called', function() {

			var exchangedTokenInfo = {accessToken: 'bnmdsbfjbsdlkfjblsdt'};
			var options = {};
			options.ip = '127.0.0.1, 192.168.10.10';

			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(ACCESS_TOKEN, TEST_SCOPE, TEST_RESOURCE, options)
				.returns(Promise.resolve(exchangedTokenInfo));

			return basicAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, options)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should return promise that rejects when the token exchange fails', function() {

			var error = new Error('Nope!');

			sandbox.stub(tokenManagerFake, 'exchangeToken').returns(Promise.reject(error));

			basicAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, null)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

});
