import * as schemas from '.';
/**
 * Integration mapping options for type Slack
 *
 * The schema for an integration mapping options object for Slack type.
 */
export interface IntegrationMappingSlackOptions {
	/**
	 * Indicates whether or not channel member
	 * access to the underlying box item
	 * should be automatically managed.
	 * Depending on type of channel, access is managed
	 * through creating collaborations or shared links.
	 * Example: true
	 */
	is_access_management_disabled?: boolean;
}
