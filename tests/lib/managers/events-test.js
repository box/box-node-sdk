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
	EventStream = require('../../../lib/event-stream');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake,
	Events,
	events,
	EventStreamConstructorStub,
	eventStreamFake,
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

		mockery.enable({
			warnOnUnregistered: false,
			useCleanCache: true
		});
		mockery.registerMock('../event-stream', EventStreamConstructorStub);
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

			sandbox.mock(boxClientFake).expects('get').withArgs('/events', sinon.match({
				qs: sinon.match({
					stream_position: 'now'
				})
			}));

			events.getCurrentStreamPosition();
		});

		it('should return error when API call fails', function(done) {

			var error = new Error('Failure');
			sandbox.stub(boxClientFake, 'get').yieldsAsync(error);

			events.getCurrentStreamPosition(function(err) {

				assert.equal(err, error);
				done();
			});
		});

		it('should return a response error when API returns non-200 result', function(done) {

			var response = {
				statusCode: 404
			};

			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);

			events.getCurrentStreamPosition(function(err) {

				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});

		it('should return current stream position when API call succeeds', function(done) {

			var response = {
				statusCode: 200,
				body: {
					next_stream_position: TEST_STREAM_POSITION
				}
			};

			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);

			events.getCurrentStreamPosition(function(err, streamPosition) {

				assert.ifError(err);
				assert.equal(streamPosition, TEST_STREAM_POSITION);
				done();
			});
		});

	});

	describe('get()', function() {

		it('should make API call to get events when called', function() {

			var qs = {
				stream_position: TEST_STREAM_POSITION
			};

			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/events', sinon.match({qs: qs}));

			events.get(qs);
		});

		it('should use default response handler when called', function(done) {

			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync();

			events.get({}, done);
		});

	});

	describe('getLongPollInfo()', function() {

		it('should make API call to get long poll info when called', function() {

			sandbox.mock(boxClientFake).expects('options').withArgs('/events');

			events.getLongPollInfo();
		});

		it('should return an error when the API call fails', function(done) {

			var apiError = new Error('No connection');
			sandbox.stub(boxClientFake, 'options').yieldsAsync(apiError);

			events.getLongPollInfo(function(err) {

				assert.equal(err, apiError);
				done();
			});
		});

		it('should respond with an error when API call returns non-200 status', function(done) {

			var response = {
				statusCode: 403
			};
			sandbox.stub(boxClientFake, 'options').yieldsAsync(null, response);

			events.getLongPollInfo(function(err) {

				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});

		it('should respond with an error when API does not return realtime server info', function(done) {

			var response = {
				statusCode: 200,
				body: {
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'options').yieldsAsync(null, response);

			events.getLongPollInfo(function(err) {

				assert.instanceOf(err, Error);
				done();
			});
		});

		it('should return realtime server info when API call succeeds', function(done) {

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
			sandbox.stub(boxClientFake, 'options').yieldsAsync(null, response);

			events.getLongPollInfo(function(err, data) {

				assert.ifError(err);
				assert.equal(data, realtimeInfo);
				done();
			});
		});

	});

	describe('getEventStream()', function() {

		it('should return event stream from starting stream position when passed stream position', function(done) {

			var streamPosition = '38746523';
			sandbox.mock(events).expects('getCurrentStreamPosition').never();
			events.getEventStream(streamPosition, function(err, stream) {

				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledOnce, 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, streamPosition), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});

		it('should make API call to get stream position when called without stream position', function() {

			sandbox.mock(events).expects('getCurrentStreamPosition');

			events.getEventStream();
		});

		it('should return an error when the API call fails', function(done) {

			var apiError = new Error('There is no stream');
			sandbox.stub(events, 'getCurrentStreamPosition').yieldsAsync(apiError);

			events.getEventStream(function(err) {

				assert.equal(err, apiError);
				done();
			});
		});

		it('should return a new event stream from the stream position when the API call succeeds', function(done) {

			sandbox.stub(events, 'getCurrentStreamPosition').yieldsAsync(null, TEST_STREAM_POSITION);

			events.getEventStream(function(err, stream) {

				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});

	});

});
