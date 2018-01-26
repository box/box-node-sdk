/**
 * @fileoverview Device Pins manager tests
 * @author mwiller
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('chai').assert,
	sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client'),
	Users = require('../../../lib/managers/users');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	usersFake,
	DevicePins,
	devicePins,
	PIN_ID = '873645',
	CURRENT_USER_ID = 'me',
	MODULE_FILE_PATH = '../../../lib/managers/device-pins';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('DevicePins', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
		usersFake = leche.fake(Users.prototype);
		boxClientFake.users = usersFake;
		boxClientFake.CURRENT_USER_ID = CURRENT_USER_ID;
		// Register Mocks
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable('../util/url-path');
		// Setup File Under Test
		mockery.registerAllowable(MODULE_FILE_PATH);
		DevicePins = require(MODULE_FILE_PATH);
		devicePins = new DevicePins(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {

		it('should make GET request to get device pin info when called without optional params', function() {

			var params = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/device_pinners/${PIN_ID}`, params);
			devicePins.get(PIN_ID, null);
		});

		it('should make GET request to get device pin info when called with optional params', function() {

			var qs = {foo: 'bar'};

			var params = {qs};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/device_pinners/${PIN_ID}`, params);
			devicePins.get(PIN_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			devicePins.get(PIN_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return devicePins.get(PIN_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to remove device pin info when called without optional params', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/device_pinners/${PIN_ID}`);
			devicePins.delete(PIN_ID);
		});

		it('should make DELETE request to remove device pin info when called with optional params', function() {

			var qs = {foo: 'bar'};

			var params = {qs};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('del')
				.withArgs(`/device_pinners/${PIN_ID}`, params);
			devicePins.delete(PIN_ID, qs);
		});

		it('should wrap with default handler when called', function() {

			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve());
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.del)
				.returnsArg(0);
			devicePins.delete(PIN_ID);
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'del').returns(Promise.resolve(response));
			return devicePins.delete(PIN_ID)
				.then(data => assert.equal(data, response));
		});
	});

	describe('getAll()', function() {

		var ENTERPRISE_ID = '7898345';

		var user;

		beforeEach(function() {

			user = {
				enterprise: {
					id: ENTERPRISE_ID
				}
			};
		});

		it('should get current enterprise ID and make GET request to get device pin info when user is in enterprise', function() {

			var params = {
				qs: undefined
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake.users).expects('get')
				.withArgs('me', {fields: 'enterprise'})
				.returns(Promise.resolve(user));
			sandbox.mock(boxClientFake).expects('get')
				.withArgs(`/enterprises/${ENTERPRISE_ID}/device_pinners`, params)
				.returns(Promise.resolve({}));
			return devicePins.getAll();
		});

		it('should get current enterprise ID and call callback with error when user is not in enterprise', function() {

			user = {
				enterprise: null
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake.users).expects('get')
				.withArgs('me', {fields: 'enterprise'})
				.returns(Promise.resolve(user));
			sandbox.mock(boxClientFake).expects('get')
				.never();
			return devicePins.getAll()
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should wrap GET call with default handler when called', function() {

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve());
			sandbox.stub(boxClientFake.users, 'get').returns(Promise.resolve(user));
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			devicePins.getAll();
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake.users, 'get').returns(Promise.resolve(user));
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return devicePins.getAll()
				.then(data => assert.equal(data, response));
		});
	});

});
