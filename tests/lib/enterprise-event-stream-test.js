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
	Events = require('../../lib/managers/events');
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
	boxClientFake,
	EnterpriseEventStream,
	enterpriseEventStream,
	MODULE_FILE_PATH = '../../lib/enterprise-event-stream';
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
describe('EnterpriseEventStream', () => {
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
	var TEST_FILTER = [
		'UPLOAD',
		'DOWNLOAD'
	];
	var TEST_STREAM_STATE = {
		streamPosition: TEST_STREAM_POSITION,
		startDate: TEST_DATE,
		endDate: TEST_DATE2,
		eventTypeFilter: TEST_FILTER
	};
	beforeEach(() => {
		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.events = leche.fake(Events.prototype);
		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);
		// eslint-disable-next-line global-require
		EnterpriseEventStream = require(MODULE_FILE_PATH);
		enterpriseEventStream = new EnterpriseEventStream(boxClientFake, {streamPosition: TEST_STREAM_POSITION});
	});
	afterEach(() => {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});
	describe('constructor', () => {
		it('should set client and stream position on the instance when called', () => {
			assert.propertyVal(enterpriseEventStream, '_client', boxClientFake);
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
		});
		it('should create an instance of readable stream when called', () => {
			assert.instanceOf(enterpriseEventStream, Readable);
		});
		it('should set stream position when stream position = 0', () => {
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, {streamPosition: 0});
			assert.propertyVal(enterpriseEventStream2, '_streamPosition', 0);
		});
		it('should set all of the options correctly', () => {
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
		it('should set start date to now when stream position and start date are not present', () => {
			sandbox.useFakeTimers();
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, {});
			assert.equal(Date.parse(enterpriseEventStream2._options.startDate), sandbox.clock.now);
		});
	});
	describe('getStreamPosition()', () => {
		it('should return the current stream position when called', () => {
			assert.equal(enterpriseEventStream.getStreamPosition(), TEST_STREAM_POSITION);
		});
	});
	describe('setStreamState()', () => {
		it('should set the current stream state', () => {
			enterpriseEventStream.setStreamState(TEST_STREAM_STATE);
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
			assert.propertyVal(enterpriseEventStream._options, 'startDate', TEST_DATE);
			assert.propertyVal(enterpriseEventStream._options, 'endDate', TEST_DATE2);
			assert.propertyVal(enterpriseEventStream._options, 'eventTypeFilter', TEST_FILTER);
		});
	});
	describe('getStreamState()', () => {
		it('should return the current stream state', () => {
			var options = {
				streamPosition: TEST_STREAM_POSITION,
				startDate: TEST_DATE,
				endDate: TEST_DATE2,
				eventTypeFilter: TEST_FILTER
			};
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
			const state = enterpriseEventStream2.getStreamState();
			assert.deepEqual(state, TEST_STREAM_STATE);
		});
	});
	describe('fetchEvents()', () => {
		describe('for admin_logs steam type', () => {
			it('should make API call to get events with the correct options when called', () => {
				const options = {
					streamPosition: 0,
					startDate: TEST_DATE,
					endDate: TEST_DATE2,
					eventTypeFilter: TEST_FILTER,
					pollingInterval: 50,
					chunkSize: 80
				};
				const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
				sandbox.mock(boxClientFake.events).expects('get')
					.withArgs(sinon.match({
						stream_type: 'admin_logs',
						stream_position: 0,
						created_after: TEST_DATE,
						created_before: TEST_DATE2,
						event_type: TEST_FILTER.join(','),
						limit: 80
					}));
				enterpriseEventStream2.fetchEvents();
			});
			it('should make API call to get events with empty options when called', () => {
				const options = {};
				const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
				sandbox.mock(boxClientFake.events).expects('get')
					.withArgs(sinon.match({
						stream_type: 'admin_logs'
					}));
				enterpriseEventStream2.fetchEvents();
			});
		});

		describe('for admin_logs_streaming steam type', () => {
			it('should make API call to get events with the correct options when called', () => {
				const options = {
					streamType: 'admin_logs_streaming',
					streamPosition: 0,
					startDate: TEST_DATE,
					endDate: TEST_DATE2,
					eventTypeFilter: TEST_FILTER,
					pollingInterval: 50,
					chunkSize: 80
				};
				const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
				sandbox.mock(boxClientFake.events).expects('get')
					.withArgs(sinon.match(value => value.stream_type === 'admin_logs_streaming' &&
							value.stream_position === 0 &&
							value.event_type === 'UPLOAD,DOWNLOAD' &&
							value.limit === 80 &&
							!value.created_after &&
							!value.created_before));
				enterpriseEventStream2.fetchEvents();
			});

			it('should make API call to get events with empty options when called', () => {
				const options = {streamType: 'admin_logs_streaming'};
				const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, options);
				sandbox.mock(boxClientFake.events).expects('get')
					.withArgs(sinon.match(value => value.stream_type === 'admin_logs_streaming' &&
						value.limit === 500 &&
						!value.stream_position &&
						!value.event_type &&
						!value.created_after &&
						!value.created_before));
				enterpriseEventStream2.fetchEvents();
			});
		});

		it('should make API call to get events from current stream position when called', () => {
			sandbox.mock(boxClientFake.events).expects('get')
				.withArgs(sinon.match({
					stream_type: 'admin_logs',
					stream_position: TEST_STREAM_POSITION
				}));
			enterpriseEventStream.fetchEvents();
		});
		it('should re-poll when API call does not return any events', () => {
			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});
			var spy = sandbox.stub(enterpriseEventStream, 'emit');
			sandbox.mock(global).expects('setTimeout');
			enterpriseEventStream.fetchEvents();
			assert(spy.calledWith('wait'));
		});
		it('should re-poll when API call returns an error', () => {
			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').yields(apiError);
			var spy = sandbox.stub(enterpriseEventStream, 'emit');
			sandbox.mock(global).expects('setTimeout');
			enterpriseEventStream.fetchEvents();
			assert(spy.calledWith('error', apiError));
			assert(spy.calledWith('wait'));
		});
		it('should set next stream position when API call is successful', done => {
			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [{type: 'event'}],
				next_stream_position: newStreamPosition
			});
			var spy = sandbox.stub(enterpriseEventStream, 'emit');
			enterpriseEventStream.fetchEvents(() => {
				assert.propertyVal(enterpriseEventStream, '_streamPosition', newStreamPosition);
				assert(spy.calledWith('newStreamState'));
				done();
			});
		});
		it('should NOT set next stream position when no events are returned', () => {
			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [],
				next_stream_position: newStreamPosition
			});
			enterpriseEventStream.fetchEvents();
			assert.propertyVal(enterpriseEventStream, '_streamPosition', TEST_STREAM_POSITION);
		});
		it('should NOT re-poll when pollingInterval = 0', done => {
			const enterpriseEventStream2 = new EnterpriseEventStream(boxClientFake, {pollingInterval: 0});
			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				next_stream_position: newStreamPosition
			});
			enterpriseEventStream2.fetchEvents(() => {
				done();
			});
		});
	});
	describe('_read()', () => {
		it('should push the events into the stream when fetchEvents() return events', () => {
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, [
				TEST_EVENT_1,
				TEST_EVENT_2
			]);
			var spy = sandbox.stub(enterpriseEventStream, 'push');
			enterpriseEventStream._read();
			assert(spy.calledTwice);
			assert(spy.firstCall.calledWith(TEST_EVENT_1));
			assert(spy.secondCall.calledWith(TEST_EVENT_2));
		});
		it('should close the stream when fetchEvents() returns no events', () => {
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(null, []);
			sandbox.mock(enterpriseEventStream).expects('push')
				.withArgs(null);
			enterpriseEventStream._read();
		});
		it('should close the stream when fetchEvents() returns an error', () => {
			var apiError = new Error('Whoops');
			sandbox.stub(enterpriseEventStream, 'fetchEvents').yields(apiError);
			sandbox.mock(enterpriseEventStream).expects('push')
				.withArgs(null);
			enterpriseEventStream._read();
		});
		it('should ony call _read() once after each call to fetchEvents()', done => {
			// This test fails without the call to pause() in _read().
			sandbox.stub(enterpriseEventStream, 'fetchEvents')
				.onFirstCall()
				.yieldsAsync(null, [
					TEST_EVENT_1,
					TEST_EVENT_2,
					TEST_EVENT_3
				])
				.onSecondCall()
				.yieldsAsync(null, [])
				.onThirdCall()
				.throws();
			var spy = sandbox.spy(enterpriseEventStream, '_read');
			enterpriseEventStream.on('data', () => { /**/ });
			enterpriseEventStream.on('end', () => {
				assert(spy.calledTwice);
				done();
			});
		});
	});
});
