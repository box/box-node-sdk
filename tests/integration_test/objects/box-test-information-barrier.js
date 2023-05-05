const {getEnterpriseId} = require('../context');

const getOrCreateBoxTestInformationBarrier = async adminClient => {
	let informationBarrier;
	const list = await adminClient.shieldInformationBarriers.getAll();
	if (list.entries.length > 0) {
		informationBarrier = list.entries[0];
	} else {
		informationBarrier = await adminClient.shieldInformationBarriers.create({
			enterprise: {
				id: getEnterpriseId(),
				type: 'enterprise',
			},
		});
	}

	return informationBarrier;
};

module.exports = {
	getOrCreateBoxTestInformationBarrier,
};
