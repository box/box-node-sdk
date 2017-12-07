/**
 * @fileoverview Collaboration Whitelists Manager Tests
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
	CollaborationWhitelists,
	collaborationWhitelists,
	testQS = { testQSKey: 'testQSValue' },
	testParamsWithQs,
	COLLABORATION_WHITELIST_ID = '1234',
	USER_COLLABORATION_WHITELIST_ID = '5678',
	USER_ID = '12345678',
	MODULE_FILE_PATH = '../../../lib/managers/collaboration-whitelists';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe.only('CollaborationWhitelists', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		testParamsWithQs = {qs: testQS};
		// Setup File Under Test
		CollaborationWhitelists = require(MODULE_FILE_PATH);
		collaborationWhitelists = new CollaborationWhitelists(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('create()', function() {
		var domainToWhitelist = 'test.com';
		var expectedParams = {
			body: {
				domain: domainToWhitelist,
				direction: 'both'
			}
		};

		it('should make POST request to create a new collaboration whitelist when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaboration_whitelist_entries', expectedParams);
			collaborationWhitelists.create(domainToWhitelist, 'both');
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborationWhitelists.create(domainToWhitelist, 'both');
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationWhitelists.create(domainToWhitelist, 'both', function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationWhitelists.create(domainToWhitelist, 'both')
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {
		it('should make DELETE request to update collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaboration_whitelist_entries/1234', null);
			collaborationWhitelists.delete(COLLABORATION_WHITELIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			collaborationWhitelists.delete(COLLABORATION_WHITELIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationWhitelists.delete(COLLABORATION_WHITELIST_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationWhitelists.delete(COLLABORATION_WHITELIST_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {
		it('should make GET request to get collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_entries/1234', testParamsWithQs).returns(Promise.resolve());
			collaborationWhitelists.get(COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.get(COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.get(COLLABORATION_WHITELIST_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.get(COLLABORATION_WHITELIST_ID, testQS)
					.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {
		var options = {
			limit: 5
		};

		var testWhitelistQS = {
			qs: {
				limit: 5
			}
		};

		it('should make GET request to get all collaboration whitelists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_entries', testWhitelistQS).returns(Promise.resolve());
			collaborationWhitelists.getAll(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.getAll(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.getAll(options, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.getAll(options)
					.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {
		it('should make GET request to get all collaboration whitelists info with no params when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_entries').returns(Promise.resolve());
			collaborationWhitelists.getAll();
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.getAll();
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.getAll(null, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.getAll()
					.then(data => assert.equal(data, response));
		});
	});

	describe('addUser()', function() {
		var expectedParams = {
			body: {
				user: {
					type: 'user',
					id: USER_ID
				}
			}
		};

		it('should make POST request to create collaboration whitelist info for a user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/collaboration_whitelist_exempt_targets', expectedParams).returns(Promise.resolve());
			collaborationWhitelists.addUser(USER_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborationWhitelists.addUser(USER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationWhitelists.addUser(USER_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationWhitelists.addUser(USER_ID)
					.then(data => assert.equal(data, response));
		});
	});

	describe('getForUser()', function() {
		it('should make GET request to get collaboration whitelist info for a user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_exempt_targets/5678', testParamsWithQs).returns(Promise.resolve());
			collaborationWhitelists.getForUser(USER_COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.getForUser(USER_COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.getForUser(USER_COLLABORATION_WHITELIST_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.getForUser(USER_COLLABORATION_WHITELIST_ID, testQS)
					.then(data => assert.equal(data, response));
		});
	});

	describe('getAllForUsers()', function() {
		var options = {
			limit: 5
		};

		var testWhitelistQS = {
			qs: {
				limit: 5
			}
		};

		it('should make GET request to get all collaboration whitelists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_exempt_targets', testWhitelistQS).returns(Promise.resolve());
			collaborationWhitelists.getAllForUsers(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.getAllForUsers(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.getAllForUsers(options, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.getAllForUsers(options)
					.then(data => assert.equal(data, response));
		});
	});

	describe('getAllForUsers()', function() {
		it('should make GET request to get all collaboration whitelists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_exempt_targets').returns(Promise.resolve());
			collaborationWhitelists.getAllForUsers();
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelists.getAllForUsers();
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelists.getAllForUsers(null, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelists.getAllForUsers()
					.then(data => assert.equal(data, response));
		});
	});

	describe('deleteForUser()', function() {
		it('should make DELETE request to update user collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaboration_whitelist_exempt_targets/5678', null);
			collaborationWhitelists.deleteForUser(USER_COLLABORATION_WHITELIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			collaborationWhitelists.deleteForUser(USER_COLLABORATION_WHITELIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationWhitelists.deleteForUser(USER_COLLABORATION_WHITELIST_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationWhitelists.deleteForUser(USER_COLLABORATION_WHITELIST_ID)
				.then(data => assert.equal(data, response));
		});
	});
});
