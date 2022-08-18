'use strict';

/* eslint-disable node/no-missing-require */
const BoxSDK = require('box-node-sdk');

const testConfig = require('./test-config.json');
const JWT_CONFIG_ENV_NAME = 'JWT_CONFIG';

function getJwtConfigFromFile() {
	let jwtFilePath = testConfig.jwt_file_path;
	if (!jwtFilePath) {
		return null;
	}
	const jwtConfig = require(jwtFilePath);
	return jwtConfig;
}

function getJwtConfigFromEnv() {
	let jwtConfigBase64 = process.env[JWT_CONFIG_ENV_NAME];
	if (!jwtConfigBase64) {
		return null;
	}
	const jwtConfig = (Buffer.from(jwtConfigBase64, 'base64')).toString('utf8');
	return JSON.parse(jwtConfig);
}

function getJwtConfig() {
	let jwtConfig = getJwtConfigFromFile() || getJwtConfigFromEnv();
	if (!jwtConfig) {
		throw new Error(
			`JWT config cannot be loaded. Missing environment variable: ${JWT_CONFIG_ENV_NAME} or JWT config path in test-config.json file.`
		);
	}
	return jwtConfig;
}

function getAppClient() {
	let jwtConfig = getJwtConfig();
	let sdk = BoxSDK.getPreconfiguredInstance(jwtConfig);
	let client = sdk.getAppAuthClient('enterprise');
	return client;
}

function getUserClient(userID) {
	let client = getAppClient();
	client.asUser(userID);
	return client;
}

module.exports = {
	getAppClient,
	getUserClient,
};
