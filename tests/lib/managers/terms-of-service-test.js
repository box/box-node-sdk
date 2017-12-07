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
	TERMS_OF_SERVICE_USER_STATUS_ID = '7777',
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
		var options = {};

		it('should make GET request to get terms of service info when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_services/1234')
				.returns(Promise.resolve(response));
			termsOfService.get(TERMS_OF_SERVICE_ID, null);
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

		it('should make GET request to get terms of service info when called with ID with optional param', function() {
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
			termsOfService.get(TERMS_OF_SERVICE_ID, options);
		});

		it('should call callback with the terms of service info response is returned with optional param', function(done) {
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
			termsOfService.get(TERMS_OF_SERVICE_ID, options, function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned with optional param', function() {
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
			return termsOfService.get(TERMS_OF_SERVICE_ID, options)
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});


	describe('getAll()', function() {
		var options = {tos_type: 'external'};
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

		it('should make GET request to get terms of service info when called with optional param', function() {
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
			termsOfService.getAll(options);
		});

		it('should call callback with the terms of service info when a 200 response is returned with optional param', function(done) {
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
			termsOfService.getAll(options, function(err, termsOfServiceObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				done();
			});
		});

		it('should return a promise resolving to a terms of service object when a 200 response is returned with optional param', function() {
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
			return termsOfService.getAll(options)
				.then(termsOfServiceObject => {
					assert.strictEqual(termsOfServiceObject, response, 'terms of service object is returned');
				});
		});
	});

	describe('create()', function() {
		it('should make POST request to create custom terms of service when called', function() {
			var expectedTermsOfServiceParam = { body: { status: 'enabled', text: 'Test Text', tos_type: 'managed'}};
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
		var options = { status: 'enabled', text: 'Test Text' };
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
			termsOfService.update(TERMS_OF_SERVICE_ID, options);
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
			termsOfService.update(TERMS_OF_SERVICE_ID, options, function(err, termsOfServiceObject) {
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

	describe('createUserStatus()', function() {
		var options = {user_id: '5678'};
		it('should make POST request to create custom terms of service user status when called', function() {
			var expectedParam = { body: { tos: {id: '1234', type: 'terms_of_service'}, user: {id: '5678', type: 'user'}, is_accepted: true} };

			var response = {
				total_count: 2,
				entries: [{
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {
						id: '1234',
						type: 'terms_of_service'
					},
					user: {
						id: '5678',
						type: 'user'
					},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}]
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_service_user_statuses', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.createUserStatus(TERMS_OF_SERVICE_ID, true, options);
		});

		it('should call callback with the created terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				total_count: 2,
				entries: [{
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {
						id: '1234',
						type: 'terms_of_service'
					},
					user: {
						id: '5678',
						type: 'user'
					},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}]
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			termsOfService.createUserStatus(TERMS_OF_SERVICE_ID, true, options, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to created terms of service user status object when a 200 response is returned', function() {
			var response = {
				total_count: 2,
				entries: [{
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {
						id: '1234',
						type: 'terms_of_service'
					},
					user: {
						id: '5678',
						type: 'user'
					},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}]
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.createUserStatus(TERMS_OF_SERVICE_ID, true, options)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('getUserStatus()', function() {
		var options = {userID: '5678'};

		it('should make GET request to retrieve custom terms of service user status when called', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_service_user_statuses')
				.returns(Promise.resolve(response));
			termsOfService.getUserStatus(TERMS_OF_SERVICE_ID);
		});

		it('should call callback with requested terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getUserStatus(TERMS_OF_SERVICE_ID, null, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body.entries[0], 'terms of service user object is returned');
				done();
			});
		});

		it('should call callback with error when a non 200 is received', function(done) {
			var response = {
				statusCode: 500,
				body: {}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getUserStatus(TERMS_OF_SERVICE_ID, null, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', 500);
				done();
			});
		});

		it('should return a promise resolving to requested terms of service user status object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getUserStatus(TERMS_OF_SERVICE_ID)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response.body.entries[0], 'terms of service user status object is returned');
				});
		});

		it('should return promise rejects with an error when a non 200 is received', function() {
			var response = {
				statusCode: 500,
				body: {}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getUserStatus(TERMS_OF_SERVICE_ID)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 500);
				});
		});

		it('should make GET request to retrieve custom terms of service user status when called with option param', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.mock(boxClientFake).expects('get').withArgs('/terms_of_service_user_statuses')
				.returns(Promise.resolve(response));
			termsOfService.getUserStatus(TERMS_OF_SERVICE_ID, options);
		});

		it('should call callback with requested terms of service user status info when a 200 response is returned with optional param', function(done) {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			termsOfService.getUserStatus(TERMS_OF_SERVICE_ID, options, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body.entries[0], 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to requested terms of service user status object when a 200 response is returned with optional param', function() {
			var response = {
				statusCode: 200,
				body: {
					total_count: 2,
					entries: [{
						type: 'terms_of_service_user_status',
						id: '1234',
						tos: {
							id: '1234',
							type: 'terms_of_service'
						},
						user: {},
						is_accepted: true,
						created_at: '2017-10-21T20:09:59-07:00',
						modified_at: '2017-10-21T20:09:59-07:00'
					}]
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return termsOfService.getUserStatus(TERMS_OF_SERVICE_ID, options)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response.body.entries[0], 'terms of service user status object is returned');
				});
		});
	});

	describe('updateUserStatus()', function() {
		var expectedParam = {body: {is_accepted: true}};
		it('should make PUT request to retrieve custom terms of service user status when called', function() {
			var response = {
				type: 'terms_of_service_user_status',
				id: '7777',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/terms_of_service_user_statuses/7777', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.updateUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true);
		});

		it('should call callback with updated terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				type: 'terms_of_service_user_status',
				id: '7777',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			termsOfService.updateUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to updated terms of service user status object when a 200 response is returned', function() {
			var response = {
				type: 'terms_of_service_user_status',
				id: '7777',
				tos: {},
				user: {},
				is_accepted: true,
				created_at: '2017-10-21T20:09:59-07:00',
				modified_at: '2017-10-21T20:09:59-07:00'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return termsOfService.updateUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response, 'terms of service user status object is returned');
				});
		});
	});

	describe('setUserStatus()', function() {
		var options = {user_id: TERMS_OF_SERVICE_USER_ID};
		it('should make POST request to create custom terms of service user status when called', function() {
			var expectedParam = { body: { tos: {id: '1234', type: 'terms_of_service'}, user: {id: '5678', type: 'user'}, is_accepted: true} };

			var response = {
				statusCode: 200,
				total_count: 2,
				entries: [{
					type: 'terms_of_service_user_status',
					id: '1234',
					tos: {
						id: '1234',
						type: 'terms_of_service'
					},
					user: {
						id: '5678',
						type: 'user'
					},
					is_accepted: true,
					created_at: '2017-10-21T20:09:59-07:00',
					modified_at: '2017-10-21T20:09:59-07:00'
				}]
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/terms_of_service_user_statuses', expectedParam)
				.returns(Promise.resolve(response));
			termsOfService.setUserStatus(TERMS_OF_SERVICE_ID, true, options);
		});

		it('should call callback with the created terms of service user status info when a 200 response is returned', function(done) {
			var response = {
				statusCode: 200,
				body: {}
			};

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			termsOfService.setUserStatus(TERMS_OF_SERVICE_ID, true, options, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user object is returned');
				done();
			});
		});

		it('should return a promise resolving to created terms of service user status object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {}
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return termsOfService.setUserStatus(TERMS_OF_SERVICE_ID, true, options)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, response.body, 'terms of service user status object is returned');
				});
		});

		it('should make PUT request to update custom terms of service user status when called', function() {
			var userStatus = {};

			var response = {
				statusCode: 409,
				body: {
					entries: [userStatus]
				}
			};

			sandbox.stub(boxClientFake, 'post')
				.returns(Promise.resolve(response));
			sandbox.mock(termsOfService).expects('getUserStatus').withArgs(TERMS_OF_SERVICE_ID, sinon.match(options))
				.returns(Promise.resolve({id: TERMS_OF_SERVICE_USER_STATUS_ID}));
			sandbox.mock(termsOfService).expects('updateUserStatus').withArgs(TERMS_OF_SERVICE_USER_STATUS_ID, true);
			return termsOfService.setUserStatus(TERMS_OF_SERVICE_ID, true, options);
		});

		it('should call callback with updated terms of service user status info when a 409 response is returned', function(done) {
			var userStatus = {};

			var response = {
				statusCode: 409,
				body: {
					entries: [userStatus]
				}
			};


			sandbox.stub(boxClientFake, 'post')
				.returns(Promise.resolve(response));
			sandbox.stub(termsOfService, 'getUserStatus')
				.returns(Promise.resolve({id: TERMS_OF_SERVICE_USER_STATUS_ID}));
			sandbox.stub(termsOfService, 'updateUserStatus')
				.returns(Promise.resolve(userStatus));
			termsOfService.setUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true, options, function(err, termsOfServiceUserStatusObject) {
				assert.ifError(err);
				assert.strictEqual(termsOfServiceUserStatusObject, userStatus, 'terms of service user object is returned');
				done();
			});
		});

		it('should call callback with error when a non 200 is received', function(done) {
			var userStatus = {};

			var response = {
				statusCode: 500,
				body: {
					entries: [userStatus]
				}
			};

			sandbox.stub(boxClientFake, 'post')
				.returns(Promise.resolve(response));
			termsOfService.setUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true, options, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', 500);
				done();
			});
		});

		it('should return a promise resolving to updated terms of service user status object when a 409 response is returned', function() {
			var userStatus = {};

			var response = {
				statusCode: 409,
				body: {
					entries: [userStatus]
				}
			};

			sandbox.stub(boxClientFake, 'post')
				.returns(Promise.resolve(response));
			sandbox.stub(termsOfService, 'getUserStatus')
				.returns(Promise.resolve({id: TERMS_OF_SERVICE_USER_STATUS_ID}));
			sandbox.stub(termsOfService, 'updateUserStatus')
				.returns(Promise.resolve(userStatus));
			return termsOfService.setUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true, options)
				.then(termsOfServiceUserStatusObject => {
					assert.strictEqual(termsOfServiceUserStatusObject, userStatus, 'terms of service user object is returned');
				});
		});

		it('should return a promise rejecting with an error when a non 200 is returned', function() {
			var userStatus = {};

			var response = {
				statusCode: 500,
				body: {
					entries: [userStatus]
				}
			};

			sandbox.stub(boxClientFake, 'post')
				.returns(Promise.resolve(response));
			return termsOfService.setUserStatus(TERMS_OF_SERVICE_USER_STATUS_ID, true, options)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 500);
				});
		});
	});
});


