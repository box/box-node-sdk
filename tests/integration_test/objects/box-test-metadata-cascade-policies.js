'use strict';

const createBoxTestMetadataCascadePolicies = async(client, folderID, templateKey, scope) => {
	if (!scope) {
		scope = 'enterprise';
	}
	let metadataCascadePolicy = await client.metadata.createCascadePolicy(scope, templateKey, folderID);
	metadataCascadePolicy.dispose = async function() {
		await client.metadata.deleteCascadePolicy(metadataCascadePolicy.id);
	};
	return metadataCascadePolicy;
};

module.exports = {
	createBoxTestMetadataCascadePolicies,
};
