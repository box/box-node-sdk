import { serializeIntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { serializeFolderReference } from './folderReference.generated.js';
import { deserializeFolderReference } from './folderReference.generated.js';
import { IntegrationMappingPartnerItemTeamsCreateRequest } from './integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { FolderReference } from './folderReference.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
