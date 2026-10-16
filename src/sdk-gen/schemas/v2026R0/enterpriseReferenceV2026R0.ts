import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseReferenceV2026R0TypeField = 'enterprise';
export class EnterpriseReferenceV2026R0 {
  /**
   * The unique identifier for this enterprise. */
  readonly id!: string;
  /**
   * The value will always be `enterprise`. */
  readonly type: EnterpriseReferenceV2026R0TypeField =
    'enterprise' as EnterpriseReferenceV2026R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<EnterpriseReferenceV2026R0, 'type'> &
      Partial<Pick<EnterpriseReferenceV2026R0, 'type'>>
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface EnterpriseReferenceV2026R0Input {
  /**
   * The unique identifier for this enterprise. */
  readonly id: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: EnterpriseReferenceV2026R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseReferenceV2026R0TypeField(
  val: EnterpriseReferenceV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeEnterpriseReferenceV2026R0TypeField(
  val: SerializedData
): EnterpriseReferenceV2026R0TypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EnterpriseReferenceV2026R0TypeField",
  });
}
export function serializeEnterpriseReferenceV2026R0(
  val: EnterpriseReferenceV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeEnterpriseReferenceV2026R0TypeField(val.type),
  };
}
export function deserializeEnterpriseReferenceV2026R0(
  val: SerializedData
): EnterpriseReferenceV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseReferenceV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "EnterpriseReferenceV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "EnterpriseReferenceV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "EnterpriseReferenceV2026R0" to be defined',
    });
  }
  const type: EnterpriseReferenceV2026R0TypeField =
    deserializeEnterpriseReferenceV2026R0TypeField(val.type);
  return { id: id, type: type } satisfies EnterpriseReferenceV2026R0;
}
export function serializeEnterpriseReferenceV2026R0Input(
  val: EnterpriseReferenceV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeEnterpriseReferenceV2026R0TypeField(val.type),
  };
}
export function deserializeEnterpriseReferenceV2026R0Input(
  val: SerializedData
): EnterpriseReferenceV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseReferenceV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "EnterpriseReferenceV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "EnterpriseReferenceV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | EnterpriseReferenceV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeEnterpriseReferenceV2026R0TypeField(val.type);
  return { id: id, type: type } satisfies EnterpriseReferenceV2026R0Input;
}
