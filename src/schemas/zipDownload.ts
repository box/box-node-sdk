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
export type ZipDownloadNameConflictsTypeField = 'file' | 'folder';
export interface ZipDownloadNameConflictsField {
  /**
   * The identifier of the item. */
  readonly id?: string;
  /**
   * The type of this item. */
  readonly type?: ZipDownloadNameConflictsTypeField;
  /**
   * Box Developer Documentation. */
  readonly originalName?: string;
  /**
   * The new name of this item as it will appear in the
   * downloaded `zip` archive. */
  readonly downloadName?: string;
  readonly rawData?: SerializedData;
}
export interface ZipDownload {
  /**
   * The URL that can be used to download the `zip` archive. A `Get` request to
   * this URL will start streaming the items requested. By default, this URL
   * is only valid for a few seconds, until the `expires_at` time, unless a
   * download is started after which it is valid for the duration of the
   * download.
   *
   * It is important to note that the domain and path of this URL might change
   * between API calls, and therefore it's important to use this URL as-is. */
  readonly downloadUrl?: string;
  /**
   * The URL that can be used to get the status of the `zip` archive being
   * downloaded. A `Get` request to this URL will return the number of files
   * in the archive as well as the number of items already downloaded or
   * skipped. By default, this URL is only valid for a few seconds, until the
   * `expires_at` time, unless a download is started after which the URL is
   * valid for 12 hours from the start of the download.
   *
   * It is important to note that the domain and path of this URL might change
   * between API calls, and therefore it's important to use this URL as-is. */
  readonly statusUrl?: string;
  /**
   * The time and date when this archive will expire. After this time the
   * `status_url` and `download_url` will return an error.
   *
   * By default, these URLs are only valid for a few seconds, unless a download
   * is started after which the `download_url` is valid for the duration of the
   * download, and the `status_url` is valid for 12 hours from the start of the
   * download. */
  readonly expiresAt?: DateTime;
  /**
   * A list of conflicts that occurred when trying to create the archive. This
   * would occur when multiple items have been requested with the
   * same name.
   *
   * To solve these conflicts, the API will automatically rename an item
   * and return a mapping between the original item's name and its new
   * name.
   *
   * For every conflict, both files will be renamed and therefore this list
   * will always be a multiple of 2. */
  readonly nameConflicts?: readonly (readonly ZipDownloadNameConflictsField[])[];
  readonly rawData?: SerializedData;
}
export function serializeZipDownloadNameConflictsTypeField(
  val: ZipDownloadNameConflictsTypeField,
): SerializedData {
  return val;
}
export function deserializeZipDownloadNameConflictsTypeField(
  val: SerializedData,
): ZipDownloadNameConflictsTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ZipDownloadNameConflictsTypeField",
  });
}
export function serializeZipDownloadNameConflictsField(
  val: ZipDownloadNameConflictsField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeZipDownloadNameConflictsTypeField(val.type),
    ['original_name']: val.originalName,
    ['download_name']: val.downloadName,
  };
}
export function deserializeZipDownloadNameConflictsField(
  val: SerializedData,
): ZipDownloadNameConflictsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ZipDownloadNameConflictsField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ZipDownloadNameConflictsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ZipDownloadNameConflictsTypeField =
    val.type == void 0
      ? void 0
      : deserializeZipDownloadNameConflictsTypeField(val.type);
  if (!(val.original_name == void 0) && !sdIsString(val.original_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "original_name" of type "ZipDownloadNameConflictsField"',
    });
  }
  const originalName: undefined | string =
    val.original_name == void 0 ? void 0 : val.original_name;
  if (!(val.download_name == void 0) && !sdIsString(val.download_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "download_name" of type "ZipDownloadNameConflictsField"',
    });
  }
  const downloadName: undefined | string =
    val.download_name == void 0 ? void 0 : val.download_name;
  return {
    id: id,
    type: type,
    originalName: originalName,
    downloadName: downloadName,
  } satisfies ZipDownloadNameConflictsField;
}
export function serializeZipDownload(val: ZipDownload): SerializedData {
  return {
    ['download_url']: val.downloadUrl,
    ['status_url']: val.statusUrl,
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['name_conflicts']:
      val.nameConflicts == void 0
        ? val.nameConflicts
        : (val.nameConflicts.map(function (
            item: readonly ZipDownloadNameConflictsField[],
          ): SerializedData {
            return item.map(function (
              item: ZipDownloadNameConflictsField,
            ): SerializedData {
              return serializeZipDownloadNameConflictsField(item);
            }) as readonly any[];
          }) as readonly any[]),
  };
}
export function deserializeZipDownload(val: SerializedData): ZipDownload {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ZipDownload"' });
  }
  if (!(val.download_url == void 0) && !sdIsString(val.download_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "download_url" of type "ZipDownload"',
    });
  }
  const downloadUrl: undefined | string =
    val.download_url == void 0 ? void 0 : val.download_url;
  if (!(val.status_url == void 0) && !sdIsString(val.status_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "status_url" of type "ZipDownload"',
    });
  }
  const statusUrl: undefined | string =
    val.status_url == void 0 ? void 0 : val.status_url;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "ZipDownload"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (!(val.name_conflicts == void 0) && !sdIsList(val.name_conflicts)) {
    throw new BoxSdkError({
      message: 'Expecting array for "name_conflicts" of type "ZipDownload"',
    });
  }
  const nameConflicts:
    | undefined
    | readonly (readonly ZipDownloadNameConflictsField[])[] =
    val.name_conflicts == void 0
      ? void 0
      : sdIsList(val.name_conflicts)
        ? (val.name_conflicts.map(function (
            itm: SerializedData,
          ): readonly ZipDownloadNameConflictsField[] {
            return sdIsList(itm)
              ? (itm.map(function (
                  itm: SerializedData,
                ): ZipDownloadNameConflictsField {
                  return deserializeZipDownloadNameConflictsField(itm);
                }) as readonly any[])
              : [];
          }) as readonly any[])
        : [];
  return {
    downloadUrl: downloadUrl,
    statusUrl: statusUrl,
    expiresAt: expiresAt,
    nameConflicts: nameConflicts,
  } satisfies ZipDownload;
}
