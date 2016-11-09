/**
 * @fileoverview Queue up callbacks to be flushed and called all at once
 */

'use strict';


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Wraps a callback so that it can be called with the given arguments via process.nextTick().
 * @param {Function} callback The callback to wrap
 * @param {Array} args The arguments to pass to the callback
 * @returns {Function} A new function which takes no arguments, but when called will
 * execute the callback with the given args.
 * @private
 */
function wrapCallbackForNextTick(callback, args) {

	return function() {
		callback.apply(null, args);
	};
}

/**
 * A Lazy Callback Queue. Callbacks can be held here if they are not yet ready to be called,
 * and called all together once the error/data is ready.
 *
 * @constructor
 * @returns {void}
 */
function LazyAsyncQueue() {
	this._callbacks = [];
	this.length = 0;
}


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Push the given callback into the queue. It will stay there until flush() is called.
 *
 * @param {UpdateTokensCallback} callback - The callback to queue up
 * @returns {void}
 */
LazyAsyncQueue.prototype.push = function(callback) {
	this._callbacks.push(callback);
	this.length++;
};

/**
 * Calls all callbacks in the queue with the given arguments. The queue is emptied
 * once all callbacks have been executed.
 *
 * @param {...*} arguments - The arguments the method has been called with
 * @returns {void}
 */
LazyAsyncQueue.prototype.flush = function( /* arguments */ ) {
	var len = this._callbacks.length;

	// Loop through the array of callbacks waiting for tokens
	for (var i = 0; i < len; i++) {

		// Defer calling the callback with the error or accessToken until the next tick.
		// Without this, the callback would be able to start executing outer calls to
		// the session, which could end up modifying the same array we're iterating over.
		var requestCallback = this._callbacks[i];
		var processCallback = wrapCallbackForNextTick(requestCallback, arguments);
		process.nextTick(processCallback);
	}

	// Clear the array
	this._callbacks.length = 0;
	this.length = 0;
};


/**
 * @module lazy-async-queue
 * @see {@Link LazyAsyncQueue}
 */
module.exports = LazyAsyncQueue;
