import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type RetentionPolicyBaseTypeField = 'retention_policy';
export class RetentionPolicyBase {
  /**
   * The unique identifier that represents a retention policy. */
  readonly id!: string;
  /**
   * The value will always be `retention_policy`. */
  readonly type: RetentionPolicyBaseTypeField =
    'retention_policy' as RetentionPolicyBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<RetentionPolicyBase, 'type'> &
      Partial<Pick<RetentionPolicyBase, 'type'>>,
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
export interface RetentionPolicyBaseInput {
  /**
   * The unique identifier that represents a retention policy. */
  readonly id: string;
  /**
   * The value will always be `retention_policy`. */
  readonly type?: RetentionPolicyBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeRetentionPolicyBaseTypeField(
  val: RetentionPolicyBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyBaseTypeField(
  val: SerializedData,
): RetentionPolicyBaseTypeField {
  if (val == 'retention_policy') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyBaseTypeField",
  });
}
export function serializeRetentionPolicyBase(
  val: RetentionPolicyBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeRetentionPolicyBaseTypeField(val.type),
  };
}
export function deserializeRetentionPolicyBase(
  val: SerializedData,
): RetentionPolicyBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RetentionPolicyBase"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "RetentionPolicyBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "RetentionPolicyBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "RetentionPolicyBase" to be defined',
    });
  }
  const type: RetentionPolicyBaseTypeField =
    deserializeRetentionPolicyBaseTypeField(val.type);
  return { id: id, type: type } satisfies RetentionPolicyBase;
}
export function serializeRetentionPolicyBaseInput(
  val: RetentionPolicyBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeRetentionPolicyBaseTypeField(val.type),
  };
}
export function deserializeRetentionPolicyBaseInput(
  val: SerializedData,
): RetentionPolicyBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RetentionPolicyBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "RetentionPolicyBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "RetentionPolicyBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | RetentionPolicyBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeRetentionPolicyBaseTypeField(val.type);
  return { id: id, type: type } satisfies RetentionPolicyBaseInput;
}
