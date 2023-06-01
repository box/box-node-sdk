import * as schemas from '.';
/**
 * Integration mapping Box item schema for type Slack
 *
 * The schema for an integration mapping Box item object for type Slack
 */
export interface IntegrationMappingBoxItemSlack {
	/**
	 * Type of the mapped item referenced in `id`
	 * Example: folder
	 */
	type: 'folder';
	/**
	 * ID of the mapped item (of type referenced in `type`)
	 * Example: 1234567891
	 */
	id: string;
}
