import { serializeDocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { deserializeDocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { serializeDocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { deserializeDocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { serializeDocumentSplitPageSelectionSegmentV2026R0 } from './documentSplitPageSelectionSegmentV2026R0';
import { deserializeDocumentSplitPageSelectionSegmentV2026R0 } from './documentSplitPageSelectionSegmentV2026R0';
import { DocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { DocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { DocumentSplitPageSelectionSegmentV2026R0 } from './documentSplitPageSelectionSegmentV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocumentSplitPageSelectionItemV2026R0 {
  /**
   * Optional name for the output file (without extension). When omitted the
   * system generates a sequential name based on the source file name. */
  readonly name?: string;
  /**
   * An ordered list of page segments to include in this output file. Each
   * segment specifies either a single page or a contiguous page range. */
  readonly segments: readonly DocumentSplitPageSelectionSegmentV2026R0[];
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitPageSelectionItemV2026R0(
  val: DocumentSplitPageSelectionItemV2026R0,
): SerializedData {
  return {
    ['name']: val.name,
    ['segments']: val.segments.map(function (
      item: DocumentSplitPageSelectionSegmentV2026R0,
    ): SerializedData {
      return serializeDocumentSplitPageSelectionSegmentV2026R0(item);
    }) as readonly any[],
  };
}
export function deserializeDocumentSplitPageSelectionItemV2026R0(
  val: SerializedData,
): DocumentSplitPageSelectionItemV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitPageSelectionItemV2026R0"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "DocumentSplitPageSelectionItemV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.segments == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "segments" of type "DocumentSplitPageSelectionItemV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.segments)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "segments" of type "DocumentSplitPageSelectionItemV2026R0"',
    });
  }
  const segments: readonly DocumentSplitPageSelectionSegmentV2026R0[] =
    sdIsList(val.segments)
      ? (val.segments.map(function (
          itm: SerializedData,
        ): DocumentSplitPageSelectionSegmentV2026R0 {
          return deserializeDocumentSplitPageSelectionSegmentV2026R0(itm);
        }) as readonly any[])
      : [];
  return {
    name: name,
    segments: segments,
  } satisfies DocumentSplitPageSelectionItemV2026R0;
}
