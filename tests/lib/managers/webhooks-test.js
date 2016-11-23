/**
* @fileoverview Webhooks Manager Tests
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
	testQS = { testQSKey: 'testQSValue' },
	testParamsWithQs,
	WEBHOOKS_ID = '1234',
	MODULE_WEBHOOKS_PATH = '../../../lib/managers/webhooks';

describe('Webhooks', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		testParamsWithQs = {qs: testQS};
		// Register Mocks
		mockery.enable({
			useCleanCache: true
		});
		mockery.registerAllowable('../util/url-path');
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

	describe('create()', function() {

		var	ID = '1234',
			TYPE = 'file',
			ADDRESS = 'https://www.test.com',
			TRIGGERS = ['FILE.DOWNLOADED', 'FILE.PREVIEWED'],
			expectedParams = {
				body: {
					target: {
						id: ID,
						type: TYPE
					},
					address: ADDRESS,
					triggers: TRIGGERS
				}
			};

		it('should make POST call to create webhook', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('post').withArgs('/webhooks', expectedParams);
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'post').withArgs('/webhooks').yieldsAsync();
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS, done);
		});
	});

	describe('get()', function() {

		it('should make GET request to get Webhook info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks/1234', testParamsWithQs);
			webhooks.get(WEBHOOKS_ID, testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/webhooks/1234', testParamsWithQs).yieldsAsync();
			webhooks.get(WEBHOOKS_ID, testQS, done);
		});
	});

	describe('getAll()', function() {

		it('should make GET call to fetch all webhooks', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks', testParamsWithQs);
			webhooks.getAll(testQS);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs(testParamsWithQs).yieldsAsync();
			webhooks.getAll(testQS, done);
			done();
		});
	});

	describe('update()', function() {

		var param = {
			target: {
				id: '1234',
				type: 'file'
			},
			address: 'https://www.test1.com',
			triggers: ['FILE.DOWNLOADED', 'FILE.PREVIEWED']
		};
		it('should make PUT call to update webhook', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/webhooks/1234');
			webhooks.update(WEBHOOKS_ID, param);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/webhooks/1234').yieldsAsync();
			webhooks.update(WEBHOOKS_ID, param, done);
		});
	});

	describe('delete()', function() {

		it('should make DELETE call to remove webhook', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/webhooks/1234');
			webhooks.delete(WEBHOOKS_ID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/webhooks/1234').yieldsAsync();
			webhooks.delete(WEBHOOKS_ID, done);
		});

	});
});
