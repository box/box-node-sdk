/**
 * @fileoverview Tests for Box API Request
 */

/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	sinon = require('sinon'),
	leche = require('leche'),
	Stream = require('stream'),
	mockery = require('mockery'),
	Config = require('../../lib/util/config'),
	EventEmitter = require('events').EventEmitter;

var APIRequest = require('../../lib/api-request');

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

// Follow JSDoc conventions unless otherwise noted.

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// constants
var MODULE_UNDER_TEST_PATH = '../../lib/api-request-manager';

// then variables
var sandbox = sinon.createSandbox(),
	apiRequestFake,
	APIRequestConstructorStub,
	APIRequestManager,
	eventBusFake;

// then helper functions

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('APIRequestManager', function() {

	var TEST_CLIENT_ID = 'id',
		TEST_CLIENT_SECRET = 'secret';

	var config;

	beforeEach(function() {
		// Setup Dependencies
		eventBusFake = new EventEmitter();
		apiRequestFake = leche.fake(APIRequest.prototype);
		APIRequestConstructorStub = sandbox.stub();
		APIRequestConstructorStub.returns(apiRequestFake);

		config = new Config({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		// Setup Mockery
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('./api-request', APIRequestConstructorStub);

		// Setup File Under Test
		mockery.registerAllowable(MODULE_UNDER_TEST_PATH, true);
		APIRequestManager = require(MODULE_UNDER_TEST_PATH);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should set config when passed config', function() {

			config = config.extend({
				numMaxRetries: 17
			});
			var requestManager = new APIRequestManager(config, eventBusFake);
			assert.nestedPropertyVal(requestManager, 'config.numMaxRetries', 17);
		});

		it('should set event bus when called', function() {

			var requestManager = new APIRequestManager(config, eventBusFake);
			assert.equal(requestManager.eventBus, eventBusFake);
		});

	});

	describe('makeRequest()', function() {

		it('should pass the given options to the APIRequest constructor when called', function() {
			var options = {url: 'http://test'},
				requestManager = new APIRequestManager(config, eventBusFake),
				expectedConfig = config.extend({
					request: {
						url: 'http://test'
					}
				});

			sandbox.stub(apiRequestFake, 'execute');
			requestManager.makeRequest(options);
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWithMatch(expectedConfig), 'API Request should be passed correct options');
		});

		it('should set APIRequest options to the module defaults when no option is given', function() {
			config = config.extend({request: {timeout: true, strictSSL: true}});
			var options = {url: 'http://test', timeout: false},
				expectedConfig = config.extend({request: {url: 'http://test', timeout: false, strictSSL: true}});
			var requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'execute');
			requestManager.makeRequest(options);
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWithMatch(expectedConfig), 'API Request should be passed correct options');
		});

		it('should pass event bus to APIRequest when called', function() {

			var requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'execute');
			requestManager.makeRequest({});
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWith(config, eventBusFake), 'API Request should be passed event bus');
		});

		it('should execute the request when called', function() {
			var requestManager = new APIRequestManager(config, eventBusFake);
			sandbox.mock(apiRequestFake).expects('execute')
				.callsArg(0);
			return requestManager.makeRequest({});
		});

		it('should resolve when the API request returns a response', function() {

			var response = {status: 200};

			var requestManager = new APIRequestManager(config, eventBusFake);
			sandbox.mock(apiRequestFake).expects('execute')
				.yieldsAsync(null, response);
			return requestManager.makeRequest({})
				.then(data => {
					assert.equal(data, response);
				});
		});

		it('should reject with request error when API call fails', function() {

			var apiError = new Error('Network failure');

			var requestManager = new APIRequestManager(config, eventBusFake);
			sandbox.mock(apiRequestFake).expects('execute')
				.yieldsAsync(apiError);
			return requestManager.makeRequest({})
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

	});

	describe('makeStreamingRequest()', function() {

		it('should pass the given options to the APIRequest constructor when called', function() {
			var options = {url: 'http://test'},
				expectedConfig = config.extend({request: {url: 'http://test'}}),
				requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'execute');
			sandbox.stub(apiRequestFake, 'getResponseStream');
			requestManager.makeStreamingRequest(options);
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWithMatch(expectedConfig), 'API Request should be passed correct options');
		});

		it('should set APIRequest options to the module defaults when no option is given', function() {
			config = config.extend({timeout: true, strictSSL: true});
			var options = {url: 'http://test', timeout: false},
				expectedConfig = config.extend({request: {url: 'http://test', timeout: false, strictSSL: true}});
			var requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'execute');
			sandbox.stub(apiRequestFake, 'getResponseStream');
			requestManager.makeStreamingRequest(options);
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWithMatch(expectedConfig), 'API Request should be passed correct options');
		});

		it('should pass event bus to APIRequest when called', function() {

			var requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'execute');
			sandbox.stub(apiRequestFake, 'getResponseStream');
			requestManager.makeStreamingRequest({});
			assert.ok(APIRequestConstructorStub.calledWithNew(), 'API Request should be constructed');
			assert.ok(APIRequestConstructorStub.calledWith(config, eventBusFake), 'API Request should be passed event bus');
		});

		it('should execute the request with no callback when called', function() {
			var requestManager = new APIRequestManager(config, eventBusFake);

			sandbox.stub(apiRequestFake, 'getResponseStream');
			sandbox.mock(apiRequestFake).expects('execute')
				.withExactArgs();
			requestManager.makeStreamingRequest({});
		});

		it('should return a read stream for the request when called', function() {
			var requestManager = new APIRequestManager(config, eventBusFake),
				expectedResponse = new Stream(),
				response;

			sandbox.stub(apiRequestFake, 'execute');
			sandbox.mock(apiRequestFake).expects('getResponseStream')
				.withExactArgs()
				.returns(expectedResponse);
			response = requestManager.makeStreamingRequest({});
			assert.equal(response, expectedResponse);
		});
	});

});
