import { serializeUploadPartPlanHit } from './uploadPartPlanHit';
import { deserializeUploadPartPlanHit } from './uploadPartPlanHit';
import { serializeUploadPartPlan } from './uploadPartPlan';
import { deserializeUploadPartPlan } from './uploadPartPlan';
import { UploadPartPlanHit } from './uploadPartPlanHit';
import { UploadPartPlan } from './uploadPartPlan';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface UploadSessionPlanResponse {
  /**
   * The unique identifier for this upload session. */
  readonly uploadSessionId: string;
  /**
   * Parts that already exist on the server and
   * do not need to be uploaded again. */
  readonly hits: readonly UploadPartPlanHit[];
  /**
   * Parts that do not exist on the server and
   * need to be uploaded. */
  readonly misses: readonly UploadPartPlan[];
  readonly rawData?: SerializedData;
}
export function serializeUploadSessionPlanResponse(
  val: UploadSessionPlanResponse,
): SerializedData {
  return {
    ['upload_session_id']: val.uploadSessionId,
    ['hits']: val.hits.map(function (item: UploadPartPlanHit): SerializedData {
      return serializeUploadPartPlanHit(item);
    }) as readonly any[],
    ['misses']: val.misses.map(function (item: UploadPartPlan): SerializedData {
      return serializeUploadPartPlan(item);
    }) as readonly any[],
  };
}
export function deserializeUploadSessionPlanResponse(
  val: SerializedData,
): UploadSessionPlanResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UploadSessionPlanResponse"',
    });
  }
  if (val.upload_session_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "upload_session_id" of type "UploadSessionPlanResponse" to be defined',
    });
  }
  if (!sdIsString(val.upload_session_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "upload_session_id" of type "UploadSessionPlanResponse"',
    });
  }
  const uploadSessionId: string = val.upload_session_id;
  if (val.hits == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "hits" of type "UploadSessionPlanResponse" to be defined',
    });
  }
  if (!sdIsList(val.hits)) {
    throw new BoxSdkError({
      message: 'Expecting array for "hits" of type "UploadSessionPlanResponse"',
    });
  }
  const hits: readonly UploadPartPlanHit[] = sdIsList(val.hits)
    ? (val.hits.map(function (itm: SerializedData): UploadPartPlanHit {
        return deserializeUploadPartPlanHit(itm);
      }) as readonly any[])
    : [];
  if (val.misses == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "misses" of type "UploadSessionPlanResponse" to be defined',
    });
  }
  if (!sdIsList(val.misses)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "misses" of type "UploadSessionPlanResponse"',
    });
  }
  const misses: readonly UploadPartPlan[] = sdIsList(val.misses)
    ? (val.misses.map(function (itm: SerializedData): UploadPartPlan {
        return deserializeUploadPartPlan(itm);
      }) as readonly any[])
    : [];
  return {
    uploadSessionId: uploadSessionId,
    hits: hits,
    misses: misses,
  } satisfies UploadSessionPlanResponse;
}
