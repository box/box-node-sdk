/**
 * @fileoverview Comments Manager Tests
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/comments/1234', testParamsWithQs);
			comments.get(COMMENT_ID, testQS);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/comments/1234', testParamsWithQs).yieldsAsync();
			comments.get(COMMENT_ID, testQS, done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/comments', expectedParams);
			comments.create(fileID, commentText);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/comments').yieldsAsync();
			comments.create(fileID, commentText, done);
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
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/comments', expectedParams);
			comments.createTaggedComment(fileID, taggedCommentText);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/comments').yieldsAsync();
			comments.createTaggedComment(fileID, taggedCommentText, done);
		});
	});

	describe('update()', function() {
		it('should make PUT request to update comment info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/comments/1234', testParamsWithBody);
			comments.update(COMMENT_ID, testBody);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/comments/1234', testParamsWithBody).yieldsAsync();
			comments.update(COMMENT_ID, testBody, done);
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to delete the comment when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/comments/1234', null);
			comments.delete(COMMENT_ID);
		});
		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/comments/1234', null).yieldsAsync();
			comments.delete(COMMENT_ID, done);
		});
	});

});
