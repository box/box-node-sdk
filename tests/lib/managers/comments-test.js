/**
 * @fileoverview Comments Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Comments,
	comments,
	testQS = { testQSKey: 'testQSValue' },
	testBody = { my: 'body' },
	testParamsWithBody,
	testParamsWithQs,
	COMMENT_ID = '1234',
	MODULE_FILE_PATH = '../../../lib/managers/comments';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Comments', function() {

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
		Comments = require(MODULE_FILE_PATH);
		comments = new Comments(boxClientFake);
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
		it('should make GET request to get comment info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/comments/1234', testParamsWithQs);
			comments.get(COMMENT_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			comments.get(COMMENT_ID, testQS);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return comments.get(COMMENT_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('create()', function() {

		var fileID,
			commentText,
			expectedParams;

		beforeEach(function() {
			fileID = '2345';
			commentText = 'some comment text';
			expectedParams = {
				body: {
					item: {
						type: 'file',
						id: fileID
					},
					message: commentText
				}
			};
		});

		it('should make POST request to create a new comment when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/comments', expectedParams);
			comments.create(fileID, commentText);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			comments.create(fileID, commentText);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return comments.create(fileID, commentText)
				.then(data => assert.equal(data, response));
		});
	});

	describe('createTaggedComment()', function() {

		var fileID,
			expectedParams,
			taggedCommentText;

		beforeEach(function() {
			fileID = '2345';
			taggedCommentText = 'some comment text @[123:test@box.com]';
			expectedParams = {
				body: {
					item: {
						type: 'file',
						id: fileID
					},
					tagged_message: taggedCommentText
				}
			};
		});

		it('should make POST request to create a new tagged comment when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/comments', expectedParams);
			comments.createTaggedComment(fileID, taggedCommentText);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			comments.create(fileID, taggedCommentText);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return comments.create(fileID, taggedCommentText)
				.then(data => assert.equal(data, response));
		});
	});

	describe('update()', function() {
		it('should make PUT request to update comment info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/comments/1234', testParamsWithBody);
			comments.update(COMMENT_ID, testBody);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
			comments.update(COMMENT_ID, testBody);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return comments.update(COMMENT_ID, testBody)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to delete the comment when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/comments/1234');
			comments.delete(COMMENT_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			comments.delete(COMMENT_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return comments.delete(COMMENT_ID)
				.then(data => assert.equal(data, response));
		});
	});

});
