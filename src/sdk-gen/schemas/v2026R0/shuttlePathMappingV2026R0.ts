import { serializeShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { deserializeShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { serializeShuttlePathMappingLocationV2026R0 } from './shuttlePathMappingLocationV2026R0';
import { deserializeShuttlePathMappingLocationV2026R0 } from './shuttlePathMappingLocationV2026R0';
import { ShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { ShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { ShuttlePathMappingLocationV2026R0 } from './shuttlePathMappingLocationV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingV2026R0TypeField = 'shuttle_path_mapping';
export class ShuttlePathMappingV2026R0 {
  /**
   * The unique identifier for the shuttle path mapping. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_path_mapping`. */
  readonly type: ShuttlePathMappingV2026R0TypeField =
    'shuttle_path_mapping' as ShuttlePathMappingV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId!: string;
  /**
   * Whether this source path is skipped during the migration. */
  readonly isPathSkipped!: boolean;
  readonly source!: ShuttlePathMappingLocationV2026R0;
  /**
   * The destination location. `null` when the source path is skipped or
   * the job has no destination, such as an analysis job. */
  readonly target?: ShuttlePathMappingLocationV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttlePathMappingV2026R0, 'type'> &
      Partial<Pick<ShuttlePathMappingV2026R0, 'type'>>
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
    if (fields.isPathSkipped !== undefined) {
      this.isPathSkipped = fields.isPathSkipped;
    }
    if (fields.source !== undefined) {
      this.source = fields.source;
    }
    if (fields.target !== undefined) {
      this.target = fields.target;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttlePathMappingV2026R0Input {
  /**
   * The unique identifier for the shuttle path mapping. */
  readonly id: string;
  /**
   * The value will always be `shuttle_path_mapping`. */
  readonly type?: ShuttlePathMappingV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId: string;
  /**
   * Whether this source path is skipped during the migration. */
  readonly isPathSkipped: boolean;
  readonly source: ShuttlePathMappingLocationV2026R0;
  /**
   * The destination location. `null` when the source path is skipped or
   * the job has no destination, such as an analysis job. */
  readonly target?: ShuttlePathMappingLocationV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingV2026R0TypeField(
  val: ShuttlePathMappingV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttlePathMappingV2026R0TypeField(
  val: SerializedData
): ShuttlePathMappingV2026R0TypeField {
  if (val == 'shuttle_path_mapping') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathMappingV2026R0TypeField",
  });
}
export function serializeShuttlePathMappingV2026R0(
  val: ShuttlePathMappingV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttlePathMappingV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['is_path_skipped']: val.isPathSkipped,
    ['source']: serializeShuttlePathMappingLocationV2026R0(val.source),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttlePathMappingLocationV2026R0(val.target),
  };
}
export function deserializeShuttlePathMappingV2026R0(
  val: SerializedData
): ShuttlePathMappingV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttlePathMappingV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttlePathMappingV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttlePathMappingV2026R0" to be defined',
    });
  }
  const type: ShuttlePathMappingV2026R0TypeField =
    deserializeShuttlePathMappingV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttlePathMappingV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttlePathMappingV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.is_path_skipped == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_path_skipped" of type "ShuttlePathMappingV2026R0" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_path_skipped)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_path_skipped" of type "ShuttlePathMappingV2026R0"',
    });
  }
  const isPathSkipped: boolean = val.is_path_skipped;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttlePathMappingV2026R0" to be defined',
    });
  }
  const source: ShuttlePathMappingLocationV2026R0 =
    deserializeShuttlePathMappingLocationV2026R0(val.source);
  const target: ShuttlePathMappingLocationV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttlePathMappingLocationV2026R0(val.target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    isPathSkipped: isPathSkipped,
    source: source,
    target: target,
  } satisfies ShuttlePathMappingV2026R0;
}
export function serializeShuttlePathMappingV2026R0Input(
  val: ShuttlePathMappingV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttlePathMappingV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['is_path_skipped']: val.isPathSkipped,
    ['source']: serializeShuttlePathMappingLocationV2026R0(val.source),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttlePathMappingLocationV2026R0(val.target),
  };
}
export function deserializeShuttlePathMappingV2026R0Input(
  val: SerializedData
): ShuttlePathMappingV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttlePathMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathMappingV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttlePathMappingV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttlePathMappingV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttlePathMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttlePathMappingV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (val.is_path_skipped == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_path_skipped" of type "ShuttlePathMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_path_skipped)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_path_skipped" of type "ShuttlePathMappingV2026R0Input"',
    });
  }
  const isPathSkipped: boolean = val.is_path_skipped;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttlePathMappingV2026R0Input" to be defined',
    });
  }
  const source: ShuttlePathMappingLocationV2026R0 =
    deserializeShuttlePathMappingLocationV2026R0(val.source);
  const target: ShuttlePathMappingLocationV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttlePathMappingLocationV2026R0(val.target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    isPathSkipped: isPathSkipped,
    source: source,
    target: target,
  } satisfies ShuttlePathMappingV2026R0Input;
}
