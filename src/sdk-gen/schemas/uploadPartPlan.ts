import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadPartPlan {
  /**
   * The offset of the chunk within the file
   * in bytes. The lower bound of the position
   * of the chunk within the file. */
  readonly offset: number;
  /**
   * The size of the chunk in bytes. */
  readonly size: number;
  /**
   * The `SHA-512` hash of the chunk. */
  readonly sha512: string;
  readonly rawData?: SerializedData;
}
export function serializeUploadPartPlan(val: UploadPartPlan): SerializedData {
  return { ['offset']: val.offset, ['size']: val.size, ['sha512']: val.sha512 };
}
export function deserializeUploadPartPlan(val: SerializedData): UploadPartPlan {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UploadPartPlan"' });
  }
  if (val.offset == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "offset" of type "UploadPartPlan" to be defined',
    });
  }
  if (!sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "UploadPartPlan"',
    });
  }
  const offset: number = val.offset;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "UploadPartPlan" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "UploadPartPlan"',
    });
  }
  const size: number = val.size;
  if (val.sha512 == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sha512" of type "UploadPartPlan" to be defined',
    });
  }
  if (!sdIsString(val.sha512)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha512" of type "UploadPartPlan"',
    });
  }
  const sha512: string = val.sha512;
  return {
    offset: offset,
    size: size,
    sha512: sha512,
  } satisfies UploadPartPlan;
}
