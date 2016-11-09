/**
 * @fileoverview Tests for Lazy Async Queue
 */

/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	sinon = require('sinon'),
	LazyAsyncQueue = require('../../../lib/util/lazy-async-queue');


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

describe('LazyAsyncQueue', function() {

	// Common Test Variables
	var sandbox,
		queue;


	function TEST_CALLBACK() {
		// do nothing
	}

	before(function() {
		sandbox = sinon.sandbox.create();
	});

	beforeEach(function() {
		queue = new LazyAsyncQueue();
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
	});

	describe('push()', function() {

		it('should add a function to the queue when called', function() {
			queue._callbacks = [];
			queue.push(TEST_CALLBACK);
			assert.equal(queue._callbacks[0], TEST_CALLBACK);
		});

		it('should increment length when a new callback is pushed when called', function() {
			assert.equal(queue.length, 0);
			queue.push(TEST_CALLBACK);
			assert.equal(queue.length, 1);
			queue.push(TEST_CALLBACK);
			assert.equal(queue.length, 2);
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			assert.equal(queue.length, 5);
		});

	});

	describe('flush()', function() {

		it('should call callbacks with the given arguments asynchronously when called', function(done) {
			function doneTestArgs() {
				assert.equal(arguments[0], 42);
				assert.equal(arguments[1], 'foobar');
				done();
			}
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.push(doneTestArgs);
			queue.flush(42, 'foobar');
		});

		it('should clear the internal array synchronously when called', function() {
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.flush();
			assert.equal(queue._callbacks.length, 0);
		});

		it('should set length to zero synchronously when called', function() {
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.push(TEST_CALLBACK);
			queue.flush();
			assert.equal(queue.length, 0);
		});

	});

});
