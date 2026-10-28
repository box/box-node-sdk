import { serializeDocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { deserializeDocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { serializeDocumentSplitPageSelectionV2026R0 } from './documentSplitPageSelectionV2026R0';
import { deserializeDocumentSplitPageSelectionV2026R0 } from './documentSplitPageSelectionV2026R0';
import { DocumentSplitPageSelectionItemV2026R0 } from './documentSplitPageSelectionItemV2026R0';
import { DocumentSplitPageSelectionV2026R0 } from './documentSplitPageSelectionV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField =
  'page_selection' | string;
export type DocumentSplitCreateRequestPageSelectionV2026R0VersionField =
  'v_2' | string;
export class DocumentSplitCreateRequestPageSelectionV2026R0 {
  /**
   * Discriminator. Must be `page_selection` for this variant. */
  readonly splitType: DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField =
    'page_selection' as DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField;
  /**
   * The version of the page selection input format. Optional. When provided
   * must be `v_2`. */
  readonly version?: DocumentSplitCreateRequestPageSelectionV2026R0VersionField;
  readonly pageSelection!: DocumentSplitPageSelectionV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitCreateRequestPageSelectionV2026R0, 'splitType'> &
      Partial<
        Pick<DocumentSplitCreateRequestPageSelectionV2026R0, 'splitType'>
      >,
  ) {
    if (fields.splitType !== undefined) {
      this.splitType = fields.splitType;
    }
    if (fields.version !== undefined) {
      this.version = fields.version;
    }
    if (fields.pageSelection !== undefined) {
      this.pageSelection = fields.pageSelection;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitCreateRequestPageSelectionV2026R0Input {
  /**
   * Discriminator. Must be `page_selection` for this variant. */
  readonly splitType?: DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField;
  /**
   * The version of the page selection input format. Optional. When provided
   * must be `v_2`. */
  readonly version?: DocumentSplitCreateRequestPageSelectionV2026R0VersionField;
  readonly pageSelection: DocumentSplitPageSelectionV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
  val: DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField,
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
  val: SerializedData,
): DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField {
  if (val == 'page_selection') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField",
  });
}
export function serializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
  val: DocumentSplitCreateRequestPageSelectionV2026R0VersionField,
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
  val: SerializedData,
): DocumentSplitCreateRequestPageSelectionV2026R0VersionField {
  if (val == 'v_2') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitCreateRequestPageSelectionV2026R0VersionField",
  });
}
export function serializeDocumentSplitCreateRequestPageSelectionV2026R0(
  val: DocumentSplitCreateRequestPageSelectionV2026R0,
): SerializedData {
  return {
    ['split_type']:
      serializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
        val.splitType,
      ),
    ['version']:
      val.version == void 0
        ? val.version
        : serializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
            val.version,
          ),
    ['page_selection']: serializeDocumentSplitPageSelectionV2026R0(
      val.pageSelection,
    ),
  };
}
export function deserializeDocumentSplitCreateRequestPageSelectionV2026R0(
  val: SerializedData,
): DocumentSplitCreateRequestPageSelectionV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitCreateRequestPageSelectionV2026R0"',
    });
  }
  if (val.split_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_type" of type "DocumentSplitCreateRequestPageSelectionV2026R0" to be defined',
    });
  }
  const splitType: DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField =
    deserializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
      val.split_type,
    );
  const version:
    undefined | DocumentSplitCreateRequestPageSelectionV2026R0VersionField =
    val.version == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
          val.version,
        );
  if (val.page_selection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "page_selection" of type "DocumentSplitCreateRequestPageSelectionV2026R0" to be defined',
    });
  }
  const pageSelection: DocumentSplitPageSelectionV2026R0 =
    deserializeDocumentSplitPageSelectionV2026R0(val.page_selection);
  return {
    splitType: splitType,
    version: version,
    pageSelection: pageSelection,
  } satisfies DocumentSplitCreateRequestPageSelectionV2026R0;
}
export function serializeDocumentSplitCreateRequestPageSelectionV2026R0Input(
  val: DocumentSplitCreateRequestPageSelectionV2026R0Input,
): SerializedData {
  return {
    ['splitType']:
      val.splitType == void 0
        ? val.splitType
        : serializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
            val.splitType,
          ),
    ['version']:
      val.version == void 0
        ? val.version
        : serializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
            val.version,
          ),
    ['page_selection']: serializeDocumentSplitPageSelectionV2026R0(
      val.pageSelection,
    ),
  };
}
export function deserializeDocumentSplitCreateRequestPageSelectionV2026R0Input(
  val: SerializedData,
): DocumentSplitCreateRequestPageSelectionV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitCreateRequestPageSelectionV2026R0Input"',
    });
  }
  const splitType:
    undefined | DocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField =
    val.splitType == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestPageSelectionV2026R0SplitTypeField(
          val.splitType,
        );
  const version:
    undefined | DocumentSplitCreateRequestPageSelectionV2026R0VersionField =
    val.version == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestPageSelectionV2026R0VersionField(
          val.version,
        );
  if (val.page_selection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "page_selection" of type "DocumentSplitCreateRequestPageSelectionV2026R0Input" to be defined',
    });
  }
  const pageSelection: DocumentSplitPageSelectionV2026R0 =
    deserializeDocumentSplitPageSelectionV2026R0(val.page_selection);
  return {
    splitType: splitType,
    version: version,
    pageSelection: pageSelection,
  } satisfies DocumentSplitCreateRequestPageSelectionV2026R0Input;
}
