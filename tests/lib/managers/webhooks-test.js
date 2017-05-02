/**
* @fileoverview Webhooks Manager Tests
*/
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche'),
	assert = require('chai').assert;

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
		mockery.registerAllowable('crypto');
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('post').withArgs('/webhooks', expectedParams);
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.post).returnsArg(0);
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').yieldsAsync(null, response);
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve(response));
			return webhooks.create(ID, TYPE, ADDRESS, TRIGGERS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('get()', function() {

		it('should make GET request to get Webhook info when called', function() {
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks/1234', testParamsWithQs);
			webhooks.get(WEBHOOKS_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			webhooks.get(WEBHOOKS_ID, testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			webhooks.get(WEBHOOKS_ID, testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return webhooks.get(WEBHOOKS_ID, testQS)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {

		it('should make GET call to fetch all webhooks', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('/webhooks', testParamsWithQs);
			webhooks.getAll(testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.get).returnsArg(0);
			webhooks.getAll(testQS);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			webhooks.getAll(testQS, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return webhooks.getAll(testQS)
				.then(data => assert.equal(data, response));
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

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put').withArgs('/webhooks/1234');
			webhooks.update(WEBHOOKS_ID, param);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.put).returnsArg(0);
			webhooks.update(WEBHOOKS_ID, param);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').yieldsAsync(null, response);
			webhooks.update(WEBHOOKS_ID, param, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve(response));
			return webhooks.update(WEBHOOKS_ID, param)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE call to remove webhook', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del').withArgs('/webhooks/1234');
			webhooks.delete(WEBHOOKS_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler').withArgs(boxClientFake.del).returnsArg(0);
			webhooks.delete(WEBHOOKS_ID);
		});

		it('should pass results to callback when callback is present', function(done) {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').yieldsAsync(null, response);
			webhooks.delete(WEBHOOKS_ID, function(err, data) {

				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return webhooks.delete(WEBHOOKS_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('setSignatureKeys()', function() {
		const PRIMARY_SIGNATURE_KEY = 'SamplePrimaryKey';
		const SECONDARY_SIGNATURE_KEY = 'SampleSecondaryKey';

		it('should set the primary and secondary keys when both are passed', function() {
			Webhooks.setSignatureKeys(PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY);

			assert.equal(PRIMARY_SIGNATURE_KEY, Webhooks.primarySignatureKey);
			assert.equal(SECONDARY_SIGNATURE_KEY, Webhooks.secondarySignatureKey);
		});

		it('should set the primary key when no secondary key is passed', function() {
			Webhooks.setSignatureKeys(PRIMARY_SIGNATURE_KEY);

			assert.equal(Webhooks.primarySignatureKey, PRIMARY_SIGNATURE_KEY);
			assert.equal(null, Webhooks.secondarySignatureKey);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return webhooks.delete(WEBHOOKS_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('validateMessage()', function() {

		// A sample webhook message that is signed with 'SamplePrimaryKey' and 'SampleSecondaryKey':
		const	BODY = '{"type":"webhook_event","webhook":{"id":"1234567890"},"trigger":"FILE.UPLOADED","source":{"id":"1234567890","type":"file","name":"Test.txt"}}',
			HEADERS = {
				'box-delivery-id': 'f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f',
				'box-delivery-timestamp': '2020-01-01T00:00:00-07:00',
				'box-signature-algorithm': 'HmacSHA256',
				'box-signature-primary': '6TfeAW3A1PASkgboxxA5yqHNKOwFyMWuEXny/FPD5hI=',
				'box-signature-secondary': 'v+1CD1Jdo3muIcbpv5lxxgPglOqMfsNHPV899xWYydo=',
				'box-signature-version': '1'
			},
			PRIMARY_SIGNATURE_KEY = 'SamplePrimaryKey',
			SECONDARY_SIGNATURE_KEY = 'SampleSecondaryKey',
			INCORRECT_SIGNATURE_KEY = 'IncorrectKey',
			DATE_IN_PAST = Date.parse('2010-01-01T00:00:00-07:00'),			// 10 years in the past
			DATE_IN_FUTURE = Date.parse('2020-01-01T00:15:00-07:00'),		// 15 min in future
			HEADERS_WITH_WRONG_SIGNATURE_VERSION = Object.assign({}, HEADERS, {'box-signature-version': '2'}),
			HEADERS_WITH_WRONG_SIGNATURE_ALGORITHM = Object.assign({}, HEADERS, {'box-signature-algorithm': 'XXX'});

		it('should validate the webhook message with two good keys', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(Webhooks.validateMessage(BODY, HEADERS, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it('should validate the webhook message with good primary key', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(Webhooks.validateMessage(BODY, HEADERS, PRIMARY_SIGNATURE_KEY, INCORRECT_SIGNATURE_KEY));
			clock.restore();
		});

		it('should validate the webhook message with good secondary key', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(Webhooks.validateMessage(BODY, HEADERS, INCORRECT_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it('should NOT validate the webhook message with two wrong keys', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS, INCORRECT_SIGNATURE_KEY, INCORRECT_SIGNATURE_KEY));
			clock.restore();
		});

		it('should NOT validate the webhook message with two null keys', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS, null, null));
			clock.restore();
		});

		it('should NOT validate the webhook message if it is too old', function() {
			const clock = sinon.useFakeTimers(DATE_IN_FUTURE);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it('should NOT validate the webhook message if maxMessageAge is not big enough', function() {
			const clock = sinon.useFakeTimers(DATE_IN_FUTURE);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY, 5 * 60));
			clock.restore();
		});

		it('should validate the webhook message if maxMessageAge is big enough', function() {
			const clock = sinon.useFakeTimers(DATE_IN_FUTURE);
			assert.ok(Webhooks.validateMessage(BODY, HEADERS, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY, 20 * 60));
			clock.restore();
		});

		it('should NOT validate the webhook message if the signature version is wrong', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS_WITH_WRONG_SIGNATURE_VERSION, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it('should NOT validate the webhook message if the signature algorithm is wrong', function() {
			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(!Webhooks.validateMessage(BODY, HEADERS_WITH_WRONG_SIGNATURE_ALGORITHM, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it('should attach validation method to manager instance', function() {

			assert.equal(Webhooks.validateMessage, webhooks.validateMessage);
		});
	});
});
