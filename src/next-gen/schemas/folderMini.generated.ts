import { serializeFolderBaseTypeField } from './folderBase.generated.js';
import { deserializeFolderBaseTypeField } from './folderBase.generated.js';
import { serializeFolderBase } from './folderBase.generated.js';
import { deserializeFolderBase } from './folderBase.generated.js';
import { FolderBaseTypeField } from './folderBase.generated.js';
import { FolderBase } from './folderBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class FolderMini extends FolderBase {
  readonly sequenceId?: string;
  readonly name?: string;
  constructor(
    fields: Omit<FolderMini, 'type'> & Partial<Pick<FolderMini, 'type'>>,
  ) {
    super(fields);
    if (fields.sequenceId !== undefined) {
      this.sequenceId = fields.sequenceId;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
  }
}
export function serializeFolderMini(val: FolderMini): SerializedData {
  const base: any = serializeFolderBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderMini"' });
  }
  return {
    ...base,
    ...{ ['sequence_id']: val.sequenceId, ['name']: val.name },
  };
}
export function deserializeFolderMini(val: SerializedData): FolderMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderMini"' });
  }
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "FolderMini"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FolderMini"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderMini"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FolderMini"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FolderMini" to be defined',
    });
  }
  const type: FolderBaseTypeField = deserializeFolderBaseTypeField(val.type);
  return {
    sequenceId: sequenceId,
    name: name,
    id: id,
    etag: etag,
    type: type,
  } satisfies FolderMini;
}
