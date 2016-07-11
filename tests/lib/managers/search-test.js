/**
 * @fileoverview Search Manager Tests
 * @author djordan
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
	SearchManager,
	search,
	MODULE_FILE_PATH = '../../../lib/managers/search';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Search', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
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

	describe('search()', function() {

		it('should make GET request to search the API and propagate results when called', function(done) {
			var searchQuery = 'fakeQuery',
				fakeQs = { fakeQsKey: 'fakeQsValue' },
				fakeParamsWithQs = {qs: fakeQs};

			fakeParamsWithQs.qs.search = searchQuery;
			sandbox.mock(boxClientFake).expects('get').withArgs('/search', fakeParamsWithQs);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			search.query(searchQuery, fakeQs, done);
		});

	});

});
