'use strict';

const {getAdminClient} = require('../context');
const {getOrCreateBoxTestInformationBarrier} = require('../objects/box-test-information-barrier');
const utils = require('../lib/utils');
const context = {};

beforeAll(() => {
	context.adminClient = getAdminClient();
	context.client = context.adminClient;
});

test('test information barrier segment', async() => {
	let barrierSegmentName = `ibs-${utils.randomName()}`;
	let barrierSegmentDesc = 'sample description';
	let barrierSegmentNameUpdated = `ibs-${utils.randomName()}-updated`;
	let barrierSegmentDescUpdated = 'sample description updated';
	let barrierSegment;

	const barrier = await getOrCreateBoxTestInformationBarrier(context.client);

	barrierSegment = await context.client.shieldInformationBarrierSegments.create({
		name: barrierSegmentName,
		description: barrierSegmentDesc,
		shield_information_barrier: barrier,
	});
	expect(barrierSegment.id).toBeDefined();
	expect(barrierSegment.name).toBe(barrierSegmentName);
	expect(barrierSegment.description).toBe(barrierSegmentDesc);

	await context.client.shieldInformationBarrierSegments.update({
		name: barrierSegmentNameUpdated,
		description: barrierSegmentDescUpdated,
	}, {
		shield_information_barrier_segment_id: barrierSegment.id
	});

	barrierSegment = await context.client.shieldInformationBarrierSegments.getById({
		shield_information_barrier_segment_id: barrierSegment.id
	});
	expect(barrierSegment.id).toBeDefined();
	expect(barrierSegment.name).toBe(barrierSegmentNameUpdated);
	expect(barrierSegment.description).toBe(barrierSegmentDescUpdated);

	await context.client.shieldInformationBarrierSegments.deleteById({
		shield_information_barrier_segment_id: barrierSegment.id
	});

	const allSegments = await context.client.shieldInformationBarrierSegments.getAll({
		shield_information_barrier_id: barrier.id
	});
	expect(allSegments.entries.length).toBe(0);
});
