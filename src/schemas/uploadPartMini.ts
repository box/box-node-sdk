import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadPartMini {
  /**
   * The unique ID of the chunk. */
  readonly partId?: string;
  /**
   * The offset of the chunk within the file
   * in bytes. The lower bound of the position
   * of the chunk within the file. */
  readonly offset?: number;
  /**
   * The size of the chunk in bytes. */
  readonly size?: number;
  readonly rawData?: SerializedData;
}
export function serializeUploadPartMini(val: UploadPartMini): SerializedData {
  return {
    ['part_id']: val.partId,
    ['offset']: val.offset,
    ['size']: val.size,
  };
}
export function deserializeUploadPartMini(val: SerializedData): UploadPartMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UploadPartMini"' });
  }
  if (!(val.part_id == void 0) && !sdIsString(val.part_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "part_id" of type "UploadPartMini"',
    });
  }
  const partId: undefined | string =
    val.part_id == void 0 ? void 0 : val.part_id;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "UploadPartMini"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "UploadPartMini"',
    });
  }
  const size: undefined | number = val.size == void 0 ? void 0 : val.size;
  return {
    partId: partId,
    offset: offset,
    size: size,
  } satisfies UploadPartMini;
}
