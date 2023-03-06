/**
 * @fileoverview Tests for Box API Request
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	sinon = require('sinon'),
	leche = require('leche'),
	Stream = require('stream'),
	EventEmitter = require('events').EventEmitter,
	Config = require('../../lib/util/config'),
	mockery = require('mockery');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// constants
var MODULE_UNDER_TEST_PATH = '../../lib/api-request';

// then variables
var sandbox = sinon.createSandbox(),
	config,
	requestStub,
	requestObjectStub,
	requestObjectFake,
	eventBusFake,
	APIRequest;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('APIRequest', function() {

	var TEST_CLIENT_ID = 'id',
		TEST_CLIENT_SECRET = 'secret';

	beforeEach(function() {
		// Setup Dependencies
		config = new Config({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			request: {
				// By default, make test requests not retryable
				formData: true
			}
		});
		requestObjectStub = leche.create([
			'form',
			'on',
			'emit'
		]);
		requestObjectFake = leche.fake(requestObjectStub);
		requestStub = sandbox.stub();
		requestStub.returns(requestObjectFake);
		eventBusFake = leche.fake(EventEmitter.prototype);

		// Setup Mockery
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('request', requestStub);

		// Setup File Under Test
		mockery.registerAllowable(MODULE_UNDER_TEST_PATH, true);
		APIRequest = require(MODULE_UNDER_TEST_PATH);
	});

	afterEach(function() {
		// Reset the module cache so that we load a clean module every time
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should set config when called', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			assert.propertyVal(apiRequest, 'config', config);
		});

		it('should throw when no config object is passed to constructor', function() {
			assert.throws(function() {
				/* eslint-disable no-new */
				new APIRequest('Not a config');
			});
		});

		it('should set event bus when initialized', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			assert.equal(apiRequest.eventBus, eventBusFake);
		});

		it('should throw when invalid event bus is passed to constructor', function() {
			assert.throws(function() {
				/* eslint-disable no-new */
				new APIRequest(config, 'not an event emitter');
			});
		});
	});

	describe('execute()', function() {

		it('should send request options to request module when called', function() {
			config = config.extend({
				request: {
					url: 'http://test.foobar',
					method: 'GET'
				}
			});
			var apiRequest = new APIRequest(config, eventBusFake);

			sandbox.stub(requestObjectFake, 'on');
			sandbox.stub(requestObjectFake, 'emit');

			apiRequest.execute();
			assert(requestStub.calledWithMatch(config.request));
		});

		it('should set a stream if no callback is provided when called', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			sandbox.stub(requestObjectFake, 'on');
			sandbox.stub(requestObjectFake, 'emit');
			apiRequest.execute();
			assert.isObject(apiRequest.stream);
		});

		it('should emit response event with error when streaming request emits an error', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			var error = new Error('stream broken');

			sandbox.mock(eventBusFake).expects('emit')
				.withArgs('response', error);

			var requestOnStub = sandbox.stub(requestObjectFake, 'on');
			requestOnStub.withArgs('error').yields(error);
			requestOnStub.withArgs('response');
			sandbox.stub(requestObjectFake, 'emit');

			apiRequest.execute();
		});

		it('should emit response event with response when streaming request completes', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			var response = {statusCode: 200};

			sandbox.mock(eventBusFake).expects('emit')
				.withArgs('response', null, response);

			var requestOnStub = sandbox.stub(requestObjectFake, 'on');
			requestOnStub.withArgs('error');
			requestOnStub.withArgs('response').yields(response);
			sandbox.stub(requestObjectFake, 'emit');

			apiRequest.execute();
		});

		it('should emit response event with error when streaming request completes with a client error', function() {
			var apiRequest = new APIRequest(config, eventBusFake);
			var response = {statusCode: 429};
			var error = new Error('429 - Too Many Requests');

			sandbox.mock(eventBusFake).expects('emit')
				.withArgs('response', sinon.match.instanceOf(Error).and(sinon.match.has('message', error.message)));

			var requestOnStub = sandbox.stub(requestObjectFake, 'on');
			requestOnStub.withArgs('error');
			requestOnStub.withArgs('response').yields(response);
			sandbox.stub(requestObjectFake, 'emit');

			apiRequest.execute();
		});

		it('should return a request error to the callback when one occurs and a callback exists', function(done) {
			var requestError = new Error('ECONNREFUSED');

			requestStub.yieldsAsync(requestError);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.equal(err, requestError);
				assert.isUndefined(response, 'there was no response');
				done();
			});
		});

		it('should return a temporary error to the callback when a 502 temporary error occurs and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 502,
				request: {}
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.instanceOf(err, Error);
				assert.equal(err.message, '502 - Bad Gateway');
				assert.isUndefined(response, 'there was no response');
				done();
			});
		});

		it('should return request information when an error occurs when making the request and a callback exists', function(done) {
			var requestError = new Error('ECONNREFUSED');

			requestObjectFake.uri = 'http://test.com';
			requestObjectFake.method = 'GET';
			requestObjectFake.headers = { foo: 'bar' };
			requestStub.yieldsAsync(requestError);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err) {
				assert.equal(err.request.uri, requestObjectFake.uri);
				assert.equal(err.request.method, requestObjectFake.method);
				assert.equal(err.request.headers, requestObjectFake.headers);
				done();
			});
		});

		it('should remove sensitive header information from the request when an error occurs', function(done) {
			var requestError = new Error('ECONNREFUSED'),
				requestHeaders = {
					foo: 'bar',
					BoxApi: 'abc123',
					Authorization: 'xyz456'
				},
				expectedHeaders = {
					foo: 'bar',
					BoxApi: '[REMOVED BY SDK]',
					Authorization: '[REMOVED BY SDK]'
				};

			requestObjectFake.uri = 'http://test.com';
			requestObjectFake.method = 'GET';
			requestObjectFake.headers = requestHeaders;
			requestStub.yieldsAsync(requestError);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err) {
				assert.deepEqual(err.request.headers, expectedHeaders);
				done();
			});
		});

		it('should return request and response information when a 504 temporary error occurs and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 504,
				body: 'some body! (can be a string if someone set json:false and encoding: utf-8)',
				headers: { foo: 'bar' },
				request: {}
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err) {
				assert.equal(err.statusCode, responseInfo.statusCode);
				assert.equal(err.response.statusCode, responseInfo.statusCode);
				assert.equal(err.response.body, responseInfo.body);
				assert.equal(err.response.headers, responseInfo.headers);
				done();
			});
		});

		it('should return a successful response to the callback when a successful status code is returned and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 200,
				request: {}
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.isNull(err, 'there was no request error');
				assert.propertyVal(response, 'statusCode', 200);
				done();
			});
		});

		it('should return a successful response to the callback when a 400 status code is returned and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 400,
				request: {}
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.isNull(err, 'there was no request error');
				assert(response);
				assert.equal(response.statusCode, 400);
				done();
			});
		});

		it('should remove sensitive header information from the request when an successful response occurs', function(done) {
			var responseInfo = {
					statusCode: 200,
					request: requestObjectFake
				},
				requestHeaders = {
					foo: 'bar',
					BoxApi: 'abc123',
					Authorization: 'xyz456'
				},
				expectedHeaders = {
					foo: 'bar',
					BoxApi: '[REMOVED BY SDK]',
					Authorization: '[REMOVED BY SDK]'
				};

			requestObjectFake.headers = requestHeaders;
			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.deepEqual(response.request.headers, expectedHeaders);
				done();
			});
		});


		it('should retry the request on a set interval when retryIntervalMS is set and a callback exists', function(done) {
			var clock = sinon.useFakeTimers();
			var responseInfo = {
				statusCode: 500,
				request: {}
			};

			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 1,
				retryIntervalMS: 27
			});

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				assert.equal(apiRequest.numRetries, 1);
				done();
			});
			// Tick clock 30ms, past the retry interval
			clock.tick(30);
			// Restore the clock here, so that mocha can still observe test timeouts
			clock.restore();
		});

		it('should use retry strategy to determine the retry interval when config.retryStrategy is set, returns a number, and a callback exists', function(done) {
			var clock = sinon.useFakeTimers();
			var responseInfo = {
				statusCode: 500,
				request: {}
			};

			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 1,
				retryIntervalMS: 27,
				retryStrategy(options) {
					return options.numMaxRetries * options.retryIntervalMS;
				}
			});

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				done();
			});

			// Tick clock 30ms, past the retry interval
			clock.tick(30);
			// Restore the clock here, so that mocha can still observe test timeouts
			clock.restore();
		});

		it('should propagate the retry strategy error when the retry strategy returns an error and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 500,
				request: {}
			};
			var expectedError = new Error('500 - Internal Server Error');

			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 1,
				retryIntervalMS: 27,
				retryStrategy() {
					return expectedError;
				}
			});

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err) {
				assert.equal(err, expectedError);
				done();
			});
		});

		it('should propagate the response error when the retry strategy does not return a number or error, and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 500,
				request: {}
			};
			var expectedError = new Error('500 - Internal Server Error');

			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 1,
				retryIntervalMS: 27,
				retryStrategy() {
					return 'this is not a number or error';
				}
			});

			requestStub.yieldsAsync(expectedError, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err) {
				assert.equal(err, expectedError);
				done();
			});
		});

		it('should call the callback asynchronously when callback exists', function(done) {
			var endOfTest = false,
				responseInfo = {
					statusCode: 200,
					request: {}
				};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				assert(endOfTest);
				done();
			});
			endOfTest = true;
		});

		it('should emit a request error when one occurs and a callback exists', function(done) {
			var requestError = new Error('ECONNREFUSED');

			requestStub.yieldsAsync(requestError);
			sandbox.mock(eventBusFake).expects('emit')
				.withExactArgs('response', requestError);

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				done();
			});
		});

		it('should emit a temporary error when a 504 temporary error occurs and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 504,
				request: {}
			};
			var expectedError = {
				message: '504 - Gateway Time-out'
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.mock(eventBusFake).expects('emit')
				.withExactArgs('response', sinon.match(expectedError));

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				done();
			});
		});

		it('should emit a successful response event when a successful status code is returned and a callback exists', function(done) {
			var responseInfo = {
				statusCode: 200,
				request: {}
			};
			var expectedResponse = {
				statusCode: 200
			};

			requestStub.yieldsAsync(null, responseInfo);
			sandbox.mock(eventBusFake).expects('emit')
				.withExactArgs('response', null, sinon.match(expectedResponse));

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback() {
				done();
			});
		});

		it('should retry when a 5xx error occurs and then restore with sucessful response', function(done) {
			var responseInfo1 = {
				statusCode: 504,
			};
			var responseInfo2 = {
				statusCode: 200,
			};
			var expectedResponse = {
				statusCode: 200
			};
			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 1,
        retryIntervalMS: 100,
			});
			requestStub.yieldsAsync(null, responseInfo1);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.equal(apiRequest.numRetries, 1);
				assert.equal(err, null);
				assert.deepEqual(response, expectedResponse);
				done();
			});

			setTimeout(function() {
				requestStub.yieldsAsync(null, responseInfo2);
			}, 30);
		});

		it('should retry when a 5xx error occurs but then fail after retries', function(done) {
			var responseInfo = {
				statusCode: 504,
				request: {}
			};
			var expectedError = new Error('504 - Gateway Time-out');
			config = config.extend({
				request: {
					formData: null
				},
				numMaxRetries: 3,
				retryIntervalMS: 10,
			});
			requestStub.yieldsAsync(null, responseInfo);
			sandbox.stub(eventBusFake, 'emit').withArgs('response');

			var apiRequest = new APIRequest(config, eventBusFake);
			apiRequest.execute(function callback(err, response) {
				assert.equal(apiRequest.numRetries, 3);
				assert.notEqual(err, null);
				assert.equal(err.message, expectedError.message);
				assert.equal(response, null);
				done();
			});
		});
	});

	describe('getResponseStream()', function() {

		var apiRequest;

		beforeEach(function() {
			apiRequest = new APIRequest(config, eventBusFake);
		});

		it('should return the response stream created by request when called', function() {
			var expectedStream = new Stream();
			requestStub.returns(expectedStream);

			// Response stream should be undefined before execute() is called
			var stream = apiRequest.getResponseStream();
			assert.equal(typeof stream, 'undefined');

			// Response stream should be defined after execute() is called
			apiRequest.execute();
			stream = apiRequest.getResponseStream();
			assert.equal(typeof stream, typeof expectedStream);
		});

	});

});
