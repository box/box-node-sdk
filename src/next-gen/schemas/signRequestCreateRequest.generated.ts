import { serializeSignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { deserializeSignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { serializeSignRequestBase } from './signRequestBase.generated.js';
import { deserializeSignRequestBase } from './signRequestBase.generated.js';
import { serializeFileBase } from './fileBase.generated.js';
import { deserializeFileBase } from './fileBase.generated.js';
import { serializeSignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { deserializeSignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { SignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { SignRequestBase } from './signRequestBase.generated.js';
import { FileBase } from './fileBase.generated.js';
import { SignRequestCreateSigner } from './signRequestCreateSigner.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SignRequestCreateRequestSignatureColorField =
  | 'blue'
  | 'black'
  | 'red'
  | string;
export type SignRequestCreateRequest = SignRequestBase & {
  /**
   * List of files to create a signing document from. This is currently limited to ten files. Only the ID and type fields are required for each file. */
  readonly sourceFiles?: readonly FileBase[] | null;
  /**
   * Force a specific color for the signature (blue, black, or red) */
  readonly signatureColor?: SignRequestCreateRequestSignatureColorField | null;
  /**
   * Array of signers for the signature request. 35 is the
   * max number of signers permitted.
   *
   * **Note**: It may happen that some signers belong to conflicting [segments](r://shield-information-barrier-segment-member) (user groups).
   * This means that due to the security policies, users are assigned to segments to prevent exchanges or communication that could lead to ethical conflicts.
   * In such a case, an attempt to send the sign request will result in an error.
   *
   * Read more about [segments and ethical walls](https://support.box.com/hc/en-us/articles/9920431507603-Understanding-Information-Barriers#h_01GFVJEHQA06N7XEZ4GCZ9GFAQ). */
  readonly signers: readonly SignRequestCreateSigner[];
  readonly parentFolder?: FolderMini;
};
export function serializeSignRequestCreateRequestSignatureColorField(
  val: SignRequestCreateRequestSignatureColorField,
): SerializedData {
  return val;
}
export function deserializeSignRequestCreateRequestSignatureColorField(
  val: SerializedData,
): SignRequestCreateRequestSignatureColorField {
  if (val == 'blue') {
    return val;
  }
  if (val == 'black') {
    return val;
  }
  if (val == 'red') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignRequestCreateRequestSignatureColorField",
  });
}
export function serializeSignRequestCreateRequest(
  val: SignRequestCreateRequest,
): SerializedData {
  const base: any = serializeSignRequestBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestCreateRequest"',
    });
  }
  return {
    ...base,
    ...{
      ['source_files']:
        val.sourceFiles == void 0
          ? val.sourceFiles
          : (val.sourceFiles.map(function (item: FileBase): SerializedData {
              return serializeFileBase(item);
            }) as readonly any[]),
      ['signature_color']:
        val.signatureColor == void 0
          ? val.signatureColor
          : serializeSignRequestCreateRequestSignatureColorField(
              val.signatureColor,
            ),
      ['signers']: val.signers.map(function (
        item: SignRequestCreateSigner,
      ): SerializedData {
        return serializeSignRequestCreateSigner(item);
      }) as readonly any[],
      ['parent_folder']:
        val.parentFolder == void 0
          ? val.parentFolder
          : serializeFolderMini(val.parentFolder),
    },
  };
}
export function deserializeSignRequestCreateRequest(
  val: SerializedData,
): SignRequestCreateRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestCreateRequest"',
    });
  }
  if (!(val.source_files == void 0) && !sdIsList(val.source_files)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "source_files" of type "SignRequestCreateRequest"',
    });
  }
  const sourceFiles: undefined | readonly FileBase[] =
    val.source_files == void 0
      ? void 0
      : sdIsList(val.source_files)
        ? (val.source_files.map(function (itm: SerializedData): FileBase {
            return deserializeFileBase(itm);
          }) as readonly any[])
        : [];
  const signatureColor:
    | undefined
    | SignRequestCreateRequestSignatureColorField =
    val.signature_color == void 0
      ? void 0
      : deserializeSignRequestCreateRequestSignatureColorField(
          val.signature_color,
        );
  if (val.signers == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "signers" of type "SignRequestCreateRequest" to be defined',
    });
  }
  if (!sdIsList(val.signers)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "signers" of type "SignRequestCreateRequest"',
    });
  }
  const signers: readonly SignRequestCreateSigner[] = sdIsList(val.signers)
    ? (val.signers.map(function (itm: SerializedData): SignRequestCreateSigner {
        return deserializeSignRequestCreateSigner(itm);
      }) as readonly any[])
    : [];
  const parentFolder: undefined | FolderMini =
    val.parent_folder == void 0
      ? void 0
      : deserializeFolderMini(val.parent_folder);
  if (
    !(val.is_document_preparation_needed == void 0) &&
    !sdIsBoolean(val.is_document_preparation_needed)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_document_preparation_needed" of type "SignRequestCreateRequest"',
    });
  }
  const isDocumentPreparationNeeded: undefined | boolean =
    val.is_document_preparation_needed == void 0
      ? void 0
      : val.is_document_preparation_needed;
  if (!(val.redirect_url == void 0) && !sdIsString(val.redirect_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "redirect_url" of type "SignRequestCreateRequest"',
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
        'Expecting string for "declined_redirect_url" of type "SignRequestCreateRequest"',
    });
  }
  const declinedRedirectUrl: undefined | string =
    val.declined_redirect_url == void 0 ? void 0 : val.declined_redirect_url;
  if (
    !(val.are_text_signatures_enabled == void 0) &&
    !sdIsBoolean(val.are_text_signatures_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_text_signatures_enabled" of type "SignRequestCreateRequest"',
    });
  }
  const areTextSignaturesEnabled: undefined | boolean =
    val.are_text_signatures_enabled == void 0
      ? void 0
      : val.are_text_signatures_enabled;
  if (!(val.email_subject == void 0) && !sdIsString(val.email_subject)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email_subject" of type "SignRequestCreateRequest"',
    });
  }
  const emailSubject: undefined | string =
    val.email_subject == void 0 ? void 0 : val.email_subject;
  if (!(val.email_message == void 0) && !sdIsString(val.email_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email_message" of type "SignRequestCreateRequest"',
    });
  }
  const emailMessage: undefined | string =
    val.email_message == void 0 ? void 0 : val.email_message;
  if (
    !(val.are_reminders_enabled == void 0) &&
    !sdIsBoolean(val.are_reminders_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_reminders_enabled" of type "SignRequestCreateRequest"',
    });
  }
  const areRemindersEnabled: undefined | boolean =
    val.are_reminders_enabled == void 0 ? void 0 : val.are_reminders_enabled;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "SignRequestCreateRequest"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.prefill_tags == void 0) && !sdIsList(val.prefill_tags)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "prefill_tags" of type "SignRequestCreateRequest"',
    });
  }
  const prefillTags: undefined | readonly SignRequestPrefillTag[] =
    val.prefill_tags == void 0
      ? void 0
      : sdIsList(val.prefill_tags)
        ? (val.prefill_tags.map(function (
            itm: SerializedData,
          ): SignRequestPrefillTag {
            return deserializeSignRequestPrefillTag(itm);
          }) as readonly any[])
        : [];
  if (!(val.days_valid == void 0) && !sdIsNumber(val.days_valid)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "days_valid" of type "SignRequestCreateRequest"',
    });
  }
  const daysValid: undefined | number =
    val.days_valid == void 0 ? void 0 : val.days_valid;
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_id" of type "SignRequestCreateRequest"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  if (!(val.template_id == void 0) && !sdIsString(val.template_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "template_id" of type "SignRequestCreateRequest"',
    });
  }
  const templateId: undefined | string =
    val.template_id == void 0 ? void 0 : val.template_id;
  if (
    !(val.external_system_name == void 0) &&
    !sdIsString(val.external_system_name)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "external_system_name" of type "SignRequestCreateRequest"',
    });
  }
  const externalSystemName: undefined | string =
    val.external_system_name == void 0 ? void 0 : val.external_system_name;
  return {
    sourceFiles: sourceFiles,
    signatureColor: signatureColor,
    signers: signers,
    parentFolder: parentFolder,
    isDocumentPreparationNeeded: isDocumentPreparationNeeded,
    redirectUrl: redirectUrl,
    declinedRedirectUrl: declinedRedirectUrl,
    areTextSignaturesEnabled: areTextSignaturesEnabled,
    emailSubject: emailSubject,
    emailMessage: emailMessage,
    areRemindersEnabled: areRemindersEnabled,
    name: name,
    prefillTags: prefillTags,
    daysValid: daysValid,
    externalId: externalId,
    templateId: templateId,
    externalSystemName: externalSystemName,
  } satisfies SignRequestCreateRequest;
}
