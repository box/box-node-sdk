import { serializeShuttleTargetSubjectInputV2026R0 } from './shuttleTargetSubjectInputV2026R0';
import { deserializeShuttleTargetSubjectInputV2026R0 } from './shuttleTargetSubjectInputV2026R0';
import { ShuttleTargetSubjectInputV2026R0 } from './shuttleTargetSubjectInputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttleSubjectMappingCreateRequestV2026R0 {
  /**
   * The unique identifier of the shuttle job this mapping belongs to. */
  readonly jobId: string;
  /**
   * The unique identifier of the discovered subject to map. */
  readonly discoveredSubjectId: string;
  /**
   * The discovery-requirements revision to resolve against. Omit to use the
   * latest revision. */
  readonly revision?: number;
  /**
   * Whether this subject should be skipped during the migration. Defaults
   * to `false`. */
  readonly isSubjectSkipped?: boolean;
  /**
   * The Box target to map to. Omit or set to `null` when the subject is
   * skipped. */
  readonly target?: ShuttleTargetSubjectInputV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSubjectMappingCreateRequestV2026R0(
  val: ShuttleSubjectMappingCreateRequestV2026R0,
): SerializedData {
  return {
    ['job_id']: val.jobId,
    ['discovered_subject_id']: val.discoveredSubjectId,
    ['revision']: val.revision,
    ['is_subject_skipped']: val.isSubjectSkipped,
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttleTargetSubjectInputV2026R0(val.target),
  };
}
export function deserializeShuttleSubjectMappingCreateRequestV2026R0(
  val: SerializedData,
): ShuttleSubjectMappingCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleSubjectMappingCreateRequestV2026R0"',
    });
  }
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleSubjectMappingCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleSubjectMappingCreateRequestV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.discovered_subject_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "discovered_subject_id" of type "ShuttleSubjectMappingCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.discovered_subject_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "discovered_subject_id" of type "ShuttleSubjectMappingCreateRequestV2026R0"',
    });
  }
  const discoveredSubjectId: string = val.discovered_subject_id;
  if (!(val.revision == void 0) && !sdIsNumber(val.revision)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "revision" of type "ShuttleSubjectMappingCreateRequestV2026R0"',
    });
  }
  const revision: undefined | number =
    val.revision == void 0 ? void 0 : val.revision;
  if (
    !(val.is_subject_skipped == void 0) &&
    !sdIsBoolean(val.is_subject_skipped)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_subject_skipped" of type "ShuttleSubjectMappingCreateRequestV2026R0"',
    });
  }
  const isSubjectSkipped: undefined | boolean =
    val.is_subject_skipped == void 0 ? void 0 : val.is_subject_skipped;
  const target: ShuttleTargetSubjectInputV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectInputV2026R0(val.target);
  return {
    jobId: jobId,
    discoveredSubjectId: discoveredSubjectId,
    revision: revision,
    isSubjectSkipped: isSubjectSkipped,
    target: target,
  } satisfies ShuttleSubjectMappingCreateRequestV2026R0;
}
