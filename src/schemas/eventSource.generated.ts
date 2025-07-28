import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type EventSourceItemTypeField = 'file' | 'folder';
export interface EventSourceClassificationField {
  /**
   * The classification's name. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export interface EventSource {
  /**
   * The type of the item that the event
   * represents. Can be `file` or `folder`. */
  readonly itemType: EventSourceItemTypeField;
  /**
   * The unique identifier that represents the
   * item. */
  readonly itemId: string;
  /**
   * The name of the item. */
  readonly itemName: string;
  /**
   * The object containing classification information for the item that
   * triggered the event. This field will not appear if the item does not
   * have a classification set. */
  readonly classification?: EventSourceClassificationField;
  readonly parent?: FolderMini | null;
  readonly ownedBy?: UserMini;
  readonly rawData?: SerializedData;
}
export function serializeEventSourceItemTypeField(
  val: EventSourceItemTypeField,
): SerializedData {
  return val;
}
export function deserializeEventSourceItemTypeField(
  val: SerializedData,
): EventSourceItemTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EventSourceItemTypeField",
  });
}
export function serializeEventSourceClassificationField(
  val: EventSourceClassificationField,
): SerializedData {
  return { ['name']: val.name };
}
export function deserializeEventSourceClassificationField(
  val: SerializedData,
): EventSourceClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EventSourceClassificationField"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "EventSourceClassificationField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { name: name } satisfies EventSourceClassificationField;
}
export function serializeEventSource(val: EventSource): SerializedData {
  return {
    ['item_type']: serializeEventSourceItemTypeField(val.itemType),
    ['item_id']: val.itemId,
    ['item_name']: val.itemName,
    ['classification']:
      val.classification == void 0
        ? val.classification
        : serializeEventSourceClassificationField(val.classification),
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['owned_by']:
      val.ownedBy == void 0 ? val.ownedBy : serializeUserMini(val.ownedBy),
  };
}
export function deserializeEventSource(val: SerializedData): EventSource {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "EventSource"' });
  }
  if (val.item_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_type" of type "EventSource" to be defined',
    });
  }
  const itemType: EventSourceItemTypeField =
    deserializeEventSourceItemTypeField(val.item_type);
  if (val.item_id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_id" of type "EventSource" to be defined',
    });
  }
  if (!sdIsString(val.item_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "item_id" of type "EventSource"',
    });
  }
  const itemId: string = val.item_id;
  if (val.item_name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_name" of type "EventSource" to be defined',
    });
  }
  if (!sdIsString(val.item_name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "item_name" of type "EventSource"',
    });
  }
  const itemName: string = val.item_name;
  const classification: undefined | EventSourceClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeEventSourceClassificationField(val.classification);
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  return {
    itemType: itemType,
    itemId: itemId,
    itemName: itemName,
    classification: classification,
    parent: parent,
    ownedBy: ownedBy,
  } satisfies EventSource;
}
