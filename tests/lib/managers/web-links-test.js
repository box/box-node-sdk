/**
 * @fileoverview Weblinks Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	assert = require('chai').assert,
	Promise = require('bluebird'),
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	WebLinks,
	weblinks,
	testQS,
	testParamsWithQs,
	BASE_PATH = '/web_links',
	WEB_LINK_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/web-links';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('WebLinks', function() {

	beforeAll(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true
		});
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		WebLinks = require(MODULE_FILE_PATH);
		weblinks = new WebLinks(boxClientFake);
		testQS = { testQSKey: 'testQSValue'};
		testParamsWithQs = {qs: testQS};
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	afterAll(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {
		var parentID,
			url,
			name,
			description,
			expectedParams;

		beforeEach(function() {
			parentID = '1234';
			url = 'https://www.box.com';
			name = 'Box Website!';
			description = 'Cloud Content Management';
			expectedParams = {
				body: {
					url,
					parent: {
						id: parentID
					}
				}
			};
		});

		it('should make POST request with all parameters to create a web link when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name, description});
		});

		it('should make POST request with name to create a web link when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {name});
		});

		it('should make POST request with description to create a web link when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID, {description});
		});

		it('should make POST request with mandatory parameters to create a web link when neither optional parameter is passed', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs(BASE_PATH, expectedParams);
			weblinks.create(url, parentID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			weblinks.create(url, parentID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			weblinks.create(url, parentID, null, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return weblinks.create(url, parentID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get a web link when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, testParamsWithQs);
			weblinks.get(WEB_LINK_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			weblinks.get(WEB_LINK_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			weblinks.get(WEB_LINK_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return weblinks.get(WEB_LINK_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		var name,
			description,
			expectedParams;

		beforeEach(function() {
			name = 'Box Website!';
			description = 'Cloud Content Management';
			expectedParams = {
				body: {}
			};
		});

		it('should make PUT request with all parameters to update a weblink when all optional parameters are passed', function() {
			expectedParams.body.name = name;
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {name, description});
		});

		it('should make PUT request with name to update a weblink when just a name is passed', function() {
			expectedParams.body.name = name;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {name});
		});

		it('should make PUT request with description to update a weblink when just a description is passed', function() {
			expectedParams.body.description = description;

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, expectedParams);
			weblinks.update(WEB_LINK_ID, {description});
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			weblinks.update(WEB_LINK_ID, {description});
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			weblinks.update(WEB_LINK_ID, {name}, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return weblinks.update(WEB_LINK_ID, {description})
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to delete a web link when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`${BASE_PATH}/${WEB_LINK_ID}`, null);
			weblinks.delete(WEB_LINK_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			weblinks.delete(WEB_LINK_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			weblinks.delete(WEB_LINK_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return weblinks.delete(WEB_LINK_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('addToCollection()', function() {

		var COLLECTION_ID = '9873473596';

		it('should get current collections and add new collection when item has no collections', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: []
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [{id: COLLECTION_ID}]})
				.returns(Promise.resolve(webLink));

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should get current collections and add new collection when item has other collections', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [{id: '111'}]
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [
				{id: '111'},
				{id: COLLECTION_ID}
			]})
				.returns(Promise.resolve(webLink));

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same collections when item is already in the collection', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [
				{id: COLLECTION_ID},
				{id: '111'}
			]})
				.returns(Promise.resolve(webLink));

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should call callback with updated folder when API calls succeed', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			sandbox.stub(weblinks, 'get').returns(Promise.resolve(webLink));
			sandbox.stub(weblinks, 'update').returns(Promise.resolve(webLink));

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, webLink);
				done();
			});
		});

		it('should return promise resolving to the updated folder when API calls succeed', function() {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			sandbox.stub(weblinks, 'get').returns(Promise.resolve(webLink));
			sandbox.stub(weblinks, 'update').returns(Promise.resolve(webLink));

			return weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID)
				.then(data => {

					assert.equal(data, webLink);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var weblinksMock = sandbox.mock(weblinks);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(p);

			weblinksMock.expects('update').never();

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when getting current collections fails', function() {

			var error = new Error('Failed get');

			var weblinksMock = sandbox.mock(weblinks);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(p);

			weblinksMock.expects('update').never();

			return weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});

		it('should call callback with error when adding the collection fails', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
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
			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, expectedBody)
				.returns(p);

			weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var webLink = {
				id: WEB_LINK_ID,
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

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, expectedBody)
				.returns(p);

			return weblinks.addToCollection(WEB_LINK_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

	describe('removeFromCollection()', function() {

		var COLLECTION_ID = '98763';

		it('should get current collections and pass empty array when item is not in any collections', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: []
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: []})
				.returns(Promise.resolve(webLink));

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass empty array when item is in the collection to be removed', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [{id: COLLECTION_ID}]
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: []})
				.returns(Promise.resolve(webLink));

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass filtered array when item is in multiple collections', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(webLink));

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should get current collections and pass same array when item is in only other collections', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [
				{id: '111'},
				{id: '222'}
			]})
				.returns(Promise.resolve(webLink));

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, done);
		});

		it('should call callback with the updated folder when API calls succeed', function(done) {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			sandbox.stub(weblinks, 'get').returns(Promise.resolve(webLink));
			sandbox.stub(weblinks, 'update').returns(Promise.resolve(webLink));

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, webLink);
				done();
			});
		});

		it('should return promise resolving to the updated folder when API calls succeed', function() {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: '111'},
					{id: '222'}
				]
			};

			sandbox.stub(weblinks, 'get').returns(Promise.resolve(webLink));
			sandbox.stub(weblinks, 'update').returns(Promise.resolve(webLink));

			return weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID)
				.then(data => {
					assert.equal(data, webLink);
				});
		});

		it('should call callback with error when getting current collections fails', function(done) {

			var error = new Error('Failed get');

			var weblinksMock = sandbox.mock(weblinks);

			// Using Promise.reject() causes an unhandled rejection error, so make the promise reject asynchronously
			var p = Promise.delay(1).then(() => {
				throw error;
			});
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(p);
			weblinksMock.expects('update').never();

			weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID, function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return promise that rejects when adding the collection fails', function() {

			var webLink = {
				id: WEB_LINK_ID,
				collections: [
					{id: COLLECTION_ID},
					{id: '111'}
				]
			};

			var error = new Error('Failed update');

			var weblinksMock = sandbox.mock(weblinks);
			weblinksMock.expects('get').withArgs(WEB_LINK_ID, {fields: 'collections'})
				.returns(Promise.resolve(webLink));
			weblinksMock.expects('update').withArgs(WEB_LINK_ID, {collections: [{id: '111'}]})
				.returns(Promise.resolve(error));

			return weblinks.removeFromCollection(WEB_LINK_ID, COLLECTION_ID)
				.catch(err => {
					assert.equal(err, error);
				});
		});
	});

});
