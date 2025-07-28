import { serializeStoragePolicyMini } from './storagePolicyMini.generated.js';
import { deserializeStoragePolicyMini } from './storagePolicyMini.generated.js';
import { StoragePolicyMini } from './storagePolicyMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type StoragePolicyAssignmentTypeField = 'storage_policy_assignment';
export interface StoragePolicyAssignmentAssignedToField {
  /**
   * The unique identifier for this object. */
  readonly id?: string;
  /**
   * The type for this object. */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export class StoragePolicyAssignment {
  /**
   * The unique identifier for a storage policy assignment. */
  readonly id!: string;
  /**
   * The value will always be `storage_policy_assignment`. */
  readonly type: StoragePolicyAssignmentTypeField =
    'storage_policy_assignment' as StoragePolicyAssignmentTypeField;
  readonly storagePolicy?: StoragePolicyMini;
  readonly assignedTo?: StoragePolicyAssignmentAssignedToField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<StoragePolicyAssignment, 'type'> &
      Partial<Pick<StoragePolicyAssignment, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.storagePolicy !== undefined) {
      this.storagePolicy = fields.storagePolicy;
    }
    if (fields.assignedTo !== undefined) {
      this.assignedTo = fields.assignedTo;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface StoragePolicyAssignmentInput {
  /**
   * The unique identifier for a storage policy assignment. */
  readonly id: string;
  /**
   * The value will always be `storage_policy_assignment`. */
  readonly type?: StoragePolicyAssignmentTypeField;
  readonly storagePolicy?: StoragePolicyMini;
  readonly assignedTo?: StoragePolicyAssignmentAssignedToField;
  readonly rawData?: SerializedData;
}
export function serializeStoragePolicyAssignmentTypeField(
  val: StoragePolicyAssignmentTypeField,
): SerializedData {
  return val;
}
export function deserializeStoragePolicyAssignmentTypeField(
  val: SerializedData,
): StoragePolicyAssignmentTypeField {
  if (val == 'storage_policy_assignment') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize StoragePolicyAssignmentTypeField",
  });
}
export function serializeStoragePolicyAssignmentAssignedToField(
  val: StoragePolicyAssignmentAssignedToField,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeStoragePolicyAssignmentAssignedToField(
  val: SerializedData,
): StoragePolicyAssignmentAssignedToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StoragePolicyAssignmentAssignedToField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "StoragePolicyAssignmentAssignedToField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "StoragePolicyAssignmentAssignedToField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return {
    id: id,
    type: type,
  } satisfies StoragePolicyAssignmentAssignedToField;
}
export function serializeStoragePolicyAssignment(
  val: StoragePolicyAssignment,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeStoragePolicyAssignmentTypeField(val.type),
    ['storage_policy']:
      val.storagePolicy == void 0
        ? val.storagePolicy
        : serializeStoragePolicyMini(val.storagePolicy),
    ['assigned_to']:
      val.assignedTo == void 0
        ? val.assignedTo
        : serializeStoragePolicyAssignmentAssignedToField(val.assignedTo),
  };
}
export function deserializeStoragePolicyAssignment(
  val: SerializedData,
): StoragePolicyAssignment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StoragePolicyAssignment"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "StoragePolicyAssignment" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "StoragePolicyAssignment"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "StoragePolicyAssignment" to be defined',
    });
  }
  const type: StoragePolicyAssignmentTypeField =
    deserializeStoragePolicyAssignmentTypeField(val.type);
  const storagePolicy: undefined | StoragePolicyMini =
    val.storage_policy == void 0
      ? void 0
      : deserializeStoragePolicyMini(val.storage_policy);
  const assignedTo: undefined | StoragePolicyAssignmentAssignedToField =
    val.assigned_to == void 0
      ? void 0
      : deserializeStoragePolicyAssignmentAssignedToField(val.assigned_to);
  return {
    id: id,
    type: type,
    storagePolicy: storagePolicy,
    assignedTo: assignedTo,
  } satisfies StoragePolicyAssignment;
}
export function serializeStoragePolicyAssignmentInput(
  val: StoragePolicyAssignmentInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeStoragePolicyAssignmentTypeField(val.type),
    ['storage_policy']:
      val.storagePolicy == void 0
        ? val.storagePolicy
        : serializeStoragePolicyMini(val.storagePolicy),
    ['assigned_to']:
      val.assignedTo == void 0
        ? val.assignedTo
        : serializeStoragePolicyAssignmentAssignedToField(val.assignedTo),
  };
}
export function deserializeStoragePolicyAssignmentInput(
  val: SerializedData,
): StoragePolicyAssignmentInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StoragePolicyAssignmentInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "StoragePolicyAssignmentInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "StoragePolicyAssignmentInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | StoragePolicyAssignmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeStoragePolicyAssignmentTypeField(val.type);
  const storagePolicy: undefined | StoragePolicyMini =
    val.storage_policy == void 0
      ? void 0
      : deserializeStoragePolicyMini(val.storage_policy);
  const assignedTo: undefined | StoragePolicyAssignmentAssignedToField =
    val.assigned_to == void 0
      ? void 0
      : deserializeStoragePolicyAssignmentAssignedToField(val.assigned_to);
  return {
    id: id,
    type: type,
    storagePolicy: storagePolicy,
    assignedTo: assignedTo,
  } satisfies StoragePolicyAssignmentInput;
}
