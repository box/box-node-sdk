/**
 * @fileoverview Tests for Basic Box API Session.
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

});
