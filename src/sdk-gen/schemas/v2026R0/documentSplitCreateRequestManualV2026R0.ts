import { serializeDocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { deserializeDocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { DocumentSplitPageRangeV2026R0 } from './documentSplitPageRangeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateRequestManualV2026R0SplitTypeField =
  | 'manual'
  | string;
export type DocumentSplitCreateRequestManualV2026R0VersionField =
  | 'v_1'
  | string;
export class DocumentSplitCreateRequestManualV2026R0 {
  /**
   * Discriminator. Must be `manual` for this variant. */
  readonly splitType: DocumentSplitCreateRequestManualV2026R0SplitTypeField =
    'manual' as DocumentSplitCreateRequestManualV2026R0SplitTypeField;
  /**
   * The version of the manual split input format. Omitted or `v_1` is the
   * legacy `split_definition` format. Existing clients may omit this field. */
  readonly version?: DocumentSplitCreateRequestManualV2026R0VersionField;
  /**
   * Page ranges that define the split. Each entry produces one output file
   * containing the inclusive page range `[start, end]`. */
  readonly splitDefinition!: readonly DocumentSplitPageRangeV2026R0[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitCreateRequestManualV2026R0, 'splitType'> &
      Partial<Pick<DocumentSplitCreateRequestManualV2026R0, 'splitType'>>
  ) {
    if (fields.splitType !== undefined) {
      this.splitType = fields.splitType;
    }
    if (fields.version !== undefined) {
      this.version = fields.version;
    }
    if (fields.splitDefinition !== undefined) {
      this.splitDefinition = fields.splitDefinition;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitCreateRequestManualV2026R0Input {
  /**
   * Discriminator. Must be `manual` for this variant. */
  readonly splitType?: DocumentSplitCreateRequestManualV2026R0SplitTypeField;
  /**
   * The version of the manual split input format. Omitted or `v_1` is the
   * legacy `split_definition` format. Existing clients may omit this field. */
  readonly version?: DocumentSplitCreateRequestManualV2026R0VersionField;
  /**
   * Page ranges that define the split. Each entry produces one output file
   * containing the inclusive page range `[start, end]`. */
  readonly splitDefinition: readonly DocumentSplitPageRangeV2026R0[];
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
  val: DocumentSplitCreateRequestManualV2026R0SplitTypeField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
  val: SerializedData
): DocumentSplitCreateRequestManualV2026R0SplitTypeField {
  if (val == 'manual') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitCreateRequestManualV2026R0SplitTypeField",
  });
}
export function serializeDocumentSplitCreateRequestManualV2026R0VersionField(
  val: DocumentSplitCreateRequestManualV2026R0VersionField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestManualV2026R0VersionField(
  val: SerializedData
): DocumentSplitCreateRequestManualV2026R0VersionField {
  if (val == 'v_1') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitCreateRequestManualV2026R0VersionField",
  });
}
export function serializeDocumentSplitCreateRequestManualV2026R0(
  val: DocumentSplitCreateRequestManualV2026R0
): SerializedData {
  return {
    ['split_type']:
      serializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
        val.splitType
      ),
    ['version']:
      val.version == void 0
        ? val.version
        : serializeDocumentSplitCreateRequestManualV2026R0VersionField(
            val.version
          ),
    ['split_definition']: val.splitDefinition.map(function (
      item: DocumentSplitPageRangeV2026R0
    ): SerializedData {
      return serializeDocumentSplitPageRangeV2026R0(item);
    }) as readonly any[],
  };
}
export function deserializeDocumentSplitCreateRequestManualV2026R0(
  val: SerializedData
): DocumentSplitCreateRequestManualV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitCreateRequestManualV2026R0"',
    });
  }
  if (val.split_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_type" of type "DocumentSplitCreateRequestManualV2026R0" to be defined',
    });
  }
  const splitType: DocumentSplitCreateRequestManualV2026R0SplitTypeField =
    deserializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
      val.split_type
    );
  const version:
    | undefined
    | DocumentSplitCreateRequestManualV2026R0VersionField =
    val.version == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestManualV2026R0VersionField(
          val.version
        );
  if (val.split_definition == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_definition" of type "DocumentSplitCreateRequestManualV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.split_definition)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "split_definition" of type "DocumentSplitCreateRequestManualV2026R0"',
    });
  }
  const splitDefinition: readonly DocumentSplitPageRangeV2026R0[] = sdIsList(
    val.split_definition
  )
    ? (val.split_definition.map(function (
        itm: SerializedData
      ): DocumentSplitPageRangeV2026R0 {
        return deserializeDocumentSplitPageRangeV2026R0(itm);
      }) as readonly any[])
    : [];
  return {
    splitType: splitType,
    version: version,
    splitDefinition: splitDefinition,
  } satisfies DocumentSplitCreateRequestManualV2026R0;
}
export function serializeDocumentSplitCreateRequestManualV2026R0Input(
  val: DocumentSplitCreateRequestManualV2026R0Input
): SerializedData {
  return {
    ['splitType']:
      val.splitType == void 0
        ? val.splitType
        : serializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
            val.splitType
          ),
    ['version']:
      val.version == void 0
        ? val.version
        : serializeDocumentSplitCreateRequestManualV2026R0VersionField(
            val.version
          ),
    ['split_definition']: val.splitDefinition.map(function (
      item: DocumentSplitPageRangeV2026R0
    ): SerializedData {
      return serializeDocumentSplitPageRangeV2026R0(item);
    }) as readonly any[],
  };
}
export function deserializeDocumentSplitCreateRequestManualV2026R0Input(
  val: SerializedData
): DocumentSplitCreateRequestManualV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitCreateRequestManualV2026R0Input"',
    });
  }
  const splitType:
    | undefined
    | DocumentSplitCreateRequestManualV2026R0SplitTypeField =
    val.splitType == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestManualV2026R0SplitTypeField(
          val.splitType
        );
  const version:
    | undefined
    | DocumentSplitCreateRequestManualV2026R0VersionField =
    val.version == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestManualV2026R0VersionField(
          val.version
        );
  if (val.split_definition == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_definition" of type "DocumentSplitCreateRequestManualV2026R0Input" to be defined',
    });
  }
  if (!sdIsList(val.split_definition)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "split_definition" of type "DocumentSplitCreateRequestManualV2026R0Input"',
    });
  }
  const splitDefinition: readonly DocumentSplitPageRangeV2026R0[] = sdIsList(
    val.split_definition
  )
    ? (val.split_definition.map(function (
        itm: SerializedData
      ): DocumentSplitPageRangeV2026R0 {
        return deserializeDocumentSplitPageRangeV2026R0(itm);
      }) as readonly any[])
    : [];
  return {
    splitType: splitType,
    version: version,
    splitDefinition: splitDefinition,
  } satisfies DocumentSplitCreateRequestManualV2026R0Input;
}
