'use strict';

const createBoxTestMetadataTemplate = async(client, displayName, fields) => {
	if (!displayName) {
		displayName = 'enterprise_metadata_template';
	}
	if (!fields) {
		fields = [];
	}
	let metadataTemplate = null;
	let templates = await client.metadata.getTemplates('enterprise');
	for (let template of templates.entries) {
		if (template.displayName === displayName) {
			metadataTemplate = template;
		}
	}
	if (!metadataTemplate) {
		metadataTemplate = await client.metadata.createTemplate(displayName, fields, {
			scope: 'enterprise'
		});
	}
	metadataTemplate.dispose = async function() {
		await client.metadata.deleteTemplate(metadataTemplate.scope, metadataTemplate.templateKey);
	};
	return metadataTemplate;
};

module.exports = {
	createBoxTestMetadataTemplate,
};
