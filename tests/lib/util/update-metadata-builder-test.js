/**
 * @fileoverview Tests for UpdateMetadataBuilder
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	UpdateMetadataBuilder = require('../../../lib/util/update-metadata-builder');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('UpdateMetadataBuilder', function() {

	var builder;

	beforeEach(function() {
		builder = new UpdateMetadataBuilder();
	});

	describe('constructor', function() {

		it('should create empty body', function() {
			var body = builder.getRequestBody();
			assert.equal(body.length, 0);
		});
	});

	describe('insertPath()', function() {
		it('should throw when op is null', function() {
			assert.throws(function() {
				builder.insertPath(null, '/test', '10');
			});
		});

		it('should throw when op is empty', function() {
			assert.throws(function() {
				builder.insertPath('', '/test', '10');
			});
		});

		it('should throw when op is not a string', function() {
			assert.throws(function() {
				builder.insertPath('', '/test', '10');
			});
		});

		it('should throw when path is null', function() {
			assert.throws(function() {
				builder.insertPath('add', null, '10');
			});
		});

		it('should throw when path is empty', function() {
			assert.throws(function() {
				builder.insertPath('add', '', '10');
			});
		});

		it('should throw when path is not a string', function() {
			assert.throws(function() {
				builder.insertPath('add', 10, '10');
			});
		});

		it('should throw when value is undefined', function() {
			assert.throws(function() {
				builder.insertPath('add', 10);
			});
		});
	});

	describe('insertFrom()', function() {
		it('should throw when op is null', function() {
			assert.throws(function() {
				builder.insertFrom(null, '/test', '10');
			});
		});

		it('should throw when op is empty', function() {
			assert.throws(function() {
				builder.insertFrom('', '/test', '10');
			});
		});

		it('should throw when op is not a string', function() {
			assert.throws(function() {
				builder.insertFrom('', '/test', '10');
			});
		});

		it('should throw when path is null', function() {
			assert.throws(function() {
				builder.insertFrom('add', null, '10');
			});
		});

		it('should throw when path is empty', function() {
			assert.throws(function() {
				builder.insertFrom('add', '', '10');
			});
		});

		it('should throw when path is not a string', function() {
			assert.throws(function() {
				builder.insertFrom('add', 10, '10');
			});
		});

		it('should throw when value is undefined', function() {
			assert.throws(function() {
				builder.insertFrom('add', 10);
			});
		});
	});

	describe('remove()', function() {
		it('should throw when path is null', function() {
			assert.throws(function() {
				builder.insertRemove(null);
			});
		});

		it('should throw when path is empty', function() {
			assert.throws(function() {
				builder.insertRemove('');
			});
		});

		it('should throw when path is not a string', function() {
			assert.throws(function() {
				builder.insertRemove(10);
			});
		});
	});

	describe('methods()', function() {
		it('should insert methods generates the request body', function() {
			builder.insertAdd('/currentState', 'reviewed');
			builder.insertReplace('/author', 'karthik');
			builder.insertRemove('/author');
			builder.insertTest('/currentState', 'test');
			builder.insertMove('/author', 'Yazhini');
			builder.insertCopy('/author', 'Sudha');

			var result = builder.getRequestBody();
			assert.equal(result.length, 6);
		});
	});
});
