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
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
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
					url: url,
					parent: {
						id: parentID
					}
				}
			};
		});

		it('should make POST request with all parameters to create a web link when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name: name, description: description});
		});

		it('should make POST request with name to create a web link when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name: name});
		});

		it('should make POST request with description to create a web link when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {description: description});
		});

		it('should make POST request with mandatory parameters to create a web link when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs(BASE_PATH).yieldsAsync();
			weblinks.create(url, parentID, {name: name, description: description}, done);
		});

	});

	describe('get()', function() {

		it('should make GET request to get a web link when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs(BASE_PATH + '/' + WEB_LINK_ID, testParamsWithQs);
			weblinks.get(WEB_LINK_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs(BASE_PATH + '/' + WEB_LINK_ID).yieldsAsync();
			weblinks.get(WEB_LINK_ID, null, done);
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
				body: {
				}
			};
		});

		it('should make PUT request with all parameters to update a weblink when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + WEB_LINK_ID, expectedParams);
			weblinks.update(WEB_LINK_ID, {name: name, description: description});
		});

		it('should make PUT request with name to update a weblink when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + WEB_LINK_ID, expectedParams);
			weblinks.update(WEB_LINK_ID, {name: name});
		});

		it('should make PUT request with description to update a weblink when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + WEB_LINK_ID, expectedParams);
			weblinks.update(WEB_LINK_ID, {description: description});
		});

		it('should make PUT request with mandatory parameters to create a task when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + WEB_LINK_ID, expectedParams);
			weblinks.update(WEB_LINK_ID, null);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs(BASE_PATH + '/' + WEB_LINK_ID).yieldsAsync();
			weblinks.update(WEB_LINK_ID, {name: name, description: description}, done);
		});

	});

});
