'use strict';

const utils = require('../lib/utils');
const createBoxTestInformationBarrierSegment = async(adminClient, barrierId, segmentName = null, segmentDesc = null) => {
	if (!segmentName) {
		segmentName = `segment-${utils.randomName()}`;
	}
	if (!segmentDesc) {
		segmentDesc = `segment-desc-${utils.randomName()}`;
	}

	const barrierSegment = await adminClient.shieldInformationBarrierSegments.create({
		name: segmentName,
		description: segmentDesc,
		shield_information_barrier: {
			id: barrierId,
			type: 'shield_information_barrier'
		},
	});
	barrierSegment.dispose = async function() {
		let barrierSegmentId = barrierSegment.id;
		await adminClient.shieldInformationBarrierSegments.deleteById({
			shield_information_barrier_segment_id: barrierSegmentId
		});
	};

	return barrierSegment;
};

module.exports = {
	createBoxTestInformationBarrierSegment,
};
