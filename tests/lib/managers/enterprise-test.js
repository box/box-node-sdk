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
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Enterprise,
	enterprise,
	ENTERPRISE_ID = '3457457',
	MODULE_FILE_PATH = '../../../lib/managers/enterprise';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('WebLinks', function() {

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

		it('should make GET request to get enterprise users when called', function() {

			var qs = {
				limit: 150,
				offset: 150,
				filter_term: 'Brad'
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users', {qs});
			enterprise.getUsers(qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/users').yieldsAsync();
			enterprise.getUsers(null, done);
		});
	});

	describe('inviteUser()', function() {

		it('should make GET request to get enterprise users when called', function() {

			var login = 'jsmith@box.com';

			var expectedParams = {
				body: {
					enterprise: {id: ENTERPRISE_ID},
					actionable_by: {login}
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/invites', expectedParams);
			enterprise.inviteUser(ENTERPRISE_ID, login);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/invites').yieldsAsync();
			enterprise.inviteUser(ENTERPRISE_ID, 'hi@example.com', done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users', expectedParams);
			enterprise.addUser(LOGIN, NAME);
		});

		it('should make POST request with all parameters to create an user when called with optional parameter', function() {
			expectedParams.body.role = ROLE;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users', expectedParams);
			enterprise.addUser(LOGIN, NAME, {role: ROLE});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/users').yieldsAsync();
			enterprise.addUser(LOGIN, NAME, null, done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users', expectedParams);
			enterprise.addAppUser(NAME);
		});

		it('should make POST request with all parameters to create an user when called with optional parameter', function() {
			expectedParams.body.job_title = JOB_TITLE;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users', expectedParams);
			enterprise.addAppUser(NAME, {job_title: JOB_TITLE});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/users').yieldsAsync();
			enterprise.addAppUser(NAME, null, done);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/users/' + SRC_USER_ID + '/folders/0', expectedParams);
			enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/users/' + SRC_USER_ID + '/folders/0').yieldsAsync();
			enterprise.transferUserContent(SRC_USER_ID, DEST_USER_ID, done);
		});
	});

});
