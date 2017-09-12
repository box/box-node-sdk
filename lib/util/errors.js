/**
 * @fileoverview Errors Helper
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var util = require('util'),
	httpStatusCodes = require('http-status');


// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * An generic error propagated when the response has caused an error.
 * @typedef {Error} Errors~ResponseError
 * @property {APIRequest~ResponseObject} response The response object that generated the error
 * @property {int} statusCode A shortcut to the status code of the response
 */

/**
 * Error propagated whenever the SDK is unable to successfully complete an action
 * due to an expired access token (and refresh token, if one was provided).
 * @typedef {Errors~ResponseError} Errors~ExpiredAuthError
 * @property {bool} authExpired - always true
 */


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A Helper for building errors across the SDK. Makes sure that easily-forgotten
 * fields aren't missed, and that everything is formatted properly to return to the
 * consumer.
 *
 * @name Errors
 * @module box-node-sdk/lib/util/errors
 */
module.exports = {

	/**
	 * Build a response error with the given message, and attaching meta data from the
	 * response data.
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @param {string} message - the response error message
	 * @returns {Errors~ResponseError} an error describing the response error
	 */
	buildResponseError: function(response, message) {
		response = response || {};
		var responseError = new Error(message);
		responseError.statusCode = response.statusCode;
		responseError.response = response;
		return responseError;
	},

	/**
	 * Build an "Expired Auth" error. {@see Errors~ExpiredAuthError}
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @returns {Errors~ExpiredAuthError} A properly formatted error explaining the user auth info has expired
	 */
	buildExpiredAuthError: function(response) {
		var responseError = this.buildResponseError(response, 'Expired Auth: Auth code or refresh token has expired.');
		responseError.authExpired = true;
		return responseError;
	},

	/**
	 * Build the error for an "Unexpected Response" from the API. This is a shortcut for
	 * responseError built specifically for the 401 UNEXPECTED response case. It
	 * should be called and the error should be propogated to the consumer
	 * whenever an unexpected response was recieved from the API.
	 *
	 * @param {?APIRequest~ResponseObject} response - The response returned by an APIRequestManager request
	 * @returns {Errors~ResponseError} an error describing the response error
	 */
	buildUnexpectedResponseError: function(response) {
		response = response || {};
		var responseErrorMessage = '';

		if (response.body && (response.body.code || response.body.message)) {
			responseErrorMessage = util.format(' (%s: "%s")', response.body.code, response.body.message);
		}

		var statusCode = response.statusCode,
			unexpectedErrorMessage = util.format('Unexpected API Response [%d %s]%s', statusCode, httpStatusCodes[statusCode], responseErrorMessage);
		return this.buildResponseError(response, unexpectedErrorMessage.trim());
	},

	/**
	 * Unwrap a Bluebird error and throw it, or just re-throw if the error
	 * is not a Bluebird error.  This is necessary to preserve errors when
	 * a function is promisified.
	 * @param {Error} error The error to unwrap
	 * @returns {void}
	 * @throws {Error} The unwrapped error
	 */
	unwrapAndThrow: function(error) {

		if (error.cause) {
			throw error.cause;
		}

		throw error;
	}

};
