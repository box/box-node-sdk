/**
 * @fileoverview Enterprise Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	assert = require('chai').assert,
	Promise = require('bluebird'),
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Enterprise,
	enterprise,
	ENTERPRISE_ID = '3457457',
	MODULE_FILE_PATH = '../../../lib/managers/enterprise';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Enterprise', function() {

	beforeEach(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true
		});
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
		// Setup File Under Test
		Enterprise = require(MODULE_FILE_PATH);
		enterprise = new Enterprise(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getUsers()', function() {

		it('should make GET request to get enterprise users using offset-based pagination when called', function() {

			var qs = {
				limit: 150,
				offset: 150,
				filter_term: 'Brad'
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/users', {qs});
			enterprise.getUsers(qs);
		});

		it('should make GET request to get enterprise users using marker-based pagination when called', function() {

			var qs = {
				limit: 150,
				usemarker: true,
				marker: 'FJURNVYShfyefnFHF12',
				filter_term: 'Brad'
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/users', {qs});
			enterprise.getUsers(qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			enterprise.getUsers();
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			enterprise.getUsers(null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return enterprise.getUsers()
				.then(data => assert.equal(data, response));
		});
	});

	describe('inviteUser()', function() {

		var TEST_LOGIN = 'jsmith@box.com';

		it('should make POST request to add enterprise user when called', function() {

			var expectedParams = {
				body: {
					enterprise: {id: ENTERPRISE_ID},
					actionable_by: {login: TEST_LOGIN}
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/invites', expectedParams);
			enterprise.inviteUser(ENTERPRISE_ID, TEST_LOGIN);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			enterprise.inviteUser(ENTERPRISE_ID, TEST_LOGIN);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			enterprise.inviteUser(ENTERPRISE_ID, TEST_LOGIN, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return enterprise.inviteUser(ENTERPRISE_ID, TEST_LOGIN)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addUser()', function() {
		var	LOGIN = 'eddard@box.com',
			NAME = 'Ned Stark',
			ROLE = 'user',
			expectedParams;

		beforeEach(function() {

			expectedParams = {
				body: {
					login: LOGIN,
					name: NAME
				}
			};
		});

		it('should make POST request with mandatory parameters to create an user without optional parameters', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/users', expectedParams);
			enterprise.addUser(LOGIN, NAME);
		});

		it('should make POST request with all parameters to create an user when called with optional parameter', function() {
			expectedParams.body.role = ROLE;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/users', expectedParams);
			enterprise.addUser(LOGIN, NAME, {role: ROLE});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			enterprise.addUser(LOGIN, NAME, {role: ROLE});
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			enterprise.addUser(LOGIN, NAME, {role: ROLE}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return enterprise.addUser(LOGIN, NAME, {role: ROLE})
				.then(data => assert.equal(data, response));
		});
	});

	describe('addAppUser()', function() {
		var	NAME = 'Daenerys Targaryen',
			JOB_TITLE = 'Breaker of Chains',
			expectedParams;

		beforeEach(function() {

			expectedParams = {
				body: {
					name: NAME,
					is_platform_access_only: true
				}
			};
		});

		it('should make POST request with mandatory parameters to create an app user without optional parameters', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/users', expectedParams);
			enterprise.addAppUser(NAME);
		});

		it('should make POST request with all parameters to create an user when called with optional parameter', function() {
			expectedParams.body.job_title = JOB_TITLE;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/users', expectedParams);
			enterprise.addAppUser(NAME, {job_title: JOB_TITLE});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			enterprise.addAppUser(NAME, {job_title: JOB_TITLE});
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			enterprise.addAppUser(NAME, {job_title: JOB_TITLE}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return enterprise.addAppUser(NAME, {job_title: JOB_TITLE})
				.then(data => assert.equal(data, response));
		});
	});

	describe('transferUserContent()', function() {

		var SRC_USER_ID = '12345',
			DEST_USER_ID = '54321';

		it('should make PUT request to transfer content when called', function() {

			var expectedParams = {
				body: {
					owned_by: {id: DEST_USER_ID}
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/users/${SRC_USER_ID}/folders/0`, expectedParams);
			enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
