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

		apiMock.defaultReplyHeaders({
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

	describe('Comments', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var commentID = '123456789',
					fixture = getFixture('comments/get_comments_id_200');

				apiMock.get('/2.0/comments/' + commentID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.put('/2.0/comments/' + commentID, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.delete('/2.0/comments/' + commentID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

	describe('Files', function() {

		describe('get()', function() {

			it('should make correct request and correctly parse response when API call is successful', function(done) {

				var fileID = '1234567890',
					fixture = getFixture('files/get_files_id_200');

				apiMock.get('/2.0/files/' + fileID)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.get('/2.0/files/' + fileID + '/content')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.get('/2.0/files/' + fileID + '/content')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
						return true;
					})
					.matchHeader('User-Agent', function(uaHeader) {
						assert.include(uaHeader, 'Box Node.js SDK v');
						return true;
					})
					.reply(200, () => fileStream);

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

				apiMock.get('/2.0/files/' + fileID + '/thumbnail.png')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.get('/2.0/files/' + fileID + '/comments')
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

				apiMock.put('/2.0/files/' + fileID, options)
					.matchHeader('Authorization', function(authHeader) {
						assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
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

	});
});
