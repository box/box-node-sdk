/**
 * @fileoverview API Client Tests
 */
/* eslint func-style: 0 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	util = require('util'),
	sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	httpStatusCodes = require('http-status');

var errors = require('../../lib/util/errors'),
	APIRequestManager = require('../../lib/api-request-manager'),
	BasicAPISession = require('../../lib/sessions/basic-session'),
	testPlugin = require('../fixtures/plugins/test-plugin'),
	Config = require('../../lib/util/config');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	errorsFake,
	apiSessionFake,
	requestManagerFake,
	BasicClient,
	basicClient;


var fakeQs = { fakeQsKey: 'fakeQsValue' },
	fakeBody = { my: 'body' },
	params = {
		clientID: 'abc123',
		clientSecret: 'xyz987',
		uploadAPIRootURL: 'https://upload-test.box.com/api',
		uploadRequestTimeoutMS: 10000,
		apiVersion: '2.0'
	},
	fakeParamsWithBody,
	fakeParamsWithQs,
	fakeOKResponse,
	fakeResponseStream,
	fakeUnauthorizedResponse,
	fakeResponseBody,
	fakeMultipartFormData,
	MODULE_FILE_PATH = '../../lib/box-client',
	FAKE_PATH = '/fake/path',
	FAKE_ACCESS_TOKEN = 'fakeAT',
	HEADER_AUTHORIZATION_PREFIX = 'Bearer ',
	HEADER_XFF = 'X-Forwarded-For',
	HEADER_BOXAPI = 'BoxApi';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('box-client', function() {

	beforeEach(function() {
		// Setup Environment
		errorsFake = leche.fake(errors);
		apiSessionFake = leche.fake(BasicAPISession.prototype);
		requestManagerFake = leche.fake(APIRequestManager.prototype);
		var config = new Config(params);
		fakeParamsWithBody = {body: fakeBody};
		fakeParamsWithQs = {qs: fakeQs};
		fakeResponseBody = {some: 'responseBody'};
		fakeOKResponse = {statusCode: httpStatusCodes.OK, body: fakeResponseBody};
		fakeResponseStream = leche.fake(leche.create(['on']));
		fakeUnauthorizedResponse = {statusCode: httpStatusCodes.UNAUTHORIZED, body: {}};
		fakeMultipartFormData = [{format: 'doesNotMatter'}];

		// Setup Mockery
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});
		mockery.registerMock('./util/errors', errorsFake);
		mockery.registerMock('../util/errors', errorsFake);

		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		BasicClient = require(MODULE_FILE_PATH);
		basicClient = new BasicClient(apiSessionFake, config, requestManagerFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	// --- test client private functions ---

	describe('_makeRequest()', function() {

		it('should set the "Authentication" header to a new APISession token for all requests when called', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				headers: sinon.match({ Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN })
			}).yieldsAsync(null, fakeOKResponse);
			sandbox.mock(basicClient).expects('_handleResponse').yields();

			basicClient._makeRequest({}, done);
		});

		it('should not overwrite the "BoxAPI" header when it already exists', function(done) {
			var explicitBoxApiHeader = 'shared_link=box.com/alreadyset&shared_link_password=456',
				headersMatcher = sinon.match({ BoxApi: explicitBoxApiHeader });
			basicClient.setSharedContext('box.com/donotsetthis', '123');

			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({ headers: headersMatcher }).yieldsAsync(null, fakeOKResponse);
			sandbox.mock(basicClient).expects('_handleResponse').yieldsAsync();

			basicClient._makeRequest({headers: { BoxApi: explicitBoxApiHeader }}, done);
		});

		it('should call makeStreamingRequest and handleStreamingResponse for a streaming request', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			sandbox.mock(fakeResponseStream).expects('on').withArgs('response', sinon.match.func).yieldsAsync(fakeOKResponse);
			sandbox.mock(requestManagerFake).expects('makeStreamingRequest').returns(fakeResponseStream);
			sandbox.mock(basicClient).expects('_handleStreamingResponse').withArgs(fakeOKResponse);

			basicClient._makeRequest({ streaming: true }, done);
		});

		it('should make a request and propagate the response when able to upkeep tokens', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);

			sandbox.mock(requestManagerFake).expects('makeRequest').yieldsAsync(null, fakeOKResponse);

			sandbox.mock(basicClient).expects('_handleResponse').withArgs(null, fakeOKResponse).yieldsAsync(null, fakeOKResponse);
			basicClient._makeRequest({}, function(err, res) {

				assert.ifError(err);
				assert.equal(res, fakeOKResponse);
				done();
			});
		});

		it('should propagate error when unable to upkeep tokens', function(done) {
			var upkeepErr = new Error();
			sandbox.stub(apiSessionFake, 'getAccessToken').yieldsAsync(upkeepErr);
			sandbox.mock(requestManagerFake).expects('makeRequest').never();

			basicClient._makeRequest({}, function(err) {
				assert.strictEqual(err, upkeepErr, 'Upkeep error is propagated');
				done();
			});
		});

	});

	describe('_handleStreamingResponse()', function() {
		var accessTokenError;

		beforeEach(function() {
			accessTokenError = new Error('Expired Access Token');
			accessTokenError.response = fakeUnauthorizedResponse;
			sandbox.stub(errorsFake, 'buildExpiredAuthError').returns(accessTokenError);
		});

		afterEach(function() {
			delete apiSessionFake.handleExpiredTokensError;
		});

		it('should call handleExpiredTokensError when the response is UNAUTHORIZED and the body is an empty object', function() {
			apiSessionFake.handleExpiredTokensError = sandbox.mock().withExactArgs(accessTokenError, sinon.match.func);
			basicClient._handleStreamingResponse(fakeUnauthorizedResponse);
		});

		it('should not call handleExpiredTokensError when the response is UNAUTHORIZED and the body is non empty object', function() {
			// The check for empty body happens in 'isUnauthorizedDueToExpiredAccessToken()' function. We cannot
			// stub that function since it is private and we are not rewiring.
			fakeUnauthorizedResponse.body = {data: 'testData'};
			apiSessionFake.handleExpiredTokensError = sandbox.mock().never();
			basicClient._handleStreamingResponse(fakeUnauthorizedResponse);
		});
	});

	describe('_handleResponse()', function() {

		it('should propagate an error when one occurred in the response', function(done) {
			var responseError = new Error();
			basicClient._handleResponse(responseError, {}, function(err) {
				assert.strictEqual(err, responseError, 'the response error is passed to callback');
				assert.equal(arguments.length, 1, 'only the response error is passed');
				done();
			});
		});

		it('should propagate an expired tokens error when the response is UNAUTHORIZED and the body is an empty object', function(done) {
			var accessTokenError = new Error('Expired Access Token');
			accessTokenError.response = fakeUnauthorizedResponse;
			fakeUnauthorizedResponse.body = {};

			sandbox.stub(errorsFake, 'buildExpiredAuthError').returns(accessTokenError);
			basicClient._handleResponse(null, fakeUnauthorizedResponse, function(err) {
				assert.strictEqual(err, accessTokenError);
				done();
			});
		});

		it('should pass the response to the callback when status code is UNAUTHORIZED and the body is a non-empty object', function(done) {
			fakeUnauthorizedResponse.body = { foo: 'bar'};
			basicClient._handleResponse(null, fakeUnauthorizedResponse, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeUnauthorizedResponse);
				done();
			});
		});

		it('should pass the response to the callback when status code is UNAUTHORIZED and a response body buffer is returned', function(done) {
			fakeUnauthorizedResponse.body = new Buffer('responseBody');
			basicClient._handleResponse(null, fakeUnauthorizedResponse, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeUnauthorizedResponse);
				done();
			});
		});

		it('should pass the response to the callback when status code is not UNAUTHORIZED and the body is empty', function(done) {
			fakeOKResponse.body = {};
			basicClient._handleResponse(null, fakeOKResponse, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeOKResponse);
				done();
			});
		});

		it('should pass the response to the callback when status code is not UNAUTHORIZED and the body is null', function(done) {
			fakeOKResponse.body = null;
			basicClient._handleResponse(null, fakeOKResponse, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeOKResponse);
				done();
			});
		});

		it('should propagate results if request was successful', function(done) {
			basicClient._handleResponse(null, fakeOKResponse, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeOKResponse);
				done();
			});
		});

		it('should allow the session to handle an expired tokens error when one occurs', function(done) {
			var accessTokenError = new Error('Expired Access Token');
			accessTokenError.response = fakeUnauthorizedResponse;
			apiSessionFake.handleExpiredTokensError = sandbox.mock().withArgs(accessTokenError).yieldsAsync();

			sandbox.stub(errorsFake, 'buildExpiredAuthError').returns(accessTokenError);
			basicClient._handleResponse(null, fakeUnauthorizedResponse, function() {
				delete apiSessionFake.handleExpiredTokensError;
				done();
			});
		});
	});

	// --- test client public functions ---

	describe('get()', function() {

		it('should make GET request with params encoded and return result via callback when given token, path, and fakeQs', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'GET',
				url: (basicClient._baseURL + FAKE_PATH),
				qs: fakeQs
			}, done).yields();
			basicClient.get(FAKE_PATH, fakeParamsWithQs, done);
		});

		it('should make GET request with only url and method params when called with no params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'GET',
				url: (basicClient._baseURL + FAKE_PATH)
			}, done).yields();
			basicClient.get(FAKE_PATH, null, done);
		});

		it('should not mutate the passed-in params object when called', function(done) {

			var reqParams = {
				qs: {foo: 'bar'}
			};

			sandbox.mock(basicClient).expects('_makeRequest').withArgs({
				method: 'GET',
				url: (basicClient._baseURL + FAKE_PATH),
				qs: {foo: 'bar'}
			}).yieldsAsync();
			basicClient.get(FAKE_PATH, reqParams, function() {

				assert.notProperty(reqParams, 'url', 'Passed-in params object should not be mutated');
				done();
			});
		});
	});

	describe('post()', function() {

		it('should make POST request with params encoded and return result via callback when given token, path, and body', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').once().withExactArgs({
				method: 'POST',
				url: (basicClient._baseURL + FAKE_PATH),
				body: fakeBody
			}, done).yields();
			basicClient.post(FAKE_PATH, fakeParamsWithBody, done);
		});

		it('should make POST request with only url and method params when called with no params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'POST',
				url: (basicClient._baseURL + FAKE_PATH)
			}, done).yields();
			basicClient.post(FAKE_PATH, null, done);
		});

		it('should not mutate the passed-in params object when called', function(done) {

			var reqParams = {
				body: {foo: 'bar'}
			};

			sandbox.mock(basicClient).expects('_makeRequest').withArgs({
				method: 'POST',
				url: (basicClient._baseURL + FAKE_PATH),
				body: {foo: 'bar'}
			}).yieldsAsync();
			basicClient.post(FAKE_PATH, reqParams, function() {

				assert.notProperty(reqParams, 'url', 'Passed-in params object should not be mutated');
				done();
			});
		});
	});

	describe('put()', function() {

		it('should make PUT request with params encoded and return result via callback when given token, path, and body', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').once().withExactArgs({
				method: 'PUT',
				url: (basicClient._baseURL + FAKE_PATH),
				body: fakeBody
			}, done).yields();

			basicClient.put(FAKE_PATH, fakeParamsWithBody, done);
		});

		it('should make PUT request with only url and method params when called with no params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'PUT',
				url: (basicClient._baseURL + FAKE_PATH)
			}, done).yields();
			basicClient.put(FAKE_PATH, null, done);
		});

		it('should not mutate the passed-in params object when called', function(done) {

			var reqParams = {
				body: {foo: 'bar'}
			};

			sandbox.mock(basicClient).expects('_makeRequest').withArgs({
				method: 'PUT',
				url: (basicClient._baseURL + FAKE_PATH),
				body: {foo: 'bar'}
			}).yieldsAsync();
			basicClient.put(FAKE_PATH, reqParams, function() {

				assert.notProperty(reqParams, 'url', 'Passed-in params object should not be mutated');
				done();
			});
		});
	});

	describe('del()', function() {

		it('should make DELETE request with params encoded and return result via callback when given token, path, and fakeQs', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'DELETE',
				url: (basicClient._baseURL + FAKE_PATH),
				qs: fakeQs
			}, done).yields();
			basicClient.del(FAKE_PATH, fakeParamsWithQs, done);
		});

		it('should make DELETE request with only url and method params when called with no params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'DELETE',
				url: (basicClient._baseURL + FAKE_PATH)
			}, done).yields();
			basicClient.del(FAKE_PATH, null, done);
		});

		it('should not mutate the passed-in params object when called', function(done) {

			var reqParams = {
				qs: {foo: 'bar'}
			};

			sandbox.mock(basicClient).expects('_makeRequest').withArgs({
				method: 'DELETE',
				url: (basicClient._baseURL + FAKE_PATH),
				qs: {foo: 'bar'}
			}).yieldsAsync();
			basicClient.del(FAKE_PATH, reqParams, function() {

				assert.notProperty(reqParams, 'url', 'Passed-in params object should not be mutated');
				done();
			});
		});
	});

	describe('options()', function() {

		it('should make OPTIONS call with correct params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'OPTIONS',
				url: basicClient._baseURL + FAKE_PATH,
				body: fakeBody
			}, done).yieldsAsync();
			basicClient.options(FAKE_PATH, fakeParamsWithBody, done);
		});

		it('should make OPTIONS request with only url and method params when called with no params', function(done) {
			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'OPTIONS',
				url: (basicClient._baseURL + FAKE_PATH)
			}, done).yields();
			basicClient.options(FAKE_PATH, null, done);
		});

		it('should not mutate the passed-in params object when called', function(done) {

			var reqParams = {
				qs: {foo: 'bar'}
			};

			sandbox.mock(basicClient).expects('_makeRequest').withArgs({
				method: 'OPTIONS',
				url: (basicClient._baseURL + FAKE_PATH),
				qs: {foo: 'bar'}
			}).yieldsAsync();
			basicClient.options(FAKE_PATH, reqParams, function() {

				assert.notProperty(reqParams, 'url', 'Passed-in params object should not be mutated');
				done();
			});
		});
	});

	describe('setCustomHeader()', function() {

		var HEADER_NAME = 'testheader123',
			HEADER_VALUE = 'testheadervalue456';

		it('should set a custom header that gets passed with each request when called', function(done) {
			var expectedParams = { headers: {} };
			expectedParams.headers[HEADER_NAME] = HEADER_VALUE;

			sandbox.stub(apiSessionFake, 'getAccessToken').yields();
			sandbox.stub(basicClient, '_handleResponse').yields();
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match(expectedParams)).yieldsAsync();

			basicClient.setCustomHeader(HEADER_NAME, HEADER_VALUE);
			basicClient.get('/', {}, done);
		});

		it('should remove an already set custom header when called with null', function(done) {
			var expectedParams = { headers: {} };

			sandbox.stub(apiSessionFake, 'getAccessToken').yields();
			sandbox.stub(basicClient, '_handleResponse').yields();
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match(expectedParams)).yieldsAsync();

			basicClient.setCustomHeader(HEADER_NAME, HEADER_VALUE);
			basicClient.setCustomHeader(HEADER_NAME, null);
			basicClient.get('/', {}, done);
		});

	});

	describe('upload()', function() {

		it('should call the API session\'s getAccessToken() and use the returned token to make the request', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yieldsAsync(null, FAKE_ACCESS_TOKEN);

			sandbox.mock(requestManagerFake)
				.expects('makeRequest')
				.withArgs(sinon.match({
					headers: {Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN}
				}))
				.yieldsAsync(null, fakeOKResponse);

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, done);
		});

		it('should make a request with the correct params and propagate the response info and body when the request succeeds', function(done) {
			var path = '/files/content';

			sandbox.stub(apiSessionFake, 'getAccessToken').yieldsAsync(null, FAKE_ACCESS_TOKEN);

			sandbox.mock(requestManagerFake)
				.expects('makeRequest')
				.withArgs({
					method: 'POST',
					url: util.format('%s/%s%s', params.uploadAPIRootURL, params.apiVersion, path),
					body: fakeBody,
					timeout: params.uploadRequestTimeoutMS,
					headers: {Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN},
					formData: fakeMultipartFormData
				})
				.yieldsAsync(null, fakeOKResponse);

			basicClient.upload(path, fakeParamsWithBody, fakeMultipartFormData, function(err, response) {
				assert.ifError(err);
				assert.strictEqual(response, fakeOKResponse);
				done();
			});
		});

		it('should propagate a request error when one occurs', function(done) {
			var retryableRequestError = new Error('retryableRequest failed'),
				emptyResponseBody = {},
				emptyResponseInfo = { body: emptyResponseBody};
			retryableRequestError.response = emptyResponseInfo;

			sandbox.stub(apiSessionFake, 'getAccessToken').yieldsAsync(null, FAKE_ACCESS_TOKEN);
			sandbox.stub(requestManagerFake, 'makeRequest').yieldsAsync(retryableRequestError, emptyResponseInfo);

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, function(err) {
				assert.strictEqual(err, retryableRequestError);
				done();
			});
		});

		it('should propagate a generic access token error when an empty body UNAUTHORIZED response is received', function(done) {
			sandbox.stub(apiSessionFake, 'getAccessToken').yieldsAsync(null, FAKE_ACCESS_TOKEN);
			sandbox.stub(requestManagerFake, 'makeRequest').yieldsAsync(null, fakeUnauthorizedResponse);

			var accessTokenError = new Error('Access token error.');
			sandbox.stub(errorsFake, 'buildExpiredAuthError').returns(accessTokenError);

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, function(err) {
				assert.strictEqual(err, accessTokenError);
				done();
			});
		});
	});

	describe('setIPs()', function() {

		var ips = ['123.90.6.1', '10.80.1.123'];
		var xffTest = '123.90.6.1, 10.80.1.123';

		it('should add an XFF custom header when a request is made', function() {
			basicClient.setIPs(ips);
			assert.strictEqual(basicClient._customHeaders[HEADER_XFF], xffTest);
		});

		it('should set the "X-Forwarded-For" header when the custom header has been set', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			basicClient.setIPs(ips);

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				headers: { 'X-Forwarded-For': xffTest }
			})).yieldsAsync(null, fakeOKResponse);
			sandbox.stub(basicClient, '_handleResponse').yields();

			basicClient.get('/', {}, done);
		});

		leche.withData({
			'valid IPv4 address': [['127.0.0.1'], '127.0.0.1'],
			'full IPv6 address': [['2606:2800:220:1:248:1893:25c8:1946'], '2606:2800:220:1:248:1893:25c8:1946'],
			'abbreviated IPv6 address': [['d:e:a:d::'], 'd:e:a:d::'],
			'unspecified IPv6 address': [['::'], '::'],
			'loopback IPv6 address': [['::1'], '::1'],
			'mixed IPv6 and IPv4 addresses': [['1.2.3.4', '::b:e:e:f'], '1.2.3.4, ::b:e:e:f'],
			'IPv4 address embedded in IPv6 address': [['::FFFF:5.6.7.8'], '::FFFF:5.6.7.8'],
			'invalid character codes': [['1.2.3.4', 'X\x08\x19\x09'.repeat(4), '0.0.0.0'], '1.2.3.4, 0.0.0.0'],
			'all invalid IPs': [['100.200.300.400', 'cafe::beef::1'], undefined]
		}, function(input, expectedHeader) {

			it('should only set valid IP addresses in XFF header when called', function() {

				basicClient.setIPs(input);
				assert.strictEqual(basicClient._customHeaders[HEADER_XFF], expectedHeader);
			});
		});

	});

	describe('setSharedContext()', function() {

		var SHARED_CONTEXT_URL = 'http://box.com/testsharedlink',
			SHARED_CONTEXT_PASSWORD = 'password&123',
			BOXAPI_WELLFORMED_HEADER = 'shared_link=http%3A%2F%2Fbox.com%2Ftestsharedlink&shared_link_password=password%26123';

		it('should set a well-formed "BoxAPI" header to each request when the context has been set', function(done) {
			var expectedParams = {
				headers: {
					BoxApi: BOXAPI_WELLFORMED_HEADER
				}
			};

			sandbox.stub(apiSessionFake, 'getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			sandbox.stub(basicClient, '_handleResponse').yields();
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match(expectedParams)).yieldsAsync();

			basicClient.setSharedContext(SHARED_CONTEXT_URL, SHARED_CONTEXT_PASSWORD);
			basicClient.get('/', {}, done);
		});

	});

	describe('revokeSharedContext()', function() {

		it('should remove the custom BoxAPI header when called', function() {
			basicClient._customHeaders[HEADER_BOXAPI] = 'someheader';
			basicClient.revokeSharedContext();
			assert.strictEqual(typeof basicClient._customHeaders[HEADER_BOXAPI], 'undefined');
		});

		it('should not set the "BoxAPI" header when the context has been revoked', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			basicClient.revokeSharedContext();

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				headers: { BoxApi: undefined }
			})).yieldsAsync(null, fakeOKResponse);
			sandbox.stub(basicClient, '_handleResponse').yields();

			basicClient.get('/', {}, done);
		});

	});

	describe('asUser()', function() {

		var USER_ID = '876345';

		it('should set a well-formed "As-User" header to each request when the context has been set', function(done) {
			var expectedParams = {
				headers: {
					'As-User': USER_ID
				}
			};

			sandbox.stub(apiSessionFake, 'getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			sandbox.stub(basicClient, '_handleResponse').yields();
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match(expectedParams)).yieldsAsync();

			basicClient.asUser(USER_ID);
			basicClient.get('/', {}, done);
		});
	});

	describe('asSelf()', function() {

		var USER_ID = '876345';

		it('should remove "As-User" header from each request when the context has been unset', function(done) {
			var expectedParams = {
				headers: {}
			};

			sandbox.stub(apiSessionFake, 'getAccessToken').yields(null, FAKE_ACCESS_TOKEN);
			sandbox.stub(basicClient, '_handleResponse').yields();
			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match(expectedParams)).yieldsAsync();

			basicClient.asUser(USER_ID);
			basicClient.asSelf();
			basicClient.get('/', {}, done);
		});
	});

	describe('revokeTokens()', function() {

		it('should call apiSession.revokeTokens when called', function(done) {
			sandbox.mock(apiSessionFake).expects('revokeTokens').withExactArgs(done).yields();
			basicClient.revokeTokens(done);
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should call session to exchange token when called', function(done) {

			var exchangedTokenInfo = {accessToken: 'qqwjnfldkjfhksedrg'};

			sandbox.mock(apiSessionFake).expects('exchangeToken')
				.withArgs(TEST_SCOPE, TEST_RESOURCE, done)
				.yieldsAsync(null, exchangedTokenInfo);

			basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE, done);
		});
	});

	describe('plug()', function() {

		var PLUGIN_API_ROOT = 'http://www.foobar.com',
			PLUGIN_UPLOAD_API_ROOT = 'http://www.foobar.com/uploadhere',
			TEST_PATH = '/someweirdpath';

		it('should create an instance of the plugin on the client with a specific name when called', function() {
			basicClient.plug('testplugin', testPlugin, {
				apiRoot: PLUGIN_API_ROOT
			});

			assert.ok(basicClient.hasOwnProperty('testplugin'));
			// Make sure the fixture methods are publicly accessible
			assert.strictEqual(typeof basicClient.testplugin.get, 'function');
			assert.strictEqual(typeof basicClient.testplugin.upload, 'function');
		});

		it('should throw an error when a plugin name would overwrite an existing method on box-client', function() {
			assert.throws(function() {
				basicClient.plug('plug', testPlugin); // plug can't be overwritten
			}, Error, 'You cannot define a plugin that overrides an existing method on the client');
		});

		it('should override a plugin when called with a plugin name that already exists', function() {
			basicClient.plug('testplugin', sandbox.stub().returns({}));
			assert.strictEqual(typeof basicClient.testplugin.get, 'undefined');

			// Override plugin
			basicClient.plug('testplugin', testPlugin);
			assert.strictEqual(typeof basicClient.testplugin.get, 'function');
		});

		it('should use the plugin specified apiRoot when one is passed as a param', function(done) {
			basicClient.plug('testplugin', testPlugin, {
				apiRoot: PLUGIN_API_ROOT
			});

			sandbox.mock(basicClient).expects('_makeRequest').withExactArgs({
				method: 'GET',
				url: PLUGIN_API_ROOT + TEST_PATH
			}, done).yields();

			basicClient.testplugin.get(done);
		});

		it('should use the plugin specified apiRoot when one is passed as a param', function(done) {
			basicClient.plug('testplugin', testPlugin, {
				uploadApiRoot: PLUGIN_UPLOAD_API_ROOT
			});

			sandbox.mock(basicClient).expects('_makeRequest').withArgs(sinon.match({
				method: 'POST',
				formData: fakeMultipartFormData,
				url: PLUGIN_UPLOAD_API_ROOT + TEST_PATH
			}), done).yields();

			basicClient.testplugin.upload(fakeMultipartFormData, done);
		});
	});

	describe('defaultResponseHandler()', function() {

		it('should pass error to callback when called with error', function(done) {

			var error = new Error('API Error');

			var wrappedCallback = basicClient.defaultResponseHandler(function(err) {

				assert.equal(err, error);
				done();
			});

			wrappedCallback(error);
		});

		it('should pass response body to callback when called with 2xx response', function(done) {

			var response = {
				statusCode: 200,
				body: 'It worked!'
			};

			var wrappedCallback = basicClient.defaultResponseHandler(function(err, data) {

				assert.ifError(err);
				assert.equal(data, 'It worked!');
				done();
			});

			wrappedCallback(null, response);
		});

		it('should pass unexpected response error to callback when called with unsuccessful response', function(done) {

			var unexpectedResponseError = new Error('dead dove, do not eat'),
				unexpctedResponse = {
					statusCode: 403
				};

			sandbox.stub(errorsFake, 'buildUnexpectedResponseError').returns(unexpectedResponseError);

			var wrappedCallback = basicClient.defaultResponseHandler(function(err) {

				assert.equal(err, unexpectedResponseError);
				done();
			});

			wrappedCallback(null, unexpctedResponse);
		});
	});

});
