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

	describe('getTemplateSchema()', function() {
		it('should make GET request to get schema', function(done) {

			var expectedAPIPath = '/metadata_templates/enterprise/productSpec/schema';
			sandbox.mock(boxClientFake).expects('get').withArgs(expectedAPIPath, null);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			metadata.getTemplateSchema('enterprise', 'productSpec', done);
		});
	});

	describe('getTemplates()', function() {
		it('should make a GET request to retrieve metadata templates', function(done) {

			var expectedAPIPath = '/metadata_templates/enterprise';
			sandbox.mock(boxClientFake).expects('get').withArgs(expectedAPIPath, null);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			metadata.getTemplates('enterprise', done);
		});
	});
});
