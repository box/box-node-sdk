'use strict';
/* eslint-disable no-sync */

const fs = require('fs');
const crypto = require('crypto');
const utils = require('../lib/utils');
const systemPath = require('path');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const {
	createBoxTestUser,
	clearUserContent,
} = require('../objects/box-test-user');

let appClient, user, userClient, folder;

const CHUNKED_UPLOAD_MINIMUM = 20000000;

beforeAll(async() => {
	appClient = getAppClient();
	user = await createBoxTestUser(appClient);
	userClient = getUserClient(user.id);
	folder = await createBoxTestFolder(userClient);
});

afterAll(async() => {
	await folder.dispose();
	await clearUserContent(userClient);
	await user.dispose();
	folder = null;
	user = null;
});

function writeToStream(bytesToWrite, stream) {
	const buffer = crypto.randomBytes(bytesToWrite);
	stream.write(buffer);
}

async function createFolderTree(path, tree) {
	for (let node of tree) {
		const nodePath = `${path}/${node.name}`;
		if (node.type === 'folder') {
			fs.mkdirSync(nodePath);
			/* eslint-disable no-await-in-loop*/
			await createFolderTree(nodePath, node.items);
			/* eslint-enable no-await-in-loop*/
		} else {
			const stream = fs.createWriteStream(nodePath);
			writeToStream(node.size, stream);
			stream.end();
		}
	}
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

	const chunkedUploader = await client.files.getChunkedUploader(
		folderId,
		stats.size,
		filename,
		stream
	);
	chunkedUploader.on('error', err => {
		throw err;
	});
	chunkedUploader.on('chunkUploaded', part => {
		expect(part.part.part_id).toBeDefined();
	});
	chunkedUploader.on('uploadComplete', file => {
		expect(file.entries).toBeDefined();
		expect(file.entries.length).toBe(1);
	});
	let uploadResult = await chunkedUploader.start();
	return uploadResult.entries[0];
}

async function uploadFolderTree(client, folderId, path) {
	const items = fs.readdirSync(path);
	for (let item of items) {
		const itemPath = `${path}/${item}`;
		const stats = fs.statSync(itemPath);
		/* eslint-disable no-await-in-loop */
		if (stats.isDirectory()) {
			const newFolder = await client.folders.create(folderId, item);
			await uploadFolderTree(client, newFolder.id, itemPath);
		} else {
			let file = await uploadFile(client, folderId, itemPath);
			const hash = crypto
				.createHash('sha1')
				.update(fs.readFileSync(itemPath))
				.digest('hex');
			expect(file.sha1).toBe(hash);
			expect(file.size).toBe(stats.size);
		}
		/* eslint-enable no-await-in-loop */
	}
}

// Max timeout for this test is 1 hour
jest.setTimeout(3600000);
// Skip this long-running test by default, to avoid running it in CI
// to run this test, replace 'skip' with 'only' and run normally
test.skip('test massive folder upload', async() => {
	const folderName = `./${utils.randomName()}`;
	if (!fs.statSync(folderName, { throwIfNoEntry: false })) {
		fs.mkdirSync(folderName);
	}
	const folderPath = systemPath.join(
		__dirname,
		'../resources/mass-folder-structure.json'
	);
	try {
		const folderStructure = JSON.parse(fs.readFileSync(folderPath));
		await createFolderTree(folderName, folderStructure);
		await uploadFolderTree(userClient, folder.id, folderName);
	} finally {
		fs.rmSync(folderName, { recursive: true, force: true });
	}
});
