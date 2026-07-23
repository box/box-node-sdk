import { serializeQueryInsightEntryV2026R0 } from './queryInsightEntryV2026R0';
import { deserializeQueryInsightEntryV2026R0 } from './queryInsightEntryV2026R0';
import { QueryInsightEntryV2026R0 } from './queryInsightEntryV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryInsightsV2026R0 {
  /**
   * The list of computed insight entries. Each entry corresponds to a group,
   * the overall dataset, or the aggregate of groups outside the top results. */
  readonly insights: readonly QueryInsightEntryV2026R0[];
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightsV2026R0(
  val: QueryInsightsV2026R0
): SerializedData {
  return {
    ['insights']: val.insights.map(function (
      item: QueryInsightEntryV2026R0
    ): SerializedData {
      return serializeQueryInsightEntryV2026R0(item);
    }) as readonly any[],
  };
}
export function deserializeQueryInsightsV2026R0(
  val: SerializedData
): QueryInsightsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightsV2026R0"',
    });
  }
  if (val.insights == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "insights" of type "QueryInsightsV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.insights)) {
    throw new BoxSdkError({
      message: 'Expecting array for "insights" of type "QueryInsightsV2026R0"',
    });
  }
  const insights: readonly QueryInsightEntryV2026R0[] = sdIsList(val.insights)
    ? (val.insights.map(function (
        itm: SerializedData
      ): QueryInsightEntryV2026R0 {
        return deserializeQueryInsightEntryV2026R0(itm);
      }) as readonly any[])
    : [];
  return { insights: insights } satisfies QueryInsightsV2026R0;
}
