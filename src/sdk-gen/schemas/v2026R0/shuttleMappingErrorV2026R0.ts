import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleMappingErrorV2026R0TypeField = 'shuttle_mapping_error';
export class ShuttleMappingErrorV2026R0 {
  /**
   * The unique identifier for the mapping error. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_mapping_error`. */
  readonly type: ShuttleMappingErrorV2026R0TypeField =
    'shuttle_mapping_error' as ShuttleMappingErrorV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this error belongs to. */
  readonly jobId!: string;
  /**
   * The mapping revision this error belongs to. */
  readonly revision!: number;
  /**
   * The category of mapping work that produced the error. This is an open
   * string whose set of values can grow. */
  readonly category!: string;
  /**
   * The path or subject that the mapping error refers to. */
  readonly path!: string;
  /**
   * Human-readable messages describing the mapping error. */
  readonly messages!: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleMappingErrorV2026R0, 'type'> &
      Partial<Pick<ShuttleMappingErrorV2026R0, 'type'>>
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.jobId !== undefined) {
      this.jobId = fields.jobId;
    }
    if (fields.revision !== undefined) {
      this.revision = fields.revision;
    }
    if (fields.category !== undefined) {
      this.category = fields.category;
    }
    if (fields.path !== undefined) {
      this.path = fields.path;
    }
    if (fields.messages !== undefined) {
      this.messages = fields.messages;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleMappingErrorV2026R0Input {
  /**
   * The unique identifier for the mapping error. */
  readonly id: string;
  /**
   * The value will always be `shuttle_mapping_error`. */
  readonly type?: ShuttleMappingErrorV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this error belongs to. */
  readonly jobId: string;
  /**
   * The mapping revision this error belongs to. */
  readonly revision: number;
  /**
   * The category of mapping work that produced the error. This is an open
   * string whose set of values can grow. */
  readonly category: string;
  /**
   * The path or subject that the mapping error refers to. */
  readonly path: string;
  /**
   * Human-readable messages describing the mapping error. */
  readonly messages: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShuttleMappingErrorV2026R0TypeField(
  val: ShuttleMappingErrorV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttleMappingErrorV2026R0TypeField(
  val: SerializedData
): ShuttleMappingErrorV2026R0TypeField {
  if (val == 'shuttle_mapping_error') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleMappingErrorV2026R0TypeField",
  });
}
export function serializeShuttleMappingErrorV2026R0(
  val: ShuttleMappingErrorV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleMappingErrorV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['revision']: val.revision,
    ['category']: val.category,
    ['path']: val.path,
    ['messages']: val.messages.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShuttleMappingErrorV2026R0(
  val: SerializedData
): ShuttleMappingErrorV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleMappingErrorV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  const type: ShuttleMappingErrorV2026R0TypeField =
    deserializeShuttleMappingErrorV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.revision == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "revision" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const revision: number = val.revision;
  if (val.category == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "category" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.category)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "category" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const category: string = val.category;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const path: string = val.path;
  if (val.messages == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "messages" of type "ShuttleMappingErrorV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.messages)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "messages" of type "ShuttleMappingErrorV2026R0"',
    });
  }
  const messages: readonly string[] = sdIsList(val.messages)
    ? (val.messages.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShuttleMappingErrorV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    jobId: jobId,
    revision: revision,
    category: category,
    path: path,
    messages: messages,
  } satisfies ShuttleMappingErrorV2026R0;
}
export function serializeShuttleMappingErrorV2026R0Input(
  val: ShuttleMappingErrorV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleMappingErrorV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['revision']: val.revision,
    ['category']: val.category,
    ['path']: val.path,
    ['messages']: val.messages.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShuttleMappingErrorV2026R0Input(
  val: SerializedData
): ShuttleMappingErrorV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleMappingErrorV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleMappingErrorV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleMappingErrorV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (val.revision == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "revision" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const revision: number = val.revision;
  if (val.category == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "category" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.category)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "category" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const category: string = val.category;
  if (val.path == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.path)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "path" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const path: string = val.path;
  if (val.messages == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "messages" of type "ShuttleMappingErrorV2026R0Input" to be defined',
    });
  }
  if (!sdIsList(val.messages)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "messages" of type "ShuttleMappingErrorV2026R0Input"',
    });
  }
  const messages: readonly string[] = sdIsList(val.messages)
    ? (val.messages.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShuttleMappingErrorV2026R0Input"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    id: id,
    type: type,
    jobId: jobId,
    revision: revision,
    category: category,
    path: path,
    messages: messages,
  } satisfies ShuttleMappingErrorV2026R0Input;
}
