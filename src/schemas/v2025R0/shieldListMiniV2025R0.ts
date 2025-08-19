import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type ShieldListMiniV2025R0TypeField = 'shield_list';
export interface ShieldListMiniV2025R0ContentField {
  /**
   * The type of content in the shield list. */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export class ShieldListMiniV2025R0 {
  /**
   * Unique global identifier for this list. */
  readonly id!: string;
  /**
   * The type of object. */
  readonly type: ShieldListMiniV2025R0TypeField =
    'shield_list' as ShieldListMiniV2025R0TypeField;
  /**
   * Name of Shield List. */
  readonly name!: string;
  readonly content!: ShieldListMiniV2025R0ContentField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListMiniV2025R0, 'type'> &
      Partial<Pick<ShieldListMiniV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.content !== undefined) {
      this.content = fields.content;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListMiniV2025R0Input {
  /**
   * Unique global identifier for this list. */
  readonly id: string;
  /**
   * The type of object. */
  readonly type?: ShieldListMiniV2025R0TypeField;
  /**
   * Name of Shield List. */
  readonly name: string;
  readonly content: ShieldListMiniV2025R0ContentField;
  readonly rawData?: SerializedData;
}
export function serializeShieldListMiniV2025R0TypeField(
  val: ShieldListMiniV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListMiniV2025R0TypeField(
  val: SerializedData,
): ShieldListMiniV2025R0TypeField {
  if (val == 'shield_list') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListMiniV2025R0TypeField",
  });
}
export function serializeShieldListMiniV2025R0ContentField(
  val: ShieldListMiniV2025R0ContentField,
): SerializedData {
  return { ['type']: val.type };
}
export function deserializeShieldListMiniV2025R0ContentField(
  val: SerializedData,
): ShieldListMiniV2025R0ContentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListMiniV2025R0ContentField"',
    });
  }
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "ShieldListMiniV2025R0ContentField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return { type: type } satisfies ShieldListMiniV2025R0ContentField;
}
export function serializeShieldListMiniV2025R0(
  val: ShieldListMiniV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShieldListMiniV2025R0TypeField(val.type),
    ['name']: val.name,
    ['content']: serializeShieldListMiniV2025R0ContentField(val.content),
  };
}
export function deserializeShieldListMiniV2025R0(
  val: SerializedData,
): ShieldListMiniV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListMiniV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShieldListMiniV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShieldListMiniV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShieldListMiniV2025R0" to be defined',
    });
  }
  const type: ShieldListMiniV2025R0TypeField =
    deserializeShieldListMiniV2025R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "ShieldListMiniV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShieldListMiniV2025R0"',
    });
  }
  const name: string = val.name;
  if (val.content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content" of type "ShieldListMiniV2025R0" to be defined',
    });
  }
  const content: ShieldListMiniV2025R0ContentField =
    deserializeShieldListMiniV2025R0ContentField(val.content);
  return {
    id: id,
    type: type,
    name: name,
    content: content,
  } satisfies ShieldListMiniV2025R0;
}
export function serializeShieldListMiniV2025R0Input(
  val: ShieldListMiniV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListMiniV2025R0TypeField(val.type),
    ['name']: val.name,
    ['content']: serializeShieldListMiniV2025R0ContentField(val.content),
  };
}
export function deserializeShieldListMiniV2025R0Input(
  val: SerializedData,
): ShieldListMiniV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListMiniV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShieldListMiniV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShieldListMiniV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShieldListMiniV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListMiniV2025R0TypeField(val.type);
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "ShieldListMiniV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShieldListMiniV2025R0Input"',
    });
  }
  const name: string = val.name;
  if (val.content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content" of type "ShieldListMiniV2025R0Input" to be defined',
    });
  }
  const content: ShieldListMiniV2025R0ContentField =
    deserializeShieldListMiniV2025R0ContentField(val.content);
  return {
    id: id,
    type: type,
    name: name,
    content: content,
  } satisfies ShieldListMiniV2025R0Input;
}
