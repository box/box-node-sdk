import { serializeIntegrationMappingBaseTypeField } from './integrationMappingBase';
import { deserializeIntegrationMappingBaseTypeField } from './integrationMappingBase';
import { serializeIntegrationMappingBase } from './integrationMappingBase';
import { deserializeIntegrationMappingBase } from './integrationMappingBase';
import { serializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { deserializeIntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { serializeUserIntegrationMappings } from './userIntegrationMappings';
import { deserializeUserIntegrationMappings } from './userIntegrationMappings';
import { serializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { deserializeIntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { serializeFolderMini } from './folderMini';
import { deserializeFolderMini } from './folderMini';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { IntegrationMappingBaseTypeField } from './integrationMappingBase';
import { IntegrationMappingBase } from './integrationMappingBase';
import { IntegrationMappingSlackOptions } from './integrationMappingSlackOptions';
import { UserIntegrationMappings } from './userIntegrationMappings';
import { IntegrationMappingPartnerItemSlack } from './integrationMappingPartnerItemSlack';
import { FolderMini } from './folderMini';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type IntegrationMappingIntegrationTypeField = 'slack' | string;
export class IntegrationMapping extends IntegrationMappingBase {
  readonly integrationType?: IntegrationMappingIntegrationTypeField;
  readonly isManuallyCreated?: boolean;
  readonly options?: IntegrationMappingSlackOptions;
  readonly createdBy?: UserIntegrationMappings;
  readonly modifiedBy?: UserIntegrationMappings;
  readonly partnerItem!: IntegrationMappingPartnerItemSlack;
  readonly boxItem!: FolderMini;
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  constructor(fields: IntegrationMapping) {
    super(fields);
    if (fields.integrationType !== undefined) {
      this.integrationType = fields.integrationType;
    }
    if (fields.isManuallyCreated !== undefined) {
      this.isManuallyCreated = fields.isManuallyCreated;
    }
    if (fields.options !== undefined) {
      this.options = fields.options;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.modifiedBy !== undefined) {
      this.modifiedBy = fields.modifiedBy;
    }
    if (fields.partnerItem !== undefined) {
      this.partnerItem = fields.partnerItem;
    }
    if (fields.boxItem !== undefined) {
      this.boxItem = fields.boxItem;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
  }
}
export function serializeIntegrationMappingIntegrationTypeField(
  val: IntegrationMappingIntegrationTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingIntegrationTypeField(
  val: SerializedData,
): IntegrationMappingIntegrationTypeField {
  if (val == 'slack') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingIntegrationTypeField",
  });
}
export function serializeIntegrationMapping(
  val: IntegrationMapping,
): SerializedData {
  const base: any = serializeIntegrationMappingBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMapping"',
    });
  }
  return {
    ...base,
    ...{
      ['integration_type']:
        val.integrationType == void 0
          ? val.integrationType
          : serializeIntegrationMappingIntegrationTypeField(
              val.integrationType,
            ),
      ['is_manually_created']: val.isManuallyCreated,
      ['options']:
        val.options == void 0
          ? val.options
          : serializeIntegrationMappingSlackOptions(val.options),
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserIntegrationMappings(val.createdBy),
      ['modified_by']:
        val.modifiedBy == void 0
          ? val.modifiedBy
          : serializeUserIntegrationMappings(val.modifiedBy),
      ['partner_item']: serializeIntegrationMappingPartnerItemSlack(
        val.partnerItem,
      ),
      ['box_item']: serializeFolderMini(val.boxItem),
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
    },
  };
}
export function deserializeIntegrationMapping(
  val: SerializedData,
): IntegrationMapping {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMapping"',
    });
  }
  const integrationType: undefined | IntegrationMappingIntegrationTypeField =
    val.integration_type == void 0
      ? void 0
      : deserializeIntegrationMappingIntegrationTypeField(val.integration_type);
  if (
    !(val.is_manually_created == void 0) &&
    !sdIsBoolean(val.is_manually_created)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_manually_created" of type "IntegrationMapping"',
    });
  }
  const isManuallyCreated: undefined | boolean =
    val.is_manually_created == void 0 ? void 0 : val.is_manually_created;
  const options: undefined | IntegrationMappingSlackOptions =
    val.options == void 0
      ? void 0
      : deserializeIntegrationMappingSlackOptions(val.options);
  const createdBy: undefined | UserIntegrationMappings =
    val.created_by == void 0
      ? void 0
      : deserializeUserIntegrationMappings(val.created_by);
  const modifiedBy: undefined | UserIntegrationMappings =
    val.modified_by == void 0
      ? void 0
      : deserializeUserIntegrationMappings(val.modified_by);
  if (val.partner_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "partner_item" of type "IntegrationMapping" to be defined',
    });
  }
  const partnerItem: IntegrationMappingPartnerItemSlack =
    deserializeIntegrationMappingPartnerItemSlack(val.partner_item);
  if (val.box_item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "box_item" of type "IntegrationMapping" to be defined',
    });
  }
  const boxItem: FolderMini = deserializeFolderMini(val.box_item);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "IntegrationMapping"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "IntegrationMapping"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "IntegrationMapping" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "IntegrationMapping"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "IntegrationMapping" to be defined',
    });
  }
  const type: IntegrationMappingBaseTypeField =
    deserializeIntegrationMappingBaseTypeField(val.type);
  return {
    integrationType: integrationType,
    isManuallyCreated: isManuallyCreated,
    options: options,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    partnerItem: partnerItem,
    boxItem: boxItem,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    id: id,
    type: type,
  } satisfies IntegrationMapping;
}
