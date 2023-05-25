import * as schemas from '.';
/**
 * Integration mapping
 *
 * A standard representation of an integration
 * mapping object.
 */
export interface IntegrationMapping extends schemas.IntegrationMappingBase {
	/**
	 * Mapping type
	 * Example: integration_mapping
	 */
	type: 'integration_mapping';
	/**
	 * Mapped item object for Slack
	 */
	partner_item: schemas.IntegrationMappingPartnerItemSlack;
	/**
	 * The Box folder, to which the object from the
	 * partner app domain (referenced in `partner_item_id`) is mapped
	 */
	box_item: schemas.FolderMini;
	/**
	 * Identifies whether the mapping has
	 * been manually set
	 * (as opposed to being automatically created)
	 * Example: true
	 */
	is_manually_created?: boolean;
	/**
	 * Integration mapping options for Slack
	 * Example: [object Object]
	 */
	options?: schemas.IntegrationMappingSlackOptions;
	/**
	 * An object representing the user who
	 * created the integration mapping
	 */
	created_by?: schemas.UserIntegrationMappings;
	/**
	 * The user who
	 * last modified the integration mapping
	 */
	modified_by?: schemas.UserIntegrationMappings;
	/**
	 * When the integration mapping object was created
	 * Example: 2012-12-12T10:53:43-08:00
	 */
	created_at?: string;
	/**
	 * When the integration mapping object was last modified
	 * Example: 2012-12-12T10:53:43-08:00
	 */
	modified_at?: string;
}
