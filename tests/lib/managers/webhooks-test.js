/**
* @fileoverview Webhooks Manager Tests
* @author ccheng
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
	boxClientFake,
	Webhooks,
	webhooks,
	WEBHOOKS_ID = '1234',
	MODULE_WEBHOOKS_PATH = '../../../lib/managers/webhooks';

describe('Webhooks', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		// Register Mocks
		mockery.enable({
			useCleanCache: true
		});
		mockery.registerAllowable('http-status');
		mockery.registerAllowable('util');
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable('../util/errors');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_WEBHOOKS_PATH);
		Webhooks = require(MODULE_WEBHOOKS_PATH);
		webhooks = new Webhooks(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('createWebhook()', function() {

		it('should make POST call to create webhook', function(done) {
			var	id = '1234',
				type = 'file',
				address = 'https://www.test.com',
				triggers = ['FILE.DOWNLOADED', 'FILE.PREVIEWED'];

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('post').withArgs('/webhooks');
			webhooks.createWebhook(id, type, address, triggers, done);
		});
	});

	describe('getWebhook()', function() {

		it('should make GET call to fetch a webhook', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks/1234');
			webhooks.getWebhook(WEBHOOKS_ID, done);
		});
	});

	describe('getAllWebhooks()', function() {

		it('should make GET call to fetch all webhooks', function(done) {
			var fakeQuery = 'fakeQuery',
				fakeQs = { fakeQsKey: 'fakeQsValue' },
				fakeParamsWithQs = {qs: fakeQs};

			fakeParamsWithQs.qs.webhooks = fakeQuery;
			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks', fakeParamsWithQs);
			webhooks.getAllWebhooks(fakeQs, done);
		});
	});

	describe('updateWebhook()', function() {

		it('should make PUT call to update webhook', function(done) {
			var param = {
				target: {
					id: '1234',
					type: 'file'
				},
				address: 'https://www.test1.com',
				triggers: ['FILE.DOWNLOADED', 'FILE.PREVIEWED']
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('put').withArgs('/webhooks/1234');
			webhooks.updateWebhook(WEBHOOKS_ID, param, done);
		});
	});

	describe('deleteWebhook()', function() {

		it('should make DELETE call to remove webhook', function(done) {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').yields();
			sandbox.mock(boxClientFake).expects('del').withArgs('/webhooks/1234');
			webhooks.deleteWebhook(WEBHOOKS_ID, done);
		});
	});
});
