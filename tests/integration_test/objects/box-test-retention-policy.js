'use strict';

const utils = require('../lib/utils');

const createBoxTestRetentionPolicy = async(appClient, policyName = null) => {
	if (!policyName) {
		policyName = `policy-${utils.randomName()}`;
	}

	let retentionPolicy;
	try {
		retentionPolicy = await appClient.retentionPolicies.create(
			policyName,
			'finite',
			'permanently_delete',
			{
				retention_length: 1,
				retention_type: 'modifiable',
			},
		);
	} catch (err) {
		// TODO: 24-10-2022, @arjankowski
		// There is an error on backend side, which will return 409 status code "conflict"
		// but retention policy still created.
		// Delete this try-catch after the issue is fixed.

		let policies = await appClient.retentionPolicies.getAll({policy_name: policyName});
		if (policies.entries.length === 1) {
			retentionPolicy = await appClient.retentionPolicies.get(policies.entries[0].id);
		} else {
			throw err;
		}
	}

	retentionPolicy.dispose = async function() {
		try {
			await appClient.retentionPolicies.update(retentionPolicy.id, {status: 'retired'});
		} catch (err) {
			// TODO: 24-10-2022, @arjankowski
			// There is an error on backend side, which will return 500 status code "Internal Server Error"
			// but retention policy still updated.
			// Delete this try-catch after the issue is fixed
		}
	};

	return retentionPolicy;
};

module.exports = {
	createBoxTestRetentionPolicy,
};
