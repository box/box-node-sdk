/**
 * @fileoverview Weblinks Manager Tests
 * @author ptoth
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
	BASE_PATH = '/web_links',
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

		it('should make POST request with all parameters to create a weblink when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name: name, description: description});
		});

		it('should make POST request with name to create a weblink when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name: name});
		});

		it('should make POST request with description to create a weblink when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {description: description});
		});

		it('should make POST request  with mandatory parameters to create a web link when neither optional parameter is passed', function() {
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

});
