/**
 * @fileoverview Event Stream Tests
 * @author mwiller
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
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	EventStream,
	eventStream,
	clock,
	MODULE_FILE_PATH = '../../lib/event-stream';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('EventStream', function() {

	var TEST_STREAM_POSITION = '76592376495823';

	beforeEach(function() {

		clock = sandbox.useFakeTimers();

		boxClientFake = leche.fake(BoxClient.prototype);
		boxClientFake.events = leche.fake(Events.prototype);

		mockery.enable({
			warnOnUnregistered: false
		});
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		EventStream = require(MODULE_FILE_PATH);
		eventStream = new EventStream(boxClientFake, TEST_STREAM_POSITION);
	});

	afterEach(function() {
		clock.restore();
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('constructor', function() {

		it('should set client and stream position on the instance when called', function() {

			assert.propertyVal(eventStream, '_client', boxClientFake);
			assert.propertyVal(eventStream, '_streamPosition', TEST_STREAM_POSITION);
		});

		it('should create an instance of readable stream when called', function() {

			assert.instanceOf(eventStream, Readable);
		});

	});

	describe('getLongPollInfo()', function() {

		it('should make API call and set long poll info when called', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.mock(boxClientFake.events).expects('getLongPollInfo').yields(null, longPollInfo);

			eventStream.getLongPollInfo();

			assert.propertyVal(eventStream, '_longPollInfo', longPollInfo);
			assert.propertyVal(eventStream, '_longPollRetries', 0);
		});

		it('should reset the number of long poll retries when API call is successful', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};
			eventStream._longPollRetries = 2;

			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').yields(null, longPollInfo);

			eventStream.getLongPollInfo();

			assert.propertyVal(eventStream, '_longPollRetries', 0);
		});

		it('should call doLongPoll() when the API call is successful', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};

			sandbox.stub(boxClientFake.events, 'getLongPollInfo').yields(null, longPollInfo);
			sandbox.mock(eventStream).expects('doLongPoll');

			eventStream.getLongPollInfo();
		});

		it('should emit error event when API call fails', function() {

			var apiError = new Error('API fail');
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').yields(apiError);
			sandbox.mock(eventStream).expects('emit').withArgs('error', apiError);

			eventStream.getLongPollInfo();
		});

		it('should retry getLongPollInfo() after delay when API call fails', function() {

			var apiError = new Error('API fail');
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(eventStream, 'emit');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').yields(apiError);

			eventStream.getLongPollInfo();

			sandbox.mock(eventStream).expects('getLongPollInfo');
			clock.tick(1000);
		});
	});

	describe('doLongPoll()', function() {

		var TEST_LONG_POLL_URL = 'https://realtime.box.com/channel',
			TEST_RETRY_TIMEOUT = 610,
			TEST_MAX_RETRIES = 10;

		beforeEach(function() {

			eventStream._longPollInfo = {
				url: TEST_LONG_POLL_URL,
				max_retries: TEST_MAX_RETRIES,
				retry_timeout: TEST_RETRY_TIMEOUT
			};
		});

		it('should get new long poll information when over the max number of retries', function() {

			sandbox.mock(eventStream).expects('getLongPollInfo');
			sandbox.mock(boxClientFake).expects('get').never();

			eventStream._longPollRetries = TEST_MAX_RETRIES + 1;

			eventStream.doLongPoll();
		});

		it('should make long poll request with correct query params when called', function() {

			eventStream._longPollInfo.url = 'https://realtime/poll?foo=bar';

			var expectedQS = {
				foo: 'bar',
				stream_position: TEST_STREAM_POSITION
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get').withArgs('https://realtime/poll', sinon.match({
				timeout: TEST_RETRY_TIMEOUT * 1000,
				qs: sinon.match(expectedQS)
			}));

			eventStream.doLongPoll();
		});

		it('should increment the number of long poll retries when called', function() {

			eventStream._longPollRetries = 4;

			sandbox.stub(boxClientFake, 'get');
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);

			eventStream.doLongPoll();

			assert.propertyVal(eventStream, '_longPollRetries', 5);
		});

		it('should reset long poll process after delay when API call returns error', function() {

			var apiError = new Error('Oops');
			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yields(apiError);
			sandbox.mock(eventStream).expects('getLongPollInfo');

			eventStream.doLongPoll();
			clock.tick(1000);
		});

		it('should reset long poll process immediately when API call returns reconnect message', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yields(null, {
				message: 'reconnect'
			});
			sandbox.mock(eventStream).expects('getLongPollInfo');

			eventStream.doLongPoll();
		});

		it('should retry long poll when API call returns unknown message', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yields(null, {
				message: 'what?'
			});
			sandbox.mock(eventStream).expects('doLongPoll');

			eventStream.doLongPoll();
		});

		it('should fetch new events when the API call returns new changes', function() {

			sandbox.stub(boxClientFake, 'defaultResponseHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yields(null, {
				message: 'new_change'
			});
			sandbox.mock(eventStream).expects('fetchEvents');

			eventStream.doLongPoll();
		});

	});

	describe('fetchEvents()', function() {

		it('should make API call to get events from current stream position when called', function() {

			sandbox.mock(boxClientFake.events).expects('get').withArgs(sinon.match({
				stream_position: TEST_STREAM_POSITION
			}));

			eventStream.fetchEvents();
		});

		it('should emit error event when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').yields(apiError);
			sandbox.mock(eventStream).expects('emit').withArgs('error', apiError);

			eventStream.fetchEvents();
		});

		it('should reset long poll process after delay when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').yields(apiError);
			sandbox.stub(eventStream, 'emit');

			eventStream.fetchEvents();

			sandbox.mock(eventStream).expects('getLongPollInfo');
			clock.tick(1000);
		});

		it('should re-poll when API call does not return any events', function() {

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				chunk_size: 0,
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.mock(eventStream).expects('doLongPoll');

			eventStream.fetchEvents();
		});

		it('should re-poll when API call does not return next stream position', function() {

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				chunk_size: 1,
				entries: [
					{type: 'event'}
				]
			});
			sandbox.mock(eventStream).expects('doLongPoll');

			eventStream.fetchEvents();
		});

		it('should set next stream position when API call is successful', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [
					{type: 'event'}
				],
				next_stream_position: newStreamPosition
			});
			sandbox.stub(eventStream, 'push');

			eventStream.fetchEvents();

			assert.propertyVal(eventStream, '_streamPosition', newStreamPosition);
		});

		it('should push new events into the stream when API call is successful', function() {

			var event = {
				type: 'event',
				event_id: '783964872'
			};
			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.mock(eventStream).expects('push').withArgs(event);

			eventStream.fetchEvents();
		});

		it('should deduplicate events when the API returns duplicate events', function() {

			var duplicateEventID = '783964872';
			var duplicateEvent = {
				type: 'event',
				event_id: duplicateEventID
			};
			var newEvent = {
				type: 'event',
				event_id: '987655'
			};

			eventStream._dedupHash[duplicateEventID] = true;

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [duplicateEvent, newEvent],
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.mock(eventStream).expects('push').once().withArgs(newEvent);

			eventStream.fetchEvents();
		});

		it('should re-poll when the API returns no non-duplicate events', function() {

			var duplicateEventID = '783964872';
			var duplicateEvent = {
				type: 'event',
				event_id: duplicateEventID
			};

			eventStream._dedupHash[duplicateEventID] = true;

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [duplicateEvent],
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.mock(eventStream).expects('push').never();
			sandbox.mock(eventStream).expects('doLongPoll');

			eventStream.fetchEvents();
		});

		it('should set event IDs for deduplication when API returns new events', function() {

			var eventID = '783964872';
			var event = {
				type: 'event',
				event_id: eventID
			};

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.stub(eventStream, 'push');

			eventStream.fetchEvents();

			assert.deepPropertyVal(eventStream, '_dedupHash.' + eventID, true);
		});

		it('should clean up the deduplication filter when it reaches its maximum size', function() {

			for (var i = 1; i <= 5000; i++) {
				eventStream._dedupHash[i] = true;
			}

			sandbox.stub(boxClientFake.events, 'get').yields(null, {
				entries: [{type: 'event', event_id: '73469587263'}],
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.stub(eventStream, 'push');
			sandbox.mock(eventStream).expects('cleanupDedupFilter');

			eventStream.fetchEvents();
		});

	});

	describe('cleanupDedupFilter()', function() {

		it('should remove events not in the latest set from deduplication filter when called', function() {

			eventStream._dedupHash['123'] = true;
			eventStream._dedupHash['456'] = true;

			var latestEvents = [{
				type: 'event',
				event_id: '456'
			}];

			eventStream.cleanupDedupFilter(latestEvents);

			assert.notDeepProperty(eventStream, '_dedupHash.123');
			assert.deepPropertyVal(eventStream, '_dedupHash.456', true);
		});
	});

});
