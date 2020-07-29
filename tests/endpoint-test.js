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
	url = require('url'),
	crypto = require('crypto'),
	path = require('path'),
	Promise = require('bluebird'),
	Stream = require('stream');

function getFixture(fixture) {
	return fs.readFileSync(path.resolve(__dirname, `fixtures/endpoints/${fixture}.json`));
}

describe('Endpoint', function() {

	// ------------------------------------------------------------------------------
	// Setup
	// ------------------------------------------------------------------------------
	var sandbox = sinon.createSandbox();

	var TEST_API_ROOT = 'https://api.box.com',
		TEST_UPLOAD_ROOT = 'https://upload.box.com/api',
		TEST_CLIENT_ID = 'client_id',
		TEST_CLIENT_SECRET = 'TOP SECRET',
		TEST_ACCESS_TOKEN = 'at',
		MODULE_FILE_PATH = '../lib/box-node-sdk';

	var apiMock,
		uploadMock,
		BoxSDK,
		sdk,
		iteratorSDK,
		basicClient,
		iteratorClient;

	beforeEach(function() {
		nock.disableNetConnect();
		apiMock = nock(TEST_API_ROOT);
		uploadMock = nock(TEST_UPLOAD_ROOT);

		apiMock.defaultReplyHeaders({
			Age: 0,
			'Cache-Control': 'no-cache, no-store',
			Connection: 'keep-alive',
			Date: 'Thu, 17 Nov 2016 06:54:58 GMT',
			Server: 'ATS',
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
		});

		uploadMock.defaultReplyHeaders({
			Age: 0,
			'Cache-Control': 'no-cache, no-store',
			Connection: 'keep-alive',
			Date: 'Thu, 17 Nov 2016 06:54:58 GMT',
			Server: 'ATS',
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
		});

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		BoxSDK = require(MODULE_FILE_PATH);

		sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			maxNumRetries: 0,
			retryIntervalMS: 1
		});

		iteratorSDK = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			maxNumRetries: 0,
			retryIntervalMS: 1,
			iterators: true
		});

		basicClient = sdk.getBasicClient(TEST_ACCESS_TOKEN);
		iteratorClient = iteratorSDK.getBasicClient(TEST_ACCESS_TOKEN);
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

				apiMock.get(`/2.0/collaborations/${collaborationID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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

				apiMock.get(`/2.0/collaborations/${collaborationID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
					assert.nestedProperty(err, 'response.body');
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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

				apiMock.put(`/2.0/collaborations/${collaborationID}`, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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

				apiMock.put(`/2.0/collaborations/${collaborationID}`, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
					assert.nestedProperty(err, 'response.body');
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

				apiMock.put(`/2.0/collaborations/${collaborationID}`, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
					assert.nestedProperty(err, 'response.body');
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
					assert.nestedProperty(err, 'response.body');
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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
					assert.nestedProperty(err, 'response.body');
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
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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

				apiMock.delete(`/2.0/collaborations/${collaborationID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
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

	describe('Collections', function() {

		describe('getAll()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fixture = getFixture('collections/get_collections_200');

				apiMock.get('/2.0/collections')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collections.getAll(function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('getItems()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var collectionID = '123456789',
					fixture = getFixture('collections/get_collections_id_items_200');

				apiMock.get(`/2.0/collections/${collectionID}/items`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.collections.getItems(collectionID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

	});

	describe('Comments', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var commentID = '123456789',
					fixture = getFixture('comments/get_comments_id_200');

				apiMock.get(`/2.0/comments/${commentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.get(commentID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('create()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '987654321',
					message = 'Looks good!',
					fixture = getFixture('comments/post_comments_200');

				apiMock.post('/2.0/comments')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.create(fileID, message, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('createTaggedComment()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '987654321',
					message = '@[1357908642:Other User] Looks good!',
					fixture = getFixture('comments/post_comments_tagged_200');

				apiMock.post('/2.0/comments')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.createTaggedComment(fileID, message, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('reply()', () => {

			it('should make correct request (reply to comment) and correctly parse response when API call is successful', done => {
				var commentID = '195533222',
					message = "I'm a regular reply to a comment!",
					fixture = getFixture('comments/post_comments_reply_200');

				apiMock.post('/2.0/comments')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.reply(commentID, message, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('createTaggedReply()', () => {

			it('should make correct request (tagged reply to comment) and correctly parse response when API call is successful', done => {
				var commentID = '195533222',
					message = "I'm a tagged reply to a comment!",
					fixture = getFixture('comments/post_comments_tagged_reply_200');

				apiMock.post('/2.0/comments')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.createTaggedReply(commentID, message, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('update()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var commentID = '123456789',
					options = {message: 'Looks great!'},
					fixture = getFixture('comments/put_comments_id_200');

				apiMock.put(`/2.0/comments/${commentID}`, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.comments.update(commentID, options, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('delete()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var commentID = '123456789';

				apiMock.delete(`/2.0/comments/${commentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				basicClient.comments.delete(commentID, function(err, data) {

					assert.isNull(err);
					assert.isUndefined(data);

					done();
				});
			});
		});

	});

	describe('DevicePins', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var devicePinID = '123456789',
					fixture = getFixture('device-pins/get_device_pinners_id_200');

				apiMock.get(`/2.0/device_pinners/${devicePinID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.devicePins.get(devicePinID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('delete()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var devicePinID = '123456789';

				apiMock.delete(`/2.0/device_pinners/${devicePinID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				basicClient.devicePins.delete(devicePinID, null, function(err, data) {

					assert.isNull(err);
					assert.isUndefined(data);

					done();
				});
			});
		});

		describe('getAll()', function() {

			it('should make correct requests and correctly parse responses when API call is successful', function(done) {

				var userFixture = getFixture('users/get_users_me_fields_enterprise_200'),
					devicePinsFixture = getFixture('enterprises/get_enterprises_id_device_pinners_200');

				apiMock.get('/2.0/users/me?fields=enterprise')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, userFixture);

				apiMock.get('/2.0/enterprises/123456789/device_pinners')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, devicePinsFixture);

				basicClient.devicePins.getAll(null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(devicePinsFixture));

					done();
				});
			});
		});

	});

	describe('Files', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					fixture = getFixture('files/get_files_id_200');

				apiMock.get(`/2.0/files/${fileID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.files.get(fileID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('getDownloadURL()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					downloadURL = 'https://dl.boxcloud.com/d/1/6a6_YreMmOqtVm6_P47FD5JGqzg3kA_wSqcOKW9dfE2tEusFkihimxFwQw85Y3t--KvVyhz0GxobSsFyK6HmuYMNUedOtgV5n6vgplfdcVdpYP9SxSv9dbeRYIhsHC-05GMpleRd9xP4I4zudE4V5Tn5X9r8503TwjWpknZKhBfAH37ujxMUBhSYiPefH3wrtaOkMgFxtHpnyi4fS3XMloh74x8ppnc4fyeTloaLyOXvD2IBNeRqquTcubtBa-uVXY6KUg5nxkLPVzGkZl9Y5iBpmzfEv3PP6YjHvGl9LHjw0nagDfWfD1XkDQ5E-LRUmlK5q0qMux6wpS4CPo9O1shwo7btRiRdOYU3dgqMf3TqRP9URhDbpzli_6PBZquOvXp0POv8EQEr1GOGYi_Lo6s92B4Tj7gY5SfXA8YkyJ0qp2BVgu7k7UnC_W5MD7sPMWTnGLjoyaZ8aaqw0l2UYi6jVRgwpQNKe5YGFsmr5dcY1D-FYoK7SY4K5eZ6ZPe3kTODvNLLAJk1U-zHNZmtMPe2Wuae3hC_1738px7S1ZE0FP6h3BuoXLqGIxmt27_znKle7lI-2A_EgJBf69-bNjXEq-ipHoQ76RLvghlD8PT9R6C1mmbXzEv4JJc-GY1a1Hd0taBorx1qMz2UB6ift6VFcN87a2smg-gn2ZAw8_Deps4I8bhsa8fsNBkTWFCbnr2pkZ-sRflaf8_YrcRcs2MrBxtNe2mxnAtRoZakxR0M4EppP5cf7oy1N-4kOn2bpoGyXHZ-udy29uNdn1M0zIAz36_MUskL1usGwrrQMBYsF8dtvIlCTAvww2RYnBxgWUi12nrKwOIk37ZuTqJTtPL7zuDwzo31lp2fOqqKCJxm7xfgMZ51iXgVlkmiN59uJl7x7_2rzYX49-kCQPY9T0VXzlVox8hj09UCvJThJYS5NBAeA-OHn1tqQcdE7KBoK4N7MBabCuJERm1jo62MeQESnStMZc9wRsvPG5qC_VIiM8BIGvcGHARGRkGjEQb16wqiWND9UtEDnqyUaKnCUDiBKb_JvmwDIofZTX9WOaXR9KeRfhi1Ag../download';

				apiMock.get(`/2.0/files/${fileID}/content`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(302, '', {
						Location: downloadURL
					});

				basicClient.files.getDownloadURL(fileID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, downloadURL);

					done();
				});
			});
		});

		describe('getReadStream()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					fileDownloadRoot = 'https://dl.boxcloud.com',
					fileDownloadPath = '/d/1/6a6_YreMmOqtVm6_P47FD5JGqzg3kA_wSqcOKW9dfE2tEusFkihimxFwQw85Y3t--KvVyhz0GxobSsFyK6HmuYMNUedOtgV5n6vgplfdcVdpYP9SxSv9dbeRYIhsHC-05GMpleRd9xP4I4zudE4V5Tn5X9r8503TwjWpknZKhBfAH37ujxMUBhSYiPefH3wrtaOkMgFxtHpnyi4fS3XMloh74x8ppnc4fyeTloaLyOXvD2IBNeRqquTcubtBa-uVXY6KUg5nxkLPVzGkZl9Y5iBpmzfEv3PP6YjHvGl9LHjw0nagDfWfD1XkDQ5E-LRUmlK5q0qMux6wpS4CPo9O1shwo7btRiRdOYU3dgqMf3TqRP9URhDbpzli_6PBZquOvXp0POv8EQEr1GOGYi_Lo6s92B4Tj7gY5SfXA8YkyJ0qp2BVgu7k7UnC_W5MD7sPMWTnGLjoyaZ8aaqw0l2UYi6jVRgwpQNKe5YGFsmr5dcY1D-FYoK7SY4K5eZ6ZPe3kTODvNLLAJk1U-zHNZmtMPe2Wuae3hC_1738px7S1ZE0FP6h3BuoXLqGIxmt27_znKle7lI-2A_EgJBf69-bNjXEq-ipHoQ76RLvghlD8PT9R6C1mmbXzEv4JJc-GY1a1Hd0taBorx1qMz2UB6ift6VFcN87a2smg-gn2ZAw8_Deps4I8bhsa8fsNBkTWFCbnr2pkZ-sRflaf8_YrcRcs2MrBxtNe2mxnAtRoZakxR0M4EppP5cf7oy1N-4kOn2bpoGyXHZ-udy29uNdn1M0zIAz36_MUskL1usGwrrQMBYsF8dtvIlCTAvww2RYnBxgWUi12nrKwOIk37ZuTqJTtPL7zuDwzo31lp2fOqqKCJxm7xfgMZ51iXgVlkmiN59uJl7x7_2rzYX49-kCQPY9T0VXzlVox8hj09UCvJThJYS5NBAeA-OHn1tqQcdE7KBoK4N7MBabCuJERm1jo62MeQESnStMZc9wRsvPG5qC_VIiM8BIGvcGHARGRkGjEQb16wqiWND9UtEDnqyUaKnCUDiBKb_JvmwDIofZTX9WOaXR9KeRfhi1Ag../download',
					fixturePath = path.resolve(__dirname, 'fixtures/epic-poem.txt'),
					fileContents = fs.readFileSync(fixturePath),
					fileStream = fs.createReadStream(fixturePath),
					dlMock = nock(fileDownloadRoot);

				apiMock.get(`/2.0/files/${fileID}/content`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(302, '', {
						Location: fileDownloadRoot + fileDownloadPath
					});

				dlMock.get(fileDownloadPath)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, function() { return fileStream; });

				basicClient.files.getReadStream(fileID, {}, function(err, data) {

					assert.ifError(err);
					assert.property(data, 'on', 'getReadStream() should provide a stream');

					var contents = '';

					data.on('data', function(chunk) {
						contents += chunk.toString('utf8');
					});

					data.on('end', function() {
						assert.equal(contents, fileContents, 'Output of the read stream should be the correct file');
						done();
					});
				});
			});
		});

		describe('getThumbnail()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					thumbnailURL = 'https://cdn01.boxcdn.net/_assets/thumbs/27x30/image/png-IDjzTN.gif';

				apiMock.get(`/2.0/files/${fileID}/thumbnail.png`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(202, '', {
						Location: thumbnailURL
					});

				basicClient.files.getThumbnail(fileID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, {
						statusCode: 202,
						location: thumbnailURL
					});

					done();
				});
			});
		});

		describe('getComments()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					fixture = getFixture('files/get_files_id_comments_200');

				apiMock.get(`/2.0/files/${fileID}/comments`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.files.getComments(fileID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('update()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					options = {name: 'Dog.png'},
					fixture = getFixture('files/put_files_id_200');

				apiMock.put(`/2.0/files/${fileID}`, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.files.update(fileID, options, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('addToCollection()', function() {

			it('should make correct requests and correctly parse responses when API call is successful', function(done) {

				var fileID = '1234567890',
					collectionID = '987654321',
					collectionsFixture = getFixture('files/get_files_id_fields_collections_empty_200'),
					fileFixture = getFixture('files/put_files_id_200');

				apiMock.get(`/2.0/files/${fileID}?fields=collections`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, collectionsFixture);

				apiMock.put(`/2.0/files/${fileID}`, {collections: [{id: collectionID}]})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fileFixture);

				basicClient.files.addToCollection(fileID, collectionID, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fileFixture));

					done();
				});
			});
		});

		describe('removeFromCollection()', function() {

			it('should make correct requests and correctly parse responses when API call is successful', function(done) {

				var fileID = '1234567890',
					collectionID = '987654321',
					collectionsFixture = getFixture('files/get_files_id_fields_collections_200'),
					fileFixture = getFixture('files/put_files_id_200');

				apiMock.get(`/2.0/files/${fileID}?fields=collections`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, collectionsFixture);

				apiMock.put(`/2.0/files/${fileID}`, {collections: []})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fileFixture);

				basicClient.files.removeFromCollection(fileID, collectionID, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fileFixture));

					done();
				});
			});
		});

		describe('move()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					newParentID = '987654321',
					fixture = getFixture('files/put_files_id_200');

				apiMock.put(`/2.0/files/${fileID}`, {parent: {id: newParentID}})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				basicClient.files.move(fileID, newParentID, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('copy()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					newParentID = '987654321',
					fixture = getFixture('files/post_files_id_copy_200');

				apiMock.post(`/2.0/files/${fileID}/copy`, {parent: {id: newParentID}})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				basicClient.files.copy(fileID, newParentID, null, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('delete()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890';

				apiMock.delete(`/2.0/files/${fileID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				basicClient.files.delete(fileID, function(err, data) {

					assert.isNull(err);
					assert.isUndefined(data);

					done();
				});
			});
		});

		describe('uploadFile()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var folderID = '0',
					filename = 'foo.txt',
					fileContent = 'foo',
					fixture = getFixture('files/post_files_content_200');

				uploadMock.post('/2.0/files/content',
					function(body) {

						// Verify the multi-part form body
						var lines = body.split(/\r?\n/);
						assert.match(lines[0], /^-+\d+$/);
						assert.equal(lines[1], 'Content-Disposition: form-data; name="attributes"');
						assert.equal(lines[2], '');

						var attributes = JSON.parse(lines[3]);
						assert.propertyVal(attributes, 'name', filename);
						assert.nestedPropertyVal(attributes, 'parent.id', folderID);

						assert.match(lines[4], /^-+\d+$/);
						assert.equal(lines[5], 'Content-Disposition: form-data; name="content"; filename="unused"');
						assert.equal(lines[6], '');
						assert.equal(lines[7], fileContent);
						assert.match(lines[8], /^-+\d+-+$/);
						return true;
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				basicClient.files.uploadFile(folderID, filename, fileContent, function(err, data) {

					assert.isNull(err);
					assert.deepEqual(data, JSON.parse(fixture));

					done();
				});
			});
		});

		describe('getRepresentationInfo()', function() {

			it('should resolve all representation entries with success status when generateRepresenations option is passed',
				function() {

					var repsFixtureMultiple = getFixture('files/get_files_id_representations_multiple_200'),
						repsObj = JSON.parse(repsFixtureMultiple),
						repPDFURL = url.parse(repsObj.representations.entries[1].info.url).pathname,
						repTextURL = url.parse(repsObj.representations.entries[2].info.url).pathname,
						repFixturePDFPending = getFixture('files/get_representation_info_pdf_pending_200'),
						repFixturePDFSuccess = getFixture('files/get_representation_info_pdf_success_200'),
						repFixtureTextSuccess = getFixture('files/get_representation_info_text_success_200');

					var fileID = '11111',
						representation = '[png][pdf][extracted_text]',
						options = {generateRepresentations: true};

					apiMock.get(`/2.0/files/${fileID}?fields=representations`)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.matchHeader('X-Rep-Hints', function(repHintsHeader) {
							assert.equal(repHintsHeader, representation);
							return true;
						})
						.reply(200, repsFixtureMultiple)
						.get(repPDFURL)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repFixturePDFPending)
						.get(repPDFURL)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repFixturePDFSuccess)
						.get(repTextURL)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repFixtureTextSuccess);

					return basicClient.files.getRepresentationInfo(fileID, representation, options)
						.then(data => {
							var entries = data.entries;
							entries.forEach(function(entry) {
								assert.nestedPropertyVal(entry, 'status.state', 'success');
							});
							assert.equal(entries.length, 3);
						});
				});

			it('should return representation entries when the options and representation parameters are not passed',
				function() {

					var repsFixtureMultiple = getFixture('files/get_files_id_representations_multiple_200');

					var fileID = '11111';

					apiMock.get(`/2.0/files/${fileID}?fields=representations`)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repsFixtureMultiple);

					return basicClient.files.getRepresentationInfo(fileID)
						.then(data => {
							var entries = data.entries;
							assert.equal(entries.length, 3);
							assert.nestedPropertyVal(entries[0], 'status.state', 'success');
							assert.nestedPropertyVal(entries[1], 'status.state', 'none');
							assert.nestedPropertyVal(entries[2], 'status.state', 'pending');
						});
				});


			it('should return representation entries with errors when generateRepresentations option is passed',
				function() {

					var repsFixture = getFixture('files/get_files_id_representations_png_200'),
						repsObj = JSON.parse(repsFixture),
						repInfoURL = url.parse(repsObj.representations.entries[0].info.url).pathname,
						repPendingFixture = getFixture('files/get_representation_info_pending_200'),
						repErrorFixture = getFixture('files/get_representation_info_error_200');

					var fileID = '983745',
						representation = '[png?dimensions=1024x1024]',
						options = {generateRepresentations: true};

					apiMock.get(`/2.0/files/${fileID}?fields=representations`)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.matchHeader('X-Rep-Hints', function(repHintsHeader) {
							assert.equal(repHintsHeader, representation);
							return true;
						})
						.reply(200, repsFixture)
						.get(repInfoURL)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repPendingFixture)
						.get(repInfoURL)
						.matchHeader('Authorization', function(authHeader) {
							assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
							return true;
						})
						.reply(200, repErrorFixture);

					return basicClient.files.getRepresentationInfo(fileID, representation, options)
						.then(data => {
							var entries = data.entries;
							assert.equal(entries.length, 1);
							assert.nestedPropertyVal(entries[0], 'status.state', 'error');
						});
				});


		});

		describe('getRepresentationContent()', function() {

			it('should make correct request and poll info endpoint until representation is generated', function(done) {

				// This test takes a while due to lots of bytes moving around
				// eslint-disable-next-line no-invalid-this
				this.timeout(5000);

				var repsFixture = getFixture('files/get_files_id_representations_png_200'),
					repsObj = JSON.parse(repsFixture),
					repInfoURL = url.parse(repsObj.representations.entries[0].info.url).pathname,
					repPendingFixture = getFixture('files/get_representation_info_pending_200'),
					repSuccessFixture = getFixture('files/get_representation_info_success_200'),
					repInfo = JSON.parse(repSuccessFixture),
					contentURL = url.parse(repInfo.content.url_template),
					contentDomain = `${contentURL.protocol}//${contentURL.host}`,
					contentPath = decodeURIComponent(contentURL.pathname),
					pngStream = fs.createReadStream(path.resolve(__dirname, './fixtures/1.png')),
					pngContents = fs.readFileSync(path.resolve(__dirname, './fixtures/1.png')),
					fileBuffer = new Buffer(pngContents.length);

				var downloadMock = nock(contentDomain);

				var fileID = '983745',
					representation = '[png?dimensions=1024x1024]',
					assetPath = 'page-1.png';

				apiMock.get(`/2.0/files/${fileID}?fields=representations`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('X-Rep-Hints', function(repHintsHeader) {
						assert.equal(repHintsHeader, representation);
						return true;
					})
					.reply(200, repsFixture)
					.get(repInfoURL)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, repPendingFixture)
					.get(repInfoURL)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, repPendingFixture)
					.get(repInfoURL)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, repSuccessFixture);

				downloadMock.get(contentPath.replace('{+asset_path}', assetPath))
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, pngStream);

				basicClient.files.getRepresentationContent(fileID, representation, { assetPath }, function(err, stream) {

					assert.ifError(err);
					var position = 0;
					stream.on('data', function(chunk) {
						chunk.copy(fileBuffer, position);
						position += chunk.length;
					});

					stream.on('end', () => {
						var expectedHash = crypto.createHash('sha1').update(pngContents)
							.digest('base64');
						var actualHash = crypto.createHash('sha1').update(fileBuffer)
							.digest('base64');
						// Compare hashes instead of raw bytes because assertion failure output is massive
						assert.equal(actualHash, expectedHash, 'Representation content did not match expected');
						done();
					});
				});
			});
		});

		describe('getVersions()', function() {
			it('should make GET request to fetch previous file versions', function() {

				var fileID = '12345',
					fixture = getFixture('files/get_files_id_versions_200');

				apiMock.get(`/2.0/files/${fileID}/versions`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getVersions(fileID)
					.then(versions => {
						assert.deepEqual(versions, JSON.parse(fixture));
					});
			});
		});

		describe('preflightUploadFile()', function() {
			it('should make OPTIONS call for upload preflight check', function() {
				var name = 'Foo Bar.txt',
					parentID = '0',
					size = 12345,
					fixture = getFixture('files/options_files_content_200');

				var expectedBody = {
					name,
					size,
					parent: {
						id: parentID
					}
				};

				apiMock.options('/2.0/files/content', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.preflightUploadFile(parentID, { name, size })
					.then(result => assert.deepEqual(result, JSON.parse(fixture)));
			});
		});

		describe('preflightUploadNewFileVersion()', function() {
			it('should make OPTIONS call for upload preflight check', function() {
				var name = 'Foo Bar.txt',
					fileID = '11111',
					size = 12345,
					fixture = getFixture('files/options_files_id_content_200');

				var expectedBody = {
					name,
					size
				};

				apiMock.options(`/2.0/files/${fileID}/content`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.preflightUploadNewFileVersion(fileID, { name, size })
					.then(result => assert.deepEqual(result, JSON.parse(fixture)));
			});
		});

		describe('promoteVersion()', function() {
			it('should make POST call to make version current', function() {

				var fileID = '11111',
					versionID = '22222',
					fixture = getFixture('files/post_files_id_versions_current_201');

				var expectedBody = {
					type: 'file_version',
					id: versionID
				};

				apiMock.post(`/2.0/files/${fileID}/versions/current`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.promoteVersion(fileID, versionID)
					.then(currentVersion => assert.deepEqual(currentVersion, JSON.parse(fixture)));
			});
		});

		describe('uploadNewFileVersion()', function() {
			it('should make POST request to upload new file version content', function() {

				var fileID = '11111',
					name = 'New file name.txt',
					fileContent = 'foo',
					fixture = getFixture('files/post_files_content_200');

				uploadMock.post(`/2.0/files/${fileID}/content`,
					function(body) {

						// Verify the multi-part form body
						var lines = body.split(/\r?\n/);
						assert.match(lines[0], /^-+\d+$/);
						assert.equal(lines[1], 'Content-Disposition: form-data; name="attributes"');
						assert.equal(lines[2], '');

						var attributes = JSON.parse(lines[3]);
						assert.propertyVal(attributes, 'name', name);

						assert.match(lines[4], /^-+\d+$/);
						assert.equal(lines[5], 'Content-Disposition: form-data; name="content"; filename="unused"');
						assert.equal(lines[6], '');
						assert.equal(lines[7], fileContent);
						assert.match(lines[8], /^-+\d+-+$/);
						return true;
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.uploadNewFileVersion(fileID, fileContent, { name })
					.then(data => assert.deepEqual(data, JSON.parse(fixture)));
			});
		});

		describe('getAllMetadata()', function() {
			it('should make GET call to retrieve all metadata', function() {

				var fileID = '11111',
					fixture = getFixture('files/get_files_id_metadata_200');

				apiMock.get(`/2.0/files/${fileID}/metadata`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getAllMetadata(fileID)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('getMetadata()', function() {
			it('should make GET call to retrieve metadata', function() {

				var fileID = '11111',
					scope = 'enterprise',
					template = 'testTemplate',
					fixture = getFixture('files/get_files_id_metadata_scope_template_200');

				apiMock.get(`/2.0/files/${fileID}/metadata/${scope}/${template}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getMetadata(fileID, scope, template)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('deleteMetadata()', function() {
			it('should make DELETE call to remove metadata instance', function() {

				var fileID = '11111',
					scope = 'enterprise',
					template = 'testTemplate';

				apiMock.delete(`/2.0/files/${fileID}/metadata/${scope}/${template}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.files.deleteMetadata(fileID, scope, template)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('addMetadata()', function() {
			it('should make POST call to create metadata instance', function() {

				var fileID = '11111',
					scope = 'enterprise',
					template = 'testTemplate',
					fixture = getFixture('files/post_files_id_metadata_scope_template_201');

				var metadataValues = {
					testEnum: 'foo'
				};

				apiMock.post(`/2.0/files/${fileID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.addMetadata(fileID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('setMetadata()', function() {

			var fileID = '11111',
				scope = 'enterprise',
				template = 'testTemplate',
				fixture = getFixture('files/post_files_id_metadata_scope_template_201');

			var metadataValues = {
				testEnum: 'foo'
			};

			var metadataUpdate = [
				{
					op: 'add',
					path: '/testEnum',
					value: 'foo',
				}
			];

			it('should try POST call to create metadata instance', function() {

				apiMock.post(`/2.0/files/${fileID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.setMetadata(fileID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});

			it('should make PUT call to update metadata instance when instance exists', function() {

				apiMock.post(`/2.0/files/${fileID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(409)
					.put(`/2.0/files/${fileID}/metadata/${scope}/${template}`, metadataUpdate)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.setMetadata(fileID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});

			it('should produce error when creation operation fails with non-conflict error', function() {

				apiMock.post(`/2.0/files/${fileID}/metadata/${scope}/${template}`, metadataValues)
					.reply(400);

				return basicClient.files.setMetadata(fileID, scope, template, metadataValues)
					.then(() => assert.fail('Expected method to fail'))
					.catch(err => assert.propertyVal(err, 'statusCode', 400));
			});
		});

		describe('getTrashedFile()', function() {
			it('should make GET call to retrieve information about file in trash', function() {

				var fileID = '11111',
					fixture = getFixture('files/get_files_id_trash_200');

				apiMock.get(`/2.0/files/${fileID}/trash`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getTrashedFile(fileID)
					.then(file => assert.deepEqual(file, JSON.parse(fixture)));
			});
		});

		describe('deletePermanently()', function() {
			it('should make GET call to delete file in trash', function() {

				var fileID = '11111';

				apiMock.delete(`/2.0/files/${fileID}/trash`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.files.deletePermanently(fileID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getTasks()', function() {
			it('should make GET call to retrieve file tasks', function() {

				var fileID = '11111',
					fixture = getFixture('files/get_files_id_tasks_200');

				apiMock.get(`/2.0/files/${fileID}/tasks`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getTasks(fileID)
					.then(tasks => assert.deepEqual(tasks, JSON.parse(fixture)));
			});
		});

		describe('getEmbedLink()', function() {
			it('should make GET call to retrieve file embed URL', function() {

				var fileID = '11111',
					fixture = getFixture('files/get_files_id_expiring_embed_link_200');

				apiMock.get(`/2.0/files/${fileID}`)
					.query({
						fields: 'expiring_embed_link'
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getEmbedLink(fileID)
					.then(embedURL => assert.equal(embedURL, JSON.parse(fixture).expiring_embed_link.url));
			});
		});

		describe('lock()', function() {
			it('should make PUT call to add lock to file', function() {

				var fileID = '11111',
					expireTime = '2020-02-20T20:02:20-02:00',
					fixture = getFixture('files/put_files_id_lock_200');

				var expectedBody = {
					lock: {
						type: 'lock',
						expires_at: expireTime,
						is_download_prevented: true
					}
				};

				apiMock.put(`/2.0/files/${fileID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.lock(fileID, {expires_at: expireTime, is_download_prevented: true})
					.then(file => assert.deepEqual(file, JSON.parse(fixture)));
			});
		});

		describe('unlock()', function() {
			it('should make PUT call to remove lock to file', function() {

				var fileID = '11111',
					fixture = getFixture('files/put_files_id_lock_200');

				var expectedBody = {
					lock: null
				};

				apiMock.put(`/2.0/files/${fileID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.unlock(fileID)
					.then(file => assert.deepEqual(file, JSON.parse(fixture)));
			});
		});

		describe('restoreFromTrash()', function() {
			it('should make POST call to restore file', function() {

				var fileID = '11111',
					fixture = getFixture('files/post_files_id_201');

				var expectedBody = {};

				apiMock.post(`/2.0/files/${fileID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.restoreFromTrash(fileID)
					.then(file => assert.deepEqual(file, JSON.parse(fixture)));
			});
		});

		describe('applyWatermark()', function() {
			it('should make PUT call to apply watermark', function() {

				var fileID = '11111',
					fixture = getFixture('files/put_files_id_watermark_201');

				var expectedBody = {
					watermark: {
						imprint: 'default'
					}
				};

				apiMock.put(`/2.0/files/${fileID}/watermark`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.files.applyWatermark(fileID)
					.then(watermark => assert.deepEqual(watermark, JSON.parse(fixture)));
			});
		});

		describe('getWatermark()', function() {
			it('should make GET call to retrieve watermark', function() {

				var fileID = '11111',
					fixture = getFixture('files/get_files_id_watermark_200');

				apiMock.get(`/2.0/files/${fileID}/watermark`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.files.getWatermark(fileID)
					.then(watermark => assert.deepEqual(watermark, JSON.parse(fixture).watermark));
			});
		});

		describe('removeWatermark()', function() {
			it('should make DELETE call to remove watermark', function() {

				var fileID = '11111';

				apiMock.delete(`/2.0/files/${fileID}/watermark`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.files.removeWatermark(fileID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('deleteVersion()', function() {
			it('should make DELETE call to remove watermark', function() {

				var fileID = '11111',
					fileVersionID = '22222';

				apiMock.delete(`/2.0/files/${fileID}/versions/${fileVersionID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.files.deleteVersion(fileID, fileVersionID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('createZip()', function() {
			it('should create a zip file', function() {
				var name = 'test',
					items = [
						{
							type: 'file',
							id: '466239504569'
						},
						{
							type: 'folder',
							id: '466239504580'
						}
					],
					expectedBody = {
						items,
						download_file_name: name
					},
					fixture = getFixture('files/post_zip_downloads_202');

				apiMock.post('/2.0/zip_downloads', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(202, fixture);

				return basicClient.files.createZip(name, items)
					.then(info => {
						assert.deepEqual(info, JSON.parse(fixture));
					});
			});
		});

		describe('downloadZip()', function() {
			it('should create a zip file and download it', function() {
				var name = 'test',
					items = [
						{
							type: 'file',
							id: '466239504569'
						},
						{
							type: 'folder',
							id: '466239504580'
						}
					],
					expectedBody = {
						items,
						download_file_name: name
					},
					zipFileBytes = '',
					readableStream = new Stream.Readable({
						read() {
							this.push('zip file');
							this.push(null);
						}
					}),
					writableStream = new Stream.Writable({
						write(chunk, encoding, next) {
							zipFileBytes += chunk.toString();
							next();
						}
					}),
					downloadUrl = '/2.0/zip_downloads/124hfiowk3fa8kmrwh/content',
					statusUrl = '/2.0/zip_downloads/124hfiowk3fa8kmrwh/status',
					fixture = getFixture('files/post_zip_downloads_202'),
					fixture2 = getFixture('files/get_zip_downloads_status_200'),
					fileDownloadRoot = 'https://dl.boxcloud.com',
					dlMock = nock(fileDownloadRoot);

				apiMock.post('/2.0/zip_downloads', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(202, fixture);

				dlMock.get(downloadUrl)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, readableStream);

				apiMock.get(statusUrl)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture2);

				return basicClient.files.downloadZip(name, items, writableStream)
					.then(status => {
						assert.deepEqual(status, JSON.parse(fixture2));
						assert.equal(zipFileBytes, 'zip file');
					});
			});
		});
	});

	describe('Folders', function() {

		describe('get()', function() {
			it('should make GET call to retrieve folder info', function() {
				var folderID = '0',
					fixture = getFixture('folders/get_folders_id_200');

				apiMock.get(`/2.0/folders/${folderID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.get(folderID)
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('getItems()', function() {
			it('should make GET call to retrieve folder info', function() {
				var folderID = '0',
					fixture = getFixture('folders/get_folders_id_items_200');

				apiMock.get(`/2.0/folders/${folderID}/items`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getItems(folderID)
					.then(items => assert.deepEqual(items, JSON.parse(fixture)));
			});
		});

		describe('applyWatermark()', function() {
			it('should make PUT call to apply watermark', function() {

				var folderID = '11111',
					fixture = getFixture('folders/put_folders_id_watermark_201');

				var expectedBody = {
					watermark: {
						imprint: 'default'
					}
				};

				apiMock.put(`/2.0/folders/${folderID}/watermark`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.applyWatermark(folderID)
					.then(watermark => assert.deepEqual(watermark, JSON.parse(fixture)));
			});
		});

		describe('getWatermark()', function() {
			it('should make GET call to retrieve watermark', function() {

				var folderID = '11111',
					fixture = getFixture('folders/get_folders_id_watermark_200');

				apiMock.get(`/2.0/folders/${folderID}/watermark`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getWatermark(folderID)
					.then(watermark => assert.deepEqual(watermark, JSON.parse(fixture).watermark));
			});
		});

		describe('removeWatermark()', function() {
			it('should make DELETE call to remove watermark', function() {

				var folderID = '11111';

				apiMock.delete(`/2.0/folders/${folderID}/watermark`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.folders.removeWatermark(folderID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getAllMetadata()', function() {
			it('should make GET call to retrieve all metadata', function() {

				var folderID = '11111',
					fixture = getFixture('folders/get_folders_id_metadata_200');

				apiMock.get(`/2.0/folders/${folderID}/metadata`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getAllMetadata(folderID)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('getMetadata()', function() {
			it('should make GET call to retrieve metadata', function() {

				var folderID = '11111',
					scope = 'enterprise',
					template = 'testTemplate',
					fixture = getFixture('folders/get_folders_id_metadata_scope_template_200');

				apiMock.get(`/2.0/folders/${folderID}/metadata/${scope}/${template}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getMetadata(folderID, scope, template)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('deleteMetadata()', function() {
			it('should make DELETE call to remove metadata instance', function() {

				var folderID = '11111',
					scope = 'enterprise',
					template = 'testTemplate';

				apiMock.delete(`/2.0/folders/${folderID}/metadata/${scope}/${template}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.folders.deleteMetadata(folderID, scope, template)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('addMetadata()', function() {
			it('should make POST call to create metadata instance', function() {

				var folderID = '11111',
					scope = 'enterprise',
					template = 'testTemplate',
					fixture = getFixture('folders/post_folders_id_metadata_scope_template_201');

				var metadataValues = {
					testEnum: 'foo'
				};

				apiMock.post(`/2.0/folders/${folderID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.addMetadata(folderID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});
		});

		describe('setMetadata()', function() {

			var folderID = '11111',
				scope = 'enterprise',
				template = 'testTemplate',
				fixture = getFixture('folders/post_folders_id_metadata_scope_template_201');

			var metadataValues = {
				testEnum: 'foo'
			};

			var metadataUpdate = [
				{
					op: 'add',
					path: '/testEnum',
					value: 'foo',
				}
			];

			it('should try POST call to create metadata instance', function() {

				apiMock.post(`/2.0/folders/${folderID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.setMetadata(folderID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});

			it('should make PUT call to update metadata instance when instance exists', function() {

				apiMock.post(`/2.0/folders/${folderID}/metadata/${scope}/${template}`, metadataValues)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(409)
					.put(`/2.0/folders/${folderID}/metadata/${scope}/${template}`, metadataUpdate)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.setMetadata(folderID, scope, template, metadataValues)
					.then(metadata => assert.deepEqual(metadata, JSON.parse(fixture)));
			});

			it('should produce error when creation operation fails with non-conflict error', function() {

				apiMock.post(`/2.0/folders/${folderID}/metadata/${scope}/${template}`, metadataValues)
					.reply(400);

				return basicClient.folders.setMetadata(folderID, scope, template, metadataValues)
					.then(() => assert.fail('Expected method to fail'))
					.catch(err => assert.propertyVal(err, 'statusCode', 400));
			});
		});

		describe('getCollaborations()', function() {
			it('should make GET call to retrieve folder collaborations', function() {

				var folderID = '11111',
					fixture = getFixture('folders/get_folders_id_collaborations_200');

				apiMock.get(`/2.0/folders/${folderID}/collaborations`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getCollaborations(folderID)
					.then(collabs => assert.deepEqual(collabs, JSON.parse(fixture)));
			});
		});

		describe('create()', function() {
			it('should make POST call to create folder', function() {

				var parentFolderID = '0',
					name = 'New Folder',
					fixture = getFixture('folders/post_folders_201');

				var expectedBody = {
					name,
					parent: {
						id: parentFolderID
					}
				};

				apiMock.post('/2.0/folders', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.create(parentFolderID, name)
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('copy()', function() {
			it('should make POST call to create folder copy', function() {

				var folderID = '22222',
					parentFolderID = '0',
					name = 'New Folder (1)',
					fixture = getFixture('folders/post_folders_id_copy_201');

				var expectedBody = {
					name,
					parent: {
						id: parentFolderID
					}
				};

				apiMock.post(`/2.0/folders/${folderID}/copy`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.copy(folderID, parentFolderID, { name })
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update folder info', function() {

				var folderID = '22222',
					name = 'New Folder Name',
					description = 'My new folder',
					fixture = getFixture('folders/put_folders_id_200');

				var expectedBody = {
					name,
					description
				};

				apiMock.put(`/2.0/folders/${folderID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.update(folderID, { name, description })
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('addToCollection()', function() {
			it('should make PUT call to update folder collections', function() {

				var folderID = '22222',
					collectionID = '12345',
					getCollectionsFixture = getFixture('folders/get_folders_id_collections_empty_200'),
					putFixture = getFixture('folders/put_folders_id_collections_200');

				var expectedBody = {
					collections: [{ id: collectionID }]
				};

				apiMock.get(`/2.0/folders/${folderID}`)
					.query({
						fields: 'collections'
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, getCollectionsFixture)
					.put(`/2.0/folders/${folderID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, putFixture);

				return basicClient.folders.addToCollection(folderID, collectionID)
					.then(folder => assert.deepEqual(folder, JSON.parse(putFixture)));
			});
		});

		describe('removeFromCollection()', function() {
			it('should make PUT call to update folder collections', function() {

				var folderID = '22222',
					collectionID = '12345',
					getCollectionsFixture = getFixture('folders/get_folders_id_collections_full_200'),
					putFixture = getFixture('folders/put_folders_id_collections_200');

				var expectedBody = {
					collections: []
				};

				apiMock.get(`/2.0/folders/${folderID}`)
					.query({
						fields: 'collections'
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, getCollectionsFixture)
					.put(`/2.0/folders/${folderID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, putFixture);

				return basicClient.folders.removeFromCollection(folderID, collectionID)
					.then(folder => assert.deepEqual(folder, JSON.parse(putFixture)));
			});
		});

		describe('move()', function() {
			it('should make PUT call to change folder parent', function() {

				var folderID = '22222',
					newParentID = '11111',
					fixture = getFixture('folders/put_folders_id_parent_200');

				var expectedBody = {
					parent: {
						id: newParentID
					}
				};

				apiMock.put(`/2.0/folders/${folderID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.move(folderID, newParentID)
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('delete()', function() {
			it('should make DELETE call to delete folder', function() {

				var folderID = '22222';

				apiMock.delete(`/2.0/folders/${folderID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.folders.delete(folderID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getTrashedFolder()', function() {
			it('should make GET call to retrieve folder in trash', function() {

				var folderID = '22222',
					fixture = getFixture('folders/get_folders_id_trash_200');

				apiMock.get(`/2.0/folders/${folderID}/trash`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.folders.getTrashedFolder(folderID)
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('restoreFromTrash()', function() {
			it('should make GET call to retrieve folder in trash', function() {

				var folderID = '22222',
					fixture = getFixture('folders/post_folders_id_201');

				var expectedBody = {};

				apiMock.post(`/2.0/folders/${folderID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.folders.restoreFromTrash(folderID)
					.then(folder => assert.deepEqual(folder, JSON.parse(fixture)));
			});
		});

		describe('deletePermanently()', function() {
			it('should make GET call to retrieve folder in trash', function() {

				var folderID = '22222';

				apiMock.delete(`/2.0/folders/${folderID}/trash`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.folders.deletePermanently(folderID)
					.then(result => assert.isUndefined(result));
			});
		});

	});

	describe('Groups', function() {

		describe('create()', function() {
			it('should make POST call to create the group', function() {

				var name = 'Employees',
					provenance = 'Okta',
					fixture = getFixture('groups/post_groups_201');

				var expectedBody = { name, provenance };

				apiMock.post('/2.0/groups', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.groups.create(name, { provenance })
					.then(group => assert.deepEqual(group, JSON.parse(fixture)));
			});
		});

		describe('get()', function() {
			it('should make GET call to retrieve the group', function() {

				var groupID = '11111',
					fixture = getFixture('groups/get_groups_id_200');

				apiMock.get(`/2.0/groups/${groupID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.get(groupID)
					.then(group => assert.deepEqual(group, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update the group', function() {

				var groupID = '11111',
					name = 'Remote Employees',
					fixture = getFixture('groups/put_groups_id_200');

				var expectedBody = { name };

				apiMock.put(`/2.0/groups/${groupID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.update(groupID, { name })
					.then(group => assert.deepEqual(group, JSON.parse(fixture)));
			});
		});

		describe('delete()', function() {
			it('should make DELETE call to delete the group', function() {

				var groupID = '11111';

				apiMock.delete(`/2.0/groups/${groupID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.groups.delete(groupID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('addUser()', function() {
			it('should make POST call to create group membership', function() {

				var groupID = '11111',
					userID = '44444',
					role = 'admin',
					fixture = getFixture('groups/post_group_memberships_201');

				var expectedBody = {
					role,
					group: {
						id: groupID
					},
					user: {
						id: userID
					}
				};

				apiMock.post('/2.0/group_memberships', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.groups.addUser(groupID, userID, { role })
					.then(membership => assert.deepEqual(membership, JSON.parse(fixture)));
			});
		});

		describe('getMembership()', function() {
			it('should make GET call to retrieve the group membership', function() {

				var membershipID = '12345',
					fixture = getFixture('groups/get_group_memberships_id_200');

				apiMock.get(`/2.0/group_memberships/${membershipID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.getMembership(membershipID)
					.then(membership => assert.deepEqual(membership, JSON.parse(fixture)));
			});
		});

		describe('updateMembership()', function() {
			it('should make PUT call to update the group membership', function() {

				var membershipID = '12345',
					role = 'member',
					fixture = getFixture('groups/get_group_memberships_id_200');

				var expectedBody = { role };

				apiMock.put(`/2.0/group_memberships/${membershipID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.updateMembership(membershipID, { role })
					.then(membership => assert.deepEqual(membership, JSON.parse(fixture)));
			});
		});

		describe('getMemberships()', function() {
			it('should make GET call to retrieve the group memberships', function() {

				var groupID = '11111',
					fixture = getFixture('groups/get_groups_id_memberships_200');

				apiMock.get(`/2.0/groups/${groupID}/memberships`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.getMemberships(groupID)
					.then(memberships => assert.deepEqual(memberships, JSON.parse(fixture)));
			});
		});

		describe('removeMembership()', function() {
			it('should make GET call to retrieve the group membership', function() {

				var membershipID = '12345';

				apiMock.delete(`/2.0/group_memberships/${membershipID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.groups.removeMembership(membershipID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getAll()', function() {
			it('should make GET call to retrieve the groups', function() {

				var fixture = getFixture('groups/get_groups_200');

				apiMock.get('/2.0/groups')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.getAll()
					.then(groups => assert.deepEqual(groups, JSON.parse(fixture)));
			});
		});

		describe('getCollaborations()', function() {
			it('should make GET call to retrieve the group collaborations', function() {

				var groupID = '11111',
					fixture = getFixture('groups/get_groups_id_collaborations_200');

				apiMock.get(`/2.0/groups/${groupID}/collaborations`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.groups.getCollaborations(groupID)
					.then(collabs => assert.deepEqual(collabs, JSON.parse(fixture)));
			});
		});

	});

	describe('Legal Holds', function() {

		describe('create()', function() {
			it('should make POST call to create policy', function() {

				var name = 'Trial Documents',
					isOngoing = true,
					fixture = getFixture('legal-hold-policies/post_legal_hold_policies_201');

				var expectedBody = {
					policy_name: name,
					is_ongoing: isOngoing
				};

				apiMock.post('/2.0/legal_hold_policies', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.legalHoldPolicies.create(name, { is_ongoing: isOngoing })
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('get()', function() {
			it('should make GET call to retrieve policy', function() {

				var policyID = '11111',
					fixture = getFixture('legal-hold-policies/get_legal_hold_policies_id_200');

				apiMock.get(`/2.0/legal_hold_policies/${policyID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.get(policyID)
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update policy', function() {

				var policyID = '11111',
					description = 'Documents related to our ongoing litigation',
					fixture = getFixture('legal-hold-policies/put_legal_hold_policies_id_200');

				var expectedBody = { description };

				apiMock.put(`/2.0/legal_hold_policies/${policyID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.update(policyID, { description })
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('getAll()', function() {
			it('should make GET call to retrieve policies', function() {

				var fixture = getFixture('legal-hold-policies/get_legal_hold_policies_200');

				apiMock.get('/2.0/legal_hold_policies')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.getAll()
					.then(policies => assert.deepEqual(policies, JSON.parse(fixture)));
			});
		});

		describe('delete()', function() {
			it('should make DELETE call to delete policy', function() {

				var policyID = '11111';

				apiMock.delete(`/2.0/legal_hold_policies/${policyID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(202);

				return basicClient.legalHoldPolicies.delete(policyID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('assign()', function() {
			it('should make POST call to create assignment', function() {

				var policyID = '11111',
					folderID = '55555',
					fixture = getFixture('legal-hold-policies/post_legal_hold_policy_assignments_201');

				var expectedBody = {
					policy_id: policyID,
					assign_to: {
						type: 'folder',
						id: folderID
					}
				};

				apiMock.post('/2.0/legal_hold_policy_assignments', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.legalHoldPolicies.assign(policyID, 'folder', folderID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignment()', function() {
			it('should make GET call to retrieve assignment', function() {

				var assignmentID = '12345',
					fixture = getFixture('legal-hold-policies/get_legal_hold_policy_assignments_id_200');

				apiMock.get(`/2.0/legal_hold_policy_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.getAssignment(assignmentID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignments()', function() {
			it('should make GET call to retrieve assignments', function() {

				var policyID = '11111',
					fixture = getFixture('legal-hold-policies/get_legal_hold_policy_assignments_policy_id_200');

				apiMock.get('/2.0/legal_hold_policy_assignments')
					.query({
						policy_id: policyID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.getAssignments(policyID)
					.then(assignments => assert.deepEqual(assignments, JSON.parse(fixture)));
			});
		});

		describe('getAllFileVersionLegalHolds()', function() {
			it('should make GET call to retrieve legal holds', function() {

				var policyID = '11111',
					fixture = getFixture('legal-hold-policies/get_file_version_legal_holds_200');

				apiMock.get('/2.0/file_version_legal_holds')
					.query({
						policy_id: policyID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.getAllFileVersionLegalHolds(policyID)
					.then(holds => assert.deepEqual(holds, JSON.parse(fixture)));
			});
		});

		describe('getFileVersionLegalHold()', function() {
			it('should make GET call to retrieve legal hold', function() {

				var holdID = '99999',
					fixture = getFixture('legal-hold-policies/get_file_version_legal_holds_200');

				apiMock.get(`/2.0/file_version_legal_holds/${holdID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.legalHoldPolicies.getFileVersionLegalHold(holdID)
					.then(hold => assert.deepEqual(hold, JSON.parse(fixture)));
			});
		});

		describe('deleteAssignment()', function() {
			it('should make DELETE call to delete assignment', function() {

				var assignmentID = '12345';

				apiMock.delete(`/2.0/legal_hold_policy_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.legalHoldPolicies.deleteAssignment(assignmentID)
					.then(result => assert.isUndefined(result));
			});
		});

	});

	describe('Collaboration Whitelists', function() {
		describe('addDomain()', function() {
			it('should make a post request to create a domain collaboration whitelisting', function() {
				var postFixture = getFixture('collaboration-whitelists/post_collaboration_whitelists_200'),
					domain = 'test.com',
					direction = 'both',
					expectedPostBody = {
						domain: 'test.com',
						direction: 'both'
					};

				apiMock.post('/2.0/collaboration_whitelist_entries', expectedPostBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, postFixture);

				return basicClient.collaborationWhitelist.addDomain(domain, direction)
					.then(collabWhitelist => {
						assert.deepEqual(collabWhitelist, JSON.parse(postFixture));
					});
			});
		});

		describe('addExemption()', function() {
			it('should make a post request to add user to exempt target list', function() {
				var postFixture = getFixture('collaboration-whitelists/post_collaboration_exempt_targets_200'),
					userID = '5678',
					expectedPostBody = {
						user: {
							id: userID,
							type: 'user'
						}
					};

				apiMock.post('/2.0/collaboration_whitelist_exempt_targets', expectedPostBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, postFixture);

				return basicClient.collaborationWhitelist.addExemption(userID)
					.then(collabWhitelist => {
						assert.deepEqual(collabWhitelist, JSON.parse(postFixture));
					});
			});
		});

		describe('getAllWhitelistedDomains()', function() {
			it('should make GET request to get whitelisted domains', function() {
				var fixture = getFixture('collaboration-whitelists/get_collaboration_whitelist_entries_200');

				apiMock.get('/2.0/collaboration_whitelist_entries')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.collaborationWhitelist.getAllWhitelistedDomains()
					.then(collabWhitelist => {
						assert.deepEqual(collabWhitelist, JSON.parse(fixture));
					});
			});
		});

		describe('getWhitelistedDomain()', function() {
			it('should make GET request to fetch whitelisted domain', function() {
				var fixture = getFixture('collaboration-whitelists/get_collaboration_whitelist_entries_id_200'),
					whitelistEntryID = '11111';

				apiMock.get(`/2.0/collaboration_whitelist_entries/${whitelistEntryID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.collaborationWhitelist.getWhitelistedDomain(whitelistEntryID)
					.then(collabWhitelist => {
						assert.deepEqual(collabWhitelist, JSON.parse(fixture));
					});
			});
		});

		describe('removeDomain()', function() {
			it('should make DELETE call to remove domain from whitelist', function() {

				var whitelistEntryID = '11111';

				apiMock.delete(`/2.0/collaboration_whitelist_entries/${whitelistEntryID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.collaborationWhitelist.removeDomain(whitelistEntryID)
					.then(value => {
						assert.isUndefined(value);
					});
			});
		});

		describe('getAllExemptions()', function() {
			it('should make GET call to fetch whitelist exemptions', function() {

				var fixture = getFixture('collaboration-whitelists/get_collaboration_whitelist_exempt_targets_200');

				apiMock.get('/2.0/collaboration_whitelist_exempt_targets')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.collaborationWhitelist.getAllExemptions()
					.then(exemptions => {
						assert.deepEqual(exemptions, JSON.parse(fixture));
					});
			});
		});

		describe('getExemption()', function() {
			it('should make GET call to fetch whitelist exemptions', function() {

				var fixture = getFixture('collaboration-whitelists/get_collaboration_whitelist_exempt_targets_200'),
					exemptionID = '11111';

				apiMock.get(`/2.0/collaboration_whitelist_exempt_targets/${exemptionID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.collaborationWhitelist.getExemption(exemptionID)
					.then(exemption => {
						assert.deepEqual(exemption, JSON.parse(fixture));
					});
			});
		});

		describe('removeExemption()', function() {
			it('should make DELETE call to remove domain from whitelist', function() {

				var exemptionID = '11111';

				apiMock.delete(`/2.0/collaboration_whitelist_exempt_targets/${exemptionID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.collaborationWhitelist.removeExemption(exemptionID)
					.then(value => {
						assert.isUndefined(value);
					});
			});
		});
	});

	describe('Terms of Service', function() {
		describe('setUserStatus()', function() {
			it('should make a post request to create user status on terms of service, if conflict update', function() {
				var termsOfServiceID = '1234',
					termsOfServiceUserStatusID = '5678',
					postResponse = getFixture('terms-of-service/post_terms_of_service_user_statuses_409'),
					getResponse = getFixture('terms-of-service/get_terms_of_service_user_statuses_200'),
					putResponse = getFixture('terms-of-service/put_terms_of_service_user_statuses_200'),
					user = {
						id: '7777',
						type: 'user'
					},
					expectedPostBody = {
						tos: {
							id: termsOfServiceID,
							type: 'terms_of_service'
						},
						user,
						is_accepted: true
					},
					expectedPutBody = {
						is_accepted: true
					};


				apiMock.post('/2.0/terms_of_service_user_statuses', expectedPostBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(409, postResponse);

				apiMock.get('/2.0/terms_of_service_user_statuses')
					.query({tos_id: termsOfServiceID, user_id: user.id, fields: 'id'})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, getResponse);

				apiMock.put(`/2.0/terms_of_service_user_statuses/${termsOfServiceUserStatusID}`, expectedPutBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, putResponse);

				return basicClient.termsOfService.setUserStatus(termsOfServiceID, true, {user_id: user.id})
					.then(tosUserStatus => {
						assert.deepEqual(tosUserStatus, JSON.parse(putResponse));
					});
			});
		});
	});

	describe('Metadata', function() {

		describe('getTemplateSchema()', function() {
			it('should make GET call to retrieve template', function() {

				var scope = 'enterprise',
					templateKey = 'testTemplate',
					fixture = getFixture('metadata/get_metadata_templates_scope_template_schema_200');

				apiMock.get(`/2.0/metadata_templates/${scope}/${templateKey}/schema`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.metadata.getTemplateSchema(scope, templateKey)
					.then(template => assert.deepEqual(template, JSON.parse(fixture)));
			});
		});

		describe('getTemplateByID()', function() {

			it('should make GET call for template information and return correct result when API call succeeds', function() {

				var templateID = '3964ca73-cc23-4e92-96b8-744bdda81db0',
					fixture = getFixture('metadata/get_metadata_templates_id_200');

				apiMock.get(`/2.0/metadata_templates/${templateID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.metadata.getTemplateByID(templateID)
					.then(template => {
						assert.deepEqual(template, JSON.parse(fixture));
					});
			});
		});

		describe('getTemplates()', function() {

			it('should make GET call for template information and return correct result when API call succeeds', function() {

				var scope = 'enterprise',
					fixture = getFixture('metadata/get_metadata_templates_scope_200');

				apiMock.get(`/2.0/metadata_templates/${scope}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.metadata.getTemplates(scope)
					.then(templates => {
						assert.deepEqual(templates, JSON.parse(fixture));
					});
			});
		});

		describe('createTemplate()', function() {
			it('should make POST call to create template', function() {

				var scope = 'enterprise',
					displayName = 'New Metadata Template',
					fixture = getFixture('metadata/post_metadata_templates_schema_201');

				var expectedBody = {
					scope,
					displayName,
					templateKey: 'newMetadata',
					fields: [
						{
							type: 'string',
							displayName: 'Name'
						},
						{
							type: 'enum',
							displayName: 'Location',
							options: [
								{ key: 'US' },
								{ key: 'EU' }
							]
						},
						{
							type: 'date',
							displayName: 'Date'
						}
					],
					hidden: true
				};

				apiMock.post('/2.0/metadata_templates/schema')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				var options = {
					hidden: true,
					templateKey: 'newMetadata'
				};
				return basicClient.metadata.createTemplate(displayName, expectedBody.fields, options)
					.then(template => assert.deepEqual(template, JSON.parse(fixture)));
			});
		});

		describe('deleteTemplate()', function() {

			it('should make DELETE call to delete template', function() {

				var scope = 'enterprise',
					templateKey = 'testTemplate';

				apiMock.delete(`/2.0/metadata_templates/${scope}/${templateKey}/schema`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.metadata.deleteTemplate(scope, templateKey)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getCascadePolicies()', function() {

			it('should make GET call for cascade policies for folder', function() {

				var folderID = '22222',
					fixture = getFixture('metadata/get_metadata_cascade_policies_folder_id_200');

				apiMock.get('/2.0/metadata_cascade_policies')
					.query({ folder_id: folderID })
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.metadata.getCascadePolicies(folderID)
					.then(policies => {
						assert.deepEqual(policies, JSON.parse(fixture));
					});
			});
		});

		describe('getCascadePolicy()', function() {

			it('should make GET call for policy information and return correct result when API call succeeds', function() {

				var policyID = '84113349-794d-445c-b93c-d8481b223434',
					fixture = getFixture('metadata/get_metadata_cascade_policies_id_200');

				apiMock.get(`/2.0/metadata_cascade_policies/${policyID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.metadata.getCascadePolicy(policyID)
					.then(policy => {
						assert.deepEqual(policy, JSON.parse(fixture));
					});
			});
		});

		describe('createCascadePolicy()', function() {

			it('should make POST call to create cascade policy', function() {

				var folderID = '22222',
					scope = 'enterprise',
					templateKey = 'testTemplate',
					fixture = getFixture('metadata/post_metadata_cascade_policies_201');

				var expectedBody = {
					folder_id: folderID,
					scope,
					templateKey
				};

				apiMock.post('/2.0/metadata_cascade_policies', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.metadata.createCascadePolicy(scope, templateKey, folderID)
					.then(policy => {
						assert.deepEqual(policy, JSON.parse(fixture));
					});
			});
		});

		describe('deleteCascadePolicy()', function() {

			it('should make DELETE call to delete cascade policy', function() {

				var policyID = '84113349-794d-445c-b93c-d8481b223434';

				apiMock.delete(`/2.0/metadata_cascade_policies/${policyID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.metadata.deleteCascadePolicy(policyID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('forceApplyCascadePolicy()', function() {

			it('should make POST call to apply cascade policy', function() {

				var policyID = '84113349-794d-445c-b93c-d8481b223434',
					resolutionMethod = basicClient.metadata.cascadeResolution.PRESERVE_EXISTING;

				var expectedBody = {
					conflict_resolution: 'none'
				};

				apiMock.post(`/2.0/metadata_cascade_policies/${policyID}/apply`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(202);


				return basicClient.metadata.forceApplyCascadePolicy(policyID, resolutionMethod)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('query()', function() {

			it('should make POST call to query items based on their metadata and return correct result when API call succeeds', function() {

				var from = 'enterprise_12345.someTemplate',
					query = 'amount >= :arg',
					queryParams = {
						arg: 100
					},
					ancestorFolderId = '5555',
					useIndex = 'amountAsc',
					orderBy = [
						{
							field_key: 'amount',
							direction: 'asc'
						}
					],
					limit = 100,
					fixture = getFixture('metadata/post_metadata_query_200');

				var expectedBody = {
					from,
					query,
					query_params: queryParams,
					ancestor_folder_id: ancestorFolderId,
					use_index: useIndex,
					order_by: orderBy,
					limit
				};

				apiMock.post('/2.0/metadata_queries/execute_read', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				var options = {
					query,
					query_params: queryParams,
					ancestor_folder_id: ancestorFolderId,
					use_index: useIndex,
					order_by: orderBy,
					limit
				};

				return basicClient.metadata.query(from, ancestorFolderId, options)
					.then(items => {
						assert.deepEqual(items, JSON.parse(fixture));
					});
			});

			it('should make POST call to query items based on their metadata using iterators and return correct result when API call succeeds', function() {

				var from = 'enterprise_12345.someTemplate',
					query = 'amount >= :arg',
					queryParams = {
						arg: 100
					},
					ancestorFolderId = '5555',
					useIndex = 'amountAsc',
					orderBy = [
						{
							field_key: 'amount',
							direction: 'asc'
						}
					],
					limit = 1,
					marker = 'AAAAAmVYB1FWec8GH6yWu2nwmanfMh07IyYInaa7DZDYjgO1H4KoLW29vPlLY173OKsci6h6xGh61gG73gnaxoS+o0BbI1/h6le6cikjlupVhASwJ2Cj0tOD9wlnrUMHHw3/ISf+uuACzrOMhN6d5fYrbidPzS6MdhJOejuYlvsg4tcBYzjauP3+VU51p77HFAIuObnJT0ff',
					fixture = getFixture('metadata/post_metadata_query_200'),
					fixture2 = getFixture('metadata/post_metadata_query_200_2');

				var expectedBody = {
					from,
					query,
					query_params: queryParams,
					ancestor_folder_id: ancestorFolderId,
					use_index: useIndex,
					order_by: orderBy,
					limit
				};

				var expectedBody2 = {
					from,
					query,
					query_params: queryParams,
					ancestor_folder_id: ancestorFolderId,
					use_index: useIndex,
					order_by: orderBy,
					limit,
					marker
				};

				apiMock.post('/2.0/metadata_queries/execute_read', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				apiMock.post('/2.0/metadata_queries/execute_read', expectedBody2)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture2);

				var options = {
					query,
					query_params: queryParams,
					ancestor_folder_id: ancestorFolderId,
					use_index: useIndex,
					order_by: orderBy,
					limit
				};

				return iteratorClient.metadata.query(from, ancestorFolderId, options)
					.then(iterator => Promise.all(
						[
							iterator.next(),
							iterator.next()
						]))
					.then(items => {
						var firstItem = items[0].value;
						var secondItem = items[1].value;
						assert.equal(firstItem.item.id, '1617554169109');
						assert.equal(firstItem.item.name, 'My Contract.docx');
						assert.equal(firstItem.item.created_by.name, 'Box Admin');
						assert.equal(firstItem.metadata.enterprise_123456.someTemplate.$parent, 'file_161753469109');
						assert.equal(firstItem.metadata.enterprise_123456.someTemplate.customerName, 'Phoenix Corp');

						assert.equal(secondItem.item.id, '123450');
						assert.equal(secondItem.item.name, '1.jpg');
						assert.equal(secondItem.item.created_by.name, 'Test User');
						assert.equal(secondItem.metadata.enterprise_67890.relayWorkflowInformation.$parent, 'file_123450');
						assert.equal(secondItem.metadata.enterprise_67890.relayWorkflowInformation.workflowName, 'Werk Flow 0');
					});
			});
		});
	});

	describe('Recents Items', function() {

		describe('get()', function() {
			it('should make GET call to retrieve recent items', function() {

				var fixture = getFixture('recent-items/get_recent_items_200');

				apiMock.get('/2.0/recent_items')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.recentItems.get()
					.then(recents => assert.deepEqual(recents, JSON.parse(fixture)));
			});
		});
	});

	describe('Retention Policies', function() {

		describe('create()', function() {
			it('should make POST call to create retention policy', function() {

				var policyName = 'Financial Records',
					policyType = 'finite',
					retentionLength = 365,
					dispositionAction = 'remove_retention',
					fixture = getFixture('retention-policies/post_retention_policies_201');

				var expectedBody = {
					policy_name: policyName,
					policy_type: policyType,
					retention_length: retentionLength,
					disposition_action: dispositionAction
				};

				apiMock.post('/2.0/retention_policies', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				var options = {
					retention_length: retentionLength
				};
				return basicClient.retentionPolicies.create(policyName, policyType, dispositionAction, options)
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('get()', function() {
			it('should make GET call to retreieve policy', function() {

				var policyID = '11111',
					fixture = getFixture('retention-policies/get_retention_policies_id_200');

				apiMock.get(`/2.0/retention_policies/${policyID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.get(policyID)
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update policy', function() {

				var policyID = '11111',
					name = 'Retained Financial Records',
					fixture = getFixture('retention-policies/put_retention_policies_id_200');

				var expectedBody = {
					policy_name: name
				};

				apiMock.put(`/2.0/retention_policies/${policyID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.update(policyID, {policy_name: name})
					.then(policy => assert.deepEqual(policy, JSON.parse(fixture)));
			});
		});

		describe('getAll()', function() {
			it('should make PUT call to retrieve policies', function() {

				var fixture = getFixture('retention-policies/get_retention_policies_200');

				apiMock.get('/2.0/retention_policies')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.getAll()
					.then(policies => assert.deepEqual(policies, JSON.parse(fixture)));
			});
		});

		describe('assign()', function() {
			it('should make POST call to create assignment', function() {

				var policyID = '11111',
					folderID = '22222',
					fixture = getFixture('retention-policies/post_retention_policy_assignments_201');

				var expectedBody = {
					policy_id: policyID,
					assign_to: {
						type: 'folder',
						id: folderID
					}
				};

				apiMock.post('/2.0/retention_policy_assignments', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.retentionPolicies.assign(policyID, 'folder', folderID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignment()', function() {
			it('should make GET call to retrieve assignment', function() {

				var assignmentID = '12345',
					fixture = getFixture('retention-policies/get_retention_policy_assignments_id_200');

				apiMock.get(`/2.0/retention_policy_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.getAssignment(assignmentID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignments()', function() {
			it('should make GET call to retrieve assignments', function() {

				var policyID = '11111',
					fixture = getFixture('retention-policies/get_retention_policies_id_assignments_200');

				apiMock.get(`/2.0/retention_policies/${policyID}/assignments`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.getAssignments(policyID)
					.then(assignments => assert.deepEqual(assignments, JSON.parse(fixture)));
			});
		});

		describe('getAllFileVersionRetentions()', function() {
			it('should make GET call to retrieve retentions', function() {

				var fixture = getFixture('retention-policies/get_file_version_retentions_200');

				apiMock.get('/2.0/file_version_retentions')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.getAllFileVersionRetentions()
					.then(retentions => assert.deepEqual(retentions, JSON.parse(fixture)));
			});
		});

		describe('getFileVersionRetention()', function() {
			it('should make GET call to retrieve retention', function() {

				var retentionID = '444444',
					fixture = getFixture('retention-policies/get_file_version_retentions_200');

				apiMock.get(`/2.0/file_version_retentions/${retentionID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.retentionPolicies.getFileVersionRetention(retentionID)
					.then(retentions => assert.deepEqual(retentions, JSON.parse(fixture)));
			});
		});

	});

	describe('Search', function() {

		describe('query()', function() {
			it('should make GET call to retrieve search results', function() {

				var query = 'Test',
					fixture = getFixture('search/get_search_query_200');

				apiMock.get('/2.0/search')
					.query({ query })
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.search.query(query)
					.then(results => assert.deepEqual(results, JSON.parse(fixture)));
			});
		});

	});

	describe('Shared Items', function() {

		describe('get()', function() {
			it('should make GET call to retrieve shared item', function() {

				var link = 'https://app.box.com/s/qwertyuiopasdfghjklzxcvbnm123456',
					fixture = getFixture('shared-items/get_shared_items_200');

				apiMock.get('/2.0/shared_items')
					.matchHeader('BoxApi', `shared_link=${encodeURIComponent(link)}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.sharedItems.get(link)
					.then(sharedItem => assert.deepEqual(sharedItem, JSON.parse(fixture)));
			});
		});
	});

	describe('Tasks', function() {

		describe('create()', function() {
			it('should make POST call to create task', function() {

				var type = 'file',
					id = '22222',
					message = 'Please review',
					fixture = getFixture('tasks/post_tasks_201');

				var expectedBody = {
					message,
					action: 'review',
					item: { type, id }
				};

				apiMock.post('/2.0/tasks', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.tasks.create(id, { message })
					.then(task => assert.deepEqual(task, JSON.parse(fixture)));
			});
		});

		describe('get()', function() {
			it('should make GET call to retrieve task', function() {

				var taskID = '11111',
					fixture = getFixture('tasks/get_tasks_id_200');

				apiMock.get(`/2.0/tasks/${taskID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.tasks.get(taskID)
					.then(task => assert.deepEqual(task, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update task', function() {

				var taskID = '11111',
					message = 'Could you please review this?',
					fixture = getFixture('tasks/put_tasks_id_200');

				var expectedBody = { message };

				apiMock.put(`/2.0/tasks/${taskID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.tasks.update(taskID, { message })
					.then(task => assert.deepEqual(task, JSON.parse(fixture)));
			});
		});

		describe('delete()', function() {
			it('should make PUT call to update task', function() {

				var taskID = '11111';

				apiMock.delete(`/2.0/tasks/${taskID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.tasks.delete(taskID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('assignByUserID()', function() {
			it('should make POST call to assign task', function() {

				var taskID = '11111',
					userID = '33333',
					fixture = getFixture('tasks/post_task_assignments_201');

				var expectedBody = {
					task: {
						type: 'task',
						id: taskID
					},
					assign_to: {
						id: userID
					}
				};

				apiMock.post('/2.0/task_assignments', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.tasks.assignByUserID(taskID, userID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('assignByEmail()', function() {
			it('should make POST call to assign task', function() {

				var taskID = '11111',
					userEmail = 'testuser@example.com',
					fixture = getFixture('tasks/post_task_assignments_201');

				var expectedBody = {
					task: {
						type: 'task',
						id: taskID
					},
					assign_to: {
						login: userEmail
					}
				};

				apiMock.post('/2.0/task_assignments', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.tasks.assignByEmail(taskID, userEmail)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignment()', function() {
			it('should make GET call to retrieve task assignment', function() {

				var assignmentID = '12345',
					fixture = getFixture('tasks/post_task_assignments_201');

				apiMock.get(`/2.0/task_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.tasks.getAssignment(assignmentID)
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('getAssignments()', function() {
			it('should make GET call to retrieve task assignments', function() {

				var taskID = '11111',
					fixture = getFixture('tasks/get_tasks_id_assignments_200');

				apiMock.get(`/2.0/tasks/${taskID}/assignments`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.tasks.getAssignments(taskID)
					.then(assignments => assert.deepEqual(assignments, JSON.parse(fixture)));
			});
		});

		describe('updateAssignment()', function() {
			it('should make GET call to retrieve task assignments', function() {

				var assignmentID = '12345',
					message = 'Looks good to me!',
					status = 'completed',
					fixture = getFixture('tasks/put_task_assignments_id_200');

				var expectedBody = {
					message,
					resolution_state: status
				};

				apiMock.put(`/2.0/task_assignments/${assignmentID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.tasks.updateAssignment(assignmentID, { message, resolution_state: status })
					.then(assignment => assert.deepEqual(assignment, JSON.parse(fixture)));
			});
		});

		describe('deleteAssignment()', function() {
			it('should make GET call to retrieve task assignments', function() {

				var assignmentID = '12345';

				apiMock.delete(`/2.0/task_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.tasks.deleteAssignment(assignmentID)
					.then(result => assert.isUndefined(result));
			});
		});

	});

	describe('Users', function() {

		describe('get()', function() {
			it('should make GET call to retrieve current user when passed current user constant', function() {

				var fixture = getFixture('users/get_users_me_200');

				apiMock.get('/2.0/users/me')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.users.get(basicClient.CURRENT_USER_ID)
					.then(user => assert.deepEqual(user, JSON.parse(fixture)));
			});
		});

		describe('update()', function() {
			it('should make PUT call to update user', function() {

				var userID = '33333',
					phone = '(555) 555-5555',
					title = 'CEO',
					fixture = getFixture('users/put_users_id_200');

				var expectedBody = {
					phone,
					job_title: title
				};

				apiMock.put(`/2.0/users/${userID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.users.update(userID, { phone, job_title: title })
					.then(user => assert.deepEqual(user, JSON.parse(fixture)));
			});
		});

		describe('delete()', function() {
			it('should make DELETE call to delete user', function() {

				var userID = '44444',
					force = true;

				apiMock.delete(`/2.0/users/${userID}`)
					.query({ force })
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.users.delete(userID, { force })
					.then(result => assert.isUndefined(result));
			});
		});

		describe('getGroupMemberships()', function() {
			it('should make GET call to retrieve memberships for user', function() {

				var	userID = '44444',
					fixture = getFixture('users/get_users_id_memberships_200');

				apiMock.get(`/2.0/users/${userID}/memberships`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.users.getGroupMemberships(userID)
					.then(memberships => assert.deepEqual(memberships, JSON.parse(fixture)));
			});
		});

		describe('getAvatar()', function() {

			it('should make GET request for user avatar and resolve to the image stream', function(done) {

				var	userID = '44444',
					testFilePath = path.resolve(__dirname, './fixtures/1.png'),
					pngStream = fs.createReadStream(testFilePath),
					/* eslint-disable no-sync */
					pngContents = fs.readFileSync(testFilePath),
					/* eslint-enable no-sync */
					fileBuffer = new Buffer(pngContents.length);

				apiMock.get(`/2.0/users/${userID}/avatar`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, pngStream);

				basicClient.users.getAvatar(userID, function(error, stream) {

					assert.ifError(error);

					var position = 0;
					stream.on('data', function(chunk) {
						chunk.copy(fileBuffer, position);
						position += chunk.length;
					});

					stream.on('end', () => {
						var expectedHash = crypto.createHash('sha1').update(pngContents)
							.digest('base64');
						var actualHash = crypto.createHash('sha1').update(fileBuffer)
							.digest('base64');
						// Compare hashes instead of raw bytes because assertion failure output is massive
						assert.equal(actualHash, expectedHash, 'Avatar content did not match expected');
						done();
					});
				});
			});
		});

	});

	describe('Enterprise', function() {

		describe('getUsers()', function() {
			it('should make GET call to retrieve enterprise users', function() {

				var fixture = getFixture('users/get_users_200');

				apiMock.get('/2.0/users')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.enterprise.getUsers()
					.then(users => assert.deepEqual(users, JSON.parse(fixture)));
			});

			it('should make GET call to find app user by external ID when pass external app user ID', function() {

				var externalAppUserID = 'user1234',
					fixture = getFixture('users/get_users_external_app_user_id_200');

				apiMock.get('/2.0/users')
					.query({
						external_app_user_id: externalAppUserID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.enterprise.getUsers({ external_app_user_id: externalAppUserID })
					.then(users => assert.deepEqual(users, JSON.parse(fixture)));
			});
		});

		describe('addUser()', function() {
			it('should make POST call to create enterprise user', function() {

				var name = 'Another Test User',
					login = 'anothertestuser@example.com',
					fixture = getFixture('users/post_users_201');

				var expectedBody = { name, login };

				apiMock.post('/2.0/users', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.enterprise.addUser(login, name)
					.then(user => assert.deepEqual(user, JSON.parse(fixture)));
			});
		});

		describe('addAppUser()', function() {
			it('should make POST call to create app user', function() {

				var name = 'Test App User',
					fixture = getFixture('users/post_users_app_user_201');

				var expectedBody = {
					name,
					is_platform_access_only: true
				};

				apiMock.post('/2.0/users', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.enterprise.addAppUser(name)
					.then(user => assert.deepEqual(user, JSON.parse(fixture)));
			});
		});

	});

	describe('Webhooks', function() {

		describe('delete()', function() {
			it('should make DELETE call to delete webhook', function() {

				var webhookID = '11111';

				apiMock.delete(`/2.0/webhooks/${webhookID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.webhooks.delete(webhookID)
					.then(result => assert.isUndefined(result));
			});
		});
	});

	describe('Weblinks', function() {

		describe('delete()', function() {
			it('should make DELETE call to delete weblink', function() {

				var weblinkID = '11111';

				apiMock.delete(`/2.0/web_links/${weblinkID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(204);

				return basicClient.weblinks.delete(weblinkID)
					.then(result => assert.isUndefined(result));
			});
		});

		describe('copy()', function() {
			it('should make POST call to create web link copy', function() {

				var webLinkID = '88888',
					parentFolderID = '0',
					name = 'New Bookmark (1)',
					fixture = getFixture('web-links/post_web_links_id_copy_201');

				var expectedBody = {
					name,
					parent: {
						id: parentFolderID
					}
				};

				apiMock.post(`/2.0/web_links/${webLinkID}/copy`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(201, fixture);

				return basicClient.weblinks.copy(webLinkID, parentFolderID, { name })
					.then(webLink => assert.deepEqual(webLink, JSON.parse(fixture)));
			});
		});

		describe('addToCollection()', function() {
			it('should make PUT call to update web link collections', function() {

				var webLinkID = '88888',
					collectionID = '12345',
					getCollectionsFixture = getFixture('web-links/get_web_links_id_collections_empty_200'),
					putFixture = getFixture('web-links/put_web_links_id_collections_200');

				var expectedBody = {
					collections: [{ id: collectionID }]
				};

				apiMock.get(`/2.0/web_links/${webLinkID}`)
					.query({
						fields: 'collections'
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, getCollectionsFixture)
					.put(`/2.0/web_links/${webLinkID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, putFixture);

				return basicClient.weblinks.addToCollection(webLinkID, collectionID)
					.then(webLink => assert.deepEqual(webLink, JSON.parse(putFixture)));
			});
		});

		describe('removeFromCollection()', function() {
			it('should make PUT call to update web link collections', function() {

				var webLinkID = '88888',
					collectionID = '12345',
					getCollectionsFixture = getFixture('web-links/get_web_links_id_collections_full_200'),
					putFixture = getFixture('web-links/put_web_links_id_collections_200');

				var expectedBody = {
					collections: []
				};

				apiMock.get(`/2.0/web_links/${webLinkID}`)
					.query({
						fields: 'collections'
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, getCollectionsFixture)
					.put(`/2.0/web_links/${webLinkID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, putFixture);

				return basicClient.weblinks.removeFromCollection(webLinkID, collectionID)
					.then(webLink => assert.deepEqual(webLink, JSON.parse(putFixture)));
			});
		});

		describe('move()', function() {
			it('should make PUT call to change web link parent', function() {

				var webLinkID = '88888',
					newParentID = '0',
					fixture = getFixture('web-links/put_web_links_id_parent_200');

				var expectedBody = {
					parent: {
						id: newParentID
					}
				};

				apiMock.put(`/2.0/web_links/${webLinkID}`, expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, fixture);

				return basicClient.weblinks.move(webLinkID, newParentID)
					.then(webLink => assert.deepEqual(webLink, JSON.parse(fixture)));
			});
		});

	});

	describe('Storage Policies', function() {

		describe('get()', function() {

			it('should make GET request for storage policy info and return correct response when API call succeeds', function() {

				var storagePolicyID = '123',
					fixture = getFixture('storage-policies/get_storage_policies_id_200');

				apiMock.get('/2.0/storage_policies/123')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, fixture);

				return basicClient.storagePolicies.get(storagePolicyID)
					.then(storagePolicy => {
						assert.deepEqual(storagePolicy, JSON.parse(fixture));
					});
			});
		});

		describe('getAll()', function() {

			it('should make GET request for storage policies and return correct response when API call succeeds', function() {

				var fixture = getFixture('storage-policies/get_storage_policies_200');

				apiMock.get('/2.0/storage_policies')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, fixture);

				return basicClient.storagePolicies.getAll()
					.then(policies => {
						assert.deepEqual(policies, JSON.parse(fixture));
					});
			});
		});

		describe('createAssignment()', function() {

			it('should make POST call to crate policy assignment and return correct response when API call succeeds', function() {

				var policyID = '123',
					userID = '987654321',
					fixture = getFixture('storage-policies/post_storage_policy_assignments_201');

				apiMock.post('/2.0/storage_policy_assignments', {
					storage_policy: {
						type: 'storage_policy',
						id: policyID
					},
					assigned_to: {
						type: 'user',
						id: userID
					}
				})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(201, fixture);

				return basicClient.storagePolicies.createAssignment(policyID, userID)
					.then(assignment => {
						assert.deepEqual(assignment, JSON.parse(fixture));
					});
			});
		});

		describe('getAssignment()', function() {

			it('should make GET call for assignment info and return correct response when API call succeeds', function() {

				var assignmentID = 'user_987654321',
					fixture = getFixture('storage-policies/get_storage_policy_assignments_id_200');

				apiMock.get(`/2.0/storage_policy_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, fixture);

				return basicClient.storagePolicies.getAssignment(assignmentID)
					.then(assignment => {
						assert.deepEqual(assignment, JSON.parse(fixture));
					});
			});
		});

		describe('getAssignmentForTarget()', function() {

			it('should make GET call for assignment info and return correct response when API call succeeds', function() {

				var userID = '987654321',
					fixture = getFixture('storage-policies/get_storage_policy_assignments_resolved_for_200');

				apiMock.get('/2.0/storage_policy_assignments')
					.query({
						resolved_for_type: 'user',
						resolved_for_id: userID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, fixture);

				return basicClient.storagePolicies.getAssignmentForTarget(userID)
					.then(assignment => {
						assert.deepEqual(assignment, JSON.parse(fixture).entries[0]);
					});
			});
		});

		describe('updateAssignment', function() {

			it('should make PUT call to update assignment and return correct response when API call succeeds', function() {

				var assignmentID = 'user_987654321',
					newPolicyID = '456',
					fixture = getFixture('storage-policies/get_storage_policy_assignments_id_200');

				var update = {
					storage_policy: {
						type: 'storage_policy',
						id: newPolicyID
					}
				};

				apiMock.put(`/2.0/storage_policy_assignments/${assignmentID}`, update)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, fixture);

				return basicClient.storagePolicies.updateAssignment(assignmentID, update)
					.then(updatedAssignment => {
						assert.deepEqual(updatedAssignment, JSON.parse(fixture));
					});
			});
		});

		describe('removeAssignment()', function() {

			it('should make DELETE call to remove assignment and return empty response when API call succeeds', function() {

				var assignmentID = 'user_987654321';

				apiMock.delete(`/2.0/storage_policy_assignments/${assignmentID}`)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(204);

				return basicClient.storagePolicies.removeAssignment(assignmentID)
					.then(data => {
						assert.isUndefined(data);
					});
			});
		});

		describe('assign()', function() {

			it('should make PUT call to update assignment when assignment already exists', function() {

				var storagePolicyID = '456',
					userID = '987654321',
					getAssignmentFixture = getFixture('storage-policies/get_storage_policy_assignments_resolved_for_200'),
					putFixture = getFixture('storage-policies/put_storage_policy_assignments_id_200'),
					assignmentID = JSON.parse(getAssignmentFixture).entries[0].id;

				var update = {
					storage_policy: {
						type: 'storage_policy',
						id: storagePolicyID
					}
				};

				apiMock.get('/2.0/storage_policy_assignments')
					.query({
						resolved_for_type: 'user',
						resolved_for_id: userID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, getAssignmentFixture)
					.put(`/2.0/storage_policy_assignments/${assignmentID}`, update)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, putFixture);

				return basicClient.storagePolicies.assign(storagePolicyID, userID)
					.then(assignment => {
						assert.deepEqual(assignment, JSON.parse(putFixture));
					});
			});

			it('should make POST call to create assignment when one does not already exist', function() {

				var storagePolicyID = '456',
					userID = '987654321',
					getAssignmentFixture = getFixture('storage-policies/get_storage_policy_assignments_resolved_for_default_200'),
					postFixture = getFixture('storage-policies/post_storage_policy_assignments_201');

				var expectedBody = {
					storage_policy: {
						type: 'storage_policy',
						id: storagePolicyID
					},
					assigned_to: {
						type: 'user',
						id: userID
					}
				};

				apiMock.get('/2.0/storage_policy_assignments')
					.query({
						resolved_for_type: 'user',
						resolved_for_id: userID
					})
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(200, getAssignmentFixture)
					.post('/2.0/storage_policy_assignments', expectedBody)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, `Bearer ${TEST_ACCESS_TOKEN}`);
						return true;
					})
					.reply(201, postFixture);

				return basicClient.storagePolicies.assign(storagePolicyID, userID)
					.then(assignment => {
						assert.deepEqual(assignment, JSON.parse(postFixture));
					});
			});
		});
	});
});
