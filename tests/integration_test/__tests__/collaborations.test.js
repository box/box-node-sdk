'use strict';
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const { createBoxTestUser, clearUserContent } = require('../objects/box-test-user');
const context = {};
describe('Collaborations manager', () => {
	beforeAll(async() => {
		context.appClient = getAppClient();
		context.user = await createBoxTestUser(context.appClient);
		context.collaborator = await createBoxTestUser(context.appClient );
		context.user = await createBoxTestUser(context.appClient);
		context.client = getUserClient(context.user.id);
		context.folder = await createBoxTestFolder(context.client);
	});

	afterAll(async() => {
		await context.folder.dispose();
		await clearUserContent(context.client);
		await context.user.dispose();
		await context.collaborator.dispose();
		context.folder = null;
		context.user = null;
		context.collaboratorEmail = null;
	});

	it('creates and removes collaboration', async() => {
		let collaboration = await context.client.collaborations.create(
			{
				type: 'user',
				id: context.collaborator.id
			},
			context.folder.id,
			'viewer',
			{
				type: 'folder'
			}
		);
		expect(collaboration.type).toEqual('collaboration');
		expect(collaboration.role).toEqual('viewer');
		expect(collaboration.created_by.id).toEqual(context.user.id);
		expect(collaboration.created_by.name).toEqual(context.user.name);
		expect(collaboration.created_by.login).toEqual(context.user.login);
		expect(collaboration.accessible_by.id).toEqual(context.collaborator.id);
		expect(collaboration.item.type).toEqual('folder');
		expect(collaboration.item.id).toEqual(context.folder.id);

		await context.client.collaborations.delete(collaboration.id);
		try {
			await context.client.collaborations.get(collaboration.id);
		} catch (e) {
			expect(e.statusCode).toEqual(404);
		}
	});

	it('creates and gets collaboration with access only collaboration', async() => {
		let collaboration;
		try {
			collaboration = await context.client.collaborations.create(
				{
					type: 'user',
					id: context.collaborator.id
				},
				context.folder.id,
				'viewer',
				{
					type: 'folder',
					is_access_only: true
				}
			);
			const collaborationFields = await context.client.collaborations.get(
				collaboration.id, { fields: 'is_access_only' }
			);
			expect(collaborationFields.id).toEqual(collaboration.id);
			expect(collaborationFields.type).toEqual('collaboration');
			expect(collaborationFields.is_access_only).toEqual(true);
		} finally {
			if (collaboration) {
				await context.client.collaborations.delete(collaboration.id);
			}
		}
	});
});

