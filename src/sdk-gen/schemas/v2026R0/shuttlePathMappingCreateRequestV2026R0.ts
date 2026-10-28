import { serializeShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { deserializeShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { serializeShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { deserializeShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { serializeShuttlePathMappingLocationInputV2026R0 } from './shuttlePathMappingLocationInputV2026R0';
import { deserializeShuttlePathMappingLocationInputV2026R0 } from './shuttlePathMappingLocationInputV2026R0';
import { serializeShuttlePathMappingTargetLocationInputV2026R0 } from './shuttlePathMappingTargetLocationInputV2026R0';
import { deserializeShuttlePathMappingTargetLocationInputV2026R0 } from './shuttlePathMappingTargetLocationInputV2026R0';
import { ShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { ShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { ShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { ShuttlePathMappingLocationInputV2026R0 } from './shuttlePathMappingLocationInputV2026R0';
import { ShuttlePathMappingTargetLocationInputV2026R0 } from './shuttlePathMappingTargetLocationInputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttlePathMappingCreateRequestV2026R0 {
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId: string;
  /**
   * Whether this source path should be skipped during the migration.
   * Defaults to `false`. */
  readonly isPathSkipped?: boolean;
  readonly source: ShuttlePathMappingLocationInputV2026R0;
  /**
   * The destination location to migrate to. Omit or set to `null` when the
   * source path is skipped. */
  readonly target?: ShuttlePathMappingTargetLocationInputV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingCreateRequestV2026R0(
  val: ShuttlePathMappingCreateRequestV2026R0
): SerializedData {
  return {
    ['job_id']: val.jobId,
    ['is_path_skipped']: val.isPathSkipped,
    ['source']: serializeShuttlePathMappingLocationInputV2026R0(val.source),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttlePathMappingTargetLocationInputV2026R0(val.target),
  };
}
export function deserializeShuttlePathMappingCreateRequestV2026R0(
  val: SerializedData
): ShuttlePathMappingCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingCreateRequestV2026R0"',
    });
  }
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttlePathMappingCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttlePathMappingCreateRequestV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (!(val.is_path_skipped == void 0) && !sdIsBoolean(val.is_path_skipped)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_path_skipped" of type "ShuttlePathMappingCreateRequestV2026R0"',
    });
  }
  const isPathSkipped: undefined | boolean =
    val.is_path_skipped == void 0 ? void 0 : val.is_path_skipped;
  if (val.source == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "source" of type "ShuttlePathMappingCreateRequestV2026R0" to be defined',
    });
  }
  const source: ShuttlePathMappingLocationInputV2026R0 =
    deserializeShuttlePathMappingLocationInputV2026R0(val.source);
  const target: ShuttlePathMappingTargetLocationInputV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttlePathMappingTargetLocationInputV2026R0(val.target);
  return {
    jobId: jobId,
    isPathSkipped: isPathSkipped,
    source: source,
    target: target,
  } satisfies ShuttlePathMappingCreateRequestV2026R0;
}
