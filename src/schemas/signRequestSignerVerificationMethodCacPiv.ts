import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerVerificationMethodCacPivTypeField = 'cac_piv';
export class SignRequestSignerVerificationMethodCacPiv {
  /**
   * The type of verification method. */
  readonly type: SignRequestSignerVerificationMethodCacPivTypeField =
    'cac_piv' as SignRequestSignerVerificationMethodCacPivTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerVerificationMethodCacPiv, 'type'> &
      Partial<Pick<SignRequestSignerVerificationMethodCacPiv, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerVerificationMethodCacPivInput {
  /**
   * The type of verification method. */
  readonly type?: SignRequestSignerVerificationMethodCacPivTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerVerificationMethodCacPivTypeField(
  val: SignRequestSignerVerificationMethodCacPivTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerVerificationMethodCacPivTypeField(
  val: SerializedData,
): SignRequestSignerVerificationMethodCacPivTypeField {
  if (val == 'cac_piv') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerVerificationMethodCacPivTypeField",
  });
}
export function serializeSignRequestSignerVerificationMethodCacPiv(
  val: SignRequestSignerVerificationMethodCacPiv,
): SerializedData {
  return {
    ['type']: serializeSignRequestSignerVerificationMethodCacPivTypeField(
      val.type,
    ),
  };
}
export function deserializeSignRequestSignerVerificationMethodCacPiv(
  val: SerializedData,
): SignRequestSignerVerificationMethodCacPiv {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerVerificationMethodCacPiv"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "SignRequestSignerVerificationMethodCacPiv" to be defined',
    });
  }
  const type: SignRequestSignerVerificationMethodCacPivTypeField =
    deserializeSignRequestSignerVerificationMethodCacPivTypeField(val.type);
  return { type: type } satisfies SignRequestSignerVerificationMethodCacPiv;
}
export function serializeSignRequestSignerVerificationMethodCacPivInput(
  val: SignRequestSignerVerificationMethodCacPivInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeSignRequestSignerVerificationMethodCacPivTypeField(val.type),
  };
}
export function deserializeSignRequestSignerVerificationMethodCacPivInput(
  val: SerializedData,
): SignRequestSignerVerificationMethodCacPivInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerVerificationMethodCacPivInput"',
    });
  }
  const type: undefined | SignRequestSignerVerificationMethodCacPivTypeField =
    val.type == void 0
      ? void 0
      : deserializeSignRequestSignerVerificationMethodCacPivTypeField(val.type);
  return {
    type: type,
  } satisfies SignRequestSignerVerificationMethodCacPivInput;
}
