/**
 * @fileoverview Collaborations Manager Tests
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaborations/1234', testParamsWithQs).returns(Promise.resolve());
			collaborations.get(COLLABORATION_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborations.get(COLLABORATION_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborations.get(COLLABORATION_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborations.get(COLLABORATION_ID, testQS)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaborations', expectedParams);
			collaborations.getPending();
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborations.getPending();
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborations.getPending(function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborations.getPending()
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		it('should make PUT request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/collaborations/1234', testParamsWithBody);
			collaborations.update(COLLABORATION_ID, testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			collaborations.update(COLLABORATION_ID, testBody);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			collaborations.update(COLLABORATION_ID, testBody, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return collaborations.update(COLLABORATION_ID, testBody)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/collaborations/1234', expectedParams);
			collaborations.respondToPending(COLLABORATION_ID, newStatus);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			collaborations.respondToPending(COLLABORATION_ID, newStatus);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			collaborations.respondToPending(COLLABORATION_ID, newStatus, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return collaborations.respondToPending(COLLABORATION_ID, newStatus)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, {type: 'file'});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, {type: 'file'}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should pass results to callback when callback is present and options is omitted', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.create(newCollabAccessibleBy, itemID, newCollabRole, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborations.create(newCollabAccessibleBy, itemID, newCollabRole)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserID(userID, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserID(userID, itemID, newCollabRole, {type: 'file'});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborations.createWithUserID(userID, itemID, newCollabRole);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithUserID(userID, itemID, newCollabRole, {type: 'file'}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should pass results to callback when callback is present and options is omitted', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithUserID(userID, itemID, newCollabRole, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborations.createWithUserID(userID, itemID, newCollabRole)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, {type: 'file'});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, {type: 'file'}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should pass results to callback when callback is present and options is omitted', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithUserEmail(userEmail, itemID, newCollabRole, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborations.createWithUserEmail(userEmail, itemID, newCollabRole)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole);
		});

		it('should create collaboration on file when passed the correct type option', function() {

			expectedParams.body.item.type = 'file';

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaborations', expectedParams);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, {type: 'file'});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, {type: 'file'}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should pass results to callback when callback is present and options is omitted', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborations.createWithGroupID(groupID, itemID, newCollabRole, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborations.createWithGroupID(groupID, itemID, newCollabRole)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to update collaboration info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaborations/1234', null);
			collaborations.delete(COLLABORATION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			collaborations.delete(COLLABORATION_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborations.delete(COLLABORATION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborations.delete(COLLABORATION_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
