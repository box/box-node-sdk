import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type TermsOfServiceBaseV2025R0TypeField = 'terms_of_service';
export class TermsOfServiceBaseV2025R0 {
  /**
   * The unique identifier for this terms of service. */
  readonly id!: string;
  /**
   * The value will always be `terms_of_service`. */
  readonly type: TermsOfServiceBaseV2025R0TypeField =
    'terms_of_service' as TermsOfServiceBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TermsOfServiceBaseV2025R0, 'type'> &
      Partial<Pick<TermsOfServiceBaseV2025R0, 'type'>>,
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
export interface TermsOfServiceBaseV2025R0Input {
  /**
   * The unique identifier for this terms of service. */
  readonly id: string;
  /**
   * The value will always be `terms_of_service`. */
  readonly type?: TermsOfServiceBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeTermsOfServiceBaseV2025R0TypeField(
  val: TermsOfServiceBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeTermsOfServiceBaseV2025R0TypeField(
  val: SerializedData,
): TermsOfServiceBaseV2025R0TypeField {
  if (val == 'terms_of_service') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TermsOfServiceBaseV2025R0TypeField",
  });
}
export function serializeTermsOfServiceBaseV2025R0(
  val: TermsOfServiceBaseV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeTermsOfServiceBaseV2025R0TypeField(val.type),
  };
}
export function deserializeTermsOfServiceBaseV2025R0(
  val: SerializedData,
): TermsOfServiceBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceBaseV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TermsOfServiceBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TermsOfServiceBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TermsOfServiceBaseV2025R0" to be defined',
    });
  }
  const type: TermsOfServiceBaseV2025R0TypeField =
    deserializeTermsOfServiceBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies TermsOfServiceBaseV2025R0;
}
export function serializeTermsOfServiceBaseV2025R0Input(
  val: TermsOfServiceBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTermsOfServiceBaseV2025R0TypeField(val.type),
  };
}
export function deserializeTermsOfServiceBaseV2025R0Input(
  val: SerializedData,
): TermsOfServiceBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TermsOfServiceBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TermsOfServiceBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | TermsOfServiceBaseV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeTermsOfServiceBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies TermsOfServiceBaseV2025R0Input;
}
