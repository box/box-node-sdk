/**
 * @fileoverview User Manager Tests
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/users/${USER_ID}`, testParamsWithQs);
			users.get(USER_ID, testQS);
		});

		it('should make GET request to get info for current user when passed "me" ID', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/users/me', testParamsWithQs);
			users.get('me', testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			users.get(USER_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return users.get(USER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		it('should make PUT request to update user info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/users/${USER_ID}`, testParamsWithBody);
			users.update(USER_ID, testBody);
		});

		it('should make PUT request to update current user info when passed "me" ID', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/users/me', testParamsWithBody);
			users.update('me', testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			users.update(USER_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return users.update(USER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/users/${USER_ID}`, testParamsWithQs);
			users.delete(USER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			users.delete(USER_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return users.delete(USER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getEmailAliases()', function() {
		it('should make GET request to retrieve user email aliases when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/users/${USER_ID}/email_aliases`);
			users.getEmailAliases(USER_ID);
		});

		it('should make GET request to retrieve current user email aliases when passed "me" ID', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/users/me/email_aliases');
			users.getEmailAliases('me');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			users.getEmailAliases(USER_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return users.getEmailAliases(USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addEmailAlias()', function() {
		var email = 'horatio@nelson.com';

		it('should make POST request to add email alias to user when called', function() {
			var expectedBody = {
				email,
				is_confirmed: false
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/users/${USER_ID}/email_aliases`, {
					body: expectedBody
				});
			users.addEmailAlias(USER_ID, email);
		});

		it('should make POST request to add email alias to current user when passed "me" id', function() {

			var expectedBody = {
				email,
				is_confirmed: false
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/users/me/email_aliases', {
					body: expectedBody
				});
			users.addEmailAlias('me', email);
		});

		it('should make POST request with additional parameters when options are passed', function() {

			var expectedBody = {
				email,
				is_confirmed: true
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/users/${USER_ID}/email_aliases`, {
					body: expectedBody
				});
			users.addEmailAlias(USER_ID, email, {is_confirmed: true});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			users.addEmailAlias(USER_ID, email);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return users.addEmailAlias(USER_ID, email)
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeEmailAlias()', function() {
		var aliasID = '23455';

		it('should make DELETE call to remove email alias when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/users/${USER_ID}/email_aliases/${aliasID}`);
			users.removeEmailAlias(USER_ID, aliasID);
		});

		it('should make DELETE call to remove email alias from current user when passed "me" ID', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/users/me/email_aliases/${aliasID}`);
			users.removeEmailAlias('me', aliasID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			users.removeEmailAlias(USER_ID, aliasID);
		});

		it('should return promise resolving to results when called', function() {

			var id = '1234';
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return users.removeEmailAlias(id, aliasID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getGroupMemberships()', function() {

		it('should make GET request to fetch memberships when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/users/${USER_ID}/memberships`, expectedParams);
			users.getGroupMemberships(USER_ID, null);
		});

		it('should make GET request to fetch memberships when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/users/${USER_ID}/memberships`, expectedParams);
			users.getGroupMemberships(USER_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			users.getGroupMemberships(USER_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return users.getGroupMemberships(USER_ID)
				.then(data => assert.equal(data, response));
		});
	});
});
