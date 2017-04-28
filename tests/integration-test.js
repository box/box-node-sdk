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
				assert.deepPropertyVal(assertion, 'header.alg', algorithm);
				assert.deepPropertyVal(assertion, 'header.typ', 'JWT');
				assert.deepPropertyVal(assertion, 'header.kid', keyID);

				assert.deepPropertyVal(assertion, 'payload.iss', TEST_CLIENT_ID);
				assert.deepPropertyVal(assertion, 'payload.sub', userID);
				assert.deepPropertyVal(assertion, 'payload.box_sub_type', 'user');
				assert.deepPropertyVal(assertion, 'payload.aud', 'https://api.box.com/oauth2/token');
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
});
