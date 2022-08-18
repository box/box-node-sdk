'use strict';

const utils = require('../lib/utils');
const fs = require('fs');


const createBoxTestFile = async(client, filePath, fileName = null, parentFolderID = '0') => {
	if (!fileName) {
		let sp = filePath.split('.');
		let extension = sp.length > 1 ? sp[sp.length - 1] : '';
		fileName = `${utils.randomName()}.${extension}`;
	}
	let stream = fs.createReadStream(filePath);
	let file = await client.files.uploadFile(parentFolderID, fileName, stream);
	file.dispose = async function() {
		let fileID = file.id;
		await client.files.delete(fileID);
		await client.files.deletePermanently(fileID);
	};
};

module.exports = {
	createBoxTestFile,
};
