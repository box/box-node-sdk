import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type HubItemV2025R0TypeField = 'file' | 'folder' | 'web_link';
export interface HubItemV2025R0 {
  /**
   * The unique identifier for this item. */
  readonly id: string;
  /**
   * The type of the item. */
  readonly type: HubItemV2025R0TypeField;
  /**
   * The name of the item. */
  readonly name: string;
  readonly rawData?: SerializedData;
}
export function serializeHubItemV2025R0TypeField(
  val: HubItemV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubItemV2025R0TypeField(
  val: SerializedData,
): HubItemV2025R0TypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubItemV2025R0TypeField",
  });
}
export function serializeHubItemV2025R0(val: HubItemV2025R0): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeHubItemV2025R0TypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeHubItemV2025R0(val: SerializedData): HubItemV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "HubItemV2025R0"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubItemV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubItemV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "HubItemV2025R0" to be defined',
    });
  }
  const type: HubItemV2025R0TypeField = deserializeHubItemV2025R0TypeField(
    val.type,
  );
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "HubItemV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "HubItemV2025R0"',
    });
  }
  const name: string = val.name;
  return { id: id, type: type, name: name } satisfies HubItemV2025R0;
}
