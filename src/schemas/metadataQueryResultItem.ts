import { serializeFileFull } from './fileFull';
import { deserializeFileFull } from './fileFull';
import { serializeFolderFull } from './folderFull';
import { deserializeFolderFull } from './folderFull';
import { FileFull } from './fileFull';
import { FolderFull } from './folderFull';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
  val: SerializedData,
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
