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

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/device_pinners/' + PIN_ID, params);
			devicePins.get(PIN_ID, null);
		});

		it('should make GET request to get device pin info when called with optional params', function() {

			var qs = {foo: 'bar'};

			var params = {qs};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/device_pinners/' + PIN_ID, params);
			devicePins.get(PIN_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/device_pinners/' + PIN_ID, {qs: null}).yieldsAsync();
			devicePins.get(PIN_ID, null, done);
		});
	});

	describe('delete()', function() {

		it('should make DELETE request to remove device pin info when called without optional params', function() {

			var params = {
				qs: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/device_pinners/' + PIN_ID, params);
			devicePins.delete(PIN_ID, null);
		});

		it('should make DELETE request to remove device pin info when called with optional params', function() {

			var qs = {foo: 'bar'};

			var params = {qs};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('del').withArgs('/device_pinners/' + PIN_ID, params);
			devicePins.delete(PIN_ID, qs);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'del').withArgs('/device_pinners/' + PIN_ID, {qs: null}).yieldsAsync();
			devicePins.delete(PIN_ID, null, done);
		});
	});

	describe('getAll()', function() {

		var ENTERPRISE_ID = '7898345';

		it('should get current enterprise ID and make GET request to get device pin info when user is in enterprise', function(done) {

			var params = {
				qs: null
			};

			var user = {
				enterprise: {
					id: ENTERPRISE_ID
				}
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.mock(boxClientFake.users).expects('get').withArgs('me', {fields: 'enterprise'}).yieldsAsync(null, user);
			sandbox.mock(boxClientFake).expects('get').withArgs('/enterprises/' + ENTERPRISE_ID + '/device_pinners', params).yieldsAsync();
			devicePins.getAll(null, done);
		});

		it('should get current enterprise ID and call callback with error when user is not in enterprise', function(done) {

			var user = {
				enterprise: null
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.mock(boxClientFake.users).expects('get').withArgs('me', {fields: 'enterprise'}).yieldsAsync(null, user);
			sandbox.mock(boxClientFake).expects('get').never();
			devicePins.getAll(null, function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {

			var user = {
				enterprise: {
					id: ENTERPRISE_ID
				}
			};

			var pins = {
				entries: []
			};

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake.users, 'get').yieldsAsync(null, user);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, pins);
			devicePins.getAll(null, done);
		});

	});

});
