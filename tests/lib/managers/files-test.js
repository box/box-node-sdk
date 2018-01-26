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
		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerMock('../chunked-uploader', ChunkedUploaderStub);
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH, true);
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234', testParamsWithQs)
				.returns(Promise.resolve());
			return files.get(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.get(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.get(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getDownloadURL()', function() {

		it('should make GET request to get file download when called', function() {
			var response = {
				statusCode: 302,
				headers: {
					location: 'box.com/somedownloadurl'
				}
			};
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/content', testParamsWithQs)
				.returns(Promise.resolve(response));
			return files.getDownloadURL(FILE_ID, testQS);
		});

		it('should return a promise resolving to the download URL when a 302 FOUND response is returned', function() {
			var response = {
				statusCode: 302,
				headers: {
					location: 'box.com/somedownloadurl'
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getDownloadURL(FILE_ID, testQS)
				.then(location => {
					assert.strictEqual(location, response.headers.location, 'location header is returned');
				});
		});

		it('should return a promise that rejects when a 202 ACCEPTED response is returned', function() {
			var response = {statusCode: 202};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getDownloadURL(FILE_ID, testQS)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.strictEqual(err.statusCode, response.statusCode);
				});
		});

		it('should return a promise that rejects when the API call does not succeed', function() {

			var apiError = new Error('ECONNRESET');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));

			return files.getDownloadURL(FILE_ID, testQS)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});
	});

	describe('getReadStream()', function() {

		it('should get file download URL when called', function() {
			sandbox.mock(files).expects('getDownloadURL')
				.withArgs(FILE_ID, testQS)
				.returns(Promise.resolve('https://download.url'));
			sandbox.stub(boxClientFake, 'get');
			return files.getReadStream(FILE_ID, testQS);
		});

		it('should make streaming request to file download request when called', function(done) {

			var downloadURL = 'https://dl.boxcloud.com/adjhgliwenrgiuwndfgjinsdf';

			sandbox.stub(files, 'getDownloadURL').returns(Promise.resolve(downloadURL));
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(downloadURL, {streaming: true});
			files.getReadStream(FILE_ID, testQS);
			done();
		});

		it('should return promise resolving to the read stream when callback is passed', function() {

			var downloadURL = 'https://dl.boxcloud.com/adjhgliwenrgiuwndfgjinsdf';

			var stream = {};

			sandbox.stub(files, 'getDownloadURL').returns(Promise.resolve(downloadURL));
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(stream));
			return files.getReadStream(FILE_ID, testQS)
				.then(data => {
					assert.equal(data, stream);
				});
		});
	});

	describe('getThumbnail()', function() {

		var expectedThumbnailParams = {qs: testQS, responseType: 'blob'};

		it('should make GET request to get file download when called', function() {

			var response = {
				statusCode: 200
			};
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/thumbnail.png', expectedThumbnailParams)
				.returns(Promise.resolve(response));
			return files.getThumbnail(FILE_ID, testQS);
		});

		it('should return a promise resolving to the thumbnail file when a 200 OK response is returned', function() {
			var fileData = 'thisistheimagefile! 0101010110111011',
				response = {statusCode: 200, body: fileData};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return files.getThumbnail(FILE_ID, testQS)
				.then(data => {
					assert.deepEqual(data, {statusCode: 200, file: fileData});
				});
		});

		it('should return a promise resolving to the placeholder location when a 202 ACCEPTED response is returned', function() {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 202,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getThumbnail(FILE_ID, testQS)
				.then(data => {
					assert.deepEqual(data, { statusCode: 202, location: placeholderURL});
				});
		});

		it('should return a promise resolving to the placeholder location when a 302 FOUND response is returned', function() {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 302,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getThumbnail(FILE_ID, testQS)
				.then(data => {
					assert.deepEqual(data, { statusCode: 302, location: placeholderURL});
				});
		});

		it('should return a promise that rejects when the API call fails', function() {

			var apiError = new Error(':[');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));
			return files.getThumbnail(FILE_ID, testQS)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should return a promise that rejects with unexpected response error when the API returns unknown status code', function() {

			var response = {statusCode: 403};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return files.getThumbnail(FILE_ID, testQS)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});
	});

	describe('getComments()', function() {
		it('should make GET request to get file info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/comments', testParamsWithQs)
				.returns(Promise.resolve());
			return files.getComments(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getComments(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getComments(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		it('should make PUT request to update file info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/files/1234', testParamsWithBody)
				.returns(Promise.resolve());
			return files.update(FILE_ID, testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.update(FILE_ID, testBody);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.update(FILE_ID, testBody)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addToCollection()', function() {

		var COLLECTION_ID = '9873473596';

		it('should get current collections and add new collection when item has no collections', function() {

			var file = {
				id: FILE_ID,
				collections: []
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID}]})
				.returns(Promise.resolve(file));

			return files.addToCollection(FILE_ID, COLLECTION_ID);
		});

		it('should get current collections and add new collection when item has other collections', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [
				{id: '111'},
				{id: COLLECTION_ID}
			]})
				.returns(Promise.resolve(file));

			return files.addToCollection(FILE_ID, COLLECTION_ID);
		});

		it('should get current collections and pass same collections when item is already in the collection', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [
				{id: COLLECTION_ID},
				{id: '111'}
			]})
				.returns(Promise.resolve(file));

			return files.addToCollection(FILE_ID, COLLECTION_ID);
		});

		it('should return promise resolving to the updated file when API calls succeed', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.then(data => {

					assert.equal(data, file);
				});
		});

		it('should return promise that rejects when getting current collections fails', function() {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = (new Promise(resolve => setTimeout(resolve, 1))).then(() => {
				throw error;
			});
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(p);

			filesMock.expects('update').never();

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var expectedBody = {
				collections: [
					{ id: COLLECTION_ID },
					{ id: '111' }
				]
			};

			var error = new Error('Failed update');
			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = (new Promise(resolve => setTimeout(resolve, 10))).then(() => {
				throw error;
			});

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, expectedBody)
				.returns(p);

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

	describe('removeFromCollection()', function() {

		var COLLECTION_ID = '98763';

		it('should get current collections and pass empty array when item is not in any collections', function() {

			var file = {
				id: FILE_ID,
				collections: []
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: []})
				.returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID);
		});

		it('should get current collections and pass empty array when item is in the collection to be removed', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: []})
				.returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID);
		});

		it('should get current collections and pass filtered array when item is in multiple collections', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID);
		});

		it('should get current collections and pass same array when item is in only other collections', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [
				{id: '111'},
				{id: '222'}
			]})
				.returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID);
		});

		it('should return promise resolving to the updated file when API calls succeed', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID)
				.then(data => {
					assert.equal(data, file);
				});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var file = {
				id: FILE_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'})
				.returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(error));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/files/1234/copy', expectedParams)
				.returns(Promise.resolve());
			return files.copy(FILE_ID, NEW_PARENT_ID);
		});

		it('should make POST request to copy the folder with optional parameters when passed', function() {

			var name = 'rename on copy';

			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/files/1234/copy', expectedParams)
				.returns(Promise.resolve());
			return files.copy(FILE_ID, NEW_PARENT_ID, {name});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.copy(FILE_ID, NEW_PARENT_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.copy(FILE_ID, NEW_PARENT_ID)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/files/1234', expectedParams)
				.returns(Promise.resolve());
			return files.move(FILE_ID, NEW_PARENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.move(FILE_ID, NEW_PARENT_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.move(FILE_ID, NEW_PARENT_ID)
				.then(data => assert.equal(data, response));
		});
	});


	describe('delete()', function() {
		it('should make DELETE request to update file info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/files/1234')
				.returns(Promise.resolve());
			return files.delete(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.delete(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.delete(FILE_ID)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('options')
				.withArgs('/files/content', expectedParams)
				.returns(Promise.resolve());
			return files.preflightUploadFile(parentFolderID, fileData, uploadsQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.options)
				.returnsArg(0);
			return files.preflightUploadFile(parentFolderID, fileData, uploadsQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			return files.preflightUploadFile(parentFolderID, fileData, uploadsQS)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('options')
				.withArgs('/files/2345/content', expectedParams)
				.returns(Promise.resolve());
			return files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.options)
				.returnsArg(0);
			return files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			return files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS)
				.then(data => assert.equal(data, response));
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/files/${FILE_ID}/versions/current`, expectedParams)
				.returns(Promise.resolve());
			return files.promoteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.promoteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.promoteVersion(FILE_ID, FILE_VERSION_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('uploadFile()', function() {

		var PARENT_FOLDER_ID = '123',
			FILENAME = 'abc.txt',
			CONTENT = new Buffer('someContent');

		it('should call BoxClient.upload() with the correct params when called', function() {
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('upload')
				.withArgs('/files/content', null, expectedFormData)
				.returns(Promise.resolve());
			return files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT);
		});

		it('should pass optional parameters in attributes when specified', function() {

			var options = {
				content_modified_at: '2017-11-18T11:18:00-0800',
				content_created_at: '1988-11-18T11:18:00-0800'
			};
			var expectedFormData = {
				attributes: JSON.stringify({
					name: FILENAME,
					parent: { id: PARENT_FOLDER_ID },
					content_modified_at: options.content_modified_at,
					content_created_at: options.content_created_at
				}),
				content: {
					value: CONTENT,
					options: { filename: 'unused' }
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('upload')
				.withArgs('/files/content', null, expectedFormData);
			return files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.upload)
				.returnsArg(0);
			return files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve(response));
			return files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT)
				.then(data => assert.equal(data, response));
		});
	});

	describe('uploadNewFileVersion()', function() {

		var CONTENT = new Buffer('someContent');

		it('should call BoxClient.upload() with the correct params when called', function() {
			var expectedFormData = {
				content: {
					value: CONTENT,
					options: { filename: 'unused' }
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('upload')
				.withArgs('/files/1234/content', null, expectedFormData)
				.returns(Promise.resolve());
			return files.uploadNewFileVersion(FILE_ID, CONTENT);
		});

		it('should pass optional parameters in attributes when specified', function() {

			var options = {
				name: 'New filename.txt',
				content_modified_at: '2017-12-17T12:34:56-0800'
			};
			var expectedFormData = {
				attributes: JSON.stringify(options),
				content: {
					value: CONTENT,
					options: { filename: 'unused' }
				}
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('upload')
				.withArgs('/files/1234/content', null, expectedFormData)
				.returns(Promise.resolve());
			return files.uploadNewFileVersion(FILE_ID, CONTENT, options);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.upload)
				.returnsArg(0);
			return files.uploadNewFileVersion(FILE_ID, CONTENT);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve(response));
			return files.uploadNewFileVersion(FILE_ID, CONTENT)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllMetadata()', function() {

		it('should make GET call to fetch metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/metadata')
				.returns(Promise.resolve());
			return files.getAllMetadata(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getAllMetadata(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getAllMetadata(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getMetadata()', function() {

		it('should make GET call to fetch metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/metadata/global/properties')
				.returns(Promise.resolve());
			return files.getMetadata(FILE_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getMetadata(FILE_ID, 'global', 'properties');
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getMetadata(FILE_ID, 'global', 'properties')
				.then(data => assert.equal(data, response));
		});
	});

	describe('addMetadata()', function() {

		var metadata,
			expectedParams;

		beforeEach(function() {

			metadata = {
				foo: 'bar'
			};

			expectedParams = {
				body: metadata
			};
		});

		it('should make POST call to add metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/files/1234/metadata/global/properties', expectedParams)
				.returns(Promise.resolve());
			return files.addMetadata(FILE_ID, 'global', 'properties', metadata);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.addMetadata(FILE_ID, 'global', 'properties', metadata);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.addMetadata(FILE_ID, 'global', 'properties', metadata)
				.then(data => assert.equal(data, response));
		});
	});

	describe('updateMetadata()', function() {

		var patch,
			expectedParams;

		beforeEach(function() {

			patch = [
				{
					op: 'add',
					path: '/foo',
					value: 'bar'
				}
			];

			expectedParams = {
				body: patch,
				headers: {
					'Content-Type': 'application/json-patch+json'
				}
			};
		});

		it('should make PUT call with JSON Patch to update metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/files/1234/metadata/global/properties', expectedParams)
				.returns(Promise.resolve());
			return files.updateMetadata(FILE_ID, 'global', 'properties', patch);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.updateMetadata(FILE_ID, 'global', 'properties', patch);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.updateMetadata(FILE_ID, 'global', 'properties', patch)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteMetadata()', function() {

		it('should make DELETE call to remove metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/files/1234/metadata/global/properties')
				.returns(Promise.resolve());
			return files.deleteMetadata(FILE_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.deleteMetadata(FILE_ID, 'global', 'properties');
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.deleteMetadata(FILE_ID, 'global', 'properties')
				.then(data => assert.equal(data, response));
		});
	});

	describe('deletePermanently()', function() {

		it('should make DELETE call to remove file permanently', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/files/${FILE_ID}/trash`)
				.returns(Promise.resolve());
			return files.deletePermanently(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.deletePermanently(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.deletePermanently(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getTasks()', function() {

		it('should make GET request to retrieve all tasks for given file', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/files/${FILE_ID}/tasks`, testParamsWithQs)
				.returns(Promise.resolve());
			return files.getTasks(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getTasks(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getTasks(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getTrashedFile()', function() {

		it('should make GET request to get trashed file when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/files/${FILE_ID}/trash`, testParamsWithQs)
				.returns(Promise.resolve());
			return files.getTrashedFile(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getTrashedFile(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getTrashedFile(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getEmbedLink()', function() {

		var	expectedParams;

		beforeEach(function() {
			expectedParams = {qs: {fields: 'expiring_embed_link'}};
		});

		it('should make GET request to create embed link', function() {

			var embedLink = { expiring_embed_link: {url: 'https://app.box.com/preview/expiring_embed/1234'}},
				response = {statusCode: 200, body: embedLink};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve(response));
			return files.getEmbedLink(FILE_ID);
		});

		it('should return promise resolving to the embed link when a 200 ok response is returned', function() {
			var embedLink = { expiring_embed_link: {url: 'https://app.box.com/preview/expiring_embed/1234'}},
				response = {statusCode: 200, body: embedLink};

			sandbox.stub(boxClientFake, 'get').withArgs(`/files/${FILE_ID}`)
				.returns(Promise.resolve(response));
			return files.getEmbedLink(FILE_ID)
				.then(data => {
					assert.equal(data, embedLink.expiring_embed_link.url);
				});
		});

		it('should return promise that rejects with a response error when API returns non-200 result', function() {

			var response = {
				statusCode: 404
			};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return files.getEmbedLink(FILE_ID)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});

		it('should return promise that rejects when API call returns error', function() {

			var error = new Error('API Failure');

			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(error));

			return files.getEmbedLink(FILE_ID)
				.catch(err => {
					assert.equal(err, error);
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.lock(FILE_ID, options);
		});

		it('should make PUT request with expires_at to set the lock properties when just an expires_at is passed', function() {

			var options = {
				expires_at: expiresAt
			};

			expectedParams.body.lock.expires_at = expiresAt;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.lock(FILE_ID, options);
		});

		it('should make PUT request with is_download_prevented to set the lock properties when just an is_download_prevented is passed', function() {

			var options = {
				is_download_prevented: isDownloadPrevented
			};

			expectedParams.body.lock.is_download_prevented = isDownloadPrevented;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.lock(FILE_ID, options);
		});

		it('should make PUT request with mandatory parameters to set the lock properties when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.lock(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.lock(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.lock(FILE_ID)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.unlock(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.unlock(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.unlock(FILE_ID)
				.then(data => assert.equal(data, response));
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
				parent
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a name to restore a file when just a name is passed', function() {

			var options = {
				name: NEW_NAME
			};

			expectedParams.body.name = NEW_NAME;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a parentFolderId to restore a file when just parentFolderID is passed', function() {

			var options = {
				parent_id: PARENT_ID
			};

			expectedParams.body.parent = parent;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/files/${FILE_ID}`, expectedParams)
				.returns(Promise.resolve());
			return files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with an empty body to restore a file when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/files/${FILE_ID}`, {body: {}})
				.returns(Promise.resolve());
			return files.restoreFromTrash(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.restoreFromTrash(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.restoreFromTrash(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('viewVersions()', function() {

		it('should make GET request to retrieve older file versions', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/files/${FILE_ID}/versions`, testParamsWithQs)
				.returns(Promise.resolve());
			return files.getVersions(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getVersions(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getVersions(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getWatermark()', function() {

		it('should make GET request to get file watermark info when called', function() {

			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/files/${FILE_ID}/watermark`, testParamsWithQs)
				.returns(Promise.resolve({statusCode: 200, body: {}}));
			return files.getWatermark(FILE_ID, testQS);
		});

		it('should return promise that rejects when API call returns error', function() {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs(`/files/${FILE_ID}/watermark`)
				.returns(Promise.reject(apiError));
			return files.getWatermark(FILE_ID)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should return promise that rejects when API call returns non-200 status code', function() {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs(`/files/${FILE_ID}/watermark`)
				.returns(Promise.resolve(res));
			return files.getWatermark(FILE_ID)
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should return promise resolving to watermark data when API call succeeds', function() {

			var watermark = {
				created_at: '2016-01-01T12:55:34-08:00',
				modified_at: '2016-01-01T12:55:34-08:00'
			};

			var res = {
				statusCode: 200,
				body: {watermark}
			};
			sandbox.stub(boxClientFake, 'get').withArgs(`/files/${FILE_ID}/watermark`)
				.returns(Promise.resolve(res));
			return files.getWatermark(FILE_ID)
				.then(data => {
					assert.equal(data, watermark);
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`/files/${FILE_ID}/watermark`, expectedParams)
				.returns(Promise.resolve());
			return files.applyWatermark(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			return files.applyWatermark(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.applyWatermark(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeWatermark()', function() {

		it('should make DELETE call to remove watermark', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/files/${FILE_ID}/watermark`)
				.returns(Promise.resolve());
			return files.removeWatermark(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.removeWatermark(FILE_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.removeWatermark(FILE_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteVersion()', function() {

		it('should make DELETE request to delete a file version to the trash', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/files/${FILE_ID}/versions/${FILE_VERSION_ID}`)
				.returns(Promise.resolve());
			return files.deleteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.deleteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.deleteVersion(FILE_ID, FILE_VERSION_ID)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('https://upload-base/2.1/files/upload_sessions', expectedParams)
				.returns(Promise.resolve());
			return files.createUploadSession(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.createUploadSession(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.createUploadSession(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`https://upload-base/2.1/files/${FILE_ID}/upload_sessions`, expectedParams)
				.returns(Promise.resolve());
			return files.createNewVersionUploadSession(FILE_ID, TEST_SIZE);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			return files.createNewVersionUploadSession(FILE_ID, TEST_SIZE);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.createNewVersionUploadSession(FILE_ID, TEST_SIZE)
				.then(data => assert.equal(data, response));
		});
	});

	describe('uploadPart', function() {

		var TEST_SESSION_ID = '872f3b4of2e5b',
			TEST_PART = 'test part',
			TEST_OFFSET = 27,
			TEST_LENGTH = 345987;

		it('should make PUT call to upload part when called', function() {

			var apiResponse = {
				statusCode: 200,
				body: new Buffer('{"part": {"part_id": "00000000", "size": 10, "offset": 0, "sha1": "0987654321abcdef"}}')
			};

			var expectedParams = {
				headers: {
					'Content-Type': 'application/octet-stream',
					Digest: 'SHA=oHNRqoPkTcXiX9y4eU54ccSsPQw=',
					'Content-Range': 'bytes 27-35/345987'
				},
				body: TEST_PART
			};

			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}`, expectedParams)
				.returns(Promise.resolve(apiResponse));
			return files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH);
		});

		it('should return promise that rejects when the API call fails', function() {

			var error = new Error('Connection closed');

			sandbox.stub(boxClientFake, 'put').returns(Promise.reject(error));

			return files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise that rejects when the API call returns a non-200 status code', function() {

			var apiResponse = {
				statusCode: 400
			};

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(apiResponse));

			return files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH)
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should return promise resolving to body when API call is successful', function() {

			var apiResponse = {
				statusCode: 200,
				body: {
					part: {
						part_id: '00000000',
						size: 10,
						offset: 0,
						sha1: '0987654321abcdef'
					}
				}
			};

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(apiResponse));

			return files.uploadPart(TEST_SESSION_ID, TEST_PART, TEST_OFFSET, TEST_LENGTH)
				.then(data => {

					assert.deepEqual(data, {
						part: {
							part_id: '00000000',
							size: 10,
							offset: 0,
							sha1: '0987654321abcdef'
						}
					});
				});
		});
	});

	describe('commitUploadSession', function() {

		var TEST_SESSION_ID = '872f3b4of2e5b',
			TEST_FILE_HASH = 'oHNRqoPkTcXiX9y4eU54ccSsPQw=',
			TEST_PARTS = [
				{
					part_id: 'cafedad1',
					size: 9,
					offset: 0
				}
			];

		it('should make POST request to commit the upload session when called with list of parts', function() {

			var expectedParams = {
				headers: {
					Digest: `SHA=${TEST_FILE_HASH}`
				},
				body: {
					attributes: {},
					parts: TEST_PARTS
				}
			};

			var response = {
				statusCode: 201
			};

			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}/commit`, expectedParams)
				.returns(Promise.resolve(response));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, {parts: TEST_PARTS});
		});

		it('should pass non-parts options as file attribute when called with multiple options', function() {

			let options = {
				parts: TEST_PARTS,
				name: 'foo.txt'
			};

			var expectedParams = {
				headers: {
					Digest: `SHA=${TEST_FILE_HASH}`
				},
				body: {
					attributes: {
						name: 'foo.txt'
					},
					parts: TEST_PARTS
				}
			};

			var response = {
				statusCode: 201
			};

			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}/commit`, expectedParams)
				.returns(Promise.resolve(response));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, options);
		});

		it('should return promise that rejects when there is an error making the API call', function() {

			var error = new Error('API connection had a problem');

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = (new Promise(resolve => setTimeout(resolve, 10))).then(() => {
				throw error;
			});
			sandbox.stub(boxClientFake, 'post').returns(p);
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, {parts: TEST_PARTS})
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise resolving to the response body when the API returns a success', function() {

			var responseBody = {
				type: 'file',
				id: '8726934856'
			};

			var response = {
				statusCode: 201,
				body: responseBody
			};

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, {parts: TEST_PARTS})
				.then(data => {
					assert.equal(data, responseBody);
				});
		});

		// @TODO(mwiller) 2018-01-25: Re-enable when we figure out how to test this complicated async
		it.skip('should retry the call when the API returns a 202 with Retry-After header', function(done) {

			// Need to fake timers and make Promises resolve synchronously for this test to work
			sandbox.useFakeTimers();

			var retryResponse = {
				statusCode: 202,
				headers: {
					'retry-after': 1
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
			apiStub.onFirstCall().returns(Promise.resolve(retryResponse));
			apiStub.onSecondCall().returns(Promise.resolve(successResponse));
			files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, {parts: TEST_PARTS})
				.then(data => {
					assert.equal(data, responseBody);
					// eslint-disable-next-line promise/no-callback-in-promise
					done();
				})
				// eslint-disable-next-line promise/no-callback-in-promise
				.catch(err => done(err));
			sandbox.clock.tick(999);
			assert.equal(apiStub.callCount, 1, 'Retry should not be called until retry interval has elapsed');
			sandbox.clock.tick(1);
		});

		it('should return promise that rejects when unknown response code is received', function() {

			var response = {
				statusCode: 303
			};

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH, {parts: TEST_PARTS})
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should fetch parts from API when parts are not passed in', function() {


			var expectedParams = {
				headers: {
					Digest: `SHA=${TEST_FILE_HASH}`
				},
				body: {
					attributes: {},
					parts: TEST_PARTS
				}
			};

			var expectedPagingOptions = {
				limit: 1000
			};

			var partsResponse = {
				entries: TEST_PARTS,
				limit: 1000,
				offset: 0,
				total_count: 1
			};

			var commitResponse = {
				statusCode: 201
			};

			sandbox.mock(files).expects('getUploadSessionParts')
				.withArgs(TEST_SESSION_ID, sinon.match(expectedPagingOptions))
				.returns(Promise.resolve(partsResponse));
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}/commit`, expectedParams)
				.returns(Promise.resolve(commitResponse));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH);
		});

		it('should commit with all parts when API parts span multiple pages', function() {

			var parts = [
				{
					part_id: '00000001',
					offset: 0,
					size: 3
				},
				{
					part_id: '00000002',
					offset: 3,
					size: 3
				}
			];

			var expectedParams = {
				headers: {
					Digest: `SHA=${TEST_FILE_HASH}`
				},
				body: {
					attributes: {},
					parts
				}
			};

			var commitResponse = {
				statusCode: 201
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('getUploadSessionParts').withArgs(TEST_SESSION_ID, sinon.match({limit: 1000}))
				.returns(Promise.resolve({
					entries: [parts[0]],
					limit: 1,
					offset: 0,
					total_count: 2
				}));
			filesMock.expects('getUploadSessionParts').withArgs(TEST_SESSION_ID, sinon.match({limit: 1000, offset: 1}))
				.returns(Promise.resolve({
					entries: [parts[1]],
					limit: 1,
					offset: 1,
					total_count: 2
				}));
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}/commit`, expectedParams)
				.returns(Promise.resolve(commitResponse));
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH);
		});

		it('should return promise that rejects when page request returns an error', function() {

			var partsError = new Error('Could not fetch parts');

			sandbox.stub(files, 'getUploadSessionParts').returns(Promise.reject(partsError));
			sandbox.mock(boxClientFake).expects('post')
				.never();
			return files.commitUploadSession(TEST_SESSION_ID, TEST_FILE_HASH)
				.catch(err => {
					assert.equal(err, partsError);
				});
		});
	});

	describe('abortUploadSession', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make DELETE request to destroy the upload session when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}`)
				.returns(Promise.resolve());
			return files.abortUploadSession(TEST_SESSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			return files.abortUploadSession(TEST_SESSION_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.abortUploadSession(TEST_SESSION_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getUploadSessionParts', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make GET request for the uploaded parts when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}/parts`, testParamsWithQs)
				.returns(Promise.resolve());
			return files.getUploadSessionParts(TEST_SESSION_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getUploadSessionParts(TEST_SESSION_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getUploadSessionParts(TEST_SESSION_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getUploadSession', function() {

		var TEST_SESSION_ID = '87nyeibt7y2v34t2';

		it('should make GET request for the session info when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`https://upload-base/2.1/files/upload_sessions/${TEST_SESSION_ID}`)
				.returns(Promise.resolve());
			return files.getUploadSession(TEST_SESSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getUploadSession(TEST_SESSION_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getUploadSession(TEST_SESSION_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getChunkedUploader', function() {

		var TEST_FOLDER_ID = '7869287364',
			TEST_SIZE = 12345678,
			TEST_NAME = 'test file.jpg';

		it('should make call to create upload session when called', function() {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			sandbox.mock(files).expects('createUploadSession')
				.withArgs(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME)
				.returns(Promise.resolve(session));
			return files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', {});
		});

		it('should return promise that rejects when upload session cannot be created', function() {

			var error = new Error('Cannot create upload session');

			sandbox.stub(files, 'createUploadSession').returns(Promise.reject(error));
			return files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', {})
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should return promise resolving to new chunked uploader when upload session is created', function() {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			var options = {};

			var uploader = {};
			ChunkedUploaderStub.returns(uploader);

			sandbox.stub(files, 'createUploadSession').returns(Promise.resolve(session));
			return files.getChunkedUploader(TEST_FOLDER_ID, TEST_SIZE, TEST_NAME, 'test data', options)
				.then(data => {

					assert.ok(ChunkedUploaderStub.calledWithNew(), 'New chunked uploader should be constructed');
					assert.ok(ChunkedUploaderStub.calledWith(boxClientFake, session, 'test data', TEST_SIZE, options), 'Chunked uploader should get correct options');
					assert.equal(data, uploader);
				});
		});
	});

	describe('getNewVersionChunkedUploader', function() {

		var TEST_FILE_ID = '7869287364',
			TEST_SIZE = 12345678;

		it('should make call to create upload session when called', function() {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			sandbox.mock(files).expects('createNewVersionUploadSession')
				.withArgs(TEST_FILE_ID, TEST_SIZE)
				.returns(Promise.resolve(session));
			return files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', {});
		});

		it('should return promisethat rejects  when upload session cannot be created', function() {

			var error = new Error('Cannot create upload session');

			sandbox.stub(files, 'createNewVersionUploadSession').returns(Promise.reject(error));
			return files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', {})
				.catch(err => {

					assert.equal(err, error);
				});
		});

		it('should return promise resolving to new chunked uploader when upload session is created', function() {

			var session = {
				upload_session_id: '91d2yb48qu34o82y45'
			};

			var options = {};

			var uploader = {};
			ChunkedUploaderStub.returns(uploader);

			sandbox.stub(files, 'createNewVersionUploadSession').returns(Promise.resolve(session));
			return files.getNewVersionChunkedUploader(TEST_FILE_ID, TEST_SIZE, 'test data', options)
				.then(data => {

					assert.ok(ChunkedUploaderStub.calledWithNew(), 'New chunked uploader should be constructed');
					assert.ok(ChunkedUploaderStub.calledWith(boxClientFake, session, 'test data', TEST_SIZE, options), 'Chunked uploader should get correct options');
					assert.equal(data, uploader);
				});
		});
	});

	describe('getCollaborations()', function() {

		it('should make GET request to get file collaborations when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234/collaborations', testParamsWithQs)
				.returns(Promise.resolve());
			return files.getCollaborations(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			return files.getCollaborations(FILE_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getCollaborations(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});

	});

	describe('getRepresentationInfo()', function() {
		var TEST_REPRESENTATION = '[png?dimensions=1024x1024]';
		var expectedRepresentationParam = { headers: { 'x-rep-hints': TEST_REPRESENTATION }, qs: { fields: 'representations' } };
		var placeholderUrl = '.../{+asset_path}';

		it('should make GET request to get file representation when called', function() {
			var response = {
				statusCode: 200,
				body: {
					representations: {
						entries: [
							{
								content: {
									url_template: placeholderUrl
								}
							}
						]
					}
				}
			};
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/files/1234', expectedRepresentationParam)
				.returns(Promise.resolve(response));
			return files.getRepresentationInfo(FILE_ID, TEST_REPRESENTATION);
		});

		it('should return a promise resolving to a representation object when a 200 response is returned', function() {
			var response = {
				statusCode: 200,
				body: {
					representations: {
						entries: [
							{
								content: {
									url_template: placeholderUrl
								}
							}
						]
					}
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getRepresentationInfo(FILE_ID, TEST_REPRESENTATION)
				.then(representationObject => {
					assert.strictEqual(representationObject, response.body.representations, 'representation object is returned');
				});
		});

		it('should return a promise that rejects when a 202 ACCEPTED response is returned', function() {
			var response = {statusCode: 202};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getRepresentationInfo(FILE_ID, TEST_REPRESENTATION)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.strictEqual(err.statusCode, response.statusCode);
				});
		});

		it('should return a promise that rejects when the API call does not succeed', function() {

			var apiError = new Error('ECONNRESET');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));

			return files.getRepresentationInfo(FILE_ID, TEST_REPRESENTATION)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should return a promise that rejects with unexpected response error when the API returns unknown status code', function() {

			var response = {statusCode: 403};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return files.getRepresentationInfo(FILE_ID, TEST_REPRESENTATION)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});
	});
});
