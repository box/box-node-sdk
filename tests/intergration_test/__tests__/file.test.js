'use strict';

const BoxContext = require('../context');
const { BoxTestUser } = require('../objects/box-test-user');

test('create user', async() => {
	let testUser = await BoxTestUser();
	// testUser.dispose();
	console.log(await testUser.dispose());
});

test('adds 1 + 2 to equal 3', () => {
	expect(Math.max(2, 3)).toBe(3);
});
