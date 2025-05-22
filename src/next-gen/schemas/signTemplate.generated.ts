import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeTemplateSigner } from './templateSigner.generated.js';
import { deserializeTemplateSigner } from './templateSigner.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { TemplateSigner } from './templateSigner.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SignTemplateTypeField = 'sign-template';
export type SignTemplateAdditionalInfoNonEditableField =
  | 'email_subject'
  | 'email_message'
  | 'name'
  | 'days_valid'
  | 'signers'
  | 'source_files'
  | string;
export type SignTemplateAdditionalInfoRequiredSignersField = 'email' | string;
export interface SignTemplateAdditionalInfoRequiredField {
  /**
   * Required signer fields. */
  readonly signers?: readonly (readonly SignTemplateAdditionalInfoRequiredSignersField[])[];
  readonly rawData?: SerializedData;
}
export interface SignTemplateAdditionalInfoField {
  /**
   * Non editable fields. */
  readonly nonEditable?: readonly SignTemplateAdditionalInfoNonEditableField[];
  /**
   * Required fields. */
  readonly required?: SignTemplateAdditionalInfoRequiredField;
  readonly rawData?: SerializedData;
}
export interface SignTemplateReadySignLinkField {
  /**
   * The URL that can be sent to signers. */
  readonly url?: string;
  /**
   * Request name. */
  readonly name?: string | null;
  /**
   * Extra instructions for all signers. */
  readonly instructions?: string | null;
  /**
   * The destination folder to place final,
   * signed document and signing
   * log. Only `ID` and `type` fields are required.
   * The root folder,
   * folder ID `0`, cannot be used. */
  readonly folderId?: string | null;
  /**
   * Whether to disable notifications when
   * a signer has signed. */
  readonly isNotificationDisabled?: boolean;
  /**
   * Whether the ready sign link is enabled or not. */
  readonly isActive?: boolean;
  readonly rawData?: SerializedData;
}
export interface SignTemplateCustomBrandingField {
  /**
   * Name of the company */
  readonly companyName?: string | null;
  /**
   * Custom branding logo URI in the form of a base64 image. */
  readonly logoUri?: string | null;
  /**
   * Custom branding color in hex. */
  readonly brandingColor?: string | null;
  /**
   * Content of the email footer. */
  readonly emailFooterText?: string | null;
  readonly rawData?: SerializedData;
}
export interface SignTemplate {
  /**
   * object type */
  readonly type?: SignTemplateTypeField;
  /**
   * Template identifier. */
  readonly id?: string;
  /**
   * The name of the template. */
  readonly name?: string | null;
  /**
   * Subject of signature request email. This is cleaned by sign request. If this field is not passed, a default subject will be used. */
  readonly emailSubject?: string | null;
  /**
   * Message to include in signature request email. The field is cleaned through sanitization of specific characters. However, some html tags are allowed. Links included in the message are also converted to hyperlinks in the email. The message may contain the following html tags including `a`, `abbr`, `acronym`, `b`, `blockquote`, `code`, `em`, `i`, `ul`, `li`, `ol`, and `strong`. Be aware that when the text to html ratio is too high, the email may end up in spam filters. Custom styles on these tags are not allowed. If this field is not passed, a default message will be used. */
  readonly emailMessage?: string | null;
  /**
   * Set the number of days after which the created signature request will automatically expire if not completed. By default, we do not apply any expiration date on signature requests, and the signature request does not expire. */
  readonly daysValid?: number | null;
  readonly parentFolder?: FolderMini;
  /**
   * List of files to create a signing document from. Only the ID and type fields are required for each file. */
  readonly sourceFiles?: readonly FileMini[];
  /**
   * Indicates if the template input fields are editable or not. */
  readonly areFieldsLocked?: boolean;
  /**
   * Indicates if the template document options are editable or not, for example renaming the document. */
  readonly areOptionsLocked?: boolean;
  /**
   * Indicates if the template signers are editable or not. */
  readonly areRecipientsLocked?: boolean;
  /**
   * Indicates if the template email settings are editable or not. */
  readonly areEmailSettingsLocked?: boolean;
  /**
   * Indicates if the template files are editable or not. This includes deleting or renaming template files. */
  readonly areFilesLocked?: boolean;
  /**
   * Array of signers for the template.
   *
   * **Note**: It may happen that some signers specified in the template belong to conflicting [segments](r://shield-information-barrier-segment-member) (user groups).
   * This means that due to the security policies, users are assigned to segments to prevent exchanges or communication that could lead to ethical conflicts.
   * In such a case, an attempt to send a sign request based on a template that lists signers in conflicting segments will result in an error.
   *
   * Read more about [segments and ethical walls](https://support.box.com/hc/en-us/articles/9920431507603-Understanding-Information-Barriers#h_01GFVJEHQA06N7XEZ4GCZ9GFAQ). */
  readonly signers?: readonly TemplateSigner[];
  /**
   * Additional information on which fields are required and which fields are not editable. */
  readonly additionalInfo?: SignTemplateAdditionalInfoField;
  /**
   * Box's ready-sign link feature enables you to create a link to a signature request that you've created from a template. Use this link when you want to post a signature request on a public form — such as an email, social media post, or web page — without knowing who the signers will be. Note: The ready-sign link feature is limited to Enterprise Plus customers and not available to Box Verified Enterprises. */
  readonly readySignLink?: SignTemplateReadySignLinkField | null;
  /**
   * Custom branding applied to notifications
   * and signature requests. */
  readonly customBranding?: SignTemplateCustomBrandingField | null;
  readonly rawData?: SerializedData;
}
export function serializeSignTemplateTypeField(
  val: SignTemplateTypeField,
): SerializedData {
  return val;
}
export function deserializeSignTemplateTypeField(
  val: SerializedData,
): SignTemplateTypeField {
  if (val == 'sign-template') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize SignTemplateTypeField" });
}
export function serializeSignTemplateAdditionalInfoNonEditableField(
  val: SignTemplateAdditionalInfoNonEditableField,
): SerializedData {
  return val;
}
export function deserializeSignTemplateAdditionalInfoNonEditableField(
  val: SerializedData,
): SignTemplateAdditionalInfoNonEditableField {
  if (val == 'email_subject') {
    return val;
  }
  if (val == 'email_message') {
    return val;
  }
  if (val == 'name') {
    return val;
  }
  if (val == 'days_valid') {
    return val;
  }
  if (val == 'signers') {
    return val;
  }
  if (val == 'source_files') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignTemplateAdditionalInfoNonEditableField",
  });
}
export function serializeSignTemplateAdditionalInfoRequiredSignersField(
  val: SignTemplateAdditionalInfoRequiredSignersField,
): SerializedData {
  return val;
}
export function deserializeSignTemplateAdditionalInfoRequiredSignersField(
  val: SerializedData,
): SignTemplateAdditionalInfoRequiredSignersField {
  if (val == 'email') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignTemplateAdditionalInfoRequiredSignersField",
  });
}
export function serializeSignTemplateAdditionalInfoRequiredField(
  val: SignTemplateAdditionalInfoRequiredField,
): SerializedData {
  return {
    ['signers']:
      val.signers == void 0
        ? val.signers
        : (val.signers.map(function (
            item: readonly SignTemplateAdditionalInfoRequiredSignersField[],
          ): SerializedData {
            return item.map(function (
              item: SignTemplateAdditionalInfoRequiredSignersField,
            ): SerializedData {
              return serializeSignTemplateAdditionalInfoRequiredSignersField(
                item,
              );
            }) as readonly any[];
          }) as readonly any[]),
  };
}
export function deserializeSignTemplateAdditionalInfoRequiredField(
  val: SerializedData,
): SignTemplateAdditionalInfoRequiredField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignTemplateAdditionalInfoRequiredField"',
    });
  }
  if (!(val.signers == void 0) && !sdIsList(val.signers)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "signers" of type "SignTemplateAdditionalInfoRequiredField"',
    });
  }
  const signers:
    | undefined
    | readonly (readonly SignTemplateAdditionalInfoRequiredSignersField[])[] =
    val.signers == void 0
      ? void 0
      : sdIsList(val.signers)
        ? (val.signers.map(function (
            itm: SerializedData,
          ): readonly SignTemplateAdditionalInfoRequiredSignersField[] {
            return sdIsList(itm)
              ? (itm.map(function (
                  itm: SerializedData,
                ): SignTemplateAdditionalInfoRequiredSignersField {
                  return deserializeSignTemplateAdditionalInfoRequiredSignersField(
                    itm,
                  );
                }) as readonly any[])
              : [];
          }) as readonly any[])
        : [];
  return { signers: signers } satisfies SignTemplateAdditionalInfoRequiredField;
}
export function serializeSignTemplateAdditionalInfoField(
  val: SignTemplateAdditionalInfoField,
): SerializedData {
  return {
    ['non_editable']:
      val.nonEditable == void 0
        ? val.nonEditable
        : (val.nonEditable.map(function (
            item: SignTemplateAdditionalInfoNonEditableField,
          ): SerializedData {
            return serializeSignTemplateAdditionalInfoNonEditableField(item);
          }) as readonly any[]),
    ['required']:
      val.required == void 0
        ? val.required
        : serializeSignTemplateAdditionalInfoRequiredField(val.required),
  };
}
export function deserializeSignTemplateAdditionalInfoField(
  val: SerializedData,
): SignTemplateAdditionalInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignTemplateAdditionalInfoField"',
    });
  }
  if (!(val.non_editable == void 0) && !sdIsList(val.non_editable)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "non_editable" of type "SignTemplateAdditionalInfoField"',
    });
  }
  const nonEditable:
    | undefined
    | readonly SignTemplateAdditionalInfoNonEditableField[] =
    val.non_editable == void 0
      ? void 0
      : sdIsList(val.non_editable)
        ? (val.non_editable.map(function (
            itm: SerializedData,
          ): SignTemplateAdditionalInfoNonEditableField {
            return deserializeSignTemplateAdditionalInfoNonEditableField(itm);
          }) as readonly any[])
        : [];
  const required: undefined | SignTemplateAdditionalInfoRequiredField =
    val.required == void 0
      ? void 0
      : deserializeSignTemplateAdditionalInfoRequiredField(val.required);
  return {
    nonEditable: nonEditable,
    required: required,
  } satisfies SignTemplateAdditionalInfoField;
}
export function serializeSignTemplateReadySignLinkField(
  val: SignTemplateReadySignLinkField,
): SerializedData {
  return {
    ['url']: val.url,
    ['name']: val.name,
    ['instructions']: val.instructions,
    ['folder_id']: val.folderId,
    ['is_notification_disabled']: val.isNotificationDisabled,
    ['is_active']: val.isActive,
  };
}
export function deserializeSignTemplateReadySignLinkField(
  val: SerializedData,
): SignTemplateReadySignLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignTemplateReadySignLinkField"',
    });
  }
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "url" of type "SignTemplateReadySignLinkField"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "SignTemplateReadySignLinkField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.instructions == void 0) && !sdIsString(val.instructions)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "instructions" of type "SignTemplateReadySignLinkField"',
    });
  }
  const instructions: undefined | string =
    val.instructions == void 0 ? void 0 : val.instructions;
  if (!(val.folder_id == void 0) && !sdIsString(val.folder_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "folder_id" of type "SignTemplateReadySignLinkField"',
    });
  }
  const folderId: undefined | string =
    val.folder_id == void 0 ? void 0 : val.folder_id;
  if (
    !(val.is_notification_disabled == void 0) &&
    !sdIsBoolean(val.is_notification_disabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_notification_disabled" of type "SignTemplateReadySignLinkField"',
    });
  }
  const isNotificationDisabled: undefined | boolean =
    val.is_notification_disabled == void 0
      ? void 0
      : val.is_notification_disabled;
  if (!(val.is_active == void 0) && !sdIsBoolean(val.is_active)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_active" of type "SignTemplateReadySignLinkField"',
    });
  }
  const isActive: undefined | boolean =
    val.is_active == void 0 ? void 0 : val.is_active;
  return {
    url: url,
    name: name,
    instructions: instructions,
    folderId: folderId,
    isNotificationDisabled: isNotificationDisabled,
    isActive: isActive,
  } satisfies SignTemplateReadySignLinkField;
}
export function serializeSignTemplateCustomBrandingField(
  val: SignTemplateCustomBrandingField,
): SerializedData {
  return {
    ['company_name']: val.companyName,
    ['logo_uri']: val.logoUri,
    ['branding_color']: val.brandingColor,
    ['email_footer_text']: val.emailFooterText,
  };
}
export function deserializeSignTemplateCustomBrandingField(
  val: SerializedData,
): SignTemplateCustomBrandingField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignTemplateCustomBrandingField"',
    });
  }
  if (!(val.company_name == void 0) && !sdIsString(val.company_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "company_name" of type "SignTemplateCustomBrandingField"',
    });
  }
  const companyName: undefined | string =
    val.company_name == void 0 ? void 0 : val.company_name;
  if (!(val.logo_uri == void 0) && !sdIsString(val.logo_uri)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "logo_uri" of type "SignTemplateCustomBrandingField"',
    });
  }
  const logoUri: undefined | string =
    val.logo_uri == void 0 ? void 0 : val.logo_uri;
  if (!(val.branding_color == void 0) && !sdIsString(val.branding_color)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "branding_color" of type "SignTemplateCustomBrandingField"',
    });
  }
  const brandingColor: undefined | string =
    val.branding_color == void 0 ? void 0 : val.branding_color;
  if (
    !(val.email_footer_text == void 0) &&
    !sdIsString(val.email_footer_text)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email_footer_text" of type "SignTemplateCustomBrandingField"',
    });
  }
  const emailFooterText: undefined | string =
    val.email_footer_text == void 0 ? void 0 : val.email_footer_text;
  return {
    companyName: companyName,
    logoUri: logoUri,
    brandingColor: brandingColor,
    emailFooterText: emailFooterText,
  } satisfies SignTemplateCustomBrandingField;
}
export function serializeSignTemplate(val: SignTemplate): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeSignTemplateTypeField(val.type),
    ['id']: val.id,
    ['name']: val.name,
    ['email_subject']: val.emailSubject,
    ['email_message']: val.emailMessage,
    ['days_valid']: val.daysValid,
    ['parent_folder']:
      val.parentFolder == void 0
        ? val.parentFolder
        : serializeFolderMini(val.parentFolder),
    ['source_files']:
      val.sourceFiles == void 0
        ? val.sourceFiles
        : (val.sourceFiles.map(function (item: FileMini): SerializedData {
            return serializeFileMini(item);
          }) as readonly any[]),
    ['are_fields_locked']: val.areFieldsLocked,
    ['are_options_locked']: val.areOptionsLocked,
    ['are_recipients_locked']: val.areRecipientsLocked,
    ['are_email_settings_locked']: val.areEmailSettingsLocked,
    ['are_files_locked']: val.areFilesLocked,
    ['signers']:
      val.signers == void 0
        ? val.signers
        : (val.signers.map(function (item: TemplateSigner): SerializedData {
            return serializeTemplateSigner(item);
          }) as readonly any[]),
    ['additional_info']:
      val.additionalInfo == void 0
        ? val.additionalInfo
        : serializeSignTemplateAdditionalInfoField(val.additionalInfo),
    ['ready_sign_link']:
      val.readySignLink == void 0
        ? val.readySignLink
        : serializeSignTemplateReadySignLinkField(val.readySignLink),
    ['custom_branding']:
      val.customBranding == void 0
        ? val.customBranding
        : serializeSignTemplateCustomBrandingField(val.customBranding),
  };
}
export function deserializeSignTemplate(val: SerializedData): SignTemplate {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "SignTemplate"' });
  }
  const type: undefined | SignTemplateTypeField =
    val.type == void 0 ? void 0 : deserializeSignTemplateTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "SignTemplate"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "SignTemplate"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.email_subject == void 0) && !sdIsString(val.email_subject)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email_subject" of type "SignTemplate"',
    });
  }
  const emailSubject: undefined | string =
    val.email_subject == void 0 ? void 0 : val.email_subject;
  if (!(val.email_message == void 0) && !sdIsString(val.email_message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email_message" of type "SignTemplate"',
    });
  }
  const emailMessage: undefined | string =
    val.email_message == void 0 ? void 0 : val.email_message;
  if (!(val.days_valid == void 0) && !sdIsNumber(val.days_valid)) {
    throw new BoxSdkError({
      message: 'Expecting number for "days_valid" of type "SignTemplate"',
    });
  }
  const daysValid: undefined | number =
    val.days_valid == void 0 ? void 0 : val.days_valid;
  const parentFolder: undefined | FolderMini =
    val.parent_folder == void 0
      ? void 0
      : deserializeFolderMini(val.parent_folder);
  if (!(val.source_files == void 0) && !sdIsList(val.source_files)) {
    throw new BoxSdkError({
      message: 'Expecting array for "source_files" of type "SignTemplate"',
    });
  }
  const sourceFiles: undefined | readonly FileMini[] =
    val.source_files == void 0
      ? void 0
      : sdIsList(val.source_files)
        ? (val.source_files.map(function (itm: SerializedData): FileMini {
            return deserializeFileMini(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.are_fields_locked == void 0) &&
    !sdIsBoolean(val.are_fields_locked)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_fields_locked" of type "SignTemplate"',
    });
  }
  const areFieldsLocked: undefined | boolean =
    val.are_fields_locked == void 0 ? void 0 : val.are_fields_locked;
  if (
    !(val.are_options_locked == void 0) &&
    !sdIsBoolean(val.are_options_locked)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_options_locked" of type "SignTemplate"',
    });
  }
  const areOptionsLocked: undefined | boolean =
    val.are_options_locked == void 0 ? void 0 : val.are_options_locked;
  if (
    !(val.are_recipients_locked == void 0) &&
    !sdIsBoolean(val.are_recipients_locked)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_recipients_locked" of type "SignTemplate"',
    });
  }
  const areRecipientsLocked: undefined | boolean =
    val.are_recipients_locked == void 0 ? void 0 : val.are_recipients_locked;
  if (
    !(val.are_email_settings_locked == void 0) &&
    !sdIsBoolean(val.are_email_settings_locked)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_email_settings_locked" of type "SignTemplate"',
    });
  }
  const areEmailSettingsLocked: undefined | boolean =
    val.are_email_settings_locked == void 0
      ? void 0
      : val.are_email_settings_locked;
  if (!(val.are_files_locked == void 0) && !sdIsBoolean(val.are_files_locked)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_files_locked" of type "SignTemplate"',
    });
  }
  const areFilesLocked: undefined | boolean =
    val.are_files_locked == void 0 ? void 0 : val.are_files_locked;
  if (!(val.signers == void 0) && !sdIsList(val.signers)) {
    throw new BoxSdkError({
      message: 'Expecting array for "signers" of type "SignTemplate"',
    });
  }
  const signers: undefined | readonly TemplateSigner[] =
    val.signers == void 0
      ? void 0
      : sdIsList(val.signers)
        ? (val.signers.map(function (itm: SerializedData): TemplateSigner {
            return deserializeTemplateSigner(itm);
          }) as readonly any[])
        : [];
  const additionalInfo: undefined | SignTemplateAdditionalInfoField =
    val.additional_info == void 0
      ? void 0
      : deserializeSignTemplateAdditionalInfoField(val.additional_info);
  const readySignLink: undefined | SignTemplateReadySignLinkField =
    val.ready_sign_link == void 0
      ? void 0
      : deserializeSignTemplateReadySignLinkField(val.ready_sign_link);
  const customBranding: undefined | SignTemplateCustomBrandingField =
    val.custom_branding == void 0
      ? void 0
      : deserializeSignTemplateCustomBrandingField(val.custom_branding);
  return {
    type: type,
    id: id,
    name: name,
    emailSubject: emailSubject,
    emailMessage: emailMessage,
    daysValid: daysValid,
    parentFolder: parentFolder,
    sourceFiles: sourceFiles,
    areFieldsLocked: areFieldsLocked,
    areOptionsLocked: areOptionsLocked,
    areRecipientsLocked: areRecipientsLocked,
    areEmailSettingsLocked: areEmailSettingsLocked,
    areFilesLocked: areFilesLocked,
    signers: signers,
    additionalInfo: additionalInfo,
    readySignLink: readySignLink,
    customBranding: customBranding,
  } satisfies SignTemplate;
}
