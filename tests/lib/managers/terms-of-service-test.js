/**
 * @fileoverview Terms Of Service Tests
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
	boxClientFake = leche.fake(BoxClient.prototype),
	TermsOfService,
	termsOfService,
	TERMS_OF_SERVICE_ID = '1234',
	TERMS_OF_SERVICE_USER_ID = '5678',
	TERMS_OF_SERVICE_USER_STATUS_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/terms-of-service';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('TermsOfService', function() {

	beforeEach(function() {
		mockery.enable({
			warnOnUnregistered: false
		});
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		// Setup File Under Test
		TermsOfService = require(MODULE_FILE_PATH);
		termsOfService = new TermsOfService(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {
		it('should make GET request to get terms of service info when called with ID', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_services/1234')
				.returns(Promise.resolve(response));
			termsOfService.get(TERMS_OF_SERVICE_ID);
		});

		it('should call callback with the terms of service info response is returned', function(done) {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			termsOfService.get(TERMS_OF_SERVICE_ID, null, function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.get(TERMS_OF_SERVICE_ID)
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});


	describe('getAll()', function() {
		it('should make GET request to get terms of service info when called', function() {
			var response = {
				total_count: 2,
				entries: [{
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}]
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_services')
				.returns(Promise.resolve(response));
			termsOfService.getAll();
		});

		it('should call callback with the terms of service info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			termsOfService.getAll(null, function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getAll()
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('create()', function() {
		var expectedTermsOfServiceParam = { body: { status: 'enabled', text: 'Test Text', tos_type: 'managed'}};
		it('should make POST request to create custom terms of service when called', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'managed',
				text: 'Test Text',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_services', expectedTermsOfServiceParam)
				.returns(Promise.resolve(response));
			termsOfService.create('managed', 'enabled', 'Test Text');
		});

		it('should call callback with the created terms of service info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			termsOfService.create('managed', 'enabled', 'Test Text', function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to created terms of service object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'TEST',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.create('managed', 'enabled', 'Test Text')
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('update()', function() {
		it('should make PUT request to update custom terms of service info when called', function() {
			var expectedTermsOfServiceParam = { body: { status: 'enabled', text: 'Test Text'}};

			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'managed',
				text: 'Test Text',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_services/1234', expectedTermsOfServiceParam)
				.returns(Promise.resolve(response));
			termsOfService.update(TERMS_OF_SERVICE_ID, 'enabled', 'Test Text');
		});

		it('should call callback with the updated terms of service info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'Test Text',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			termsOfService.update(TERMS_OF_SERVICE_ID, 'enabled', 'Test Text', function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to updated terms of service object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service',
				id: '1234',
				status: 'enabled',
				enterprise: {},
				tos_type: 'external',
				text: 'Test Text',
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.update(TERMS_OF_SERVICE_ID, 'enabled', 'Test Text')
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('createUserStatuses()', function() {
		it('should make POST request to create custom terms of service user status when called', function() {
			var expectedParam = { body: { tos: {tos_id: '1234', type: 'terms_of_service'}, is_accepted: true} };

			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_service_user_statuses', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.createUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID);
		});

		it('should call callback with the created terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			termsOfService.createUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to created terms of service user status object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.createUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('getUserStatuses()', function() {
		it('should make GET request to retrieve custom terms of service user status when called', function() {
			var response = {
				total_count: 2,
				entries: []
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_service_user_statuses')
				.returns(Promise.resolve(response));
			termsOfService.getUserStatuses(TERMS_OF_SERVICE_ID);
		});

		it('should call callback with requested terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				total_count: 2,
				entries: []
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			termsOfService.getUserStatuses(TERMS_OF_SERVICE_ID, null, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to requested terms of service user status object when a 200 response is returned', function() {
			var response = {
				total_count: 2,
				entries: []
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getUserStatuses(TERMS_OF_SERVICE_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('updateUserStatuses()', function() {
		var expectedParam = {body: {is_accepted: true}};
		it('should make PUT request to retrieve custom terms of service user status when called', function() {
			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_service_user_statuses/1234', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true);
		});

		it('should call callback with updated terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to updated terms of service user status object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service_user_status',
				id: '1234',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('setUserStatuses()', function() {
		var expectedParam = {body: {tos: {tos_id: '1234', type: 'terms_of_service'}, is_accepted: true}};
		it('should make POST request to create custom terms of service user status when called', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_service_user_statuses', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.setUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID);
		});

		it('should call callback with the created terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			termsOfService.setUserStatuses(TERMS_OF_SERVICE_ID, true, {user_id: '5678'}, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to created terms of service user status object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.setUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user status object is returned');
				});
		});

		it('should make PUT request to retrieve custom terms of service user status when called', function() {
			var response = {
				statusCode: 409,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_service_user_statuses/1234')
				.returns(Promise.resolve(response));
			termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true);
		});

		it('should call callback with updated terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 409,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to updated terms of service user status object when a 200 response is returned', function() {
			var response = {
				statusCode: 409,
				body: {
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {},
					user: {},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.updateUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});
});
