import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0';
import { serializeFolderReferenceV2025R0 } from './folderReferenceV2025R0';
import { deserializeFolderReferenceV2025R0 } from './folderReferenceV2025R0';
import { serializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0';
import { deserializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0';
import { FolderReferenceV2025R0 } from './folderReferenceV2025R0';
import { WeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubItemReferenceV2025R0 =
  | FileReferenceV2025R0
  | FolderReferenceV2025R0
  | WeblinkReferenceV2025R0;
export function serializeHubItemReferenceV2025R0(val: any): SerializedData {
  if (val.type == 'file') {
    return serializeFileReferenceV2025R0(val);
  }
  if (val.type == 'folder') {
    return serializeFolderReferenceV2025R0(val);
  }
  if (val.type == 'web_link') {
    return serializeWeblinkReferenceV2025R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeHubItemReferenceV2025R0(
  val: SerializedData,
): HubItemReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubItemReferenceV2025R0"',
    });
  }
  if (val.type == 'file') {
    return deserializeFileReferenceV2025R0(val);
  }
  if (val.type == 'folder') {
    return deserializeFolderReferenceV2025R0(val);
  }
  if (val.type == 'web_link') {
    return deserializeWeblinkReferenceV2025R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubItemReferenceV2025R0",
  });
}
