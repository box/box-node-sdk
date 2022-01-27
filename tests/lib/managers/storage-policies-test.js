
/**
 * @fileoverview Storage Policies Manager Tests
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
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	StoragePolicies,
	storagePolicies,
	MODULE_FILE_PATH = '../../../lib/managers/storage-policies';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('StoragePolicies', function() {

	beforeEach(function() {
		mockery.enable({
			warnOnUnregistered: false
		});
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		// Setup File Under Test
		boxClientFake = leche.fake(BoxClient.prototype);
		StoragePolicies = require(MODULE_FILE_PATH);
		storagePolicies = new StoragePolicies(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getAssignmentForTarget()', function() {

		it('should reject with an error when API response has non-200 status code', function() {

			var response = {
				status: 400
			};

			sandbox.mock(boxClientFake).expects('get')
				.returns(Promise.resolve(response));

			return storagePolicies.getAssignmentForTarget('1234')
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});
	});

	describe('assign()', function() {

		it('should not make any API call to modify assignment if existing assignment is correct', function() {

			var storagePolicyID = '77777';

			var existingAssignment = {
				storage_policy: {
					type: 'storage_policy',
					id: storagePolicyID
				}
			};

			sandbox.stub(storagePolicies, 'getAssignmentForTarget')
				.returns(Promise.resolve(existingAssignment));

			var clientMock = sandbox.mock(boxClientFake);

			clientMock.expects('post').never();
			clientMock.expects('put').never();

			return storagePolicies.assign(storagePolicyID, '1234')
				.then(assignment => {
					assert.strictEqual(assignment, existingAssignment);
				});
		});
	});

});
