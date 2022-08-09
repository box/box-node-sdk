'use strict';

const { CLIENT } = require('../context');
const utils = require('../lib/utils');

const BoxTestUser = async() => {
	let user = await CLIENT.enterprise.addUser(utils.randomEmail(), utils.randomName());
	user.dispose = async function() {
		await CLIENT.users.delete(user.id, {force: true});
	};
	return user;
};

module.exports = {
	BoxTestUser
};
