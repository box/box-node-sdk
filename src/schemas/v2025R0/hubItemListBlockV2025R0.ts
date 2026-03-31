import { serializeHubDocumentBlockV2025R0 } from './hubDocumentBlockV2025R0';
import { deserializeHubDocumentBlockV2025R0 } from './hubDocumentBlockV2025R0';
import { HubDocumentBlockV2025R0 } from './hubDocumentBlockV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubItemListBlockV2025R0TypeField = 'item_list';
export class HubItemListBlockV2025R0 implements HubDocumentBlockV2025R0 {
  readonly id!: string;
  readonly parentId?: string | null;
  readonly rawData?: SerializedData;
  /**
   * The type of this block. The value is always `item_list`. */
  readonly type: HubItemListBlockV2025R0TypeField =
    'item_list' as HubItemListBlockV2025R0TypeField;
  constructor(
    fields: Omit<HubItemListBlockV2025R0, 'type'> &
      Partial<Pick<HubItemListBlockV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.parentId !== undefined) {
      this.parentId = fields.parentId;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
  }
}
export function serializeHubItemListBlockV2025R0TypeField(
  val: HubItemListBlockV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubItemListBlockV2025R0TypeField(
  val: SerializedData,
): HubItemListBlockV2025R0TypeField {
  if (val == 'item_list') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubItemListBlockV2025R0TypeField",
  });
}
export function serializeHubItemListBlockV2025R0(
  val: HubItemListBlockV2025R0,
): SerializedData {
  const base: any = serializeHubDocumentBlockV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemListBlockV2025R0"',
    });
  }
  return {
    ...base,
    ...{ ['type']: serializeHubItemListBlockV2025R0TypeField(val.type) },
  };
}
export function deserializeHubItemListBlockV2025R0(
  val: SerializedData,
): HubItemListBlockV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemListBlockV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubItemListBlockV2025R0" to be defined',
    });
  }
  const type: HubItemListBlockV2025R0TypeField =
    deserializeHubItemListBlockV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubItemListBlockV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubItemListBlockV2025R0"',
    });
  }
  const id: string = val.id;
  if (!(val.parent_id == void 0) && !sdIsString(val.parent_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_id" of type "HubItemListBlockV2025R0"',
    });
  }
  const parentId: undefined | string =
    val.parent_id == void 0 ? void 0 : val.parent_id;
  return {
    type: type,
    id: id,
    parentId: parentId,
  } satisfies HubItemListBlockV2025R0;
}
