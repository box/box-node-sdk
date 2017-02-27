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

		it('should make API call to get events when called', function() {

			var options = {
				limit: 50,
				streamPosition: TEST_STREAM_POSITION,
				eventTypeFilterArray: [enterpriseEvents.types.UPLOAD, enterpriseEvents.types.DOWNLOAD],
				createdAfterDate: new Date('Jan 1, 2017'),
				createdBeforeDate: new Date('Dec 31, 2017')
			};

			sandbox.mock(boxClientFake.events).expects('get').withArgs({
				stream_type: 'admin_logs',
				limit: 50,
				stream_position: TEST_STREAM_POSITION,
				event_type: 'UPLOAD,DOWNLOAD',
				created_after: '2017-01-01T08:00:00.000Z',
				created_before: '2017-12-31T08:00:00.000Z'
			});

			enterpriseEvents.get(options);
		});

	});

	describe('getEventStream()', function() {

		it('should return event stream from starting stream position when passed stream position', function() {

			var options = {
				streamPosition: '38746523'
			};
			const stream = enterpriseEvents.getEventStream(options);

			assert.ok(EnterpriseEventStreamConstructorStub.calledOnce, 'Should call EnterpriseEventStream constructor');
			assert.ok(EnterpriseEventStreamConstructorStub.calledWith(boxClientFake, options), 'Should pass correct args to EnterpriseEventStream constructor');
			assert.equal(stream, enterpriseEventStreamFake);
		});

	});

});
