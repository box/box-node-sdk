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
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
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

		it('should make GET request to search the API and propagate results when called', function(done) {
			var searchQuery = 'fakeQuery',
				fakeQs = { fakeQsKey: 'fakeQsValue' },
				fakeParamsWithQs = {qs: fakeQs};

			fakeParamsWithQs.qs.search = searchQuery;
			sandbox.mock(boxClientFake).expects('get').withArgs('/search', fakeParamsWithQs).yieldsAsync();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			search.query(searchQuery, fakeQs, done);
		});

		it('should call defaultResponseHandler to wrap callback when called', function(done) {
			var searchQuery = 'fakeQuery',
				fakeQs = { fakeQsKey: 'fakeQsValue' },
				fakeParamsWithQs = {qs: fakeQs};

			fakeParamsWithQs.qs.search = searchQuery;
			sandbox.stub(boxClientFake, 'get').yieldsAsync();
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			search.query(searchQuery, fakeQs, done);
		});

		it('should properly encode metadata filters when called with mdfilters option', function(done) {

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

			sandbox.mock(boxClientFake).expects('get').withArgs('/search', expectedParams).yieldsAsync();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			search.query('', options, done);
		});

		it('should call callback with error when mdfilters is invalid', function(done) {

			var options = {
				mdfilters: {
					templateKey: 'MyTemplate',
					scope: 'enterprise',
					filters: {}
				}
			};


			sandbox.mock(boxClientFake).expects('get').never();
			search.query('', options, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

	});

});
