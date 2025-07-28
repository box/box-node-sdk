import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ZipDownloadStatusStateField =
  | 'in_progress'
  | 'failed'
  | 'succeeded'
  | string;
export interface ZipDownloadStatus {
  /**
   * The total number of files in the archive. */
  readonly totalFileCount?: number;
  /**
   * The number of files that have already been downloaded. */
  readonly downloadedFileCount?: number;
  /**
   * The number of files that have been skipped as they could not be
   * downloaded. In many cases this is due to permission issues that have
   * surfaced between the creation of the request for the archive and the
   * archive being downloaded. */
  readonly skippedFileCount?: number;
  /**
   * The number of folders that have been skipped as they could not be
   * downloaded. In many cases this is due to permission issues that have
   * surfaced between the creation of the request for the archive and the
   * archive being downloaded. */
  readonly skippedFolderCount?: number;
  /**
   * The state of the archive being downloaded. */
  readonly state?: ZipDownloadStatusStateField;
  readonly rawData?: SerializedData;
}
export function serializeZipDownloadStatusStateField(
  val: ZipDownloadStatusStateField,
): SerializedData {
  return val;
}
export function deserializeZipDownloadStatusStateField(
  val: SerializedData,
): ZipDownloadStatusStateField {
  if (val == 'in_progress') {
    return val;
  }
  if (val == 'failed') {
    return val;
  }
  if (val == 'succeeded') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ZipDownloadStatusStateField",
  });
}
export function serializeZipDownloadStatus(
  val: ZipDownloadStatus,
): SerializedData {
  return {
    ['total_file_count']: val.totalFileCount,
    ['downloaded_file_count']: val.downloadedFileCount,
    ['skipped_file_count']: val.skippedFileCount,
    ['skipped_folder_count']: val.skippedFolderCount,
    ['state']:
      val.state == void 0
        ? val.state
        : serializeZipDownloadStatusStateField(val.state),
  };
}
export function deserializeZipDownloadStatus(
  val: SerializedData,
): ZipDownloadStatus {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ZipDownloadStatus"',
    });
  }
  if (!(val.total_file_count == void 0) && !sdIsNumber(val.total_file_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_file_count" of type "ZipDownloadStatus"',
    });
  }
  const totalFileCount: undefined | number =
    val.total_file_count == void 0 ? void 0 : val.total_file_count;
  if (
    !(val.downloaded_file_count == void 0) &&
    !sdIsNumber(val.downloaded_file_count)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "downloaded_file_count" of type "ZipDownloadStatus"',
    });
  }
  const downloadedFileCount: undefined | number =
    val.downloaded_file_count == void 0 ? void 0 : val.downloaded_file_count;
  if (
    !(val.skipped_file_count == void 0) &&
    !sdIsNumber(val.skipped_file_count)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "skipped_file_count" of type "ZipDownloadStatus"',
    });
  }
  const skippedFileCount: undefined | number =
    val.skipped_file_count == void 0 ? void 0 : val.skipped_file_count;
  if (
    !(val.skipped_folder_count == void 0) &&
    !sdIsNumber(val.skipped_folder_count)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "skipped_folder_count" of type "ZipDownloadStatus"',
    });
  }
  const skippedFolderCount: undefined | number =
    val.skipped_folder_count == void 0 ? void 0 : val.skipped_folder_count;
  const state: undefined | ZipDownloadStatusStateField =
    val.state == void 0
      ? void 0
      : deserializeZipDownloadStatusStateField(val.state);
  return {
    totalFileCount: totalFileCount,
    downloadedFileCount: downloadedFileCount,
    skippedFileCount: skippedFileCount,
    skippedFolderCount: skippedFolderCount,
    state: state,
  } satisfies ZipDownloadStatus;
}
