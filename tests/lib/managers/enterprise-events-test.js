/**
 * @fileoverview Enterprise Events Manager Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	leche = require('leche');

var BoxClient = require('../../../lib/box-client'),
	EnterpriseEventStream = require('../../../lib/enterprise-event-stream'),
	Events = require('../../../lib/managers/events');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	EnterpriseEvents,
	enterpriseEvents,
	EnterpriseEventStreamConstructorStub,
	enterpriseEventStreamFake,
	MODULE_FILE_PATH = '../../../lib/managers/enterprise-events';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('EnterpriseEvents', function() {

	var TEST_STREAM_POSITION = '76592376495823';
	var TEST_DATE = '2001-01-01T00:00:00-08:00';
	var TEST_DATE2 = '2001-12-31T00:00:00-08:00';

	beforeEach(function() {

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.events = leche.fake(Events.prototype);
		EnterpriseEventStreamConstructorStub = sandbox.stub();
		enterpriseEventStreamFake = leche.fake(EnterpriseEventStream.prototype);
		EnterpriseEventStreamConstructorStub.returns(enterpriseEventStreamFake);

		mockery.enable({
			warnOnUnregistered: false,
			useCleanCache: true
		});
		mockery.registerMock('../enterprise-event-stream', EnterpriseEventStreamConstructorStub);
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		EnterpriseEvents = require(MODULE_FILE_PATH);
		enterpriseEvents = new EnterpriseEvents(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('get()', function() {

		it('should pass params to client.events.get() when called', function() {

			var options = {
				limit: 50,
				streamPosition: TEST_STREAM_POSITION,
				eventTypeFilter: 'UPLOAD,DOWNLOAD',
				createdAfter: TEST_DATE,
				createdBefore: TEST_DATE2
			};
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs',
				limit: 50,
				stream_position: TEST_STREAM_POSITION,
				event_type: 'UPLOAD,DOWNLOAD',
				created_after: TEST_DATE,
				created_before: TEST_DATE2
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

		it('should pass stream_position === 0 to client.events.get() when called with streamPosition === 0', function() {

			var options = {
				streamPosition: 0
			};
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs',
				stream_position: 0
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

		it('should pass stream_position === \'0\' to client.events.get() when called with streamPosition === \'0\'', function() {

			var options = {
				streamPosition: '0'
			};
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs',
				stream_position: '0'
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

		it('should pass {} to client.events.get() when called', function() {

			var options = {};
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs'
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

		it('should pass null to client.events.get() when called', function() {

			var options = null;
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs'
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

	});

	describe('getEventStream()', function() {

		it('should return event stream from starting stream position when passed stream position', function() {

			var options = {
				streamPosition: TEST_STREAM_POSITION
			};
			const stream = enterpriseEvents.getEventStream(options);

			assert.ok(EnterpriseEventStreamConstructorStub.calledOnce, 'Should call EnterpriseEventStream constructor');
			assert.ok(EnterpriseEventStreamConstructorStub.calledWith(boxClientFake, options), 'Should pass correct args to EnterpriseEventStream constructor');
			assert.equal(stream, enterpriseEventStreamFake);
		});

	});

});
