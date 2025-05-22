import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingPartnerItemTeamsCreateRequestTypeField =
  | 'channel'
  | 'team';
export interface IntegrationMappingPartnerItemTeamsCreateRequest {
  /**
   * Type of the mapped item referenced in `id` */
  readonly type: IntegrationMappingPartnerItemTeamsCreateRequestTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`) */
  readonly id: string;
  /**
   * ID of the tenant that is registered with Microsoft Teams. */
  readonly tenantId: string;
  /**
   * ID of the team that is registered with Microsoft Teams. */
  readonly teamId: string;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField(
  val: IntegrationMappingPartnerItemTeamsCreateRequestTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField(
  val: SerializedData,
): IntegrationMappingPartnerItemTeamsCreateRequestTypeField {
  if (val == 'channel') {
    return val;
  }
  if (val == 'team') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize IntegrationMappingPartnerItemTeamsCreateRequestTypeField",
  });
}
export function serializeIntegrationMappingPartnerItemTeamsCreateRequest(
  val: IntegrationMappingPartnerItemTeamsCreateRequest,
): SerializedData {
  return {
    ['type']: serializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField(
      val.type,
    ),
    ['id']: val.id,
    ['tenant_id']: val.tenantId,
    ['team_id']: val.teamId,
  };
}
export function deserializeIntegrationMappingPartnerItemTeamsCreateRequest(
  val: SerializedData,
): IntegrationMappingPartnerItemTeamsCreateRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "IntegrationMappingPartnerItemTeamsCreateRequest"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "IntegrationMappingPartnerItemTeamsCreateRequest" to be defined',
    });
  }
  const type: IntegrationMappingPartnerItemTeamsCreateRequestTypeField =
    deserializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField(
      val.type,
    );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingPartnerItemTeamsCreateRequest" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingPartnerItemTeamsCreateRequest"',
    });
  }
  const id: string = val.id;
  if (val.tenant_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "tenant_id" of type "IntegrationMappingPartnerItemTeamsCreateRequest" to be defined',
    });
  }
  if (!sdIsString(val.tenant_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "tenant_id" of type "IntegrationMappingPartnerItemTeamsCreateRequest"',
    });
  }
  const tenantId: string = val.tenant_id;
  if (val.team_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "team_id" of type "IntegrationMappingPartnerItemTeamsCreateRequest" to be defined',
    });
  }
  if (!sdIsString(val.team_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "team_id" of type "IntegrationMappingPartnerItemTeamsCreateRequest"',
    });
  }
  const teamId: string = val.team_id;
  return {
    type: type,
    id: id,
    tenantId: tenantId,
    teamId: teamId,
  } satisfies IntegrationMappingPartnerItemTeamsCreateRequest;
}
