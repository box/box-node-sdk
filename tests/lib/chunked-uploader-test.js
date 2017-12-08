/**
 * @fileoverview Chunked Uploader Tests
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
	ChunkedUploader,
	uploader,
	MODULE_FILE_PATH = '../../lib/chunked-uploader';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('ChunkedUploader', function() {

	const TEST_SESSION_ID = 'gn879wr4tguw4t7g345',
		TEST_UPLOAD_SESSION_INFO = {
			session_expires_at: '2020-12-31T11:58:00',
			id: TEST_SESSION_ID,
			part_size: 10,
			session_endpoints: {}
		};

	const TEST_FILE = 'abcdefghijklmnopqrstuvwxyz0123456789',
		TEST_HASH = crypto.createHash('sha1').update(TEST_FILE)
			.digest('base64');

	beforeEach(function() {

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.files = leche.fake(Files.prototype);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		ChunkedUploader = require(MODULE_FILE_PATH);
		uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.length);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should create an instance of EventEmitter when called', function() {

			let uploader2 = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.size);
			assert.instanceOf(uploader2, EventEmitter);
		});

		it('should set client and file on instance when source buffer is passed', function() {

			let uploader2 = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.size);
			assert.propertyVal(uploader2, '_client', boxClientFake);
			assert.propertyVal(uploader2, '_file', TEST_FILE);
			assert.notProperty(uploader2, '_stream');
		});

		it('should set client and file on instance when source string is passed', function() {

			let file = 'abc';

			let uploader2 = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, file, file.size);
			assert.propertyVal(uploader2, '_client', boxClientFake);
			assert.propertyVal(uploader2, '_file', file);
			assert.notProperty(uploader2, '_stream');
		});

		it('should set client and paused stream on instance when a stream is passed', function() {

			let streamFake = leche.fake(ReadStream.prototype);
			sandbox.mock(streamFake).expects('pause')
				.returnsThis();

			let uploader2 = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 0);
			assert.propertyVal(uploader2, '_client', boxClientFake);
			assert.notProperty(uploader2, '_file');
			assert.propertyVal(uploader2, '_stream', streamFake);
		});

		it('should throw an error when invalid file source is passed', function() {

			assert.throws(function() {
				/* eslint-disable no-unused-vars*/
				let uploader2 = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, {}, 0);
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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
			});

			it('should upload all chunks and commit when optional parameters are passed', function(done) {

				let options = {
					parallelism: 2,
					retryInterval: 500
				};

				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, TEST_FILE, TEST_FILE.length, options);

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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
				uploader.start();
			});

			it('should upload all chunks and commit when the file fits into fewer than the initial number of chunks', function(done) {

				let smallFile = 'abcdefghijklmnop',
					hash = crypto.createHash('sha1').update(smallFile)
						.digest('base64');

				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, smallFile, smallFile.length);

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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 16)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnop', 10, 16)
					.yieldsAsync(null, {part: expectedChunks[1]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
			});

			it('should upload all chunks and commit when the file is larger than the initial chunks', function(done) {

				let largeFile = 'part1 str.part2 str.part3 str.part4 str.part5 str.part6 str',
					hash = crypto.createHash('sha1').update(largeFile)
						.digest('base64');

				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, largeFile, largeFile.length);

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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part1 str.', 0, 59)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part2 str.', 10, 59)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part3 str.', 20, 59)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part4 str.', 30, 59)
					.yieldsAsync(null, {part: expectedChunks[3]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part5 str.', 40, 59)
					.yieldsAsync(null, {part: expectedChunks[4]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'part6 str', 50, 59)
					.yieldsAsync(null, {part: expectedChunks[5]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
			});

			it('should upload all chunks and commit when the file fits exactly in chunk boundaries', function(done) {

				let smallFile = '0123456789',
					hash = crypto.createHash('sha1').update(smallFile)
						.digest('base64');

				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, smallFile, smallFile.length);

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
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, smallFile, 0, 10)
					.yieldsAsync(null, {part: expectedChunks[0]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, hash, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);

				uploader.start();
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
				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);


				uploader.start();
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
				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);


				uploader.start();
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
				uploader = new ChunkedUploader(boxClientFake, TEST_UPLOAD_SESSION_INFO, streamFake, 36);
				uploader.on('chunkUploaded', chunk => chunks.push(chunk.part));
				uploader.on('uploadComplete', file => {

					assert.equal(file, createdFile);
					assert.sameMembers(chunks, expectedChunks);
					done();
				});


				let filesClientMock = sandbox.mock(boxClientFake.files);
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
					.yieldsAsync(null, {part: expectedChunks[0]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
					.yieldsAsync(null, {part: expectedChunks[1]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
					.yieldsAsync(null, {part: expectedChunks[2]});
				filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
					.yieldsAsync(null, {part: expectedChunks[3]});

				filesClientMock.expects('commitUploadSession').withArgs(TEST_SESSION_ID, TEST_HASH, {parts: sinon.match(expectedChunks)})
					.yieldsAsync(null, createdFile);


				uploader.start();
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

			uploader.on('chunkUploaded', () => assert.fail('Should not listen for chunk uploaded event'));
			uploader.on('chunkError', () => assert.fail('Should not listen for chunk error event'));
			uploader.on('aborted', () => {

				assert.property(uploader, '_chunks');
				assert.sameMembers(uploader._chunks, []);
				assert.propertyVal(uploader, '_file', null);
				assert.propertyVal(uploader, '_stream', null);
				done();
			});

			let filesClientMock = sandbox.mock(boxClientFake.files);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
				.yieldsAsync(null, {part: expectedChunks[0]});
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
				.yieldsAsync(null, {part: expectedChunks[1]});
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
				.yieldsAsync(uploadError);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
				.yieldsAsync(uploadAPIError);

			filesClientMock.expects('abortUploadSession').withArgs(TEST_SESSION_ID)
				.yieldsAsync(null);

			uploader.start();
			uploader.abort();
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

			uploader.on('chunkUploaded', () => assert.fail('Should not listen for chunk uploaded event'));
			uploader.on('chunkError', () => assert.fail('Should not listen for chunk error event'));
			uploader.on('aborted', () => assert.fail('Should not emit aborted event when abort fails'));
			uploader.on('abortFailed', err => {

				assert.equal(err, abortError);
				assert.property(uploader, '_chunks');
				assert.sameMembers(uploader._chunks, []);
				assert.propertyVal(uploader, '_file', null);
				assert.propertyVal(uploader, '_stream', null);
				done();
			});

			let filesClientMock = sandbox.mock(boxClientFake.files);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'abcdefghij', 0, 36)
				.yieldsAsync(null, {part: expectedChunks[0]});
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'klmnopqrst', 10, 36)
				.yieldsAsync(null, {part: expectedChunks[1]});
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, 'uvwxyz0123', 20, 36)
				.yieldsAsync(uploadError);
			filesClientMock.expects('uploadPart').withArgs(TEST_SESSION_ID, '456789', 30, 36)
				.yieldsAsync(uploadAPIError);

			filesClientMock.expects('abortUploadSession').withArgs(TEST_SESSION_ID)
				.yieldsAsync(abortError);

			uploader.start();
			uploader.abort();
		});
	});

});
