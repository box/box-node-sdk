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
export type HubDividerBlockV2025R0TypeField = 'divider';
export class HubDividerBlockV2025R0 implements HubDocumentBlockV2025R0 {
  readonly id!: string;
  readonly parentId?: string | null;
  readonly rawData?: SerializedData;
  /**
   * The type of this block. The value is always `divider`. */
  readonly type: HubDividerBlockV2025R0TypeField =
    'divider' as HubDividerBlockV2025R0TypeField;
  constructor(
    fields: Omit<HubDividerBlockV2025R0, 'type'> &
      Partial<Pick<HubDividerBlockV2025R0, 'type'>>,
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
export function serializeHubDividerBlockV2025R0TypeField(
  val: HubDividerBlockV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubDividerBlockV2025R0TypeField(
  val: SerializedData,
): HubDividerBlockV2025R0TypeField {
  if (val == 'divider') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubDividerBlockV2025R0TypeField",
  });
}
export function serializeHubDividerBlockV2025R0(
  val: HubDividerBlockV2025R0,
): SerializedData {
  const base: any = serializeHubDocumentBlockV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDividerBlockV2025R0"',
    });
  }
  return {
    ...base,
    ...{ ['type']: serializeHubDividerBlockV2025R0TypeField(val.type) },
  };
}
export function deserializeHubDividerBlockV2025R0(
  val: SerializedData,
): HubDividerBlockV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDividerBlockV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubDividerBlockV2025R0" to be defined',
    });
  }
  const type: HubDividerBlockV2025R0TypeField =
    deserializeHubDividerBlockV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubDividerBlockV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubDividerBlockV2025R0"',
    });
  }
  const id: string = val.id;
  if (!(val.parent_id == void 0) && !sdIsString(val.parent_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_id" of type "HubDividerBlockV2025R0"',
    });
  }
  const parentId: undefined | string =
    val.parent_id == void 0 ? void 0 : val.parent_id;
  return {
    type: type,
    id: id,
    parentId: parentId,
  } satisfies HubDividerBlockV2025R0;
}
