import { serializeFile } from './file';
import { deserializeFile } from './file';
import { serializeFolder } from './folder';
import { deserializeFolder } from './folder';
import { serializeWebLink } from './webLink';
import { deserializeWebLink } from './webLink';
import { File } from './file';
import { Folder } from './folder';
import { WebLink } from './webLink';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
