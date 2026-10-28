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
export type ShuttleDiscoveredSubjectV2026R0TypeField =
  'shuttle_discovered_subject';
export class ShuttleDiscoveredSubjectV2026R0 {
  /**
   * The unique identifier for the discovered subject. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_discovered_subject`. */
  readonly type: ShuttleDiscoveredSubjectV2026R0TypeField =
    'shuttle_discovered_subject' as ShuttleDiscoveredSubjectV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this subject belongs to. */
  readonly jobId!: string;
  /**
   * The scan revision this discovered subject belongs to. */
  readonly revision!: number;
  readonly source!: ShuttleSubjectV2026R0;
  /**
   * A suggested Box target inferred during the scan. `null` when no
   * suggestion was made. */
  readonly suggestedTarget?: ShuttleTargetSubjectV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleDiscoveredSubjectV2026R0, 'type'> &
      Partial<Pick<ShuttleDiscoveredSubjectV2026R0, 'type'>>,
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
    if (fields.source !== undefined) {
      this.source = fields.source;
    }
    if (fields.suggestedTarget !== undefined) {
      this.suggestedTarget = fields.suggestedTarget;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleDiscoveredSubjectV2026R0Input {
  /**
   * The unique identifier for the discovered subject. */
  readonly id: string;
  /**
   * The value will always be `shuttle_discovered_subject`. */
  readonly type?: ShuttleDiscoveredSubjectV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this subject belongs to. */
  readonly jobId: string;
  /**
   * The scan revision this discovered subject belongs to. */
  readonly revision: number;
  readonly source: ShuttleSubjectV2026R0;
  /**
   * A suggested Box target inferred during the scan. `null` when no
   * suggestion was made. */
  readonly suggestedTarget?: ShuttleTargetSubjectV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleDiscoveredSubjectV2026R0TypeField(
  val: ShuttleDiscoveredSubjectV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleDiscoveredSubjectV2026R0TypeField(
  val: SerializedData,
): ShuttleDiscoveredSubjectV2026R0TypeField {
  if (val == 'shuttle_discovered_subject') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleDiscoveredSubjectV2026R0TypeField",
  });
}
export function serializeShuttleDiscoveredSubjectV2026R0(
  val: ShuttleDiscoveredSubjectV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleDiscoveredSubjectV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['revision']: val.revision,
    ['source']: serializeShuttleSubjectV2026R0(val.source),
    ['suggested_target']:
      val.suggestedTarget == void 0
        ? val.suggestedTarget
        : serializeShuttleTargetSubjectV2026R0(val.suggestedTarget),
  };
}
export function deserializeShuttleDiscoveredSubjectV2026R0(
  val: SerializedData,
): ShuttleDiscoveredSubjectV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleDiscoveredSubjectV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleDiscoveredSubjectV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleDiscoveredSubjectV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleDiscoveredSubjectV2026R0" to be defined',
    });
  }
  const type: ShuttleDiscoveredSubjectV2026R0TypeField =
    deserializeShuttleDiscoveredSubjectV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleDiscoveredSubjectV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleDiscoveredSubjectV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.revision == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "revision" of type "ShuttleDiscoveredSubjectV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleDiscoveredSubjectV2026R0"',
    });
  }
  const revision: number = val.revision;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttleDiscoveredSubjectV2026R0" to be defined',
    });
  }
  const source: ShuttleSubjectV2026R0 = deserializeShuttleSubjectV2026R0(
    val.source,
  );
  const suggestedTarget: ShuttleTargetSubjectV2026R0 | undefined =
    val.suggested_target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectV2026R0(val.suggested_target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    revision: revision,
    source: source,
    suggestedTarget: suggestedTarget,
  } satisfies ShuttleDiscoveredSubjectV2026R0;
}
export function serializeShuttleDiscoveredSubjectV2026R0Input(
  val: ShuttleDiscoveredSubjectV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleDiscoveredSubjectV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['revision']: val.revision,
    ['source']: serializeShuttleSubjectV2026R0(val.source),
    ['suggested_target']:
      val.suggestedTarget == void 0
        ? val.suggestedTarget
        : serializeShuttleTargetSubjectV2026R0(val.suggestedTarget),
  };
}
export function deserializeShuttleDiscoveredSubjectV2026R0Input(
  val: SerializedData,
): ShuttleDiscoveredSubjectV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleDiscoveredSubjectV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleDiscoveredSubjectV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleDiscoveredSubjectV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleDiscoveredSubjectV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleDiscoveredSubjectV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleDiscoveredSubjectV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleDiscoveredSubjectV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (val.revision == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "revision" of type "ShuttleDiscoveredSubjectV2026R0Input" to be defined',
    });
  }
  if (!sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleDiscoveredSubjectV2026R0Input"',
    });
  }
  const revision: number = val.revision;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttleDiscoveredSubjectV2026R0Input" to be defined',
    });
  }
  const source: ShuttleSubjectV2026R0 = deserializeShuttleSubjectV2026R0(
    val.source,
  );
  const suggestedTarget: ShuttleTargetSubjectV2026R0 | undefined =
    val.suggested_target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectV2026R0(val.suggested_target);
  return {
    id: id,
    type: type,
    jobId: jobId,
    revision: revision,
    source: source,
    suggestedTarget: suggestedTarget,
  } satisfies ShuttleDiscoveredSubjectV2026R0Input;
}
