import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type EmailAliasTypeField = 'email_alias';
export interface EmailAlias {
  /**
   * The unique identifier for this object. */
  readonly id?: string;
  /**
   * The value will always be `email_alias`. */
  readonly type?: EmailAliasTypeField;
  /**
   * The email address. */
  readonly email?: string;
  /**
   * Whether the email address has been confirmed. */
  readonly isConfirmed?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeEmailAliasTypeField(
  val: EmailAliasTypeField,
): SerializedData {
  return val;
}
export function deserializeEmailAliasTypeField(
  val: SerializedData,
): EmailAliasTypeField {
  if (val == 'email_alias') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize EmailAliasTypeField" });
}
export function serializeEmailAlias(val: EmailAlias): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeEmailAliasTypeField(val.type),
    ['email']: val.email,
    ['is_confirmed']: val.isConfirmed,
  };
}
export function deserializeEmailAlias(val: SerializedData): EmailAlias {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "EmailAlias"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "EmailAlias"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | EmailAliasTypeField =
    val.type == void 0 ? void 0 : deserializeEmailAliasTypeField(val.type);
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "EmailAlias"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.is_confirmed == void 0) && !sdIsBoolean(val.is_confirmed)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_confirmed" of type "EmailAlias"',
    });
  }
  const isConfirmed: undefined | boolean =
    val.is_confirmed == void 0 ? void 0 : val.is_confirmed;
  return {
    id: id,
    type: type,
    email: email,
    isConfirmed: isConfirmed,
  } satisfies EmailAlias;
}
