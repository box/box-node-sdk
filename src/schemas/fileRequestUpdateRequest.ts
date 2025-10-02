import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type FileRequestUpdateRequestStatusField =
  | 'active'
  | 'inactive'
  | string;
export interface FileRequestUpdateRequest {
  /**
   * An optional new title for the file request. This can be
   * used to change the title of the file request.
   *
   * This will default to the value on the existing file request. */
  readonly title?: string;
  /**
   * An optional new description for the file request. This can be
   * used to change the description of the file request.
   *
   * This will default to the value on the existing file request. */
  readonly description?: string;
  /**
   * An optional new status of the file request.
   *
   * When the status is set to `inactive`, the file request
   * will no longer accept new submissions, and any visitor
   * to the file request URL will receive a `HTTP 404` status
   * code.
   *
   * This will default to the value on the existing file request. */
  readonly status?: FileRequestUpdateRequestStatusField;
  /**
   * Whether a file request submitter is required to provide
   * their email address.
   *
   * When this setting is set to true, the Box UI will show
   * an email field on the file request form.
   *
   * This will default to the value on the existing file request. */
  readonly isEmailRequired?: boolean;
  /**
   * Whether a file request submitter is required to provide
   * a description of the files they are submitting.
   *
   * When this setting is set to true, the Box UI will show
   * a description field on the file request form.
   *
   * This will default to the value on the existing file request. */
  readonly isDescriptionRequired?: boolean;
  /**
   * The date after which a file request will no longer accept new
   * submissions.
   *
   * After this date, the `status` will automatically be set to
   * `inactive`.
   *
   * This will default to the value on the existing file request. */
  readonly expiresAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeFileRequestUpdateRequestStatusField(
  val: FileRequestUpdateRequestStatusField,
): SerializedData {
  return val;
}
export function deserializeFileRequestUpdateRequestStatusField(
  val: SerializedData,
): FileRequestUpdateRequestStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'inactive') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileRequestUpdateRequestStatusField",
  });
}
export function serializeFileRequestUpdateRequest(
  val: FileRequestUpdateRequest,
): SerializedData {
  return {
    ['title']: val.title,
    ['description']: val.description,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeFileRequestUpdateRequestStatusField(val.status),
    ['is_email_required']: val.isEmailRequired,
    ['is_description_required']: val.isDescriptionRequired,
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
  };
}
export function deserializeFileRequestUpdateRequest(
  val: SerializedData,
): FileRequestUpdateRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileRequestUpdateRequest"',
    });
  }
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "title" of type "FileRequestUpdateRequest"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "FileRequestUpdateRequest"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const status: undefined | FileRequestUpdateRequestStatusField =
    val.status == void 0
      ? void 0
      : deserializeFileRequestUpdateRequestStatusField(val.status);
  if (
    !(val.is_email_required == void 0) &&
    !sdIsBoolean(val.is_email_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_email_required" of type "FileRequestUpdateRequest"',
    });
  }
  const isEmailRequired: undefined | boolean =
    val.is_email_required == void 0 ? void 0 : val.is_email_required;
  if (
    !(val.is_description_required == void 0) &&
    !sdIsBoolean(val.is_description_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_description_required" of type "FileRequestUpdateRequest"',
    });
  }
  const isDescriptionRequired: undefined | boolean =
    val.is_description_required == void 0
      ? void 0
      : val.is_description_required;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "FileRequestUpdateRequest"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  return {
    title: title,
    description: description,
    status: status,
    isEmailRequired: isEmailRequired,
    isDescriptionRequired: isDescriptionRequired,
    expiresAt: expiresAt,
  } satisfies FileRequestUpdateRequest;
}
