'use strict';
const utils = require('../lib/utils');


const createBoxTestFolder = async(client, name = null, parentFolderId = '0') => {
	let folder = await client.folders.create(parentFolderId, name || utils.randomName());
	folder.dispose = async function() {
		await client.folders.delete(folder.id, { recursive: true });
		await client.folders.deletePermanently(folder.id);
	};
	return folder;
};

module.exports = {
	createBoxTestFolder,
};
