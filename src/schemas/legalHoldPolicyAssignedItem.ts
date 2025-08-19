import { serializeFile } from './file.js';
import { deserializeFile } from './file.js';
import { serializeFolder } from './folder.js';
import { deserializeFolder } from './folder.js';
import { serializeWebLink } from './webLink.js';
import { deserializeWebLink } from './webLink.js';
import { File } from './file.js';
import { Folder } from './folder.js';
import { WebLink } from './webLink.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type LegalHoldPolicyAssignedItem = File | Folder | WebLink;
export function serializeLegalHoldPolicyAssignedItem(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFile(val);
  }
  if (val.type == 'folder') {
    return serializeFolder(val);
  }
  if (val.type == 'web_link') {
    return serializeWebLink(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeLegalHoldPolicyAssignedItem(
  val: SerializedData,
): LegalHoldPolicyAssignedItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignedItem"',
    });
  }
  if (val.type == 'file') {
    return deserializeFile(val);
  }
  if (val.type == 'folder') {
    return deserializeFolder(val);
  }
  if (val.type == 'web_link') {
    return deserializeWebLink(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize LegalHoldPolicyAssignedItem",
  });
}
