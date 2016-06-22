/**
 * @fileoverview Metadata Manager Tests
 * @author mwiller
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	MetadataManager,
	metadata,
	MODULE_FILE_PATH = '../../../lib/managers/metadata';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Metadata', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		MetadataManager = require(MODULE_FILE_PATH);
		metadata = new MetadataManager(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('createProperties()', function() {
		it('should make POST request to create properties metadata', function(done) {
			var fileID = '7594',
				properties = {
					key: 'value'
				};

			var expectedAPIPath = '/files/7594/metadata/properties',
				expectedParams = {
					body: properties
				};
			sandbox.mock(boxClientFake).expects('post').withArgs(expectedAPIPath, expectedParams);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			metadata.createProperties(fileID, properties, done);
		});

		it('should pass empty properties object if none is passed in', function(done) {
			var fileID = '7594';

			var expectedAPIPath = '/files/7594/metadata/properties',
				expectedParams = {
					body: {}
				};
			sandbox.mock(boxClientFake).expects('post').withArgs(expectedAPIPath, expectedParams);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			metadata.createProperties(fileID, null, done);
		});
	});

	describe('getProperties()', function() {
		it('should make a GET request to retrieve properties metadata', function(done) {
			var fileID = '85234';

			var expectedAPIPath = '/files/85234/metadata/properties';
			sandbox.mock(boxClientFake).expects('get').withArgs(expectedAPIPath, null);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			metadata.getProperties(fileID, done);
		});
	});
});
