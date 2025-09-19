import { serializeFileFull } from './fileFull.js';
import { deserializeFileFull } from './fileFull.js';
import { serializeFolderFull } from './folderFull.js';
import { deserializeFolderFull } from './folderFull.js';
import { FileFull } from './fileFull.js';
import { FolderFull } from './folderFull.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataQueryResultItem = FileFull | FolderFull;
export function serializeMetadataQueryResultItem(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileFull(val);
  }
  if (val.type == 'folder') {
    return serializeFolderFull(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeMetadataQueryResultItem(
  val: SerializedData
): MetadataQueryResultItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataQueryResultItem"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileFull(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderFull(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataQueryResultItem",
  });
}
