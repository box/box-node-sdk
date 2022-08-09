const { CLIENT } = require('../context');
const utils = require('../lib/utils');

exports.BoxTestUser = async() => {
	let user = await CLIENT.enterprise.addUser(utils.randomEmail(), utils.randomName());
	user.dispose = async() => {
		CLIENT.users.delete(user.id, {force: true});
	};
	return user;
};
