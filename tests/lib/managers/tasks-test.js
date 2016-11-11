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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {message: message, due_at: dueAt});
		});

		it('should make POST request with message to create a task when just a message is passed', function() {
			expectedParams.body.message = message;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {message: message});
		});

		it('should make POST request with due_at to create a task when just a dueAt is passed', function() {
			expectedParams.body.due_at = dueAt;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID, {due_at: dueAt});
		});

		it('should make POST request with mandatory parameters to create a task when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			tasks.create(FILE_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs(BASE_PATH).yieldsAsync();
			tasks.create(FILE_ID, {message: message, dueAt: dueAt}, done);
		});

	});

	describe('get()', function() {

		it('should make GET request to get task info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs(BASE_PATH + '/' + TASK_ID, testParamsWithQs);
			tasks.get(TASK_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs(BASE_PATH + '/' + TASK_ID).yieldsAsync();
			tasks.get(TASK_ID, testQS, done);
		});

	});

	describe('update()', function() {
		var message,
			dueAt,
			expectedParams;

		beforeEach(function() {
			message = 'Optional message for the test';
			dueAt = '2018-04-03T11:09:43-07:00';
			expectedParams = {
				body: {
					action: REVIEW_ACTION
				}
			};
		});

		it('should make PUT request with all parameters to update a task when all optional parameters are passed', function() {
			expectedParams.body.message = message;
			expectedParams.body.due_at = dueAt;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + TASK_ID, expectedParams);
			tasks.update(TASK_ID, {message: message, due_at: dueAt});
		});

		it('should make PUT request with message to update a task when just a message is passed', function() {
			expectedParams.body.message = message;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + TASK_ID, expectedParams);
			tasks.update(TASK_ID, {message: message});
		});

		it('should make PUT request with due_at to update a task when just a dueAt is passed', function() {
			expectedParams.body.due_at = dueAt;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + TASK_ID, expectedParams);
			tasks.update(TASK_ID, {due_at: dueAt});
		});

		it('should make PUT request with mandatory parameters to update a task when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs(BASE_PATH + '/' + TASK_ID, expectedParams);
			tasks.update(TASK_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs(BASE_PATH + '/' + TASK_ID).yieldsAsync();
			tasks.update(TASK_ID, {message: message, due_at: dueAt}, done);
		});
	});

});
