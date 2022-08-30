'use strict';
const utils = require('../lib/utils');
const { deleteFilePermanently } = require('../lib/utils');
const Promise = require('bluebird');


const createBoxTestFolder = async(client, name = null, parent_folder_id = '0') => {
	let folder = await client.folders.create(parent_folder_id, name || utils.randomName());
	folder.dispose = async function() {
		let files = await client.folders.get(folder.id, {limit: 1000});
		await Promise.all(files.entries.map(file => deleteFilePermanently(client, file.id)));
		await client.folders.delete(folder.id, { recursive: true });
		await client.folders.deletePermanently(folder.id);
	};
	return folder;
};

module.exports = {
	createBoxTestFolder,
};
