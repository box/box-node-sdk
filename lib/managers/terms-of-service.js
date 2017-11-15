/**
 * @fileoverview Manager for the  Box Terms of Service Resource
 */

'use strict';
// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Terms of service parameter constant
 * @typedef {string} TermsOfServicesStatus Determines whether the terms of service created is currently enabled or disabled
 * @typedef {string} TermsOfServicesType Determines whether the terms of service is for internal users or users outside of the enterprise
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var urlPath = require('../util/url-path'),
	/* eslint-disable no-unused-vars*/
	Promise = require('bluebird'),
	/* eslint-enable no-unused-vars*/
	errors = require('../util/errors'),
	httpStatusCodes = require('http-status');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all terms of service endpoints
var BASE_PATH = '/terms_of_services',
	USER_STATUSES_PATH = '/terms_of_service_user_statuses';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Terms of Services' and 'Terms of Service User Statuses' endpoints and actions.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
function TermsOfService(client) {
	// Attach the client, for making API calls
	this.client = client;
}

/**
 * Enum value of scope of the custom terms of services set to either managed by an enterprise or enternal to an enterprise
 *
 * @readonly
 * @enum {TermsOfServicesType}
 */
TermsOfService.prototype.type = {
	MANAGED: 'managed',
	EXTERNAL: 'external'
};

/**
 * Enum value of status of the custom terms of services, either currently enabled or currently disabled
 *
 * @readonly
 * @enum {TermsOfServicesStatus}
 */
TermsOfService.prototype.status = {
	ENABLED: 'enabled',
	DISABLED: 'disabled'
};

/**
 * Creates a custom terms of services with user specified values
 *
 * API Endpoint: '/terms_of_services'
 * Method: POST
 *
 * @param {TermsOfServicesType} termsOfServicesType - Determine if the custom terms of service is scoped internall or externally to an enterprise
 * @param {TermsOfServicesStatus} termsOfServicesStatus - Determine if the custom terms of service is enabled or disabled
 * @param {string} termsOfServicesText - Text field for message associated with custom terms of services
 * @param {Function} [callback] - Passed the terms of services information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.create = function(termsOfServicesType, termsOfServicesStatus, termsOfServicesText, callback) {
	var params = {
		body: {
			status: termsOfServicesStatus,
			tos_type: termsOfServicesType,
			text: termsOfServicesText
		}
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Updates a custom terms of services with new specified values
 *
 * API Endpoint: '/terms_of_services/:termsOfServicesID'
 * Method: PUT
 *
 * @param {string} termsOfServicesID - The id of the custom terms of services to update
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {TermsOfServicesStatus} [options.status] - Determine if the custom terms of service is scoped internall or externally to an enterprise
 * @param {string} [options.text] - Text field for message associated with custom terms of services
 * @param {Function} [callback] - Passed the terms of services updated information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.update = function(termsOfServicesID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, termsOfServicesID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Gets a specific custom terms of services with specified ID
 *
 * API Endpoint: '/terms_of_services/:termsOfServicesID'
 * Method: GET
 *
 * @param {string} termsOfServicesID - The id of the custom terms of services to retrieve
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.fields] - Comma-separated list of fields to return on the collaboration objects
 * @param {Function} [callback] - Passed the terms of services information with specified ID if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.get = function(termsOfServicesID, options, callback) {
	var params = {
		qs: options
	};

	var apiPath = urlPath(BASE_PATH, termsOfServicesID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Gets custom terms of services for the user's enterprise
 *
 * API Endpoint: '/terms_of_services'
 * Method: GET
 *
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {TermsOfServiceType} [options.tos_type] - Optional, indicates whether the terms of service is set for external or managed under enterprise
 * @param {string} [options.fields] - Comma-separated list of fields to return on the collaboration objects
 * @param {Function} [callback] - Passed the terms of services information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.getAll = function(options, callback) {
	var params = {
		qs: options
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Accepts/rejects custom terms of services for the user
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: POST
 *
 * @param {string} termsOfServicesID - Terms of services ID to retrieve user statuses on
 * @param {bool} isAccepted - Determines wehether the terms of services has been accepted or rejected
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.user_id] - Optional, user id to retrieve terms of service status on, default is current user
 * @param {Function} [callback] - Passed the terms of service user status information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of service user status
 */
