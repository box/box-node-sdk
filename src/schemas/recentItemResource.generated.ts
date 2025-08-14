import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderFull } from './folderFull.generated.js';
import { deserializeFolderFull } from './folderFull.generated.js';
import { serializeWebLink } from './webLink.generated.js';
import { deserializeWebLink } from './webLink.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderFull } from './folderFull.generated.js';
import { WebLink } from './webLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type RecentItemResource = FileFull | FolderFull | WebLink;
export function serializeRecentItemResource(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileFull(val);
  }
  if (val.type == 'folder') {
    return serializeFolderFull(val);
  }
  if (val.type == 'web_link') {
    return serializeWebLink(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeRecentItemResource(
  val: SerializedData,
): RecentItemResource {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RecentItemResource"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileFull(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderFull(val);
  }
  if (val.type == 'web_link') {
    return deserializeWebLink(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize RecentItemResource" });
}
