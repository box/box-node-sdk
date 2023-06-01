import * as schemas from '.';
/**
 * Integration mapping mapped item schema for type Slack
 *
 * The schema for an integration mapping mapped item object for type Slack
 */
export interface IntegrationMappingPartnerItemSlack {
	/**
	 * Type of the mapped item referenced in `id`
	 * Example: channel
	 */
	type: 'channel';
	/**
	 * ID of the mapped item (of type referenced in `type`)
	 * Example: C12378991223
	 */
	id: string;
	/**
	 * ID of the Slack workspace with which the item is associated
	 * Example: T12352314
	 */
	slack_workspace_id?: string;
	/**
	 * ID of the Slack organization with which the item is associated
	 * Example: E1234567
	 */
	slack_org_id?: string;
}
