'use strict';
/* eslint-disable no-sync */

const fs = require('fs');
const crypto = require('crypto');
const utils = require('../lib/utils');
const systemPath = require('path');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
const context = {};

const CHUNKED_UPLOAD_MINIMUM = 20000000;

beforeAll(async() => {
	let appClient = getAppClient();
	let user = await createBoxTestUser(appClient);
	let userClient = getUserClient(user.id);
	let folder = await createBoxTestFolder(userClient);
	context.user = user;
	context.appClient = appClient;
	context.client = userClient;
	context.folder = folder;
});

afterAll(async() => {
	await context.folder.dispose();
	await clearUserContent(context.client);
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

function writeToStream(bytesToWrite, stream) {
	const buffer = crypto.randomBytes(bytesToWrite);
	stream.write(buffer);
}

async function createFolderTree(path, tree) {
	await Promise.all(tree.map(async node => {
		const nodePath = `${path}/${node.name}`;
		if (node.type === 'folder') {
			fs.mkdirSync(nodePath);
			await createFolderTree(nodePath, node.items);
		} else {
			const stream = fs.createWriteStream(nodePath);
			writeToStream(node.size, stream);
			stream.end();
		}
	}));
}

async function uploadFile(client, folderId, path) {
	const stats = fs.statSync(path);
	const filename = path.split('/').pop();
	const preflight = await client.files.preflightUploadFile(folderId, {
		name: filename,
		size: stats.size,
	});
	expect(preflight).toBeDefined();
	var stream = fs.createReadStream(path);
	if (stats.size < CHUNKED_UPLOAD_MINIMUM) {
		const result = await client.files.uploadFile(folderId, filename, stream);
		expect(result.entries).toBeDefined();
		expect(result.entries.length).toBe(1);
		return result.entries[0];
	}
	/* eslint-disable promise/avoid-new */
	return new Promise((resolve, reject) => {
		client.files
			.getChunkedUploader(folderId, stats.size, filename, stream)
			.then(chunkedUploader => {
				chunkedUploader.on('error', err => {
					reject(err);
				});
				chunkedUploader.on('chunkUploaded', part => {
					expect(part.part.part_id).toBeDefined();
				});
				chunkedUploader.on('uploadComplete', file => {
					expect(file.entries).toBeDefined();
					expect(file.entries.length).toBe(1);
					resolve(file.entries[0]);
				});
				chunkedUploader.start();
			})
			.catch(err => {
				reject(err);
			});
	});
}

async function uploadFolderTree(client, folderId, path) {
	const items = fs.readdirSync(path);
	await Promise.all(items.map(async item => {
		const itemPath = `${path}/${item}`;
		const stats = fs.statSync(itemPath);
		if (stats.isDirectory()) {
			const folder = await client.folders.create(folderId, item);
			await uploadFolderTree(client, folder.id, itemPath);
		} else {
			await uploadFile(client, folderId, itemPath)
				.then(file => {
					const hash = crypto
						.createHash('sha1')
						.update(fs.readFileSync(itemPath))
						.digest('hex');
					if (file.sha1 !== hash) {
						throw new Error(`SHA1 mismatch for ${file.name}`);
					}
					if (file.size !== stats.size) {
						throw new Error(`Size mismatch for ${file.name}`);
					}
				})
				.catch(err => {
					throw err;
				});
		}
	}));
}

// Max timeout for this test is 1 hour
jest.setTimeout(3600000);
// Skip this long-running test by default
test.skip('test massive folder upload', async() => {
	const folderName = `./${utils.randomName()}`;
	if (!fs.statSync(folderName, { throwIfNoEntry: false })) {
		fs.mkdirSync(folderName);
	}
	const folderPath = systemPath.join(__dirname, '../resources/mass-folder-structure.json');
	try {
		const folderStructure = JSON.parse(fs.readFileSync(folderPath));
		await createFolderTree(folderName, folderStructure);
		await uploadFolderTree(context.client, context.folder.id, folderName);
	} finally {
		fs.rmSync(folderName, { recursive: true, force: true });
	}
});
