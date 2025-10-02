import { serializeFileFull } from './fileFull';
import { deserializeFileFull } from './fileFull';
import { serializeFolderMini } from './folderMini';
import { deserializeFolderMini } from './folderMini';
import { serializeWebLink } from './webLink';
import { deserializeWebLink } from './webLink';
import { FileFull } from './fileFull';
import { FolderMini } from './folderMini';
import { WebLink } from './webLink';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type Item = FileFull | FolderMini | WebLink;
export function serializeItem(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileFull(val);
  }
  if (val.type == 'folder') {
    return serializeFolderMini(val);
  }
  if (val.type == 'web_link') {
    return serializeWebLink(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeItem(val: SerializedData): Item {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Item"' });
  }
  if (val.type == 'file') {
    return deserializeFileFull(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderMini(val);
  }
  if (val.type == 'web_link') {
    return deserializeWebLink(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize Item" });
}
