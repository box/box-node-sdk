/**
 * @fileoverview SignRequests Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	SignRequests,
	signRequests,
	testQS,
	BASE_PATH = '/sign_requests',
	MODULE_FILE_PATH = '../../../lib/managers/sign-requests.generated';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('SignRequests', function() {
	before(function() {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true,
		});
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		SignRequests = require(MODULE_FILE_PATH);
		signRequests = new SignRequests(boxClientFake);
		testQS = { testQSKey: 'testQSValue' };
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
		var signers, sourceFiles, parentFolder, expectedParams;

		beforeEach(function() {
			signers = [
				{
					role: 'signer',
					email: 'mhagmajer@gmail.com',
				},
			];
			sourceFiles = [
				{
					type: 'file',
					id: '847129705371',
				},
			];
			parentFolder = {
				type: 'folder',
				id: '135393938385',
			};
			expectedParams = {
				body: {
					signers,
					source_files: sourceFiles,
					parent_folder: parentFolder,
				},
				qs: testQS,
			};
		});

		it('should make POST request with all parameters to create a sign request when all optional parameters are passed', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects('post')
				.withArgs(BASE_PATH, expectedParams);
			signRequests.create(
				{ signers, source_files: sourceFiles, parent_folder: parentFolder },
				testQS
			);
		});
	});
});
