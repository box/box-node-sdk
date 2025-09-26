import { serializeIntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest';
import { serializeFolderReference } from './folderReference';
import { deserializeFolderReference } from './folderReference';
import { IntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest';
import { FolderReference } from './folderReference';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface IntegrationMappingTeamsCreateRequest {
  readonly partnerItem: IntegrationMappingPartnerItemTeamsCreateRequest;
  readonly boxItem: FolderReference;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingTeamsCreateRequest(
  val: IntegrationMappingTeamsCreateRequest,
): SerializedData {
  return {
    ['partner_item']: serializeIntegrationMappingPartnerItemTeamsCreateRequest(
      val.partnerItem,
    ),
    ['box_item']: serializeFolderReference(val.boxItem),
  };
}
export function deserializeIntegrationMappingTeamsCreateRequest(
  val: SerializedData,
): IntegrationMappingTeamsCreateRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingTeamsCreateRequest"',
    });
  }
  if (val.partner_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "partner_item" of type "IntegrationMappingTeamsCreateRequest" to be defined',
    });
  }
  const partnerItem: IntegrationMappingPartnerItemTeamsCreateRequest =
    deserializeIntegrationMappingPartnerItemTeamsCreateRequest(
      val.partner_item,
    );
  if (val.box_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "box_item" of type "IntegrationMappingTeamsCreateRequest" to be defined',
    });
  }
  const boxItem: FolderReference = deserializeFolderReference(val.box_item);
  return {
    partnerItem: partnerItem,
    boxItem: boxItem,
  } satisfies IntegrationMappingTeamsCreateRequest;
}
