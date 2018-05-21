/**
 * @skillinvocation Manager for the Box Skill Invocations Resource
 */

 'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path'),
errors = require('../util/errors');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/skill_invocations';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Skill Invocation' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function SkillInvocations(client) {
	this.client = client;
}

SkillInvocations.prototype = {

    /**
     * Updates the metadata on the file for the skills invocation.
     * @param {string} invocationID The ID of the skill invocation to update
     * @param {Object} updates The params to update
     * @param {Function} callback Passed the skill invocation object if successful  
     * @returns {Promise<Object>} Promise resolving to the skill invocation object. 
     */
    setStatus(invocationID, updates, callback) {

        var apiPath = urlPath(BASE_PATH, invocationID),
            params = {
                body: updates
            };
        return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback)
    }
};

module.exports = SkillInvocations;
