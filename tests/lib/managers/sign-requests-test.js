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

describe('SignRequests', () => {
	before(() => {
		// Enable Mockery
		mockery.enable({
			useCleanCache: true,
		});
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(() => {
		// Setup File Under Test
		SignRequests = require(MODULE_FILE_PATH);
		signRequests = new SignRequests(boxClientFake);
		testQS = { testQSKey: 'testQSValue' };
	});

	afterEach(() => {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	[
		{
			name: 'getById',
			args: [
				{
					sign_request_id: '12345',
				},
			],
			expectedMethod: 'get',
			expectedPath: args => `${BASE_PATH}/${args[0].sign_request_id}`,
			expectedParams: args => ({ qs: args[0] }),
		},
		{
			name: 'getAll',
			args: [],
			expectedMethod: 'get',
			expectedPath: () => BASE_PATH,
			expectedParams: () => ({ qs: undefined }),
		},
		{
			name: 'create',
			args: [
				{
					signers: [
						{
							role: 'signer',
							email: 'signer@example.com',
						},
					],
					source_files: [
						{
							type: 'file',
							id: '1234567890',
						},
					],
					parent_folder: {
						type: 'folder',
						id: '1234567890',
					},
				},
				testQS,
			],
			expectedMethod: 'post',
			expectedPath: () => BASE_PATH,
			expectedParams: args => ({
				body: args[0],
				qs: args[1],
			}),
		},
		{
			name: 'cancelById',
			args: [
				{
					sign_request_id: '12345',
				},
			],
			expectedMethod: 'post',
			expectedPath: args => `${BASE_PATH}/${args[0].sign_request_id}/cancel`,
			expectedParams: args => ({ qs: args[0] }),
		},
		{
			name: 'resendById',
			args: [
				{
					sign_request_id: '12345',
				},
			],
			expectedMethod: 'post',
			expectedPath: args => `${BASE_PATH}/${args[0].sign_request_id}/resend`,
			expectedParams: args => ({ qs: args[0] }),
		},
	].forEach(testCase => describe(`${testCase.name}()`, () => {
		const name = testCase.name;
		it(`should make ${testCase.expectedMethod.toUpperCase()} request when calling ${name}`, () => {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox
				.mock(boxClientFake)
				.expects(testCase.expectedMethod)
				.withArgs(
					testCase.expectedPath(testCase.args),
					testCase.expectedParams(testCase.args)
				);
			signRequests[name].apply(signRequests, testCase.args);
		});
	})
	);
});
