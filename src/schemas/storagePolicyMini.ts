import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type StoragePolicyMiniTypeField = 'storage_policy';
export class StoragePolicyMini {
  /**
   * The unique identifier for this storage policy. */
  readonly id!: string;
  /**
   * The value will always be `storage_policy`. */
  readonly type: StoragePolicyMiniTypeField =
    'storage_policy' as StoragePolicyMiniTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<StoragePolicyMini, 'type'> &
      Partial<Pick<StoragePolicyMini, 'type'>>,
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
export interface StoragePolicyMiniInput {
  /**
   * The unique identifier for this storage policy. */
  readonly id: string;
  /**
   * The value will always be `storage_policy`. */
  readonly type?: StoragePolicyMiniTypeField;
  readonly rawData?: SerializedData;
}
export function serializeStoragePolicyMiniTypeField(
  val: StoragePolicyMiniTypeField,
): SerializedData {
  return val;
}
export function deserializeStoragePolicyMiniTypeField(
  val: SerializedData,
): StoragePolicyMiniTypeField {
  if (val == 'storage_policy') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize StoragePolicyMiniTypeField",
  });
}
export function serializeStoragePolicyMini(
  val: StoragePolicyMini,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeStoragePolicyMiniTypeField(val.type),
  };
}
export function deserializeStoragePolicyMini(
  val: SerializedData,
): StoragePolicyMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StoragePolicyMini"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "StoragePolicyMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "StoragePolicyMini"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "StoragePolicyMini" to be defined',
    });
  }
  const type: StoragePolicyMiniTypeField =
    deserializeStoragePolicyMiniTypeField(val.type);
  return { id: id, type: type } satisfies StoragePolicyMini;
}
export function serializeStoragePolicyMiniInput(
  val: StoragePolicyMiniInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeStoragePolicyMiniTypeField(val.type),
  };
}
export function deserializeStoragePolicyMiniInput(
  val: SerializedData,
): StoragePolicyMiniInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StoragePolicyMiniInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "StoragePolicyMiniInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "StoragePolicyMiniInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | StoragePolicyMiniTypeField =
    val.type == void 0
      ? void 0
      : deserializeStoragePolicyMiniTypeField(val.type);
  return { id: id, type: type } satisfies StoragePolicyMiniInput;
}
