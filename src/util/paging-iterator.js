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
		// POST responses for uploading a file are explicitly excluded here because, while the response is iterable,
		// it always contains only a single entry and historically has not been handled as iterable in the SDK.
		// This behavior is being preserved here to avoid a breaking change.
		let UPLOAD_PATTERN = /.*upload\.box\.com.*\/content/;
		var isGetOrPostRequest = (response.request && (response.request.method === 'GET' || (response.request.method === 'POST' && !UPLOAD_PATTERN.test(response.request.uri.href)))),
			hasEntries = (response.body && Array.isArray(response.body.entries)),
			notEventStream = (response.body && !response.body.next_stream_position);

		return Boolean(isGetOrPostRequest && hasEntries && notEventStream);
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
		if (response.request.body) {
			if (Object.prototype.toString.call(response.request.body) === '[object Object]') {
				this.options.body = response.request.body;
			} else {
				this.options.body = JSON.parse(response.request.body);
			}
		}

		// querystring.parse() makes everything a string, ensure numeric params are the correct type
		if (this.options.qs.limit) {
			this.options.qs.limit = parseInt(this.options.qs.limit, 10);
		}
		if (this.options.qs.offset) {
			this.options.qs.offset = parseInt(this.options.qs.offset, 10);
		}

		delete this.options.headers.Authorization;
		if (response.request.method === 'GET') {
			this.fetch = client.get.bind(client, href);
		}
		if (response.request.method === 'POST') {
			this.fetch = client.post.bind(client, href);
		}
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
		if (response.request.method === 'GET') {
			this.options.qs[this.nextField] = this.nextValue;
		} else if (response.request.method === 'POST') {
			if (!this.options.body) {
				this.options.body = {};
			}
			this.options.body[this.nextField] = this.nextValue;
			let bodyString = JSON.stringify(this.options.body);
			this.options.headers['content-length'] = bodyString.length;
		}
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
	 * Fetch the next marker
	 * @returns {string|int} String that is the next marker or int that is the next offset
	 */
	getNextMarker() {
		return this.nextValue;
	}
}

module.exports = PagingIterator;
