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
	Promise = require('bluebird');

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
 * @param {TermsOfServicesType} termsOfServicesType - Determine if the custom terms of service is enabled or disabled
 * @param {TermsOfServicesStatus} termsOfServicesStatus - Determine if the custom terms of service is scoped internall or externally to an enterprise
 * @param {string} termsOfServicesText - Text field for message associated with custom terms of services
 * @param {Function} [callback] - Passed the terms of services information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.createTermsOfServices = function(termsOfServicesType, termsOfServicesStatus, termsOfServicesText, callback) {
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
 * @param {TermsOfServicesStatus} termsOfServicesStatus - Determine if the custom terms of service is scoped internall or externally to an enterprise
 * @param {string} termsOfServicesText - Text field for message associated with custom terms of services
 * @param {Function} [callback] - Passed the terms of services updated information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.updateTermsOfServices = function(termsOfServicesID, termsOfServicesStatus, termsOfServicesText, callback) {
	var params = {
		body: {
			status: termsOfServicesStatus,
			text: termsOfServicesText
		}
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
TermsOfService.prototype.getTermsOfServicesByID = function(termsOfServicesID, options, callback) {
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
 * @param {string} [options.tosType] - Optional, indicates whether the terms of service is set for external or managed under enterprise
 * @param {string} [options.fields] - Comma-separated list of fields to return on the collaboration objects
 * @param {Function} [callback] - Passed the terms of services information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of services object
 */
TermsOfService.prototype.getTermsOfServices = function(options, callback) {
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
 * @param {Object} termsOfServicesID - Terms of services ID to retrieve user statuses on
 * @param {bool} isAccepted - Determines wehether the terms of services has been accepted or rejected
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.termsOfServiceUserID] - Optional, user id to retrieve terms of service status on, default is current user
 * @param {Function} [callback] - Passed the terms of service user status information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of service user status
 */
TermsOfService.prototype.createTermsOfServiceUserStatuses = function(termsOfServicesID, isAccepted, options, callback) {
	var tos = {
		tos_id: termsOfServicesID,
		type: 'terms of service'
	};

	var params = {
		body: {
			tos: tos,
			is_accepted: isAccepted
		}
	};

	if (options) {
		var user = {
			user_id: options.termsOfServiceUserID,
			type: 'user'
		};
		Object.assign(params.body, user);
	}

	var apiPath = urlPath(USER_STATUSES_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Gets custom terms of services given terms of services id and user id
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: GET
 *
 * @param {string} termsOfServicesID - The ID of the terms of services to retrieve status on
 * @param {Object} [options] - Additional options. Can be left null in most cases
 * @param {string} [options.userID] - Optional, the id of the user to retrieve status of custom terms and service on
 * @param {Function} [callback] - Passed the terms of service user status information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the terms of service user status
 */
TermsOfService.prototype.getTermsOfServiceUserStatuses = function(termsOfServicesID, options, callback) {
	var params = {
		qs: {
			tos_id: termsOfServicesID
		}
	};

	if (options) {
		Object.assign(params.qs, options);
	}

	var apiPath = urlPath(USER_STATUSES_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Accepts/rejects custom terms of services for the user
 *
 * API Endpoint: '/terms_of_service_user_statuses'
 * Method: PUT
 *
 * @param {Object} termsOfServiceUserStatusesID - Terms of service user status object ID
 * @param {bool} isAccepted - Determines wehether the terms of services has been accepted or rejected
 * @param {Function} [callback] - Passed the terms of service user status updated information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated terms of service user status
 */
TermsOfService.prototype.updateTermsOfServiceUserStatuses = function(termsOfServiceUserStatusesID, isAccepted, callback) {
	var params = {
		body: {
			is_accepted: isAccepted
		}
	};

	var apiPath = urlPath(USER_STATUSES_PATH, termsOfServiceUserStatusesID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * @module box-node-sdk/lib/managers/terms-of-service
 * @see {@Link TermsOfService}
 */
module.exports = TermsOfService;
