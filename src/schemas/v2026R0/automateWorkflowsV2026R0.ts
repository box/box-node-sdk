import { serializeAutomateWorkflowActionV2026R0 } from './automateWorkflowActionV2026R0';
import { deserializeAutomateWorkflowActionV2026R0 } from './automateWorkflowActionV2026R0';
import { AutomateWorkflowActionV2026R0 } from './automateWorkflowActionV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface AutomateWorkflowsV2026R0 {
  /**
   * Workflow actions available for manual start. */
  readonly entries?: readonly AutomateWorkflowActionV2026R0[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeAutomateWorkflowsV2026R0(
  val: AutomateWorkflowsV2026R0,
): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: AutomateWorkflowActionV2026R0,
          ): SerializedData {
            return serializeAutomateWorkflowActionV2026R0(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeAutomateWorkflowsV2026R0(
  val: SerializedData,
): AutomateWorkflowsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowsV2026R0"',
    });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "AutomateWorkflowsV2026R0"',
    });
  }
  const entries: undefined | readonly AutomateWorkflowActionV2026R0[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): AutomateWorkflowActionV2026R0 {
            return deserializeAutomateWorkflowActionV2026R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "AutomateWorkflowsV2026R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "AutomateWorkflowsV2026R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies AutomateWorkflowsV2026R0;
}
