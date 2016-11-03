/**
 * @fileoverview Enterprise Manager Tests
 * @author ptoth
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
	BASE_PATH = '/users',
	MODULE_FILE_PATH = '../../../lib/managers/enterprise';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Enterprise', function() {

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
		Enterprise = require(MODULE_FILE_PATH);
		enterprise = new Enterprise(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('createUser()', function() {
		var	login,
			name,
			role,
			expectedParams;

		beforeEach(function() {
			login = 'eddard@box.com';
			name = 'Ned Stark';
			role = enterprise.userRoles.USER;

			expectedParams = {
				body: {
					login: login,
					name: name
				}
			};
		});

		it('should make POST request with mandatory parameters to create an user without optional parameters', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			enterprise.createUser(login, name);
		});

		it('should make POST request with all parameters to create an user when called with optional parameter', function() {
			expectedParams.body.login = login;
			expectedParams.body.name = name;
			expectedParams.body.role = role;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(BASE_PATH, expectedParams);
			enterprise.createUser(login, name, {role: role});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs(BASE_PATH).yieldsAsync();
			enterprise.createUser(login, name, null, done);
		});

	});

});
