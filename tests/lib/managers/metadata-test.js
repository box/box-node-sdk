/**
 * @fileoverview Metadata Manager Tests
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

	describe('createTemplate()', function() {

		it('should make a POST request to create metadata template when called', function(done) {

			var name = 'Vendor Contract',
				fields = [
					{
						type: 'string',
						key: 'category',
						displayName: 'Category'
					},
					{
						type: 'enum',
						key: 'fy',
						displayName: 'FY',
						options: [
							{key: 'FY11'},
							{key: 'FY12'},
							{key: 'FY13'},
							{key: 'FY14'},
							{key: 'FY15'}
						]
					}
				],
				options = {
					hidden: true
				};

			var expectedParams = {
				body: {
					scope: 'enterprise',
					displayName: name,
					fields: fields,
					hidden: true
				}
			};

			sandbox.mock(boxClientFake).expects('post').withArgs('/metadata_templates/schema', expectedParams).yieldsAsync();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			metadata.createTemplate(name, fields, options, done);
		});
	});

	describe('updateTemplate()', function() {

		it('should make PUT call to update template when called', function(done) {

			var scope = 'enterprise',
				template = 'vendorContract',
				operations = [
					{
						op: 'editField',
						fieldKey: 'category',
						data: {
							displayName: 'Contract Category'
						}
					}
				];

			var expectedParams = {
				body: operations
			};

			sandbox.mock(boxClientFake).expects('put').withArgs('/metadata_templates/' + scope + '/' + template + '/schema', expectedParams).yieldsAsync();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			metadata.updateTemplate(scope, template, operations, done);
		});
	});
});
