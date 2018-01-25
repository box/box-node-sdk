'use strict';

/**
 * Class representing the data in a response from the Box API.
 * This is intended to just hold data, no behavior is currently implemented.
 */
class Response {

	/**
	 * @constructor
	 * @param {Object} response The response object from axios
	 */
	constructor(response) {

		this.statusCode = response.status;
		this.headers = response.headers;
		this.body = response.data;
	}
}

module.exports = Response;
