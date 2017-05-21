/**
 * @fileoverview Iterator for paged responses
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * The iterator response object
 * @typedef {Object} IteratorData
 * @property {Array} [value] - The next set of values from the iterator
 * @property {boolean} done - Whether the iterator is completed
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var querystring = require('querystring'),
	Promise = require('bluebird'),
	PromiseQueue = require('promise-queue'),
	errors = require('./errors');

PromiseQueue.configure(Promise);

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const PAGING_MODES = Object.freeze({
	MARKER: 'marker',
	OFFSET: 'offset'
});

const SYMBOL = Symbol('boxAsyncIterator');

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Asynchronous iterator for paged collections
 */
class PagingIterator {

	/**
	 * Determine if a response is iterable
	 * @param {Object} response - The API response
	 * @returns {boolean} Whether the response is iterable
	 */
	static isIterable(response) {
		return Boolean(response.request && response.request.method === 'GET' && Array.isArray(response.body.entries));
	}

	/**
	 * @constructor
	 * @param {Object} response - The original API response
	 * @param {BoxClient} client - An API client to make further requests
	 * @returns {void}
	 * @throws {Error} Will throw when collection cannot be paged
	 */
	constructor(response, client) {

		if (!PagingIterator.isIterable(response)) {
			throw new Error('Cannot create paging iterator for non-paged response!');
		}


		var data = response.body;

		if (Number.isSafeInteger(data.offset)) {
			this.nextField = PAGING_MODES.OFFSET;
			this.nextValue = data.offset;
		} else if (typeof data.next_marker === 'undefined') {
			// Default to a finished marker collection when there's no field present,
			// since some endpoints indicate completed paging this way
			this.nextField = PAGING_MODES.MARKER;
			this.nextValue = null;
		} else {
			this.nextField = PAGING_MODES.MARKER;
			this.nextValue = data.next_marker;
		}

		this.limit = data.limit || data.entries.length;
		this.done = false;

		var href = response.request.href.split('?')[0];
		this.options = {
			headers: response.request.headers,
			qs: querystring.parse(response.request.uri.query)
		};

		// querystring.parse() makes everything a string, ensure numeric params are the correct type
		if (this.options.qs.limit) {
			this.options.qs.limit = parseInt(this.options.qs.limit, 10);
		}
		if (this.options.qs.offset) {
			this.options.qs.offset = parseInt(this.options.qs.offset, 10);
		}

		delete this.options.headers.Authorization;
		this.fetch = client.get.bind(client, href);
		this.buffer = response.body.entries;
		this.queue = new PromiseQueue(1, Infinity);
		this._updatePaging(response);
	}

	/**
	 * Update the paging parameters for the iterator
	 * @private
	 * @param {Object} response - The latest API response
	 * @returns {void}
	 */
	_updatePaging(response) {

		var data = response.body;

		if (this.nextField === PAGING_MODES.OFFSET) {

			this.nextValue += this.limit;

			if (Number.isSafeInteger(data.total_count)) {
				this.done = data.offset + this.limit >= data.total_count;
			} else {
				this.done = data.entries.length === 0;
			}
		} else if (this.nextField === PAGING_MODES.MARKER) {

			if (data.next_marker) {
				this.nextValue = data.next_marker;
			} else {
				this.nextValue = null;
				this.done = true;
			}
		}

		this.options.qs[this.nextField] = this.nextValue;
	}

	/**
	 * Fetch the next page of results
	 * @returns {Promise} Promise resolving to iterator state
	 */
	_getData() {

		return this.fetch(this.options)
			.then(response => {

				if (response.statusCode !== 200) {
					throw errors.buildUnexpectedResponseError(response);
				}

				this._updatePaging(response);

				this.buffer = this.buffer.concat(response.body.entries);

				if (this.buffer.length === 0) {

					if (this.done) {

						return {
							value: undefined,
							done: true
						};
					}

					// If we didn't get any data in this page, but the paging
					// parameters indicate that there is more data, attempt
					// to fetch more.  This occurs in multiple places in the API
					return this._getData();
				}


				return {
					value: this.buffer.shift(),
					done: false
				};
			});
	}

	/**
	 * Fetch the next page of the collection
	 * @returns {Promise} Promise resolving to iterator state
	 */
	next() {

		if (this.buffer.length > 0) {

			return Promise.resolve({
				value: this.buffer.shift(),
				done: false
			});
		}

		if (this.done) {

			return Promise.resolve({
				value: undefined,
				done: true
			});
		}

		return this.queue.add(this._getData.bind(this));
	}

	/**
	 * The iterator object itself should be iterable to work in for-await-of loops
	 * When the well-known symbol isn't available, use an SDK-specific one to avoid
	 * attaching this method as PagingIterator#undefined()
	 *
	 * @returns {PagingIterator} This iterator
	 */
	get [Symbol.asyncIterator || SYMBOL]() {
		return () => this;
	}

	/**
	 * Run a function against every element in the iterable collection
	 * @param {Function} fn  The function to be run on each item
	 * @returns {Promise<void>} A Promise resolving when all items have been processed
	 */
	forEach(fn) {

		var self = this;

		/**
		 * Loop function for iterating over all items in the iterator
		 * @returns {void}
		 */
		function loop() {


			return self.next().then(result => {

				if (result.done) {
					return Promise.resolve();
				}

				fn(result.value);

				return loop();
			});
		}

		return loop();
	}

	/**
	 * Find the first element in the iterator matching the test condition
	 * @param {Function} test A function returning true if the item matches
	 * @returns {Promise<*>} A promise resolving to the found item, or undefined
	 */
	find(test) {

		var self = this;

		/**
		 * Loop function for iterating over all items in the iterator
		 * @returns {void}
		 */
		function loop() {

			return self.next().then(result => {

				if (result.done) {
					return Promise.resolve();
				}

				if (test(result.value)) {
					return Promise.resolve(result.value);
				}

				return loop();
			});
		}

		return loop();
	}

	/**
	 * Reduces the items in the iterator down to a single value by processing each item
	 * @param {Function} fn The reducer function to call on each item
	 * @param {*} [initialValue] The initial value to start with for the reducer
	 * @returns {Promise<*>} A promise resolving to the final reduced value
	 */
	reduce(fn, initialValue) {

		var self = this;
		var accumulator = initialValue;

		/**
		 * Loop function for iterating over all items in the iterator
		 * @returns {void}
		 */
		function loop() {

			return self.next().then(result => {

				if (result.done) {
					return Promise.resolve(accumulator);
				}

				accumulator = fn(accumulator, result.value);

				return loop();
			});
		}

		return loop();
	}
}

PagingIterator.SYMBOL = SYMBOL;

module.exports = PagingIterator;
