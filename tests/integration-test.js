/**
 * @fileoverview Box SDK Node Integration Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	mockery = require('mockery'),
	http = require('http'),
	leche = require('leche'),
	sinon = require('sinon'),
	nock = require('nock'),
	fs = require('fs'),
	path = require('path'),
	crypto = require('crypto'),
	request = require('request'),
	jwt = require('jsonwebtoken');

describe('Box Node SDK', function() {

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
		BoxSDK;

	beforeEach(function() {
		apiMock = nock(TEST_API_ROOT);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		BoxSDK = require(MODULE_FILE_PATH);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
		nock.cleanAll();
	});

	it('should issue correct request to the API when basic client manager function is called', function(done) {

		var folderID = '98740596456',
			folderName = 'Test Folder';

		apiMock.get('/2.0/folders/' + folderID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.include(uaHeader, 'Box Node.js SDK v');
				return true;
			})
			.matchHeader('Accept-Encoding', function(header) {
				assert.equal(header, 'gzip');
				return true;
			})
			.reply(200, {
				id: folderID,
				name: folderName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			request: {
				headers: {
					'Accept-Encoding': 'gzip'
				}
			}
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		client.folders.get(folderID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', folderID);
			assert.propertyVal(data, 'name', folderName);
			done();
		});

	});

	it('should return promise when basic client manager function is called', function() {

		var folderID = '98740596456',
			folderName = 'Test Folder';

		apiMock.get('/2.0/folders/' + folderID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.include(uaHeader, 'Box Node.js SDK v');
				return true;
			})
			.matchHeader('Accept-Encoding', function(header) {
				assert.equal(header, 'gzip');
				return true;
			})
			.reply(200, {
				id: folderID,
				name: folderName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			request: {
				headers: {
					'Accept-Encoding': 'gzip'
				}
			}
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		return client.folders.get(folderID)
			.catch(err => {
				assert.ifError(err);
			})
			.then(data => {
				assert.propertyVal(data, 'id', folderID);
				assert.propertyVal(data, 'name', folderName);
			});
	});

	it('should fire response event when response comes back from the API', function(done) {

		var apiResponse = {
			id: '1234',
			name: 'Test Folder II',
			parent: null
		};

		apiMock.get('/2.0/folders/1234').reply(200, apiResponse);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		sdk.on('response', function(err, response) {

			assert.ifError(err);
			assert.instanceOf(response, http.IncomingMessage);
			done();
		});

		client.folders.get('1234', {}, function() {});
	});

	it('should get anonymous tokens and make API call when anonymous client manager is used', function(done) {

		var fileID = '98740596456',
			fileName = 'Test Document.pdf',
			sharedLink = 'https://app.box.com/s/dhfkuagdjfhashfbshd';

		apiMock
			.post('/oauth2/token', {
				grant_type: 'client_credentials',
				client_id: TEST_CLIENT_ID,
				client_secret: TEST_CLIENT_SECRET
			})
			.reply(200, {
				access_token: TEST_ACCESS_TOKEN,
				expires_in: 256
			})
			.get('/2.0/files/' + fileID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('BoxApi', function(boxHeader) {
				assert.equal(boxHeader, 'shared_link=' + encodeURIComponent(sharedLink));
				return true;
			})
			.reply(200, {
				id: fileID,
				name: fileName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getAnonymousClient();
		client.setSharedContext(sharedLink);

		client.files.get(fileID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', fileID);
			assert.propertyVal(data, 'name', fileName);
			done();
		});

	});

	it('should correctly store tokens and make API call when persistent client manager is called', function(done) {

		var fileID = '98740596456',
			fileName = 'Test Document.pdf',
			tokenStoreFake = leche.create(['read', 'write', 'clear']),
			refreshToken = 'rt',
			ips = ['127.0.0.1', '192.168.1.1'],
			expiredTokenInfo = {
				accessToken: 'expired_at',
				refreshToken: refreshToken,
				acquiredAtMS: Date.now() - 3600000,
				accessTokenTTLMS: 60000
			};

		apiMock
			.post('/oauth2/token', {
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: TEST_CLIENT_ID,
				client_secret: TEST_CLIENT_SECRET
			})
			.reply(200, {
				access_token: TEST_ACCESS_TOKEN,
				refresh_token: 'new_rt',
				expires_in: 256
			})
			.get('/2.0/files/' + fileID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('X-Forwarded-For', function(xffHeader) {
				assert.equal(xffHeader, '127.0.0.1, 192.168.1.1');
				return true;
			})
			.reply(200, {
				id: fileID,
				name: fileName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getPersistentClient(expiredTokenInfo, tokenStoreFake);
		client.setIPs(ips);

		sandbox.mock(tokenStoreFake).expects('write').withArgs(sinon.match({
			accessToken: TEST_ACCESS_TOKEN,
			refreshToken: 'new_rt'
		})).yieldsAsync();

		client.files.get(fileID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', fileID);
			assert.propertyVal(data, 'name', fileName);
			done();
		});
	});

	it('should make API call when persistent client manager is called and correctly match the IP headers for refresh token call', function(done) {

		var fileID = '98740596456',
			fileName = 'Test Document.pdf',
			tokenStoreFake = leche.create(['read', 'write', 'clear']),
			refreshToken = 'rt',
			ips = ['127.0.0.1', '192.168.1.1'],
			expiredTokenInfo = {
				accessToken: 'expired_at',
				refreshToken: refreshToken,
				acquiredAtMS: Date.now() - 3600000,
				accessTokenTTLMS: 60000
			};

		apiMock
			.post('/oauth2/token', {
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: TEST_CLIENT_ID,
				client_secret: TEST_CLIENT_SECRET
			}).matchHeader('X-Forwarded-For', function(xffHeader) {
				assert.equal(xffHeader, '127.0.0.1, 192.168.1.1');
				return true;
			}).reply(200, {
				access_token: TEST_ACCESS_TOKEN,
				refresh_token: 'new_rt',
				expires_in: 256
			})
			.get('/2.0/files/' + fileID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('X-Forwarded-For', function(xffHeader) {
				assert.equal(xffHeader, '127.0.0.1, 192.168.1.1');
				return true;
			})
			.reply(200, {
				id: fileID,
				name: fileName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getPersistentClient(expiredTokenInfo, tokenStoreFake);
		client.setIPs(ips);

		sandbox.mock(tokenStoreFake).expects('write').withArgs(sinon.match({
			accessToken: TEST_ACCESS_TOKEN,
			refreshToken: 'new_rt'
		})).yieldsAsync();

		client.files.get(fileID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', fileID);
			assert.propertyVal(data, 'name', fileName);
			done();
		});
	});

	it('should correctly store tokens and make API call when app auth client manager is called', function(done) {

		var userID = '34876458977987',
			userName = 'Pnin',
			algorithm = 'RS256',
			keyID = 'ltf64zjk',
			passphrase = 'Test secret key';

		// @NOTE(mwiller) 2016-04-12: This is an actual generated RSA key, so the key
		//   parameters are actually meaningful and will cause the test to fail if
		//   they change!
		/* eslint-disable no-sync */
		var privateKey = fs.readFileSync(path.resolve(__dirname, 'fixtures/appusers_private_key.pem'));
		/* eslint-enable no-sync */

		apiMock
			.post('/oauth2/token', function(body) {
				assert.propertyVal(body, 'client_id', TEST_CLIENT_ID);
				assert.propertyVal(body, 'client_secret', TEST_CLIENT_SECRET);
				assert.propertyVal(body, 'grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');

				var assertion = jwt.decode(body.assertion, {complete: true});
				assert.nestedPropertyVal(assertion, 'header.alg', algorithm);
				assert.nestedPropertyVal(assertion, 'header.typ', 'JWT');
				assert.nestedPropertyVal(assertion, 'header.kid', keyID);

				assert.nestedPropertyVal(assertion, 'payload.iss', TEST_CLIENT_ID);
				assert.nestedPropertyVal(assertion, 'payload.sub', userID);
				assert.nestedPropertyVal(assertion, 'payload.box_sub_type', 'user');
				assert.nestedPropertyVal(assertion, 'payload.aud', 'https://api.box.com/oauth2/token');
				assert.notProperty(assertion, 'payload.iat');

				return true;
			})
			.reply(200, {
				access_token: TEST_ACCESS_TOKEN,
				expires_in: 256
			})
			.get('/2.0/users/me')
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.reply(200, {
				id: userID,
				name: userName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			appAuth: {
				algorithm: algorithm,
				keyID: keyID,
				privateKey: privateKey,
				passphrase: passphrase
			}
		});

		var client = sdk.getAppAuthClient('user', userID);

		client.users.get(client.CURRENT_USER_ID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', userID);
			assert.propertyVal(data, 'name', userName);
			done();
		});
	});

	it('should correctly exchange tokens when client token exchange is called', function(done) {

		var userID = '34876458977987',
			algorithm = 'RS256',
			keyID = 'ltf64zjk',
			passphrase = 'Test secret key',
			scopes = ['item_preview', 'item_read'],
			resource = 'https://api.box.com/2.0/folders/0';

		var exchangedTokenInfo = {
			access_token: '1!938y4fncqwe8rqwoieo-05oe8ugisuedb8745y45756dfgbdfgu-wrtwergwre5yfdgber623rgfadsftw45yehr-dfg',
			expires_in: 3987,
			token_type: 'bearer',
			restricted_to: [
				{
					scope: 'item_preview,item_read',
					object: {
						type: 'folder',
						id: '0',
						sequence_id: null,
						etag: null,
						name: 'All Files'
					}
				}
			],
			issued_token_type: 'urn:ietf:params:oauth:token-type:access_token'
		};

		// @NOTE(mwiller) 2016-04-12: This is an actual generated RSA key, so the key
		//   parameters are actually meaningful and will cause the test to fail if
		//   they change!
		/* eslint-disable no-sync */
		var privateKey = fs.readFileSync(path.resolve(__dirname, 'fixtures/appusers_private_key.pem'));
		/* eslint-enable no-sync */

		apiMock
			.post('/oauth2/token', function(body) {
				assert.propertyVal(body, 'client_id', TEST_CLIENT_ID);
				assert.propertyVal(body, 'client_secret', TEST_CLIENT_SECRET);
				assert.propertyVal(body, 'grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');

				var assertion = jwt.decode(body.assertion, {complete: true});
				assert.nestedPropertyVal(assertion, 'header.alg', algorithm);
				assert.nestedPropertyVal(assertion, 'header.typ', 'JWT');
				assert.nestedPropertyVal(assertion, 'header.kid', keyID);

				assert.nestedPropertyVal(assertion, 'payload.iss', TEST_CLIENT_ID);
				assert.nestedPropertyVal(assertion, 'payload.sub', userID);
				assert.nestedPropertyVal(assertion, 'payload.box_sub_type', 'user');
				assert.nestedPropertyVal(assertion, 'payload.aud', 'https://api.box.com/oauth2/token');
				assert.notProperty(assertion, 'payload.iat');

				return true;
			})
			.reply(200, {
				access_token: TEST_ACCESS_TOKEN,
				expires_in: 256
			})
			.post('/oauth2/token', function(body) {
				assert.propertyVal(body, 'grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
				assert.propertyVal(body, 'subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
				assert.propertyVal(body, 'subject_token', TEST_ACCESS_TOKEN);
				assert.propertyVal(body, 'resource', resource);
				assert.propertyVal(body, 'scope', scopes.join(' '));

				return true;
			})
			.reply(200, exchangedTokenInfo);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			appAuth: {
				algorithm: algorithm,
				keyID: keyID,
				privateKey: privateKey,
				passphrase: passphrase
			}
		});

		var client = sdk.getAppAuthClient('user', userID);

		client.exchangeToken(scopes, resource, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'accessToken', exchangedTokenInfo.access_token);
			done();
		});
	});

	it('should retry API request when response is a temporary error', function(done) {

		var folderID = '98740596456',
			folderName = 'Test Folder';

		apiMock.get('/2.0/folders/' + folderID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.equal(uaHeader, 'Node.js');
				return true;
			})
			.reply(500) // first request is a temporary error
			.get('/2.0/folders/' + folderID)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.equal(uaHeader, 'Node.js');
				return true;
			})
			.reply(200, { // second request succeeds
				id: folderID,
				name: folderName
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET,
			maxNumRetries: 1,
			retryIntervalMS: 100,
			request: {
				headers: {
					'User-Agent': 'Node.js'
				}
			}
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		client.folders.get(folderID, {}, function(err, data) {

			assert.ifError(err);
			assert.propertyVal(data, 'id', folderID);
			assert.propertyVal(data, 'name', folderName);
			done();
		});
	});

	it('should return file stream when file read stream is requested', function(done) {

		var fileID = '98740596456',
			fileDownloadRoot = 'https://dl.boxcloud.com',
			fileDownloadPath = '/file/lives/here/poem.txt',
			fixturePath = path.resolve(__dirname, 'fixtures/epic-poem.txt'),
			/* eslint-disable no-sync */
			fileContents = fs.readFileSync(fixturePath),
			/* eslint-enable no-sync */
			fileStream = fs.createReadStream(fixturePath),
			dlMock = nock(fileDownloadRoot);

		apiMock.get('/2.0/files/' + fileID + '/content')
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.reply(function() {
				return [
					302,
					'',
					{location: fileDownloadRoot + fileDownloadPath}
				];
			});


		dlMock.get(fileDownloadPath)
			.reply(200, function() {
				return fileStream;
			});

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		client.files.getReadStream(fileID, {}, function(err, data) {

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

	it('should upload file in chunks when chunked upload is requested and run', function(done) {

		var folderID = '0',
			fileSize = 1024,
			fileName = 'foo.txt',
			uploadSessionID = '07C4B58DF2D79928A787CCB99A5FF37E',
			fixturePath = path.resolve(__dirname, 'fixtures/file.txt'),
			/* eslint-disable no-sync */
			fileContents = fs.readFileSync(fixturePath),
			/* eslint-enable no-sync */
			fileStream = fs.createReadStream(fixturePath),
			uploadMock = nock('https://upload.box.com');

		var parts = [
			{
				part_id: '00000001',
				size: 210,
				offset: 0,
				sha1: 'abc'
			},
			{
				part_id: '00000002',
				size: 210,
				offset: 210,
				sha1: 'bcd'
			},
			{
				part_id: '00000003',
				size: 210,
				offset: 420,
				sha1: 'cde'
			},
			{
				part_id: '00000004',
				size: 210,
				offset: 630,
				sha1: 'def'
			},
			{
				part_id: '00000005',
				size: 210,
				offset: 840,
				sha1: 'efa'
			}
		];

		var file = {
			total_count: 1,
			entries: [
				{
					type: 'file',
					id: '12348765',
					name: fileName,
					size: fileSize
				}
			]
		};

		uploadMock.post('/api/2.0/files/upload_sessions',
			function(body) {

				assert.deepEqual(body, {
					folder_id: folderID,
					file_size: fileSize,
					file_name: fileName
				});

				return true;
			})
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.reply(201, {
				total_parts: 5,
				part_size: 210,
				session_endpoints: {
					list_parts: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/parts',
					commit: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/commit',
					log_event: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/log',
					upload_part: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E',
					status: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E',
					abort: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E'
				},
				session_expires_at: '2017-04-25T05:30:23Z',
				id: uploadSessionID,
				type: 'upload_session',
				num_parts_processed: 0
			})
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID,
				function(body) {
					return body.toString() === fileContents.slice(0, 210).toString();
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Content-Type', function(contentTypeHeader) {
				assert.equal(contentTypeHeader, 'application/octet-stream');
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				var expected = crypto.createHash('sha1').update(fileContents.slice(0, 210)).digest('base64');
				return digestHeader === 'SHA=' + expected;
			})
			.matchHeader('Content-Range', function(rangeHeader) {
				assert.equal(rangeHeader, 'bytes 0-209/1024');
				return true;
			})
			.reply(200, {
				part: parts[0]
			})
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID,
				function(body) {
					return body.toString() === fileContents.slice(210, 420).toString();
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Content-Type', function(contentTypeHeader) {
				assert.equal(contentTypeHeader, 'application/octet-stream');
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents.slice(210, 420)).digest('base64'));
				return true;
			})
			.matchHeader('Content-Range', function(rangeHeader) {
				assert.equal(rangeHeader, 'bytes 210-419/1024');
				return true;
			})
			.reply(200, {
				part: parts[1]
			})
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID,
				function(body) {
					return body.toString() === fileContents.slice(420, 630).toString();
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Content-Type', function(contentTypeHeader) {
				assert.equal(contentTypeHeader, 'application/octet-stream');
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents.slice(420, 630)).digest('base64'));
				return true;
			})
			.matchHeader('Content-Range', function(rangeHeader) {
				assert.equal(rangeHeader, 'bytes 420-629/1024');
				return true;
			})
			.reply(200, {
				part: parts[2]
			})
		// @TODO: Add a failure to the test
		// // 4th part has an error
			// .put('/api/2.0/files/upload_sessions/' + uploadSessionID,
			// 	function(body) {
			// 		return body.toString() === fileContents.slice(630, 840).toString();
			// 	}
			// )
			// .matchHeader('Authorization', function(authHeader) {
			// 	assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
			// 	return true;
			// })
			// .matchHeader('Content-Type', function(contentTypeHeader) {
			// 	assert.equal(contentTypeHeader, 'application/octet-stream');
			// 	return true;
			// })
			// .matchHeader('Digest', function(digestHeader) {
			// 	assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents.slice(630, 840)).digest('base64'));
			// 	return true;
			// })
			// .matchHeader('Content-Range', function(rangeHeader) {
			// 	assert.equal(rangeHeader, 'bytes 630-839/1024');
			// 	return true;
			// })
			// .reply(502, 'Server Hung Up')
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID,
				function(body) {
					return body.toString() === fileContents.slice(630, 840).toString();
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Content-Type', function(contentTypeHeader) {
				assert.equal(contentTypeHeader, 'application/octet-stream');
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents.slice(630, 840)).digest('base64'));
				return true;
			})
			.matchHeader('Content-Range', function(rangeHeader) {
				assert.equal(rangeHeader, 'bytes 630-839/1024');
				return true;
			})
			.reply(200, {
				part: parts[3]
			})
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID,
				function(body) {
					return body.toString() === fileContents.slice(840).toString();
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Content-Type', function(contentTypeHeader) {
				assert.equal(contentTypeHeader, 'application/octet-stream');
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents.slice(840)).digest('base64'));
				return true;
			})
			.matchHeader('Content-Range', function(rangeHeader) {
				assert.equal(rangeHeader, 'bytes 840-1023/1024');
				return true;
			})
			.reply(200, {
				part: parts[4]
			})
			.post('/api/2.0/files/upload_sessions/' + uploadSessionID + '/commit',
				function(body) {
					assert.property(body, 'parts');
					assert.typeOf(body.parts, 'array');
					assert.sameDeepMembers(body.parts, parts);

					return true;
				}
			)
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('Digest', function(digestHeader) {
				assert.equal(digestHeader, 'SHA=' + crypto.createHash('sha1').update(fileContents).digest('base64'));
				return true;
			})
			.reply(201, file);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		var seenParts = [];
		client.files.getChunkedUploader(folderID, fileSize, fileName, fileStream, null, function(err, uploader) {

			assert.ifError(err);

			uploader.on('chunkUploaded', chunk => seenParts.push(chunk.part));
			uploader.on('error', sandbox.mock().never());
			uploader.on('chunkError', sandbox.mock().never());
			uploader.on('uploadComplete', data => {

				assert.deepEqual(data, file);
				assert.sameDeepMembers(seenParts, parts);
				done();
			});

			uploader.start();
		});
	});

	it('should send batch request and pass results to individual calls when batch is executed', function() {

		var folderID = '1234',
			fileID = '9876',
			folderName = 'My Test Folder',
			fileName = 'Batch API Test.docx',
			batchResponse = {
				responses: [
					{
						status: 200,
						headers: {},
						response: {
							id: '1234',
							name: folderName
						}
					},
					{
						status: 400,
						headers: {},
						response: {
							type: 'error',
							status: 400,
							code: 'bad_request',
							context_info: {
								errors: [
									{
										reason: 'invalid_parameter',
										name: 'entity-body',
										message: 'Invalid value \'{\n    "name": "\\^&*@(*&^$&^%@()*"\n}\'. Entity body should be a correctly nested resource attribute name/value pair'
									}
								]
							},
							help_url: 'http://developers.box.com/docs/#errors',
							message: 'Bad Request',
							request_id: '273876906598a559f8b3f9'
						}
					}
				]
			};

		apiMock.post('/2.0/batch',
			function(body) {

				assert.isArray(body.requests);
				assert.sameDeepOrderedMembers(body.requests, [
					{
						method: 'GET',
						relative_url: `/folders/${folderID}?fields=name%2Cid`
					},
					{
						method: 'PUT',
						relative_url: '/files/' + fileID,
						body: {
							name: fileName
						}
					}
				]);

				return true;
			})
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.include(uaHeader, 'Box Node.js SDK v');
				return true;
			})
			.reply(200, batchResponse);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		client.batch();
		var folderPromise = client.folders.get(folderID, {fields: 'name,id'})
			.then(folder => {
				assert.propertyVal(folder, 'id', folderID);
				assert.propertyVal(folder, 'name', folderName);
			});
		var filePromise = client.files.update(fileID, {name: fileName})
			.then(() => {
				assert.fail('Client request promise should not resolve on batch subrequest failure');
			})
			.catch(err => {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', 400);
			});
		var batchPromise = client.batchExec()
			.then(results => {
				assert.deepEqual(results, batchResponse);
			});

		return Promise.all([folderPromise, filePromise, batchPromise]);
	});

	it('should send batch request and pass results to individual calls when batch is executed with callbacks', function() {

		var folderID = '1234',
			fileID = '9876',
			folderName = 'My Test Folder',
			fileName = 'Batch API Test.docx',
			batchResponse = {
				responses: [
					{
						status: 200,
						headers: {},
						response: {
							id: '1234',
							name: folderName
						}
					},
					{
						status: 400,
						headers: {},
						response: {
							type: 'error',
							status: 400,
							code: 'bad_request',
							context_info: {
								errors: [
									{
										reason: 'invalid_parameter',
										name: 'entity-body',
										message: 'Invalid value \'{\n    "name": "\\^&*@(*&^$&^%@()*"\n}\'. Entity body should be a correctly nested resource attribute name/value pair'
									}
								]
							},
							help_url: 'http://developers.box.com/docs/#errors',
							message: 'Bad Request',
							request_id: '273876906598a559f8b3f9'
						}
					}
				]
			};

		apiMock.post('/2.0/batch',
			function(body) {

				assert.isArray(body.requests);
				assert.sameDeepOrderedMembers(body.requests, [
					{
						method: 'GET',
						relative_url: `/folders/${folderID}?fields=name%2Cid`
					},
					{
						method: 'PUT',
						relative_url: '/files/' + fileID,
						body: {
							name: fileName
						}
					}
				]);

				return true;
			})
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.matchHeader('User-Agent', function(uaHeader) {
				assert.include(uaHeader, 'Box Node.js SDK v');
				return true;
			})
			.reply(200, batchResponse);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});

		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		client.batch();
		var folderPromise = new Promise(function(resolve) {

			client.folders.get(folderID, {fields: 'name,id'}, function(err, folder) {
				assert.ifError(err);
				assert.propertyVal(folder, 'id', folderID);
				assert.propertyVal(folder, 'name', folderName);
				resolve();
			});
		});
		var filePromise = new Promise(function(resolve) {

			client.files.update(fileID, {name: fileName}, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', 400);
				resolve();
			});
		});
		var batchPromise = new Promise(function(resolve) {

			client.batchExec(function(err, results) {
				assert.ifError(err);
				assert.deepEqual(results, batchResponse);
				resolve();
			});
		});
		return Promise.all([folderPromise, filePromise, batchPromise]);
	});

	it('should correctly upload stream from request module when using chunked uploader', function(done) {

		// This test takes a while to run due to all the bytes being shuffled around,
		// bumping up the timeout so we don't see flaky behavior if it runs long
		this.timeout(4000);

		var filePath = path.resolve(__dirname, './fixtures/test.pdf');
		var uploadSessionID = 'o8qc3n58q73b95ywort2q3t';
		var partCounter = 0;
		var partSize = 8388608;
		var bytesUploaded = 0;

		// eslint-disable-next-line no-sync
		var fileSize = fs.statSync(filePath).size;
		var numParts = Math.ceil(fileSize / partSize);
		var fileName = 'test.pdf';

		var fileResponse = {
			total_count: 1,
			entries: [
				{
					type: 'file',
					id: '12348765',
					name: fileName,
					size: fileSize
				}
			]
		};

		nock('https://www.example.com')
			.get('/test-file.pdf')
			.replyWithFile(200, filePath);

		nock('https://upload.box.com').post('/api/2.0/files/upload_sessions')
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.reply(201, {
				total_parts: numParts,
				part_size: partSize,
				session_endpoints: {
					list_parts: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/parts',
					commit: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/commit',
					log_event: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E/log',
					upload_part: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E',
					status: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E',
					abort: 'https://upload.box.com/api/2.0/files/upload-session/07C4B58DF2D79928A787CCB99A5FF37E'
				},
				session_expires_at: '2017-04-25T05:30:23Z',
				id: uploadSessionID,
				type: 'upload_session',
				num_parts_processed: 0
			})
			.put('/api/2.0/files/upload_sessions/' + uploadSessionID)
			.times(numParts)
			.reply((uri, requestBody) => {
				// requestBody is a hex-encoded string, need to decode to get raw length
				var rawRequestBody = new Buffer(requestBody, 'hex');
				bytesUploaded += rawRequestBody.length;
				var partID = '' + partCounter;
				var response = {
					part: {
						part_id: '' + partCounter,
						offset: partCounter * partSize,
						size: rawRequestBody.length,
						sha1: crypto.createHash('sha1').update(partID).digest('base64')
					}
				};
				partCounter += 1;
				return response;
			})
			.post('/api/2.0/files/upload_sessions/' + uploadSessionID + '/commit')
			.matchHeader('Authorization', function(authHeader) {
				assert.equal(authHeader, 'Bearer ' + TEST_ACCESS_TOKEN);
				return true;
			})
			.reply(201, fileResponse);

		var sdk = new BoxSDK({
			clientID: TEST_CLIENT_ID,
			clientSecret: TEST_CLIENT_SECRET
		});
		var client = sdk.getBasicClient(TEST_ACCESS_TOKEN);

		request.get('https://www.example.com/test-file.pdf').on('response', responseStream => {

			client.files.getChunkedUploader('1234', fileSize, fileName, responseStream)
				.then(uploader => {

					uploader.on('uploadComplete', file => {
						assert.deepEqual(file, fileResponse);
						assert.equal(bytesUploaded, fileSize);
						done();
					});

					uploader.on('error', err => done(err));
					uploader.on('chunkError', err => done(err));

					uploader.start();
				});
		});
	});
});
