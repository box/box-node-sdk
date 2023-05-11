'use strict';

const {getAdminClient, getAppClient} = require('../context');
const {getOrCreateBoxTestInformationBarrier} = require('../objects/box-test-information-barrier');
const {createBoxTestInformationBarrierSegment} = require('../objects/box-test-information-barrier-segment');
const { createBoxTestUser} = require('../objects/box-test-user');
const context = {};

beforeAll(async() => {
	context.client = getAdminClient();
	context.appClient = getAppClient();
	context.barrier = await getOrCreateBoxTestInformationBarrier(context.client);
	context.barrierSegment = await createBoxTestInformationBarrierSegment(context.client, context.barrier.id);
	context.user = await createBoxTestUser(context.appClient);
});

afterAll(async() => {
	await context.barrierSegment.dispose();
	await context.user.dispose();
	context.barrier = null;
	context.user = null;
});

test('test information barrier segment member', async() => {
	let barrierSegmentMember = await context.client.shieldInformationBarrierSegmentMembers.create({
		shield_information_barrier_segment: context.barrierSegment,
		user: context.user
	});
	expect(barrierSegmentMember.id).toBeDefined();
	expect(barrierSegmentMember.shield_information_barrier_segment.id).toBe(context.barrierSegment.id);
	expect(barrierSegmentMember.user.id).toBe(context.user.id);

	barrierSegmentMember = await context.client.shieldInformationBarrierSegmentMembers.getById({
		shield_information_barrier_segment_member_id: barrierSegmentMember.id
	});
	expect(barrierSegmentMember.id).toBeDefined();
	expect(barrierSegmentMember.shield_information_barrier_segment.id).toBe(context.barrierSegment.id);
	expect(barrierSegmentMember.user.id).toBe(context.user.id);

	await context.client.shieldInformationBarrierSegmentMembers.deleteById({
		shield_information_barrier_segment_member_id: barrierSegmentMember.id
	});

	const barrierSegmentMembers = await context.client.shieldInformationBarrierSegmentMembers.getAll({
		shield_information_barrier_segment_id: context.barrierSegment.id
	});
	expect(barrierSegmentMembers.entries.length).toBe(0);
});
