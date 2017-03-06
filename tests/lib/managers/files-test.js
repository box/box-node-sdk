/**
 * @fileoverview Files Manager Tests
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
	ChunkedUploaderStub,
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
		boxClientFake._uploadBaseURL = 'https://upload-base/2.1';
		testParamsWithBody = {body: testBody};
		testParamsWithQs = {qs: testQS};
		ChunkedUploaderStub = sandbox.stub();
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('util');
		mockery.registerAllowable('crypto');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
		mockery.registerMock('../chunked-uploader', ChunkedUploaderStub);
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
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
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

	describe('addToCollection()', function() {

		var COLLECTION_ID = '9873473596';

		it('should get current collections and add new collection when item has no collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: []
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID}]}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and add new collection when item has other collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'},{id: COLLECTION_ID}]}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same collections when item is already in the collection', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID},{id: '111'}]}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(error);
			filesMock.expects('update').never();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.addToCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should call callback with error when adding the collection fails', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID},{id: '111'}]}).yieldsAsync(error);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.addToCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});

	describe('removeFromCollection()', function() {

		var COLLECTION_ID = '98763';

		it('should get current collections and pass empty array when item is not in any collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: []
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: []}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass empty array when item is in the collection to be removed', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: []}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass filtered array when item is in multiple collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same array when item is in only other collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'},{id: '222'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'},{id: '222'}]}).yieldsAsync(null, file);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(error);
			filesMock.expects('update').never();
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should call callback with error when adding the collection fails', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).yieldsAsync(null, file);
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]}).yieldsAsync(error);
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			files.removeFromCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
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

		it('should make POST request to copy the folder with optional parameters when passed', function() {

			var name = 'rename on copy';

			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/copy', expectedParams);
			files.copy(FILE_ID, NEW_PARENT_ID, {name});
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

	describe('promoteVersion()', function() {

		var expectedParams;

		beforeEach(function() {
			expectedParams = {
				body: {
					type: 'file_version',
					id: FILE_VERSION_ID
				}
			};
		});

		it('should make POST request to promote older file version to top of the stack', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID + '/versions/current', expectedParams);
			files.promoteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/files/' + FILE_ID + '/versions/current').yieldsAsync();
			files.promoteVersion(FILE_ID, FILE_VERSION_ID, done);
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

	describe('getTrashedFile()', function() {

		it('should make GET request to get trashed file when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/trash', testParamsWithQs);
			files.getTrashedFile(FILE_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/trash', testParamsWithQs).yieldsAsync();
			files.getTrashedFile(FILE_ID, testQS, done);
		});

	});

	describe('getEmbedLink()', function() {

		var	expectedParams;

		beforeEach(function() {
			expectedParams = {qs: {fields: 'expiring_embed_link'}};
		});

		it('should make GET request to create embed link', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID, expectedParams);
			files.getEmbedLink(FILE_ID);
		});

		it('should return the embed link when a 200 ok response is returned', function(done) {
			var embedLink = { expiring_embed_link: {url: 'https://app.box.com/preview/expiring_embed/1234'}},
				response = {statusCode: 200, body: embedLink};

			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID).yieldsAsync(null, response);
			files.getEmbedLink(FILE_ID, function(err, data) {
				assert.ok(!err);
				assert.equal(data, embedLink.expiring_embed_link.url);
				done();
			});
		});

		it('should return a response error when API returns non-200 result', function(done) {

			var response = {
				statusCode: 404
			};

			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);

			files.getEmbedLink(FILE_ID, function(err) {

				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});

		it('should return a response error when API call returns error', function(done) {

			var error = new Error('API Failure');

			sandbox.stub(boxClientFake, 'get').yieldsAsync(error);

			files.getEmbedLink(FILE_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});
	});

	describe('lock()', function() {

		var expiresAt,
			isDownloadPrevented,
			expectedParams;

		beforeEach(function() {
			expiresAt = '2016-12-12T10:55:30-08:00';
			isDownloadPrevented = false;
			expectedParams = {
				body: {
					lock: {
						type: 'lock'
					}
				}
			};
		});

		it('should make PUT request with all parameters to set the lock properties when all optional parameters are passed', function() {

			var options = {
				expires_at: expiresAt,
				is_download_prevented: isDownloadPrevented
			};

			expectedParams.body.lock.expires_at = expiresAt;
			expectedParams.body.lock.is_download_prevented = isDownloadPrevented;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with expires_at to set the lock properties when just an expires_at is passed', function() {

			var options = {
				expires_at: expiresAt
			};

			expectedParams.body.lock.expires_at = expiresAt;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with is_download_prevented to set the lock properties when just an is_download_prevented is passed', function() {

			var options = {
				is_download_prevented: isDownloadPrevented
			};

			expectedParams.body.lock.is_download_prevented = isDownloadPrevented;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with mandatory parameters to set the lock properties when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/files/' + FILE_ID).yieldsAsync();
			files.lock(FILE_ID, null, done);
		});
	});

	describe('unlock()', function() {

		var expectedParams;

		beforeEach(function() {
			expectedParams = {
				body: {
					lock: {
						type: 'unlock'
					}
				}
			};
		});

		it('should make PUT request to clear the lock properties', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.unlock(FILE_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/files/' + FILE_ID).yieldsAsync();
			files.unlock(FILE_ID, done);
		});
	});

	describe('restoreFromTrash()', function() {

		var PARENT_ID = '87364',
			NEW_NAME = 'Item Restored',
			parent,
			expectedParams;

		beforeEach(function() {
			parent = {
				id: PARENT_ID
			};
			expectedParams = {body: {}};
		});

		it('should make POST request with all parameters to restore a file when all optional parameters are passed', function() {

			var options = {
				name: NEW_NAME,
				parent_id: PARENT_ID
			};

			expectedParams.body = {
				name: NEW_NAME,
				parent: parent
			};
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a name to restore a file when just a name is passed', function() {

			var options = {
				name: NEW_NAME
			};

			expectedParams.body.name = NEW_NAME;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a parentFolderId to restore a file when just parentFolderID is passed', function() {

			var options = {
				parent_id: PARENT_ID
			};

			expectedParams.body.parent = parent;
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with an empty body to restore a file when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, {body: {}});
			files.restoreFromTrash(FILE_ID);
		});


		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').yieldsAsync();
			files.restoreFromTrash(FILE_ID, null, done);
		});
	});

	describe('viewVersions()', function() {

		it('should make GET request to retrieve older file versions', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/versions', testParamsWithQs);
			files.getVersions(FILE_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/versions').yieldsAsync();
			files.getVersions(FILE_ID, testQS, done);
		});
	});

	describe('getWatermark()', function() {

		it('should make GET request to get file watermark info when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/watermark', testParamsWithQs);
			files.getWatermark(FILE_ID, testQS);
		});

		it('should call callback with error when API call returns error', function(done) {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').yieldsAsync(apiError);
			files.getWatermark(FILE_ID, null, function(err) {

				assert.equal(err, apiError);
				done();
			});
		});

		it('should call callback with error when API call returns non-200 status code', function(done) {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').yieldsAsync(null, res);
			files.getWatermark(FILE_ID, null, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should call callback with watermark data when API call succeeds', function(done) {

			var watermark = {
				created_at: '2016-01-01T12:55:34-08:00',
				modified_at: '2016-01-01T12:55:34-08:00'
			};

			var res = {
				statusCode: 200,
				body: {watermark}
			};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').yieldsAsync(null, res);
			files.getWatermark(FILE_ID, null, function(err, data) {

				assert.isNull(err, 'Error should be absent');
				assert.equal(data, watermark);
				done();
			});
		});

	});

	describe('applyWatermark()', function() {
		var expectedParams;

		beforeEach(function() {
			expectedParams = {
				body: {
					watermark: {
						imprint: 'default'
					}
				}
			};
		});

		it('should make PUT request to apply watermark on a file', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID + '/watermark', expectedParams);
			files.applyWatermark(FILE_ID, null);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/files/' + FILE_ID + '/watermark').yieldsAsync();
			files.applyWatermark(FILE_ID, null, done);
		});
	});

	describe('removeWatermark()', function() {

		it('should make DELETE call to remove watermark', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/watermark', null);
			files.removeWatermark(FILE_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/files/' + FILE_ID + '/watermark').yieldsAsync();
			files.removeWatermark(FILE_ID, done);
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

	describe('createUploadSession', function() {

		var TEST_FOLDER_ID = '7869287364',
			TEST_SIZE = 12345678,
			TEST_NAME = 'test file.jpg';

		it('should make POST request to create a new upload session', function() {


			var expectedParams = {
				body: {
					folder_id: TEST_FOLDER_ID,
					file_size: TEST_SIZE,
					file_name: TEST_NAME
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('https://upload-base/2.1/files/upload-session', expectedParams);
			files.createUploadSession(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('https://upload-base/2.1/files/upload-session').yieldsAsync();
			files.createUploadSession(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, done);
		});
	});

	describe('createNewVersionUploadSession', function() {

		var TEST_SIZE = 12345678;

		it('should make POST request to create a new upload session', function() {


			var expectedParams = {
				body: {
					file_size: TEST_SIZE
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs(`https://upload-base/2.1/files/${FILE_ID}/upload-session`, expectedParams);
			files.createNewVersionUploadSession(FILE_ID, TEST_SIZE);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs(`https://upload-base/2.1/files/${FILE_ID}/upload-session`).yieldsAsync();
			files.createNewVersionUploadSession(FILE_ID, TEST_SIZE, done);
		});
	});

	describe('uploadPart', function() {

		var TEST_SESSION_ID = '872f3b4of2e5b',
			TEST_PART = 'test part',
			TEST_OFFSET = 27,
			TEST_LENGTH = 345987;

		it('should make PUT call to upload part with generated part ID when no part ID is passed in', function() {

			sandbox.stub(Math, 'random').returns(0);

			var expectedParams = {
				headers: {
					'Content-Type': 'application/octet-stream',
					Digest: 'SHA=oHNRqoPkTcXiX9y4eU54ccSsPQw=',
					'X-Box-Part-Id': '00000000',
					'Content-Range': 'bytes 27-35/345987'
				},
				json: false,
				body: TEST_PART
			};

			sandbox.mock(boxClientFake).expects('put').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}`, expectedParams);
			files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH);
		});

		it('should make PUT call to upload part with passed-in part ID when part ID is provided', function() {

			var partID = 'feedbeef';

			var expectedParams = {
				headers: {
					'Content-Type': 'application/octet-stream',
					Digest: 'SHA=oHNRqoPkTcXiX9y4eU54ccSsPQw=',
					'X-Box-Part-Id': partID,
					'Content-Range': 'bytes 27-35/345987'
				},
				json: false,
				body: TEST_PART
			};

			sandbox.mock(boxClientFake).expects('put').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}`, expectedParams);
			files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH, {partID});
		});

		it('should call callback with an error when there is an error calling the API', function(done) {

			var error = new Error('Could not call API!');

			sandbox.stub(boxClientFake, 'put').yieldsAsync(error);
			files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH, {}, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should call callback with an error when the API returns an error', function(done) {

			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, {statusCode: 403});
			files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH, {}, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should call callback with part info when API call is successful', function(done) {

			var partID = 'fab00bae';

			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, {statusCode: 200});
			files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH, {partID}, function(err, data) {

				assert.isNull(err);
				assert.propertyVal(data, 'part_id', partID);
				assert.propertyVal(data, 'offset', TEST_OFFSET);
				assert.propertyVal(data, 'size', TEST_PART.length);
				done();
			});
		});
	});

	describe('commitUploadSession', function() {

		var TEST_SESSION_ID = '872f3b4of2e5b',
			TEST_FILE_HASH = 'oHNRqoPkTcXiX9y4eU54ccSsPQw=',
			TEST_PARTS = [{
				part_id: 'cafedad1',
				size: 9,
				offset: 0
			}];

		it('should make POST request to commit the upload session when called', function() {

			var expectedParams = {
				headers: {
					Digest: 'SHA=' + TEST_FILE_HASH
				},
				body: {
					attributes: null,
					parts: TEST_PARTS
				}
			};

			sandbox.mock(boxClientFake).expects('post').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}/commit`, expectedParams);
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, TEST_PARTS, null);
		});

		it('should return an error when there is an error making the API call', function(done) {

			var error = new Error('API connection had a problem');

			sandbox.stub(boxClientFake, 'post').yieldsAsync(error);
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, TEST_PARTS, null, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return the response body when the API returns a success', function(done) {

			var responseBody = {
				type: 'file',
				id: '8726934856'
			};

			var response = {
				statusCode: 201,
				body: responseBody
			};

			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, TEST_PARTS, null, function(err, data) {

				assert.isNull(err);
				assert.equal(data, responseBody);
				done();
			});
		});

		it('should retry the call when the API returns a 202 with Retry-After header', function(done) {

			sandbox.useFakeTimers();

			var retryResponse = {
				statusCode: 202,
				headers: {
					'retry-after': 30
				}
			};

			var responseBody = {
				type: 'file',
				id: '8726934856'
			};

			var successResponse = {
				statusCode: 201,
				body: responseBody
			};

			var apiStub = sandbox.stub(boxClientFake, 'post');
			apiStub.onFirstCall().yields(null, retryResponse);
			apiStub.onSecondCall().yields(null, successResponse);
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, TEST_PARTS, null, function(err, data) {

				assert.isNull(err);
				assert.equal(data, responseBody);
				done();
			});
			sandbox.clock.tick(29999);
			assert.ok(apiStub.calledOnce, 'Retry should not occur before interval has elapsed');
			sandbox.clock.tick(1);
		});

		it('should return an error when unknown response code is received', function(done) {

			var response = {
				statusCode: 303
			};

			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, TEST_PARTS, null, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});
	});

	describe('abortUploadSession', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make DELETE request to destroy the upload session when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}`, null);
			files.abortUploadSession(TEST_SESSION_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}`).yieldsAsync();
			files.abortUploadSession(TEST_SESSION_ID, done);
		});
	});

	describe('getUploadSessionParts', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make GET request for the uploaded parts when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}/parts`, testParamsWithQs);
			files.getUploadSessionParts(TEST_SESSION_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}/parts`).yieldsAsync();
			files.getUploadSessionParts(TEST_SESSION_ID, testQS, done);
		});
	});

	describe('getUploadSessionStatus', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make GET request for the session status when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}/status`);
			files.getUploadSessionStatus(TEST_SESSION_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs(`https://upload-base/2.1/files/upload-session/${TEST_SESSION_ID}/status`).yieldsAsync();
			files.getUploadSessionStatus(TEST_SESSION_ID, done);
		});
	});

	describe('getChunkedUploader', function() {

		var TEST_FOLDER_ID = '7869287364',
			TEST_SIZE = 12345678,
			TEST_NAME = 'test file.jpg';

		it('should make call to create upload session when called', function() {

			sandbox.mock(files).expects('createUploadSession').withArgs(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME);
			files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', {});
		});

		it('should return an error when upload session cannot be created', function(done) {

			var error = new Error('Cannot create upload session');

			sandbox.stub(files, 'createUploadSession').yieldsAsync(error);
			files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', {}, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return new chunked uploader when upload session is created', function(done) {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			var options = {};

			var uploader = {};
			ChunkedUploaderStub.returns(uploader);

			sandbox.stub(files, 'createUploadSession').yieldsAsync(null, session);
			files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', options, function(err, data) {

				assert.ifError(err);
				assert.ok(ChunkedUploaderStub.calledWithNew(), 'New chunked uploader should be constructed');
				assert.ok(ChunkedUploaderStub.calledWith(boxClientFake, session, 'test data', TEST_SIZE, options), 'Chunked uploader should get correct options');
				assert.equal(data, uploader);
				done();
			});
		});
	});

	describe('getNewVersionChunkedUploader', function() {

		var TEST_FILE_ID = '7869287364',
			TEST_SIZE = 12345678;

		it('should make call to create upload session when called', function() {

			sandbox.mock(files).expects('createNewVersionUploadSession').withArgs(TEST_FILE_ID, TEST_SIZE);
			files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', {});
		});

		it('should return an error when upload session cannot be created', function(done) {

			var error = new Error('Cannot create upload session');

			sandbox.stub(files, 'createNewVersionUploadSession').yieldsAsync(error);
			files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', {}, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return new chunked uploader when upload session is created', function(done) {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			var options = {};

			var uploader = {};
			ChunkedUploaderStub.returns(uploader);

			sandbox.stub(files, 'createNewVersionUploadSession').yieldsAsync(null, session);
			files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', options, function(err, data) {

				assert.ifError(err);
				assert.ok(ChunkedUploaderStub.calledWithNew(), 'New chunked uploader should be constructed');
				assert.ok(ChunkedUploaderStub.calledWith(boxClientFake, session, 'test data', TEST_SIZE, options), 'Chunked uploader should get correct options');
				assert.equal(data, uploader);
				done();
			});
		});
	});

});

// @TODO: add integration tests
