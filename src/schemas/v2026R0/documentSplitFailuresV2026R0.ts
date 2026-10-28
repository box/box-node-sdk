import { serializeDocumentFailuresV2026R0 } from './documentFailuresV2026R0';
import { deserializeDocumentFailuresV2026R0 } from './documentFailuresV2026R0';
import { DocumentFailuresV2026R0 } from './documentFailuresV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitFailuresV2026R0 = DocumentFailuresV2026R0;
export function serializeDocumentSplitFailuresV2026R0(
  val: DocumentSplitFailuresV2026R0,
): SerializedData {
  return serializeDocumentFailuresV2026R0(val);
}
export function deserializeDocumentSplitFailuresV2026R0(
  val: SerializedData,
): DocumentSplitFailuresV2026R0 {
  return deserializeDocumentFailuresV2026R0(val);
}
