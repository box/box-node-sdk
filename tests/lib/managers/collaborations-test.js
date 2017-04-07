/**
 * @fileoverview Collaborations Manager Tests
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
	Collaborations,
	collaborations,
	testQS = { testQSKey: 'testQSValue' },
	testBody = { my: 'body' },
	testParamsWithBody,
	testParamsWithQs,
	COLLABORATION_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/collaborations';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Collaborations', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		testParamsWithBody = {body: testBody};
		testParamsWithQs = {qs: testQS};
		// Setup File Under Test
		Collaborations = require(MODULE_FILE_PATH);
		collaborations = new Collaborations(boxClientFake);
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
		it('should make GET request to get collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaborations/1234', testParamsWithQs);
			collaborations.get(COLLABORATION_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/collaborations/1234', testParamsWithQs).yieldsAsync();
			collaborations.get(COLLABORATION_ID, testQS, done);
		});
	});

	describe('getPending()', function() {
		var pendingQS,
			expectedParams;

		beforeEach(function() {
			pendingQS = {status: 'pending'};
			expectedParams = {qs: pendingQS};
		});

		it('should make GET request to get all pending collaborations when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaborations', expectedParams);
			collaborations.getPending();
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/collaborations', expectedParams).yieldsAsync();
			collaborations.getPending(done);
		});
	});

	describe('update()', function() {
		it('should make PUT request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/collaborations/1234', testParamsWithBody);
			collaborations.update(COLLABORATION_ID, testBody);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/collaborations/1234', testParamsWithBody).yieldsAsync();
			collaborations.update(COLLABORATION_ID, testBody, done);
		});
	});

	describe('respondToPending()', function() {
		var newStatus,
			expectedParams;

		beforeEach(function() {
			newStatus = 'accepted';
			expectedParams = {
				body: {
					status: newStatus
				}
			};
		});

		it('should make PUT request to update collaboration status when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/collaborations/1234', expectedParams);
			collaborations.respondToPending(COLLABORATION_ID, newStatus);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/collaborations/1234', expectedParams).yieldsAsync();
			collaborations.respondToPending(COLLABORATION_ID, newStatus, done);
		});
	});

	describe('create()', function() {

		var itemID,
			newCollabItem,
			newCollabAccessibleBy,
			newCollabRole,
			expectedParams;

		beforeEach(function() {
			itemID = '2345';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: itemID
			};
			newCollabAccessibleBy = {
				type: 'user',
				id: 'SOME_USER_ID'
			};
			expectedParams = {
				body: {
					item: newCollabItem,
					accessible_by: newCollabAccessibleBy,
					role: newCollabRole
				}
			};
		});

		it('should make POST request to create a new collaboration when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, {type: 'file'});
		});

		it('should create collaboration on file when passed the correct type option with additional parameters', function() {

			expectedParams.body.item.type = 'file';
			expectedParams.body.can_view_path = true;

			expectedParams.qs = {
				notify: true
			};

			var params = {
				type: 'file',
				notify: true,
				can_view_path: true
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, params);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, {}, done);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when options is omitted', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, done);
		});
	});

	describe('createWithUserID()', function() {

		var itemID,
			userID,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			itemID = '2345';
			userID = 'SOME_USER_ID';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: itemID
			};
			expectedAccessibleBy = {
				type: 'user',
				id: userID
			};
			expectedParams = {
				body: {
					item: newCollabItem,
					accessible_by: expectedAccessibleBy,
					role: newCollabRole
				}
			};
		});

		it('should make POST request to create a new collaboration with the proper accessible_by property when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserID(userID, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserID(userID, itemID, newCollabRole, {type: 'file'});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserID(userID, itemID, newCollabRole, {}, done);
		});

		it('should create collaboration on file when passed the correct type option with additional parameters', function() {

			expectedParams.body.item.type = 'file';
			expectedParams.body.can_view_path = true;

			expectedParams.qs = {
				notify: true
			};

			var params = {
				type: 'file',
				notify: true,
				can_view_path: true
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserID(userID, itemID, newCollabRole, params);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when options is omitted', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserID(userID, itemID, newCollabRole, done);
		});
	});

	describe('createWithUserEmail()', function() {

		var itemID,
			userEmail,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			itemID = '2345';
			userEmail = 'SOME_USER@gmail.com';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: itemID
			};
			expectedAccessibleBy = {
				type: 'user',
				login: userEmail
			};
			expectedParams = {
				body: {
					item: newCollabItem,
					accessible_by: expectedAccessibleBy,
					role: newCollabRole
				}
			};
		});

		it('should make POST request to create a new collaboration with the proper accessible_by property when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, {type: 'file'});
		});

		it('should create collaboration on file when passed the correct type option with additional parameters', function() {

			expectedParams.body.item.type = 'file';
			expectedParams.body.can_view_path = true;

			expectedParams.qs = {
				notify: true
			};

			var params = {
				type: 'file',
				notify: true,
				can_view_path: true
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, params);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, {}, done);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when options is omitted', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, done);
		});
	});

	describe('createWithGroupID()', function() {

		var itemID,
			groupID,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			itemID = '2345';
			groupID = 'SOME_GROUP_ID';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: itemID
			};
			expectedAccessibleBy = {
				type: 'group',
				id: groupID
			};
			expectedParams = {
				body: {
					item: newCollabItem,
					accessible_by: expectedAccessibleBy,
					role: newCollabRole
				}
			};
		});

		it('should make POST request to create a new collaboration with the proper accessible_by property when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, {type: 'file'});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, {}, done);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when options is omitted', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, done);
		});

		it('should create collaboration on file when passed the correct type option with additional parameters', function() {

			expectedParams.body.item.type = 'file';
			expectedParams.body.can_view_path = true;

			expectedParams.qs = {
				notify: true
			};

			var params = {
				type: 'file',
				notify: true,
				can_view_path: true
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, params);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, {}, done);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when options is omitted', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, done);
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaborations/1234', null);
			collaborations.delete(COLLABORATION_ID);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/collaborations/1234', null).yieldsAsync();
			collaborations.delete(COLLABORATION_ID, done);
		});
	});

});
