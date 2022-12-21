'use strict';

const utils = require('../lib/utils');

// eslint-disable-next-line require-jsdoc
async function createBoxTestGroup(appClient) {
	let group = await appClient.groups.create(utils.randomName());
	group.dispose = async function() {
		await appClient.groups.delete(group.id);
	};
	return group;
}

module.exports = {
	createBoxTestGroup,
};
