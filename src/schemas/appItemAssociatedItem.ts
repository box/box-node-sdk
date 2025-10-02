import { serializeFileBase } from './fileBase';
import { deserializeFileBase } from './fileBase';
import { serializeFolderBase } from './folderBase';
import { deserializeFolderBase } from './folderBase';
import { serializeWebLinkBase } from './webLinkBase';
import { deserializeWebLinkBase } from './webLinkBase';
import { FileBase } from './fileBase';
import { FolderBase } from './folderBase';
import { WebLinkBase } from './webLinkBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AppItemAssociatedItem = FileBase | FolderBase | WebLinkBase;
export function serializeAppItemAssociatedItem(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileBase(val);
  }
  if (val.type == 'folder') {
    return serializeFolderBase(val);
  }
  if (val.type == 'web_link') {
    return serializeWebLinkBase(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAppItemAssociatedItem(
  val: SerializedData,
): AppItemAssociatedItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AppItemAssociatedItem"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileBase(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderBase(val);
  }
  if (val.type == 'web_link') {
    return deserializeWebLinkBase(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AppItemAssociatedItem" });
}
