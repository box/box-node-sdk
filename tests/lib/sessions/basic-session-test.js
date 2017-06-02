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
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH);
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

		it('should return the current access token when called', function(done) {
			basicAPISession.getAccessToken(function(err, data) {
				assert.strictEqual(err, null);
				assert.strictEqual(data, ACCESS_TOKEN);
				done();
			});
		});
	});

	describe('revokeTokens()', function() {

		it('should call tokenManager.revokeTokens() with the current access token when called', function(done) {
			sandbox.mock(tokenManagerFake).expects('revokeTokens').withArgs(ACCESS_TOKEN).yields();
			basicAPISession.revokeTokens(done);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should exchange access token and call callback with exchanged token info when called', function(done) {

			var exchangedTokenInfo = {accessToken: 'bnmdsbfjbsdlkfjblsdt'};

			sandbox.mock(tokenManagerFake).expects('exchangeToken')
				.withArgs(ACCESS_TOKEN, TEST_SCOPE, TEST_RESOURCE)
				.yieldsAsync(null, exchangedTokenInfo);
			basicAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, function(err, data) {

				assert.ifError(err);
				assert.equal(data, exchangedTokenInfo);
				done();
			});
		});

		it('should call callback with error when the token exchange fails', function(done) {

			var error = new Error('Nope!');

			sandbox.stub(tokenManagerFake, 'exchangeToken').yieldsAsync(error);

			basicAPISession.exchangeToken(TEST_SCOPE, TEST_RESOURCE, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});

});
