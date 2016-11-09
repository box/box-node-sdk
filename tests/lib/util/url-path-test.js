/**
 * @fileoverview Tests for URL Path Builder
 */

/* global describe, it, before, beforeEach, after, afterEach */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	pathBuilder = require('../../../lib/util/url-path');


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('URLPath', function() {

	it('should properly handle non-string values when called', function() {
		var path = pathBuilder('abc', 123, undefined, null),
			expectedPath = '/abc/123/undefined/null';
		assert.equal(path, expectedPath);
	});

	it('should properly apply trailing and leading slashes when called', function() {
		var path = pathBuilder('/abc/', 'def', 'ghi/', '/jkl', '/mnlop/'),
			expectedPath = '/abc/def/ghi/jkl/mnlop';
		assert.equal(path, expectedPath);
	});

	it('should properly encode paths for URLs when called', function() {
		var path = pathBuilder('/files', '123/download'),
			expectedPath = '/files/123%2Fdownload';
		assert.equal(path, expectedPath);
	});

});
