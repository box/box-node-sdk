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
 * @property {bool} done - Whether the iterator is completed
 */

/**
 * Iterator callback
 * @callback IteratorCallback
 * @param {?Error} err - An error if the iterator encountered one
 * @param {IteratorData} [data] - New data from the iterator
 * @returns {void}
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

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

class PagingIterator {

	/**
	 * Determine if a response is iterable
	 * @param {Object} response - The API response
	 * @returns {bool} Whether the response is iterable
	 */
	static isIterable(response) {
		return response.request.method === 'GET' && Array.isArray(response.body.entries);
	}

	/**
	 * Asynchronous iterator for paged collections
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
		} else if (typeof data.next_marker !== 'undefined') {
			this.nextField = PAGING_MODES.MARKER;
			this.nextValue = data.next_marker;
		} else {
			throw new Error('Unable to determine paging strategy for response!');
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
		this.nextChunk = response.body.entries;
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

		return Promise.fromCallback(callback => this.fetch(this.options, (err, response) => {

			if (err) {
				callback(err);
				return;
			}

			if (response.statusCode !== 200) {
				callback(errors.buildUnexpectedResponseError(response));
				return;
			}

			this._updatePaging(response);

			var result = {
				done: this.done,
				value: response.body.entries
			};

			callback(null, result);
		}));
	}

	/**
	 * Fetch the next page of the collection
	 * @returns {Promise} Promise resolving to iterator state
	 */
	next() {

		if (this.nextChunk) {
			var nextChunk = this.nextChunk;
			this.nextChunk = null;
			return Promise.resolve({value: nextChunk, done: this.done});
		}

		if (this.done) {
			return Promise.resolve({done: true});
		}

		return this.queue.add(this._getData.bind(this));
	}
}

module.exports = PagingIterator;
