import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TermsOfServiceBaseTypeField = 'terms_of_service';
export class TermsOfServiceBase {
  /**
   * The unique identifier for this terms of service. */
  readonly id!: string;
  /**
   * The value will always be `terms_of_service`. */
  readonly type: TermsOfServiceBaseTypeField =
    'terms_of_service' as TermsOfServiceBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TermsOfServiceBase, 'type'> &
      Partial<Pick<TermsOfServiceBase, 'type'>>,
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
export interface TermsOfServiceBaseInput {
  /**
   * The unique identifier for this terms of service. */
  readonly id: string;
  /**
   * The value will always be `terms_of_service`. */
  readonly type?: TermsOfServiceBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeTermsOfServiceBaseTypeField(
  val: TermsOfServiceBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeTermsOfServiceBaseTypeField(
  val: SerializedData,
): TermsOfServiceBaseTypeField {
  if (val == 'terms_of_service') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TermsOfServiceBaseTypeField",
  });
}
export function serializeTermsOfServiceBase(
  val: TermsOfServiceBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeTermsOfServiceBaseTypeField(val.type),
  };
}
export function deserializeTermsOfServiceBase(
  val: SerializedData,
): TermsOfServiceBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceBase"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TermsOfServiceBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TermsOfServiceBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "TermsOfServiceBase" to be defined',
    });
  }
  const type: TermsOfServiceBaseTypeField =
    deserializeTermsOfServiceBaseTypeField(val.type);
  return { id: id, type: type } satisfies TermsOfServiceBase;
}
export function serializeTermsOfServiceBaseInput(
  val: TermsOfServiceBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTermsOfServiceBaseTypeField(val.type),
  };
}
export function deserializeTermsOfServiceBaseInput(
  val: SerializedData,
): TermsOfServiceBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TermsOfServiceBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TermsOfServiceBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | TermsOfServiceBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeTermsOfServiceBaseTypeField(val.type);
  return { id: id, type: type } satisfies TermsOfServiceBaseInput;
}
