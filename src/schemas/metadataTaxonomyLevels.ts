import { serializeMetadataTaxonomyLevel } from './metadataTaxonomyLevel';
import { deserializeMetadataTaxonomyLevel } from './metadataTaxonomyLevel';
import { MetadataTaxonomyLevel } from './metadataTaxonomyLevel';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface MetadataTaxonomyLevels {
  /**
   * An array of all taxonomy levels. */
  readonly entries?: readonly MetadataTaxonomyLevel[];
  readonly rawData?: SerializedData;
}
export function serializeMetadataTaxonomyLevels(
  val: MetadataTaxonomyLevels,
): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: MetadataTaxonomyLevel,
          ): SerializedData {
            return serializeMetadataTaxonomyLevel(item);
          }) as readonly any[]),
  };
}
export function deserializeMetadataTaxonomyLevels(
  val: SerializedData,
): MetadataTaxonomyLevels {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTaxonomyLevels"',
    });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "MetadataTaxonomyLevels"',
    });
  }
  const entries: undefined | readonly MetadataTaxonomyLevel[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): MetadataTaxonomyLevel {
            return deserializeMetadataTaxonomyLevel(itm);
          }) as readonly any[])
        : [];
  return { entries: entries } satisfies MetadataTaxonomyLevels;
}
