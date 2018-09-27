/**
 * @fileoverview Weblinks Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	assert = require('chai').assert,
	Promise = require('bluebird'),
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	WebLinks,
	weblinks,
	testQS,
	testParamsWithQs,
	BASE_PATH = '/web_links',
	WEB_LINK_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/web-links';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('WebLinks', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true
		});
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		WebLinks = require(MODULE_FILE_PATH);
		weblinks = new WebLinks(boxClientFake);
		testQS = { testQSKey: 'testQSValue'};
		testParamsWithQs = {qs: testQS};
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {
		var parentID,
			url,
			name,
			description,
			expectedParams;

		beforeEach(function() {
			parentID = '1234';
			url = 'https://www.box.com';
			name = 'Box Website!';
			description = 'Cloud Content Management';
			expectedParams = {
				body: {
					url,
					parent: {
						id: parentID
					}
				}
			};
		});

		it('should make POST request with all parameters to create a web link when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name, description});
		});

		it('should make POST request with name to create a web link when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name});
		});

		it('should make POST request with description to create a web link when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {description});
		});

		it('should make POST request with mandatory parameters to create a web link when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			weblinks.create(url, parentID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			weblinks.create(url, parentID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return weblinks.create(url, parentID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get a web link when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, testParamsWithQs);
			weblinks.get(WEB_LINK_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			weblinks.get(WEB_LINK_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			weblinks.get(WEB_LINK_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return weblinks.get(WEB_LINK_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		var name,
			description,
			expectedParams;

		beforeEach(function() {
			name = 'Box Website!';
			description = 'Cloud Content Management';
			expectedParams = {
				body: {}
			};
		});

		it('should make PUT request with all parameters to update a weblink when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {name, description});
		});

		it('should make PUT request with name to update a weblink when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {name});
		});

		it('should make PUT request with description to update a weblink when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {description});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			weblinks.update(WEB_LINK_ID, {description});
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			weblinks.update(WEB_LINK_ID, {name}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return weblinks.update(WEB_LINK_ID, {description})
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete a web link when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, null);
			weblinks.delete(WEB_LINK_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			weblinks.delete(WEB_LINK_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			weblinks.delete(WEB_LINK_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return weblinks.delete(WEB_LINK_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
