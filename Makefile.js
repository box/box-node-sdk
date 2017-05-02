/**
 * @fileoverview Build file
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

	var code = 0;

	echo('Validating JSON Files');
	code += nodeCLI.exec('jsonlint', '-q', '-c', JSON_FILES).code;

	echo('Validating package.json');
	code += nodeCLI.exec('jsonlint', 'package.json', '-q', '-V ./config/package.schema.json').code;

	echo('Validating JavaScript files');
	code += nodeCLI.exec('eslint', '--fix', JS_FILES).code;
	code += nodeCLI.exec('eslint', '--fix', './tests').code;

	return code;
};

target.test = function() {
	var code = target.lint();
	code += nodeCLI.exec('istanbul', 'cover', MOCHA_BINARY, '--', '-c', '-R spec', TEST_FILES).code;

	if (code) {
		exit(code);
	}
};

target.docs = function() {
	echo('Generating documentation');
	nodeCLI.exec('jsdoc', '-r', '-d ./docs/jsdoc ', JS_DIR);
};

target.docsDev = function() {
	echo('Generating dev documentation');
	nodeCLI.exec('jsdoc', '-p', '-r', '-d ./docs/jsdoc-dev ', JS_DIR);
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
