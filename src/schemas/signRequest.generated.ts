import { serializeSignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { deserializeSignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { serializeSignRequestBase } from './signRequestBase.generated.js';
import { deserializeSignRequestBase } from './signRequestBase.generated.js';
import { serializeFileBase } from './fileBase.generated.js';
import { deserializeFileBase } from './fileBase.generated.js';
import { serializeSignRequestSigner } from './signRequestSigner.generated.js';
import { deserializeSignRequestSigner } from './signRequestSigner.generated.js';
import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { SignRequestPrefillTag } from './signRequestPrefillTag.generated.js';
import { SignRequestBase } from './signRequestBase.generated.js';
import { FileBase } from './fileBase.generated.js';
import { SignRequestSigner } from './signRequestSigner.generated.js';
import { FileMini } from './fileMini.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SignRequestTypeField = 'sign-request';
export type SignRequestStatusField =
  | 'converting'
  | 'created'
  | 'sent'
  | 'viewed'
  | 'signed'
  | 'cancelled'
  | 'declined'
  | 'error_converting'
  | 'error_sending'
  | 'expired'
  | 'finalizing'
  | 'error_finalizing'
  | string;
export interface SignRequestSignFilesField {
  readonly files?: readonly FileMini[];
  /**
   * Indicates whether the `sign_files` documents are processing
   * and the PDFs may be out of date. A change to any document
   * requires processing on all `sign_files`. We
   * recommended waiting until processing is finished
   * (and this value is true) before downloading the PDFs. */
  readonly isReadyForDownload?: boolean;
  readonly rawData?: SerializedData;
}
export type SignRequest = SignRequestBase & {
  /**
   * The value will always be `sign-request`. */
  readonly type?: SignRequestTypeField;
  /**
   * List of files to create a signing document from. This is currently limited to ten files. Only the ID and type fields are required for each file. */
  readonly sourceFiles?: readonly FileBase[];
  /**
   * Array of signers for the signature request. */
  readonly signers?: readonly SignRequestSigner[];
  /**
   * Force a specific color for the signature (blue, black, or red). */
  readonly signatureColor?: string | null;
  /**
   * Box Sign request ID. */
  readonly id?: string;
  /**
   * This URL is returned if `is_document_preparation_needed` is
   * set to `true` in the request. The parameter is used to prepare
   * the signature request
   * using the UI. The signature request is not
   * sent until the preparation
   * phase is complete. */
  readonly prepareUrl?: string | null;
  readonly signingLog?: FileMini;
  /**
   * Describes the status of the signature request. */
  readonly status?: SignRequestStatusField;
  /**
   * List of files that will be signed, which are copies of the original
   * source files. A new version of these files are created as signers sign
   * and can be downloaded at any point in the signing process. */
  readonly signFiles?: SignRequestSignFilesField;
  /**
   * Uses `days_valid` to calculate the date and time, in GMT, the sign request will expire if unsigned. */
  readonly autoExpireAt?: DateTime | null;
  readonly parentFolder?: FolderMini;
  /**
   * The collaborator level of the user to the sign request. Values can include "owner", "editor", and "viewer". */
  readonly collaboratorLevel?: string | null;
  /**
   * The email address of the sender of the sign request. */
  readonly senderEmail?: string | null;
  /**
   * The user ID of the sender of the sign request. */
  readonly senderId?: number | null;
};
export function serializeSignRequestTypeField(
  val: SignRequestTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestTypeField(
  val: SerializedData,
): SignRequestTypeField {
  if (val == 'sign-request') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize SignRequestTypeField" });
}
export function serializeSignRequestStatusField(
  val: SignRequestStatusField,
): SerializedData {
  return val;
}
export function deserializeSignRequestStatusField(
  val: SerializedData,
): SignRequestStatusField {
  if (val == 'converting') {
    return val;
  }
  if (val == 'created') {
    return val;
  }
  if (val == 'sent') {
    return val;
  }
  if (val == 'viewed') {
    return val;
  }
  if (val == 'signed') {
    return val;
  }
  if (val == 'cancelled') {
    return val;
  }
  if (val == 'declined') {
    return val;
  }
  if (val == 'error_converting') {
    return val;
  }
  if (val == 'error_sending') {
    return val;
  }
  if (val == 'expired') {
    return val;
  }
  if (val == 'finalizing') {
    return val;
  }
  if (val == 'error_finalizing') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignRequestStatusField",
  });
}
export function serializeSignRequestSignFilesField(
  val: SignRequestSignFilesField,
): SerializedData {
  return {
    ['files']:
      val.files == void 0
        ? val.files
        : (val.files.map(function (item: FileMini): SerializedData {
            return serializeFileMini(item);
          }) as readonly any[]),
    ['is_ready_for_download']: val.isReadyForDownload,
  };
}
export function deserializeSignRequestSignFilesField(
  val: SerializedData,
): SignRequestSignFilesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignFilesField"',
    });
  }
  if (!(val.files == void 0) && !sdIsList(val.files)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "files" of type "SignRequestSignFilesField"',
    });
  }
  const files: undefined | readonly FileMini[] =
    val.files == void 0
      ? void 0
      : sdIsList(val.files)
        ? (val.files.map(function (itm: SerializedData): FileMini {
            return deserializeFileMini(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.is_ready_for_download == void 0) &&
    !sdIsBoolean(val.is_ready_for_download)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_ready_for_download" of type "SignRequestSignFilesField"',
    });
  }
  const isReadyForDownload: undefined | boolean =
    val.is_ready_for_download == void 0 ? void 0 : val.is_ready_for_download;
  return {
    files: files,
    isReadyForDownload: isReadyForDownload,
  } satisfies SignRequestSignFilesField;
}
export function serializeSignRequest(val: SignRequest): SerializedData {
  const base: any = serializeSignRequestBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "SignRequest"' });
  }
  return {
    ...base,
    ...{
      ['type']:
        val.type == void 0 ? val.type : serializeSignRequestTypeField(val.type),
      ['source_files']:
        val.sourceFiles == void 0
          ? val.sourceFiles
          : (val.sourceFiles.map(function (item: FileBase): SerializedData {
              return serializeFileBase(item);
            }) as readonly any[]),
      ['signers']:
        val.signers == void 0
          ? val.signers
          : (val.signers.map(function (
              item: SignRequestSigner,
            ): SerializedData {
              return serializeSignRequestSigner(item);
            }) as readonly any[]),
      ['signature_color']: val.signatureColor,
      ['id']: val.id,
      ['prepare_url']: val.prepareUrl,
      ['signing_log']:
        val.signingLog == void 0
          ? val.signingLog
          : serializeFileMini(val.signingLog),
      ['status']:
        val.status == void 0
          ? val.status
          : serializeSignRequestStatusField(val.status),
      ['sign_files']:
        val.signFiles == void 0
          ? val.signFiles
          : serializeSignRequestSignFilesField(val.signFiles),
      ['auto_expire_at']:
        val.autoExpireAt == void 0
          ? val.autoExpireAt
          : serializeDateTime(val.autoExpireAt),
      ['parent_folder']:
        val.parentFolder == void 0
          ? val.parentFolder
          : serializeFolderMini(val.parentFolder),
      ['collaborator_level']: val.collaboratorLevel,
      ['sender_email']: val.senderEmail,
      ['sender_id']: val.senderId,
    },
  };
}
export function deserializeSignRequest(val: SerializedData): SignRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "SignRequest"' });
  }
  const type: undefined | SignRequestTypeField =
    val.type == void 0 ? void 0 : deserializeSignRequestTypeField(val.type);
  if (!(val.source_files == void 0) && !sdIsList(val.source_files)) {
    throw new BoxSdkError({
      message: 'Expecting array for "source_files" of type "SignRequest"',
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
  if (!(val.signers == void 0) && !sdIsList(val.signers)) {
    throw new BoxSdkError({
      message: 'Expecting array for "signers" of type "SignRequest"',
    });
  }
  const signers: undefined | readonly SignRequestSigner[] =
    val.signers == void 0
      ? void 0
      : sdIsList(val.signers)
        ? (val.signers.map(function (itm: SerializedData): SignRequestSigner {
            return deserializeSignRequestSigner(itm);
          }) as readonly any[])
        : [];
  if (!(val.signature_color == void 0) && !sdIsString(val.signature_color)) {
    throw new BoxSdkError({
      message: 'Expecting string for "signature_color" of type "SignRequest"',
    });
  }
  const signatureColor: undefined | string =
    val.signature_color == void 0 ? void 0 : val.signature_color;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "SignRequest"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.prepare_url == void 0) && !sdIsString(val.prepare_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prepare_url" of type "SignRequest"',
    });
  }
  const prepareUrl: undefined | string =
    val.prepare_url == void 0 ? void 0 : val.prepare_url;
  const signingLog: undefined | FileMini =
    val.signing_log == void 0 ? void 0 : deserializeFileMini(val.signing_log);
  const status: undefined | SignRequestStatusField =
    val.status == void 0
      ? void 0
      : deserializeSignRequestStatusField(val.status);
  const signFiles: undefined | SignRequestSignFilesField =
    val.sign_files == void 0
      ? void 0
      : deserializeSignRequestSignFilesField(val.sign_files);
  if (!(val.auto_expire_at == void 0) && !sdIsString(val.auto_expire_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "auto_expire_at" of type "SignRequest"',
    });
  }
  const autoExpireAt: undefined | DateTime =
    val.auto_expire_at == void 0
      ? void 0
      : deserializeDateTime(val.auto_expire_at);
  const parentFolder: undefined | FolderMini =
    val.parent_folder == void 0
      ? void 0
      : deserializeFolderMini(val.parent_folder);
  if (
    !(val.collaborator_level == void 0) &&
    !sdIsString(val.collaborator_level)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "collaborator_level" of type "SignRequest"',
    });
  }
  const collaboratorLevel: undefined | string =
    val.collaborator_level == void 0 ? void 0 : val.collaborator_level;
  if (!(val.sender_email == void 0) && !sdIsString(val.sender_email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sender_email" of type "SignRequest"',
    });
  }
  const senderEmail: undefined | string =
    val.sender_email == void 0 ? void 0 : val.sender_email;
  if (!(val.sender_id == void 0) && !sdIsNumber(val.sender_id)) {
    throw new BoxSdkError({
      message: 'Expecting number for "sender_id" of type "SignRequest"',
    });
  }
  const senderId: undefined | number =
    val.sender_id == void 0 ? void 0 : val.sender_id;
  if (
    !(val.is_document_preparation_needed == void 0) &&
    !sdIsBoolean(val.is_document_preparation_needed)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_document_preparation_needed" of type "SignRequest"',
    });
  }
  const isDocumentPreparationNeeded: undefined | boolean =
    val.is_document_preparation_needed == void 0
      ? void 0
      : val.is_document_preparation_needed;
  if (!(val.redirect_url == void 0) && !sdIsString(val.redirect_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "redirect_url" of type "SignRequest"',
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
        'Expecting string for "declined_redirect_url" of type "SignRequest"',
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
        'Expecting boolean for "are_text_signatures_enabled" of type "SignRequest"',
    });
  }
  const areTextSignaturesEnabled: undefined | boolean =
    val.are_text_signatures_enabled == void 0
      ? void 0
      : val.are_text_signatures_enabled;
  if (!(val.email_subject == void 0) && !sdIsString(val.email_subject)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email_subject" of type "SignRequest"',
    });
  }
  const emailSubject: undefined | string =
    val.email_subject == void 0 ? void 0 : val.email_subject;
  if (!(val.email_message == void 0) && !sdIsString(val.email_message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email_message" of type "SignRequest"',
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
        'Expecting boolean for "are_reminders_enabled" of type "SignRequest"',
    });
  }
  const areRemindersEnabled: undefined | boolean =
    val.are_reminders_enabled == void 0 ? void 0 : val.are_reminders_enabled;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "SignRequest"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.prefill_tags == void 0) && !sdIsList(val.prefill_tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "prefill_tags" of type "SignRequest"',
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
      message: 'Expecting number for "days_valid" of type "SignRequest"',
    });
  }
  const daysValid: undefined | number =
    val.days_valid == void 0 ? void 0 : val.days_valid;
  if (!(val.external_id == void 0) && !sdIsString(val.external_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "external_id" of type "SignRequest"',
    });
  }
  const externalId: undefined | string =
    val.external_id == void 0 ? void 0 : val.external_id;
  if (!(val.template_id == void 0) && !sdIsString(val.template_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "template_id" of type "SignRequest"',
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
        'Expecting string for "external_system_name" of type "SignRequest"',
    });
  }
  const externalSystemName: undefined | string =
    val.external_system_name == void 0 ? void 0 : val.external_system_name;
  return {
    type: type,
    sourceFiles: sourceFiles,
    signers: signers,
    signatureColor: signatureColor,
    id: id,
    prepareUrl: prepareUrl,
    signingLog: signingLog,
    status: status,
    signFiles: signFiles,
    autoExpireAt: autoExpireAt,
    parentFolder: parentFolder,
    collaboratorLevel: collaboratorLevel,
    senderEmail: senderEmail,
    senderId: senderId,
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
  } satisfies SignRequest;
}
