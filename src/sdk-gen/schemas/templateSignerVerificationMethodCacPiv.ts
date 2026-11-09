import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TemplateSignerVerificationMethodCacPivTypeField = 'cac_piv';
export class TemplateSignerVerificationMethodCacPiv {
  /**
   * The type of verification method. */
  readonly type: TemplateSignerVerificationMethodCacPivTypeField =
    'cac_piv' as TemplateSignerVerificationMethodCacPivTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TemplateSignerVerificationMethodCacPiv, 'type'> &
      Partial<Pick<TemplateSignerVerificationMethodCacPiv, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TemplateSignerVerificationMethodCacPivInput {
  /**
   * The type of verification method. */
  readonly type?: TemplateSignerVerificationMethodCacPivTypeField;
  readonly rawData?: SerializedData;
}
export function serializeTemplateSignerVerificationMethodCacPivTypeField(
  val: TemplateSignerVerificationMethodCacPivTypeField
): SerializedData {
  return val;
}
export function deserializeTemplateSignerVerificationMethodCacPivTypeField(
  val: SerializedData
): TemplateSignerVerificationMethodCacPivTypeField {
  if (val == 'cac_piv') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize TemplateSignerVerificationMethodCacPivTypeField",
  });
}
export function serializeTemplateSignerVerificationMethodCacPiv(
  val: TemplateSignerVerificationMethodCacPiv
): SerializedData {
  return {
    ['type']: serializeTemplateSignerVerificationMethodCacPivTypeField(
      val.type
    ),
  };
}
export function deserializeTemplateSignerVerificationMethodCacPiv(
  val: SerializedData
): TemplateSignerVerificationMethodCacPiv {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TemplateSignerVerificationMethodCacPiv"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TemplateSignerVerificationMethodCacPiv" to be defined',
    });
  }
  const type: TemplateSignerVerificationMethodCacPivTypeField =
    deserializeTemplateSignerVerificationMethodCacPivTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodCacPiv;
}
export function serializeTemplateSignerVerificationMethodCacPivInput(
  val: TemplateSignerVerificationMethodCacPivInput
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTemplateSignerVerificationMethodCacPivTypeField(val.type),
  };
}
export function deserializeTemplateSignerVerificationMethodCacPivInput(
  val: SerializedData
): TemplateSignerVerificationMethodCacPivInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "TemplateSignerVerificationMethodCacPivInput"',
    });
  }
  const type: undefined | TemplateSignerVerificationMethodCacPivTypeField =
    val.type == void 0
      ? void 0
      : deserializeTemplateSignerVerificationMethodCacPivTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodCacPivInput;
}
