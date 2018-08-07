/**
 * @fileoverview Folders Manager Tests
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
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Folders,
	folders,
	testQS = { testQSKey: 'testQSValue' },
	testBody = { my: 'body' },
	testParamsWithBody,
	testParamsWithQs,
	FOLDER_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/folders';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Folders', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false
		});
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		testParamsWithBody = {body: testBody};
		testParamsWithQs = {qs: testQS};
		// Setup File Under Test
		Folders = require(MODULE_FILE_PATH);
		folders = new Folders(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {
		it('should make GET request to get folder info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/folders/1234', testParamsWithQs);
			folders.get(FOLDER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.get(FOLDER_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.get(FOLDER_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.get(FOLDER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getItems()', function() {
		it('should make GET request to get folder items when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/folders/1234/items', testParamsWithQs);
			folders.getItems(FOLDER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.getItems(FOLDER_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.getItems(FOLDER_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.getItems(FOLDER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getCollaborations()', function() {
		it('should make GET request to get folder collaborations when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/folders/1234/collaborations', testParamsWithQs);
			folders.getCollaborations(FOLDER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.getCollaborations(FOLDER_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.getCollaborations(FOLDER_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.getCollaborations(FOLDER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('create()', function() {

		var PARENT_FOLDER_ID = '2345',
			NEW_FOLDER_NAME = 'some new folder name',
			expectedParams = {
				body: {
					parent: {
						id: PARENT_FOLDER_ID
					},
					name: NEW_FOLDER_NAME
				}
			};

		it('should make POST request to create a new folder when called', function() {
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/folders', expectedParams);
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME)
				.then(data => assert.equal(data, response));
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
				.withArgs('/folders/1234/copy', expectedParams);
			folders.copy(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should make POST request to copy the folder with optional parameters when passed', function() {

			var name = 'rename on copy';

			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/folders/1234/copy', expectedParams);
			folders.copy(FOLDER_ID, NEW_PARENT_ID, {name});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			folders.copy(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			folders.copy(FOLDER_ID, NEW_PARENT_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return folders.copy(FOLDER_ID, NEW_PARENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		it('should make PUT request to update folder info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/folders/1234', testParamsWithBody);
			folders.update(FOLDER_ID, testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			folders.update(FOLDER_ID, testBody);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			folders.update(FOLDER_ID, testBody, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return folders.update(FOLDER_ID, testBody)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addToCollection()', function() {

		var COLLECTION_ID = '9873473596';

		it('should get current collections and add new collection when item has no collections', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: []
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [{id: COLLECTION_ID}]})
				.returns(Promise.resolve(folder));

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should get current collections and add new collection when item has other collections', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [{id: '111'}]
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [
				{id: '111'},
				{id: COLLECTION_ID}
			]})
				.returns(Promise.resolve(folder));

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same collections when item is already in the collection', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [
				{id: COLLECTION_ID},
				{id: '111'}
			]})
				.returns(Promise.resolve(folder));

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should call callback with updated folder when API calls succeed', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			sandbox.stub(folders, 'get').returns(Promise.resolve(folder));
			sandbox.stub(folders, 'update').returns(Promise.resolve(folder));

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, folder);
				done();
			});
		});

		it('should return promise resolving to the updated folder when API calls succeed', function() {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			sandbox.stub(folders, 'get').returns(Promise.resolve(folder));
			sandbox.stub(folders, 'update').returns(Promise.resolve(folder));

			return folders.addToCollection(FOLDER_ID, COLLECTION_ID)
				.then(data => {

					assert.equal(data, folder);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var foldersMock = sandbox.mock(folders);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(p);

			foldersMock.expects('update').never();

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when getting current collections fails', function() {

			var error = new Error('Failed get');

			var foldersMock = sandbox.mock(folders);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(p);

			foldersMock.expects('update').never();

			return folders.addToCollection(FOLDER_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should call callback with error when adding the collection fails', function(done) {

			var folder = {
				id: FOLDER_ID,
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
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, expectedBody)
				.returns(p);

			folders.addToCollection(FOLDER_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var folder = {
				id: FOLDER_ID,
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
			var p = Promise.delay(1).then(() => {
				throw error;
			});

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, expectedBody)
				.returns(p);

			return folders.addToCollection(FOLDER_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

	describe('removeFromCollection()', function() {

		var COLLECTION_ID = '98763';

		it('should get current collections and pass empty array when item is not in any collections', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: []
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: []})
				.returns(Promise.resolve(folder));

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass empty array when item is in the collection to be removed', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [{id: COLLECTION_ID}]
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: []})
				.returns(Promise.resolve(folder));

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass filtered array when item is in multiple collections', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(folder));

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same array when item is in only other collections', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [
				{id: '111'},
				{id: '222'}
			]})
				.returns(Promise.resolve(folder));

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, done);
		});

		it('should call callback with the updated folder when API calls succeed', function(done) {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			sandbox.stub(folders, 'get').returns(Promise.resolve(folder));
			sandbox.stub(folders, 'update').returns(Promise.resolve(folder));

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, folder);
				done();
			});
		});

		it('should return promise resolving to the updated folder when API calls succeed', function() {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			sandbox.stub(folders, 'get').returns(Promise.resolve(folder));
			sandbox.stub(folders, 'update').returns(Promise.resolve(folder));

			return folders.removeFromCollection(FOLDER_ID, COLLECTION_ID)
				.then(data => {
					assert.equal(data, folder);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var foldersMock = sandbox.mock(folders);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(p);
			foldersMock.expects('update').never();

			folders.removeFromCollection(FOLDER_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var folder = {
				id: FOLDER_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var error = new Error('Failed update');

			var foldersMock = sandbox.mock(folders);
			foldersMock.expects('get').withArgs(FOLDER_ID, {fields: 'collections'})
				.returns(Promise.resolve(folder));
			foldersMock.expects('update').withArgs(FOLDER_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(error));

			return folders.removeFromCollection(FOLDER_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
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

		it('should make PUT request to update the folder parent ID when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/folders/1234', expectedParams);
			folders.move(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			folders.move(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			folders.move(FOLDER_ID, NEW_PARENT_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return folders.move(FOLDER_ID, NEW_PARENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to update folder info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/folders/1234', testParamsWithQs);
			folders.delete(FOLDER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			folders.delete(FOLDER_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			folders.delete(FOLDER_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return folders.delete(FOLDER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllMetadata()', function() {

		it('should make GET call to fetch metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/folders/1234/metadata', null);
			folders.getAllMetadata(FOLDER_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.getAllMetadata(FOLDER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.getAllMetadata(FOLDER_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.getAllMetadata(FOLDER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getMetadata()', function() {

		it('should make GET call to fetch metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/folders/1234/metadata/global/properties', null);
			folders.getMetadata(FOLDER_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.getMetadata(FOLDER_ID, 'global', 'properties');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.getMetadata(FOLDER_ID, 'global', 'properties', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.getMetadata(FOLDER_ID, 'global', 'properties')
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
				.withArgs('/folders/1234/metadata/global/properties', expectedParams);
			folders.addMetadata(FOLDER_ID, 'global', 'properties', metadata);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			folders.addMetadata(FOLDER_ID, 'global', 'properties', metadata);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			folders.addMetadata(FOLDER_ID, 'global', 'properties', metadata, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return folders.addMetadata(FOLDER_ID, 'global', 'properties', metadata)
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
				.withArgs('/folders/1234/metadata/global/properties', expectedParams);
			folders.updateMetadata(FOLDER_ID, 'global', 'properties', patch);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			folders.updateMetadata(FOLDER_ID, 'global', 'properties', patch);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			folders.updateMetadata(FOLDER_ID, 'global', 'properties', patch, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return folders.updateMetadata(FOLDER_ID, 'global', 'properties', patch)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deleteMetadata()', function() {

		it('should make DELETE call to remove metadata', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/folders/1234/metadata/global/properties', null);
			folders.deleteMetadata(FOLDER_ID, 'global', 'properties');
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			folders.deleteMetadata(FOLDER_ID, 'global', 'properties');
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			folders.deleteMetadata(FOLDER_ID, 'global', 'properties', function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return folders.deleteMetadata(FOLDER_ID, 'global', 'properties')
				.then(data => assert.equal(data, response));
		});
	});

	describe('getTrashedFolder()', function() {
		it('should make GET request to get trashed folder when called', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/folders/${FOLDER_ID}/trash`, testParamsWithQs);
			folders.getTrashedFolder(FOLDER_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			folders.getTrashedFolder(FOLDER_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			folders.getTrashedFolder(FOLDER_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return folders.getTrashedFolder(FOLDER_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('restoreFromTrash()', function() {

		var NAME = 'Folder Restored',
			PARENT_ID = '0',
			parent,
			expectedParams;

		beforeEach(function() {

			parent = {
				id: PARENT_ID
			};
			expectedParams = {body: {}};
		});

		it('should make POST request with all parameters to restore a folder when all optional parameters are passed', function() {

			var options = {
				name: NAME,
				parent_id: PARENT_ID
			};

			expectedParams.body = {
				name: NAME,
				parent
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/folders/${FOLDER_ID}`, expectedParams);
			folders.restoreFromTrash(FOLDER_ID, options);
		});

		it('should make POST request with a name to restore a folder when just a name is passed', function() {

			var options = {name: NAME};

			expectedParams.body.name = NAME;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/folders/${FOLDER_ID}`, expectedParams);
			folders.restoreFromTrash(FOLDER_ID, options);
		});

		it('should make POST request with a parentFolderId to restore a folder when just parent_id is passed', function() {

			var options = {
				parent_id: PARENT_ID
			};

			expectedParams.body.parent = parent;
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/folders/${FOLDER_ID}`, expectedParams);
			folders.restoreFromTrash(FOLDER_ID, options);
		});

		it('should make POST request with an empty body to restore a folder when neither optional parameter is passed', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(`/folders/${FOLDER_ID}`, {body: {}});
			folders.restoreFromTrash(FOLDER_ID, null);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			folders.restoreFromTrash(FOLDER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			folders.restoreFromTrash(FOLDER_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return folders.restoreFromTrash(FOLDER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('deletePermanently()', function() {

		it('should make DELETE call to remove folder permanently', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/folders/${FOLDER_ID}/trash`, null);
			folders.deletePermanently(FOLDER_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			folders.deletePermanently(FOLDER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			folders.deletePermanently(FOLDER_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return folders.deletePermanently(FOLDER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getWatermark()', function() {

		it('should make GET request to get file watermark info when called', function() {

			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/folders/${FOLDER_ID}/watermark`, testParamsWithQs)
				.returns(Promise.resolve({statusCode: 200, body: {}}));
			folders.getWatermark(FOLDER_ID, testQS);
		});

		it('should call callback with error when API call returns error', function(done) {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.reject(apiError));
			folders.getWatermark(FOLDER_ID, null, function(err) {

				assert.equal(err, apiError);
				done();
			});
		});

		it('should return promise that rejects when API call returns error', function() {

			var apiError = new Error('failed');
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.reject(apiError));
			return folders.getWatermark(FOLDER_ID)
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should call callback with error when API call returns non-200 status code', function(done) {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.resolve(res));
			folders.getWatermark(FOLDER_ID, null, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should return promise that rejects when API call returns non-200 status code', function() {

			var res = {statusCode: 404};
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.resolve(res));
			return folders.getWatermark(FOLDER_ID)
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
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.resolve(res));
			folders.getWatermark(FOLDER_ID, null, function(err, data) {

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
			sandbox.stub(boxClientFake, 'get').withArgs(`/folders/${FOLDER_ID}/watermark`)
				.returns(Promise.resolve(res));
			return folders.getWatermark(FOLDER_ID)
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
				.withArgs(`/folders/${FOLDER_ID}/watermark`, expectedParams);
			folders.applyWatermark(FOLDER_ID, null);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			folders.applyWatermark(FOLDER_ID, null);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			folders.applyWatermark(FOLDER_ID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return folders.applyWatermark(FOLDER_ID, null)
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeWatermark()', function() {

		it('should make DELETE call to remove watermark', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/folders/${FOLDER_ID}/watermark`, null);
			folders.removeWatermark(FOLDER_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			folders.removeWatermark(FOLDER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			folders.removeWatermark(FOLDER_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return folders.removeWatermark(FOLDER_ID)
				.then(data => assert.equal(data, response));
		});
	});
});
