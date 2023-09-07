/**
 * @fileoverview SignTemplates Manager Tests
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
	SignTemplates,
	signTemplates,
	BASE_PATH = '/sign_templates',
	MODULE_FILE_PATH = '../../../lib/managers/sign-templates.generated';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('SignTemplates', () => {
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
		SignTemplates = require(MODULE_FILE_PATH);
		signTemplates = new SignTemplates(boxClientFake);
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
			args: () => [
				{
					template_id: '12345',
				},
			],
			expectedMethod: 'get',
			expectedPath: args => `${BASE_PATH}/${args[0].template_id}`,
			expectedParams: () => ({ qs: {} }),
		},
		{
			name: 'getAll',
			args: () => [],
			expectedMethod: 'get',
			expectedPath: () => BASE_PATH,
			expectedParams: () => ({ qs: {} }),
		},
	].forEach(testCase => describe(`${testCase.name}()`, () => it(`should make ${testCase.expectedMethod.toUpperCase()} request when calling ${
		testCase.name
	}`, () => {
		const args = testCase.args();
		sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
		sandbox
			.mock(boxClientFake)
			.expects(testCase.expectedMethod)
			.withArgs(testCase.expectedPath(args), testCase.expectedParams(args));
		signTemplates[testCase.name].apply(signTemplates, args);
	}))
	);
});
