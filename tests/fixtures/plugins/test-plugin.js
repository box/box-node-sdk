/**
 * @fileoverview A Test Plugin
 * @author jtan
 */

'use strict';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

var TEST_PATH = '/someweirdpath';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

module.exports = function TestPlugin(client, options) {
	var apiRoot = options.apiRoot,
		uploadApiRoot = options.uploadApiRoot;

	return {
		get: function(callback) {
			client.get(apiRoot + TEST_PATH, null, callback);
		},
		upload: function(formData, callback) {
			client.upload(uploadApiRoot + TEST_PATH, null, formData, callback);
		}
	};
};
