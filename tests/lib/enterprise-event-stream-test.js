/**
 * @fileoverview Enterprise Event Stream Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	Readable = require('stream').Readable,
	leche = require('leche');

var BoxClient = require('../../lib/box-client'),
	EnterpriseEvents = require('../../lib/managers/enterprise-events');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	EnterpriseEventStream,
	enterpriseEventStream,
	MODULE_FILE_PATH = '../../lib/enterprise-event-stream';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('EnterpriseEventStream', function() {

	var TEST_STREAM_POSITION = '76592376495823';
	var TEST_DATE = '2001-01-01T00:00:00-08:00';
	var TEST_DATE2 = '2001-12-31T00:00:00-08:00';

	beforeEach(function() {

		sandbox.useFakeTimers(Date.parse(TEST_DATE));

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.enterpriseEvents = leche.fake(EnterpriseEvents.prototype);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		EnterpriseEventStream = require(MODULE_FILE_PATH);
		enterpriseEventStream = new EnterpriseEventStream(boxClientFake, { streamPosition: TEST_STREAM_POSITION });
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should set client and stream position on the instance when called', function() {

			assert.propertyVal(enterpriseEventStream, '_client', boxClientFake);
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
		});

		it('should create an instance of readable stream when called', function() {

			assert.instanceOf(enterpriseEventStream, Readable);
		});

		it('should set stream position when stream position = 0', function() {

			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, { streamPosition: 0 });
			assert.propertyVal(enterpriseEventStream2, '_streamPosition', 0);
		});

		it('should set all of the options correctly', function() {

			var options = {
				streamPosition: TEST_STREAM_POSITION,
				startDate: TEST_DATE,
				endDate: TEST_DATE2,
				eventTypeFilter: 'UPLOAD,DOWNLOAD',
				pollingInterval: 50,
				chunkSize: 80
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
			assert.propertyVal(enterpriseEventStream2, '_streamPosition', TEST_STREAM_POSITION);
			assert.propertyVal(enterpriseEventStream2._options, 'startDate', TEST_DATE);
			assert.propertyVal(enterpriseEventStream2._options, 'endDate', TEST_DATE2);
			assert.propertyVal(enterpriseEventStream2._options, 'pollingInterval', 50);
			assert.propertyVal(enterpriseEventStream2._options, 'chunkSize', 80);
		});

		it('should set start date to now when stream position and start date are not present', function() {

			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, { });
			assert.equal(Date.parse(enterpriseEventStream2._options.startDate), Date.parse(TEST_DATE));
		});

	});

	describe('getStreamPosition()', function() {

		it('should return the current stream position when called', function() {

			assert.equal(enterpriseEventStream.getStreamPosition(), TEST_STREAM_POSITION);
		});

	});

	describe('fetchEvents()', function() {

		it('should make API call to get events from current stream position when called', function() {

			sandbox.mock(boxClientFake.enterpriseEvents).expects('get').withArgs(sinon.match({
				streamPosition: TEST_STREAM_POSITION
			}));

			enterpriseEventStream.fetchEvents();
		});

		it('should make API call to get events with the correct options when called', function() {

			var options = {
				streamPosition: 0,
				startDate: TEST_DATE,
				endDate: TEST_DATE2,
				eventTypeFilter: 'UPLOAD,DOWNLOAD',
				pollingInterval: 50,
				chunkSize: 80
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);

			sandbox.mock(boxClientFake.enterpriseEvents).expects('get').withArgs(sinon.match({
				streamPosition: 0,
				createdAfter: TEST_DATE,
				createdBefore: TEST_DATE2,
				eventTypeFilter: 'UPLOAD,DOWNLOAD',
				limit: 80
			}));

			enterpriseEventStream2.fetchEvents();
		});

		it('should make API call to get events with empty options when called', function() {

			var options = {};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);

			sandbox.mock(boxClientFake.enterpriseEvents).expects('get').withArgs(sinon.match({
			}));

			enterpriseEventStream2.fetchEvents();
		});

		it('should emit error event when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(apiError);
			var spy = sandbox.stub(enterpriseEventStream, 'emit');

			enterpriseEventStream.fetchEvents();

			assert(spy.calledWith('error', apiError));
		});

		it('should re-poll when API call does not return any events', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});
			sandbox.mock(global).expects('setTimeout');

			enterpriseEventStream.fetchEvents();
		});

		it('should re-poll when API call returns an error', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(apiError);
			sandbox.stub(enterpriseEventStream, 'emit');
			sandbox.mock(global).expects('setTimeout');

			enterpriseEventStream.fetchEvents();
		});

		it('should set next stream position when API call is successful', function(done) {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(null, {
				entries: [
					{type: 'event'}
				],
				next_stream_position: newStreamPosition
			});

			enterpriseEventStream.fetchEvents(function() {

				assert.propertyVal(enterpriseEventStream, '_streamPosition', newStreamPosition);
				done();
			});
		});

		it('should NOT set next stream position when no events are returned', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(null, {
				entries: [],
				next_stream_position: newStreamPosition
			});

			enterpriseEventStream.fetchEvents();
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
		});

		it('should NOT re-poll when pollingInterval = 0', function(done) {

			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, { pollingInterval: 0 });

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});

			enterpriseEventStream2.fetchEvents(function() {
				done();
			});
		});

	});

	describe('_read()', function() {

		it('should push new events into the stream when API call is successful', function() {

			var event1 = {
				type: 'event',
				event_id: '783964872'
			};
			var event2 = {
				type: 'event',
				event_id: '783964999'
			};
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, [event1, event2]);
			const mock = sandbox.mock(enterpriseEventStream);
			mock.expects('push').withArgs(event1);

			enterpriseEventStream._read();

			mock.expects('push').withArgs(event2);

			enterpriseEventStream._read();
		});

		it('should close the stream when the fetch returns no events', function() {

			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, []);
			sandbox.mock(enterpriseEventStream).expects('push').withArgs(null);

			enterpriseEventStream._read();
		});

		it('should close the stream when the fetch returns an error', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(apiError);
			sandbox.mock(enterpriseEventStream).expects('push').withArgs(null);

			enterpriseEventStream._read();
		});

	});

});
