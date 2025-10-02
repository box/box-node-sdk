import { serializeIntegrationMappingTeams } from './integrationMappingTeams';
import { deserializeIntegrationMappingTeams } from './integrationMappingTeams';
import { IntegrationMappingTeams } from './integrationMappingTeams';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface IntegrationMappingsTeams {
  /**
   * A list of integration mappings. */
  readonly entries?: readonly IntegrationMappingTeams[];
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingsTeams(
  val: IntegrationMappingsTeams,
): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: IntegrationMappingTeams,
          ): SerializedData {
            return serializeIntegrationMappingTeams(item);
          }) as readonly any[]),
  };
}
export function deserializeIntegrationMappingsTeams(
  val: SerializedData,
): IntegrationMappingsTeams {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingsTeams"',
    });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "IntegrationMappingsTeams"',
    });
  }
  const entries: undefined | readonly IntegrationMappingTeams[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): IntegrationMappingTeams {
            return deserializeIntegrationMappingTeams(itm);
          }) as readonly any[])
        : [];
  return { entries: entries } satisfies IntegrationMappingsTeams;
}
