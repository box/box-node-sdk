/**
 * @fileoverview Build file
 * @author mwiller
 */
/*global target, exec, echo, find*/

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require('shelljs/make');
var nodeCLI = require('shelljs-nodecli');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Generates a function that matches files with a particular extension.
 * @param {string} extension The file extension (i.e. 'js')
 * @returns {Function} The function to pass into a filter method.
 * @private
 */
function fileType(extension) {
	return function(filename) {
		return filename.substring(filename.lastIndexOf('.') + 1) === extension;
	};
}

/**
 * Creates a release version tag and pushes to origin.
 * @param {string} type The type of release to do (patch, minor, major)
 * @returns {void}
 */
function release(type) {
	target.test();
	exec('npm version ' + type);

	exec('git add package.json');
	exec('git commit --amend --no-edit');

	// ...and publish
	exec('git push origin master --tags');
}

//------------------------------------------------------------------------------
// Data
//------------------------------------------------------------------------------

var MOCHA_BINARY = './node_modules/.bin/_mocha',

	// Directories
	JS_DIR = './lib/',

	// Files
	JS_FILES = find(JS_DIR).filter(fileType('js')).join(" "),
	JSON_FILES = find('config/').filter(fileType('json')).join(" ") + ' .eslintrc',
	TEST_FILES = find('tests/').filter(fileType('js')).join(" ");

//------------------------------------------------------------------------------
// Tasks
//------------------------------------------------------------------------------

target.all = function() {
	target.test();
};

target.lint = function() {
	echo('Validating JSON Files');
	nodeCLI.exec('jsonlint', '-q', '-c', JSON_FILES);

	echo('Validating package.json');
	nodeCLI.exec('jsonlint', 'package.json', '-q', '-V ./config/package.schema.json');

	echo('Validating JavaScript files');
	nodeCLI.exec('eslint', '--fix', JS_FILES);
};

target.test = function() {
	target.lint();
	nodeCLI.exec('istanbul', 'cover', MOCHA_BINARY, '--', '-c', '-R nyan', TEST_FILES);
};

target.docs = function() {
	echo('Generating documentation');
	nodeCLI.exec('jsdoc', '-r', '-d ./ ', JS_DIR);
};

target.jsdoc = function() {
	echo('Generating documentation');
	nodeCLI.exec('jsdoc', '-r', '-d jsdoc ', JS_DIR);
};

target.jsdocprivate = function() {
	echo('Generating documentation');
	nodeCLI.exec('jsdoc', '-r', '-p', '-d jsdoc ', JS_DIR);
};

target.patch = function() {
	release('patch');
};

target.minor = function() {
	release('minor');
};

target.major = function() {
	release('major');
};
