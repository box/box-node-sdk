/**
 * @fileoverview Tasks Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	assert = require('chai').assert,
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Tasks,
	tasks,
	testQS,
	testParamsWithQs,
	BASE_PATH = '/tasks',
	TASK_ID = '1234',
	ASSIGNMENT_ID = '873645',
	FILE_ID = '1234',
	REVIEW_ACTION = 'review',
	MODULE_FILE_PATH = '../../../lib/managers/tasks';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Tasks', function() {

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
		Tasks = require(MODULE_FILE_PATH);
		tasks = new Tasks(boxClientFake);
		testQS = { testQSKey: 'testQSValue'};
		testParamsWithQs = {qs: testQS};
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
		var message,
			dueAt,
			expectedParams;

		beforeEach(function() {
			message = 'Optional message for the test';
			dueAt = '2014-04-03T11:09:43-07:00';
			expectedParams = {
				body: {
					item: {
						type: 'file',
						id: FILE_ID
					},
					action: REVIEW_ACTION
				}
			};
		});

		it('should make POST request with all parameters to create a task when all optional parameters are passed', function() {
			expectedParams.body.message = message;
			expectedParams.body.due_at = dueAt;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {message, due_at: dueAt});
		});

		it('should make POST request with message to create a task when just a message is passed', function() {
			expectedParams.body.message = message;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {message});
		});

		it('should make POST request with due_at to create a task when just a dueAt is passed', function() {
			expectedParams.body.due_at = dueAt;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {due_at: dueAt});
		});

		it('should make POST request with mandatory parameters to create a task when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			tasks.create(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			tasks.create(FILE_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return tasks.create(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get task info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`${BASE_PATH}/${TASK_ID}`, testParamsWithQs);
			tasks.get(TASK_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			tasks.get(TASK_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			tasks.get(TASK_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return tasks.get(TASK_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});


	describe('update()', function() {
		var MESSAGE = 'Optional message for the test',
			DUE_AT = '2018-04-03T11:09:43-07:00';

		it('should make PUT request with all parameters to update a task when optional parameters are passed', function() {

			var options = {
				message: MESSAGE,
				due_at: DUE_AT
			};

			var expectedParams = {
				body: options
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${TASK_ID}`, expectedParams);
			tasks.update(TASK_ID, options);
		});

		it('should make PUT request with mandatory parameters to update a task when no optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${TASK_ID}`, {body: null});
			tasks.update(TASK_ID, null);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			tasks.update(TASK_ID, null);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			tasks.update(TASK_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return tasks.update(TASK_ID, null)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make delete request to delete a task permanently when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`${BASE_PATH}/${TASK_ID}`);
			tasks.delete(TASK_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			tasks.delete(TASK_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			tasks.delete(TASK_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return tasks.delete(TASK_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignments()', function() {

		it('should make GET request to get task assignments when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`${BASE_PATH}/${TASK_ID}/assignments`, testParamsWithQs);
			tasks.getAssignments(TASK_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			tasks.getAssignments(TASK_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			tasks.getAssignments(TASK_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return tasks.getAssignments(TASK_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAssignment()', function() {

		it('should make GET request to get task assignment when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/task_assignments/${ASSIGNMENT_ID}`, testParamsWithQs);
			tasks.getAssignment(ASSIGNMENT_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			tasks.getAssignment(ASSIGNMENT_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			tasks.getAssignment(TASK_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return tasks.getAssignment(ASSIGNMENT_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('assignByUserID()', function() {

		var USER_ID = '2354987';

		it('should make POST request to create task assignment when called', function() {

			var expectedParams = {
				body: {
					task: {
						type: 'task',
						id: TASK_ID
					},
					assign_to: {
						id: USER_ID
					}
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/task_assignments', expectedParams);
			tasks.assignByUserID(TASK_ID, USER_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			tasks.assignByUserID(TASK_ID, USER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			tasks.assignByUserID(TASK_ID, USER_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return tasks.assignByUserID(TASK_ID, USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('assignByEmail()', function() {

		var EMAIL = 'blahblah@example.com';

		it('should make POST request to create task assignment when called', function() {

			var expectedParams = {
				body: {
					task: {
						type: 'task',
						id: TASK_ID
					},
					assign_to: {
						login: EMAIL
					}
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/task_assignments', expectedParams);
			tasks.assignByEmail(TASK_ID, EMAIL);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			tasks.assignByEmail(TASK_ID, EMAIL);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			tasks.assignByEmail(TASK_ID, EMAIL, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return tasks.assignByEmail(TASK_ID, EMAIL)
				.then(data => assert.equal(data, response));
		});
	});

	describe('updateAssignment()', function() {
		var MESSAGE = 'Optional message for the test',
			RESOLUTION_STATE = 'approved';

		var options;

		beforeEach(function() {

			options = {
				message: MESSAGE,
				resolution_state: RESOLUTION_STATE
			};
		});

		it('should make PUT request with all parameters to update a task when called', function() {

			var expectedParams = {
				body: options
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/task_assignments/${ASSIGNMENT_ID}`, expectedParams);
			tasks.updateAssignment(ASSIGNMENT_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			tasks.updateAssignment(ASSIGNMENT_ID, options);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			tasks.updateAssignment(ASSIGNMENT_ID, options, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return tasks.updateAssignment(ASSIGNMENT_ID, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteAssignment()', function() {

		it('should make delete request to delete a task permanently when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/task_assignments/${ASSIGNMENT_ID}`);
			tasks.deleteAssignment(ASSIGNMENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			tasks.deleteAssignment(ASSIGNMENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			tasks.deleteAssignment(ASSIGNMENT_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return tasks.deleteAssignment(ASSIGNMENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
