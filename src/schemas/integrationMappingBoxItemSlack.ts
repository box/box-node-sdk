import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type IntegrationMappingBoxItemSlackTypeField = 'folder';
export class IntegrationMappingBoxItemSlack {
  /**
   * Type of the mapped item referenced in `id`. */
  readonly type: IntegrationMappingBoxItemSlackTypeField =
    'folder' as IntegrationMappingBoxItemSlackTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`). */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<IntegrationMappingBoxItemSlack, 'type'> &
      Partial<Pick<IntegrationMappingBoxItemSlack, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface IntegrationMappingBoxItemSlackInput {
  /**
   * Type of the mapped item referenced in `id`. */
  readonly type?: IntegrationMappingBoxItemSlackTypeField;
  /**
   * ID of the mapped item (of type referenced in `type`). */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingBoxItemSlackTypeField(
  val: IntegrationMappingBoxItemSlackTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingBoxItemSlackTypeField(
  val: SerializedData,
): IntegrationMappingBoxItemSlackTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingBoxItemSlackTypeField",
  });
}
export function serializeIntegrationMappingBoxItemSlack(
  val: IntegrationMappingBoxItemSlack,
): SerializedData {
  return {
    ['type']: serializeIntegrationMappingBoxItemSlackTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeIntegrationMappingBoxItemSlack(
  val: SerializedData,
): IntegrationMappingBoxItemSlack {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingBoxItemSlack"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "IntegrationMappingBoxItemSlack" to be defined',
    });
  }
  const type: IntegrationMappingBoxItemSlackTypeField =
    deserializeIntegrationMappingBoxItemSlackTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingBoxItemSlack" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingBoxItemSlack"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies IntegrationMappingBoxItemSlack;
}
export function serializeIntegrationMappingBoxItemSlackInput(
  val: IntegrationMappingBoxItemSlackInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeIntegrationMappingBoxItemSlackTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeIntegrationMappingBoxItemSlackInput(
  val: SerializedData,
): IntegrationMappingBoxItemSlackInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingBoxItemSlackInput"',
    });
  }
  const type: undefined | IntegrationMappingBoxItemSlackTypeField =
    val.type == void 0
      ? void 0
      : deserializeIntegrationMappingBoxItemSlackTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingBoxItemSlackInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingBoxItemSlackInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies IntegrationMappingBoxItemSlackInput;
}
