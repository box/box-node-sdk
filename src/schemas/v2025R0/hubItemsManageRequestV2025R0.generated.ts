import { serializeHubItemOperationV2025R0 } from './hubItemOperationV2025R0.generated.js';
import { deserializeHubItemOperationV2025R0 } from './hubItemOperationV2025R0.generated.js';
import { HubItemOperationV2025R0 } from './hubItemOperationV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubItemsManageRequestV2025R0 {
  /**
   * List of operations to perform on Hub items. */
  readonly operations?: readonly HubItemOperationV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeHubItemsManageRequestV2025R0(
  val: HubItemsManageRequestV2025R0,
): SerializedData {
  return {
    ['operations']:
      val.operations == void 0
        ? val.operations
        : (val.operations.map(function (
            item: HubItemOperationV2025R0,
          ): SerializedData {
            return serializeHubItemOperationV2025R0(item);
          }) as readonly any[]),
  };
}
export function deserializeHubItemsManageRequestV2025R0(
  val: SerializedData,
): HubItemsManageRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemsManageRequestV2025R0"',
    });
  }
  if (!(val.operations == void 0) && !sdIsList(val.operations)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "operations" of type "HubItemsManageRequestV2025R0"',
    });
  }
  const operations: undefined | readonly HubItemOperationV2025R0[] =
    val.operations == void 0
      ? void 0
      : sdIsList(val.operations)
        ? (val.operations.map(function (
            itm: SerializedData,
          ): HubItemOperationV2025R0 {
            return deserializeHubItemOperationV2025R0(itm);
          }) as readonly any[])
        : [];
  return { operations: operations } satisfies HubItemsManageRequestV2025R0;
}
