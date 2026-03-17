import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface HubDocumentBlockV2025R0 {
  /**
   * The unique identifier for this block. */
  readonly id: string;
  /**
   * The unique identifier of the parent block. Null for direct children of the page. */
  readonly parentId?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeHubDocumentBlockV2025R0(
  val: HubDocumentBlockV2025R0,
): SerializedData {
  return { ['id']: val.id, ['parent_id']: val.parentId };
}
export function deserializeHubDocumentBlockV2025R0(
  val: SerializedData,
): HubDocumentBlockV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentBlockV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubDocumentBlockV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubDocumentBlockV2025R0"',
    });
  }
  const id: string = val.id;
  if (!(val.parent_id == void 0) && !sdIsString(val.parent_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_id" of type "HubDocumentBlockV2025R0"',
    });
  }
  const parentId: undefined | string =
    val.parent_id == void 0 ? void 0 : val.parent_id;
  return { id: id, parentId: parentId } satisfies HubDocumentBlockV2025R0;
}
