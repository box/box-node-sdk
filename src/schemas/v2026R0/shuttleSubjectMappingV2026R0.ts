import { serializeShuttleSubjectV2026R0 } from './shuttleSubjectV2026R0';
import { deserializeShuttleSubjectV2026R0 } from './shuttleSubjectV2026R0';
import { serializeShuttleTargetSubjectV2026R0 } from './shuttleTargetSubjectV2026R0';
import { deserializeShuttleTargetSubjectV2026R0 } from './shuttleTargetSubjectV2026R0';
import { ShuttleSubjectV2026R0 } from './shuttleSubjectV2026R0';
import { ShuttleTargetSubjectV2026R0 } from './shuttleTargetSubjectV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleSubjectMappingV2026R0TypeField = 'shuttle_subject_mapping';
export class ShuttleSubjectMappingV2026R0 {
  /**
   * The unique identifier for the shuttle subject mapping. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_subject_mapping`. */
  readonly type: ShuttleSubjectMappingV2026R0TypeField =
    'shuttle_subject_mapping' as ShuttleSubjectMappingV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId!: string;
  /**
   * The unique identifier of the discovered subject this mapping applies to.
   * `null` for legacy mappings created before this field was tracked. */
  readonly discoveredSubjectId?: string | null;
  /**
   * The discovery-requirements revision this mapping was resolved against.
   * `null` for legacy mappings. */
  readonly revision?: number | null;
  /**
   * Whether this subject is skipped during the migration. */
  readonly isSubjectSkipped!: boolean;
  readonly source!: ShuttleSubjectV2026R0;
  /**
   * The Box target subject. `null` when the subject is skipped or not yet
   * assigned. */
  readonly target?: ShuttleTargetSubjectV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleSubjectMappingV2026R0, 'type'> &
      Partial<Pick<ShuttleSubjectMappingV2026R0, 'type'>>,
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
    if (fields.discoveredSubjectId !== undefined) {
      this.discoveredSubjectId = fields.discoveredSubjectId;
    }
    if (fields.revision !== undefined) {
      this.revision = fields.revision;
    }
    if (fields.isSubjectSkipped !== undefined) {
      this.isSubjectSkipped = fields.isSubjectSkipped;
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
export interface ShuttleSubjectMappingV2026R0Input {
  /**
   * The unique identifier for the shuttle subject mapping. */
  readonly id: string;
  /**
   * The value will always be `shuttle_subject_mapping`. */
  readonly type?: ShuttleSubjectMappingV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId: string;
  /**
   * The unique identifier of the discovered subject this mapping applies to.
   * `null` for legacy mappings created before this field was tracked. */
  readonly discoveredSubjectId?: string | null;
  /**
   * The discovery-requirements revision this mapping was resolved against.
   * `null` for legacy mappings. */
  readonly revision?: number | null;
  /**
   * Whether this subject is skipped during the migration. */
  readonly isSubjectSkipped: boolean;
  readonly source: ShuttleSubjectV2026R0;
  /**
   * The Box target subject. `null` when the subject is skipped or not yet
   * assigned. */
  readonly target?: ShuttleTargetSubjectV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSubjectMappingV2026R0TypeField(
  val: ShuttleSubjectMappingV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleSubjectMappingV2026R0TypeField(
  val: SerializedData,
): ShuttleSubjectMappingV2026R0TypeField {
  if (val == 'shuttle_subject_mapping') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleSubjectMappingV2026R0TypeField",
  });
}
export function serializeShuttleSubjectMappingV2026R0(
  val: ShuttleSubjectMappingV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleSubjectMappingV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['discovered_subject_id']: val.discoveredSubjectId,
    ['revision']: val.revision,
    ['is_subject_skipped']: val.isSubjectSkipped,
    ['source']: serializeShuttleSubjectV2026R0(val.source),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttleTargetSubjectV2026R0(val.target),
  };
}
export function deserializeShuttleSubjectMappingV2026R0(
  val: SerializedData,
): ShuttleSubjectMappingV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSubjectMappingV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleSubjectMappingV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleSubjectMappingV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleSubjectMappingV2026R0" to be defined',
    });
  }
  const type: ShuttleSubjectMappingV2026R0TypeField =
    deserializeShuttleSubjectMappingV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleSubjectMappingV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleSubjectMappingV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (
    !(val.discovered_subject_id == void 0) &&
    !sdIsString(val.discovered_subject_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "discovered_subject_id" of type "ShuttleSubjectMappingV2026R0"',
    });
  }
  const discoveredSubjectId: undefined | string =
    val.discovered_subject_id == void 0 ? void 0 : val.discovered_subject_id;
  if (!(val.revision == void 0) && !sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleSubjectMappingV2026R0"',
    });
  }
  const revision: undefined | number =
    val.revision == void 0 ? void 0 : val.revision;
  if (val.is_subject_skipped == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_subject_skipped" of type "ShuttleSubjectMappingV2026R0" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_subject_skipped)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_subject_skipped" of type "ShuttleSubjectMappingV2026R0"',
    });
  }
  const isSubjectSkipped: boolean = val.is_subject_skipped;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttleSubjectMappingV2026R0" to be defined',
    });
  }
  const source: ShuttleSubjectV2026R0 = deserializeShuttleSubjectV2026R0(
    val.source,
  );
  const target: ShuttleTargetSubjectV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectV2026R0(val.target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    discoveredSubjectId: discoveredSubjectId,
    revision: revision,
    isSubjectSkipped: isSubjectSkipped,
    source: source,
    target: target,
  } satisfies ShuttleSubjectMappingV2026R0;
}
export function serializeShuttleSubjectMappingV2026R0Input(
  val: ShuttleSubjectMappingV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleSubjectMappingV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['discovered_subject_id']: val.discoveredSubjectId,
    ['revision']: val.revision,
    ['is_subject_skipped']: val.isSubjectSkipped,
    ['source']: serializeShuttleSubjectV2026R0(val.source),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttleTargetSubjectV2026R0(val.target),
  };
}
export function deserializeShuttleSubjectMappingV2026R0Input(
  val: SerializedData,
): ShuttleSubjectMappingV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleSubjectMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleSubjectMappingV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleSubjectMappingV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleSubjectMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (
    !(val.discovered_subject_id == void 0) &&
    !sdIsString(val.discovered_subject_id)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "discovered_subject_id" of type "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  const discoveredSubjectId: undefined | string =
    val.discovered_subject_id == void 0 ? void 0 : val.discovered_subject_id;
  if (!(val.revision == void 0) && !sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  const revision: undefined | number =
    val.revision == void 0 ? void 0 : val.revision;
  if (val.is_subject_skipped == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_subject_skipped" of type "ShuttleSubjectMappingV2026R0Input" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_subject_skipped)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_subject_skipped" of type "ShuttleSubjectMappingV2026R0Input"',
    });
  }
  const isSubjectSkipped: boolean = val.is_subject_skipped;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttleSubjectMappingV2026R0Input" to be defined',
    });
  }
  const source: ShuttleSubjectV2026R0 = deserializeShuttleSubjectV2026R0(
    val.source,
  );
  const target: ShuttleTargetSubjectV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectV2026R0(val.target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    discoveredSubjectId: discoveredSubjectId,
    revision: revision,
    isSubjectSkipped: isSubjectSkipped,
    source: source,
    target: target,
  } satisfies ShuttleSubjectMappingV2026R0Input;
}