TermsOfService.prototype.createUserStatus = function(termsOfServicesID, isAccepted, options, callback) {
	var params = {
		body: {
			tos: {
				id: termsOfServicesID,
				type: 'terms_of_service'
			},
			is_accepted: isAccepted
		}
	};

	if (options && options.user_id) {
		params.body.user = {id: options.user_id, type: 'user'};
	}

	var apiPath = urlPath(USER_STATUSES_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Gets a terms os service status given the terms of services id
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: GET
 *
 * @param {string} termsOfServicesID - The ID of the terms of services to retrieve status on
 * @param {Object} [options] - Additional options. Can be left null in most cases
 * @param {string} [options.user_id] - Optional, the id of the user to retrieve status of custom terms and service on
 * @param {Function} [callback] - Passed the terms of service user status information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of service user status
 */
TermsOfService.prototype.getUserStatus = function(termsOfServicesID, options, callback) {
	var params = {
		qs: {
			tos_id: termsOfServicesID
		}
	};

	if (options) {
		Object.assign(params.qs, options);
	}

	var apiPath = urlPath(USER_STATUSES_PATH);
	return this.client.get(apiPath, params)
		.then(response => {
			if (response.statusCode !== 200) {
				throw errors.buildUnexpectedResponseError(response);
			}
			return response.body.entries[0];
		})
		.asCallback(callback);
};

/**
 * Accepts/rejects custom terms of services for the user
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: PUT
 *
 * @param {string} termsOfServiceUserStatusID - Terms of service user status object ID
 * @param {bool} isAccepted - Determines wehether the terms of services has been accepted or rejected
 * @param {Function} [callback] - Passed the terms of service user status updated information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated terms of service user status
 */
TermsOfService.prototype.updateUserStatus = function(termsOfServiceUserStatusID, isAccepted, callback) {
	var params = {
		body: {
			is_accepted: isAccepted
		}
	};

	var apiPath = urlPath(USER_STATUSES_PATH, termsOfServiceUserStatusID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Creates a user status for terms of service, if already exists then update existing user status for terms of service
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: POST/PUT
 *
 * @param {string} termsOfServicesID - Terms of services ID to retrieve user statuses on
 * @param {bool} isAccepted - Determines wehether the terms of services has been accepted or rejected
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.user_id] - Optional, user id to retrieve terms of service status on, default is current user
 * @param {Function} [callback] - Passed the terms of service user status information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of service user status
 */
TermsOfService.prototype.setUserStatus = function(termsOfServicesID, isAccepted, options, callback) {
	var params = {
		body: {
			tos: {
				id: termsOfServicesID,
				type: 'terms_of_service'
			},
			is_accepted: isAccepted
		}
	};

	if (options && options.user_id) {
		params.body.user = {id: options.user_id, type: 'user'};
	}

	var apiPath = urlPath(USER_STATUSES_PATH);

	return this.client.post(apiPath, params)
		.then(response => {
			switch (response.statusCode) {

			// 200 - A user status has been successfully created on terms of service
			// return the terms of service user status object
			case httpStatusCodes.OK:
				return response.body;

				// 409 - Conflict
				// Terms of Service already exists. Update the existing terms of service object
			case httpStatusCodes.CONFLICT:
				var getOptions = Object.assign({fields: 'id'}, options);
				return this.getUserStatus(termsOfServicesID, getOptions)
					.then(userStatus => this.updateUserStatus(userStatus.id, isAccepted));

			default:
				throw errors.buildUnexpectedResponseError(response);
			}
		})
		.asCallback(callback);
};

/**
 * @module box-node-sdk/lib/managers/terms-of-service
 * @see {@Link TermsOfService}
 */
module.exports = TermsOfService;

