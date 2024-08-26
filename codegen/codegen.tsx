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
					name: 'SignTemplatesManager',
					comment:
						'Simple manager for interacting with all Sign Templates endpoints and actions.',
					relativePath: '../src/managers/sign-templates.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_sign_templates_id',
						},
						{
							name: 'getAll',
							operationId: 'get_sign_templates',
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
				{
					name: 'ShieldInformationBarrierSegmentRestrictionsManager',
					comment: '',
					relativePath:
						'../src/managers/shield-information-barrier-segment-restrictions.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_shield_information_barrier_segment_restrictions_id',
						},
						{
							name: 'getAll',
							operationId: 'get_shield_information_barrier_segment_restrictions',
						},
						{
							name: 'create',
							operationId: 'post_shield_information_barrier_segment_restrictions',
						},
						{
							name: 'deleteById',
							operationId: 'delete_shield_information_barrier_segment_restrictions_id',
						},
					],
				},
				{
					name: 'ShieldInformationBarrierReportsManager',
					comment: '',
					relativePath:
						'../src/managers/shield-information-barrier-reports.generated.ts',
					operations: [
						{
							name: 'getById',
							operationId: 'get_shield_information_barrier_reports_id',
						},
						{
							name: 'getAll',
							operationId: 'get_shield_information_barrier_reports',
						},
						{
							name: 'create',
							operationId: 'post_shield_information_barrier_reports',
						},
					],
				},
				{
					name: 'AIManager',
					comment: '',
					relativePath: '../src/managers/ai.generated.ts',
					operations: [
						{
							name: 'ask',
							operationId: 'post_ai_ask',
						},
						{
							name: 'textGen',
							operationId: 'post_ai_text_gen',
						},
						{
							name: 'getAiAgentDefaultConfig',
							operationId: 'get_ai_agent_default',
						}
					]
				}
			],
			spec
		);
	} catch (e) {
		console.error(e);
	}
})();
