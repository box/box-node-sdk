import { serializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { deserializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { serializeIntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack.generated.js';
import { deserializeIntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack.generated.js';
import { serializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions.generated.js';
import { deserializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions.generated.js';
import { IntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { IntegrationMappingBoxItemSlack } from './integrationMappingBoxItemSlack.generated.js';
import { IntegrationMappingSlackOptions } from './integrationMappingSlackOptions.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
