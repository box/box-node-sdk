import { serializeUploadPart } from './uploadPart.generated.js';
import { deserializeUploadPart } from './uploadPart.generated.js';
import { UploadPart } from './uploadPart.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
