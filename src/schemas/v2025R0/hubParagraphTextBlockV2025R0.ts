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
export type HubParagraphTextBlockV2025R0TypeField = 'paragraph';
export class HubParagraphTextBlockV2025R0 implements HubDocumentBlockV2025R0 {
  readonly id!: string;
  readonly parentId?: string | null;
  readonly rawData?: SerializedData;
  /**
   * The type of this block. The value is always `paragraph`. */
  readonly type: HubParagraphTextBlockV2025R0TypeField =
    'paragraph' as HubParagraphTextBlockV2025R0TypeField;
  /**
   * Text content of the block. Includes rich text formatting. */
  readonly fragment!: string;
  constructor(
    fields: Omit<HubParagraphTextBlockV2025R0, 'type'> &
      Partial<Pick<HubParagraphTextBlockV2025R0, 'type'>>,
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
    if (fields.fragment !== undefined) {
      this.fragment = fields.fragment;
    }
  }
}
export function serializeHubParagraphTextBlockV2025R0TypeField(
  val: HubParagraphTextBlockV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubParagraphTextBlockV2025R0TypeField(
  val: SerializedData,
): HubParagraphTextBlockV2025R0TypeField {
  if (val == 'paragraph') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubParagraphTextBlockV2025R0TypeField",
  });
}
export function serializeHubParagraphTextBlockV2025R0(
  val: HubParagraphTextBlockV2025R0,
): SerializedData {
  const base: any = serializeHubDocumentBlockV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubParagraphTextBlockV2025R0"',
    });
  }
  return {
    ...base,
    ...{
      ['type']: serializeHubParagraphTextBlockV2025R0TypeField(val.type),
      ['fragment']: val.fragment,
    },
  };
}
export function deserializeHubParagraphTextBlockV2025R0(
  val: SerializedData,
): HubParagraphTextBlockV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubParagraphTextBlockV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubParagraphTextBlockV2025R0" to be defined',
    });
  }
  const type: HubParagraphTextBlockV2025R0TypeField =
    deserializeHubParagraphTextBlockV2025R0TypeField(val.type);
  if (val.fragment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "fragment" of type "HubParagraphTextBlockV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.fragment)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "fragment" of type "HubParagraphTextBlockV2025R0"',
    });
  }
  const fragment: string = val.fragment;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "HubParagraphTextBlockV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "HubParagraphTextBlockV2025R0"',
    });
  }
  const id: string = val.id;
  if (!(val.parent_id == void 0) && !sdIsString(val.parent_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_id" of type "HubParagraphTextBlockV2025R0"',
    });
  }
  const parentId: undefined | string =
    val.parent_id == void 0 ? void 0 : val.parent_id;
  return {
    type: type,
    fragment: fragment,
    id: id,
    parentId: parentId,
  } satisfies HubParagraphTextBlockV2025R0;
}
