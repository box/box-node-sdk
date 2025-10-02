import { serializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { deserializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { serializeIntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack';
import { deserializeIntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack';
import { serializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { deserializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { IntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { IntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack';
import { IntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface IntegrationMappingSlackCreateRequest {
  readonly partnerItem: IntegrationMappingPartnerItemSlack;
  readonly boxItem: IntegrationMappingBoxItemSlack;
  readonly options?: IntegrationMappingSlackOptions;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingSlackCreateRequest(
  val: IntegrationMappingSlackCreateRequest,
): SerializedData {
  return {
    ['partner_item']: serializeIntegrationMappingPartnerItemSlack(
      val.partnerItem,
    ),
    ['box_item']: serializeIntegrationMappingBoxItemSlack(val.boxItem),
    ['options']:
      val.options == void 0
        ? val.options
        : serializeIntegrationMappingSlackOptions(val.options),
  };
}
export function deserializeIntegrationMappingSlackCreateRequest(
  val: SerializedData,
): IntegrationMappingSlackCreateRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingSlackCreateRequest"',
    });
  }
  if (val.partner_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "partner_item" of type "IntegrationMappingSlackCreateRequest" to be defined',
    });
  }
  const partnerItem: IntegrationMappingPartnerItemSlack =
    deserializeIntegrationMappingPartnerItemSlack(val.partner_item);
  if (val.box_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "box_item" of type "IntegrationMappingSlackCreateRequest" to be defined',
    });
  }
  const boxItem: IntegrationMappingBoxItemSlack =
    deserializeIntegrationMappingBoxItemSlack(val.box_item);
  const options: undefined | IntegrationMappingSlackOptions =
    val.options == void 0
      ? void 0
      : deserializeIntegrationMappingSlackOptions(val.options);
  return {
    partnerItem: partnerItem,
    boxItem: boxItem,
    options: options,
  } satisfies IntegrationMappingSlackCreateRequest;
}
