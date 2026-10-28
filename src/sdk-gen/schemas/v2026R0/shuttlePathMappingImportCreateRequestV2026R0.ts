import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttlePathMappingImportCreateRequestV2026R0 {
  /**
   * The unique identifier of the shuttle job whose path mappings are
   * replaced. */
  readonly jobId: string;
  /**
   * The unique identifier of the Box file holding the mapping workbook. The
   * file is read as the calling user, so it must live somewhere that user can
   * download from. */
  readonly fileId: string;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingImportCreateRequestV2026R0(
  val: ShuttlePathMappingImportCreateRequestV2026R0
): SerializedData {
  return { ['job_id']: val.jobId, ['file_id']: val.fileId };
}
export function deserializeShuttlePathMappingImportCreateRequestV2026R0(
  val: SerializedData
): ShuttlePathMappingImportCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingImportCreateRequestV2026R0"',
    });
  }
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttlePathMappingImportCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttlePathMappingImportCreateRequestV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.file_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "file_id" of type "ShuttlePathMappingImportCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.file_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "file_id" of type "ShuttlePathMappingImportCreateRequestV2026R0"',
    });
  }
  const fileId: string = val.file_id;
  return {
    jobId: jobId,
    fileId: fileId,
  } satisfies ShuttlePathMappingImportCreateRequestV2026R0;
}
