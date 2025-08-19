import { serializeFileBaseTypeField } from './fileBase.js';
import { deserializeFileBaseTypeField } from './fileBase.js';
import { serializeFileBase } from './fileBase.js';
import { deserializeFileBase } from './fileBase.js';
import { serializeFileMini } from './fileMini.js';
import { deserializeFileMini } from './fileMini.js';
import { serializeFileVersionMini } from './fileVersionMini.js';
import { deserializeFileVersionMini } from './fileVersionMini.js';
import { FileBaseTypeField } from './fileBase.js';
import { FileBase } from './fileBase.js';
import { FileMini } from './fileMini.js';
import { FileVersionMini } from './fileVersionMini.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class FileConflict extends FileMini {
  constructor(fields: FileConflict) {
    super(fields);
  }
}
export function serializeFileConflict(val: FileConflict): SerializedData {
  const base: any = serializeFileMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileConflict"' });
  }
  return { ...base, ...{} };
}
export function deserializeFileConflict(val: SerializedData): FileConflict {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileConflict"' });
  }
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "FileConflict"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FileConflict"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.sha1 == void 0) && !sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "FileConflict"',
    });
  }
  const sha1: undefined | string = val.sha1 == void 0 ? void 0 : val.sha1;
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileConflict" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileConflict"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FileConflict"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileConflict" to be defined',
    });
  }
  const type: FileBaseTypeField = deserializeFileBaseTypeField(val.type);
  return {
    sequenceId: sequenceId,
    name: name,
    sha1: sha1,
    fileVersion: fileVersion,
    id: id,
    etag: etag,
    type: type,
  } satisfies FileConflict;
}
