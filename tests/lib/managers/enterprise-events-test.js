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
				eventTypeFilterArray: [enterpriseEvents.types.UPLOAD, enterpriseEvents.types.DOWNLOAD],
				createdAfterDate: new Date('Jan 1, 2017'),
				createdBeforeDate: new Date('Dec 31, 2017')
			};
			var callbackMock = sandbox.mock().never();

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs',
				limit: 50,
				stream_position: TEST_STREAM_POSITION,
				event_type: 'UPLOAD,DOWNLOAD',
				created_after: '2017-01-01T08:00:00.000Z',
				created_before: '2017-12-31T08:00:00.000Z'
			}, callbackMock);

			enterpriseEvents.get(options, callbackMock);
		});

		it('should pass streamPosition = 0 to client.events.get() when called', function() {

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

	describe('getSourceID()', function() {

		var TEST_ID = '76592376495823';

		it('should return event.source.id, if present', function() {
			var event = { source: { id: TEST_ID } };
			assert.equal(enterpriseEvents.getSourceID(event), TEST_ID);
		});

		it('should return event.source.item_id, if present', function() {
			var event = { source: { item_id: TEST_ID } };
			assert.equal(enterpriseEvents.getSourceID(event), TEST_ID);
		});

		it('should return event.source.api_key, if present', function() {
			var event = { source: { api_key: TEST_ID } };
			assert.equal(enterpriseEvents.getSourceID(event), TEST_ID);
		});

		it('should return null, if event.source is not present', function() {
			var event = { };
			assert.equal(enterpriseEvents.getSourceID(event), null);
		});

	});

	describe('getSourceType()', function() {

		var TEST_TYPE = 'file';

		it('should return event.source.type, if present', function() {
			var event = { source: { type: TEST_TYPE } };
			assert.equal(enterpriseEvents.getSourceType(event), TEST_TYPE);
		});

		it('should return event.source.item_type, if present', function() {
			var event = { source: { item_type: TEST_TYPE } };
			assert.equal(enterpriseEvents.getSourceType(event), TEST_TYPE);
		});

		it('should return null, if event.source is not present', function() {
			var event = { };
			assert.equal(enterpriseEvents.getSourceType(event), null);
		});

	});

	describe('getSourceName()', function() {

		var TEST_NAME = 'Hello.txt';

		it('should return event.source.name, if present', function() {
			var event = { source: { name: TEST_NAME } };
			assert.equal(enterpriseEvents.getSourceName(event), TEST_NAME);
		});

		it('should return event.source.item_name, if present', function() {
			var event = { source: { item_name: TEST_NAME } };
			assert.equal(enterpriseEvents.getSourceName(event), TEST_NAME);
		});

		it('should return null, if event.source is not present', function() {
			var event = { };
			assert.equal(enterpriseEvents.getSourceName(event), null);
		});

	});

	describe('getDescription()', function() {

		it('should return source and service, if present', function() {
			var event = {
				created_at: '2017-01-01T00:00:00-08:00',
				created_by: {
					id: '12345678',
					name: 'A User'
				},
				event_type: 'UPLOAD',
				source: {
					type: 'file',
					id: '23456789',
					name: 'A File'
				},
				additional_details: {
					service_id: '34567890',
					service_name: 'An App'
				}
			};
			assert.equal(enterpriseEvents.getDescription(event), '2017-01-01T00:00:00-08:00 UPLOAD file: "A File" (23456789) by "A User" (12345678) using "An App" (34567890)');
		});

		it('should return source, if present', function() {
			var event = {
				created_at: '2017-01-01T00:00:00-08:00',
				created_by: {
					id: '12345678',
					name: 'A User'
				},
				event_type: 'UPLOAD',
				source: {
					item_type: 'file',
					item_id: '23456789',
					item_name: 'A File'
				}
			};
			assert.equal(enterpriseEvents.getDescription(event), '2017-01-01T00:00:00-08:00 UPLOAD file: "A File" (23456789) by "A User" (12345678)');
		});

		it('should return service, if present', function() {
			var event = {
				created_at: '2017-01-01T00:00:00-08:00',
				created_by: {
					id: '12345678',
					name: 'A User'
				},
				event_type: 'UPLOAD',
				additional_details: {
					service_id: '34567890',
					service_name: 'An App'
				}
			};
			assert.equal(enterpriseEvents.getDescription(event), '2017-01-01T00:00:00-08:00 UPLOAD by "A User" (12345678) using "An App" (34567890)');
		});

		it('should return neither source nor service, if not present', function() {
			var event = {
				created_at: '2017-01-01T00:00:00-08:00',
				created_by: {
					id: '12345678',
					name: 'A User'
				},
				event_type: 'UPLOAD'
			};
			assert.equal(enterpriseEvents.getDescription(event), '2017-01-01T00:00:00-08:00 UPLOAD by "A User" (12345678)');
		});

	});

});
