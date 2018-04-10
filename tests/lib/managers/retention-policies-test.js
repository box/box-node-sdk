/**
 * @fileoverview Retention Policies manager tests
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/retention_policies', expectedParams);
			retentionPolicies.create(POLICY_NAME, POLICY_TYPE, DISPOSITION_ACTION);
		});

		it('should make POST request to create a new policy when called with optional parameter', function() {

			expectedParams.body.retention_length = 30;
			expectedParams.body.policy_type = 'finite';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/retention_policies', expectedParams);
			retentionPolicies.create(POLICY_NAME, 'finite', DISPOSITION_ACTION, {retention_length: 30});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			retentionPolicies.create(POLICY_NAME, 'finite', DISPOSITION_ACTION, {retention_length: 30});
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			retentionPolicies.create(POLICY_NAME, 'finite', DISPOSITION_ACTION, {retention_length: 30}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return retentionPolicies.create(POLICY_NAME, 'finite', DISPOSITION_ACTION, {retention_length: 30})
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get policy info when called', function() {

			var qs = {fields: 'policy_name,id'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/retention_policies/${POLICY_ID}`, {qs});
			retentionPolicies.get(POLICY_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.get(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.get(POLICY_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.get(POLICY_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {

		var options;

		beforeEach(function() {

			options = {retention_length: 60};
		});

		it('should make PUT request to update policy info when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/retention_policies/${POLICY_ID}`, {body: options});
			retentionPolicies.update(POLICY_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			retentionPolicies.update(POLICY_ID, options);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			retentionPolicies.update(POLICY_ID, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return retentionPolicies.update(POLICY_ID, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {

		it('should make GET request to get policies when called', function() {

			var qs = {policy_type: 'enterprise'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/retention_policies', {qs});
			retentionPolicies.getAll(qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.getAll();
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.getAll(null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.getAll()
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignments()', function() {

		it('should make GET request to get assignments when called', function() {

			var qs = {type: 'enterprise'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/retention_policies/${POLICY_ID}/assignments`, {qs});
			retentionPolicies.getAssignments(POLICY_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.getAssignments(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.getAssignments(POLICY_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.getAssignments(POLICY_ID)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/retention_policy_assignments', expectedParams);
			retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should make POST request to assign policy with optional params when options are passed', function() {

			var options = {
				filter_fields: [
					{
						field: 'foo',
						value: 'bar'
					},
					{
						field: 'baz',
						value: 42
					}
				]
			};

			expectedParams.body.filter_fields = options.filter_fields;
			expectedParams.body.assign_to.type = 'metadata_template';
			expectedParams.body.assign_to.id = 'enterprise.myTemplate';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/retention_policy_assignments', expectedParams);
			retentionPolicies.assign(POLICY_ID, 'metadata_template', 'enterprise.myTemplate', options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return retentionPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignment()', function() {

		var ASSIGNMENT_ID = '876345';

		it('should make GET request to get assignment info when called', function() {

			var qs = {fields: 'type,id,retention_policy'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/retention_policy_assignments/${ASSIGNMENT_ID}`, {qs});
			retentionPolicies.getAssignment(ASSIGNMENT_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.getAssignment(ASSIGNMENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.getAssignment(ASSIGNMENT_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.getAssignment(ASSIGNMENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getFileVersionRetention()', function() {

		var RETENTION_ID = '9874356';

		it('should make GET request to get retention info when called', function() {

			var qs = {fields: 'type,id,disposition_at'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/file_version_retentions/${RETENTION_ID}`, {qs});
			retentionPolicies.getFileVersionRetention(RETENTION_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.getFileVersionRetention(RETENTION_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.getFileVersionRetention(RETENTION_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.getFileVersionRetention(RETENTION_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllFileVersionRetentions()', function() {

		it('should make GET request to get retention records when called', function() {

			var qs = {
				file_id: '1234565',
				disposition_before: '2017-01-01T00:00:00+00:00'
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/file_version_retentions', {qs});
			retentionPolicies.getAllFileVersionRetentions(qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			retentionPolicies.getAllFileVersionRetentions();
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			retentionPolicies.getAllFileVersionRetentions(null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return retentionPolicies.getAllFileVersionRetentions()
				.then(data => assert.equal(data, response));
		});
	});

});
