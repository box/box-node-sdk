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
	Promise = require('bluebird'),
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
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234', testParamsWithQs);
			files.get(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.get(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.get(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/content', testParamsWithQs).returns(Promise.resolve(response));
			files.getDownloadURL(FILE_ID, testQS);
		});

		it('should call callback with the download URL when a 302 FOUND response is returned', function(done) {
			var response = {
				statusCode: 302,
				headers: {
					location: 'box.com/somedownloadurl'
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			files.getDownloadURL(FILE_ID, testQS, function(err, location) {
				assert.ifError(err);
				assert.strictEqual(location, response.headers.location, 'location header is returned');
				done();
			});
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

		it('should call callback with an error when a 202 ACCEPTED response is returned', function(done) {
			var response = {statusCode: 202};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			files.getDownloadURL(FILE_ID, testQS, function(err) {
				assert.instanceOf(err, Error);
				assert.strictEqual(err.statusCode, response.statusCode);
				done();
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

		it('should call callback with an error when the API call does not succeed', function(done) {

			var apiError = new Error('ECONNRESET');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));

			files.getDownloadURL(FILE_ID, testQS, function(err) {
				assert.equal(err, apiError);
				done();
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

		it('should call callback with unexpected response error when the API returns unknown status code', function() {
			var response = {statusCode: 403};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			files.getDownloadURL(FILE_ID, testQS)
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.strictEqual(err.statusCode, response.statusCode);
				});
		});
	});

	describe('getReadStream()', function() {

		it('should get file download URL when called', function() {
			sandbox.mock(files).expects('getDownloadURL').withArgs(FILE_ID, testQS).returns(Promise.resolve('https://download.url'));
			sandbox.stub(boxClientFake, 'get');
			files.getReadStream(FILE_ID, testQS);
		});

		it('should make streaming request to file download request when called', function() {

			var downloadURL = 'https://dl.boxcloud.com/adjhgliwenrgiuwndfgjinsdf';

			sandbox.stub(files, 'getDownloadURL').returns(Promise.resolve(downloadURL));
			sandbox.mock(boxClientFake).expects('get').withArgs(downloadURL, {streaming: true});
			files.getReadStream(FILE_ID, testQS);
		});

		it('should call callback with the read stream when callback is passed', function(done) {

			var downloadURL = 'https://dl.boxcloud.com/adjhgliwenrgiuwndfgjinsdf';

			var stream = {};

			sandbox.stub(files, 'getDownloadURL').returns(Promise.resolve(downloadURL));
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(stream));
			files.getReadStream(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, stream);
				done();
			});
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

		var expectedThumbnailParams = {qs: testQS, json: false};

		it('should make GET request to get file download when called', function() {

			var response = {
				statusCode: 200
			};
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/thumbnail.png', expectedThumbnailParams)
				.returns(Promise.resolve(response));
			files.getThumbnail(FILE_ID, testQS);
		});

		it('should call callback with the thumbnail file when a 200 OK response is returned', function(done) {
			var fileData = 'thisistheimagefile! 0101010110111011',
				response = {statusCode: 200, body: fileData};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.deepEqual(data, {statusCode: 200, file: fileData});
				done();
			});
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

		it('should call callback with the placeholder location when a 202 ACCEPTED response is returned', function(done) {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 202,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.deepEqual(data, { statusCode: 202, location: placeholderURL});
				done();
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

		it('should call callback with the placeholder location when a 302 FOUND response is returned', function(done) {
			var placeholderURL = 'https://someplaceholderthumbnail.png',
				response = {
					statusCode: 302,
					headers: {
						location: placeholderURL
					}
				};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			files.getThumbnail(FILE_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.deepEqual(data, { statusCode: 302, location: placeholderURL});
				done();
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

		it('should call callback with an error when the API call fails', function(done) {

			var apiError = new Error(':[');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));
			files.getThumbnail(FILE_ID, testQS, function(err) {
				assert.equal(err, apiError);
				done();
			});
		});

		it('should return a promise that rejects when the API call fails', function() {

			var apiError = new Error(':[');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));
			files.getThumbnail(FILE_ID, testQS)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should call callback with unexpected response error when the API returns unknown status code', function(done) {

			var response = {statusCode: 403};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			files.getThumbnail(FILE_ID, testQS, function(err) {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/comments', testParamsWithQs);
			files.getComments(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getComments(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getComments(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234', testParamsWithBody);
			files.update(FILE_ID, testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.update(FILE_ID, testBody);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.update(FILE_ID, testBody, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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

		it('should get current collections and add new collection when item has no collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: []
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID}]}).returns(Promise.resolve(file));

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and add new collection when item has other collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'},{id: COLLECTION_ID}]}).returns(Promise.resolve(file));

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same collections when item is already in the collection', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID},{id: '111'}]}).returns(Promise.resolve(file));

			files.addToCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should call callback with updated file when API calls succeed', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			files.addToCollection(FILE_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, file);
				done();
			});
		});

		it('should return promise resolving to the updated file when API calls succeed', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.then(data => {

					assert.equal(data, file);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.reject(error));
			filesMock.expects('update').never();

			files.addToCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when getting current collections fails', function() {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.reject(error));
			filesMock.expects('update').never();

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should call callback with error when adding the collection fails', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID},{id: '111'}]}).returns(Promise.reject(error));

			files.addToCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: COLLECTION_ID},{id: '111'}]}).returns(Promise.reject(error));

			return files.addToCollection(FILE_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
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
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: []}).returns(Promise.resolve(file));

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass empty array when item is in the collection to be removed', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: []}).returns(Promise.resolve(file));

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass filtered array when item is in multiple collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]}).returns(Promise.resolve(file));

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same array when item is in only other collections', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'},{id: '222'}]
			};

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'},{id: '222'}]}).returns(Promise.resolve(file));

			files.removeFromCollection(FILE_ID, COLLECTION_ID, done);
		});

		it('should call callback with the updated file when API calls succeed', function(done) {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'},{id: '222'}]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			files.removeFromCollection(FILE_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, file);
				done();
			});
		});

		it('should return promise resolving to the updated file when API calls succeed', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: '111'},{id: '222'}]
			};

			sandbox.stub(files, 'get').returns(Promise.resolve(file));
			sandbox.stub(files, 'update').returns(Promise.resolve(file));

			return files.removeFromCollection(FILE_ID, COLLECTION_ID)
				.then(data => {
					assert.equal(data, file);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.reject(error));
			filesMock.expects('update').never();

			files.removeFromCollection(FILE_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var file = {
				id: FILE_ID,
				collections: [{id: COLLECTION_ID},{id: '111'}]
			};

			var error = new Error('Failed update');

			var filesMock = sandbox.mock(files);
			filesMock.expects('get').withArgs(FILE_ID, {fields: 'collections'}).returns(Promise.resolve(file));
			filesMock.expects('update').withArgs(FILE_ID, {collections: [{id: '111'}]}).returns(Promise.resolve(error));

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
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/copy', expectedParams);
			files.copy(FILE_ID, NEW_PARENT_ID);
		});

		it('should make POST request to copy the folder with optional parameters when passed', function() {

			var name = 'rename on copy';

			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/copy', expectedParams);
			files.copy(FILE_ID, NEW_PARENT_ID, {name});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			files.copy(FILE_ID, NEW_PARENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.copy(FILE_ID, NEW_PARENT_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234', expectedParams);
			files.move(FILE_ID, NEW_PARENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.move(FILE_ID, NEW_PARENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.move(FILE_ID, NEW_PARENT_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/1234', null);
			files.delete(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			files.delete(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			files.delete(FILE_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('options').withArgs('/files/content', expectedParams);
			files.preflightUploadFile(parentFolderID, fileData, uploadsQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.options).returnsArg(0);
			files.preflightUploadFile(parentFolderID, fileData, uploadsQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'options').yieldsAsync(null, response);
			files.preflightUploadFile(parentFolderID, fileData, uploadsQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('options').withArgs('/files/2345/content', expectedParams);
			files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.options).returnsArg(0);
			files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'options').yieldsAsync(null, response);
			files.preflightUploadNewFileVersion(fileID, fileData, uploadsQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID + '/versions/current', expectedParams);
			files.promoteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			files.promoteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.promoteVersion(FILE_ID, FILE_VERSION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('upload').withArgs('/files/content', null, expectedFormData);
			files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.upload).returnsArg(0);
			files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'upload').yieldsAsync(null, response);
			files.uploadFile(PARENT_FOLDER_ID, FILENAME, CONTENT, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('upload').withArgs('/files/1234/content', null, expectedFormData);
			files.uploadNewFileVersion(FILE_ID, CONTENT);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'upload').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.upload).returnsArg(0);
			files.uploadNewFileVersion(FILE_ID, CONTENT);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'upload').yieldsAsync(null, response);
			files.uploadNewFileVersion(FILE_ID, CONTENT, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/metadata', null);
			files.getAllMetadata(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getAllMetadata(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getAllMetadata(FILE_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/metadata/global/properties', null);
			files.getMetadata(FILE_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getMetadata(FILE_ID, 'global', 'properties');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getMetadata(FILE_ID, 'global', 'properties', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/1234/metadata/global/properties', expectedParams);
			files.addMetadata(FILE_ID, 'global', 'properties', metadata);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			files.addMetadata(FILE_ID, 'global', 'properties', metadata);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.addMetadata(FILE_ID, 'global', 'properties', metadata, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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

			patch = [{
				op: 'add',
				path: '/foo',
				value: 'bar'
			}];

			expectedParams = {
				body: patch,
				headers: {
					'Content-Type': 'application/json-patch+json'
				}
			};
		});

		it('should make PUT call with JSON Patch to update metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/1234/metadata/global/properties', expectedParams);
			files.updateMetadata(FILE_ID, 'global', 'properties', patch);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.updateMetadata(FILE_ID, 'global', 'properties', patch);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.updateMetadata(FILE_ID, 'global', 'properties', patch, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/1234/metadata/global/properties', null);
			files.deleteMetadata(FILE_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			files.deleteMetadata(FILE_ID, 'global', 'properties');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			files.deleteMetadata(FILE_ID, 'global', 'properties', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/trash', null);
			files.deletePermanently(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			files.deletePermanently(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			files.deletePermanently(FILE_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/tasks', testParamsWithQs);
			files.getTasks(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getTasks(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getTasks(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/trash', testParamsWithQs);
			files.getTrashedFile(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getTrashedFile(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getTrashedFile(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID, expectedParams).returns(Promise.resolve(response));
			files.getEmbedLink(FILE_ID);
		});

		it('should call callback with the embed link when a 200 ok response is returned', function(done) {
			var embedLink = { expiring_embed_link: {url: 'https://app.box.com/preview/expiring_embed/1234'}},
				response = {statusCode: 200, body: embedLink};

			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID).returns(Promise.resolve(response));
			files.getEmbedLink(FILE_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, embedLink.expiring_embed_link.url);
				done();
			});
		});

		it('should return promise resolving to the embed link when a 200 ok response is returned', function() {
			var embedLink = { expiring_embed_link: {url: 'https://app.box.com/preview/expiring_embed/1234'}},
				response = {statusCode: 200, body: embedLink};

			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID).returns(Promise.resolve(response));
			return files.getEmbedLink(FILE_ID)
				.then(data => {
					assert.equal(data, embedLink.expiring_embed_link.url);
				});
		});

		it('should call callback with a response error when API returns non-200 result', function(done) {

			var response = {
				statusCode: 404
			};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			files.getEmbedLink(FILE_ID, function(err) {

				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
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

		it('should call callback with error when API call returns error', function(done) {

			var error = new Error('API Failure');

			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(error));

			files.getEmbedLink(FILE_ID, function(err) {

				assert.equal(err, error);
				done();
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with expires_at to set the lock properties when just an expires_at is passed', function() {

			var options = {
				expires_at: expiresAt
			};

			expectedParams.body.lock.expires_at = expiresAt;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with is_download_prevented to set the lock properties when just an is_download_prevented is passed', function() {

			var options = {
				is_download_prevented: isDownloadPrevented
			};

			expectedParams.body.lock.is_download_prevented = isDownloadPrevented;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID, options);
		});

		it('should make PUT request with mandatory parameters to set the lock properties when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.lock(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.lock(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.lock(FILE_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID, expectedParams);
			files.unlock(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.unlock(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.unlock(FILE_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
				parent: parent
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a name to restore a file when just a name is passed', function() {

			var options = {
				name: NEW_NAME
			};

			expectedParams.body.name = NEW_NAME;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with a parentFolderId to restore a file when just parentFolderID is passed', function() {

			var options = {
				parent_id: PARENT_ID
			};

			expectedParams.body.parent = parent;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, expectedParams);
			files.restoreFromTrash(FILE_ID, options);
		});

		it('should make POST request with an empty body to restore a file when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/files/' + FILE_ID, {body: {}});
			files.restoreFromTrash(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			files.restoreFromTrash(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			files.restoreFromTrash(FILE_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/versions', testParamsWithQs);
			files.getVersions(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getVersions(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getVersions(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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

			sandbox.mock(boxClientFake).expects('get').withArgs('/files/' + FILE_ID + '/watermark', testParamsWithQs)
				.returns(Promise.resolve({statusCode: 200, body: {}}));
			files.getWatermark(FILE_ID, testQS);
		});

		it('should call callback with error when API call returns error', function(done) {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.reject(apiError));
			files.getWatermark(FILE_ID, null, function(err) {

				assert.equal(err, apiError);
				done();
			});
		});

		it('should return promise that rejects when API call returns error', function() {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.reject(apiError));
			return files.getWatermark(FILE_ID)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should call callback with error when API call returns non-200 status code', function(done) {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.resolve(res));
			files.getWatermark(FILE_ID, null, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should return promise that rejects when API call returns non-200 status code', function() {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.resolve(res));
			return files.getWatermark(FILE_ID)
				.catch(err => {
					assert.instanceOf(err, Error);
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
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.resolve(res));
			files.getWatermark(FILE_ID, null, function(err, data) {

				assert.isNull(err, 'Error should be absent');
				assert.equal(data, watermark);
				done();
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
			sandbox.stub(boxClientFake, 'get').withArgs('/files/' + FILE_ID + '/watermark').returns(Promise.resolve(res));
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/files/' + FILE_ID + '/watermark', expectedParams);
			files.applyWatermark(FILE_ID, null);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			files.applyWatermark(FILE_ID, null);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			files.applyWatermark(FILE_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return files.applyWatermark(FILE_ID, null)
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeWatermark()', function() {

		it('should make DELETE call to remove watermark', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/watermark', null);
			files.removeWatermark(FILE_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			files.removeWatermark(FILE_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			files.removeWatermark(FILE_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
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
			sandbox.mock(boxClientFake).expects('del').withArgs('/files/' + FILE_ID + '/versions/' + FILE_VERSION_ID, null);
			files.deleteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			files.deleteVersion(FILE_ID, FILE_VERSION_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			files.deleteVersion(FILE_ID, FILE_VERSION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return files.deleteVersion(FILE_ID, FILE_VERSION_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getCollaborations()', function() {

		it('should make GET request to get file collaborations when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/files/1234/collaborations', testParamsWithQs);
			files.getCollaborations(FILE_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			files.getCollaborations(FILE_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			files.getCollaborations(FILE_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return files.getCollaborations(FILE_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

});
