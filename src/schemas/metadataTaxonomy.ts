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
export interface MetadataTaxonomy {
  /**
   * A unique identifier of the metadata taxonomy. */
  readonly id: string;
  /**
   * A unique identifier of the metadata taxonomy. The identifier must be unique within
   * the namespace to which it belongs. */
  readonly key?: string;
  /**
   * The display name of the metadata taxonomy. This can be seen in the Box web app. */
  readonly displayName: string;
  /**
   * A namespace that the metadata taxonomy is associated with. */
  readonly namespace: string;
  /**
   * Levels of the metadata taxonomy. */
  readonly levels?: readonly MetadataTaxonomyLevel[];
  readonly rawData?: SerializedData;
}
export function serializeMetadataTaxonomy(
  val: MetadataTaxonomy,
): SerializedData {
  return {
    ['id']: val.id,
    ['key']: val.key,
    ['displayName']: val.displayName,
    ['namespace']: val.namespace,
    ['levels']:
      val.levels == void 0
        ? val.levels
        : (val.levels.map(function (
            item: MetadataTaxonomyLevel,
          ): SerializedData {
            return serializeMetadataTaxonomyLevel(item);
          }) as readonly any[]),
  };
}
export function deserializeMetadataTaxonomy(
  val: SerializedData,
): MetadataTaxonomy {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTaxonomy"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "MetadataTaxonomy" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataTaxonomy"',
    });
  }
  const id: string = val.id;
  if (!(val.key == void 0) && !sdIsString(val.key)) {
    throw new BoxSdkError({
      message: 'Expecting string for "key" of type "MetadataTaxonomy"',
    });
  }
  const key: undefined | string = val.key == void 0 ? void 0 : val.key;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "MetadataTaxonomy" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message: 'Expecting string for "displayName" of type "MetadataTaxonomy"',
    });
  }
  const displayName: string = val.displayName;
  if (val.namespace == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "namespace" of type "MetadataTaxonomy" to be defined',
    });
  }
  if (!sdIsString(val.namespace)) {
    throw new BoxSdkError({
      message: 'Expecting string for "namespace" of type "MetadataTaxonomy"',
    });
  }
  const namespace: string = val.namespace;
  if (!(val.levels == void 0) && !sdIsList(val.levels)) {
    throw new BoxSdkError({
      message: 'Expecting array for "levels" of type "MetadataTaxonomy"',
    });
  }
  const levels: undefined | readonly MetadataTaxonomyLevel[] =
    val.levels == void 0
      ? void 0
      : sdIsList(val.levels)
        ? (val.levels.map(function (
            itm: SerializedData,
          ): MetadataTaxonomyLevel {
            return deserializeMetadataTaxonomyLevel(itm);
          }) as readonly any[])
        : [];
  return {
    id: id,
    key: key,
    displayName: displayName,
    namespace: namespace,
    levels: levels,
  } satisfies MetadataTaxonomy;
}
