/**
 * @fileoverview Upload Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	leche = require('leche');

const BoxClient = require('../../lib/box-client'),
	Files = require('../../lib/managers/files'),
	EventEmitter = require('events').EventEmitter,
	ReadStream = require('fs').ReadStream,
	crypto = require('crypto');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
let sandbox = sinon.sandbox.create(),
	boxClientFake,
	UploadManager,
	uploadManager,
	MODULE_FILE_PATH = '../../lib/upload-manager';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('UploadManager', function() {

	const TEST_SESSION_ID = 'gn879wr4tguw4t7g345',
		TEST_UPLOAD_SESSION_INFO = {
			session_expires_at: '2020-12-31T11:58:00',
			upload_session_id: TEST_SESSION_ID,
			part_size: 10,
			session_endpoints: {}
		};

	const TEST_FILE = 'abcdefghijklmnopqrstuvwxyz0123456789',
		TEST_HASH = crypto.createHash('sha1').update(TEST_FILE).digest('base64');

	beforeEach(function() {

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.files = leche.fake(Files.prototype);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		UploadManager = require(MODULE_FILE_PATH);
		uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.length);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should create an instance of EventEmitter when called', function() {

			let upload = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.size);
			assert.instanceOf(upload, EventEmitter);
		});

		it('should set client and file on instance when source buffer is passed', function() {

			let upload = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.size);
			assert.propertyVal(upload, 'client', boxClientFake);
			assert.propertyVal(upload, 'file', TEST_FILE);
			assert.notProperty(upload, 'stream');
		});

		it('should set client and file on instance when source string is passed', function() {

			let file = 'abc';

			let upload = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, file, file.size);
			assert.propertyVal(upload, 'client', boxClientFake);
			assert.propertyVal(upload, 'file', file);
			assert.notProperty(upload, 'stream');
		});

		it('should set client and paused stream on instance when a stream is passed', function() {

			let streamFake = leche.fake(ReadStream.prototype);
			sandbox.mock(streamFake).expects('pause').returnsThis();

			let upload = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 0);
			assert.propertyVal(upload, 'client', boxClientFake);
			assert.notProperty(upload, 'file');
			assert.propertyVal(upload, 'stream', streamFake);
		});

		it('should throw an error when invalid file source is passed', function() {

			assert.throws(function() {
				/* eslint-disable no-unused-vars*/
				let upload = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, {}, 0);
				/* eslint-enable no-unused-vars*/
			}, TypeError);
		});
	});

	describe('start', function() {

		describe('with whole file buffered', function() {

			it('should upload all chunks and commit when the file fits into the initial pieces', function(done) {

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: TEST_HASH
				};

				let chunks = [];
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(null, expectedChunks[3]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);

				uploadManager.start();
			});

			it('should upload all chunks and commit when start is called multiple times', function(done) {

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: TEST_HASH
				};

				let chunks = [];
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(null, expectedChunks[3]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);

				uploadManager.start();
				uploadManager.start();
			});

			it('should upload all chunks and commit when the file fits into fewer than the initial number of chunks', function(done) {

				let smallFile = 'abcdefghijklmnop',
					hash = crypto.createHash('sha1').update(smallFile).digest('base64');

				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, smallFile, smallFile.length);

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: hash
				};

				let chunks = [];
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 16, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnop', 10, 16, null).yieldsAsync(null, expectedChunks[1]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);

				uploadManager.start();
			});

			it('should upload all chunks and commit when the file is larger than the initial chunks', function(done) {

				let largeFile = 'part1 str.part2 str.part3 str.part4 str.part5 str.part6 str',
					hash = crypto.createHash('sha1').update(largeFile).digest('base64');

				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, largeFile, largeFile.length);

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 30,
						size: 10
					},
					{
						part_id: '00000005',
						offset: 40,
						size: 10
					},
					{
						part_id: '00000006',
						offset: 50,
						size: 9
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: hash
				};

				let chunks = [];
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part1 str.', 0, 59, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part2 str.', 10, 59, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part3 str.', 20, 59, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part4 str.', 30, 59, null).yieldsAsync(null, expectedChunks[3]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part5 str.', 40, 59, null).yieldsAsync(null, expectedChunks[4]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part6 str', 50, 59, null).yieldsAsync(null, expectedChunks[5]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);

				uploadManager.start();
			});

			it('should upload all chunks and commit when the file fits exactly in chunk boundaries', function(done) {

				let smallFile = '0123456789',
					hash = crypto.createHash('sha1').update(smallFile).digest('base64');

				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, smallFile, smallFile.length);

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: hash
				};

				let chunks = [];
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, smallFile, 0, 10, null).yieldsAsync(null, expectedChunks[0]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);

				uploadManager.start();
			});
		});

		describe('with file read stream', function() {

			it('should upload all chunks and commit when the stream returns all chunks immediately', function(done) {

				let streamFake = leche.fake(ReadStream.prototype);
				sandbox.stub(streamFake, 'pause').returnsThis();
				let readStub = sandbox.stub(streamFake, 'read');
				readStub.onCall(0).returns('abcdefghij');
				readStub.onCall(1).returns('klmnopqrst');
				readStub.onCall(2).returns('uvwxyz0123');
				readStub.onCall(3).returns('456789');

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: TEST_HASH
				};

				let chunks = [];
				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(null, expectedChunks[3]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);


				uploadManager.start();
			});

			it('should upload all chunks and commit when the stream does not always have the data ready', function(done) {

				let streamFake = leche.fake(ReadStream.prototype);
				sandbox.stub(streamFake, 'pause').returnsThis();
				let readStub = sandbox.stub(streamFake, 'read');
				readStub.onCall(0).returns('abcdefghij');
				readStub.onCall(1).returns(null);
				readStub.onCall(2).returns('klmnopqrst');
				readStub.onCall(3).returns(null);
				readStub.onCall(4).returns(null);
				readStub.onCall(5).returns('uvwxyz0123');
				readStub.onCall(6).returns('456789');

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: TEST_HASH
				};

				let chunks = [];
				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(null, expectedChunks[3]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);


				uploadManager.start();
			});

			it('should upload all chunks and commit when the stream ends with a large buffer', function(done) {

				let streamFake = leche.fake(ReadStream.prototype);
				sandbox.stub(streamFake, 'pause').returnsThis();
				let readStub = sandbox.stub(streamFake, 'read');
				readStub.onCall(0).returns('abcdefghij');
				readStub.onCall(1).returns('klmnopqrstuvwxyz0123456789');

				let expectedChunks = [
					{
						part_id: '00000001',
						offset: 0,
						size: 10
					},
					{
						part_id: '00000002',
						offset: 10,
						size: 10
					},
					{
						part_id: '00000003',
						offset: 20,
						size: 10
					},
					{
						part_id: '00000004',
						offset: 10,
						size: 6
					}
				];

				let createdFile = {
					type: 'file',
					id: '785692378452345',
					sha1: TEST_HASH
				};

				let chunks = [];
				uploadManager = new UploadManager(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploadManager.on('chunkUploaded', chunk => chunks.push(chunk));
				uploadManager.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(null, expectedChunks[2]);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(null, expectedChunks[3]);

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, sinon.match(expectedChunks)).yieldsAsync(null, createdFile);


				uploadManager.start();
			});
		});
	});

	describe('abort()', function() {

		it('should remove event listeners and cancel each existing chunk when called', function(done) {

			let uploadError = new Error('Chunk totally failed!');
			let uploadAPIError = new Error('Chunk failed in API');
			uploadAPIError.statusCode = 500;

			let expectedChunks = [
				{
					part_id: '00000001',
					offset: 0,
					size: 10
				},
				{
					part_id: '00000002',
					offset: 10,
					size: 10
				}
			];

			uploadManager.on('chunkUploaded', () => assert.fail('Should not listen for chunk uploaded event'));
			uploadManager.on('error', () => assert.fail('Should not listen for chunk error event'));
			uploadManager.on('aborted', () => {

				assert.property(uploadManager, 'chunks');
				assert.sameMembers(uploadManager.chunks, []);
				assert.propertyVal(uploadManager, 'file', null);
				assert.propertyVal(uploadManager, 'stream', null);
				done();
			});

			let filesClientMock = sandbox.mock(boxClientFake.files);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(uploadError);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(uploadAPIError);

			filesClientMock.expects('abortUploadSession').withArgs(TEST_SESSION_ID).yieldsAsync(null);

			uploadManager.start();
			uploadManager.abort();
		});

		it('should emit abortFailed event when abort fails', function(done) {

			let uploadError = new Error('Chunk totally failed!');
			let uploadAPIError = new Error('Chunk failed in API');
			uploadAPIError.statusCode = 500;
			let abortError = new Error('Could not delete upload session');

			let expectedChunks = [
				{
					part_id: '00000001',
					offset: 0,
					size: 10
				},
				{
					part_id: '00000002',
					offset: 10,
					size: 10
				}
			];

			uploadManager.on('chunkUploaded', () => assert.fail('Should not listen for chunk uploaded event'));
			uploadManager.on('error', () => assert.fail('Should not listen for chunk error event'));
			uploadManager.on('aborted', () => assert.fail('Should not emit aborted event when abort fails'));
			uploadManager.on('abortFailed', err => {

				assert.equal(err, abortError);
				assert.property(uploadManager, 'chunks');
				assert.sameMembers(uploadManager.chunks, []);
				assert.propertyVal(uploadManager, 'file', null);
				assert.propertyVal(uploadManager, 'stream', null);
				done();
			});

			let filesClientMock = sandbox.mock(boxClientFake.files);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36, null).yieldsAsync(null, expectedChunks[0]);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36, null).yieldsAsync(null, expectedChunks[1]);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36, null).yieldsAsync(uploadError);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36, null).yieldsAsync(uploadAPIError);

			filesClientMock.expects('abortUploadSession').withArgs(TEST_SESSION_ID).yieldsAsync(abortError);

			uploadManager.start();
			uploadManager.abort();
		});
	});

});
