import { serializeHubItemOperationResultV2025R0 } from './hubItemOperationResultV2025R0.generated.js';
import { deserializeHubItemOperationResultV2025R0 } from './hubItemOperationResultV2025R0.generated.js';
import { HubItemOperationResultV2025R0 } from './hubItemOperationResultV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubItemsManageResponseV2025R0 {
  /**
   * List of operations performed on Hub items. */
  readonly operations: readonly HubItemOperationResultV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeHubItemsManageResponseV2025R0(
  val: HubItemsManageResponseV2025R0,
): SerializedData {
  return {
    ['operations']: val.operations.map(function (
      item: HubItemOperationResultV2025R0,
    ): SerializedData {
      return serializeHubItemOperationResultV2025R0(item);
    }) as readonly any[],
  };
}
export function deserializeHubItemsManageResponseV2025R0(
  val: SerializedData,
): HubItemsManageResponseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemsManageResponseV2025R0"',
    });
  }
  if (val.operations == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "operations" of type "HubItemsManageResponseV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.operations)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "operations" of type "HubItemsManageResponseV2025R0"',
    });
  }
  const operations: readonly HubItemOperationResultV2025R0[] = sdIsList(
    val.operations,
  )
    ? (val.operations.map(function (
        itm: SerializedData,
      ): HubItemOperationResultV2025R0 {
        return deserializeHubItemOperationResultV2025R0(itm);
      }) as readonly any[])
    : [];
  return { operations: operations } satisfies HubItemsManageResponseV2025R0;
}
