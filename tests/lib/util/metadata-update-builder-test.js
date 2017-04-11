/**
 * @fileoverview Tests for UpdateMetadataBuilder
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var assert = require('chai').assert,
	MetadataUpdateBuilder = require('../../../lib/util/metadata-update-builder');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe.only('MetadataUpdateBuilder', function() {

	var builder;

	beforeEach(function() {
		builder = new MetadataUpdateBuilder();
	});

	describe('constructor', function() {

		it('should create empty body', function() {
			var body = builder.getPatch();
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

		it('should throw when path is not started with /', function() {
			assert.throws(function() {
				builder.insertPath('add', 'path', 10);
			});
		});

		it('should return the path in the patch request body', function() {
			builder.insertPath('add', '/path', 10);
			var result = builder.getPatch();
			assert.equal(result.length, 1);
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

		it('should throw when from is not started with /', function() {
			assert.throws(function() {
				builder.insertFrom('add', 'path', 10);
			});
		});

		it('should return the path in the patch request body', function() {
			builder.insertFrom('add', '/path', 10);
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});
	});

	describe('remove()', function() {
		it('should throw when path is null', function() {
			assert.throws(function() {
				builder.remove(null);
			});
		});

		it('should throw when path is empty', function() {
			assert.throws(function() {
				builder.remove('');
			});
		});

		it('should throw when path is not a string', function() {
			assert.throws(function() {
				builder.remove(10);
			});
		});

		it('should throw when path is not started with /', function() {
			assert.throws(function() {
				builder.remove('path');
			});
		});

		it('should return the path in the patch request body', function() {
			builder.remove('/path');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should return the path in the patch request body', function() {
			builder.remove('/path1');
			builder.remove('/path2');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});
	});

	describe('add()', function() {
		it('should add one method in patch request body', function() {
			builder.add('/currentState', 'reviewed');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should add multile methods in patch request body', function() {
			builder.add('/currentState', 'reviewed');
			builder.add('/author', 'box');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});

		it('should throws when key is invalid', function() {
			assert.throws(function() {
				builder.add('path', 'value');
			});
		});

		it('should throw when value is not specified', function() {
			assert.throws(function() {
				builder.add('/path');
			});
		});
	});

	describe('replace()', function() {
		it('should add one method in patch request body', function() {
			builder.replace('/currentState', 'reviewed');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should add multile methods in patch request body', function() {
			builder.replace('/currentState', 'reviewed');
			builder.replace('/author', 'box');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});

		it('should throws when key is invalid', function() {
			assert.throws(function() {
				builder.replace('path', 'value');
			});
		});

		it('should throw when value is not specified', function() {
			assert.throws(function() {
				builder.replace('/path');
			});
		});
	});

	describe('test()', function() {
		it('should add one method in patch request body', function() {
			builder.test('/currentState', 'reviewed');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should add multile methods in patch request body', function() {
			builder.test('/currentState', 'reviewed');
			builder.test('/author', 'box');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});

		it('should throws when key is invalid', function() {
			assert.throws(function() {
				builder.test('path', 'value');
			});
		});

		it('should throw when value is not specified', function() {
			assert.throws(function() {
				builder.test('/path');
			});
		});
	});

	describe('move()', function() {
		it('should add one method in patch request body', function() {
			builder.move('/currentState', 'reviewed');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should add multile methods in patch request body', function() {
			builder.move('/currentState', 'reviewed');
			builder.move('/author', 'box');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});

		it('should throws when key is invalid', function() {
			assert.throws(function() {
				builder.move('path', 'value');
			});
		});

		it('should throw when value is not specified', function() {
			assert.throws(function() {
				builder.move('/path');
			});
		});
	});

	describe('copy()', function() {
		it('should add one method in patch request body', function() {
			builder.copy('/currentState', 'reviewed');
			var result = builder.getPatch();
			assert.equal(result.length, 1);
		});

		it('should add multile methods in patch request body', function() {
			builder.copy('/currentState', 'reviewed');
			builder.copy('/author', 'box');
			var result = builder.getPatch();
			assert.equal(result.length, 2);
		});

		it('should throws when key is invalid', function() {
			assert.throws(function() {
				builder.copy('path', 'value');
			});
		});

		it('should throw when value is not specified', function() {
			assert.throws(function() {
				builder.copy('/path');
			});
		});
	});
});
