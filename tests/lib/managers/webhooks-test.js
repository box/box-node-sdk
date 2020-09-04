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
	Promise = require('bluebird'),
	assert = require('chai').assert,
	fs = require('fs');

var BoxClient = require('../../../lib/box-client');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
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
			TRIGGERS = [
				'FILE.DOWNLOADED',
				'FILE.PREVIEWED'
			],
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
			sandbox.mock(boxClientFake).expects('post')
				.withArgs('/webhooks', expectedParams);
			webhooks.create(ID, TYPE, ADDRESS, TRIGGERS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'post').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.post)
				.returnsArg(0);
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
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/webhooks/1234', testParamsWithQs);
			webhooks.get(WEBHOOKS_ID, testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
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
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/webhooks', testParamsWithQs);
			webhooks.getAll(testQS);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
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
			triggers: [
				'FILE.DOWNLOADED',
				'FILE.PREVIEWED'
			]
		};
		it('should make PUT call to update webhook', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('put')
				.withArgs('/webhooks/1234');
			webhooks.update(WEBHOOKS_ID, param);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'put').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.put)
				.returnsArg(0);
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
			sandbox.mock(boxClientFake).expects('del')
				.withArgs('/webhooks/1234');
			webhooks.delete(WEBHOOKS_ID);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
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
			DATE_IN_5 = Date.parse('2020-01-01T00:05:00-07:00'), // 5 min in future
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

		it('should validate using statically set keys when ones are not passed in', function() {

			Webhooks.setSignatureKeys(PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY);
			const clock = sinon.useFakeTimers(DATE_IN_5);
			assert.ok(Webhooks.validateMessage(BODY, HEADERS));
			clock.restore();
		});

		it('should validate JSON body parsed as Object', function() {

			const clock = sinon.useFakeTimers(DATE_IN_PAST);
			assert.ok(Webhooks.validateMessage(JSON.parse(BODY), HEADERS, PRIMARY_SIGNATURE_KEY, SECONDARY_SIGNATURE_KEY));
			clock.restore();
		});

		it.only('should validate JSON body with Unicode characters', function() {
			const BODY_UNICODE = '{"type":"skill_invocation","skill":{"id":"16295","type":"skill","name":"New DLP Skill","api_key":"56eadfqrcscncabjfyozqcvsewneh75b"},"token":{"read":{"access_token":"1!ueLhdWUZsZykO5uag6BQ1hXFzgJzzVOSq65gAmH6IvZefuPt59DTsdR5VjgWFjM8x4IPZ_RCpSyhYA_BL3d3v3IJltCwDxJ9iGm5gXazNdzKWfyBy1QYqJPqG4rQV6K0Sko7OJSy-2pHTetNe3pugwv1f8J6vpWe9m4IKRTDTWK856fB2dJGmdLbFGK28K5tltcbwvvmweb8xQrHcMFdkQujPEMOwEEsicQNobcayih8UQChfB_VF5IzntKfEzWbqYYqSbCRe11za3yLtWwsN3adMcDzytxzMPNZ2PCzJVppF1oUUpU4J4MMdeyMYnQQJMp9DlwnG8Oz___-fSSt2YrJ2eHbsNglYGV0YvyTo3lVSR4kwTeKJcViyrO-Ysd8yWA2dxHmAMTnIuIEQSva685WmZMGFUm0-XLaizsykUddGn5_","expires_in":1598562737,"restricted_to":"[{\\"scope\\":\\"gcm\\"},{\\"scope\\":\\"item_read\\",\\"object_id\\":712293940342,\\"object_type\\":\\"file\\"}]","token_type":"bearer"},"write":{"access_token":"1!Tzd07brjt0ltpg-G14g0IhlqZhmqp8PXV41xooDbqR2Zdi3n7xtqyeSXvD8lRAnHnpuDN8kFl_gKVFuozkpWN1Y9v8OmQEIx1pCwbsKXUS4AJC-9cujNHy2JWhCHc5RQtNjBwWigCAriCbxzbNtCNb9MkNfisLDs2gZLNVP5sDBmr62zNEa3DzG67F67Sd7PFkSV1Q9_VWvUbxTxzIlXQtKUu7440Mg9iJ8nmjSWcTKMi2Kz7y1QA_w1TtHhm87hd1h_cafAettbyY0H1BSgpbhOvl4HB0f8_pA3l9pY4jGaddszZiVv1VC8jslCPDsIYQUsghew2-mF6A-JWtR_73ezyDijDYJsqGchnmkdBvXvbwERvAZreOsj-3d5ZvjWx1-I4OCrcDdfLSf_spD7oBlwk1C3zT99MU9AYZZ5qJYZZm4HCWN72sqp3EUQXqu_7L9FpRqD-Z7Xi-cl71T5UtEqLGt-TR8M7rVUya_J6w..","expires_in":1598562737,"restricted_to":"[{\\"scope\\":\\"gcm\\"},{\\"scope\\":\\"item_upload\\",\\"object_id\\":712293940342,\\"object_type\\":\\"file\\"},{\\"scope\\":\\"manage_skill_invocations\\"}]","token_type":"bearer"}},"status":{"state":"invoked","message":"","error_code":"","additional_info":""},"skill_rules":[{"id":"4558911","type":"skill_rule","config":""}],"id":"00825814-4bb5-46b7-998a-79c30215143b_1117251255","created_at":"2020-08-26T14:12:16-07:00","trigger":"FILE_CONTENT","enterprise":{"type":"enterprise","id":"606098","name":"Enterprise for Pal Ramanathan"},"source":{"type":"file","id":"712293940342","name":"\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8 2020-08-05.txt","sequence_id":"1","file_version":{"id":"756943372537"},"owner_enterprise_id":"606098","parent":{"id":"121619842246"},"old_parent_id":"","collab_accessible_by":{"type":"","id":"","name":"","login":""},"size":9},"event":{"event_id":"00825814-4bb5-46b7-998a-79c30215143b","event_type":"ITEM_UPLOAD","created_at":"2020-08-26T14:12:16-07:00","created_by":{"type":"user","id":"236266960","name":"Pal Ramanathan Demo","login":"pramanathan+demo@boxdemo.com"},"source":{"type":"file","id":"712293940342","name":"\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8 2020-08-05.txt","sequence_id":"1","file_version":{"id":"756943372537"},"owner_enterprise_id":"606098","parent":{"id":"121619842246"},"old_parent_id":"","collab_accessible_by":{"type":"","id":"","name":"","login":""}},"skill_rule":{"id":"*"}},"parameters":{}}';
			const HEADERS = {
				'box-delivery-id': 'f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f',
				'box-delivery-timestamp': '2020-08-31T11:28:49-07:00',
				'box-signature-algorithm': 'HmacSHA256',
				'box-signature-primary': 'mHsiiomholWgVnvOrY3GrHNZNyaGqSlwU2fh5comYSY=',
				'box-signature-secondary': '9tL2RXYGw0agnezuhCJmpXOTLmqYaPUqjNFV1S+n0Mo=',
				'box-signature-version': '1'
			};
			var primaryKey = 'WZRd7N843lHJHpLesU8c3upBWZOCofSu';
			var secondaryKey = '5jBRCVh9xiNzrg0Sz0fiWaNWQK56svm6';
			const VALIDATION_DATE = Date.parse('2020-08-31T11:28:49-07:00');

			const clock = sinon.useFakeTimers(VALIDATION_DATE);

			// Is this the correct way to do paths?  Couldn't get it to work...
			// var filePath = path.resolve(__dirname, 'fixtures/endpoints/webhooks/validate_webhook_unicode.json');
			var payload = fs.readFileSync('/Users/USERNAME/box/sdk/box-node-sdk/tests/fixtures/endpoints/webhooks/validate_webhook_unicode.json', {encoding: 'utf8'});
			var payloadbody = payload.toString('utf8');
			var payloadJson = JSON.stringify(payloadbody);
			console.log(payload);
			console.log(payloadbody);
			console.log(payloadJson);
			assert.ok(Webhooks.validateMessage(JSON.parse(payloadJson), HEADERS, primaryKey, secondaryKey));
			clock.restore();
		});
	});
});
