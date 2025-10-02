import { serializeUploadPart } from './uploadPart';
import { deserializeUploadPart } from './uploadPart';
import { UploadPart } from './uploadPart';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadedPart {
  readonly part?: UploadPart;
  readonly rawData?: SerializedData;
}
export function serializeUploadedPart(val: UploadedPart): SerializedData {
  return {
    ['part']: val.part == void 0 ? val.part : serializeUploadPart(val.part),
  };
}
export function deserializeUploadedPart(val: SerializedData): UploadedPart {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UploadedPart"' });
  }
  const part: undefined | UploadPart =
    val.part == void 0 ? void 0 : deserializeUploadPart(val.part);
  return { part: part } satisfies UploadedPart;
}
