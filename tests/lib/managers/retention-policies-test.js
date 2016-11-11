/**
 * @fileoverview Retention Policies manager tests
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
	RetentionPolicies,
	retentionPolicies,
	POLICY_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/retention-policies';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('RetentionPolicies', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('../util/url-path');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
		RetentionPolicies = require(MODULE_FILE_PATH);
		retentionPolicies = new RetentionPolicies(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {

		var POLICY_NAME = 'IMPORTANT EMAILS DO NOT DELETE',
			POLICY_TYPE = 'indefinite',
			DISPOSITION_ACTION = 'remove_retention',
			expectedParams;

		beforeEach(function() {
			expectedParams = {
				body: {
					policy_name: POLICY_NAME,
					policy_type: POLICY_TYPE,
					disposition_action: DISPOSITION_ACTION
				}
			};
		});

		it('should make POST request to create a new policy when called without optional parameters', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/retention_policies', expectedParams);
			retentionPolicies.create(POLICY_NAME, POLICY_TYPE, DISPOSITION_ACTION);
		});

		it('should make POST request to create a new policy when called with optional parameter', function() {

			expectedParams.body.retention_length = 30;
			expectedParams.body.policy_type = 'finite';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/retention_policies', expectedParams);
			retentionPolicies.create(POLICY_NAME, 'finite', DISPOSITION_ACTION, {retention_length: 30});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/retention_policies').yieldsAsync();
			retentionPolicies.create(POLICY_NAME, POLICY_TYPE, DISPOSITION_ACTION, null, done);
		});
	});

	describe('get()', function() {

		it('should make GET request to get policy info when called', function() {

			var qs = {fields: 'policy_name,id'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/retention_policies/' + POLICY_ID, {qs});
			retentionPolicies.get(POLICY_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'policy_name,id'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/retention_policies/' + POLICY_ID, {qs}).yieldsAsync();
			retentionPolicies.get(POLICY_ID, qs, done);
		});
	});

	describe('update()', function() {


		it('should make PUT request to update policy info when called', function() {

			var options = {retention_length: 60};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/retention_policies/' + POLICY_ID, {body: options});
			retentionPolicies.update(POLICY_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var options = {retention_length: 60};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/retention_policies/' + POLICY_ID, {body: options}).yieldsAsync();
			retentionPolicies.update(POLICY_ID, options, done);
		});

	});

	describe('getAll()', function() {

		it('should make GET request to get policies when called', function() {

			var qs = {policy_type: 'enterprise'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/retention_policies', {qs});
			retentionPolicies.getAll(qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {type: 'enterprise'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/retention_policies', {qs}).yieldsAsync();
			retentionPolicies.getAll(qs, done);
		});
	});

	describe('getAssignments()', function() {

		it('should make GET request to get assignments when called', function() {

			var qs = {type: 'enterprise'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/retention_policies/' + POLICY_ID + '/assignments', {qs});
			retentionPolicies.getAssignments(POLICY_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {type: 'enterprise'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/retention_policies/' + POLICY_ID + '/assignments', {qs}).yieldsAsync();
			retentionPolicies.getAssignments(POLICY_ID, qs, done);
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
					assign_to: {
						type: ASSIGN_TYPE,
						id: ASSIGN_ID
					}
				}
			};
		});

		it('should make POST request to assign policy when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/retention_policy_assignments', expectedParams);
			retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/retention_policy_assignments', expectedParams).yieldsAsync();
			retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID, done);
		});
	});

	describe('getAssignment', function() {

		var ASSIGNMENT_ID = '876345';

		it('should make GET request to get assignment info when called', function() {

			var qs = {fields: 'type,id,retention_policy'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/retention_policy_assignments/' + ASSIGNMENT_ID, {qs});
			retentionPolicies.getAssignment(ASSIGNMENT_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'type,id,retention_policy'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/retention_policy_assignments/' + ASSIGNMENT_ID, {qs}).yieldsAsync();
			retentionPolicies.getAssignment(ASSIGNMENT_ID, qs, done);
		});
	});

	describe('getFileVersionRetention()', function() {

		var RETENTION_ID = '9874356';

		it('should make GET request to get retention info when called', function() {

			var qs = {fields: 'type,id,disposition_at'};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/file_version_retentions/' + RETENTION_ID, {qs});
			retentionPolicies.getFileVersionRetention(RETENTION_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {fields: 'type,id,disposition_at'};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/file_version_retentions/' + RETENTION_ID, {qs}).yieldsAsync();
			retentionPolicies.getFileVersionRetention(RETENTION_ID, qs, done);
		});
	});

	describe('getAllFileVersionRetentions()', function() {

		it('should make GET request to get retention records when called', function() {

			var qs = {
				file_id: '1234565',
				disposition_before: '2017-01-01T00:00:00+00:00'
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/file_version_retentions', {qs});
			retentionPolicies.getAllFileVersionRetentions(qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var qs = {
				file_id: '1234565',
				disposition_before: '2017-01-01T00:00:00+00:00'
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/file_version_retentions', {qs}).yieldsAsync();
			retentionPolicies.getAllFileVersionRetentions(qs, done);
		});
	});

});
