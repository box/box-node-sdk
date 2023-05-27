'use strict';

const { v4: uuidv4 } = require('uuid');

const randomName = () => uuidv4();

const randomEmail = () => `${uuidv4()}@box.com`;

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
