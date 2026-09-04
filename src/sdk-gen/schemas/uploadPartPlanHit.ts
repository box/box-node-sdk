import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadPartPlanHit {
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
  /**
   * The unique ID of the chunk. */
  readonly partId: string;
  readonly rawData?: SerializedData;
}
export function serializeUploadPartPlanHit(
  val: UploadPartPlanHit
): SerializedData {
  return {
    ['offset']: val.offset,
    ['size']: val.size,
    ['sha512']: val.sha512,
    ['part_id']: val.partId,
  };
}
export function deserializeUploadPartPlanHit(
  val: SerializedData
): UploadPartPlanHit {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UploadPartPlanHit"',
    });
  }
  if (val.offset == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "offset" of type "UploadPartPlanHit" to be defined',
    });
  }
  if (!sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "UploadPartPlanHit"',
    });
  }
  const offset: number = val.offset;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "UploadPartPlanHit" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "UploadPartPlanHit"',
    });
  }
  const size: number = val.size;
  if (val.sha512 == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sha512" of type "UploadPartPlanHit" to be defined',
    });
  }
  if (!sdIsString(val.sha512)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha512" of type "UploadPartPlanHit"',
    });
  }
  const sha512: string = val.sha512;
  if (val.part_id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "part_id" of type "UploadPartPlanHit" to be defined',
    });
  }
  if (!sdIsString(val.part_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "part_id" of type "UploadPartPlanHit"',
    });
  }
  const partId: string = val.part_id;
  return {
    offset: offset,
    size: size,
    sha512: sha512,
    partId: partId,
  } satisfies UploadPartPlanHit;
}
