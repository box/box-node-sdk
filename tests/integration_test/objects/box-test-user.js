'use strict';

const utils = require('../lib/utils');

async function createBoxTestUser(appClient) {
	let user = await appClient.enterprise.addAppUser(utils.randomName());
	user.dispose = async function() {
		await appClient.users.delete(user.id, {force: true});
	};
	return user;
}

module.exports = {
	createBoxTestUser
};
