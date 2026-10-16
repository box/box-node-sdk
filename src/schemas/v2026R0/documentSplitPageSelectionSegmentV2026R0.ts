import { serializeDocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { deserializeDocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { serializeDocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { deserializeDocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { DocumentSplitPageSelectionSinglePageV2026R0 } from './documentSplitPageSelectionSinglePageV2026R0';
import { DocumentSplitPageSelectionPageRangeV2026R0 } from './documentSplitPageSelectionPageRangeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitPageSelectionSegmentV2026R0 =
  | DocumentSplitPageSelectionSinglePageV2026R0
  | DocumentSplitPageSelectionPageRangeV2026R0;
export function serializeDocumentSplitPageSelectionSegmentV2026R0(
  val: any,
): SerializedData {
  if (val.type == 'single_page') {
    return serializeDocumentSplitPageSelectionSinglePageV2026R0(val);
  }
  if (val.type == 'page_range') {
    return serializeDocumentSplitPageSelectionPageRangeV2026R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeDocumentSplitPageSelectionSegmentV2026R0(
  val: SerializedData,
): DocumentSplitPageSelectionSegmentV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitPageSelectionSegmentV2026R0"',
    });
  }
  if (val.type == 'single_page') {
    return deserializeDocumentSplitPageSelectionSinglePageV2026R0(val);
  }
  if (val.type == 'page_range') {
    return deserializeDocumentSplitPageSelectionPageRangeV2026R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitPageSelectionSegmentV2026R0",
  });
}
