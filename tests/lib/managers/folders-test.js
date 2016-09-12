/**
 * @fileoverview Folders Manager Tests
 * @author fschott
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
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
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/1234', testParamsWithQs);
			folders.get(FOLDER_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/folders/1234', testParamsWithQs).yieldsAsync();
			folders.get(FOLDER_ID, testQS, done);
		});
	});

	describe('getItems()', function() {
		it('should make GET request to get folder items when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/1234/items', testParamsWithQs);
			folders.getItems(FOLDER_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/folders/1234/items', testParamsWithQs).yieldsAsync();
			folders.getItems(FOLDER_ID, testQS, done);
		});
	});

	describe('getCollaborations()', function() {
		it('should make GET request to get folder collaborations when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/1234/collaborations', testParamsWithQs);
			folders.getCollaborations(FOLDER_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/folders/1234/collaborations', testParamsWithQs).yieldsAsync();
			folders.getCollaborations(FOLDER_ID, testQS, done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/folders', expectedParams);
			folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/folders').yieldsAsync();
			folders.create(PARENT_FOLDER_ID, NEW_FOLDER_NAME, done);
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
			sandbox.mock(boxClientFake).expects('post').withArgs('/folders/1234/copy', expectedParams);
			folders.copy(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should call the defaultResponseHandler wrapped callback when response is returned', function(done) {
			var callbackMock = sandbox.mock().never();
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withExactArgs(callbackMock).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/folders/1234/copy').yieldsAsync();
			folders.copy(FOLDER_ID, NEW_PARENT_ID, callbackMock);
		});

	});

	describe('update()', function() {
		it('should make PUT request to update folder info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/folders/1234', testParamsWithBody);
			folders.update(FOLDER_ID, testBody);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/folders/1234', testParamsWithBody).yieldsAsync();
			folders.update(FOLDER_ID, testBody, done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/folders/1234', expectedParams);
			folders.move(FOLDER_ID, NEW_PARENT_ID);
		});

		it('should call the defaultResponseHandler wrapped callback when response is returned', function(done) {
			var callbackMock = sandbox.mock().never();
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withExactArgs(callbackMock).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/folders/1234').yieldsAsync();
			folders.move(FOLDER_ID, testBody, callbackMock);
		});

	});

	describe('delete()', function() {
		it('should make DELETE request to update folder info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/folders/1234', testParamsWithQs);
			folders.delete(FOLDER_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/folders/1234', testParamsWithQs).yieldsAsync();
			folders.delete(FOLDER_ID, testQS, done);
		});
	});

	describe('getAllMetadata()', function() {

		it('should make GET call to fetch metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/1234/metadata', null);
			folders.getAllMetadata(FOLDER_ID, done);
		});
	});

	describe('getMetadata()', function() {

		it('should make GET call to fetch metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/1234/metadata/global/properties', null);
			folders.getMetadata(FOLDER_ID, 'global', 'properties', done);
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
			sandbox.mock(boxClientFake).expects('post').withArgs('/folders/1234/metadata/global/properties', expectedParams);
			folders.addMetadata(FOLDER_ID, 'global', 'properties', metadata, done);
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
			sandbox.mock(boxClientFake).expects('put').withArgs('/folders/1234/metadata/global/properties', expectedParams);
			folders.updateMetadata(FOLDER_ID, 'global', 'properties', patch, done);
		});
	});

	describe('deleteMetadata()', function() {

		it('should make DELETE call to remove metadata', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('del').withArgs('/folders/1234/metadata/global/properties', null);
			folders.deleteMetadata(FOLDER_ID, 'global', 'properties', done);
		});
	});

	describe('getTrashedFolder()', function() {
		it('should make GET request to get trashed folder when called', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/folders/' + FOLDER_ID + '/trash', testParamsWithQs);
			folders.getTrashedFolder(FOLDER_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/folders/' + FOLDER_ID + '/trash', testParamsWithQs).yieldsAsync();
			folders.getTrashedFolder(FOLDER_ID, testQS, done);
		});
	});

	describe('permanentlyDelete()', function() {

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/folders/' + FOLDER_ID + '/trash').yieldsAsync();
			folders.deletePermanently(FOLDER_ID, done);
		});

		it('should make DELETE call to remove folder permanently', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('del').withArgs('/folders/' + FOLDER_ID + '/trash', null);
			folders.deletePermanently(FOLDER_ID, done);
		});
	});

});
