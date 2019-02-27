/**
 * @fileoverview Request/Response Error Helper Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('assert'),
	sinon = require('sinon'),
	mockery = require('mockery');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	errors,
	MODULE_FILE_PATH = '../../../lib/util/errors';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Errors', function() {

	beforeEach(function() {
		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		errors = require(MODULE_FILE_PATH);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('buildAuthError()', function() {
		it('should build an error object with the proper status code and message', function() {
			var response = {
				statusCode: 401
			};
			var errObject = errors.buildAuthError(response);
			assert(errObject.authExpired);
			assert.strictEqual(errObject.response, response);
			assert.strictEqual(errObject.message, 'Expired Auth: Auth code or refresh token has expired [401 Unauthorized]');
		});

		it('should use provided message when message argument is passed', function() {

			var response = {
				statusCode: 401
			};
			var message = 'test';
			var errObject = errors.buildAuthError(response, message);
			assert(errObject.authExpired);
			assert.strictEqual(errObject.response, response);
			assert.strictEqual(errObject.message, 'test [401 Unauthorized]');
		});
	});

	describe('buildResponseError()', function() {
		it('should build an error object with the proper properties when called with a response object and a message', function() {
			var response = {
				statusCode: 505,
				body: {foo: 'bar'}
			};
			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.strictEqual(errObject.message, 'testMessage [505 HTTP Version not Supported]');
			assert.strictEqual(errObject.statusCode, 505);
			assert.strictEqual(errObject.response, response);
		});

		it('should add request ID to error message when present in body', function() {

			var requestID = '98nq34otquhet';

			var response = {
				statusCode: 505,
				body: {
					foo: 'bar',
					request_id: requestID
				}
			};
			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.strictEqual(errObject.message, `testMessage [505 HTTP Version not Supported | ${requestID}]`);
		});

		it('should add trace ID to error message when present in headers', function() {

			var traceID = 'KUHFIUYVIYTFIYTF*&^TI&YGIU';

			var response = {
				statusCode: 505,
				body: {
					foo: 'bar'
				},
				headers: {
					'box-request-id': traceID
				}
			};
			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.strictEqual(errObject.message, `testMessage [505 HTTP Version not Supported | .${traceID}]`);
		});

		it('should add request and trace IDs to error message when both are present in response', function() {

			var requestID = '98nq34otquhet',
				traceID = 'KUHFIUYVIYTFIYTF*&^TI&YGIU';

			var response = {
				statusCode: 404,
				body: {
					foo: 'bar',
					request_id: requestID
				},
				headers: {
					'box-request-id': traceID
				}
			};
			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.strictEqual(errObject.message, `testMessage [404 Not Found | ${requestID}.${traceID}]`);
		});

		it('should attach formatted request object when request context is present', function() {

			var response = {
				statusCode: 505,
				body: {foo: 'bar'},
				httpVersion: '1.1',
				request: {
					method: 'GET',
					uri: {
						protocol: 'https://',
						host: 'api.box.com',
						pathname: '/2.0/users/me',
						query: 'fields=name',
						hash: ''
					},
					headers: {
						'as-user': '12345'
					}
				}
			};
			response.request.response = response;

			var expectedRequest = {
				method: 'GET',
				url: {
					protocol: 'https://',
					host: 'api.box.com',
					path: '/2.0/users/me',
					query: {
						fields: 'name'
					},
					fragment: '',
				},
				httpVersion: '1.1',
				body: undefined,
				headers: {
					'as-user': '12345'
				}
			};

			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.deepEqual(errObject.request, expectedRequest);
		});

		it('should not throw when request URI and response pointer are undefined', function() {

			var response = {
				statusCode: 505,
				body: {foo: 'bar'},
				httpVersion: '1.1',
				request: {
					method: 'GET',
					headers: {
						'as-user': '12345'
					}
				}
			};
			response.request.response = null;

			var expectedRequest = {
				method: 'GET',
				url: null,
				httpVersion: null,
				body: undefined,
				headers: {
					'as-user': '12345'
				}
			};

			var errObject = errors.buildResponseError(response, 'testMessage');

			assert.deepEqual(errObject.request, expectedRequest);
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
			assert.strictEqual(errObject.message, 'Unexpected API Response [505 HTTP Version not Supported] error_code - Bad things happened');
			assert.strictEqual(errObject.statusCode, 505);
			assert.strictEqual(errObject.response, response);
		});
	});

});
