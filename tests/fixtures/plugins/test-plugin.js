/**
 * @fileoverview A Test Plugin
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
		get(callback) {
			client.get(apiRoot + TEST_PATH, null, callback);
		},
		upload(formData, callback) {
			client.upload(uploadApiRoot + TEST_PATH, null, formData, callback);
		}
	};
};
