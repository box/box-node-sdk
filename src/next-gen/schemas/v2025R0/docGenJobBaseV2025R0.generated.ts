import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type DocGenJobBaseV2025R0TypeField = 'docgen_job';
export class DocGenJobBaseV2025R0 {
  /**
   * The unique identifier that represent a Box Doc Gen job. */
  readonly id!: string;
  /**
   * `docgen_job` */
  readonly type: DocGenJobBaseV2025R0TypeField =
    'docgen_job' as DocGenJobBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<DocGenJobBaseV2025R0, 'type'> &
      Partial<Pick<DocGenJobBaseV2025R0, 'type'>>,
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
export interface DocGenJobBaseV2025R0Input {
  /**
   * The unique identifier that represent a Box Doc Gen job. */
  readonly id: string;
  /**
   * `docgen_job` */
  readonly type?: DocGenJobBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeDocGenJobBaseV2025R0TypeField(
  val: DocGenJobBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeDocGenJobBaseV2025R0TypeField(
  val: SerializedData,
): DocGenJobBaseV2025R0TypeField {
  if (val == 'docgen_job') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocGenJobBaseV2025R0TypeField",
  });
}
export function serializeDocGenJobBaseV2025R0(
  val: DocGenJobBaseV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeDocGenJobBaseV2025R0TypeField(val.type),
  };
}
export function deserializeDocGenJobBaseV2025R0(
  val: SerializedData,
): DocGenJobBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobBaseV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "DocGenJobBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocGenJobBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "DocGenJobBaseV2025R0" to be defined',
    });
  }
  const type: DocGenJobBaseV2025R0TypeField =
    deserializeDocGenJobBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies DocGenJobBaseV2025R0;
}
export function serializeDocGenJobBaseV2025R0Input(
  val: DocGenJobBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeDocGenJobBaseV2025R0TypeField(val.type),
  };
}
export function deserializeDocGenJobBaseV2025R0Input(
  val: SerializedData,
): DocGenJobBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "DocGenJobBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DocGenJobBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | DocGenJobBaseV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeDocGenJobBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies DocGenJobBaseV2025R0Input;
}
