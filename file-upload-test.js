'use strict'

const BoxSDK = require('./lib/box-node-sdk');

var sdk = new BoxSDK({
    clientID: 'wncmz88sacf5oyaxf502dybcruqbzzy0',
    clientSecret: 'GbW3JR66m3BtfwGgbSlZOFVG0SFJk4ol'
});

var client = sdk.getBasicClient('Q7tOzwwKhsAbzLfSU4qWMuczs8d2Jupi');

client.files.updateFileFromPath('0', '3996801_fpx.jpeg', '/Users/kshanmugasundaram/Downloads/3996801_fpx.jpeg', function(error, data) {
	if (error) {
		console.log('Error occured' + error);
	} else {
		console.log(JSON.stringify(data));
	}
});