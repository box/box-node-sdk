import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type ZipDownloadRequestItemsTypeField = 'file' | 'folder';
export interface ZipDownloadRequestItemsField {
  /**
   * The type of the item to add to the archive. */
  readonly type: ZipDownloadRequestItemsTypeField;
  /**
   * The identifier of the item to add to the archive. When this item is
   * a folder then this can not be the root folder with ID `0`. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface ZipDownloadRequest {
  /**
   * A list of items to add to the `zip` archive. These can
   * be folders or files. */
  readonly items: readonly ZipDownloadRequestItemsField[];
  /**
   * The optional name of the `zip` archive. This name will be appended by the
   * `.zip` file extension, for example `January Financials.zip`. */
  readonly downloadFileName?: string;
  readonly rawData?: SerializedData;
}
export function serializeZipDownloadRequestItemsTypeField(
  val: ZipDownloadRequestItemsTypeField,
): SerializedData {
  return val;
}
export function deserializeZipDownloadRequestItemsTypeField(
  val: SerializedData,
): ZipDownloadRequestItemsTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ZipDownloadRequestItemsTypeField",
  });
}
export function serializeZipDownloadRequestItemsField(
  val: ZipDownloadRequestItemsField,
): SerializedData {
  return {
    ['type']: serializeZipDownloadRequestItemsTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeZipDownloadRequestItemsField(
  val: SerializedData,
): ZipDownloadRequestItemsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ZipDownloadRequestItemsField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ZipDownloadRequestItemsField" to be defined',
    });
  }
  const type: ZipDownloadRequestItemsTypeField =
    deserializeZipDownloadRequestItemsTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ZipDownloadRequestItemsField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ZipDownloadRequestItemsField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies ZipDownloadRequestItemsField;
}
export function serializeZipDownloadRequest(
  val: ZipDownloadRequest,
): SerializedData {
  return {
    ['items']: val.items.map(function (
      item: ZipDownloadRequestItemsField,
    ): SerializedData {
      return serializeZipDownloadRequestItemsField(item);
    }) as readonly any[],
    ['download_file_name']: val.downloadFileName,
  };
}
export function deserializeZipDownloadRequest(
  val: SerializedData,
): ZipDownloadRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ZipDownloadRequest"',
    });
  }
  if (val.items == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "items" of type "ZipDownloadRequest" to be defined',
    });
  }
  if (!sdIsList(val.items)) {
    throw new BoxSdkError({
      message: 'Expecting array for "items" of type "ZipDownloadRequest"',
    });
  }
  const items: readonly ZipDownloadRequestItemsField[] = sdIsList(val.items)
    ? (val.items.map(function (
        itm: SerializedData,
      ): ZipDownloadRequestItemsField {
        return deserializeZipDownloadRequestItemsField(itm);
      }) as readonly any[])
    : [];
  if (
    !(val.download_file_name == void 0) &&
    !sdIsString(val.download_file_name)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "download_file_name" of type "ZipDownloadRequest"',
    });
  }
  const downloadFileName: undefined | string =
    val.download_file_name == void 0 ? void 0 : val.download_file_name;
  return {
    items: items,
    downloadFileName: downloadFileName,
  } satisfies ZipDownloadRequest;
}
