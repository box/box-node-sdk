import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitPageSelectionPageRangeV2026R0TypeField = 'page_range';
export class DocumentSplitPageSelectionPageRangeV2026R0 {
  /**
   * Discriminator. Must be `page_range` for this variant. */
  readonly type: DocumentSplitPageSelectionPageRangeV2026R0TypeField =
    'page_range' as DocumentSplitPageSelectionPageRangeV2026R0TypeField;
  /**
   * The first page (inclusive) included in this segment. */
  readonly start!: number;
  /**
   * The last page (inclusive) included in this segment. */
  readonly end!: number;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitPageSelectionPageRangeV2026R0, 'type'> &
      Partial<Pick<DocumentSplitPageSelectionPageRangeV2026R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.start !== undefined) {
      this.start = fields.start;
    }
    if (fields.end !== undefined) {
      this.end = fields.end;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitPageSelectionPageRangeV2026R0Input {
  /**
   * Discriminator. Must be `page_range` for this variant. */
  readonly type?: DocumentSplitPageSelectionPageRangeV2026R0TypeField;
  /**
   * The first page (inclusive) included in this segment. */
  readonly start: number;
  /**
   * The last page (inclusive) included in this segment. */
  readonly end: number;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(
  val: DocumentSplitPageSelectionPageRangeV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(
  val: SerializedData,
): DocumentSplitPageSelectionPageRangeV2026R0TypeField {
  if (val == 'page_range') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitPageSelectionPageRangeV2026R0TypeField",
  });
}
export function serializeDocumentSplitPageSelectionPageRangeV2026R0(
  val: DocumentSplitPageSelectionPageRangeV2026R0,
): SerializedData {
  return {
    ['type']: serializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(
      val.type,
    ),
    ['start']: val.start,
    ['end']: val.end,
  };
}
export function deserializeDocumentSplitPageSelectionPageRangeV2026R0(
  val: SerializedData,
): DocumentSplitPageSelectionPageRangeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitPageSelectionPageRangeV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "DocumentSplitPageSelectionPageRangeV2026R0" to be defined',
    });
  }
  const type: DocumentSplitPageSelectionPageRangeV2026R0TypeField =
    deserializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(val.type);
  if (val.start == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "start" of type "DocumentSplitPageSelectionPageRangeV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.start)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "start" of type "DocumentSplitPageSelectionPageRangeV2026R0"',
    });
  }
  const start: number = val.start;
  if (val.end == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "end" of type "DocumentSplitPageSelectionPageRangeV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.end)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "end" of type "DocumentSplitPageSelectionPageRangeV2026R0"',
    });
  }
  const end: number = val.end;
  return {
    type: type,
    start: start,
    end: end,
  } satisfies DocumentSplitPageSelectionPageRangeV2026R0;
}
export function serializeDocumentSplitPageSelectionPageRangeV2026R0Input(
  val: DocumentSplitPageSelectionPageRangeV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(
            val.type,
          ),
    ['start']: val.start,
    ['end']: val.end,
  };
}
export function deserializeDocumentSplitPageSelectionPageRangeV2026R0Input(
  val: SerializedData,
): DocumentSplitPageSelectionPageRangeV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitPageSelectionPageRangeV2026R0Input"',
    });
  }
  const type: undefined | DocumentSplitPageSelectionPageRangeV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocumentSplitPageSelectionPageRangeV2026R0TypeField(
          val.type,
        );
  if (val.start == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "start" of type "DocumentSplitPageSelectionPageRangeV2026R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.start)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "start" of type "DocumentSplitPageSelectionPageRangeV2026R0Input"',
    });
  }
  const start: number = val.start;
  if (val.end == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "end" of type "DocumentSplitPageSelectionPageRangeV2026R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.end)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "end" of type "DocumentSplitPageSelectionPageRangeV2026R0Input"',
    });
  }
  const end: number = val.end;
  return {
    type: type,
    start: start,
    end: end,
  } satisfies DocumentSplitPageSelectionPageRangeV2026R0Input;
}
