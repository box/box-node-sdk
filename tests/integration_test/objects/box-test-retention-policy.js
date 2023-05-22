'use strict';

const utils = require('../lib/utils');

const createBoxTestRetentionPolicy = async(appClient, policyName = null) => {
	if (!policyName) {
		policyName = `policy-${utils.randomName()}`;
	}

	let retentionPolicy = await appClient.retentionPolicies.create(
		policyName,
		'finite',
		'permanently_delete',
		{
			retention_length: 1,
			retention_type: 'modifiable',
		},
	);

	retentionPolicy.dispose = async function() {
		await appClient.retentionPolicies.update(retentionPolicy.id, {status: 'retired'});
	};

	return retentionPolicy;
};

module.exports = {
	createBoxTestRetentionPolicy,
};
