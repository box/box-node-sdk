import { serializeFolderMini } from './folderMini';
import { deserializeFolderMini } from './folderMini';
import { serializeFileMini } from './fileMini';
import { deserializeFileMini } from './fileMini';
import { FolderMini } from './folderMini';
import { FileMini } from './fileMini';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
