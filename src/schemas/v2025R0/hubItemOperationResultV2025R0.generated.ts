import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { serializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { deserializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { serializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { deserializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { serializeHubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.generated.js';
import { deserializeHubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.generated.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { FolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { WeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { HubItemReferenceV2025R0 } from './hubItemReferenceV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubItemOperationResultV2025R0 {
  /**
   * The action performed on the item. */
  readonly action?: string;
  readonly item?: HubItemReferenceV2025R0;
  /**
   * The HTTP status code of the operation. */
  readonly status?: number;
  /**
   * Error message if the operation failed. */
  readonly error?: string;
  readonly rawData?: SerializedData;
}
export function serializeHubItemOperationResultV2025R0(
  val: HubItemOperationResultV2025R0,
): SerializedData {
  return {
    ['action']: val.action,
    ['item']:
      val.item == void 0
        ? val.item
        : serializeHubItemReferenceV2025R0(val.item),
    ['status']: val.status,
    ['error']: val.error,
  };
}
export function deserializeHubItemOperationResultV2025R0(
  val: SerializedData,
): HubItemOperationResultV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemOperationResultV2025R0"',
    });
  }
  if (!(val.action == void 0) && !sdIsString(val.action)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "action" of type "HubItemOperationResultV2025R0"',
    });
  }
  const action: undefined | string = val.action == void 0 ? void 0 : val.action;
  const item: undefined | HubItemReferenceV2025R0 =
    val.item == void 0 ? void 0 : deserializeHubItemReferenceV2025R0(val.item);
  if (!(val.status == void 0) && !sdIsNumber(val.status)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "status" of type "HubItemOperationResultV2025R0"',
    });
  }
  const status: undefined | number = val.status == void 0 ? void 0 : val.status;
  if (!(val.error == void 0) && !sdIsString(val.error)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "error" of type "HubItemOperationResultV2025R0"',
    });
  }
  const error: undefined | string = val.error == void 0 ? void 0 : val.error;
  return {
    action: action,
    item: item,
    status: status,
    error: error,
  } satisfies HubItemOperationResultV2025R0;
}
