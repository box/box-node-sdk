/**
 * @fileoverview Manager for the Box Skill Resource
 */

 'use strict';
// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Skill Invocation parameter constant
 * @typedef {string} SkillInvocationStatus Determines the status of the skill invocations
 */

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
 * Simple manager for interacting with all 'Skill' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Skills(client) {
	this.client = client;
}

Skills.prototype = {

    /**
     * Enum value for the status of the Skill Invocation. Set to: 
     * triggered to indicate that the skill is triggered to start applying skill on the file
     * processing to indicate that the skill is currently processing
     * success to indicate that the skill has completed processing and succeeded
     * transient_failure to indicate that the skill has encountered a failure which can be retried
     * permanent_failure to indicate that the skill encountered a permanent failure and rety would not help
     * 
     * @readonly
     * @enum {SkillInvocationStatus}
     */
    status = {
        TRIGGERED: 'triggered',
        PROCESSING: 'processing',
        SUCCESS: 'success',
        TRANSIENT_FAILURE: 'transient_failure',
        PERMANENT_FAILURE: 'permanent_failure'
    },

    /**
     * Updates the metadata on the file for the skills invocation.
     * 
     * API Endpoint: '/skill_invocations'
     * Method: PUT
     * 
     * @param {string} invocationID The ID of the skill invocation to update
     * @param {Object} [options] Optional parameters
     * @param {Object} [options.data] The response that will be stored in metadata including error
     * @param {Object} [options.error] The error object returned in a failure state
     * @param {String} [options.error.code] The error code in case of a failure state
     * @param {String} [options.error.message] Additional info that might be useful either for skill developer or admin
     * @param {Object} [options.usage] The usage object 
     * @param {string} [options.usage.unit] Unit of measurement used to track usage
     * @param {string} [options.usage.value] The usage value
     * @param {Function} callback Passed the skill invocation object if successful  
     * @returns {Promise<Object>} Promise resolving to the skill invocation object. 
     */
    setStatus(invocationID, invocationStatus, options, callback) {

        var apiPath = urlPath(BASE_PATH, invocationID),
            params = {
                body: {
                    status: invocationStatus,
                    data: options.data,
                    error: {
                        code: options.error.code,
                        message: options.error.message
                    }, 
                    usage: {
                        unit: options.usage.unit,
                        value: options.usage.value
                    }
                }
            };
        return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback)
    }
};

module.exports = Skills;
