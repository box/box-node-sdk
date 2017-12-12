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
	Promise = require('bluebird'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	CollaborationWhitelist,
	collaborationWhitelist,
	testQS = { testQSKey: 'testQSValue' },
	testParamsWithQs,
	COLLABORATION_WHITELIST_ID = '1234',
	USER_COLLABORATION_WHITELIST_ID = '5678',
	USER_ID = '12345678',
	MODULE_FILE_PATH = '../../../lib/managers/collaboration-whitelist';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('CollaborationWhitelist', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);
	});

	beforeEach(function() {
		testParamsWithQs = {qs: testQS};
		// Setup File Under Test
		CollaborationWhitelist = require(MODULE_FILE_PATH);
		collaborationWhitelist = new CollaborationWhitelist(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('addDomain()', function() {
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
			collaborationWhitelist.addDomain(domainToWhitelist, 'both');
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborationWhitelist.addDomain(domainToWhitelist, 'both');
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationWhitelist.addDomain(domainToWhitelist, 'both', function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationWhitelist.addDomain(domainToWhitelist, 'both')
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeDomain()', function() {
		it('should make DELETE request to update collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaboration_whitelist_entries/1234', null);
			collaborationWhitelist.removeDomain(COLLABORATION_WHITELIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			collaborationWhitelist.removeDomain(COLLABORATION_WHITELIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationWhitelist.removeDomain(COLLABORATION_WHITELIST_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationWhitelist.removeDomain(COLLABORATION_WHITELIST_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getWhitelistedDomain()', function() {
		it('should make GET request to get collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_entries/1234', testParamsWithQs).returns(Promise.resolve());
			collaborationWhitelist.getWhitelistedDomain(COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getWhitelistedDomain(COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getWhitelistedDomain(COLLABORATION_WHITELIST_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getWhitelistedDomain(COLLABORATION_WHITELIST_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllWhitelistedDomains()', function() {
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
			collaborationWhitelist.getAllWhitelistedDomains(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getAllWhitelistedDomains(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getAllWhitelistedDomains(options, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getAllWhitelistedDomains(options)
				.then(data => assert.equal(data, response));
		});

		it('should make GET request to get all collaboration whitelists info with no params when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_entries').returns(Promise.resolve());
			collaborationWhitelist.getAllWhitelistedDomains();
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getAllWhitelistedDomains();
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getAllWhitelistedDomains(null, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getAllWhitelistedDomains()
				.then(data => assert.equal(data, response));
		});
	});

	describe('addExemption()', function() {
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
			collaborationWhitelist.addExemption(USER_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			collaborationWhitelist.addExemption(USER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationWhitelist.addExemption(USER_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationWhitelist.addExemption(USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getExemption()', function() {
		it('should make GET request to get collaboration whitelist info for a user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_exempt_targets/5678', testParamsWithQs).returns(Promise.resolve());
			collaborationWhitelist.getExemption(USER_COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getExemption(USER_COLLABORATION_WHITELIST_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getExemption(USER_COLLABORATION_WHITELIST_ID, testQS, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getExemption(USER_COLLABORATION_WHITELIST_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllExemptions()', function() {
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
			collaborationWhitelist.getAllExemptions(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getAllExemptions(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getAllExemptions(options, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getAllExemptions(options)
				.then(data => assert.equal(data, response));
		});

		it('should make GET request to get all collaboration whitelists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/collaboration_whitelist_exempt_targets').returns(Promise.resolve());
			collaborationWhitelist.getAllExemptions();
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			collaborationWhitelist.getAllExemptions();
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationWhitelist.getAllExemptions(null, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationWhitelist.getAllExemptions()
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeExemption()', function() {
		it('should make DELETE request to update user collaboration whitelist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/collaboration_whitelist_exempt_targets/5678', null);
			collaborationWhitelist.removeExemption(USER_COLLABORATION_WHITELIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			collaborationWhitelist.removeExemption(USER_COLLABORATION_WHITELIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationWhitelist.removeExemption(USER_COLLABORATION_WHITELIST_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationWhitelist.removeExemption(USER_COLLABORATION_WHITELIST_ID)
				.then(data => assert.equal(data, response));
		});
	});
});
