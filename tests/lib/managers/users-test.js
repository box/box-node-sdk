/**
 * @fileoverview User Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Users,
	users,
	testQS = { testQSKey: 'testQSValue' },
	testBody = { my: 'body' },
	testParamsWithBody,
	testParamsWithQs,
	USER_ID = '876345',
	MODULE_FILE_PATH = '../../../lib/managers/users';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Users', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		testParamsWithBody = {body: testBody};
		testParamsWithQs = {qs: testQS};

		// Setup File Under Test
		Users = require(MODULE_FILE_PATH);
		users = new Users(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {
		it('should make GET request to get user info when called', function() {
			var id = '1234';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/1234', testParamsWithQs);
			users.get(id, testQS);
		});

		it('should make GET request to get info for current user when passed "me" ID', function() {
			var id = 'me';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/me', testParamsWithQs);
			users.get(id, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').yieldsAsync();
			users.get();
		});
	});

	describe('update()', function() {
		it('should make PUT request to update user info when called', function() {
			var id = '908546';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/users/908546', testParamsWithBody);
			users.update(id, testBody);
		});

		it('should make PUT request to update current user info when passed "me" ID', function() {
			var id = 'me';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/users/me', testParamsWithBody);
			users.update(id, testBody);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'put').yieldsAsync();
			users.update();
		});
	});

	describe('delete', function() {
		var notify,
			force,
			expectedParams;

		beforeEach(function() {
			notify = false;
			force = false;
			expectedParams = {
				body: {
				}
			};
		});

		it('should make DELETE request with all parameters to delete user when all optional parameters are passed', function() {
			expectedParams.body.notify = notify;
			expectedParams.body.force = force;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/users/' + USER_ID, expectedParams);
			users.delete(USER_ID, notify, force);
		});

		it('should make DELETE request with notify to delete user when just a notify is passed', function() {
			expectedParams.body.notify = notify;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/users/' + USER_ID, expectedParams);
			users.delete(USER_ID, notify);
		});

		it('should make DELETE request with force to delete user when just a force is passed', function() {
			expectedParams.body.force = force;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/users/' + USER_ID, expectedParams);
			users.delete(USER_ID, null, force);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/users/' + USER_ID).yieldsAsync();
			users.delete(USER_ID, notify, force, done);
		});
	});

	describe('getEmailAliases()', function() {
		it('should make GET request to retrieve user email aliases when called', function() {
			var id = '6493';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/6493/email_aliases');
			users.getEmailAliases(id);
		});

		it('should make GET request to retrieve current user email aliases when passed "me" ID', function() {
			var id = 'me';
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/me/email_aliases');
			users.getEmailAliases(id);
		});

		it('should wrap callback in default response handler when called', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').yieldsAsync();
			users.getEmailAliases();
		});
	});

	describe('addEmailAlias()', function() {
		it('should make POST request to add email alias to user when called', function() {
			var email = 'horation@nelson.com',
				id = '4567',
				expectedBody = {
					email: email,
					is_confirmed: false
				};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users/4567/email_aliases', {
				body: expectedBody
			});
			users.addEmailAlias(id, email);
		});

		it('should make POST request to add email alias to current user when passed "me" id', function() {
			var email = 'horatio@nelson.com',
				id = 'me',
				expectedBody = {
					email: email,
					is_confirmed: false
				};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/users/me/email_aliases', {
				body: expectedBody
			});
			users.addEmailAlias(id, email);
		});

		it('should wrap callback in default response handler when called', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').yieldsAsync();
			users.addEmailAlias();
		});
	});

	describe('removeEmailAlias()', function() {
		it('should make DELETE call to remove email alias when called', function() {
			var userID = '7890',
				aliasID = '23455';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/users/7890/email_aliases/23455');
			users.removeEmailAlias(userID, aliasID);
		});

		it('should make DELETE call to remove email alias from current user when passed "me" ID', function() {
			var userID = 'me',
				aliasID = '23455';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/users/me/email_aliases/23455');
			users.removeEmailAlias(userID, aliasID);
		});

		it('should wrap callback without default response handler when called', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'del').yieldsAsync();
			users.removeEmailAlias();
		});
	});

	describe('getGroupMemberships()', function() {

		it('should make GET request to fetch memberships when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/' + USER_ID + '/memberships', expectedParams);
			users.getGroupMemberships(USER_ID, null);
		});

		it('should make GET request to fetch memberships when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/users/' + USER_ID + '/memberships', expectedParams);
			users.getGroupMemberships(USER_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/users/' + USER_ID + '/memberships').yieldsAsync();
			users.getGroupMemberships(USER_ID, null, done);
		});
	});
});
