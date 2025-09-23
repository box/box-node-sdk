import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingPartnerItemTeamsTypeField = 'channel' | 'team';
export interface IntegrationMappingPartnerItemTeams {
  /**
   * Type of the mapped item referenced in `id`. */
  readonly type: IntegrationMappingPartnerItemTeamsTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`). */
  readonly id: string;
  /**
   * ID of the tenant that is registered with Microsoft Teams. */
  readonly tenantId: string;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingPartnerItemTeamsTypeField(
  val: IntegrationMappingPartnerItemTeamsTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingPartnerItemTeamsTypeField(
  val: SerializedData,
): IntegrationMappingPartnerItemTeamsTypeField {
  if (val == 'channel') {
    return val;
  }
  if (val == 'team') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingPartnerItemTeamsTypeField",
  });
}
export function serializeIntegrationMappingPartnerItemTeams(
  val: IntegrationMappingPartnerItemTeams,
): SerializedData {
  return {
    ['type']: serializeIntegrationMappingPartnerItemTeamsTypeField(val.type),
    ['id']: val.id,
    ['tenant_id']: val.tenantId,
  };
}
export function deserializeIntegrationMappingPartnerItemTeams(
  val: SerializedData,
): IntegrationMappingPartnerItemTeams {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingPartnerItemTeams"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "IntegrationMappingPartnerItemTeams" to be defined',
    });
  }
  const type: IntegrationMappingPartnerItemTeamsTypeField =
    deserializeIntegrationMappingPartnerItemTeamsTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingPartnerItemTeams" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingPartnerItemTeams"',
    });
  }
  const id: string = val.id;
  if (val.tenant_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "tenant_id" of type "IntegrationMappingPartnerItemTeams" to be defined',
    });
  }
  if (!sdIsString(val.tenant_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "tenant_id" of type "IntegrationMappingPartnerItemTeams"',
    });
  }
  const tenantId: string = val.tenant_id;
  return {
    type: type,
    id: id,
    tenantId: tenantId,
  } satisfies IntegrationMappingPartnerItemTeams;
}
