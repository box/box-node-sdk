'use strict';

const utils = require('../lib/utils');

async function createBoxTestUser(appClient) {
	let user = await appClient.enterprise.addAppUser(utils.randomName());
	user.dispose = async function() {
		await appClient.users.delete(user.id, {force: true});
	};
	return user;
}

async function clearUserContent(client) {
	let items = await client.folders.get(0, {limit: 1000});
	/* eslint-disable no-await-in-loop */
	for (let item of items.item_collection.entries) {
		if (item.type === 'folder') {
			await client.folders.delete(item.id, {recursive: true});
		} else {
			await client.files.delete(item.id);
		}
	}
	let trashed = await client.trash.get();
	for (let item of trashed.entries) {
		if (item.type === 'file') {
			await client.files.deletePermanently(item.id, {force: true});
		}
	}
	trashed = await client.trash.get();
	for (let item of trashed.entries) {
		if (item.type === 'folder') {
			await client.folders.deletePermanently(item.id, {force: true});
		}
	}
}

module.exports = {
	createBoxTestUser,
	clearUserContent,
};
