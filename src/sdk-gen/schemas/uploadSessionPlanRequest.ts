import { serializeUploadPartPlan } from './uploadPartPlan';
import { deserializeUploadPartPlan } from './uploadPartPlan';
import { UploadPartPlan } from './uploadPartPlan';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadSessionPlanRequest {
  /**
   * The list of parts to check for existence. */
  readonly parts: readonly UploadPartPlan[];
  readonly rawData?: SerializedData;
}
export function serializeUploadSessionPlanRequest(
  val: UploadSessionPlanRequest
): SerializedData {
  return {
    ['parts']: val.parts.map(function (item: UploadPartPlan): SerializedData {
      return serializeUploadPartPlan(item);
    }) as readonly any[],
  };
}
export function deserializeUploadSessionPlanRequest(
  val: SerializedData
): UploadSessionPlanRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UploadSessionPlanRequest"',
    });
  }
  if (val.parts == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parts" of type "UploadSessionPlanRequest" to be defined',
    });
  }
  if (!sdIsList(val.parts)) {
    throw new BoxSdkError({
      message: 'Expecting array for "parts" of type "UploadSessionPlanRequest"',
    });
  }
  const parts: readonly UploadPartPlan[] = sdIsList(val.parts)
    ? (val.parts.map(function (itm: SerializedData): UploadPartPlan {
        return deserializeUploadPartPlan(itm);
      }) as readonly any[])
    : [];
  return { parts: parts } satisfies UploadSessionPlanRequest;
}
