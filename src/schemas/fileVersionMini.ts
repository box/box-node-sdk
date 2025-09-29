import { serializeFileVersionBaseTypeField } from './fileVersionBase';
import { deserializeFileVersionBaseTypeField } from './fileVersionBase';
import { serializeFileVersionBase } from './fileVersionBase';
import { deserializeFileVersionBase } from './fileVersionBase';
import { FileVersionBaseTypeField } from './fileVersionBase';
import { FileVersionBase } from './fileVersionBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class FileVersionMini extends FileVersionBase {
  readonly sha1?: string;
  constructor(fields: FileVersionMini) {
    super(fields);
    if (fields.sha1 !== undefined) {
      this.sha1 = fields.sha1;
    }
  }
}
export function serializeFileVersionMini(val: FileVersionMini): SerializedData {
  const base: any = serializeFileVersionBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileVersionMini"' });
  }
  return { ...base, ...{ ['sha1']: val.sha1 } };
}
export function deserializeFileVersionMini(
  val: SerializedData,
): FileVersionMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileVersionMini"' });
  }
  if (!(val.sha1 == void 0) && !sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "FileVersionMini"',
    });
  }
  const sha1: undefined | string = val.sha1 == void 0 ? void 0 : val.sha1;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileVersionMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionMini"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileVersionMini" to be defined',
    });
  }
  const type: FileVersionBaseTypeField = deserializeFileVersionBaseTypeField(
    val.type,
  );
  return { sha1: sha1, id: id, type: type } satisfies FileVersionMini;
}
