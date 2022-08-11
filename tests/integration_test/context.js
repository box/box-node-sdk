'use strict';

/* eslint-disable node/no-missing-require */
const BoxSDK = require('box-node-sdk');

const testConfig = require('./test-config.json');
const JWT_FILE_PATH_ENV_NAME = 'JWT_FILE_PATH';

function getJwtConfigFromFile() {
	let jwtFilePath = testConfig.jwt_file_path;
	if (!jwtFilePath) {
		return null;
	}
	const jwtConfig = require(jwtFilePath);
	return jwtConfig;
}

function getJwtConfigFromEnv() {
	let jwtFilePath = process.env[JWT_FILE_PATH_ENV_NAME];
	if (!jwtFilePath) {
		return null;
	}
	const jwtConfig = require(jwtFilePath);
	return jwtConfig;
}

function getJwtConfig() {
	let jwtConfig = getJwtConfigFromFile() || getJwtConfigFromEnv();
	if (!jwtConfig) {
		throw new Error(
			`JWT config cannot be loaded. Missing environment variable: ${JWT_FILE_PATH_ENV_NAME} or JWT config path.`
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
