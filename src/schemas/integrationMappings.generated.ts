import { serializeIntegrationMapping } from './integrationMapping.generated.js';
import { deserializeIntegrationMapping } from './integrationMapping.generated.js';
import { IntegrationMapping } from './integrationMapping.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface IntegrationMappings {
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * A list of integration mappings. */
  readonly entries?: readonly IntegrationMapping[];
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappings(
  val: IntegrationMappings,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: IntegrationMapping): SerializedData {
            return serializeIntegrationMapping(item);
          }) as readonly any[]),
  };
}
export function deserializeIntegrationMappings(
  val: SerializedData,
): IntegrationMappings {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappings"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "IntegrationMappings"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "IntegrationMappings"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "IntegrationMappings"',
    });
  }
  const entries: undefined | readonly IntegrationMapping[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): IntegrationMapping {
            return deserializeIntegrationMapping(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    entries: entries,
  } satisfies IntegrationMappings;
}
