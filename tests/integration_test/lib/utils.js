'use strict';

const uuid = require('uuid');

const randomName = () => uuid.v4();

const randomEmail = () => `${uuid.v4()}@box.com`;

const deleteFilePermanently = async(client, fileID) => {
	await client.files.delete(fileID);
	await client.files.deletePermanently(fileID);
};

const deleteFolderPermanently = async(client, folderID) => {
	await client.folders.delete(folderID, { recursive: true });
	await client.folders.deletePermanently(folderID);
};

const deleteWeblinkPermanently = async(client, weblinkID) => {
	await client.weblinks.delete(weblinkID);
	// Not implemented in Node SDK yet
	// await client.weblinks.deletePermanently(weblinkID);
};

module.exports = {
	randomName,
	randomEmail,
	deleteFilePermanently,
	deleteFolderPermanently,
	deleteWeblinkPermanently,
};
