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
export interface ShuttleSubjectMappingUpdateRequestV2026R0 {
  /**
   * Whether this subject should be skipped during the migration. */
  readonly isSubjectSkipped?: boolean;
  /**
   * The Box target to map to. Set to `null` only for a skipped subject.
   * Setting it to `null` while the mapping is active fails validation.
   * Updating `is_subject_skipped` alone preserves the existing target. */
  readonly target?: ShuttleTargetSubjectInputV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSubjectMappingUpdateRequestV2026R0(
  val: ShuttleSubjectMappingUpdateRequestV2026R0,
): SerializedData {
  return {
    ['is_subject_skipped']: val.isSubjectSkipped,
    ['target']:
      val.target == void 0
        ? val.target
        : serializeShuttleTargetSubjectInputV2026R0(val.target),
  };
}
export function deserializeShuttleSubjectMappingUpdateRequestV2026R0(
  val: SerializedData,
): ShuttleSubjectMappingUpdateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleSubjectMappingUpdateRequestV2026R0"',
    });
  }
  if (
    !(val.is_subject_skipped == void 0) &&
    !sdIsBoolean(val.is_subject_skipped)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_subject_skipped" of type "ShuttleSubjectMappingUpdateRequestV2026R0"',
    });
  }
  const isSubjectSkipped: undefined | boolean =
    val.is_subject_skipped == void 0 ? void 0 : val.is_subject_skipped;
  const target: ShuttleTargetSubjectInputV2026R0 | undefined =
    val.target == void 0
      ? void 0
      : deserializeShuttleTargetSubjectInputV2026R0(val.target);
  return {
    isSubjectSkipped: isSubjectSkipped,
    target: target,
  } satisfies ShuttleSubjectMappingUpdateRequestV2026R0;
}
