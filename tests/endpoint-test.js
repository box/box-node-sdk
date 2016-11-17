/**
 * @fileoverview Box SDK Node Endpoint Integration Tests
 */
'use strict';

/* eslint-disable no-sync */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	mockery = require('mockery'),
	sinon = require('sinon'),
	nock = require('nock'),
	fs = require('fs'),
	path = require('path');

function getFixture(fixture) {
	return fs.readFileSync(path.resolve(__dirname, 'fixtures/endpoints/' + fixture + '.json'));
}

describe('Endpoint', function() {

  // ------------------------------------------------------------------------------
	// Setup
	// ------------------------------------------------------------------------------
	var sandbox = sinon.sandbox.create();

	var TEST_API_ROOT = 'https://api.box.com',
		TEST_CLIENT_ID = 'client_id',
		TEST_CLIENT_SECRET = 'TOP SECRET',
		TEST_ACCESS_TOKEN = 'at',
		MODULE_FILE_PATH = '../lib/box-node-sdk';

	var apiMock,
		BoxSDK,
		sdk,
		basicClient;

	beforeEach(function() {
		apiMock = nock(TEST_API_ROOT);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		BoxSDK = require(MODULE_FILE_PATH);

		sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		basicClient = sdk.getBasicClient(TEST_ACCESS_TOKEN);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
		nock.cleanAll();
	});

	describe('Collaborations', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var collaborationID = '987654321',
					fixture = getFixture('collaborations/get_collaborations_id_200');

				apiMock.get('/2.0/collaborations/' + collaborationID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.get(collaborationID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

			it('should make correct request and pass error when API call fails', function(done) {

				var collaborationID = '987654321',
					fixture = getFixture('collaborations/get_collaborations_id_404');

				apiMock.get('/2.0/collaborations/' + collaborationID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(404, fixture);

				basicClient.collaborations.get(collaborationID, null, function(err) {

					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 404);
					assert.deepProperty(err, 'response.body');
					assert.deepEqual(err.response.body, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('getPending()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fixture = getFixture('collaborations/get_collaborations_pending_200');

				apiMock.get('/2.0/collaborations?status=pending')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.getPending(function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

		});

		describe('update()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var collaborationID = '1234567898',
					options = {role: basicClient.collaborationRoles.VIEWER_UPLOADER},
					fixture = getFixture('collaborations/get_collaborations_pending_200');

				apiMock.put('/2.0/collaborations/' + collaborationID, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.update(collaborationID, options, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

			it('should make correct request and pass error when API call fails', function(done) {

				var collaborationID = '123456789',
					options = {role: basicClient.collaborationRoles.VIEWER_UPLOADER},
					fixture = getFixture('collaborations/put_collaborations_id_404');

				apiMock.put('/2.0/collaborations/' + collaborationID, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(404, fixture);

				basicClient.collaborations.update(collaborationID, options, function(err) {

					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 404);
					assert.deepProperty(err, 'response.body');
					assert.deepEqual(err.response.body, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('respondToPending()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var collaborationID = '123456789',
					options = {status: 'rejected'},
					fixture = getFixture('collaborations/put_collaborations_id_pending_200');

				apiMock.put('/2.0/collaborations/' + collaborationID, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.respondToPending(collaborationID, 'rejected', function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

		});

		describe('create()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var folderID = '123456789',
					user = {
						type: 'user',
						id: '987654321'
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_user_200');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.create(user, folderID, basicClient.collaborationRoles.PREVIEWER, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

			it('should make correct request and pass error when API call fails', function(done) {

				var folderID = '123456789',
					user = {
						type: 'user',
						id: '987654321'
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_400');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(400, fixture);

				basicClient.collaborations.create(user, folderID, basicClient.collaborationRoles.PREVIEWER, function(err) {

					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 400);
					assert.deepProperty(err, 'response.body');
					assert.deepEqual(err.response.body, JSON.parse(fixture));

					done();
				});
			});

		});

		describe('createWithUserID()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var folderID = '123456789',
					userID = '987654321',
					user = {
						type: 'user',
						id: userID
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_user_200');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.createWithUserID(userID, folderID, basicClient.collaborationRoles.PREVIEWER, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

			it('should make correct request and pass error when API call fails', function(done) {

				var folderID = '123456789',
					userID = '987654321',
					user = {
						type: 'user',
						id: userID
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_400');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(400, fixture);

				basicClient.collaborations.createWithUserID(userID, folderID, basicClient.collaborationRoles.PREVIEWER, function(err) {

					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 400);
					assert.deepProperty(err, 'response.body');
					assert.deepEqual(err.response.body, JSON.parse(fixture));

					done();
				});
			});

		});

		describe('createWithUserEmail()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var folderID = '123456789',
					userEmail = 'newfriend@example.com',
					user = {
						type: 'user',
						login: userEmail
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_user_200');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.createWithUserEmail(userEmail, folderID, basicClient.collaborationRoles.PREVIEWER, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});

			it('should make correct request and pass error when API call fails', function(done) {

				var folderID = '123456789',
					userEmail = 'newfriend@example.com',
					user = {
						type: 'user',
						login: userEmail
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: user,
						role: basicClient.collaborationRoles.PREVIEWER
					},
					fixture = getFixture('collaborations/post_collaborations_400');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(400, fixture);

				basicClient.collaborations.createWithUserEmail(userEmail, folderID, basicClient.collaborationRoles.PREVIEWER, function(err) {

					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', 400);
					assert.deepProperty(err, 'response.body');
					assert.deepEqual(err.response.body, JSON.parse(fixture));

					done();
				});
			});

		});

		describe('createWithGroupID()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var folderID = '987654321',
					groupID = '123456789',
					group = {
						type: 'group',
						id: groupID
					},
					options = {
						item: {
							type: 'folder',
							id: folderID
						},
						accessible_by: group,
						role: basicClient.collaborationRoles.EDITOR
					},
					fixture = getFixture('collaborations/post_collaborations_group_200');

				apiMock.post('/2.0/collaborations', options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collaborations.createWithGroupID(groupID, folderID, basicClient.collaborationRoles.EDITOR, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('delete()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var collaborationID = '123456789';

				apiMock.delete('/2.0/collaborations/' + collaborationID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				basicClient.collaborations.delete(collaborationID, function(err, data) {

					assert.isNull(err);
					assert.isUndefined(data);

					done();
				});
			});
		});

	});
});
