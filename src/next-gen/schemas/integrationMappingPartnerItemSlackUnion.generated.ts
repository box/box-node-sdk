import { serializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { deserializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { IntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingPartnerItemSlackUnion =
  IntegrationMappingPartnerItemSlack;
export function serializeIntegrationMappingPartnerItemSlackUnion(
  val: any,
): SerializedData {
  if (val.type == 'channel') {
    return serializeIntegrationMappingPartnerItemSlack(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeIntegrationMappingPartnerItemSlackUnion(
  val: SerializedData,
): IntegrationMappingPartnerItemSlackUnion {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingPartnerItemSlackUnion"',
    });
  }
  if (val.type == 'channel') {
    return deserializeIntegrationMappingPartnerItemSlack(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingPartnerItemSlackUnion",
  });
}
