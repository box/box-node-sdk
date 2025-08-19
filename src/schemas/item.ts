import { serializeFileFull } from './fileFull.js';
import { deserializeFileFull } from './fileFull.js';
import { serializeFolderMini } from './folderMini.js';
import { deserializeFolderMini } from './folderMini.js';
import { serializeWebLink } from './webLink.js';
import { deserializeWebLink } from './webLink.js';
import { FileFull } from './fileFull.js';
import { FolderMini } from './folderMini.js';
import { WebLink } from './webLink.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
