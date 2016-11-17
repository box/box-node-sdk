/**
 * @fileoverview Trash Manager Tests
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
	Trash,
	trash,
	testQS = { testQSKey: 'testQSValue' },
	testParamsWithQs,
	MODULE_FILE_PATH = '../../../lib/managers/trash';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Trash', function() {

	beforeEach(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);

		testParamsWithQs = {qs: testQS};
		// Setup File Under Test
		Trash = require(MODULE_FILE_PATH);
		trash = new Trash(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {

		it('should make GET request to get trashed items when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/trash/items', testParamsWithQs);
			trash.get(testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/folders/trash/items', testParamsWithQs).yieldsAsync();
			trash.get(testQS, done);
		});
	});
});
