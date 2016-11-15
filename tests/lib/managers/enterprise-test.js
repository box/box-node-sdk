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

});
