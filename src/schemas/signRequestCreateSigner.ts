import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SignRequestCreateSignerRoleField =
  | 'signer'
  | 'approver'
  | 'final_copy_reader'
  | string;
export interface SignRequestCreateSigner {
  /**
   * Email address of the signer.
   * The email address of the signer is required when making signature requests, except when using templates that are configured to include emails. */
  readonly email?: string | null;
  /**
   * Defines the role of the signer in the signature request. A `signer`
   * must sign the document and an `approver` must approve the document. A
   * `final_copy_reader` only receives the final signed document and signing
   * log. */
  readonly role?: SignRequestCreateSignerRoleField;
  /**
   * Used in combination with an embed URL for a sender. After the
   * sender signs, they are redirected to the next `in_person` signer. */
  readonly isInPerson?: boolean;
  /**
   * Order of the signer. */
  readonly order?: number;
  /**
   * User ID for the signer in an external application responsible
   * for authentication when accessing the embed URL. */
  readonly embedUrlExternalUserId?: string | null;
  /**
   * The URL that a signer will be redirected
   * to after signing a document. Defining this URL
   * overrides default or global redirect URL
   * settings for a specific signer.
   * If no declined redirect URL is specified,
   * this URL will be used for decline actions as well. */
  readonly redirectUrl?: string | null;
  /**
   * The URL that a signer will be redirect
   * to after declining to sign a document.
   * Defining this URL overrides default or global
   * declined redirect URL settings for a specific signer. */
  readonly declinedRedirectUrl?: string | null;
  /**
   * If set to true, the signer will need to log in to a Box account
   * before signing the request. If the signer does not have
   * an existing account, they will have the option to create
   * a free Box account. */
  readonly loginRequired?: boolean | null;
  /**
   * If set, this phone number will be used to verify the signer
   * via two-factor authentication before they are able to sign the document.
   * Cannot be selected in combination with `login_required`. */
  readonly verificationPhoneNumber?: string | null;
  /**
   * If set, the signer is required to enter the password before they are able
   * to sign a document. This field is write only. */
  readonly password?: string | null;
  /**
   * If set, signers who have the same value will be assigned to the same input and to the same signer group.
   * A signer group is not a Box Group. It is an entity that belongs to a Sign Request and can only be
   * used/accessed within this Sign Request. A signer group is expected to have more than one signer.
   * If the provided value is only used for one signer, this value will be ignored and request will be handled
   * as it was intended for an individual signer. The value provided can be any string and only used to
   * determine which signers belongs to same group. A successful response will provide a generated UUID value
   * instead for signers in the same signer group. */
  readonly signerGroupId?: string | null;
  /**
   * If true, no emails about the sign request will be sent. */
  readonly suppressNotifications?: boolean | null;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestCreateSignerRoleField(
  val: SignRequestCreateSignerRoleField,
): SerializedData {
  return val;
}
export function deserializeSignRequestCreateSignerRoleField(
  val: SerializedData,
): SignRequestCreateSignerRoleField {
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
    message: "Can't deserialize SignRequestCreateSignerRoleField",
  });
}
export function serializeSignRequestCreateSigner(
  val: SignRequestCreateSigner,
): SerializedData {
  return {
    ['email']: val.email,
    ['role']:
      val.role == void 0
        ? val.role
        : serializeSignRequestCreateSignerRoleField(val.role),
    ['is_in_person']: val.isInPerson,
    ['order']: val.order,
    ['embed_url_external_user_id']: val.embedUrlExternalUserId,
    ['redirect_url']: val.redirectUrl,
    ['declined_redirect_url']: val.declinedRedirectUrl,
    ['login_required']: val.loginRequired,
    ['verification_phone_number']: val.verificationPhoneNumber,
    ['password']: val.password,
    ['signer_group_id']: val.signerGroupId,
    ['suppress_notifications']: val.suppressNotifications,
  };
}
export function deserializeSignRequestCreateSigner(
  val: SerializedData,
): SignRequestCreateSigner {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestCreateSigner"',
    });
  }
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "SignRequestCreateSigner"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  const role: undefined | SignRequestCreateSignerRoleField =
    val.role == void 0
      ? void 0
      : deserializeSignRequestCreateSignerRoleField(val.role);
  if (!(val.is_in_person == void 0) && !sdIsBoolean(val.is_in_person)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_in_person" of type "SignRequestCreateSigner"',
    });
  }
  const isInPerson: undefined | boolean =
    val.is_in_person == void 0 ? void 0 : val.is_in_person;
  if (!(val.order == void 0) && !sdIsNumber(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting number for "order" of type "SignRequestCreateSigner"',
    });
  }
  const order: undefined | number = val.order == void 0 ? void 0 : val.order;
  if (
    !(val.embed_url_external_user_id == void 0) &&
    !sdIsString(val.embed_url_external_user_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "embed_url_external_user_id" of type "SignRequestCreateSigner"',
    });
  }
  const embedUrlExternalUserId: undefined | string =
    val.embed_url_external_user_id == void 0
      ? void 0
      : val.embed_url_external_user_id;
  if (!(val.redirect_url == void 0) && !sdIsString(val.redirect_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "redirect_url" of type "SignRequestCreateSigner"',
    });
  }
  const redirectUrl: undefined | string =
    val.redirect_url == void 0 ? void 0 : val.redirect_url;
  if (
    !(val.declined_redirect_url == void 0) &&
    !sdIsString(val.declined_redirect_url)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "declined_redirect_url" of type "SignRequestCreateSigner"',
    });
  }
  const declinedRedirectUrl: undefined | string =
    val.declined_redirect_url == void 0 ? void 0 : val.declined_redirect_url;
  if (!(val.login_required == void 0) && !sdIsBoolean(val.login_required)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "login_required" of type "SignRequestCreateSigner"',
    });
  }
  const loginRequired: undefined | boolean =
    val.login_required == void 0 ? void 0 : val.login_required;
  if (
    !(val.verification_phone_number == void 0) &&
    !sdIsString(val.verification_phone_number)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "verification_phone_number" of type "SignRequestCreateSigner"',
    });
  }
  const verificationPhoneNumber: undefined | string =
    val.verification_phone_number == void 0
      ? void 0
      : val.verification_phone_number;
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "SignRequestCreateSigner"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.signer_group_id == void 0) && !sdIsString(val.signer_group_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "signer_group_id" of type "SignRequestCreateSigner"',
    });
  }
  const signerGroupId: undefined | string =
    val.signer_group_id == void 0 ? void 0 : val.signer_group_id;
  if (
    !(val.suppress_notifications == void 0) &&
    !sdIsBoolean(val.suppress_notifications)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "suppress_notifications" of type "SignRequestCreateSigner"',
    });
  }
  const suppressNotifications: undefined | boolean =
    val.suppress_notifications == void 0 ? void 0 : val.suppress_notifications;
  return {
    email: email,
    role: role,
    isInPerson: isInPerson,
    order: order,
    embedUrlExternalUserId: embedUrlExternalUserId,
    redirectUrl: redirectUrl,
    declinedRedirectUrl: declinedRedirectUrl,
    loginRequired: loginRequired,
    verificationPhoneNumber: verificationPhoneNumber,
    password: password,
    signerGroupId: signerGroupId,
    suppressNotifications: suppressNotifications,
  } satisfies SignRequestCreateSigner;
}
