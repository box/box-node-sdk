import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.js';
import { serializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.js';
import { deserializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.js';
import { serializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.js';
import { deserializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.js';
import { serializeHubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.js';
import { deserializeHubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.js';
import { FolderReferenceV2025R0 } from './folderReferenceV2025R0.js';
import { WeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.js';
import { HubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type HubItemOperationV2025R0ActionField = 'add' | 'remove' | string;
export interface HubItemOperationV2025R0 {
  /**
   * The action to perform on a Hub item. */
  readonly action: HubItemOperationV2025R0ActionField;
  readonly item: HubItemReferenceV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeHubItemOperationV2025R0ActionField(
  val: HubItemOperationV2025R0ActionField,
): SerializedData {
  return val;
}
export function deserializeHubItemOperationV2025R0ActionField(
  val: SerializedData,
): HubItemOperationV2025R0ActionField {
  if (val == 'add') {
    return val;
  }
  if (val == 'remove') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubItemOperationV2025R0ActionField",
  });
}
export function serializeHubItemOperationV2025R0(
  val: HubItemOperationV2025R0,
): SerializedData {
  return {
    ['action']: serializeHubItemOperationV2025R0ActionField(val.action),
    ['item']: serializeHubItemReferenceV2025R0(val.item),
  };
}
export function deserializeHubItemOperationV2025R0(
  val: SerializedData,
): HubItemOperationV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemOperationV2025R0"',
    });
  }
  if (val.action == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "action" of type "HubItemOperationV2025R0" to be defined',
    });
  }
  const action: HubItemOperationV2025R0ActionField =
    deserializeHubItemOperationV2025R0ActionField(val.action);
  if (val.item == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "item" of type "HubItemOperationV2025R0" to be defined',
    });
  }
  const item: HubItemReferenceV2025R0 = deserializeHubItemReferenceV2025R0(
    val.item,
  );
  return { action: action, item: item } satisfies HubItemOperationV2025R0;
}
