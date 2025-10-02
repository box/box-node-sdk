import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type IntegrationMappingBaseTypeField = 'integration_mapping';
export class IntegrationMappingBase {
  /**
   * A unique identifier of a folder mapping
   * (part of a composite key together
   * with `integration_type`). */
  readonly id!: string;
  /**
   * Mapping type. */
  readonly type: IntegrationMappingBaseTypeField =
    'integration_mapping' as IntegrationMappingBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<IntegrationMappingBase, 'type'> &
      Partial<Pick<IntegrationMappingBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface IntegrationMappingBaseInput {
  /**
   * A unique identifier of a folder mapping
   * (part of a composite key together
   * with `integration_type`). */
  readonly id: string;
  /**
   * Mapping type. */
  readonly type?: IntegrationMappingBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingBaseTypeField(
  val: IntegrationMappingBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeIntegrationMappingBaseTypeField(
  val: SerializedData,
): IntegrationMappingBaseTypeField {
  if (val == 'integration_mapping') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize IntegrationMappingBaseTypeField",
  });
}
export function serializeIntegrationMappingBase(
  val: IntegrationMappingBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeIntegrationMappingBaseTypeField(val.type),
  };
}
export function deserializeIntegrationMappingBase(
  val: SerializedData,
): IntegrationMappingBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingBase"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "IntegrationMappingBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "IntegrationMappingBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "IntegrationMappingBase" to be defined',
    });
  }
  const type: IntegrationMappingBaseTypeField =
    deserializeIntegrationMappingBaseTypeField(val.type);
  return { id: id, type: type } satisfies IntegrationMappingBase;
}
export function serializeIntegrationMappingBaseInput(
  val: IntegrationMappingBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeIntegrationMappingBaseTypeField(val.type),
  };
}
export function deserializeIntegrationMappingBaseInput(
  val: SerializedData,
): IntegrationMappingBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "IntegrationMappingBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "IntegrationMappingBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | IntegrationMappingBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeIntegrationMappingBaseTypeField(val.type);
  return { id: id, type: type } satisfies IntegrationMappingBaseInput;
}
