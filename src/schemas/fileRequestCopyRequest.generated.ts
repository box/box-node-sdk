import { serializeFileRequestUpdateRequestStatusField } from './fileRequestUpdateRequest.generated.js';
import { deserializeFileRequestUpdateRequestStatusField } from './fileRequestUpdateRequest.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeFileRequestUpdateRequest } from './fileRequestUpdateRequest.generated.js';
import { deserializeFileRequestUpdateRequest } from './fileRequestUpdateRequest.generated.js';
import { FileRequestUpdateRequestStatusField } from './fileRequestUpdateRequest.generated.js';
import { DateTime } from '../internal/utils.js';
import { FileRequestUpdateRequest } from './fileRequestUpdateRequest.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileRequestCopyRequestFolderTypeField = 'folder';
export interface FileRequestCopyRequestFolderField {
  /**
   * The value will always be `folder`. */
  readonly type?: FileRequestCopyRequestFolderTypeField;
  /**
   * The ID of the folder to associate the new
   * file request to. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type FileRequestCopyRequest = FileRequestUpdateRequest & {
  /**
   * The folder to associate the new file request to. */
  readonly folder: FileRequestCopyRequestFolderField;
};
export function serializeFileRequestCopyRequestFolderTypeField(
  val: FileRequestCopyRequestFolderTypeField,
): SerializedData {
  return val;
}
export function deserializeFileRequestCopyRequestFolderTypeField(
  val: SerializedData,
): FileRequestCopyRequestFolderTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileRequestCopyRequestFolderTypeField",
  });
}
export function serializeFileRequestCopyRequestFolderField(
  val: FileRequestCopyRequestFolderField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileRequestCopyRequestFolderTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFileRequestCopyRequestFolderField(
  val: SerializedData,
): FileRequestCopyRequestFolderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileRequestCopyRequestFolderField"',
    });
  }
  const type: undefined | FileRequestCopyRequestFolderTypeField =
    val.type == void 0
      ? void 0
      : deserializeFileRequestCopyRequestFolderTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "FileRequestCopyRequestFolderField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "FileRequestCopyRequestFolderField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FileRequestCopyRequestFolderField;
}
export function serializeFileRequestCopyRequest(
  val: FileRequestCopyRequest,
): SerializedData {
  const base: any = serializeFileRequestUpdateRequest(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileRequestCopyRequest"',
    });
  }
  return {
    ...base,
    ...{ ['folder']: serializeFileRequestCopyRequestFolderField(val.folder) },
  };
}
export function deserializeFileRequestCopyRequest(
  val: SerializedData,
): FileRequestCopyRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileRequestCopyRequest"',
    });
  }
  if (val.folder == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "folder" of type "FileRequestCopyRequest" to be defined',
    });
  }
  const folder: FileRequestCopyRequestFolderField =
    deserializeFileRequestCopyRequestFolderField(val.folder);
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "FileRequestCopyRequest"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "FileRequestCopyRequest"',
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
        'Expecting boolean for "is_email_required" of type "FileRequestCopyRequest"',
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
        'Expecting boolean for "is_description_required" of type "FileRequestCopyRequest"',
    });
  }
  const isDescriptionRequired: undefined | boolean =
    val.is_description_required == void 0
      ? void 0
      : val.is_description_required;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "expires_at" of type "FileRequestCopyRequest"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  return {
    folder: folder,
    title: title,
    description: description,
    status: status,
    isEmailRequired: isEmailRequired,
    isDescriptionRequired: isDescriptionRequired,
    expiresAt: expiresAt,
  } satisfies FileRequestCopyRequest;
}
