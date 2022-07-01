/**
 * @fileoverview FileRequests Manager Tests
 */
'use strict';
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const sinon = require('sinon');
const mockery = require('mockery');
const leche = require('leche');
const BoxClient = require('../../../lib/box-client');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
let sandbox = sinon.createSandbox(),
	boxClientFake = leche.fake(BoxClient.prototype),
	FileRequestsManager,
	fileRequests,
	BASE_PATH = '/file_requests',
	MODULE_FILE_PATH = '../../../lib/managers/file-requests-manager';

/**
 * Loads JSON fixture file
 * @param {string} fixture tath to fixture file without '.json'
 * @returns {Object} JSON with content from fixture
 */
function getFixture(fixture) {
	// eslint-disable-next-line no-sync
	return JSON.parse(fs.readFileSync(
		path.resolve(__dirname, `../../fixtures/endpoints/${fixture}.json`)
	));
}
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('FileRequests', () => {
	const fileRequestId = '234567';

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
		// eslint-disable-next-line global-require
		FileRequestsManager = require(MODULE_FILE_PATH);
		fileRequests = new FileRequestsManager(boxClientFake);
	});
	afterEach(() => {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});
	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
	it('get by id', async() => {
		const fixture = getFixture('file-requests/get_file_requests_id_200');
		sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
		sandbox
			.mock(boxClientFake)
			.expects('get')
			.withArgs(`${BASE_PATH}/${fileRequestId}`)
			.returns(Promise.resolve(fixture));
		const response = await fileRequests.getById(fileRequestId);
		assert.strictEqual(response.folder, fixture.folder);
	});
	it('delete', async() => {
		sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
		sandbox
			.mock(boxClientFake)
			.expects('del')
			.withArgs(`${BASE_PATH}/${fileRequestId}`);
		await fileRequests.delete(fileRequestId);
	});
});
