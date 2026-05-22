import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type NotesConvertResponseV2026R0TypeField = 'file';
export class NotesConvertResponseV2026R0 {
  /**
   * The Box resource type; always `file` for a Box file. */
  readonly type: NotesConvertResponseV2026R0TypeField =
    'file' as NotesConvertResponseV2026R0TypeField;
  /**
   * Box file ID of the created `.boxnote` file. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<NotesConvertResponseV2026R0, 'type'> &
      Partial<Pick<NotesConvertResponseV2026R0, 'type'>>
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
export interface NotesConvertResponseV2026R0Input {
  /**
   * The Box resource type; always `file` for a Box file. */
  readonly type?: NotesConvertResponseV2026R0TypeField;
  /**
   * Box file ID of the created `.boxnote` file. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeNotesConvertResponseV2026R0TypeField(
  val: NotesConvertResponseV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeNotesConvertResponseV2026R0TypeField(
  val: SerializedData
): NotesConvertResponseV2026R0TypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize NotesConvertResponseV2026R0TypeField",
  });
}
export function serializeNotesConvertResponseV2026R0(
  val: NotesConvertResponseV2026R0
): SerializedData {
  return {
    ['type']: serializeNotesConvertResponseV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeNotesConvertResponseV2026R0(
  val: SerializedData
): NotesConvertResponseV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "NotesConvertResponseV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "NotesConvertResponseV2026R0" to be defined',
    });
  }
  const type: NotesConvertResponseV2026R0TypeField =
    deserializeNotesConvertResponseV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "NotesConvertResponseV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "NotesConvertResponseV2026R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies NotesConvertResponseV2026R0;
}
export function serializeNotesConvertResponseV2026R0Input(
  val: NotesConvertResponseV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeNotesConvertResponseV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeNotesConvertResponseV2026R0Input(
  val: SerializedData
): NotesConvertResponseV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "NotesConvertResponseV2026R0Input"',
    });
  }
  const type: undefined | NotesConvertResponseV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeNotesConvertResponseV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "NotesConvertResponseV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "NotesConvertResponseV2026R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies NotesConvertResponseV2026R0Input;
}
