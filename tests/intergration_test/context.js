'use strict';

const BoxSDK = require('box-node-sdk');
const testConfig = require('./test-config.json');
const JWT_FILE_PATH_ENV_NAME = 'JWT_FILE_PATH';

function getJwtConfig() {
	let jwtConfig = getJwtConfigFromFile() || getJwtConfigFromEnv();
	if (!jwtConfig) { throw new Error(`JWT config cannot be loaded. Missing environment variable: ${JWT_FILE_PATH_ENV_NAME} or JWT config path.`); }
	return jwtConfig;
}

function getJwtConfigFromFile() {
	let jwtFilePath = testConfig.jwt_file_path;
	if (!jwtFilePath) { return null; }
	const jwtConfig = require(jwtFilePath);
	return jwtConfig;
}

function getJwtConfigFromEnv() {
	let jwtFilePath = process.env[JWT_FILE_PATH_ENV_NAME];
	if (!jwtFilePath) { return null; }
	const jwtConfig = require(jwtFilePath);
	return jwtConfig;
}

function getClient() {
	let jwtConfig = getJwtConfig();
	let sdk = BoxSDK.getPreconfiguredInstance(jwtConfig);
	let client = sdk.getAppAuthClient('enterprise');
	return client;
}

exports.CLIENT = getClient();
