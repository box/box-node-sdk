import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type DocumentSplitCreateRequestSmartV2026R0SplitTypeField =
  | 'smart'
  | string;
export class DocumentSplitCreateRequestSmartV2026R0 {
  /**
   * Discriminator. Must be `smart` for this variant. */
  readonly splitType: DocumentSplitCreateRequestSmartV2026R0SplitTypeField =
    'smart' as DocumentSplitCreateRequestSmartV2026R0SplitTypeField;
  /**
   * A natural language prompt that guides automatic page range detection. */
  readonly prompt!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocumentSplitCreateRequestSmartV2026R0, 'splitType'> &
      Partial<Pick<DocumentSplitCreateRequestSmartV2026R0, 'splitType'>>
  ) {
    if (fields.splitType !== undefined) {
      this.splitType = fields.splitType;
    }
    if (fields.prompt !== undefined) {
      this.prompt = fields.prompt;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocumentSplitCreateRequestSmartV2026R0Input {
  /**
   * Discriminator. Must be `smart` for this variant. */
  readonly splitType?: DocumentSplitCreateRequestSmartV2026R0SplitTypeField;
  /**
   * A natural language prompt that guides automatic page range detection. */
  readonly prompt: string;
  readonly rawData?: SerializedData;
}
export function serializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
  val: DocumentSplitCreateRequestSmartV2026R0SplitTypeField
): SerializedData {
  return val;
}
export function deserializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
  val: SerializedData
): DocumentSplitCreateRequestSmartV2026R0SplitTypeField {
  if (val == 'smart') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize DocumentSplitCreateRequestSmartV2026R0SplitTypeField",
  });
}
export function serializeDocumentSplitCreateRequestSmartV2026R0(
  val: DocumentSplitCreateRequestSmartV2026R0
): SerializedData {
  return {
    ['split_type']:
      serializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
        val.splitType
      ),
    ['prompt']: val.prompt,
  };
}
export function deserializeDocumentSplitCreateRequestSmartV2026R0(
  val: SerializedData
): DocumentSplitCreateRequestSmartV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocumentSplitCreateRequestSmartV2026R0"',
    });
  }
  if (val.split_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "split_type" of type "DocumentSplitCreateRequestSmartV2026R0" to be defined',
    });
  }
  const splitType: DocumentSplitCreateRequestSmartV2026R0SplitTypeField =
    deserializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
      val.split_type
    );
  if (val.prompt == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "prompt" of type "DocumentSplitCreateRequestSmartV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt" of type "DocumentSplitCreateRequestSmartV2026R0"',
    });
  }
  const prompt: string = val.prompt;
  return {
    splitType: splitType,
    prompt: prompt,
  } satisfies DocumentSplitCreateRequestSmartV2026R0;
}
export function serializeDocumentSplitCreateRequestSmartV2026R0Input(
  val: DocumentSplitCreateRequestSmartV2026R0Input
): SerializedData {
  return {
    ['splitType']:
      val.splitType == void 0
        ? val.splitType
        : serializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
            val.splitType
          ),
    ['prompt']: val.prompt,
  };
}
export function deserializeDocumentSplitCreateRequestSmartV2026R0Input(
  val: SerializedData
): DocumentSplitCreateRequestSmartV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "DocumentSplitCreateRequestSmartV2026R0Input"',
    });
  }
  const splitType:
    | undefined
    | DocumentSplitCreateRequestSmartV2026R0SplitTypeField =
    val.splitType == void 0
      ? void 0
      : deserializeDocumentSplitCreateRequestSmartV2026R0SplitTypeField(
          val.splitType
        );
  if (val.prompt == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "prompt" of type "DocumentSplitCreateRequestSmartV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt" of type "DocumentSplitCreateRequestSmartV2026R0Input"',
    });
  }
  const prompt: string = val.prompt;
  return {
    splitType: splitType,
    prompt: prompt,
  } satisfies DocumentSplitCreateRequestSmartV2026R0Input;
}
