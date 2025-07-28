import { serializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { serializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { deserializeFolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { serializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { deserializeWeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { FileReferenceV2025R0 } from './fileReferenceV2025R0.generated.js';
import { FolderReferenceV2025R0 } from './folderReferenceV2025R0.generated.js';
import { WeblinkReferenceV2025R0 } from './weblinkReferenceV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
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
  if (val.type == 'weblink') {
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
  if (val.type == 'weblink') {
    return deserializeWeblinkReferenceV2025R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubItemReferenceV2025R0",
  });
}
