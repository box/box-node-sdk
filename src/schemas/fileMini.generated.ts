import { serializeFileBaseTypeField } from './fileBase.generated.js';
import { deserializeFileBaseTypeField } from './fileBase.generated.js';
import { serializeFileBase } from './fileBase.generated.js';
import { deserializeFileBase } from './fileBase.generated.js';
import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { FileBaseTypeField } from './fileBase.generated.js';
import { FileBase } from './fileBase.generated.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class FileMini extends FileBase {
  readonly sequenceId?: string;
  readonly name?: string;
  readonly sha1?: string;
  readonly fileVersion?: FileVersionMini;
  constructor(fields: FileMini) {
    super(fields);
    if (fields.sequenceId !== undefined) {
      this.sequenceId = fields.sequenceId;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.sha1 !== undefined) {
      this.sha1 = fields.sha1;
    }
    if (fields.fileVersion !== undefined) {
      this.fileVersion = fields.fileVersion;
    }
  }
}
export function serializeFileMini(val: FileMini): SerializedData {
  const base: any = serializeFileBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileMini"' });
  }
  return {
    ...base,
    ...{
      ['sequence_id']: val.sequenceId,
      ['name']: val.name,
      ['sha1']: val.sha1,
      ['file_version']:
        val.fileVersion == void 0
          ? val.fileVersion
          : serializeFileVersionMini(val.fileVersion),
    },
  };
}
export function deserializeFileMini(val: SerializedData): FileMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileMini"' });
  }
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "FileMini"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FileMini"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.sha1 == void 0) && !sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "FileMini"',
    });
  }
  const sha1: undefined | string = val.sha1 == void 0 ? void 0 : val.sha1;
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileMini"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FileMini"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileMini" to be defined',
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
  } satisfies FileMini;
}
