/**
 * @fileoverview Request/Response Error Helper Tests
 */
'use strict';

/* eslint-disable mocha/no-synchronous-tests */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('assert'),
	sinon = require('sinon'),
	mockery = require('mockery');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	errors,
	MODULE_FILE_PATH = '../../../lib/util/errors';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Errors', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('util');
		// Register Module Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		errors = require(MODULE_FILE_PATH);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('buildExpiredAuthError()', function() {
		it('should build an error object with the proper status code and message', function() {
			var response = {
				statusCode: 401
			};
			var errObject = errors.buildExpiredAuthError(response);
			assert(errObject.authExpired);
			assert.strictEqual(errObject.response, response);
			assert.strictEqual(errObject.message, 'Expired Auth: Auth code or refresh token has expired.');
		});
	});

	describe('buildResponseError()', function() {
		it('should build an error object with the proper properties when called with a response object and a message', function() {
			var response = {
				statusCode: 505,
				body: {foo: 'bar'}
			};
			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.strictEqual(errObject.message, 'testMessage');
			assert.strictEqual(errObject.statusCode, 505);
			assert.strictEqual(errObject.response, response);
		});
	});

	describe('buildUnexpectedResponseError()', function() {
		it('should build an error object with the proper properties when called with a response object', function() {
			var response = {
				statusCode: 505,
				body: {foo: 'bar'}
			};
			var errObject = errors.buildUnexpectedResponseError(response);
			assert.strictEqual(errObject.message, 'Unexpected API Response [505 HTTP Version not Supported]');
			assert.strictEqual(errObject.statusCode, 505);
			assert.strictEqual(errObject.response, response);
		});

		it('should build an error object with the proper properties when called with an error response object', function() {
			var response = {
				statusCode: 505,
				body: {
					code: 'error_code',
					message: 'Bad things happened',
					foo: 'bar'
				}
			};

			var errObject = errors.buildUnexpectedResponseError(response);
			assert.strictEqual(errObject.message, 'Unexpected API Response [505 HTTP Version not Supported] (error_code: "Bad things happened")');
			assert.strictEqual(errObject.statusCode, 505);
			assert.strictEqual(errObject.response, response);
		});
	});

});
