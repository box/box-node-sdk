import * as schemas from '.';
/**
 * Create integration mapping request
 *
 * A request to create a
 * Slack Integration Mapping object
 */
export interface IntegrationMappingSlackCreateRequest {
	partner_item: schemas.IntegrationMappingPartnerItemSlack;
	box_item: schemas.IntegrationMappingBoxItemSlack;
	options?: schemas.IntegrationMappingSlackOptions;
}
