/**
 * @fileoverview Tests for Config
 * @author mwiller
 */

/* eslint no-new: 0 */
/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	Config = require('../../../lib/util/config');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Config', function() {

	describe('constructor', function() {

		it('should throw when client ID is not passed', function() {

			assert.throws(function() {
				new Config({
					clientID: null
				});
			});
		});

		it('should throw when client secret is not passed', function() {

			assert.throws(function() {
				new Config({
					clientID: 'id',
					clientSecret: null
				});
			});
		});

		it('should throw when passed params would override instance method', function() {

			assert.throws(function() {
				new Config({
					clientID: 'id',
					clientSecret: 'secret',
					extend: 'WTF'
				});
			});
		});

		it('should populate default options when called', function() {

			var config = new Config({
				clientID: 'id',
				clientSecret: 'secret'
			});

			assert.propertyVal(config, 'apiVersion', '2.0');
			assert.deepPropertyVal(config, 'request.json', true);
			assert.deepPropertyVal(config, 'request.followRedirect', false);
		});

		it('should override default options when passed override values', function() {

			var config = new Config({
				clientID: 'id',
				clientSecret: 'secret',
				apiVersion: '2.1'
			});

			assert.propertyVal(config, 'apiVersion', '2.1');
		});

		it('should override nested config params when called', function() {

			var config = new Config({
				clientID: 'id',
				clientSecret: 'secret',
				request: {
					strictSSL: false
				}
			});

			assert.deepPropertyVal(config, 'request.strictSSL', false);
		});

		it('should create an immutable object when called', function() {

			var config = new Config({
				clientID: 'id',
				clientSecret: 'secret',
				apiVersion: '2.1'
			});

			assert.throws(function() {
				config.apiVersion = '3.0';
			});
		});
	});

	describe('extend()', function() {

		var config;

		beforeEach(function() {
			config = new Config({
				clientID: 'id',
				clientSecret: 'secret'
			});
		});

		it('should produce a new config object', function() {

			var config2 = config.extend({});
			assert.notStrictEqual(config, config2, 'Should not be the same object');
		});

		it('should override old values when called with new ones', function() {

			var config2 = config.extend({
				clientID: 'newID'
			});
			assert.propertyVal(config2, 'clientID', 'newID');
		});

		it('should not modify original config', function() {

			var originalConfig = new Config({
				clientID: 'id',
				clientSecret: 'secret',
				request: {
					strictSSL: true
				}
			});

			var newConfig = originalConfig.extend({
				request: {
					qs: {
						fields: 'id,name,type'
					}
				}
			});

			assert.deepPropertyVal(newConfig, 'request.qs.fields', 'id,name,type');
			assert.notDeepProperty(originalConfig, 'request.qs');
		});

	});

});
