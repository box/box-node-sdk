'use strict';

const {getAdminClient} = require('../context');
const {getOrCreateBoxTestInformationBarrier} = require('../objects/box-test-information-barrier');
const {createBoxTestInformationBarrierSegment} = require('../objects/box-test-information-barrier-segment');
const context = {};

beforeAll(async() => {
	context.client = getAdminClient();
	context.barrier = await getOrCreateBoxTestInformationBarrier(context.client);
	context.barrierSegmentRestricted = await createBoxTestInformationBarrierSegment(context.client, context.barrier.id);
	context.barrierSegment = await createBoxTestInformationBarrierSegment(context.client, context.barrier.id);
});

afterAll(async() => {
	await context.barrierSegment.dispose();
	await context.barrierSegmentRestricted.dispose();
	context.barrier = null;
});

test('test information barrier segment restriction', async() => {
	let barrierSegmentResriction = await context.client.shieldInformationBarrierSegmentRestrictions.create({
		shield_information_barrier_segment: context.barrierSegment,
		restricted_segment: context.barrierSegmentRestricted,
		type: 'shield_information_barrier_segment_restriction'
	});
	expect(barrierSegmentResriction.id).toBeDefined();
	expect(barrierSegmentResriction.shield_information_barrier_segment.id).toBe(context.barrierSegment.id);
	expect(barrierSegmentResriction.restricted_segment.id).toBe(context.barrierSegmentRestricted.id);

	barrierSegmentResriction = await context.client.shieldInformationBarrierSegmentRestrictions.getById({
		shield_information_barrier_segment_restriction_id: barrierSegmentResriction.id
	});
	expect(barrierSegmentResriction.id).toBeDefined();
	expect(barrierSegmentResriction.shield_information_barrier_segment.id).toBe(context.barrierSegment.id);
	expect(barrierSegmentResriction.restricted_segment.id).toBe(context.barrierSegmentRestricted.id);

	await context.client.shieldInformationBarrierSegmentRestrictions.deleteById({
		shield_information_barrier_segment_restriction_id: barrierSegmentResriction.id
	});

	const barrierSegmentResrictions = await context.client.shieldInformationBarrierSegmentRestrictions.getAll({
		shield_information_barrier_segment_id: context.barrierSegment.id
	});
	expect(barrierSegmentResrictions.entries.length).toBe(0);
});
