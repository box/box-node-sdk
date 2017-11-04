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

	describe('getTermsOfServicesByID()', function() {
		it('should make GET request to get terms of service info when called with ID', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_services/1234')
				.returns(Promise.resolve(response));
			termsOfService.getTermsOfServicesByID(TERMS_OF_SERVICE_ID);
		});

		it('should call callback with the terms of service info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getTermsOfServicesByID(TERMS_OF_SERVICE_ID, function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response.body, 'terms of service object is returned');
			});
			done();
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getTermsOfServicesByID(TERMS_OF_SERVICE_ID)
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});


	describe('getTermsOfServices()', function() {
		it('should make GET request to get terms of service info when called', function() {
			var response = {
				statusCode: 200,
				body: {
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
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_services')
				.returns(Promise.resolve(response));
			termsOfService.getTermsOfServices();
		});

		it('should call callback with the terms of service info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getTermsOfServices(function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response.body, 'terms of service object is returned');
			});
			done();
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getTermsOfServices()
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('createTermsOfServices()', function() {
		it('should make POST request to create custom terms of service when called', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'managed',
					text: 'This is a test',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_services')
				.returns(Promise.resolve(response));
			termsOfService.createTermsOfServices('managed', 'enabled', 'This is a test');
		});

		it('should call callback with the created terms of service info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			termsOfService.createTermsOfServices('managed', 'enabled', 'This is a test', function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response.body, 'terms of service object is returned');
			});
			done();
		});

		it('should return a promise resolving to created terms of service object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.createTermsOfServices('managed', 'enabled', 'This is a test')
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('updateTermsOfServices()', function() {
		it('should make PUT request to update custom terms of service info when called', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'managed',
					text: 'This is a test',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_services/1234')
				.returns(Promise.resolve(response));
			termsOfService.updateTermsOfServices(TERMS_OF_SERVICE_ID, 'enabled', 'This is a test');
		});

		it('should call callback with the updated terms of service info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			termsOfService.updateTermsOfServices(TERMS_OF_SERVICE_ID, 'enabled', 'This is a test', function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response.body, 'terms of service object is returned');
			});
			done();
		});

		it('should return a promise resolving to updated terms of service object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					type: 'terms_of_service',
					id: '1234',
					status: 'enabled',
					enterprise: {},
					tos_type: 'external',
					text: 'TEST',
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.updateTermsOfServices(TERMS_OF_SERVICE_ID, 'enabled', 'This is a test')
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('createTermsOfServiceUserStatuses()', function() {
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
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_service_user_statuses')
				.returns(Promise.resolve(response));
			termsOfService.createTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID);
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
			termsOfService.createTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user object is returned');
			});
			done();
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
			return termsOfService.createTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID, true, TERMS_OF_SERVICE_USER_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('getTermsOfServiceUserStatuses()', function() {
		it('should make GET request to retrieve custom terms of service user status when called', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_service_user_statuses')
				.returns(Promise.resolve(response));
			termsOfService.getTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID);
		});

		it('should call callback with requested terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user object is returned');
			});
			done();
		});

		it('should return a promise resolving to requested terms of service user status object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getTermsOfServiceUserStatuses(TERMS_OF_SERVICE_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('updateTermsOfServiceUserStatuses()', function() {
		it('should make PUT request to retrieve custom terms of service user status when called', function() {
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_service_user_statuses/1234')
				.returns(Promise.resolve(response));
			termsOfService.updateTermsOfServiceUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true);
		});

		it('should call callback with updated terms of service user status info when a 200 response is returned', function(done) {
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
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			termsOfService.updateTermsOfServiceUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user object is returned');
			});
			done();
		});

		it('should return a promise resolving to updated terms of service user status object when a 200 response is returned', function() {
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
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.updateTermsOfServiceUserStatuses(TERMS_OF_SERVICE_USER_STATUS_ID, true)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});
});
