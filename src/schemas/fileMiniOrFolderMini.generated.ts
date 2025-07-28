import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileMiniOrFolderMini = FileMini | FolderMini;
export function serializeFileMiniOrFolderMini(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileMini(val);
  }
  if (val.type == 'folder') {
    return serializeFolderMini(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeFileMiniOrFolderMini(
  val: SerializedData,
): FileMiniOrFolderMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileMiniOrFolderMini"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileMini(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderMini(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize FileMiniOrFolderMini" });
}
