'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getAppClient, getUserClient } = require('../context');
const { createLocalLargeFile, createLocalFile, removeLocalFile } = require('../objects/box-local-file');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser } = require('../objects/box-test-user');
const { createBoxTestMetadataTemplate } = require('../objects/box-test-metadata-template');
const { createBoxTestMetadataCascadePolicies } = require('../objects/box-test-metadata-cascade-policies');
const { deleteFilePermanently, deleteWeblinkPermanently } = require('../lib/utils');
const context = {};

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
	await context.user.dispose();
	context.folder = null;
	context.user = null;
});

test('test preflight check', async() => {
	let fileSize = 123;
	let result = await context.client.files.preflightUploadFile(context.folder.id, {
		name: 'test.txt',
		size: fileSize,
	});
	expect(result.upload_url).toBeDefined();
});

test('test manual chunked upload', async() => {
	let file = createLocalLargeFile();
	/* eslint-disable no-sync */
	let stats = fs.statSync(file);
	let fd = fs.openSync(file, 'r');
	let uploadSession = await context.client.files.createUploadSession(context.folder.id, stats.size, path.basename(file));
	for (let i = 0; i < uploadSession.total_parts; i++) {
		let chunkSize = Math.min(uploadSession.part_size, stats.size - (i * uploadSession.part_size));
		let buffer = Buffer.alloc(chunkSize);
		fs.readSync(fd, buffer, 0, chunkSize, i * uploadSession.part_size);
		/* eslint-disable no-await-in-loop */
		let result = await context.client.files.uploadPart(uploadSession.id, buffer, i * uploadSession.part_size, stats.size);
		expect(result.part).toBeDefined();
		expect(result.part.offset).toBe(i * uploadSession.part_size);
	}
	let filehash = crypto.createHash('sha1').update(fs.readFileSync(file))
		.digest('base64');
	let uploadedFile = await context.client.files.commitUploadSession(uploadSession.id, filehash, {
		description: 'Test file chunked upload',
	});
	try {
		expect(uploadedFile.entries).toBeDefined();
		expect(uploadedFile.entries.length).toBe(1);
		await deleteFilePermanently(context.client, uploadedFile.entries[0].id);
	} finally {
		removeLocalFile(file);
	}
});

test('test auto chunked upload', async() => {
	let file = createLocalLargeFile();
	let stats = fs.statSync(file);
	let stream = fs.createReadStream(file);
	let uploader = await context.client.files.getChunkedUploader(context.folder.id, stats.size, path.basename(file), stream);
	let uploadedFile = await uploader.start();
	try {
		expect(uploadedFile.entries).toBeDefined();
		expect(uploadedFile.entries.length).toBe(1);
	} finally {
		removeLocalFile(file);
		await deleteFilePermanently(context.client, uploadedFile.entries[0].id);
	}
});

test('test get items', async() => {
	let testFile = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		let items = await context.client.folders.getItems(context.folder.id);
		expect(items).toBeDefined();
		expect(items.entries.length).toBeGreaterThan(0);
	} finally {
		await testFile.dispose();
	}
});

test('test upload stream to folder', async() => {
	let file = createLocalFile();
	try {
		let stream = fs.createReadStream(file);
		let uploadedFile = await context.client.files.uploadFile(context.folder.id, path.basename(file), stream);
		expect(uploadedFile.entries).toBeDefined();
		expect(uploadedFile.entries.length).toBe(1);
		await deleteFilePermanently(context.client, uploadedFile.entries[0].id);
	} finally {
		removeLocalFile(file);
	}
});

test('test create subfolder', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		expect(subfolder).toBeDefined();
		expect(subfolder.type).toBe('folder');
		expect(subfolder.parent.id).toBe(context.folder.id);
	} finally {
		await subfolder.dispose();
	}
});

test('test add collaborator', async() => {
	let testUser = await createBoxTestUser(context.appClient);
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		let result = await context.client.collaborations.createWithUserID(testUser.id, subfolder.id, context.client.collaborationRoles.EDITOR);
		expect(result).toBeDefined();
		let collaborations = await context.client.folders.getCollaborations(subfolder.id);
		expect(collaborations).toBeDefined();
		expect(collaborations.entries.length).toBe(1);
		expect(collaborations.entries[0].accessible_by.id).toBe(testUser.id);
	} finally {
		await subfolder.dispose();
		await testUser.dispose();
	}
});

test('test invite collaborator using email', async() => {
	let testUser = await createBoxTestUser(context.appClient);
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		let result = await context.client.collaborations.createWithUserEmail(testUser.login, subfolder.id, context.client.collaborationRoles.EDITOR);
		expect(result).toBeDefined();
		let collaborations = await context.client.folders.getCollaborations(subfolder.id);
		expect(collaborations).toBeDefined();
		expect(collaborations.entries.length).toBe(1);
		expect(collaborations.entries[0].accessible_by.login).toBe(testUser.login);
	} finally {
		await subfolder.dispose();
	}
});

test('test invite collaborator using nonexist email provided', async() => {
	let nonexistUserEmail = 'non-existant-user-email@box.com';
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		let result = await context.client.collaborations.createWithUserEmail(nonexistUserEmail, subfolder.id, context.client.collaborationRoles.EDITOR);
		expect(result).toBeDefined();
		let collaborations = await context.client.folders.getCollaborations(subfolder.id);
		expect(collaborations).toBeDefined();
		expect(collaborations.entries.length).toBe(1);
		expect(collaborations.entries[0].invite_email).toBe(nonexistUserEmail);
	} finally {
		await subfolder.dispose();
	}
});

