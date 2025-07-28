import { serializeIntegrationMappingPartnerItemTeams } from './integrationMappingPartnerItemTeams.generated.js';
import { deserializeIntegrationMappingPartnerItemTeams } from './integrationMappingPartnerItemTeams.generated.js';
import { IntegrationMappingPartnerItemTeams } from './integrationMappingPartnerItemTeams.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingPartnerItemTeamsUnion =
  IntegrationMappingPartnerItemTeams;
export function serializeIntegrationMappingPartnerItemTeamsUnion(
  val: any,
): SerializedData {
  if (val.type == 'channel') {
    return serializeIntegrationMappingPartnerItemTeams(val);
  }
  if (val.type == 'team') {
    return serializeIntegrationMappingPartnerItemTeams(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeIntegrationMappingPartnerItemTeamsUnion(
  val: SerializedData,
): IntegrationMappingPartnerItemTeamsUnion {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingPartnerItemTeamsUnion"',
    });
  }
  if (val.type == 'channel') {
    return deserializeIntegrationMappingPartnerItemTeams(val);
  }
  if (val.type == 'team') {
    return deserializeIntegrationMappingPartnerItemTeams(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingPartnerItemTeamsUnion",
  });
}
