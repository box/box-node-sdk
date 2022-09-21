'use strict';

const path = require('path');
const { createBoxTestFile } = require('./box-test-file');

const createBoxTestSignRequest = async(client, parentFolderID = '0') => {
	const file = await createBoxTestFile(client, path.join(__dirname, '../resources/blank.pdf'), 'blank.pdf', parentFolderID);
	const sr = await client.signRequests.create({
		signers: [
			{
				email: 'sdk_integration_test@boxdemo.com',
				role: 'signer',
				redirect_url: 'https://www.box.com/redirect_url_signer_1',
				declined_redirect_url: 'https://www.box.com/declined_redirect_url_singer_1',
			}
		],
		source_files: [
			{
				type: 'file',
				id: file.id,
			}
		],
		parent_folder: {
			id: parentFolderID,
			type: 'folder',
		},
		redirect_url: 'https://www.box.com/redirect_url',
		declined_redirect_url: 'https://www.box.com/declined_redirect_url',
	});
	sr.dispose = async() => {
		await client.signRequests.cancelById({
			sign_request_id: sr.id,
		});
		await file.dispose();
	};
	return sr;
};

module.exports = {
	createBoxTestSignRequest,
};
