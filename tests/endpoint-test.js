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
	return fs.readFileSync(path.resolve(__dirname, `fixtures/endpoints/${fixture}.json`));
}

describe('Endpoint', function() {

	// ------------------------------------------------------------------------------
	// Setup
	// ------------------------------------------------------------------------------
	var sandbox = sinon.sandbox.create();

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
		basicClient;

	beforeEach(function() {
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

		describe('assign()', function() {

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

				return basicClient.storagePolicies.assign(policyID, userID)
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
						assert.deepEqual(assignment, JSON.parse(fixture));
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
	});
});
