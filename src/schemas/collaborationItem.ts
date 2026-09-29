import { serializeFileMini } from './fileMini';
import { deserializeFileMini } from './fileMini';
import { serializeFolderMini } from './folderMini';
import { deserializeFolderMini } from './folderMini';
import { serializeWebLinkMini } from './webLinkMini';
import { deserializeWebLinkMini } from './webLinkMini';
import { FileMini } from './fileMini';
import { FolderMini } from './folderMini';
import { WebLinkMini } from './webLinkMini';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type CollaborationItem = FileMini | FolderMini | WebLinkMini;
export function serializeCollaborationItem(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileMini(val);
  }
  if (val.type == 'folder') {
    return serializeFolderMini(val);
  }
  if (val.type == 'web_link') {
    return serializeWebLinkMini(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeCollaborationItem(
  val: SerializedData,
): CollaborationItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationItem"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileMini(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderMini(val);
  }
  if (val.type == 'web_link') {
    return deserializeWebLinkMini(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize CollaborationItem" });
}
