'use strict';

const uuid = require('uuid');

const randomName = () => uuid.v4();

const randomEmail = () => `${uuid.v4()}@boxdemo.com`;

module.exports = {
	randomName,
	randomEmail
};