test('test get shared link', async() => {
	let testUser = await createBoxTestUser(context.appClient);
	let testClient = getUserClient(testUser.id);
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		await context.client.collaborations.createWithUserID(testUser.id, subfolder.id, context.client.collaborationRoles.EDITOR);
		await context.client.folders.update(subfolder.id, {
			shared_link: {
				access: 'open',
				permissions: {
					can_view: true,
					can_download: true
				}
			}
		});
		let sharedLink = await testClient.folders.get(subfolder.id, { fields: 'shared_link' });
		expect(sharedLink.shared_link).toBeDefined();
		expect(sharedLink.shared_link.url).toBeDefined();
	} finally {
		await subfolder.dispose();
		await testUser.dispose();
	}
});

test('test create weblink', async() => {
	let weblink = await context.client.weblinks.create('https://www.box.com', context.folder.id, {
		name: 'Box Website',
		description: 'Box Website weblink'
	});
	try {
		expect(weblink).toBeDefined();
		expect(weblink.url).toBe('https://www.box.com');
		expect(weblink.parent.id).toBe(context.folder.id);
	} finally {
		await deleteWeblinkPermanently(context.client, weblink.id);
	}
});

test('test delete folder', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	await context.client.folders.delete(subfolder.id);
	try {
		await context.client.folders.get(subfolder.id);
	} catch (err) {
		expect(err).toBeDefined();
		expect(err.statusCode).toBe(404);
	}
});

test('test cascade and get metadata cascade policies', async() => {
	let metadataTemplate = await createBoxTestMetadataTemplate(context.appClient, 'test_template');
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	let cascadePolicy = await createBoxTestMetadataCascadePolicies(context.client, subfolder.id, metadataTemplate.templateKey);
	try {
		let policies = await context.client.metadata.getCascadePolicies(subfolder.id);
		expect(policies).toBeDefined();
		expect(policies.entries.length).toBe(1);
	} finally {
		await cascadePolicy.dispose();
		await metadataTemplate.dispose();
		await subfolder.dispose();
	}
});

test('test create and get lock', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	let lock = await context.client.folders.lock(subfolder.id);
	try {
		expect(lock).toBeDefined();
		expect(lock.folder.id).toBe(subfolder.id);
		expect(lock.locked_operations).toBeDefined();
		expect(lock.locked_operations.delete).toBe(true);
		try {
			await context.client.folders.move(subfolder.id, '0');
		} catch (err) {
			expect(err).toBeDefined();
			expect(err.statusCode).toBe(403);
		}
		try {
			await context.client.folders.delete(subfolder.id);
		} catch (err) {
			expect(err).toBeDefined();
			expect(err.statusCode).toBe(403);
		}
	} finally {
		await context.client.folders.deleteLock(lock.id);
		await subfolder.dispose();
	}
});

test('test add and remove collection', async() => {
	let collections = await context.client.collections.getAll();
	let collection = collections.entries[0];
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		await context.client.folders.addToCollection(subfolder.id, collection.id);
		let items = await context.client.collections.getItems(collection.id);
		expect(items).toBeDefined();
		let entries = items.entries;
		items = Object.keys(entries).map(key => entries[key].id);
		expect(items).toContain(subfolder.id);

		await context.client.folders.removeFromCollection(subfolder.id, collection.id);
		items = await context.client.collections.getItems(collection.id);
		expect(items).toBeDefined();
		entries = items.entries;
		items = Object.keys(entries).map(key => entries[key].id);
		expect(items).not.toContain(subfolder.id);
	} finally {
		await subfolder.dispose();
	}
});

test('test move folder', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	let newFolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		await context.client.folders.move(subfolder.id, newFolder.id);
		let movedFolder = await context.client.folders.get(subfolder.id);
		expect(movedFolder.parent.id).toBe(newFolder.id);
	} finally {
		await subfolder.dispose();
		await newFolder.dispose();
	}
});

test('test folder metadata', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	let metadataTemplate = await createBoxTestMetadataTemplate(context.appClient, 'test_template');
	try {
		let metadatas = await context.client.folders.getAllMetadata(subfolder.id);
		let count = metadatas.entries.length;
		await context.client.folders.setMetadata(subfolder.id, context.client.metadata.scopes.ENTERPRISE, metadataTemplate.templateKey, {});
		metadatas = await context.client.folders.getAllMetadata(subfolder.id);
		expect(metadatas.entries.length).toBe(count + 1);
		await context.client.folders.deleteMetadata(subfolder.id, context.client.metadata.scopes.ENTERPRISE, metadataTemplate.templateKey);
		metadatas = await context.client.folders.getAllMetadata(subfolder.id);
		expect(metadatas.entries.length).toBe(count);
	} finally {
		await subfolder.dispose();
		await metadataTemplate.dispose();
	}
});

test('test trash folder', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		await context.client.folders.delete(subfolder.id);
		let trashedFolders = await context.client.folders.getTrashedFolder(subfolder.id);
		expect(trashedFolders.id).toBe(subfolder.id);
		expect(trashedFolders.trashed_at).toBeDefined();
		expect(trashedFolders.item_status).toBe('trashed');

		await context.client.folders.restoreFromTrash(subfolder.id);
		let restoredFolder = await context.client.folders.get(subfolder.id);
		expect(restoredFolder.item_status).toBe('active');
	} finally {
		await subfolder.dispose();
	}
});

test('test watermark folder', async() => {
	let subfolder = await createBoxTestFolder(context.client, null, context.folder.id);
	try {
		await context.client.folders.applyWatermark(subfolder.id);
		let watermark = await context.client.folders.getWatermark(subfolder.id);
		expect(watermark.created_at).toBeDefined();
		expect(watermark.modified_at).toBeDefined();
		await context.client.folders.removeWatermark(subfolder.id);
		try {
			await context.client.folders.getWatermark(subfolder.id);
		} catch (err) {
			expect(err).toBeDefined();
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await subfolder.dispose();
	}
});
