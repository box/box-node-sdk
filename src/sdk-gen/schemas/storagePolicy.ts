import { serializeStoragePolicyMiniTypeField } from './storagePolicyMini';
import { deserializeStoragePolicyMiniTypeField } from './storagePolicyMini';
import { serializeStoragePolicyMini } from './storagePolicyMini';
import { deserializeStoragePolicyMini } from './storagePolicyMini';
import { StoragePolicyMiniTypeField } from './storagePolicyMini';
import { StoragePolicyMini } from './storagePolicyMini';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class StoragePolicy extends StoragePolicyMini {
  readonly name?: string;
  constructor(fields: StoragePolicy) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
  }
}
export function serializeStoragePolicy(val: StoragePolicy): SerializedData {
  const base: any = serializeStoragePolicyMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "StoragePolicy"' });
  }
  return { ...base, ...{ ['name']: val.name } };
}
export function deserializeStoragePolicy(val: SerializedData): StoragePolicy {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "StoragePolicy"' });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "StoragePolicy"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "StoragePolicy" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "StoragePolicy"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "StoragePolicy" to be defined',
    });
  }
  const type: StoragePolicyMiniTypeField =
    deserializeStoragePolicyMiniTypeField(val.type);
  return { name: name, id: id, type: type } satisfies StoragePolicy;
}
