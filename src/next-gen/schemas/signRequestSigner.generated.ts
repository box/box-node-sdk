import { serializeSignRequestCreateSignerRoleField } from './signRequestCreateSigner.generated.js';
import { deserializeSignRequestCreateSignerRoleField } from './signRequestCreateSigner.generated.js';
import { serializeSignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { deserializeSignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { serializeSignRequestSignerInput } from './signRequestSignerInput.generated.js';
import { deserializeSignRequestSignerInput } from './signRequestSignerInput.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { SignRequestCreateSignerRoleField } from './signRequestCreateSigner.generated.js';
import { SignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { SignRequestSignerInput } from './signRequestSignerInput.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SignRequestSignerSignerDecisionTypeField = 'signed' | 'declined';
export interface SignRequestSignerSignerDecisionField {
  /**
   * Type of decision made by the signer. */
  readonly type?: SignRequestSignerSignerDecisionTypeField;
  /**
   * Date and Time that the decision was made. */
  readonly finalizedAt?: DateTime;
  /**
   * Additional info about the decision, such as the decline reason from the signer. */
  readonly additionalInfo?: string | null;
  readonly rawData?: SerializedData;
}
export type SignRequestSigner = SignRequestCreateSigner & {
  /**
   * Set to `true` if the signer views the document */
  readonly hasViewedDocument?: boolean;
  /**
   * Final decision made by the signer. */
  readonly signerDecision?: SignRequestSignerSignerDecisionField | null;
  readonly inputs?: readonly SignRequestSignerInput[];
  /**
   * URL to direct a signer to for signing */
  readonly embedUrl?: string | null;
  /**
   * This URL is specifically designed for
   * signing documents within an HTML `iframe` tag.
   * It will be returned in the response
   * only if the `embed_url_external_user_id`
   * parameter was passed in the
   * `create Box Sign request` call. */
  readonly iframeableEmbedUrl?: string | null;
};
export function serializeSignRequestSignerSignerDecisionTypeField(
  val: SignRequestSignerSignerDecisionTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerSignerDecisionTypeField(
  val: SerializedData,
): SignRequestSignerSignerDecisionTypeField {
  if (val == 'signed') {
    return val;
  }
  if (val == 'declined') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignRequestSignerSignerDecisionTypeField",
  });
}
export function serializeSignRequestSignerSignerDecisionField(
  val: SignRequestSignerSignerDecisionField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeSignRequestSignerSignerDecisionTypeField(val.type),
    ['finalized_at']:
      val.finalizedAt == void 0
        ? val.finalizedAt
        : serializeDateTime(val.finalizedAt),
    ['additional_info']: val.additionalInfo,
  };
}
export function deserializeSignRequestSignerSignerDecisionField(
  val: SerializedData,
): SignRequestSignerSignerDecisionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerSignerDecisionField"',
    });
  }
  const type: undefined | SignRequestSignerSignerDecisionTypeField =
    val.type == void 0
      ? void 0
      : deserializeSignRequestSignerSignerDecisionTypeField(val.type);
  if (!(val.finalized_at == void 0) && !sdIsString(val.finalized_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "finalized_at" of type "SignRequestSignerSignerDecisionField"',
    });
  }
  const finalizedAt: undefined | DateTime =
    val.finalized_at == void 0 ? void 0 : deserializeDateTime(val.finalized_at);
  if (!(val.additional_info == void 0) && !sdIsString(val.additional_info)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "additional_info" of type "SignRequestSignerSignerDecisionField"',
    });
  }
  const additionalInfo: undefined | string =
    val.additional_info == void 0 ? void 0 : val.additional_info;
  return {
    type: type,
    finalizedAt: finalizedAt,
    additionalInfo: additionalInfo,
  } satisfies SignRequestSignerSignerDecisionField;
}
export function serializeSignRequestSigner(
  val: SignRequestSigner,
): SerializedData {
  const base: any = serializeSignRequestCreateSigner(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSigner"',
    });
  }
  return {
    ...base,
    ...{
      ['has_viewed_document']: val.hasViewedDocument,
      ['signer_decision']:
        val.signerDecision == void 0
          ? val.signerDecision
          : serializeSignRequestSignerSignerDecisionField(val.signerDecision),
      ['inputs']:
        val.inputs == void 0
          ? val.inputs
          : (val.inputs.map(function (
              item: SignRequestSignerInput,
            ): SerializedData {
              return serializeSignRequestSignerInput(item);
            }) as readonly any[]),
      ['embed_url']: val.embedUrl,
      ['iframeable_embed_url']: val.iframeableEmbedUrl,
    },
  };
}
export function deserializeSignRequestSigner(
  val: SerializedData,
): SignRequestSigner {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSigner"',
    });
  }
  if (
    !(val.has_viewed_document == void 0) &&
    !sdIsBoolean(val.has_viewed_document)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "has_viewed_document" of type "SignRequestSigner"',
    });
  }
  const hasViewedDocument: undefined | boolean =
    val.has_viewed_document == void 0 ? void 0 : val.has_viewed_document;
  const signerDecision: undefined | SignRequestSignerSignerDecisionField =
    val.signer_decision == void 0
      ? void 0
      : deserializeSignRequestSignerSignerDecisionField(val.signer_decision);
  if (!(val.inputs == void 0) && !sdIsList(val.inputs)) {
    throw new BoxSdkError({
      message: 'Expecting array for "inputs" of type "SignRequestSigner"',
    });
  }
  const inputs: undefined | readonly SignRequestSignerInput[] =
    val.inputs == void 0
      ? void 0
      : sdIsList(val.inputs)
        ? (val.inputs.map(function (
            itm: SerializedData,
          ): SignRequestSignerInput {
            return deserializeSignRequestSignerInput(itm);
          }) as readonly any[])
        : [];
  if (!(val.embed_url == void 0) && !sdIsString(val.embed_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "embed_url" of type "SignRequestSigner"',
    });
  }
  const embedUrl: undefined | string =
    val.embed_url == void 0 ? void 0 : val.embed_url;
  if (
    !(val.iframeable_embed_url == void 0) &&
    !sdIsString(val.iframeable_embed_url)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "iframeable_embed_url" of type "SignRequestSigner"',
    });
  }
  const iframeableEmbedUrl: undefined | string =
    val.iframeable_embed_url == void 0 ? void 0 : val.iframeable_embed_url;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "SignRequestSigner"',
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
        'Expecting boolean for "is_in_person" of type "SignRequestSigner"',
    });
  }
  const isInPerson: undefined | boolean =
    val.is_in_person == void 0 ? void 0 : val.is_in_person;
  if (!(val.order == void 0) && !sdIsNumber(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting number for "order" of type "SignRequestSigner"',
    });
  }
  const order: undefined | number = val.order == void 0 ? void 0 : val.order;
  if (
    !(val.embed_url_external_user_id == void 0) &&
    !sdIsString(val.embed_url_external_user_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "embed_url_external_user_id" of type "SignRequestSigner"',
    });
  }
  const embedUrlExternalUserId: undefined | string =
    val.embed_url_external_user_id == void 0
      ? void 0
      : val.embed_url_external_user_id;
  if (!(val.redirect_url == void 0) && !sdIsString(val.redirect_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "redirect_url" of type "SignRequestSigner"',
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
        'Expecting string for "declined_redirect_url" of type "SignRequestSigner"',
    });
  }
  const declinedRedirectUrl: undefined | string =
    val.declined_redirect_url == void 0 ? void 0 : val.declined_redirect_url;
  if (!(val.login_required == void 0) && !sdIsBoolean(val.login_required)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "login_required" of type "SignRequestSigner"',
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
        'Expecting string for "verification_phone_number" of type "SignRequestSigner"',
    });
  }
  const verificationPhoneNumber: undefined | string =
    val.verification_phone_number == void 0
      ? void 0
      : val.verification_phone_number;
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message: 'Expecting string for "password" of type "SignRequestSigner"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.signer_group_id == void 0) && !sdIsString(val.signer_group_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "signer_group_id" of type "SignRequestSigner"',
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
        'Expecting boolean for "suppress_notifications" of type "SignRequestSigner"',
    });
  }
  const suppressNotifications: undefined | boolean =
    val.suppress_notifications == void 0 ? void 0 : val.suppress_notifications;
  return {
    hasViewedDocument: hasViewedDocument,
    signerDecision: signerDecision,
    inputs: inputs,
    embedUrl: embedUrl,
    iframeableEmbedUrl: iframeableEmbedUrl,
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
  } satisfies SignRequestSigner;
}
