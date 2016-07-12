/**
 * @fileoverview Collaborations Manager Tests
 * @author fschott
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
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
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
			collaborations.getPending(COLLABORATION_ID, pendingQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/collaborations', expectedParams).yieldsAsync();
			collaborations.getPending(COLLABORATION_ID, pendingQS, done);
		});
	});

	describe('update()', function() {
		it('should make PUT request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/collaborations/1234', testParamsWithBody);
			collaborations.update(COLLABORATION_ID, testBody);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
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
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/collaborations/1234', expectedParams).yieldsAsync();
			collaborations.respondToPending(COLLABORATION_ID, newStatus, done);
		});
	});

	describe('create()', function() {

		var folderID,
			newCollabItem,
			newCollabAccessibleBy,
			newCollabRole,
			expectedParams;

		beforeEach(function() {
			folderID = '2345';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: folderID
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
			collaborations.create(newCollabAccessibleBy, folderID, newCollabRole);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.create(newCollabAccessibleBy, folderID, newCollabRole, done);
		});
	});

	describe('createWithUserID()', function() {

		var folderID,
			userID,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			folderID = '2345';
			userID = 'SOME_USER_ID';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: folderID
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
			collaborations.createWithUserID(userID, folderID, newCollabRole);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserID(userID, folderID, newCollabRole, done);
		});
	});

	describe('createWithUserEmail()', function() {

		var folderID,
			userEmail,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			folderID = '2345';
			userEmail = 'SOME_USER@gmail.com';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: folderID
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
			collaborations.createWithUserEmail(userEmail, folderID, newCollabRole);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithUserEmail(userEmail, folderID, newCollabRole, done);
		});
	});

	describe('createWithGroupID()', function() {

		var folderID,
			groupID,
			newCollabItem,
			newCollabRole,
			expectedAccessibleBy,
			expectedParams;

		beforeEach(function() {
			folderID = '2345';
			groupID = 'SOME_GROUP_ID';
			newCollabRole = 'SOME_ROLE';
			newCollabItem = {
				type: 'folder',
				id: folderID
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
			collaborations.createWithGroupID(groupID, folderID, newCollabRole);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/collaborations').yieldsAsync();
			collaborations.createWithGroupID(groupID, folderID, newCollabRole, done);
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaborations/1234', null);
			collaborations.delete(COLLABORATION_ID);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/collaborations/1234', null).yieldsAsync();
			collaborations.delete(COLLABORATION_ID, done);
		});
	});

});
