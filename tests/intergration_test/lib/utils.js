const uuid = require('uuid');

exports.randomName = () => uuid.v4();

exports.randomEmail = () => `${uuid.v4()}@boxdemo.com`;
