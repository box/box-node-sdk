/**
 * @fileoverview Collaboration Allowlists Manager Tests
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
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	CollaborationAllowlist,
	collaborationAllowlist,
	testQS = { testQSKey: 'testQSValue' },
	testParamsWithQs,
	COLLABORATION_ALLOWLIST_ID = '1234',
	USER_COLLABORATION_ALLOWLIST_ID = '5678',
	USER_ID = '12345678',
	MODULE_FILE_PATH = '../../../lib/managers/collaboration-allowlist';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('CollaborationAllowlist', function() {
	beforeAll(function() {
		// Enable Mockery
		mockery.enable({ warnOnUnregistered: false });
		// Register Mocks
		mockery.registerAllowable(MODULE_FILE_PATH, true);
	});

	beforeEach(function() {
		testParamsWithQs = { qs: testQS };
		// Setup File Under Test
		CollaborationAllowlist = require(MODULE_FILE_PATH);
		collaborationAllowlist = new CollaborationAllowlist(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	afterAll(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('addDomain()', function() {
		var domainToAllowlist = 'test.com';
		var expectedParams = {
			body: {
				domain: domainToAllowlist,
				direction: 'both',
			},
		};

		it('should make POST request to create a new collaboration allowlist when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/collaboration_whitelist_entries', expectedParams);
			collaborationAllowlist.addDomain(domainToAllowlist, 'both');
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post');
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			collaborationAllowlist.addDomain(domainToAllowlist, 'both');
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationAllowlist.addDomain(
				domainToAllowlist,
				'both',
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationAllowlist
				.addDomain(domainToAllowlist, 'both')
				.then(data => assert.equal(data, response));
		});
	});

	describe('removeDomain()', function() {
		it('should make DELETE request to update collaboration allowlist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('del')
				.withArgs('/collaboration_whitelist_entries/1234', null);
			collaborationAllowlist.removeDomain(COLLABORATION_ALLOWLIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			collaborationAllowlist.removeDomain(COLLABORATION_ALLOWLIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationAllowlist.removeDomain(
				COLLABORATION_ALLOWLIST_ID,
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationAllowlist
				.removeDomain(COLLABORATION_ALLOWLIST_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllowlistedDomain()', function() {
		it('should make GET request to get collaboration allowlist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/collaboration_whitelist_entries/1234', testParamsWithQs)
				.returns(Promise.resolve());
			collaborationAllowlist.getAllowlistedDomain(
				COLLABORATION_ALLOWLIST_ID,
				testQS
			);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			collaborationAllowlist.getAllowlistedDomain(
				COLLABORATION_ALLOWLIST_ID,
				testQS
			);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationAllowlist.getAllowlistedDomain(
				COLLABORATION_ALLOWLIST_ID,
				testQS,
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationAllowlist
				.getAllowlistedDomain(COLLABORATION_ALLOWLIST_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllAllowlistedDomains()', function() {
		var options = {
			limit: 5,
		};

		var testAllowlistQS = {
			qs: {
				limit: 5,
			},
		};

		it('should make GET request to get all collaboration allowlists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/collaboration_whitelist_entries', testAllowlistQS)
				.returns(Promise.resolve());
			collaborationAllowlist.getAllAllowlistedDomains(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			collaborationAllowlist.getAllAllowlistedDomains(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationAllowlist.getAllAllowlistedDomains(
				options,
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationAllowlist
				.getAllAllowlistedDomains(options)
				.then(data => assert.equal(data, response));
		});

		it('should make GET request to get all collaboration allowlists info with no params when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/collaboration_whitelist_entries')
				.returns(Promise.resolve());
			collaborationAllowlist.getAllAllowlistedDomains();
		});
	});

	describe('addExemption()', function() {
		var expectedParams = {
			body: {
				user: {
					type: 'user',
					id: USER_ID,
				},
			},
		};

		it('should make POST request to create collaboration allowlist info for a user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs('/collaboration_whitelist_exempt_targets', expectedParams)
				.returns(Promise.resolve());
			collaborationAllowlist.addExemption(USER_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
			collaborationAllowlist.addExemption(USER_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			collaborationAllowlist.addExemption(USER_ID, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return collaborationAllowlist
				.addExemption(USER_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getExemption()', function() {
		it('should make GET request to get collaboration allowlist info for a user when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs(
					'/collaboration_whitelist_exempt_targets/5678',
					testParamsWithQs
				)
				.returns(Promise.resolve());
			collaborationAllowlist.getExemption(
				USER_COLLABORATION_ALLOWLIST_ID,
				testQS
			);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			collaborationAllowlist.getExemption(
				USER_COLLABORATION_ALLOWLIST_ID,
				testQS
			);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationAllowlist.getExemption(
				USER_COLLABORATION_ALLOWLIST_ID,
				testQS,
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationAllowlist
				.getExemption(USER_COLLABORATION_ALLOWLIST_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAllExemptions()', function() {
		var options = {
			limit: 5,
		};

		var testAllowlistQS = {
			qs: {
				limit: 5,
			},
		};

		it('should make GET request to get all collaboration allowlists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/collaboration_whitelist_exempt_targets', testAllowlistQS)
				.returns(Promise.resolve());
			collaborationAllowlist.getAllExemptions(options);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			collaborationAllowlist.getAllExemptions(options);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			collaborationAllowlist.getAllExemptions(options, function(err, data) {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return collaborationAllowlist
				.getAllExemptions(options)
				.then(data => assert.equal(data, response));
		});

		it('should make GET request to get all collaboration allowlists info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('get')
				.withArgs('/collaboration_whitelist_exempt_targets')
				.returns(Promise.resolve());
			collaborationAllowlist.getAllExemptions();
		});
	});

	describe('removeExemption()', function() {
		it('should make DELETE request to update user collaboration allowlist info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('del')
				.withArgs('/collaboration_whitelist_exempt_targets/5678', null);
			collaborationAllowlist.removeExemption(USER_COLLABORATION_ALLOWLIST_ID);
		});

		it('should wrap with default handler when called', function() {
			sandbox.stub(boxClientFake, 'del');
			sandbox
				.mock(boxClientFake)
				.expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			collaborationAllowlist.removeExemption(USER_COLLABORATION_ALLOWLIST_ID);
		});

		it('should pass results to callback when callback is present', function(done) {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			collaborationAllowlist.removeExemption(
				USER_COLLABORATION_ALLOWLIST_ID,
				function(err, data) {
					assert.ifError(err);
					assert.equal(data, response);
					done();
				}
			);
		});

		it('should return promise resolving to results when called', function() {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return collaborationAllowlist
				.removeExemption(USER_COLLABORATION_ALLOWLIST_ID)
				.then(data => assert.equal(data, response));
		});
	});
});
