/**
 * @fileoverview Events Manager Tests
 */
'use strict';
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const sinon = require('sinon'),
	mockery = require('mockery'),
	assert = require('chai').assert,
	Promise = require('bluebird'),
	leche = require('leche');
const BoxClient = require('../../../lib/box-client'),
	EventStream = require('../../../lib/event-stream'),
	EnterpriseEventStream = require('../../../lib/enterprise-event-stream');
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.createSandbox(),
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
describe('Events', () => {
	var TEST_STREAM_POSITION = '76592376495823';
	beforeEach(() => {
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
	afterEach(() => {
		sandbox.verifyAndRestore();
		mockery.deregisterAll();
		mockery.disable();
	});
	describe('getCurrentStreamPosition()', () => {
		it('should make API call to get current stream position', () => {
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/events', sinon.match({
					qs: sinon.match({
						stream_position: 'now'
					})
				}))
				.returns(Promise.resolve({statusCode: 200, body: {}}));
			events.getCurrentStreamPosition();
		});
		it('should call callback with error when API call fails', done => {
			var error = new Error('Failure');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(error));
			events.getCurrentStreamPosition(err => {
				assert.equal(err, error);
				done();
			});
		});
		it('should return promise that rejects when API call fails', () => {
			var error = new Error('Failure');
			sandbox.stub(boxClientFake, 'get').returns(Promise.reject(error));
			events.getCurrentStreamPosition()
				.catch(err => assert.equal(err, error));
		});
		it('should call callback with a response error when API returns non-200 result', done => {
			var response = {
				statusCode: 404
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			events.getCurrentStreamPosition(err => {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});
		it('should return a promise that rejects when API returns non-200 result', () => {
			var response = {
				statusCode: 404
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			events.getCurrentStreamPosition()
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});
		it('should call callback with current stream position when API call succeeds', done => {
			var response = {
				statusCode: 200,
				body: {
					next_stream_position: TEST_STREAM_POSITION
				}
			};
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			events.getCurrentStreamPosition((err, streamPosition) => {
				assert.ifError(err);
				assert.equal(streamPosition, TEST_STREAM_POSITION);
				done();
			});
		});
		it('should return a promise resolving to current stream position when API call succeeds', () => {
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
	describe('get()', () => {
		it('should make API call to get events when called', () => {
			var qs = {
				stream_position: TEST_STREAM_POSITION
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/events', sinon.match({qs}));

			events.get(qs);
		});
		it('should use default response handler when called', () => {
			sandbox.stub(boxClientFake, 'get');
			sandbox.mock(boxClientFake).expects('wrapWithDefaultHandler')
				.withArgs(boxClientFake.get)
				.returnsArg(0);
			events.get({});
		});
		it('should pass results to callback when callback is present', done => {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').yieldsAsync(null, response);
			events.get({}, (err, data) => {
				assert.ifError(err);
				assert.equal(data, response);
				done();
			});
		});
		it('should return promise resolving to results when called', () => {
			var response = {};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.stub(boxClientFake, 'get').returns(Promise.resolve(response));
			return events.get()
				.then(data => assert.equal(data, response));
		});
		it('should make API call with stream type to get events when called', () => {
			var qs = {
				stream_type: 'admin_logs_streaming'
			};
			sandbox.stub(boxClientFake, 'wrapWithDefaultHandler').returnsArg(0);
			sandbox.mock(boxClientFake).expects('get')
				.withArgs('/events', sinon.match({qs}));

			events.get(qs);
		});
	});
	describe('getLongPollInfo()', () => {
		it('should make API call to get long poll info when called', () => {
			var response = {
				statusCode: 200,
				body: {
					entries: [{type: 'realtime_server'}]
				}
			};
			sandbox.mock(boxClientFake).expects('options')
				.withArgs('/events')
				.returns(Promise.resolve(response));
			events.getLongPollInfo();
		});
		it('should call callback with an error when the API call fails', done => {
			var apiError = new Error('No connection');
			sandbox.stub(boxClientFake, 'options').returns(Promise.reject(apiError));
			events.getLongPollInfo(err => {
				assert.equal(err, apiError);
				done();
			});
		});
		it('should return a promise that rejects when the API call fails', () => {
			var apiError = new Error('No connection');
			sandbox.stub(boxClientFake, 'options').returns(Promise.reject(apiError));
			events.getLongPollInfo()
				.catch(err => {
					assert.equal(err, apiError);
				});
		});
		it('should call callback with an error when API call returns non-200 status', done => {
			var response = {
				statusCode: 403
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			events.getLongPollInfo(err => {
				assert.instanceOf(err, Error);
				assert.propertyVal(err, 'statusCode', response.statusCode);
				done();
			});
		});
		it('should return promise that rejects when API call returns non-200 status', () => {
			var response = {
				statusCode: 403
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			events.getLongPollInfo()
				.catch(err => {
					assert.instanceOf(err, Error);
					assert.propertyVal(err, 'statusCode', response.statusCode);
				});
		});
		it('should call callback with an error when API does not return realtime server info', done => {
			var response = {
				statusCode: 200,
				body: {
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			events.getLongPollInfo(err => {
				assert.instanceOf(err, Error);
				done();
			});
		});
		it('should return promise that rejects when API does not return realtime server info', () => {
			var response = {
				statusCode: 200,
				body: {
					entries: []
				}
			};
			sandbox.stub(boxClientFake, 'options').returns(Promise.resolve(response));
			events.getLongPollInfo()
				.catch(err => {
					assert.instanceOf(err, Error);
				});
		});
		it('should call callback with realtime server info when API call succeeds', done => {
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
			events.getLongPollInfo((err, data) => {
				assert.ifError(err);
				assert.equal(data, realtimeInfo);
				done();
			});
		});
		it('should return promise that resolves to long poll info when API call succeeds', () => {
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
	describe('getEventStream()', () => {
		it('should return event stream from starting stream position when passed stream position', done => {
			var streamPosition = '38746523';
			sandbox.mock(events).expects('getCurrentStreamPosition')
				.never();
			events.getEventStream(streamPosition, (err, stream) => {
				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledOnce, 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, streamPosition), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});
		it('should return event stream from starting position with options when passed stream position and options', done => {
			var streamPosition = '38746523';
			var options = {
				fetchInterval: 5000
			};
			sandbox.mock(events).expects('getCurrentStreamPosition')
				.never();
			events.getEventStream(streamPosition, options, (err, stream) => {
				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledOnce, 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, streamPosition, options), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});
		it('should make API call to get stream position when called without stream position', () => {
			sandbox.mock(events).expects('getCurrentStreamPosition')
				.returns(Promise.resolve(TEST_STREAM_POSITION));
			events.getEventStream();
		});
		it('should call callback with an error when the API call fails', done => {
			var apiError = new Error('There is no stream');
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.reject(apiError));
			events.getEventStream(err => {
				assert.equal(err, apiError);
				done();
			});
		});
		it('should return a promise that rejects when the API call fails', () => {
			var apiError = new Error('There is no stream');
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.reject(apiError));
			return events.getEventStream()
				.catch(err => {
					assert.equal(err, apiError);
				});
		});
		it('should call callback with a new event stream from the stream position when the API call succeeds', done => {
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.resolve(TEST_STREAM_POSITION));
			events.getEventStream((err, stream) => {
				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});
		it('should call callback with a new event stream from the stream position and options when passed options and the API call succeeds', done => {
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.resolve(TEST_STREAM_POSITION));
			var options = {
				fetchInterval: 5000
			};
			events.getEventStream(options, (err, stream) => {
				assert.ifError(err);
				assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
				assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION, options), 'Should pass correct args to EventStream constructor');
				assert.equal(stream, eventStreamFake);
				done();
			});
		});
		it('should return a promise that resolves to a new event stream when the API call succeeds', () => {
			sandbox.stub(events, 'getCurrentStreamPosition').returns(Promise.resolve(TEST_STREAM_POSITION));
			return events.getEventStream()
				.then(stream => {
					assert.ok(EventStreamConstructorStub.calledWithNew(), 'Should call EventStream constructor');
					assert.ok(EventStreamConstructorStub.calledWith(boxClientFake, TEST_STREAM_POSITION), 'Should pass correct args to EventStream constructor');
					assert.equal(stream, eventStreamFake);
				});
		});
		it('should return a promise that resolves to a new event stream with options when called with options and the API call succeeds', () => {
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
	describe('getEnterpriseEventStream()', () => {
		var options = {
			streamPosition: TEST_STREAM_POSITION
		};
		it('should call callback with a new event stream from the stream position', done => {
			events.getEnterpriseEventStream(options, (err, stream) => {
				assert.ifError(err);
				assert.ok(EnterpriseEventStreamConstructorStub.calledOnce, 'Should call EnterpriseEventStream constructor');
				assert.ok(EnterpriseEventStreamConstructorStub.calledWith(boxClientFake, options), 'Should pass correct args to EnterpriseEventStream constructor');
				assert.equal(stream, enterpriseEventStreamFake);
				done();
			});
		});
		it('should return a promise that resolves to a new event stream', () => events.getEnterpriseEventStream(options)
			.then(stream => {
				assert.ok(EnterpriseEventStreamConstructorStub.calledWithNew(), 'Should call EnterpriseEventStream constructor');
				assert.ok(EnterpriseEventStreamConstructorStub.calledWith(boxClientFake, options), 'Should pass correct args to EnterpriseEventStream constructor');
				assert.equal(stream, enterpriseEventStreamFake);
			}));
	});
});
