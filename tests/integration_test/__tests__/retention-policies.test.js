'use strict';
const {getAppClient} = require('../context');
const {createBoxTestFolder} = require('../objects/box-test-folder');
const {createBoxTestRetentionPolicy} = require('../objects/box-test-retention-policy');
const utils = require('../lib/utils');
const context = {};

beforeAll(async() => {
	context.appClient = await getAppClient();
});

test('test retention policy', async() => {
	let policyName = `policy-${utils.randomName()}`;
	let retentionPolicy;

	try {
		retentionPolicy = await context.appClient.retentionPolicies.create(
			policyName,
			'finite',
			'permanently_delete',
			{
				retention_length: 2,
				retention_type: 'modifiable',
			},
		);
	} catch (err) {
		// TODO: 21-10-2022, @arjankowski
		// There is an error on backend side, which will return 409 status code "conflict"
		// but retention policy still created.
		// Delete this try-catch after the issue is fixed.

		let policies = await context.appClient.retentionPolicies.getAll({policy_name: policyName});
		if (policies.entries.length === 1) {
			retentionPolicy = await context.appClient.retentionPolicies.get(policies.entries[0].id);
		} else {
			throw err;
		}
	}
	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('modifiable');
	expect(retentionPolicy.retention_length).toBe('2');

	try {
		retentionPolicy = await context.appClient.retentionPolicies.update(
			retentionPolicy.id,
			{
				retention_length: 1,
				retention_type: 'non_modifiable',
				status: 'retired'
			},
		);
	} catch (err) {
		// TODO: 12-09-2022, @arjankowski
		// There is an error on backend side, which will return 500 status code "Internal Server Error"
		// but retention policy still updated.
		// Delete this try-catch after the issue is fixed
	}

	retentionPolicy = await context.appClient.retentionPolicies.get(retentionPolicy.id);
	expect(retentionPolicy.id).toBeDefined();
	expect(retentionPolicy.policy_name).toBe(policyName);
	expect(retentionPolicy.policy_type).toBe('finite');
	expect(retentionPolicy.disposition_action).toBe('permanently_delete');
	expect(retentionPolicy.retention_type).toBe('non_modifiable');
	expect(retentionPolicy.retention_length).toBe('1');
}, 180000);

test('test retention policy assignment', async() => {
	let testFolder = await createBoxTestFolder(context.appClient);
	let testRetentionPolicy = await createBoxTestRetentionPolicy(context.appClient);
	try {
		let assignment = await context.appClient.retentionPolicies.assign(
			testRetentionPolicy.id,
			'folder',
			testFolder.id
		);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('folder');
		expect(assignment.assigned_to.id).toBe(testFolder.id);

		assignment = await context.appClient.retentionPolicies.getAssignment(assignment.id);
		expect(assignment.retention_policy.policy_id).toBe(testRetentionPolicy.policy_id);
		expect(assignment.assigned_to.type).toBe('folder');
		expect(assignment.assigned_to.id).toBe(testFolder.id);

		await context.appClient.retentionPolicies.deleteAssignment(assignment.id);
		try {
			await context.appClient.retentionPolicies.getAssignment(assignment.id);
		} catch (err) {
			expect(err.statusCode).toBe(404);
		}
	} finally {
		await testRetentionPolicy.dispose();
		await testFolder.dispose();
	}
}, 180000);
