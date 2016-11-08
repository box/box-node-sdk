/**
 * @fileoverview Legal Hold Policies manager tests
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
	boxClientFake,
	LegalHoldPolicies,
	legalHoldPolicies,
	POLICY_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/legal-hold-policies';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('LegalHoldPolicies', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('../util/url-path');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
		LegalHoldPolicies = require(MODULE_FILE_PATH);
		legalHoldPolicies = new LegalHoldPolicies(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {

		var POLICY_NAME = 'Tax Audit',
			expectedParams;

		beforeEach(function() {
			expectedParams = {
				body: {
					policy_name: POLICY_NAME
				}
			};
		});

		it('should make POST request to create a new policy when called without optional parameters', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/legal_hold_policies', expectedParams);
			legalHoldPolicies.create(POLICY_NAME);
		});

		it('should make POST request to create a new policy when called with optional parameter', function() {

			var description = 'For the 2016 IRS audit';
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/legal_hold_policies', expectedParams);
			legalHoldPolicies.create(POLICY_NAME, {description});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/legal_hold_policies').yieldsAsync();
			legalHoldPolicies.create(POLICY_NAME, null, done);
		});
	});

	describe('get()', function() {

		it('should make GET request to get policy info when called', function() {

			var qs = {fields: 'policy_name,id'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/legal_hold_policies/' + POLICY_ID, {qs});
			legalHoldPolicies.get(POLICY_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'policy_name,id'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/legal_hold_policies/' + POLICY_ID, {qs}).yieldsAsync();
			legalHoldPolicies.get(POLICY_ID, qs, done);
		});
	});

	describe('update()', function() {


		it('should make PUT request to update policy info when called', function() {

			var options = {
				description: 'NOTE: Do not remove until litigation is concluded!'
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/legal_hold_policies/' + POLICY_ID, {body: options});
			legalHoldPolicies.update(POLICY_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var options = {
				description: 'NOTE: Do not remove until litigation is concluded!'
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/legal_hold_policies/' + POLICY_ID, {body: options}).yieldsAsync();
			legalHoldPolicies.update(POLICY_ID, options, done);
		});

	});

	describe('delete()', function() {

		it('should make DELETE request to delete policy when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/legal_hold_policies/' + POLICY_ID);
			legalHoldPolicies.delete(POLICY_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/legal_hold_policies/' + POLICY_ID).yieldsAsync();
			legalHoldPolicies.delete(POLICY_ID, done);
		});
	});

	describe('getAll()', function() {

		it('should make GET request to get policies when called', function() {

			var qs = {policy_name: 'Lawsuit'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/legal_hold_policies', {qs});
			legalHoldPolicies.getAll(qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {policy_name: 'Lawsuit'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/legal_hold_policies', {qs}).yieldsAsync();
			legalHoldPolicies.getAll(qs, done);
		});
	});

	describe('getAssignments()', function() {

		it('should make GET request to get assignments when called', function() {

			var qs = {assign_to_type: 'user'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/legal_hold_policies/' + POLICY_ID + '/assignments', {qs});
			legalHoldPolicies.getAssignments(POLICY_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {assign_to_type: 'user'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/legal_hold_policies/' + POLICY_ID + '/assignments', {qs}).yieldsAsync();
			legalHoldPolicies.getAssignments(POLICY_ID, qs, done);
		});
	});

	describe('assign()', function() {

		var ASSIGN_TYPE = 'folder',
			ASSIGN_ID = '12345',
			expectedParams;

		beforeEach(function() {

			expectedParams = {
				body: {
					policy_id: POLICY_ID,
					assign_to_type: ASSIGN_TYPE,
					assign_to_id: ASSIGN_ID
				}
			};
		});

		it('should make POST request to assign policy when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/legal_hold_policy_assignments', expectedParams);
			legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/legal_hold_policy_assignments', expectedParams).yieldsAsync();
			legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID, done);
		});
	});

	describe('getAssignment', function() {

		var ASSIGNMENT_ID = '876345';

		it('should make GET request to get assignment info when called', function() {

			var qs = {fields: 'type,id,legal_hold_policy'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/legal_hold_policy_assignments/' + ASSIGNMENT_ID, {qs});
			legalHoldPolicies.getAssignment(ASSIGNMENT_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'type,id,legal_hold_policy'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/legal_hold_policy_assignments/' + ASSIGNMENT_ID, {qs}).yieldsAsync();
			legalHoldPolicies.getAssignment(ASSIGNMENT_ID, qs, done);
		});
	});

	describe('deleteAssignment()', function() {

		var ASSIGNMENT_ID = '7634958736';

		it('should make DELETE request to delete assignment when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/legal_hold_policy_assignments/' + ASSIGNMENT_ID);
			legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/legal_hold_policy_assignments/' + ASSIGNMENT_ID).yieldsAsync();
			legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID, done);
		});
	});

	describe('getFileVersionLegalHold()', function() {

		var LEGAL_HOLD_ID = '9874356';

		it('should make GET request to get legal hold info when called', function() {

			var qs = {fields: 'type,id,file_version'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/file_version_legal_holds/' + LEGAL_HOLD_ID, {qs});
			legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'type,id,file_version'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/file_version_legal_holds/' + LEGAL_HOLD_ID, {qs}).yieldsAsync();
			legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID, qs, done);
		});
	});

	describe('getAllFileVersionLegalHolds()', function() {

		it('should make GET request to get legal hold records when called', function() {

			var qs = {
				policy_id: POLICY_ID
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/file_version_legal_holds', {qs});
			legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {
				policy_id: POLICY_ID
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/file_version_legal_holds', {qs}).yieldsAsync();
			legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID, null, done);
		});
	});

});
