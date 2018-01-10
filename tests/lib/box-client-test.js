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
	Promise = require('bluebird'),
	EventEmitter = require('events').EventEmitter,
	httpStatusCodes = require('http-status'),
	pkg = require('../../package.json');

var APIRequestManager = require('../../lib/api-request-manager'),
	BasicAPISession = require('../../lib/sessions/basic-session'),
	testPlugin = require('../fixtures/plugins/test-plugin'),
	Config = require('../../lib/util/config');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
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
		apiSessionFake = leche.fake(BasicAPISession.prototype);
		requestManagerFake = leche.fake(APIRequestManager.prototype);
		var config = new Config(params);
		fakeParamsWithBody = {body: fakeBody};
		fakeParamsWithQs = {qs: fakeQs};
		fakeResponseBody = {some: 'responseBody'};
		fakeOKResponse = {statusCode: httpStatusCodes.OK, body: fakeResponseBody};
		fakeResponseStream = new EventEmitter();
		fakeUnauthorizedResponse = {statusCode: httpStatusCodes.UNAUTHORIZED, body: {}};
		fakeMultipartFormData = [{format: 'doesNotMatter'}];

		// Setup Mockery
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});

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

		it('should set the "Authentication" header to a new APISession token for all requests when called', function() {
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				headers: sinon.match({ Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN })
			}).returns(Promise.resolve(fakeOKResponse));

			return basicClient._makeRequest({});
		});

		it('should set the X-Box-UA header with correct values when called', function() {

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			var expectedHeader = `agent=box-node-sdk/${pkg.version}; env=Node/`;

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				headers: sinon.match({ 'X-Box-UA': sinon.match(expectedHeader) })
			}).returns(Promise.resolve(fakeOKResponse));

			return basicClient._makeRequest({});
		});

		it('should not overwrite the "BoxAPI" header when it already exists', function() {
			var explicitBoxApiHeader = 'shared_link=box.com/alreadyset&shared_link_password=456',
				headersMatcher = sinon.match({ BoxApi: explicitBoxApiHeader });
			basicClient.setSharedContext('box.com/donotsetthis', '123');

			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs({ headers: headersMatcher })
				.returns(Promise.resolve(fakeOKResponse));

			return basicClient._makeRequest({headers: { BoxApi: explicitBoxApiHeader }});
		});

		it('should call makeStreamingRequest for a streaming request', function() {
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(fakeResponseStream).expects('on')
				.withArgs('response', sinon.match.func);
			sandbox.mock(requestManagerFake).expects('makeStreamingRequest').returns(fakeResponseStream);

			return basicClient._makeRequest({ streaming: true });
		});

		it('should attach expired auth response handler to stream when making streaming request', function() {

			apiSessionFake.handleExpiredTokensError = sandbox.mock().withArgs(sinon.match.instanceOf(Error));

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.stub(requestManagerFake, 'makeStreamingRequest').returns(fakeResponseStream);

			return basicClient._makeRequest({ streaming: true })
				.then(stream => {
					stream.emit('response', fakeUnauthorizedResponse);
				});
		});

		it('should make a request and propagate the response when able to upkeep tokens', function() {
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			sandbox.mock(requestManagerFake).expects('makeRequest').returns(Promise.resolve(fakeOKResponse));

			return basicClient._makeRequest({})
				.then(res => {
					assert.equal(res, fakeOKResponse);
				});
		});

		it('should set the "X-Forwarded-For" header to a new APISession token for all requests when called', function() {
			var ips = ['127.0.0.1', '192.168.1.1'];
			var ipHeader = '127.0.0.1, 192.168.1.1';
			var options = {};
			options.ip = ipHeader;

			sandbox.mock(apiSessionFake).expects('getAccessToken')
				.withArgs(sinon.match(options))
				.returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs({
				headers: sinon.match({
					Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN,
					'X-Forwarded-For': ipHeader
				})
			}).returns(Promise.resolve(fakeOKResponse));

			basicClient.setIPs(ips);
			return basicClient._makeRequest({});
		});

		it('should propagate error when unable to upkeep tokens', function() {
			var upkeepErr = new Error();
			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.reject(upkeepErr));
			sandbox.mock(requestManagerFake).expects('makeRequest').never();

			return basicClient._makeRequest({})
				.catch(err => {
					assert.strictEqual(err, upkeepErr, 'Upkeep error is propagated');
				});
		});

		it('should call session expired auth handler when one is available to handle auth error', function() {

			var error = new Error();
			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			apiSessionFake.handleExpiredTokensError = sandbox.mock().withArgs(sinon.match.instanceOf(Error)).returns(p);

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(requestManagerFake).expects('makeRequest').returns(Promise.resolve(fakeUnauthorizedResponse));

			return basicClient._makeRequest({})
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should store request params and promise fulfillment functions when called in batch mode', function() {

			var requestParams = {
				method: 'get',
				url: 'https://api.box.com/2.0/unicorns'
			};

			basicClient.batch();
			basicClient._makeRequest(requestParams);

			assert.isArray(basicClient._batch);
			assert.lengthOf(basicClient._batch, 1);
			var batchObj = basicClient._batch[0];
			assert.isObject(batchObj);
			assert.propertyVal(batchObj, 'params', requestParams);
			assert.isFunction(batchObj.resolve);
			assert.isFunction(batchObj.reject);
		});

		it('should return promise from batch mode that resolves when stored function is called with response', function() {

			basicClient.batch();
			var promise = basicClient._makeRequest({});

			var response = {
				body: {}
			};
			basicClient._batch[0].resolve(response);

			return promise.then(val => {
				assert.equal(val, response);
			});
		});

		it('should return promise from batch mode that rejects when stored function is called with response error', function() {

			basicClient.batch();
			var promise = basicClient._makeRequest({});

			var error = new Error('Whoops!');
			basicClient._batch[0].reject(error);

			return promise.catch(err => {
				assert.equal(err, error);
			});
		});

		it('should return promise from batch mode that resolves when stored function is called with single response value', function() {

			basicClient.batch();
			var promise = basicClient._makeRequest({});

			basicClient._batch[0].resolve(fakeResponseStream);

			return promise.then(val => {
				assert.equal(val, fakeResponseStream);
			});
		});
	});

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

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve());
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs(sinon.match(expectedParams))
				.returns(Promise.resolve(fakeOKResponse));

			basicClient.setCustomHeader(HEADER_NAME, HEADER_VALUE);
			basicClient.get('/', {}, done);
		});

		it('should remove an already set custom header when called with null', function(done) {
			var expectedParams = { headers: {} };

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve());
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs(sinon.match(expectedParams))
				.returns(Promise.resolve(fakeOKResponse));

			basicClient.setCustomHeader(HEADER_NAME, HEADER_VALUE);
			basicClient.setCustomHeader(HEADER_NAME, null);
			basicClient.get('/', {}, done);
		});

	});

	describe('upload()', function() {

		it('should call the API session\'s getAccessToken() and use the returned token to make the request', function(done) {
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			sandbox.mock(requestManagerFake)
				.expects('makeRequest')
				.withArgs(sinon.match({
					headers: {Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN}
				}))
				.returns(Promise.resolve(fakeOKResponse));

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, done);
		});

		it('should make a request with the correct params and propagate the response info and body when the request succeeds', function(done) {
			var path = '/files/content';

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));

			sandbox.mock(requestManagerFake)
				.expects('makeRequest')
				.withArgs({
					method: 'POST',
					url: util.format('%s/%s%s', params.uploadAPIRootURL, params.apiVersion, path),
					body: fakeBody,
					timeout: params.uploadRequestTimeoutMS,
					headers: sinon.match({ Authorization: HEADER_AUTHORIZATION_PREFIX + FAKE_ACCESS_TOKEN }),
					formData: fakeMultipartFormData
				})
				.returns(Promise.resolve(fakeOKResponse));

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

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw retryableRequestError;
			});
			sandbox.stub(requestManagerFake, 'makeRequest').returns(p);

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, function(err) {
				assert.strictEqual(err, retryableRequestError);
				done();
			});
		});

		it('should propagate a generic access token error when an empty body UNAUTHORIZED response is received', function(done) {
			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.stub(requestManagerFake, 'makeRequest').returns(Promise.resolve(fakeUnauthorizedResponse));

			basicClient.upload('/files/content', fakeParamsWithBody, fakeMultipartFormData, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'authExpired', true);
				done();
			});
		});
	});

	describe('batch()', function() {

		it('should initialize batch array on the client when called', function() {

			assert.propertyVal(basicClient, '_batch', null);
			basicClient.batch();
			assert.isArray(basicClient._batch);
			assert.lengthOf(basicClient._batch, 0);
		});

		it('should return the client object when called', function() {

			var ret = basicClient.batch();
			assert.equal(ret, basicClient);
		});
	});

	describe('batchExec()', function() {

		it('should make batch API call with stored parameters when called', function() {

			basicClient.batch();
			basicClient.get('/foo', {qs: {fields: 'name'}});

			var expectedBatchParams = {
				body: {
					requests: [
						{
							method: 'GET',
							relative_url: '/foo?fields=name',
							body: undefined,
							headers: undefined
						}
					]
				}
			};
			var response = {
				body: {
					responses: []
				}
			};
			sandbox.mock(basicClient).expects('post')
				.withArgs('/batch', sinon.match(expectedBatchParams))
				.returns(Promise.resolve(response));

			basicClient.batchExec();
		});

		it('should transform the response and pass it to individual call promises when batch call succeeds', function() {

			basicClient.batch();
			var promise = basicClient.get('/foo');

			var response = {
				statusCode: 200,
				body: {
					responses: [
						{
							status: 200,
							headers: {},
							response: {
								foo: 'bar'
							}
						}
					]
				}
			};
			sandbox.stub(basicClient, 'post').returns(Promise.resolve(response));

			basicClient.batchExec();

			return promise.then(data => {
				assert.propertyVal(data, 'statusCode', 200);
				assert.nestedPropertyVal(data, 'body.foo', 'bar');
			});
		});

		it('should return promise resolving to the full batch response when batch call succeeds', function() {

			basicClient.batch();
			basicClient.get('/foo');

			var response = {
				statusCode: 200,
				body: {
					responses: [
						{
							status: 200,
							headers: {},
							response: {
								foo: 'bar'
							}
						}
					]
				}
			};
			sandbox.stub(basicClient, 'post').returns(Promise.resolve(response));

			return basicClient.batchExec().then(data => {
				assert.equal(data, response.body);
			});
		});

		it('should return promise that rejects and reject individual call promises when batch call fails', function() {

			var error = new Error('Nope');

			basicClient.batch();
			var promise = basicClient.get('/foo').catch(err => {
				assert.equal(err, error);
			});

			sandbox.stub(basicClient, 'post').returns(Promise.reject(error));

			var promise2 = basicClient.batchExec().catch(err => {
				assert.equal(err, error);
			});

			return Promise.all([promise, promise2]);
		});

		it('should pass batch result to callback when batch call succeeds', function(done) {

			basicClient.batch();
			basicClient.get('/foo');

			var response = {
				statusCode: 200,
				body: {
					responses: [
						{
							status: 200,
							headers: {},
							response: {
								foo: 'bar'
							}
						}
					]
				}
			};
			sandbox.stub(basicClient, 'post').returns(Promise.resolve(response));

			basicClient.batchExec(function(err, data) {

				assert.ifError(err);
				assert.equal(data, response.body);
				done();
			});
		});

		it('should pass error to callbacks when batch call fails', function() {

			var error = new Error('Nope');

			basicClient.batch();
			var promise = new Promise(function(resolve) {
				basicClient.get('/foo', {}, function(err) {
					assert.equal(err, error);
					resolve();
				});
			});

			sandbox.stub(basicClient, 'post').returns(Promise.reject(error));

			var promise2 = new Promise(function(resolve) {
				basicClient.batchExec(function(err) {
					assert.equal(err, error);
					resolve();
				});
			});

			return Promise.all([promise, promise2]);
		});

		it('should return a promise the rejects when called before a batch is started', function() {

			return basicClient.batchExec()
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should call callback with an error when called before a batch is started', function(done) {

			basicClient.batchExec(function(err) {
				assert.instanceOf(err, Error);
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
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			basicClient.setIPs(ips);

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				headers: { 'X-Forwarded-For': xffTest }
			})).returns(Promise.resolve(fakeOKResponse));

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

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs(sinon.match(expectedParams))
				.returns(Promise.resolve(fakeOKResponse));

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
			sandbox.mock(apiSessionFake).expects('getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			basicClient.revokeSharedContext();

			sandbox.mock(requestManagerFake).expects('makeRequest').withArgs(sinon.match({
				headers: { BoxApi: undefined }
			})).returns(Promise.resolve(fakeOKResponse));

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

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs(sinon.match(expectedParams))
				.returns(Promise.resolve(fakeOKResponse));

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

			sandbox.stub(apiSessionFake, 'getAccessToken').returns(Promise.resolve(FAKE_ACCESS_TOKEN));
			sandbox.mock(requestManagerFake).expects('makeRequest')
				.withArgs(sinon.match(expectedParams))
				.returns(Promise.resolve(fakeOKResponse));

			basicClient.asUser(USER_ID);
			basicClient.asSelf();
			basicClient.get('/', {}, done);
		});
	});

	describe('revokeTokens()', function() {
		it('should call apiSession.revokeTokens when called', function(done) {
			sandbox.mock(apiSessionFake).expects('revokeTokens').returns(Promise.resolve());
			basicClient.revokeTokens(done);
		});

		it('should call apiSession.revokeTokens with options.ip parameter when called', function(done) {
			var ips = ['127.0.0.1', '192.168.1.1'];
			var ipHeader = '127.0.0.1, 192.168.1.1';
			var options = {};
			options.ip = ipHeader;
			basicClient.setIPs(ips);

			sandbox.mock(apiSessionFake).expects('revokeTokens').withArgs(sinon.match(options)).returns(Promise.resolve());
			basicClient.revokeTokens(done);
		});

		it('should call callback with an error when token revocation fails', function(done) {

			var error = new Error('No can do');

			sandbox.mock(apiSessionFake).expects('revokeTokens').returns(Promise.reject(error));
			basicClient.revokeTokens(function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise resolving when tokens are revoked', function() {

			sandbox.mock(apiSessionFake).expects('revokeTokens').returns(Promise.resolve());
			return basicClient.revokeTokens()
				.then(data => {
					assert.isUndefined(data);
				});
		});

		it('should return a promise that rejects when token revocation fails', function() {

			var error = new Error('No can do');

			sandbox.mock(apiSessionFake).expects('revokeTokens').returns(Promise.reject(error));
			return basicClient.revokeTokens()
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

	describe('exchangeToken()', function() {

		var TEST_SCOPE = 'item_preview',
			TEST_RESOURCE = 'https://api.box.com/2.0/folders/0';

		it('should call session to exchange token and pass exchanged token to callback when called', function(done) {

			var exchangedTokenInfo = {accessToken: 'qqwjnfldkjfhksedrg'};

			sandbox.mock(apiSessionFake).expects('exchangeToken')
				.withArgs(TEST_SCOPE, TEST_RESOURCE)
				.returns(Promise.resolve(exchangedTokenInfo));

			basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE, function(err, data) {

				assert.ifError(err);
				assert.equal(data, exchangedTokenInfo);
				done();
			});
		});

		it('should call session to exchange token with options.ip parameter and pass exchanged token to callback when called', function(done) {
			var ips = ['127.0.0.1', '192.168.1.1'];
			var ipHeader = '127.0.0.1, 192.168.1.1';
			var expectedOptions = {
				tokenRequestOptions: {
					ip: ipHeader
				}
			};

			var exchangedTokenInfo = {accessToken: 'qqwjnfldkjfhksedrg'};

			sandbox.mock(apiSessionFake).expects('exchangeToken')
				.withArgs(TEST_SCOPE, TEST_RESOURCE, expectedOptions)
				.returns(Promise.resolve(exchangedTokenInfo));

			basicClient.setIPs(ips);
			basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE, function(err, data) {

				assert.ifError(err);
				assert.equal(data, exchangedTokenInfo);
				done();
			});
		});

		it('should call session to exchange token with actor params when actor params are passed', function() {

			var actor = {
				id: 'foobar',
				name: 'Human Being'
			};

			var expectedOptions = {
				actor,
				tokenRequestOptions: null
			};

			var exchangedTokenInfo = {accessToken: 'qqwjnfldkjfhksedrg'};

			sandbox.mock(apiSessionFake).expects('exchangeToken')
				.withArgs(TEST_SCOPE, TEST_RESOURCE, expectedOptions)
				.returns(Promise.resolve(exchangedTokenInfo));

			return basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE, { actor })
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should call callback with error when token exchange fails', function(done) {

			var error = new Error('Failure');

			sandbox.stub(apiSessionFake, 'exchangeToken').returns(Promise.reject(error));

			basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that resolves to the exchanged token info when token exchage succeeds', function() {

			var exchangedTokenInfo = {accessToken: 'qqwjnfldkjfhksedrg'};

			sandbox.stub(apiSessionFake, 'exchangeToken').returns(Promise.resolve(exchangedTokenInfo));

			return basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE)
				.then(data => {
					assert.equal(data, exchangedTokenInfo);
				});
		});

		it('should return a promise that rejects when token exchange fails', function() {

			var error = new Error('Failure');

			sandbox.stub(apiSessionFake, 'exchangeToken').returns(Promise.reject(error));

			return basicClient.exchangeToken(TEST_SCOPE, TEST_RESOURCE)
				.catch(err => {
					assert.equal(err, error);
				});
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

			var unexpectedResponse = {
				statusCode: 403
			};

			var wrappedCallback = basicClient.defaultResponseHandler(function(err) {

				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', unexpectedResponse.statusCode);
				done();
			});

			wrappedCallback(null, unexpectedResponse);
		});
	});

});
