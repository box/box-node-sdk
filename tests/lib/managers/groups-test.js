/**
 * @fileoverview Groups Manager Tests
 * @author mwiller
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
	boxClientFake,
	Groups,
	groups,
	GROUP_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/groups';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Groups', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('../util/url-path');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
		Groups = require(MODULE_FILE_PATH);
		groups = new Groups(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {

		it('should make POST request to create a new group when called without optional parameters', function() {

			var name = 'Test group';

			var expectedParams = {
				body: {
					name
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/groups', expectedParams);
			groups.create(name, null);
		});

		it('should make POST request to create a new group when called with optional parameters', function() {

			var name = 'Test group',
				description = 'A group for testing';

			var options = {description};

			var expectedParams = {
				body: {
					name,
					description
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/groups', expectedParams);
			groups.create(name, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			groups.create('test');
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return groups.create('test')
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to fetch group when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/groups/${GROUP_ID}`, expectedParams);
			groups.get(GROUP_ID, null);
		});

		it('should make GET request to fetch group when called with optional parameters', function() {

			var options = {
				fields: 'name'
			};

			var expectedParams = {
				qs: {
					fields: 'name'
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/groups/${GROUP_ID}`, expectedParams);
			groups.get(GROUP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			groups.get(GROUP_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return groups.get(GROUP_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {

		var options,
			expectedParams;

		beforeEach(function() {

			options = {
				name: 'Test group 2',
				description: 'Another test group'
			};

			expectedParams = {
				body: options
			};
		});

		it('should make PUT request to update the group when called', function() {


			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/groups/${GROUP_ID}`, expectedParams);
			groups.update(GROUP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			groups.update(GROUP_ID, options);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return groups.update(GROUP_ID, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete the group when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/groups/${GROUP_ID}`);
			groups.delete(GROUP_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			groups.delete(GROUP_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return groups.delete(GROUP_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addUser()', function() {

		var USER_ID = '876345';

		it('should make POST request to create group membership when called without optional parameters', function() {

			var expectedParams = {
				body: {
					user: {
						id: USER_ID
					},
					group: {
						id: GROUP_ID
					}
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/group_memberships', expectedParams);
			groups.addUser(GROUP_ID, USER_ID);
		});

		it('should make POST request to create group membership when called with optional parameters', function() {

			var options = {
				role: 'admin'
			};

			var expectedParams = {
				body: {
					user: {
						id: USER_ID
					},
					group: {
						id: GROUP_ID
					},
					role: 'admin'
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/group_memberships', expectedParams);
			groups.addUser(GROUP_ID, USER_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			groups.addUser(GROUP_ID, USER_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return groups.addUser(GROUP_ID, USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		it('should make GET request to fetch membership when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/group_memberships/${MEMBERSHIP_ID}`, expectedParams);
			groups.getMembership(MEMBERSHIP_ID, null);
		});

		it('should make GET request to fetch membership when called with optional parameters', function() {

			var options = {
				fields: 'name'
			};

			var expectedParams = {
				qs: {
					fields: 'name'
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/group_memberships/${MEMBERSHIP_ID}`, expectedParams);
			groups.getMembership(MEMBERSHIP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			groups.getMembership(MEMBERSHIP_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return groups.getMembership(MEMBERSHIP_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('updateMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		var options,
			expectedParams;

		beforeEach(function() {

			options = {
				role: 'member'
			};

			expectedParams = {
				body: options
			};
		});

		it('should make PUT request to update the membership when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/group_memberships/${MEMBERSHIP_ID}`, expectedParams);
			groups.updateMembership(MEMBERSHIP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			groups.updateMembership(MEMBERSHIP_ID, options);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return groups.updateMembership(MEMBERSHIP_ID, options)
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		it('should make DELETE request to delete the membership when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/group_memberships/${MEMBERSHIP_ID}`);
			groups.removeMembership(MEMBERSHIP_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			groups.removeMembership(MEMBERSHIP_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return groups.removeMembership(MEMBERSHIP_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getMemberships()', function() {


		it('should make GET request to fetch memberships when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/groups/${GROUP_ID}/memberships`, expectedParams);
			groups.getMemberships(GROUP_ID, null);
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
				.withArgs(`/groups/${GROUP_ID}/memberships`, expectedParams);
			groups.getMemberships(GROUP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			groups.getMemberships(GROUP_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return groups.getMemberships(GROUP_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {


		it('should make GET request to fetch groups when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/groups', expectedParams);
			groups.getAll(null);
		});

		it('should make GET request to fetch groups when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/groups', expectedParams);
			groups.getAll(options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			groups.getAll();
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return groups.getAll()
				.then(data => assert.equal(data, response));
		});
	});

	describe('getCollaborations()', function() {


		it('should make GET request to fetch collaborations when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/groups/${GROUP_ID}/collaborations`, expectedParams);
			groups.getCollaborations(GROUP_ID, null);
		});

		it('should make GET request to fetch collaborations when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/groups/${GROUP_ID}/collaborations`, expectedParams);
			groups.getCollaborations(GROUP_ID, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			groups.getCollaborations(GROUP_ID, null);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return groups.getCollaborations(GROUP_ID, null)
				.then(data => assert.equal(data, response));
		});
	});

});
