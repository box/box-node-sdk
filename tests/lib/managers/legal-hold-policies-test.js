/**
 * @fileoverview Legal Hold Policies manager tests
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/legal_hold_policies', expectedParams);
			legalHoldPolicies.create(POLICY_NAME);
		});

		it('should make POST request to create a new policy when called with optional parameter', function() {

			var description = 'For the 2016 IRS audit';
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/legal_hold_policies', expectedParams);
			legalHoldPolicies.create(POLICY_NAME, {description});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			legalHoldPolicies.create(POLICY_NAME);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			legalHoldPolicies.create(POLICY_NAME, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return legalHoldPolicies.create(POLICY_NAME)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get policy info when called', function() {

			var qs = {fields: 'policy_name,id'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/legal_hold_policies/${POLICY_ID}`, {qs});
			legalHoldPolicies.get(POLICY_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.get(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.get(POLICY_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.get(POLICY_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {

		var options;

		beforeEach(function() {

			options = {
				description: 'NOTE: Do not remove until litigation is concluded!'
			};
		});

		it('should make PUT request to update policy info when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/legal_hold_policies/${POLICY_ID}`, {body: options});
			legalHoldPolicies.update(POLICY_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			legalHoldPolicies.update(POLICY_ID, options);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			legalHoldPolicies.update(POLICY_ID, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return legalHoldPolicies.update(POLICY_ID, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete policy when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/legal_hold_policies/${POLICY_ID}`);
			legalHoldPolicies.delete(POLICY_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			legalHoldPolicies.delete(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			legalHoldPolicies.delete(POLICY_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return legalHoldPolicies.delete(POLICY_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {

		it('should make GET request to get policies when called', function() {

			var qs = {policy_name: 'Lawsuit'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/legal_hold_policies', {qs});
			legalHoldPolicies.getAll(qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.getAll();
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.getAll(null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.getAll()
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignments()', function() {

		it('should make GET request to get assignments when called', function() {

			var qs = {
				assign_to_type: 'user',
				policy_id: POLICY_ID
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/legal_hold_policy_assignments', {qs});
			legalHoldPolicies.getAssignments(POLICY_ID, { assign_to_type: 'user' });
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.getAssignments(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.getAssignments(POLICY_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.getAssignments(POLICY_ID)
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
				.withArgs('/legal_hold_policy_assignments', expectedParams);
			legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return legalHoldPolicies.assign(POLICY_ID, ASSIGN_TYPE, ASSIGN_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignment', function() {

		var ASSIGNMENT_ID = '876345';

		it('should make GET request to get assignment info when called', function() {

			var qs = {fields: 'type,id,legal_hold_policy'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/legal_hold_policy_assignments/${ASSIGNMENT_ID}`, {qs});
			legalHoldPolicies.getAssignment(ASSIGNMENT_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.getAssignment(ASSIGNMENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.getAssignment(ASSIGNMENT_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.getAssignment(ASSIGNMENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteAssignment()', function() {

		var ASSIGNMENT_ID = '7634958736';

		it('should make DELETE request to delete assignment when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/legal_hold_policy_assignments/${ASSIGNMENT_ID}`);
			legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return legalHoldPolicies.deleteAssignment(ASSIGNMENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getFileVersionLegalHold()', function() {

		var LEGAL_HOLD_ID = '9874356';

		it('should make GET request to get legal hold info when called', function() {

			var qs = {fields: 'type,id,file_version'};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/file_version_legal_holds/${LEGAL_HOLD_ID}`, {qs});
			legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.getFileVersionLegalHold(LEGAL_HOLD_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllFileVersionLegalHolds()', function() {

		it('should make GET request to get legal hold records when called', function() {

			var qs = {
				policy_id: POLICY_ID
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/file_version_legal_holds', {qs});
			legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return legalHoldPolicies.getAllFileVersionLegalHolds(POLICY_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
