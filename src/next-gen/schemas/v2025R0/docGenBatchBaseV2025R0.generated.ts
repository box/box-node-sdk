import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type DocGenBatchBaseV2025R0TypeField = 'docgen_batch';
export class DocGenBatchBaseV2025R0 {
  /**
   * The unique identifier that represents a Box Doc Gen batch. */
  readonly id!: string;
  /**
   * `docgen_batch` */
  readonly type: DocGenBatchBaseV2025R0TypeField =
    'docgen_batch' as DocGenBatchBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocGenBatchBaseV2025R0, 'type'> &
      Partial<Pick<DocGenBatchBaseV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface DocGenBatchBaseV2025R0Input {
  /**
   * The unique identifier that represents a Box Doc Gen batch. */
  readonly id: string;
  /**
   * `docgen_batch` */
  readonly type?: DocGenBatchBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeDocGenBatchBaseV2025R0TypeField(
  val: DocGenBatchBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeDocGenBatchBaseV2025R0TypeField(
  val: SerializedData,
): DocGenBatchBaseV2025R0TypeField {
  if (val == 'docgen_batch') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocGenBatchBaseV2025R0TypeField",
  });
}
export function serializeDocGenBatchBaseV2025R0(
  val: DocGenBatchBaseV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeDocGenBatchBaseV2025R0TypeField(val.type),
  };
}
export function deserializeDocGenBatchBaseV2025R0(
  val: SerializedData,
): DocGenBatchBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenBatchBaseV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "DocGenBatchBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocGenBatchBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "DocGenBatchBaseV2025R0" to be defined',
    });
  }
  const type: DocGenBatchBaseV2025R0TypeField =
    deserializeDocGenBatchBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies DocGenBatchBaseV2025R0;
}
export function serializeDocGenBatchBaseV2025R0Input(
  val: DocGenBatchBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocGenBatchBaseV2025R0TypeField(val.type),
  };
}
export function deserializeDocGenBatchBaseV2025R0Input(
  val: SerializedData,
): DocGenBatchBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenBatchBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "DocGenBatchBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "DocGenBatchBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | DocGenBatchBaseV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocGenBatchBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies DocGenBatchBaseV2025R0Input;
}
