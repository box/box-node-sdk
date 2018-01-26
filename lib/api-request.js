/**
 * @fileoverview A Box API Request
 */

// @NOTE(fschott) 08/05/2014: THIS FILE SHOULD NOT BE ACCESSED DIRECTLY OUTSIDE OF API-REQUEST-MANAGER
// This module is used by APIRequestManager to make requests. If you'd like to make requests to the
// Box API, consider using APIRequestManager instead. {@Link APIRequestManager}

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var assert = require('assert'),
	EventEmitter = require('events').EventEmitter,
	Config = require('./util/config'),
	Request = require('./util/request'),
	Response = require('./util/response'),
	axios = require('axios'),
	httpStatusCodes = require('http-status');

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * The API response object includes information about the request made and its response. The information attached is a subset
 * of the information returned by the request module, which is too large and complex to be safely handled (contains circular
 * references, errors on serialization, etc.)
 * @NOTE(fschott) 08-19-2014: We cannot return the request/response objects directly because they contain loads of extra
 *  information, unnecessary bloat, circular dependencies, and cause an infinite loop when stringifying.
 *
 * @typedef {Object} APIRequest~ResponseObject
 * @property {APIRequest~RequestObject} request Information about the request that generated this response
 * @property {int} statusCode The response HTTP status code
 * @property {Object} headers A collection of response headers
 * @property {Object|Buffer|string} [body] The response body. Encoded to JSON by default, but can be a buffer
 *  (if encoding fails or if json encoding is disabled) or a string (if string encoding is enabled). Will be undefined
 *  if no response body is sent.
 */

/**
 * The API request object includes information about the request made. The information attached is a subset of the information
 * of a request module instance, which is too large and complex to be safely handled (contains circular references, errors on
 * serialization, etc.).
 * @NOTE(fschott) 08-19-2014: We cannot return the request/response objects directly because they contain loads of extra
 *  information, unnecessary bloat, circular dependencies, and cause an infinite loop when stringifying.
 *
 * @typedef {Object} APIRequest~RequestObject
 * @property {Object} uri Information about the request, including host, path, and the full 'href' url
 * @property {string} method The request method (GET, POST, etc.)
 * @property {Object} headers A collection of headers sent with the request
 */

/**
 * The error returned by APIRequest callbacks, which includes any relevent, available information about the request
 * and response. Note that these properties do not exist on stream errors, only errors retuned to the callback.
 *
 * @typedef {Error} APIRequest~Error
 * @property {APIRequest~RequestObject} request Information about the request that generated this error
 * @property {APIRequest~ResponseObject} [response] Information about the response related to this error, if available
 * @property {int} [statusCode] The response HTTP status code
 * @property {boolean} [maxRetriesExceeded] True iff the max number of retries were exceeded. Otherwise, undefined.
 */

/**
 * Callback invoked when an APIRequest request is complete and finalized. On success,
 * propagates the relevent response information. An err will indicate an unresolvable issue
 * with the request (permanent failure or temp error response from the server, retried too many times).
 *
 * @callback APIRequest~Callback
 * @param {?APIRequest~Error} err If Error object, API request did not get back the data it was supposed to. This
 *  could be either because of a temporary error, or a more serious error connecting to the API.
 * @param {APIRequest~ResponseObject} response The response returned by an APIRequestManager request
 */


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Message to replace removed headers with in the request
var REMOVED_HEADER_MESSAGE = '[REMOVED BY SDK]';

// Range of SERVER ERROR http status codes
var HTTP_STATUS_CODE_SERVER_ERROR_BLOCK_RANGE = [
	500,
	599
];


// A map of HTTP status codes and whether or not they can be retried
var retryableStatusCodes = {
	[httpStatusCodes.REQUEST_TIMEOUT]: true,
	[httpStatusCodes.TOO_MANY_REQUESTS]: true
};

/**
 * Returns true if the response info indicates a temporary/transient error.
 *
 * @param {?APIRequest~ResponseObject} response The response info from an API request,
 * or undefined if the API request did not return any response info.
 * @returns {boolean} True if the API call error is temporary (and hence can
 * be retried). False otherwise.
 * @private
 */
function isTemporaryError(response) {
	var statusCode = response.status;

	// An API error is a temporary/transient if it returns a 5xx HTTP Status, with the exception of the 507 status.
	// The API returns a 507 error when the user has run out of account space, in which case, it should be treated
	// as a permanent, non-retryable error.
	if (statusCode !== httpStatusCodes.INSUFFICIENT_STORAGE
		&& statusCode >= HTTP_STATUS_CODE_SERVER_ERROR_BLOCK_RANGE[0]
		&& statusCode <= HTTP_STATUS_CODE_SERVER_ERROR_BLOCK_RANGE[1]) {
		return true;
	}

	// An API error is a temporary/transient error if it returns a HTTP Status that indicates it is a temporary,
	if (retryableStatusCodes[statusCode]) {
		return true;
	}

	return false;
}

/**
 * Determine whether a given request can be retried, based on its options
 * @param {Object} options The request options
 * @returns {boolean} Whether or not the request is retryable
 * @private
 */
function isRequestRetryable(options) {
	return !options.formData;
}

/**
 * Clean sensitive headers from the request object. This prevents this data from
 * propagating out to the SDK and getting unintentionally logged via the error or
 * response objects. Note that this function modifies the given object and returns
 * nothing.
 *
 * @param {APIRequest~RequestObject} requestObj Any request object
 * @returns {void}
 * @private
 */
