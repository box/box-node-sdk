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
	fs = require('fs'),
	leche = require('leche');

var BoxClient = require('../../lib/box-client'),
	Events = require('../../lib/managers/events');

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
	var TEST_EVENT_1 = {
		type: 'event',
		event_id: '783964872'
	};
	var TEST_EVENT_2 = {
		type: 'event',
		event_id: '783964999'
	};
	var TEST_EVENT_3 = {
		type: 'event',
		event_id: '783964999'
	};
	var TEST_FILTER = 'UPLOAD,DOWNLOAD';
	var TEST_FILE = 'test.json';
	var TEST_SRTEAM_POSITION_FILE_CONTENTS = JSON.stringify({
		streamPosition: TEST_STREAM_POSITION,
		startDate: TEST_DATE,
		endDate: TEST_DATE2,
		eventTypeFilter: TEST_FILTER
	}, null, 2);

	beforeEach(function() {

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.events = leche.fake(Events.prototype);

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
				eventTypeFilter: TEST_FILTER,
				pollingInterval: 50,
				chunkSize: 80
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
			assert.propertyVal(enterpriseEventStream2, '_streamPosition', TEST_STREAM_POSITION);
			assert.propertyVal(enterpriseEventStream2._options, 'startDate', TEST_DATE);
			assert.propertyVal(enterpriseEventStream2._options, 'endDate', TEST_DATE2);
			assert.propertyVal(enterpriseEventStream2._options, 'eventTypeFilter', TEST_FILTER);
			assert.propertyVal(enterpriseEventStream2._options, 'pollingInterval', 50);
			assert.propertyVal(enterpriseEventStream2._options, 'chunkSize', 80);
		});

		it('should set start date to now when stream position and start date are not present', function() {

			sandbox.useFakeTimers();
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, { });
			assert.equal(Date.parse(enterpriseEventStream2._options.startDate), sandbox.clock.now);
		});

	});

	describe('getStreamPosition()', function() {

		it('should return the current stream position when called', function() {

			assert.equal(enterpriseEventStream.getStreamPosition(), TEST_STREAM_POSITION);
		});

	});

	describe('readStreamPositionFromFile()', function() {

		it('should read the current stream position from the file', function(done) {

			var spy = sandbox.stub(fs, 'readFile').yields(null, TEST_SRTEAM_POSITION_FILE_CONTENTS);
			enterpriseEventStream.readStreamPositionFromFile(TEST_FILE, function() {
				assert(spy.calledWith(TEST_FILE));
				assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
				assert.propertyVal(enterpriseEventStream._options, 'startDate', TEST_DATE);
				assert.propertyVal(enterpriseEventStream._options, 'endDate', TEST_DATE2);
				assert.propertyVal(enterpriseEventStream._options, 'eventTypeFilter', TEST_FILTER);
				done();
			});
		});

		it('should return any fs error', function(done) {

			var fsError = new Error('Whoops');
			var spy = sandbox.stub(fs, 'readFile').yields(fsError);
			enterpriseEventStream.readStreamPositionFromFile(TEST_FILE, function(error) {
				assert(spy.calledWith(TEST_FILE));
				assert.equal(error, fsError);
				done();
			});
		});

	});

	describe('writeStreamPositionToFile()', function() {

		it('should write the current stream position to the file', function(done) {

			var options = {
				streamPosition: TEST_STREAM_POSITION,
				startDate: TEST_DATE,
				endDate: TEST_DATE2,
				eventTypeFilter: TEST_FILTER
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
			var spy = sandbox.stub(fs, 'writeFile').yields();
			enterpriseEventStream2.writeStreamPositionToFile(TEST_FILE, function() {
				assert(spy.calledWith(TEST_FILE, TEST_SRTEAM_POSITION_FILE_CONTENTS));
				done();
			});
		});

	});

	describe('fetchEvents()', function() {

		it('should make API call to get events from current stream position when called', function() {

			sandbox.mock(boxClientFake.events).expects('get').withArgs(sinon.match({
				stream_position: TEST_STREAM_POSITION
			}));

			enterpriseEventStream.fetchEvents();
		});

		it('should make API call to get events with the correct options when called', function() {

			var options = {
				streamPosition: 0,
				startDate: TEST_DATE,
				endDate: TEST_DATE2,
				eventTypeFilter: TEST_FILTER,
				pollingInterval: 50,
				chunkSize: 80
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);

			sandbox.mock(boxClientFake.events).expects('get').withArgs(sinon.match({
				stream_position: 0,
				created_after: TEST_DATE,
				created_before: TEST_DATE2,
				event_type: TEST_FILTER,
				limit: 80
			}));

			enterpriseEventStream2.fetchEvents();
		});

		it('should make API call to get events with empty options when called', function() {

			var options = {};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);

			sandbox.mock(boxClientFake.events).expects('get').withArgs(sinon.match({
			}));

			enterpriseEventStream2.fetchEvents();
		});

		it('should re-poll when API call does not return any events', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});
			var spy = sandbox.stub(enterpriseEventStream, 'emit');
			sandbox.mock(global).expects('setTimeout');

			enterpriseEventStream.fetchEvents();

			assert(spy.calledWith('wait'));
		});

		it('should re-poll when API call returns an error', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').yields(apiError);
			var spy = sandbox.stub(enterpriseEventStream, 'emit');
			sandbox.mock(global).expects('setTimeout');

			enterpriseEventStream.fetchEvents();

			assert(spy.calledWith('error', apiError));
			assert(spy.calledWith('wait'));
		});

		it('should set next stream position when API call is successful', function(done) {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [
					{type: 'event'}
				],
				next_stream_position: newStreamPosition
			});
			var spy = sandbox.stub(enterpriseEventStream, 'emit');

			enterpriseEventStream.fetchEvents(function() {

				assert.propertyVal(enterpriseEventStream, '_streamPosition', newStreamPosition);
				assert(spy.calledWith('streamPosition', newStreamPosition));
				done();
			});
		});

		it('should NOT set next stream position when no events are returned', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [],
				next_stream_position: newStreamPosition
			});

			enterpriseEventStream.fetchEvents();
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
		});

		it('should NOT re-poll when pollingInterval = 0', function(done) {

			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, { pollingInterval: 0 });

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});

			enterpriseEventStream2.fetchEvents(function() {
				done();
			});
		});

	});

	describe('_read()', function() {

		it('should push the events into the stream when fetchEvents() return events', function() {

			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, [TEST_EVENT_1, TEST_EVENT_2]);
			var spy = sandbox.stub(enterpriseEventStream, 'push');

			enterpriseEventStream._read();

			assert(spy.calledTwice);
			assert(spy.firstCall.calledWith(TEST_EVENT_1));
			assert(spy.secondCall.calledWith(TEST_EVENT_2));
		});

		it('should close the stream when fetchEvents() returns no events', function() {

			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, []);
			sandbox.mock(enterpriseEventStream).expects('push').withArgs(null);

			enterpriseEventStream._read();
		});

		it('should close the stream when fetchEvents() returns an error', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(apiError);
			sandbox.mock(enterpriseEventStream).expects('push').withArgs(null);

			enterpriseEventStream._read();
		});

		it('should ony call _read() once after each call to fetchEvents()', function(done) {

			// This test fails without the call to pause() in _read().
			sandbox.stub(enterpriseEventStream, 'fetchEvents')
				.onFirstCall().yieldsAsync(null, [TEST_EVENT_1, TEST_EVENT_2, TEST_EVENT_3])
				.onSecondCall().yieldsAsync(null, [])
				.onThirdCall().throws();
			var spy = sandbox.spy(enterpriseEventStream, '_read');

			enterpriseEventStream.on('data', function() {});

			enterpriseEventStream.on('end', function() {
				assert(spy.calledTwice);
				done();
			});
		});

	});

});
