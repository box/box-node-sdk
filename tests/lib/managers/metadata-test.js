/**
 * @fileoverview Metadata Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	Promise = require('bluebird'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
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
		it('should make GET request to get schema', function() {

			var expectedAPIPath = '/metadata_templates/enterprise/productSpec/schema';
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(expectedAPIPath, null);
			metadata.getTemplateSchema('enterprise', 'productSpec');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			metadata.getTemplateSchema('enterprise', 'productSpec');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			metadata.getTemplateSchema('enterprise', 'productSpec', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return metadata.getTemplateSchema('enterprise', 'productSpec')
				.then(data => assert.equal(data, response));
		});
	});

	describe('getTemplates()', function() {
		it('should make a GET request to retrieve metadata templates', function() {

			var expectedAPIPath = '/metadata_templates/enterprise';
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(expectedAPIPath, null);
			metadata.getTemplates('enterprise');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			metadata.getTemplates('enterprise');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			metadata.getTemplates('enterprise', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return metadata.getTemplates('enterprise')
				.then(data => assert.equal(data, response));
		});
	});

	describe('createTemplate()', function() {

		var name,
			fields,
			options;

		beforeEach(function() {

			name = 'Vendor Contract';
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
			];
			options = {
				hidden: true,
				copyInstanceOnItemCopy: true
			};
		});

		it('should make a POST request to create metadata template when called', function() {


			var expectedParams = {
				body: {
					scope: 'enterprise',
					displayName: name,
					fields,
					hidden: true,
					copyInstanceOnItemCopy: true
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/metadata_templates/schema', expectedParams);
			metadata.createTemplate(name, fields, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			metadata.createTemplate(name, fields, options);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			metadata.createTemplate(name, fields, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return metadata.createTemplate(name, fields, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteTemplate()', function() {
		var scope = 'enterprise',
			template = 'testtemplate';

		it('should make DELETE call to delete template when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/metadata_templates/${scope}/${template}/schema`);
			metadata.deleteTemplate(scope, template);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			metadata.deleteTemplate(scope, template);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			metadata.deleteTemplate(scope, template, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return metadata.deleteTemplate(scope, template)
				.then(data => assert.equal(data, response));
		});
	});

	describe('updateTemplate()', function() {

		var scope,
			template,
			operations;

		beforeEach(function() {

			scope = 'enterprise';
			template = 'vendorContract';
			operations = [
				{
					op: 'editField',
					fieldKey: 'category',
					data: {
						displayName: 'Contract Category'
					}
				}
			];
		});

		it('should make PUT call to update template when called', function() {


			var expectedParams = {
				body: operations
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/metadata_templates/${scope}/${template}/schema`, expectedParams);
			metadata.updateTemplate(scope, template, operations);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			metadata.updateTemplate(scope, template, operations);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			metadata.updateTemplate(scope, template, operations, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return metadata.updateTemplate(scope, template, operations)
				.then(data => assert.equal(data, response));
		});
	});

	describe('query()', function() {
		it('should make POST request to search the API when called', function() {
			var from = 'enterprise_987654321.someTemplate';
			var ancestorFolderId = '0';
			var options = {
				query: 'value >= :amount',
				query_params: {amount: '100'},
				limit: 10,
				marker: 'vwxyz',
				order_by: [
					{
						"field_key": "value",
						"direction": "asc"
					}
				]
			};

			var expectedParams = {
				body: {
					ancestor_folder_id: ancestorFolderId,
					from: from,
					...options
				},
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/metadata_queries/execute_read', expectedParams);
			metadata.query(from, ancestorFolderId, options);
		});
	});
});
