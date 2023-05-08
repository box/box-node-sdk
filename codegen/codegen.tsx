import * as path from 'path';
import shell from 'shelljs';
import { generateManagerClasses } from './generate-manager-classes';

(async () => {
	try {
		const generatedFilePaths = shell
			.find(path.join(__dirname, '../src'))
			.filter((file) => file.match(/\.generated.ts$/));
		shell.rm(...generatedFilePaths);

		const spec = require('../openapi.json');
		await generateManagerClasses(
			[
				{
					name: 'SignRequestsManager', // avoid name clash with SignRequests schema
					comment:
						'Simple manager for interacting with all Sign Requests endpoints and actions.',
					relativePath: '../src/managers/sign-requests.generated.ts',
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
				},
				{
					name: 'ShieldInformationBarrierManager',
					comment: '',
					relativePath:
						'../src/managers/shield-information-barriers.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_shield_information_barriers_id',
						},
						{
							name: 'getAll',
							operationId: 'get_shield_information_barriers',
						},
						{
							name: 'create',
							operationId: 'post_shield_information_barriers',
						},
						{
							name: 'changeStatusById',
							operationId: 'post_shield_information_barriers_change_status',
						},
					],
				},
				{
					name: 'ShieldInformationBarrierSegmentsManager',
					comment: '',
					relativePath:
						'../src/managers/shield-information-barrier-segments.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_shield_information_barrier_segments_id',
						},
						{
							name: 'getAll',
							operationId: 'get_shield_information_barrier_segments',
						},
						{
							name: 'create',
							operationId: 'post_shield_information_barrier_segments',
						},
						{
							name: 'update',
							operationId: 'put_shield_information_barrier_segments_id',
						},
						{
							name: 'deleteById',
							operationId: 'delete_shield_information_barrier_segments_id',
						},
					],
				},
				{
					name: 'ShieldInformationBarrierSegmentMembersManager',
					comment: '',
					relativePath:
						'../src/managers/shield-information-barrier-segment-members.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_shield_information_barrier_segment_members_id',
						},
						{
							name: 'getAll',
							operationId: 'get_shield_information_barrier_segment_members',
						},
						{
							name: 'create',
							operationId: 'post_shield_information_barrier_segment_members',
						},
						{
							name: 'deleteById',
							operationId: 'delete_shield_information_barrier_segment_members_id',
						},
					],
				},
			],
			spec
		);
	} catch (e) {
		console.error(e);
	}
})();