function cleanSensitiveHeaders(requestObj) {
	if (requestObj.headers) {
		if (requestObj.headers.BoxApi) {
			requestObj.headers.BoxApi = REMOVED_HEADER_MESSAGE;
		}
		if (requestObj.headers.Authorization) {
			requestObj.headers.Authorization = REMOVED_HEADER_MESSAGE;
		}
	}
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * APIRequest helps to prepare and execute requests to the Box API. It supports
 * retries, multipart uploads, and more.
 *
 * @param {Object} requestParams Request parameters
 * @param {Config} config Request-specific Config object
 * @param {EventEmitter} eventBus Event bus for the SDK instance
 * @constructor
 */
function APIRequest(requestParams, config, eventBus) {
	assert(config instanceof Config, 'Config must be passed to APIRequest constructor');
	assert(eventBus instanceof EventEmitter, 'Valid event bus must be passed to APIRequest constructor');
	this.config = config;
	this.eventBus = eventBus;
	this.requestParams = requestParams;
	this.isRetryable = isRequestRetryable(config.request);
}

/**
 * Executes the request with the given options. If a callback is provided, we'll
 * handle the response via callbacks. Otherwise, the response will be streamed to
 * via the stream property. You can access this stream with the getResponseStream()
 * method.
 *
 * @returns {void}
 */
APIRequest.prototype.execute = function() {
	// this._callback = callback || this._callback;

	// // Initiate an async- or stream-based request, based on the presence of the callback.
	// if (this._callback) {
	// 	this.request = request(this.config.request, this._handleResponse.bind(this));
	// } else {
	// 	this.request = request(this.config.request);
	// 	this.stream = this.request;
	// 	this.stream.on('error', err => this.eventBus.emit('response', err));
	// 	this.stream.on('response', response => this.eventBus.emit('response', null, response));
	// }

	// @TODO(mwiller) 2018-01-24: Handle the streaming case
	this.request = new Request(this.requestParams.method, this.requestParams.url, this.requestParams);
	return axios(this.requestParams)
		.then(response => this._handleResponse(null, response))
		.catch(err => this._handleResponse(err));
};

/**
 * Return the response read stream for a request. This will be undefined until
 * a stream-based request has been started.
 *
 * @returns {?ReadableStream} The response stream
 */
APIRequest.prototype.getResponseStream = function() {
	return this.stream;
};

/**
 * Handle an error making the request, which indicates one of the following cases:
 * 1) The request was made and the server responded with a status code not 2xx
 * 2) The request was made but no response was received (e.g. a network error)
 * 3) Something happened in setting up the request that triggered an Error
 * @param {Error} error The error from axios
 * @returns {Promise} A promise
 */
// APIRequest.prototype._handleError = function(error) {

// 	// Create a fresh error object to avoid handing back raw axios errors
// 	var sdkError;

// 	// Clean sensitive headers here to prevent the user from accidentily using/logging them in prod
// 	cleanSensitiveHeaders(this.request);

// 	// SCENARIO 1: API returned an error status code
// 	if (error.response) {

// 		if (isTemporaryError(error.response)) {
// 			return this._retry(error);
// 		}

// 		// Any non-retryable status should be passed up to the higher level of the SDK for handling
// 		return error.response;
// 	} else if ()
// };

/**
 * Handle the request response in the callback case.
 *
 * @param {?Error} err An error, if one occurred
 * @param {Object} [response] The full response object, returned by the request module.
 *  Contains information about the request & response, including the response body itself.
 * @returns {void}
 * @private
 */
// @TODO(mwiller) 2018-01-24: Split this into two functions to handle success and error (see above)
APIRequest.prototype._handleResponse = function(err, response) {

	// This error should not be retried — something went very wrong with the request
	if (err && !err.request) {
		throw err;
	}

	// Clean sensitive headers here to prevent the user from accidentily using/logging them in prod
	cleanSensitiveHeaders(this.request);

	// If the API connected successfully but responded with a temporary error (like a 5xx code,
	// a rate limited response, etc.) then this is considered an error as well.
	if (!err && isTemporaryError(response)) {
		var errorMessage = `${response.status} - ${response.statusText}`;
		err = new Error(errorMessage);
	}

	if (err) {

		// Attach request & response information to the error object
		err.request = this.request;
		if (response) {
			err.response = new Response(response);
			err.statusCode = response.status;
		}

		// Have the SDK emit the error response
		this.eventBus.emit('response', err);

		// If our APIRequest instance is retryable, attempt a retry. Otherwise, finish and propagate the error.
		if (!this.isRetryable) {
			throw err;
		}

		return this._retry(err);
	}

	var sdkResponse = new Response(response);

	// If the request was successful, emit & propagate the response!
	this.eventBus.emit('response', null, sdkResponse);
	return sdkResponse;
};

/**
 * Attempt a retry. If the request hasn't exceeded it's maximum number of retries,
 * re-execute the request (after the retry interval). Otherwise, propagate a new error.
 *
 * @param {?Error} err An error, if one occurred
 * @returns {Promise} A promise resolving with the retry
 * @private
 */
APIRequest.prototype._retry = function(err) {
	this.numRetries = this.numRetries || 0;

	if (this.numRetries >= this.config.numMaxRetries) {
		err.maxRetriesExceeded = true;
		throw err;
	}

	this.numRetries += 1;
	// eslint-disable-next-line promise/avoid-new
	return (new Promise(resolve => setTimeout(resolve, this.config.retryIntervalMS)))
		.then(() => this.execute());
};

/**
 * @module box-node-sdk/lib/api-request
 * @see {@Link APIRequest}
 */
module.exports = APIRequest;
