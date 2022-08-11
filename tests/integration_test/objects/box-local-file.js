'use strict';
const utils = require('../lib/utils');
const fs = require('fs');

function createLocalLargeFile(filename, fileSize) {
	/* eslint-disable no-sync */
	if (!filename) {
		filename = `${utils.randomName()}.txt`;
	}
	if (!fileSize) {
		fileSize = 1024 * 1024 * 21;
	}
	let file = fs.openSync(filename, 'w');
	fs.writeSync(file, '0', Math.max(0, fileSize - 1));
	fs.closeSync(file);
	return filename;
}

function createLocalFile(filename) {
	return createLocalLargeFile(filename, 100 * 1024);
}

function removeLocalFile(file) {
	fs.unlinkSync(file);
}

module.exports = {
	createLocalLargeFile,
	createLocalFile,
	removeLocalFile
};
