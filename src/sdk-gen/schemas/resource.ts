import { serializeFolderMini } from './folderMini.js';
import { deserializeFolderMini } from './folderMini.js';
import { serializeFileMini } from './fileMini.js';
import { deserializeFileMini } from './fileMini.js';
import { FolderMini } from './folderMini.js';
import { FileMini } from './fileMini.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type Resource = FolderMini | FileMini;
export function serializeResource(val: any): SerializedData {
  if (val.type == 'folder') {
    return serializeFolderMini(val);
  }
  if (val.type == 'file') {
    return serializeFileMini(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeResource(val: SerializedData): Resource {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Resource"' });
  }
  if (val.type == 'folder') {
    return deserializeFolderMini(val);
  }
  if (val.type == 'file') {
    return deserializeFileMini(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize Resource" });
}
