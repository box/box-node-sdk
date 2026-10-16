import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocumentSplitPageRangeV2026R0 {
  /**
   * The first page (inclusive) included in this slice. */
  readonly start: number;
  /**
   * The last page (inclusive) included in this slice. */
  readonly end: number;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitPageRangeV2026R0(
  val: DocumentSplitPageRangeV2026R0
): SerializedData {
  return { ['start']: val.start, ['end']: val.end };
}
export function deserializeDocumentSplitPageRangeV2026R0(
  val: SerializedData
): DocumentSplitPageRangeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitPageRangeV2026R0"',
    });
  }
  if (val.start == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "start" of type "DocumentSplitPageRangeV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.start)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "start" of type "DocumentSplitPageRangeV2026R0"',
    });
  }
  const start: number = val.start;
  if (val.end == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "end" of type "DocumentSplitPageRangeV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.end)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "end" of type "DocumentSplitPageRangeV2026R0"',
    });
  }
  const end: number = val.end;
  return { start: start, end: end } satisfies DocumentSplitPageRangeV2026R0;
}
