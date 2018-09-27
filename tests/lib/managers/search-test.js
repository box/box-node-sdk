/**
 * @fileoverview Search Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	mockery = require('mockery'),
	Promise = require('bluebird'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	SearchManager,
	search,
	MODULE_FILE_PATH = '../../../lib/managers/search';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Search', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		SearchManager = require(MODULE_FILE_PATH);
		search = new SearchManager(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('query()', function() {

		var searchQuery,
			fakeQs,
			fakeParamsWithQs;

		beforeEach(function() {

			searchQuery = 'fakeQuery';
			fakeQs = { fakeQsKey: 'fakeQsValue' };
			fakeParamsWithQs = {qs: fakeQs};
		});

		it('should make GET request to search the API when called', function() {

			fakeParamsWithQs.qs.search = searchQuery;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/search', fakeParamsWithQs);
			search.query(searchQuery, fakeQs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			search.query(searchQuery, fakeQs);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			search.query(searchQuery, fakeQs, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return search.query(searchQuery, fakeQs)
				.then(data => assert.equal(data, response));
		});

		it('should properly encode metadata filters when called with mdfilters option', function() {

			var options = {
				mdfilters: [
					{
						templateKey: 'MyTemplate',
						scope: 'enterprise',
						filters: {}
					}
				]
			};

			var expectedParams = {
				qs: {
					mdfilters: '[{"templateKey":"MyTemplate","scope":"enterprise","filters":{}}]',
					query: ''
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/search', expectedParams);
			search.query('', options);
		});

		it('should call callback with error when mdfilters is invalid and callback is passed', function(done) {

			var options = {
				mdfilters: {
					templateKey: 'MyTemplate',
					scope: 'enterprise',
					filters: {}
				}
			};


			sandbox.mock(boxClientFake).expects('get')
				.never();
			search.query('', options, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should return promise that rejects when mdfilters is invalid', function() {

			var options = {
				mdfilters: {
					templateKey: 'MyTemplate',
					scope: 'enterprise',
					filters: {}
				}
			};


			sandbox.mock(boxClientFake).expects('get')
				.never();
			return search.query('', options)
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});
	});

});
