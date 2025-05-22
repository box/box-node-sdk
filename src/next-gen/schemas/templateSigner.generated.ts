import { serializeTemplateSignerInput } from './templateSignerInput.generated.js';
import { deserializeTemplateSignerInput } from './templateSignerInput.generated.js';
import { TemplateSignerInput } from './templateSignerInput.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type TemplateSignerRoleField =
  | 'signer'
  | 'approver'
  | 'final_copy_reader'
  | string;
export interface TemplateSigner {
  readonly inputs?: readonly TemplateSignerInput[];
  /**
   * Email address of the signer */
  readonly email?: string | null;
  /**
   * Defines the role of the signer in the signature request. A role of
   * `signer` needs to sign the document, a role `approver`
   * approves the document and
   * a `final_copy_reader` role only
   * receives the final signed document and signing log. */
  readonly role?: TemplateSignerRoleField;
  /**
   * Used in combination with an embed URL for a sender.
   * After the sender signs, they will be
   * redirected to the next `in_person` signer. */
  readonly isInPerson?: boolean;
  /**
   * Order of the signer */
  readonly order?: number;
  /**
   * If provided, this value points signers that are assigned the same inputs and belongs to same signer group.
   * A signer group is not a Box Group. It is an entity that belongs to the template itself and can only be used
   * within Box Sign requests created from it. */
  readonly signerGroupId?: string | null;
  /**
   * A placeholder label for the signer set by the template creator to differentiate between signers. */
  readonly label?: string | null;
  /**
   * An identifier for the signer. This can be used to identify a signer within the template. */
  readonly publicId?: string;
  /**
   * If true for signers with a defined email, the password provided when the template was created is used by default.
   * If true for signers without a specified / defined email, the creator needs to provide a password when using the template. */
  readonly isPasswordRequired?: boolean | null;
  /**
   * If true for signers with a defined email, the phone number provided when the template was created is used by default.
   * If true for signers without a specified / defined email, the template creator needs to provide a phone number when creating a request. */
  readonly isPhoneNumberRequired?: boolean | null;
  /**
   * If true, the signer is required to login to access the document. */
  readonly loginRequired?: boolean | null;
  readonly rawData?: SerializedData;
}
export function serializeTemplateSignerRoleField(
  val: TemplateSignerRoleField,
): SerializedData {
  return val;
}
export function deserializeTemplateSignerRoleField(
  val: SerializedData,
): TemplateSignerRoleField {
  if (val == 'signer') {
    return val;
  }
  if (val == 'approver') {
    return val;
  }
  if (val == 'final_copy_reader') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TemplateSignerRoleField",
  });
}
export function serializeTemplateSigner(val: TemplateSigner): SerializedData {
  return {
    ['inputs']:
      val.inputs == void 0
        ? val.inputs
        : (val.inputs.map(function (item: TemplateSignerInput): SerializedData {
            return serializeTemplateSignerInput(item);
          }) as readonly any[]),
    ['email']: val.email,
    ['role']:
      val.role == void 0
        ? val.role
        : serializeTemplateSignerRoleField(val.role),
    ['is_in_person']: val.isInPerson,
    ['order']: val.order,
    ['signer_group_id']: val.signerGroupId,
    ['label']: val.label,
    ['public_id']: val.publicId,
    ['is_password_required']: val.isPasswordRequired,
    ['is_phone_number_required']: val.isPhoneNumberRequired,
    ['login_required']: val.loginRequired,
  };
}
export function deserializeTemplateSigner(val: SerializedData): TemplateSigner {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TemplateSigner"' });
  }
  if (!(val.inputs == void 0) && !sdIsList(val.inputs)) {
    throw new BoxSdkError({
      message: 'Expecting array for "inputs" of type "TemplateSigner"',
    });
  }
  const inputs: undefined | readonly TemplateSignerInput[] =
    val.inputs == void 0
      ? void 0
      : sdIsList(val.inputs)
        ? (val.inputs.map(function (itm: SerializedData): TemplateSignerInput {
            return deserializeTemplateSignerInput(itm);
          }) as readonly any[])
        : [];
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "TemplateSigner"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  const role: undefined | TemplateSignerRoleField =
    val.role == void 0 ? void 0 : deserializeTemplateSignerRoleField(val.role);
  if (!(val.is_in_person == void 0) && !sdIsBoolean(val.is_in_person)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_in_person" of type "TemplateSigner"',
    });
  }
  const isInPerson: undefined | boolean =
    val.is_in_person == void 0 ? void 0 : val.is_in_person;
  if (!(val.order == void 0) && !sdIsNumber(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting number for "order" of type "TemplateSigner"',
    });
  }
  const order: undefined | number = val.order == void 0 ? void 0 : val.order;
  if (!(val.signer_group_id == void 0) && !sdIsString(val.signer_group_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "signer_group_id" of type "TemplateSigner"',
    });
  }
  const signerGroupId: undefined | string =
    val.signer_group_id == void 0 ? void 0 : val.signer_group_id;
  if (!(val.label == void 0) && !sdIsString(val.label)) {
    throw new BoxSdkError({
      message: 'Expecting string for "label" of type "TemplateSigner"',
    });
  }
  const label: undefined | string = val.label == void 0 ? void 0 : val.label;
  if (!(val.public_id == void 0) && !sdIsString(val.public_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "public_id" of type "TemplateSigner"',
    });
  }
  const publicId: undefined | string =
    val.public_id == void 0 ? void 0 : val.public_id;
  if (
    !(val.is_password_required == void 0) &&
    !sdIsBoolean(val.is_password_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_password_required" of type "TemplateSigner"',
    });
  }
  const isPasswordRequired: undefined | boolean =
    val.is_password_required == void 0 ? void 0 : val.is_password_required;
  if (
    !(val.is_phone_number_required == void 0) &&
    !sdIsBoolean(val.is_phone_number_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_phone_number_required" of type "TemplateSigner"',
    });
  }
  const isPhoneNumberRequired: undefined | boolean =
    val.is_phone_number_required == void 0
      ? void 0
      : val.is_phone_number_required;
  if (!(val.login_required == void 0) && !sdIsBoolean(val.login_required)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "login_required" of type "TemplateSigner"',
    });
  }
  const loginRequired: undefined | boolean =
    val.login_required == void 0 ? void 0 : val.login_required;
  return {
    inputs: inputs,
    email: email,
    role: role,
    isInPerson: isInPerson,
    order: order,
    signerGroupId: signerGroupId,
    label: label,
    publicId: publicId,
    isPasswordRequired: isPasswordRequired,
    isPhoneNumberRequired: isPhoneNumberRequired,
    loginRequired: loginRequired,
  } satisfies TemplateSigner;
}
