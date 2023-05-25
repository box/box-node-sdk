import * as schemas from '.';
/**
 * Integration mapping (Base)
 *
 * A base representation of an
 * integration mapping object.
 */
export interface IntegrationMappingBase {
	/**
	 * A unique identifier of a folder mapping
	 * (part of a composite key together
	 * with `integration_type`)
	 * Example: 12345
	 */
	id?: string;
	/**
	 * Identifies the Box partner app,
	 * with which the mapping is associated.
	 * Currently only supports Slack.
	 * (part of the composite key together with `id`)
	 * Example: slack
	 */
	integration_type?: 'slack';
}
