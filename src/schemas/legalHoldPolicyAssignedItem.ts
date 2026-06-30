import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type LegalHoldPolicyAssignedItemTypeField =
  'file' | 'file_version' | 'folder' | 'user' | 'ownership' | 'interactions';
export interface LegalHoldPolicyAssignedItem {
  /**
   * The type of item the policy is assigned to. */
  readonly type: LegalHoldPolicyAssignedItemTypeField;
  /**
   * The ID of the item the policy is assigned to. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeLegalHoldPolicyAssignedItemTypeField(
  val: LegalHoldPolicyAssignedItemTypeField,
): SerializedData {
  return val;
}
export function deserializeLegalHoldPolicyAssignedItemTypeField(
  val: SerializedData,
): LegalHoldPolicyAssignedItemTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'file_version') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'user') {
    return val;
  }
  if (val == 'ownership') {
    return val;
  }
  if (val == 'interactions') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize LegalHoldPolicyAssignedItemTypeField",
  });
}
export function serializeLegalHoldPolicyAssignedItem(
  val: LegalHoldPolicyAssignedItem,
): SerializedData {
  return {
    ['type']: serializeLegalHoldPolicyAssignedItemTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeLegalHoldPolicyAssignedItem(
  val: SerializedData,
): LegalHoldPolicyAssignedItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignedItem"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "LegalHoldPolicyAssignedItem" to be defined',
    });
  }
  const type: LegalHoldPolicyAssignedItemTypeField =
    deserializeLegalHoldPolicyAssignedItemTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "LegalHoldPolicyAssignedItem" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "LegalHoldPolicyAssignedItem"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies LegalHoldPolicyAssignedItem;
}
