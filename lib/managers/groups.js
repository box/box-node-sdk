/**
 * @fileoverview Manager for the Groups Resource
 * @author ptoth
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/groups';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Groups' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Groups(client) {
	this.client = client;
}

/**
 * Used to create a group.
 *
 * API Endpoint: '/groups'
 * Method: POST
 *
 * @param {string} name - The name of the new group to be created
 * @param {?Object} options - Additional parameters
 * @param {string} [options.provenance] - Typically used to track the external source where the group is coming from. Retrieved through the fields parameter.
 * @param {string} [options.external_sync_identifier] - Typically used as a group identifier for groups coming from an external source. Retrieved through the fields parameter.
 * @param {string} [options.description] - Description of the group. Retrieved through the fields parameter.
 * @param {string} [options.invitability_level] - Specifies who can invite this group to folders. Retrieved through the fields parameter.
 * @param {string} [options.member_viewability_level] - Specifies who can view the members of this group. Retrieved through the fields parameter.
 * @param {Function} callback - Passed the new group information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Groups.prototype.create = function(name, options, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			body: options || {}
		};

	params.body.name = name;

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};


module.exports = Groups;
