'use strict';

const {getAdminClient} = require('../context');
const {getOrCreateBoxTestInformationBarrier} = require('../objects/box-test-information-barrier');
const context = {};

beforeAll(async() => {
	context.client = getAdminClient();
	context.barrier = await getOrCreateBoxTestInformationBarrier(context.client);
});

test('test information barrier report', async() => {
	const barrierReports = await context.client.shieldInformationBarrierReports.getAll({shield_information_barrier_id: context.barrier.id});
	expect(barrierReports).toBeDefined();
	expect(barrierReports.entries).toBeDefined();
});
