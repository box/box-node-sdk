import { serializeDocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { deserializeDocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { DocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitPageSelectionV2026R0 =
  readonly DocumentSplitPageSelectionItemV2026R0[];
export function serializeDocumentSplitPageSelectionV2026R0(
  val: DocumentSplitPageSelectionV2026R0
): SerializedData {
  return val.map(function (
    item: DocumentSplitPageSelectionItemV2026R0
  ): SerializedData {
    return serializeDocumentSplitPageSelectionItemV2026R0(item);
  }) as readonly any[];
}
export function deserializeDocumentSplitPageSelectionV2026R0(
  val: SerializedData
): DocumentSplitPageSelectionV2026R0 {
  return sdIsList(val)
    ? (val.map(function (
        itm: SerializedData
      ): DocumentSplitPageSelectionItemV2026R0 {
        return deserializeDocumentSplitPageSelectionItemV2026R0(itm);
      }) as readonly any[])
    : [];
}
