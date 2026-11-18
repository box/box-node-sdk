import { serializeFolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { deserializeFolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { FolderReferenceV2026R0 } from './folderReferenceV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type NotesConvertRequestBodyV2026R0ContentFormatField =
  'markdown' | string;
export class NotesConvertRequestBodyV2026R0 {
  /**
   * The content to convert to a note. See the `content_format` field for supported formats. */
  readonly content!: string;
  /**
   * Format of the content to convert. */
  readonly contentFormat: NotesConvertRequestBodyV2026R0ContentFormatField =
    'markdown' as NotesConvertRequestBodyV2026R0ContentFormatField;
  readonly parent!: FolderReferenceV2026R0;
  /**
   * The name for the created note. The `.boxnote` extension is appended automatically. */
  readonly name!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<NotesConvertRequestBodyV2026R0, 'contentFormat'> &
      Partial<Pick<NotesConvertRequestBodyV2026R0, 'contentFormat'>>
  ) {
    if (fields.content !== undefined) {
      this.content = fields.content;
    }
    if (fields.contentFormat !== undefined) {
      this.contentFormat = fields.contentFormat;
    }
    if (fields.parent !== undefined) {
      this.parent = fields.parent;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface NotesConvertRequestBodyV2026R0Input {
  /**
   * The content to convert to a note. See the `content_format` field for supported formats. */
  readonly content: string;
  /**
   * Format of the content to convert. */
  readonly contentFormat?: NotesConvertRequestBodyV2026R0ContentFormatField;
  readonly parent: FolderReferenceV2026R0;
  /**
   * The name for the created note. The `.boxnote` extension is appended automatically. */
  readonly name: string;
  readonly rawData?: SerializedData;
}
export function serializeNotesConvertRequestBodyV2026R0ContentFormatField(
  val: NotesConvertRequestBodyV2026R0ContentFormatField
): SerializedData {
  return val;
}
export function deserializeNotesConvertRequestBodyV2026R0ContentFormatField(
  val: SerializedData
): NotesConvertRequestBodyV2026R0ContentFormatField {
  if (val == 'markdown') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize NotesConvertRequestBodyV2026R0ContentFormatField",
  });
}
export function serializeNotesConvertRequestBodyV2026R0(
  val: NotesConvertRequestBodyV2026R0
): SerializedData {
  return {
    ['content']: val.content,
    ['content_format']:
      serializeNotesConvertRequestBodyV2026R0ContentFormatField(
        val.contentFormat
      ),
    ['parent']: serializeFolderReferenceV2026R0(val.parent),
    ['name']: val.name,
  };
}
export function deserializeNotesConvertRequestBodyV2026R0(
  val: SerializedData
): NotesConvertRequestBodyV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "NotesConvertRequestBodyV2026R0"',
    });
  }
  if (val.content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content" of type "NotesConvertRequestBodyV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.content)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content" of type "NotesConvertRequestBodyV2026R0"',
    });
  }
  const content: string = val.content;
  if (val.content_format == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content_format" of type "NotesConvertRequestBodyV2026R0" to be defined',
    });
  }
  const contentFormat: NotesConvertRequestBodyV2026R0ContentFormatField =
    deserializeNotesConvertRequestBodyV2026R0ContentFormatField(
      val.content_format
    );
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "NotesConvertRequestBodyV2026R0" to be defined',
    });
  }
  const parent: FolderReferenceV2026R0 = deserializeFolderReferenceV2026R0(
    val.parent
  );
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "NotesConvertRequestBodyV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "NotesConvertRequestBodyV2026R0"',
    });
  }
  const name: string = val.name;
  return {
    content: content,
    contentFormat: contentFormat,
    parent: parent,
    name: name,
  } satisfies NotesConvertRequestBodyV2026R0;
}
export function serializeNotesConvertRequestBodyV2026R0Input(
  val: NotesConvertRequestBodyV2026R0Input
): SerializedData {
  return {
    ['content']: val.content,
    ['contentFormat']:
      val.contentFormat == void 0
        ? val.contentFormat
        : serializeNotesConvertRequestBodyV2026R0ContentFormatField(
            val.contentFormat
          ),
    ['parent']: serializeFolderReferenceV2026R0(val.parent),
    ['name']: val.name,
  };
}
export function deserializeNotesConvertRequestBodyV2026R0Input(
  val: SerializedData
): NotesConvertRequestBodyV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "NotesConvertRequestBodyV2026R0Input"',
    });
  }
  if (val.content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "content" of type "NotesConvertRequestBodyV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.content)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content" of type "NotesConvertRequestBodyV2026R0Input"',
    });
  }
  const content: string = val.content;
  const contentFormat:
    undefined | NotesConvertRequestBodyV2026R0ContentFormatField =
    val.contentFormat == void 0
      ? void 0
      : deserializeNotesConvertRequestBodyV2026R0ContentFormatField(
          val.contentFormat
        );
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "NotesConvertRequestBodyV2026R0Input" to be defined',
    });
  }
  const parent: FolderReferenceV2026R0 = deserializeFolderReferenceV2026R0(
    val.parent
  );
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "NotesConvertRequestBodyV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "NotesConvertRequestBodyV2026R0Input"',
    });
  }
  const name: string = val.name;
  return {
    content: content,
    contentFormat: contentFormat,
    parent: parent,
    name: name,
  } satisfies NotesConvertRequestBodyV2026R0Input;
}
