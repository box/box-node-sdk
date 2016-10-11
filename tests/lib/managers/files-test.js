/**
 * @fileoverview Files Manager Tests
 * @author fschott
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	Files,
	files,
	testQS = { testQSKey: 'testQSValue' },
	testBody = { my: 'body' },
	testParamsWithBody,
	testParamsWithQs,
	FILE_ID = '1234',
	FILE_VERSION_ID = '5678',
	MODULE_FILE_PATH = '../../../lib/managers/files';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Files', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		testParamsWithBody = {body: testBody};
		testParamsWithQs = {qs: testQS};
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('util');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
		Files = require(MODULE_FILE_PATH);
		files = new Files(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {
		it('should make GET request to get file info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234', testParamsWithQs);
			files.get(FILE_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/files/1234', testParamsWithQs).yieldsAsync();
			files.get(FILE_ID, testQS, done);
		});
	});

	describe('getDownloadURL()', function() {

		it('should make GET request to get file download when called', function() {
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs);
			files.getDownloadURL(FILE_ID, testQS);
		});

		it('should return the download URL when a 302 FOUND response is returned', function(done) {
			var response = {
				statusCode: 302,
				headers: {
					location: 'box.com/somedownloadurl'
				}
			};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/1234/content', testParamsWithQs).yieldsAsync(null, response);
			files.getDownloadURL(FILE_ID, testQS, function(err, location) {
				assert.ifError(err);
				assert.strictEqual(location, response.headers.location, 'location header is returned');
				done();
			});
		});

		it('should return an error when a 202 ACCEPTED response is returned', function(done) {
			var response = {statusCode: 202};

			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs).yieldsAsync(null, response);
			files.getDownloadURL(FILE_ID, testQS, function(err) {
				assert.instanceOf(err, Error);
				assert.strictEqual(err.statusCode, response.statusCode);
				done();
			});
		});

		it('should return an error when the API call does not succeed', function(done) {

			var apiError = new Error('ECONNRESET');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs).yieldsAsync(apiError);

			files.getDownloadURL(FILE_ID, testQS, function(err) {
				assert.equal(err, apiError);
				done();
			});
		});

		it('should return unexpected response error when the API returns unknown status code', function(done) {
			var response = {statusCode: 403};

			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs).yieldsAsync(null, response);
			files.getDownloadURL(FILE_ID, testQS, function(err) {
				assert.instanceOf(err, Error);
				assert.strictEqual(err.statusCode, response.statusCode);
				done();
			});
		});
	});

	describe('getReadStream()', function() {

		it('should make a GET request to the box client', function() {
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs);
			files.getReadStream(FILE_ID, testQS);
		});

		it('should make a request with the URL returned from getDownloadURL when a 302 FOUND response is returned', function(done) {
			var dlURL = 'https://dl.boxcloud.com/rawfile',
				streamFake = {on: sandbox.stub()};

			sandbox.stub(files, 'getDownloadURL').yieldsAsync(null, dlURL);
			sandbox.mock(boxClientFake).expects('get').withArgs(dlURL, sinon.match({streaming: true})).yieldsAsync(null, streamFake);
			files.getReadStream(FILE_ID, testQS, function(err, stream) {
				assert.ifError(err);
				assert.equal(stream, streamFake);
				done();
			});
		});

		it('should return an error when a 202 ACCEPTED response is returned', function(done) {
			var response = {statusCode: 202};

			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getReadStream(FILE_ID, testQS, function(err) {
				assert.ok(err);
				done();
			});
		});
	});

	describe('getThumbnail()', function() {

		var expectedThumbnailParams = {qs: testQS, json: false};

		it('should make GET request to get file download when called', function() {
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/thumbnail.png', expectedThumbnailParams);
			files.getThumbnail(FILE_ID, testQS);
		});

		it('should return the thumbnail file when a 200 OK response is returned', function(done) {
			var fileData = 'thisistheimagefile! 0101010110111011',
				response = {statusCode: 200, body: fileData};

			sandbox.stub(boxClientFake, 'get')
				.withArgs('/files/1234/thumbnail.png', expectedThumbnailParams)
				.yieldsAsync(null, response);

			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ok(!err);
				assert.deepEqual(data, { statusCode: 200, file: fileData});
				done();
			});
		});

		it('should return a placeholder location when a 202 ACCEPTED response is returned', function(done) {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 202,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/1234/thumbnail.png', expectedThumbnailParams).yieldsAsync(null, response);
			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ok(!err);
				assert.deepEqual(data, { statusCode: 202, location: placeholderURL});
				done();
			});
		});

		it('should return a placeholder location when a 302 FOUND response is returned', function(done) {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 302,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/1234/thumbnail.png', expectedThumbnailParams).yieldsAsync(null, response);
			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ok(!err);
				assert.deepEqual(data, { statusCode: 302, location: placeholderURL});
				done();
			});
		});

		it('should return an error when the API call fails', function(done) {

			var apiError = new Error(':[');
			sandbox.stub(boxClientFake, 'get').yieldsAsync(apiError);
			files.getThumbnail(FILE_ID, testQS, function(err) {
				assert.equal(err, apiError);
				done();
			});
		});

		it('should return unexpected response error when the API returns unknown status code', function(done) {

			var response = {statusCode: 403};

			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);

			files.getThumbnail(FILE_ID, testQS, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});
	});

	describe('getComments()', function() {
		it('should make GET request to get file info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/comments', testParamsWithQs);
			files.getComments(FILE_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/files/1234/comments', testParamsWithQs).yieldsAsync();
			files.getComments(FILE_ID, testQS, done);
		});
	});

	describe('update()', function() {
		it('should make PUT request to update file info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234', testParamsWithBody);
			files.update(FILE_ID, testBody);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/files/1234', testParamsWithBody).yieldsAsync();
			files.update(FILE_ID, testBody, done);
		});
	});

	describe('copy()', function() {

		var NEW_PARENT_ID = '23434qtges4TEST',
			expectedParams = {
				body: {
					parent: {
						id: NEW_PARENT_ID
					}
				}
			};

		it('should make POST request to copy the folder when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/copy', expectedParams);
			files.copy(FILE_ID, NEW_PARENT_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withExactArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/files/1234/copy').yieldsAsync();
			files.copy(FILE_ID, NEW_PARENT_ID, done);
		});

		it('should call the defaultResponseHandler wrapped callback when response is returned', function(done) {
			var callbackMock = sandbox.mock().never();
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withExactArgs(callbackMock).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/files/1234/copy').yieldsAsync();
			files.copy(FILE_ID, NEW_PARENT_ID, callbackMock);
		});
	});

	describe('move()', function() {

		var NEW_PARENT_ID = '32592395test',
			expectedParams = {
				body: {
					parent: {
						id: NEW_PARENT_ID
					}
				}
			};

		it('should make PUT request to update the file parent ID when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234', expectedParams);
			files.move(FILE_ID, NEW_PARENT_ID);
		});

		it('should call the defaultResponseHandler wrapped callback when response is returned', function(done) {
			var callbackMock = sandbox.mock().never();
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withExactArgs(callbackMock).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/files/1234').yieldsAsync();
			files.move(FILE_ID, testBody, callbackMock);
		});

	});


	describe('delete()', function() {
		it('should make DELETE request to update file info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/1234', null);
			files.delete(FILE_ID);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/files/1234', null).yieldsAsync();
			files.delete(FILE_ID, done);
		});
	});

	describe('prelightUploadFile()', function() {

		var parentFolderID,
			fileData,
			uploadsQS,
			uploadsBody,
			expectedParams;

		beforeEach(function() {
			parentFolderID = '2345';
			fileData = {size: 1234};
			uploadsQS = {create_uploads_token: true};
			uploadsBody = {
				parent: {
					id: parentFolderID
				},
				size: 1234
			};
			expectedParams = {
				qs: uploadsQS,
				body: uploadsBody
			};
		});

		it('should make an OPTIONS request to prepare and validate a file uploads when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('options').withArgs('/files/content', expectedParams);
			files.preflightUploadFile(parentFolderID, fileData, uploadsQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'options').withArgs('/files/content').yieldsAsync();
			files.preflightUploadFile(parentFolderID, fileData, uploadsQS, done);
		});
	});

	describe('preflightUploadNewFileVersion()', function() {

		var fileID,
			fileData,
			uploadsQS,
			expectedParams;

		beforeEach(function() {
			fileID = '2345';
			fileData = {size: 1234};
			uploadsQS = {create_uploads_token: true};
			expectedParams = {
				qs: uploadsQS,
				body: fileData
			};
		});

		it('should make an OPTIONS request to prepare and validate a file new version uploads when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('options').withArgs('/files/2345/content', expectedParams);
			files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'options').withArgs('/files/2345/content').yieldsAsync();
			files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS, done);
		});
	});

	describe('deleteVersion()', function() {

		it('should make DELETE request to delete a file version to the trash', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/versions/' + FILE_VERSION_ID, null);
			files.deleteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/files/' + FILE_ID + '/versions/' + FILE_VERSION_ID).yieldsAsync();
			files.deleteVersion(FILE_ID, FILE_VERSION_ID, done);
		});
	});

	describe('uploadFile()', function() {

		var PARENT_FOLDER_ID = '123',
			FILENAME = 'abc.txt',
			CONTENT = new Buffer('someContent');

		it('should call BoxClient.upload() with the correct non-callback params', function() {
			var expectedFormData = {
				attributes: JSON.stringify({
					name: FILENAME,
					parent: { id: PARENT_FOLDER_ID }
				}),
				content: {
					value: CONTENT,
					options: { filename: 'unused' }
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('upload').withArgs('/files/content', null, expectedFormData);
			files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT, sandbox.stub());
		});

		it('should wrap the given callback (without calling it) using BoxClient.defaultResponseHandler() and pass the wrapped callback to BoxClient.upload()', function() {
			var filesCallbackMock = sandbox.mock().never(),
				boxClientCallbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake).expects('defaultResponseHandler')
				.withExactArgs(filesCallbackMock)
				.returns(boxClientCallbackMock);

			sandbox.mock(boxClientFake).expects('upload')
				.withExactArgs(sinon.match.any, sinon.match.any, sinon.match.any, boxClientCallbackMock);

			files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT, filesCallbackMock);
		});
	});

	describe('uploadNewFileVersion()', function() {

		var CONTENT = new Buffer('someContent');

		it('should call BoxClient.upload() with the correct non-callback params', function() {
			var expectedFormData = {
				content: {
					value: CONTENT,
					options: { filename: 'unused' }
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('upload').withArgs('/files/1234/content', null, expectedFormData);
			files.uploadNewFileVersion(FILE_ID, CONTENT, sandbox.stub());
		});

		it('should wrap the given callback (without calling it) using BoxClient.defaultResponseHandler() and pass the wrapped callback to BoxClient.upload()', function() {
			var filesCallbackMock = sandbox.mock().never(),
				boxClientCallbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake).expects('defaultResponseHandler')
				.withExactArgs(filesCallbackMock)
				.returns(boxClientCallbackMock);

			sandbox.mock(boxClientFake).expects('upload')
				.withExactArgs(sinon.match.any, sinon.match.any, sinon.match.any, boxClientCallbackMock);

			files.uploadNewFileVersion(FILE_ID, CONTENT, filesCallbackMock);
		});
	});

	describe('getAllMetadata()', function() {

		it('should make GET call to fetch metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/metadata', null);
			files.getAllMetadata(FILE_ID, done);
		});
	});

	describe('getMetadata()', function() {

		it('should make GET call to fetch metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/metadata/global/properties', null);
			files.getMetadata(FILE_ID, 'global', 'properties', done);
		});
	});

	describe('addMetadata()', function() {

		it('should make POST call to add metadata', function(done) {

			var metadata = {
				foo: 'bar'
			};

			var expectedParams = {
				body: metadata
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/metadata/global/properties', expectedParams);
			files.addMetadata(FILE_ID, 'global', 'properties', metadata, done);
		});
	});

	describe('updateMetadata()', function() {

		it('should make PUT call with JSON Patch to update metadata', function(done) {

			var patch = [{
				op: 'add',
				path: '/foo',
				value: 'bar'
			}];

			var expectedParams = {
				body: patch,
				headers: {
					'Content-Type': 'application/json-patch+json'
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234/metadata/global/properties', expectedParams);
			files.updateMetadata(FILE_ID, 'global', 'properties', patch, done);
		});
	});

	describe('deleteMetadata()', function() {

		it('should make DELETE call to remove metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/1234/metadata/global/properties', null);
			files.deleteMetadata(FILE_ID, 'global', 'properties', done);
		});
	});

	describe('deletePermanently()', function() {

		it('should make DELETE call to remove file permanently', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/trash', null);
			files.deletePermanently(FILE_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/files/' + FILE_ID + '/trash').yieldsAsync();
			files.deletePermanently(FILE_ID, done);
		});
	});

	describe('getTasks()', function() {

		it('should make GET request to retrieve all tasks for given file', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/tasks', testParamsWithQs);
			files.getTasks(FILE_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/tasks', testParamsWithQs).yieldsAsync();
			files.getTasks(FILE_ID, testQS, done);
		});
	});

});
