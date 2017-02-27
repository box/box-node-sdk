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
	clock,
	MODULE_FILE_PATH = '../../lib/enterprise-event-stream';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('EnterpriseEventStream', function() {

	var TEST_STREAM_POSITION = '76592376495823';

	beforeEach(function() {

		clock = sandbox.useFakeTimers();

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
		clock.restore();
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

		it('should emit error event when the API call fails', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(apiError);
			sandbox.mock(enterpriseEventStream).expects('emit').withArgs('error', apiError);

			enterpriseEventStream.fetchEvents();
		});

		it('should re-poll when API call does not return any events', function() {

			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(null, {
				chunk_size: 0,
				next_stream_position: TEST_STREAM_POSITION
			});
			sandbox.mock(global).expects('setTimeout');

			enterpriseEventStream.fetchEvents();
		});

		it('should re-poll when API call returns an error', function() {

			var apiError = new Error('Whoops');
			sandbox.stub(boxClientFake.enterpriseEvents, 'get').yields(apiError);
			sandbox.mock(enterpriseEventStream).expects('emit').withArgs('error', apiError);
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
