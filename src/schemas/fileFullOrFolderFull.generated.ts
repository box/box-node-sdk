import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderFull } from './folderFull.generated.js';
import { deserializeFolderFull } from './folderFull.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderFull } from './folderFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileFullOrFolderFull = FileFull | FolderFull;
export function serializeFileFullOrFolderFull(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileFull(val);
  }
  if (val.type == 'folder') {
    return serializeFolderFull(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeFileFullOrFolderFull(
  val: SerializedData,
): FileFullOrFolderFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullOrFolderFull"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileFull(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderFull(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize FileFullOrFolderFull" });
}
