import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface MetadataTaxonomyLevel {
  /**
   * The display name of the level as it is shown to the user. */
  readonly displayName?: string;
  /**
   * A description of the level. */
  readonly description?: string;
  /**
   * An index of the level within the taxonomy. Levels are indexed starting from 1. */
  readonly level?: number;
  readonly rawData?: SerializedData;
}
export function serializeMetadataTaxonomyLevel(
  val: MetadataTaxonomyLevel,
): SerializedData {
  return {
    ['displayName']: val.displayName,
    ['description']: val.description,
    ['level']: val.level,
  };
}
export function deserializeMetadataTaxonomyLevel(
  val: SerializedData,
): MetadataTaxonomyLevel {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTaxonomyLevel"',
    });
  }
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "MetadataTaxonomyLevel"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "MetadataTaxonomyLevel"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.level == void 0) && !sdIsNumber(val.level)) {
    throw new BoxSdkError({
      message: 'Expecting number for "level" of type "MetadataTaxonomyLevel"',
    });
  }
  const level: undefined | number = val.level == void 0 ? void 0 : val.level;
  return {
    displayName: displayName,
    description: description,
    level: level,
  } satisfies MetadataTaxonomyLevel;
}
