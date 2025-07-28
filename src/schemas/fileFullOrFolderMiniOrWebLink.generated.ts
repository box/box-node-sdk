import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeWebLink } from './webLink.generated.js';
import { deserializeWebLink } from './webLink.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { WebLink } from './webLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileFullOrFolderMiniOrWebLink = FileFull | FolderMini | WebLink;
export function serializeFileFullOrFolderMiniOrWebLink(
  val: any,
): SerializedData {
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
export function deserializeFileFullOrFolderMiniOrWebLink(
  val: SerializedData,
): FileFullOrFolderMiniOrWebLink {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullOrFolderMiniOrWebLink"',
    });
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
  throw new BoxSdkError({
    message: "Can't deserialize FileFullOrFolderMiniOrWebLink",
  });
}
