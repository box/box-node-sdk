/**
 * @fileoverview Events Manager Tests
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
	EventStream = require('../../../lib/event-stream'),
	EnterpriseEventStream = require('../../../lib/enterprise-event-stream');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	Events,
	events,
	EventStreamConstructorStub,
	eventStreamFake,
	EnterpriseEventStreamConstructorStub,
	enterpriseEventStreamFake,
	MODULE_FILE_PATH = '../../../lib/managers/events';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Events', function() {

	var TEST_STREAM_POSITION = '76592376495823';

	beforeEach(function() {

		boxClientFake = leche.fake(BoxClient.prototype);
		EventStreamConstructorStub = sandbox.stub();
		eventStreamFake = leche.fake(EventStream.prototype);
		EventStreamConstructorStub.returns(eventStreamFake);

		EnterpriseEventStreamConstructorStub = sandbox.stub();
		enterpriseEventStreamFake = leche.fake(EnterpriseEventStream.prototype);
		EnterpriseEventStreamConstructorStub.returns(enterpriseEventStreamFake);

		mockery.enable({
			warnOnUnregistered: false,
			useCleanCache: true
		});
		mockery.registerMock('../event-stream', EventStreamConstructorStub);
		mockery.registerMock('../enterprise-event-stream', EnterpriseEventStreamConstructorStub);
		mockery.registerAllowable(MODULE_FILE_PATH, true);

		Events = require(MODULE_FILE_PATH);
		events = new Events(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getCurrentStreamPosition()', function() {

		it('should make API call to get current stream position', function() {

			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/events', sinon.match({
					qs: sinon.match({
						stream_position: 'now'
					})
				}))
				.returns(Promise.resolve({statusCode: 200, body: {}}));

			return events.getCurrentStreamPosition();
		});

		it('should return promise that rejects when API call fails', function() {

			var error = new Error('Failure');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(error));

			return events.getCurrentStreamPosition()
				.catch(err => assert.equal(err, error));
		});

		it('should return a promise that rejects when API returns non-200 result', function() {

			var response = {
				statusCode: 404
			};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return events.getCurrentStreamPosition()
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});

		it('should return a promise resolving to current stream position when API call succeeds', function() {

			var response = {
				statusCode: 200,
				body: {
					next_stream_position: TEST_STREAM_POSITION
				}
			};

			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));

			return events.getCurrentStreamPosition()
				.then(streamPosition => {
					assert.equal(streamPosition, TEST_STREAM_POSITION);
				});
		});
	});

	describe('get()', function() {

		it('should make API call to get events when called', function() {

			var qs = {
				stream_position: TEST_STREAM_POSITION
			};

			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/events', sinon.match({qs}));

			events.get(qs);
		});

		it('should use default response handler when called', function() {

			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);

			events.get({});
		});

		it('should return promise resolving to results when called', function() {

			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return events.get()
				.then(data => assert.equal(data, response));
		});
	});

	describe('getLongPollInfo()', function() {

		it('should make API call to get long poll info when called', function() {

			var response = {
				statusCode: 200,
				body: {
					entries: [{type: 'realtime_server'}]
				}
			};
			sandbox.mock(boxClientFake).expects('options')
				.withArgs('/events')
				.returns(Promise.resolve(response));

			return events.getLongPollInfo();
		});

		it('should return a promise that rejects when the API call fails', function() {

			var apiError = new Error('No connection');
			sandbox.stub(boxClientFake, 'options').returns(Promise.reject(apiError));

			return events.getLongPollInfo()
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should return promise that rejects when API call returns non-200 status', function() {

			var response = {
				statusCode: 403
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));

			return events.getLongPollInfo()
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});

		it('should return promise that rejects when API does not return realtime server info', function() {

			var response = {
				statusCode: 200,
				body: {
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));

			return events.getLongPollInfo()
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});

		it('should return promise that resolves to long poll info when API call succeeds', function() {

			var realtimeInfo = {
				type: 'realtime_server',
				url: 'https://realtime.box.com/foo'
			};
			var response = {
				statusCode: 200,
				body: {
					entries: [realtimeInfo]
				}
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));

			return events.getLongPollInfo()
				.then(data => {
					assert.equal(data, realtimeInfo);
				});
		});
	});

	describe('getEventStream()', function() {

		it('should return event stream from starting stream position when passed stream position', function() {

			var streamPosition = '38746523';
			sandbox.mock(events).expects('getCurrentStreamPosition')
				.never();
			return events.getEventStream(streamPosition)
				.then(stream => {
					assert.ok(EventStreamConstructorStub.calledOnce, 'Should call EventStream constructor');
					assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, streamPosition), 'Should pass correct args to EventStream constructor');
					assert.equal(stream, eventStreamFake);
				});
		});

		it('should return event stream from starting position with options when passed stream position and options', function() {

			var streamPosition = '38746523';
			var options = {
				fetchInterval: 5000
			};
			sandbox.mock(events).expects('getCurrentStreamPosition')
				.never();
			return events.getEventStream(streamPosition, options)
				.then(stream => {
					assert.ok(EventStreamConstructorStub.calledOnce, 'Should call EventStream constructor');
					assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, streamPosition, options), 'Should pass correct args to EventStream constructor');
					assert.equal(stream, eventStreamFake);
				});
		});

		it('should make API call to get stream position when called without stream position', function() {

			sandbox.mock(events).expects('getCurrentStreamPosition')
				.returns(Promise.resolve(TEST_STREAM_POSITION));

			events.getEventStream();
		});

		it('should return a promise that rejects when the API call fails', function() {

			var apiError = new Error('There is no stream');
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.reject(apiError));

			return events.getEventStream()
				.catch(err => {
					assert.equal(err, apiError);
				});
		});

		it('should return a promise that resolves to a new event stream when the API call succeeds', function() {

			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.resolve(TEST_STREAM_POSITION));

			return events.getEventStream()
				.then(stream => {
					assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
					assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION), 'Should pass correct args to EventStream constructor');
					assert.equal(stream, eventStreamFake);
				});
		});

		it('should return a promise that resolves to a new event stream with options when called with options and the API call succeeds', function() {

			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.resolve(TEST_STREAM_POSITION));

			var options = {
				fetchInterval: 5000
			};

			return events.getEventStream(options)
				.then(stream => {
					assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
					assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION, options), 'Should pass correct args to EventStream constructor');
					assert.equal(stream, eventStreamFake);
				});
		});
	});

	describe('getEnterpriseEventStream()', function() {

		var options = {
			streamPosition: TEST_STREAM_POSITION
		};

		it('should return a promise that resolves to a new event stream', function() {

			return events.getEnterpriseEventStream(options)
				.then(stream => {
					assert.ok(EnterpriseEventStreamConstructorStub.calledWithNew(), 'Should call EnterpriseEventStream constructor');
					assert.ok(EnterpriseEventStreamConstructorStub.calledWith(boxClientFake, options), 'Should pass correct args to EnterpriseEventStream constructor');
					assert.equal(stream, enterpriseEventStreamFake);
				});
		});
	});
});
