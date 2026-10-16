import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateResponseV2026R0TypeField = 'document_split';
export class DocumentSplitCreateResponseV2026R0 {
  /**
   * The value will always be `document_split`. */
  readonly type: DocumentSplitCreateResponseV2026R0TypeField =
    'document_split' as DocumentSplitCreateResponseV2026R0TypeField;
  /**
   * The unique identifier of the created Document Split job. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitCreateResponseV2026R0, 'type'> &
      Partial<Pick<DocumentSplitCreateResponseV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitCreateResponseV2026R0Input {
  /**
   * The value will always be `document_split`. */
  readonly type?: DocumentSplitCreateResponseV2026R0TypeField;
  /**
   * The unique identifier of the created Document Split job. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitCreateResponseV2026R0TypeField(
  val: DocumentSplitCreateResponseV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateResponseV2026R0TypeField(
  val: SerializedData
): DocumentSplitCreateResponseV2026R0TypeField {
  if (val == 'document_split') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocumentSplitCreateResponseV2026R0TypeField",
  });
}
export function serializeDocumentSplitCreateResponseV2026R0(
  val: DocumentSplitCreateResponseV2026R0
): SerializedData {
  return {
    ['type']: serializeDocumentSplitCreateResponseV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeDocumentSplitCreateResponseV2026R0(
  val: SerializedData
): DocumentSplitCreateResponseV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitCreateResponseV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "DocumentSplitCreateResponseV2026R0" to be defined',
    });
  }
  const type: DocumentSplitCreateResponseV2026R0TypeField =
    deserializeDocumentSplitCreateResponseV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "DocumentSplitCreateResponseV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "DocumentSplitCreateResponseV2026R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies DocumentSplitCreateResponseV2026R0;
}
export function serializeDocumentSplitCreateResponseV2026R0Input(
  val: DocumentSplitCreateResponseV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocumentSplitCreateResponseV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeDocumentSplitCreateResponseV2026R0Input(
  val: SerializedData
): DocumentSplitCreateResponseV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitCreateResponseV2026R0Input"',
    });
  }
  const type: undefined | DocumentSplitCreateResponseV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocumentSplitCreateResponseV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "DocumentSplitCreateResponseV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "DocumentSplitCreateResponseV2026R0Input"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies DocumentSplitCreateResponseV2026R0Input;
}
