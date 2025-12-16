import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface MetadataTaxonomyAncestor {
  /**
   * A unique identifier of the metadata taxonomy node. */
  readonly id?: string;
  /**
   * The display name of the metadata taxonomy node. */
  readonly displayName?: string;
  /**
   * An index of the level to which the node belongs. */
  readonly level?: number;
  readonly rawData?: SerializedData;
}
export function serializeMetadataTaxonomyAncestor(
  val: MetadataTaxonomyAncestor,
): SerializedData {
  return {
    ['id']: val.id,
    ['displayName']: val.displayName,
    ['level']: val.level,
  };
}
export function deserializeMetadataTaxonomyAncestor(
  val: SerializedData,
): MetadataTaxonomyAncestor {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTaxonomyAncestor"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataTaxonomyAncestor"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "MetadataTaxonomyAncestor"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  if (!(val.level == void 0) && !sdIsNumber(val.level)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "level" of type "MetadataTaxonomyAncestor"',
    });
  }
  const level: undefined | number = val.level == void 0 ? void 0 : val.level;
  return {
    id: id,
    displayName: displayName,
    level: level,
  } satisfies MetadataTaxonomyAncestor;
}
