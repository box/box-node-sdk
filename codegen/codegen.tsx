import * as path from 'path';
import shell from 'shelljs';
import { generateManagerClass } from './generate-manager-class';

(async () => {
	try {
		const generatedFilePaths = shell
			.find(path.join(__dirname, '../src'))
			.filter((file) => file.match(/\.generated.ts$/));
		shell.rm(...generatedFilePaths);

		const spec = require('../openapi.json');
		await generateManagerClass({
			name: 'SignRequestsManager', // avoid name clash with SignRequests schema
			comment:
				'Simple manager for interacting with all Sign Requests endpoints and actions.',
			relativePath: '../src/managers/sign-requests.generated.ts',
			spec,
			operations: [
				{
					name: 'getById',
					operationId: 'get_sign_requests_id',
				},
				{
					name: 'getAll',
					operationId: 'get_sign_requests',
				},
				{
					name: 'create',
					operationId: 'post_sign_requests',
				},
				{
					name: 'cancelById',
					operationId: 'post_sign_requests_id_cancel',
				},
				{
					name: 'resendById',
					operationId: 'post_sign_requests_id_resend',
				},
			],
		});
	} catch (e) {
		console.error(e);
	}
})();
