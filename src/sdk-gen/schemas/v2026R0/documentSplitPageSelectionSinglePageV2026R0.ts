import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitPageSelectionSinglePageV2026R0TypeField =
  'single_page';
export class DocumentSplitPageSelectionSinglePageV2026R0 {
  /**
   * Discriminator. Must be `single_page` for this variant. */
  readonly type: DocumentSplitPageSelectionSinglePageV2026R0TypeField =
    'single_page' as DocumentSplitPageSelectionSinglePageV2026R0TypeField;
  /**
   * A single page number to include. */
  readonly page!: number;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitPageSelectionSinglePageV2026R0, 'type'> &
      Partial<Pick<DocumentSplitPageSelectionSinglePageV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.page !== undefined) {
      this.page = fields.page;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitPageSelectionSinglePageV2026R0Input {
  /**
   * Discriminator. Must be `single_page` for this variant. */
  readonly type?: DocumentSplitPageSelectionSinglePageV2026R0TypeField;
  /**
   * A single page number to include. */
  readonly page: number;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(
  val: DocumentSplitPageSelectionSinglePageV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(
  val: SerializedData
): DocumentSplitPageSelectionSinglePageV2026R0TypeField {
  if (val == 'single_page') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitPageSelectionSinglePageV2026R0TypeField",
  });
}
export function serializeDocumentSplitPageSelectionSinglePageV2026R0(
  val: DocumentSplitPageSelectionSinglePageV2026R0
): SerializedData {
  return {
    ['type']: serializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(
      val.type
    ),
    ['page']: val.page,
  };
}
export function deserializeDocumentSplitPageSelectionSinglePageV2026R0(
  val: SerializedData
): DocumentSplitPageSelectionSinglePageV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitPageSelectionSinglePageV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "DocumentSplitPageSelectionSinglePageV2026R0" to be defined',
    });
  }
  const type: DocumentSplitPageSelectionSinglePageV2026R0TypeField =
    deserializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(val.type);
  if (val.page == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "page" of type "DocumentSplitPageSelectionSinglePageV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.page)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "page" of type "DocumentSplitPageSelectionSinglePageV2026R0"',
    });
  }
  const page: number = val.page;
  return {
    type: type,
    page: page,
  } satisfies DocumentSplitPageSelectionSinglePageV2026R0;
}
export function serializeDocumentSplitPageSelectionSinglePageV2026R0Input(
  val: DocumentSplitPageSelectionSinglePageV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(
            val.type
          ),
    ['page']: val.page,
  };
}
export function deserializeDocumentSplitPageSelectionSinglePageV2026R0Input(
  val: SerializedData
): DocumentSplitPageSelectionSinglePageV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitPageSelectionSinglePageV2026R0Input"',
    });
  }
  const type: undefined | DocumentSplitPageSelectionSinglePageV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocumentSplitPageSelectionSinglePageV2026R0TypeField(
          val.type
        );
  if (val.page == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "page" of type "DocumentSplitPageSelectionSinglePageV2026R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.page)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "page" of type "DocumentSplitPageSelectionSinglePageV2026R0Input"',
    });
  }
  const page: number = val.page;
  return {
    type: type,
    page: page,
  } satisfies DocumentSplitPageSelectionSinglePageV2026R0Input;
}
