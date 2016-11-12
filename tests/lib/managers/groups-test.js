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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/groups', expectedParams);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/groups', expectedParams);
			groups.create(name, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/groups').yieldsAsync();
			groups.create('Test group', null, done);
		});
	});

	describe('get()', function() {

		it('should make GET request to fetch group when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID, expectedParams);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID, expectedParams);
			groups.get(GROUP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/groups/' + GROUP_ID).yieldsAsync();
			groups.get(GROUP_ID, null, done);
		});
	});

	describe('update()', function() {

		it('should make PUT request to update the group when called', function() {

			var options = {
				name: 'Test group 2',
				description: 'Another test group'
			};

			var expectedParams = {
				body: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/groups/' + GROUP_ID, expectedParams);
			groups.update(GROUP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var options = {
				name: 'Test group 2',
				description: 'Another test group'
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/groups/' + GROUP_ID).yieldsAsync();
			groups.update(GROUP_ID, options, done);
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete the group when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/groups/' + GROUP_ID, null);
			groups.delete(GROUP_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/groups/' + GROUP_ID).yieldsAsync();
			groups.delete(GROUP_ID, done);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/group_memberships', expectedParams);
			groups.addUser(GROUP_ID, USER_ID, null);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/group_memberships', expectedParams);
			groups.addUser(GROUP_ID, USER_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/group_memberships').yieldsAsync();
			groups.addUser(GROUP_ID, USER_ID, null, done);
		});
	});

	describe('getMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		it('should make GET request to fetch membership when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/group_memberships/' + MEMBERSHIP_ID, expectedParams);
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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/group_memberships/' + MEMBERSHIP_ID, expectedParams);
			groups.getMembership(MEMBERSHIP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/group_memberships/' + MEMBERSHIP_ID).yieldsAsync();
			groups.getMembership(MEMBERSHIP_ID, null, done);
		});
	});

	describe('updateMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		it('should make PUT request to update the membership when called', function() {

			var options = {
				role: 'member'
			};

			var expectedParams = {
				body: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/group_memberships/' + MEMBERSHIP_ID, expectedParams);
			groups.updateMembership(MEMBERSHIP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var options = {
				role: 'member'
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/group_memberships/' + MEMBERSHIP_ID).yieldsAsync();
			groups.updateMembership(MEMBERSHIP_ID, options, done);
		});
	});

	describe('removeMembership()', function() {

		var MEMBERSHIP_ID = '639457';

		it('should make DELETE request to delete the membership when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/group_memberships/' + MEMBERSHIP_ID);
			groups.removeMembership(MEMBERSHIP_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/group_memberships/' + MEMBERSHIP_ID).yieldsAsync();
			groups.removeMembership(MEMBERSHIP_ID, done);
		});
	});

	describe('getMemberships()', function() {


		it('should make GET request to fetch memberships when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID + '/memberships', expectedParams);
			groups.getMemberships(GROUP_ID, null);
		});

		it('should make GET request to fetch memberships when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID + '/memberships', expectedParams);
			groups.getMemberships(GROUP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/groups/' + GROUP_ID + '/memberships').yieldsAsync();
			groups.getMemberships(GROUP_ID, null, done);
		});
	});

	describe('getAll()', function() {


		it('should make GET request to fetch groups when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups', expectedParams);
			groups.getAll(null);
		});

		it('should make GET request to fetch groups when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups', expectedParams);
			groups.getAll(options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/groups').yieldsAsync();
			groups.getAll(null, done);
		});
	});

	describe('getCollaborations()', function() {


		it('should make GET request to fetch collaborations when called without optional parameters', function() {

			var expectedParams = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID + '/collaborations', expectedParams);
			groups.getCollaborations(GROUP_ID, null);
		});

		it('should make GET request to fetch collaborations when called with optional parameters', function() {

			var options = {
				limit: 1000
			};

			var expectedParams = {
				qs: options
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/groups/' + GROUP_ID + '/collaborations', expectedParams);
			groups.getCollaborations(GROUP_ID, options);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/groups/' + GROUP_ID + '/collaborations').yieldsAsync();
			groups.getCollaborations(GROUP_ID, null, done);
		});
	});

});
