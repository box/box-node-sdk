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
			// Default to a finished marker collection when there's no field present,
			// since some endpoints indicate completed paging this way
			this.nextField = PAGING_MODES.MARKER;
			this.nextValue = null;
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

				if (!this.buffer.length) {

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

		if (this.buffer.length) {

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
}

module.exports = PagingIterator;
