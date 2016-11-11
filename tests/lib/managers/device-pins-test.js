/**
 * @fileoverview Device Pins manager tests
 * @author mwiller
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
	DevicePins,
	devicePins,
	PIN_ID = '873645',
	MODULE_FILE_PATH = '../../../lib/managers/device-pins';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('DevicePins', function() {

	beforeEach(function() {
		// Setup Environment
		boxClientFake = leche.fake(BoxClient.prototype);
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

});
