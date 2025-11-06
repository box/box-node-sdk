import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type WeblinkReferenceV2025R0TypeField = 'web_link';
export class WeblinkReferenceV2025R0 {
  /**
   * The value will always be `web_link`. */
  readonly type: WeblinkReferenceV2025R0TypeField =
    'web_link' as WeblinkReferenceV2025R0TypeField;
  /**
   * ID of the web link. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<WeblinkReferenceV2025R0, 'type'> &
      Partial<Pick<WeblinkReferenceV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface WeblinkReferenceV2025R0Input {
  /**
   * The value will always be `web_link`. */
  readonly type?: WeblinkReferenceV2025R0TypeField;
  /**
   * ID of the web link. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeWeblinkReferenceV2025R0TypeField(
  val: WeblinkReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeWeblinkReferenceV2025R0TypeField(
  val: SerializedData,
): WeblinkReferenceV2025R0TypeField {
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WeblinkReferenceV2025R0TypeField",
  });
}
export function serializeWeblinkReferenceV2025R0(
  val: WeblinkReferenceV2025R0,
): SerializedData {
  return {
    ['type']: serializeWeblinkReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeWeblinkReferenceV2025R0(
  val: SerializedData,
): WeblinkReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WeblinkReferenceV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "WeblinkReferenceV2025R0" to be defined',
    });
  }
  const type: WeblinkReferenceV2025R0TypeField =
    deserializeWeblinkReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "WeblinkReferenceV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WeblinkReferenceV2025R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies WeblinkReferenceV2025R0;
}
export function serializeWeblinkReferenceV2025R0Input(
  val: WeblinkReferenceV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWeblinkReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeWeblinkReferenceV2025R0Input(
  val: SerializedData,
): WeblinkReferenceV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WeblinkReferenceV2025R0Input"',
    });
  }
  const type: undefined | WeblinkReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeWeblinkReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "WeblinkReferenceV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "WeblinkReferenceV2025R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies WeblinkReferenceV2025R0Input;
}
