/**
 * @fileoverview Group Manager Tests
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
	Groups,
	groups,
	BASE_PATH = '/groups',
	MODULE_FILE_PATH = '../../../lib/managers/groups';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('Groups', function() {

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
		Groups = require(MODULE_FILE_PATH);
		groups = new Groups(boxClientFake);
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
		var name,
			provenance,
			expectedParams;

		beforeEach(function() {
			name = 'Box Employees';
			provenance = 'Google';
			expectedParams = {
				body: {
					name: name
				}
			};
		});

		it('should make POST request with mandatory parameters to create a group without optional parameters', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			groups.create(name);
		});

		it('should make POST request with all parameters to create a group when called with optional parameter', function() {
			expectedParams.body.provenance = provenance;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			groups.create(name, {provenance: provenance});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs(BASE_PATH).yieldsAsync();
			groups.create(name, null, done);
		});
	});

});
