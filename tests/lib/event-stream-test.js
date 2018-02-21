/**
 * @fileoverview Event Stream Tests
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	Readable = require('stream').Readable,
	Promise = require('bluebird'),
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

		it('should use default options when no options are passed', function() {

			assert.nestedPropertyVal(eventStream, '_options.fetchInterval', 1000);
			assert.nestedPropertyVal(eventStream, '_options.retryDelay', 1000);
		});

		it('should set options when options are passed', function() {

			var options = {
				fetchInterval: 20000
			};
			var customEventStream = new EventStream(boxClientFake, TEST_STREAM_POSITION, options);

			assert.nestedPropertyVal(customEventStream, '_options.fetchInterval', 20000);
			assert.nestedPropertyVal(eventStream, '_options.retryDelay', 1000);
		});

	});

	describe('getLongPollInfo()', function() {

		it('should make API call and set long poll info when called', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.mock(boxClientFake.events).expects('getLongPollInfo')
				.returns(Promise.resolve(longPollInfo));

			return eventStream.getLongPollInfo()
				.then(() => {
					assert.propertyVal(eventStream, '_longPollInfo', longPollInfo);
					assert.propertyVal(eventStream, '_longPollRetries', 0);
				});
		});

		it('should reset the number of long poll retries when API call is successful', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};
			eventStream._longPollRetries = 2;

			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').returns(Promise.resolve(longPollInfo));

			return eventStream.getLongPollInfo()
				.then(() => {
					assert.propertyVal(eventStream, '_longPollRetries', 0);
				});
		});

		it('should call doLongPoll() when the API call is successful', function() {

			var longPollInfo = {url: 'https://realtime.box.com/blah'};

			sandbox.stub(boxClientFake.events, 'getLongPollInfo').returns(Promise.resolve(longPollInfo));
			sandbox.mock(eventStream).expects('doLongPoll');

			return eventStream.getLongPollInfo();
		});

		it('should emit error event when API call fails', function() {

			var apiError = new Error('API fail');
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').returns(Promise.reject(apiError));
			sandbox.mock(eventStream).expects('emit')
				.withArgs('error', apiError);

			return eventStream.getLongPollInfo();
		});

		it('should retry getLongPollInfo() after delay when API call fails', function() {

			var apiError = new Error('API fail');
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(eventStream, 'emit');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').returns(Promise.reject(apiError));

			return eventStream.getLongPollInfo()
				.then(() => {
					sandbox.mock(eventStream).expects('getLongPollInfo');
					clock.tick(1000);
				});
		});

		it('should not retry getLongPollInfo() when API call fails with auth error', function() {

			var apiError = new Error('API fail');
			apiError.authExpired = true;
			sandbox.stub(eventStream, 'doLongPoll');
			sandbox.stub(eventStream, 'emit');
			sandbox.stub(boxClientFake.events, 'getLongPollInfo').returns(Promise.reject(apiError));


			return eventStream.getLongPollInfo()
				.then(() => {
					sandbox.mock(eventStream).expects('getLongPollInfo')
						.never();
					clock.tick(1000);
				});
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
			sandbox.mock(boxClientFake).expects('get')
				.never();

			eventStream._longPollRetries = TEST_MAX_RETRIES + 1;

			return eventStream.doLongPoll();
		});

		it('should make long poll request with correct query params when called', function() {

			eventStream._longPollInfo.url = 'https://realtime/poll?foo=bar';

			var expectedQS = {
				foo: 'bar',
				stream_position: TEST_STREAM_POSITION
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('https://realtime/poll', sinon.match({
					timeout: TEST_RETRY_TIMEOUT * 1000,
					qs: expectedQS
				}))
				.returns(Promise.resolve({message: 'new_change'}));

			return eventStream.doLongPoll();
		});

		it('should increment the number of long poll retries when called', function() {

			eventStream._longPollRetries = 4;

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve({}));
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);

			eventStream.doLongPoll();
			assert.propertyVal(eventStream, '_longPollRetries', 5);
		});

		it('should reset long poll process after delay when API call returns error', function() {

			var apiError = new Error('Oops');
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(apiError));
			sandbox.mock(eventStream).expects('getLongPollInfo');

			return eventStream.doLongPoll().then(() => {
				clock.tick(1000);
			});
		});

		it('should reset long poll process immediately when API call returns reconnect message', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve({
				message: 'reconnect'
			}));
			sandbox.mock(eventStream).expects('getLongPollInfo');

			return eventStream.doLongPoll();
		});

		it('should retry long poll when API call returns unknown message', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve({
				message: 'what?'
			}));
			sandbox.mock(eventStream).expects('doLongPoll');

			return eventStream.doLongPoll();
		});

		it('should fetch new events when the API call returns new changes', function() {

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve({
				message: 'new_change'
			}));
			sandbox.mock(eventStream).expects('fetchEvents');

			return eventStream.doLongPoll();
		});

	});

	describe('fetchEvents()', function() {

		var fakeEvents;

		beforeEach(function() {

			fakeEvents = {
				entries: [{event_id: '123'}],
				next_stream_position: 'foo'
			};
		});

		it('should make API call to get events from current stream position when called', function() {

			sandbox.mock(boxClientFake.events).expects('get')
				.withArgs(sinon.match({
					stream_position: TEST_STREAM_POSITION,
					limit: 500
				}))
				.returns(Promise.resolve(fakeEvents));

			eventStream.fetchEvents();
		});

		it('should emit error event when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.reject(apiError));
			sandbox.mock(eventStream).expects('emit')
				.withArgs('error', apiError);

			return eventStream.fetchEvents()
				.then(() => {
					sandbox.stub(eventStream, 'getLongPollInfo');
					clock.tick(1000);
				});
		});

		it('should reset long poll process after delay when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.reject(apiError));
			sandbox.stub(eventStream, 'emit');

			return eventStream.fetchEvents().then(() => {
				sandbox.mock(eventStream).expects('getLongPollInfo');
				clock.tick(1000);
			});
		});

		it('should re-poll when API call does not return any events', function() {

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				chunk_size: 0,
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('doLongPoll');

			return eventStream.fetchEvents();
		});

		it('should re-poll when API call does not return next stream position', function() {

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				chunk_size: 1,
				entries: [{type: 'event'}]
			}));
			sandbox.mock(eventStream).expects('doLongPoll');

			return eventStream.fetchEvents();
		});

		it('should set next stream position when API call is successful', function() {

			var newStreamPosition = '5263748952387465';
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [{type: 'event'}],
				next_stream_position: newStreamPosition
			}));
			sandbox.stub(eventStream, 'push');

			return eventStream.fetchEvents().then(() => {
				assert.propertyVal(eventStream, '_streamPosition', newStreamPosition);
			});
		});

		it('should pause stream and push new events into the stream when API call is successful', function() {

			var event = {
				type: 'event',
				event_id: '783964872'
			};
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('pause');
			sandbox.mock(eventStream).expects('push')
				.withArgs(event);

			return eventStream.fetchEvents();
		});

		it('should resume stream after pushing new events when stream was flowing', function() {

			var event = {
				type: 'event',
				event_id: '783964872'
			};
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('push')
				.withArgs(event);
			sandbox.mock(eventStream).expects('resume');

			return eventStream.fetchEvents();
		});

		it('should not resume stream after pushing new events when stream was already paused', function() {

			var event = {
				type: 'event',
				event_id: '783964872'
			};
			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('push')
				.withArgs(event);
			sandbox.mock(eventStream).expects('resume')
				.never();

			eventStream.pause();
			return eventStream.fetchEvents();
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

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [
					duplicateEvent,
					newEvent
				],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('push')
				.once()
				.withArgs(newEvent);

			return eventStream.fetchEvents();
		});

		it('should re-poll when the API returns no non-duplicate events', function() {

			var duplicateEventID = '783964872';
			var duplicateEvent = {
				type: 'event',
				event_id: duplicateEventID
			};

			eventStream._dedupHash[duplicateEventID] = true;

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [duplicateEvent],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.mock(eventStream).expects('push')
				.never();
			sandbox.mock(eventStream).expects('doLongPoll');

			return eventStream.fetchEvents();
		});

		it('should set event IDs for deduplication when API returns new events', function() {

			var eventID = '783964872';
			var event = {
				type: 'event',
				event_id: eventID
			};

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [event],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.stub(eventStream, 'push');

			return eventStream.fetchEvents()
				.then(() => {
					assert.nestedPropertyVal(eventStream, `_dedupHash.${eventID}`, true);
				});
		});

		it('should clean up the deduplication filter when it reaches its maximum size', function() {

			for (var i = 1; i <= 5000; i++) {
				eventStream._dedupHash[i] = true;
			}

			sandbox.stub(boxClientFake.events, 'get').returns(Promise.resolve({
				entries: [{type: 'event', event_id: '73469587263'}],
				next_stream_position: TEST_STREAM_POSITION
			}));
			sandbox.stub(eventStream, 'push');
			sandbox.mock(eventStream).expects('cleanupDedupFilter');

			return eventStream.fetchEvents();
		});

		it('should delay successive calls to be rate limited when called', function() {

			var secondFakeEvents = {
				entries: [{event_id: '456'}],
				next_stream_position: 'bar'
			};

			// _read() gets called and starts another cycle — stub it out
			sandbox.stub(eventStream, 'getLongPollInfo');

			sandbox.mock(boxClientFake.events).expects('get')
				.twice()
				.withArgs(sinon.match({
					stream_position: TEST_STREAM_POSITION,
					limit: 500
				}))
				.onFirstCall()
				.resolves(fakeEvents)
				.onSecondCall()
				.resolves(secondFakeEvents);

			var called = {
				first: false,
				second: false
			};

			var p1 = eventStream.fetchEvents()
				.then(() => {
					called.first = true;
					assert.propertyVal(called, 'second', false);
					// Don't return the same event
					fakeEvents.entries = [{event_id: '345'}];
					clock.tick(1000);
				});
			var p2 = eventStream.fetchEvents()
				.then(() => {
					called.second = true;
					assert.propertyVal(called, 'first', true);
				});

			return Promise.all([
				p1,
				p2
			]);
		});

	});

	describe('cleanupDedupFilter()', function() {

		it('should remove events not in the latest set from deduplication filter when called', function() {

			eventStream._dedupHash['123'] = true;
			eventStream._dedupHash['456'] = true;

			var latestEvents = [
				{
					type: 'event',
					event_id: '456'
				}
			];

			eventStream.cleanupDedupFilter(latestEvents);

			assert.notNestedProperty(eventStream, '_dedupHash.123');
			assert.nestedPropertyVal(eventStream, '_dedupHash.456', true);
		});
	});

});
