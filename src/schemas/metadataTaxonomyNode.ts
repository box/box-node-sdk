import { serializeMetadataTaxonomyAncestor } from './metadataTaxonomyAncestor';
import { deserializeMetadataTaxonomyAncestor } from './metadataTaxonomyAncestor';
import { MetadataTaxonomyAncestor } from './metadataTaxonomyAncestor';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface MetadataTaxonomyNode {
  /**
   * A unique identifier of the metadata taxonomy node. */
  readonly id: string;
  /**
   * The display name of the metadata taxonomy node. */
  readonly displayName: string;
  /**
   * An index of the level to which the node belongs. */
  readonly level: number;
  /**
   * The identifier of the parent node. */
  readonly parentId?: string;
  /**
   * An array of identifiers for all ancestor nodes.
   * Not returned for root-level nodes. */
  readonly nodePath?: readonly string[];
  /**
   * An array of objects for all ancestor nodes.
   * Not returned for root-level nodes. */
  readonly ancestors?: readonly MetadataTaxonomyAncestor[];
  readonly rawData?: SerializedData;
}
export function serializeMetadataTaxonomyNode(
  val: MetadataTaxonomyNode,
): SerializedData {
  return {
    ['id']: val.id,
    ['displayName']: val.displayName,
    ['level']: val.level,
    ['parentId']: val.parentId,
    ['nodePath']:
      val.nodePath == void 0
        ? val.nodePath
        : (val.nodePath.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['ancestors']:
      val.ancestors == void 0
        ? val.ancestors
        : (val.ancestors.map(function (
            item: MetadataTaxonomyAncestor,
          ): SerializedData {
            return serializeMetadataTaxonomyAncestor(item);
          }) as readonly any[]),
  };
}
export function deserializeMetadataTaxonomyNode(
  val: SerializedData,
): MetadataTaxonomyNode {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataTaxonomyNode"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "MetadataTaxonomyNode" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "MetadataTaxonomyNode"',
    });
  }
  const id: string = val.id;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "MetadataTaxonomyNode" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "MetadataTaxonomyNode"',
    });
  }
  const displayName: string = val.displayName;
  if (val.level == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "level" of type "MetadataTaxonomyNode" to be defined',
    });
  }
  if (!sdIsNumber(val.level)) {
    throw new BoxSdkError({
      message: 'Expecting number for "level" of type "MetadataTaxonomyNode"',
    });
  }
  const level: number = val.level;
  if (!(val.parentId == void 0) && !sdIsString(val.parentId)) {
    throw new BoxSdkError({
      message: 'Expecting string for "parentId" of type "MetadataTaxonomyNode"',
    });
  }
  const parentId: undefined | string =
    val.parentId == void 0 ? void 0 : val.parentId;
  if (!(val.nodePath == void 0) && !sdIsList(val.nodePath)) {
    throw new BoxSdkError({
      message: 'Expecting array for "nodePath" of type "MetadataTaxonomyNode"',
    });
  }
  const nodePath: undefined | readonly string[] =
    val.nodePath == void 0
      ? void 0
      : sdIsList(val.nodePath)
        ? (val.nodePath.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "MetadataTaxonomyNode"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.ancestors == void 0) && !sdIsList(val.ancestors)) {
    throw new BoxSdkError({
      message: 'Expecting array for "ancestors" of type "MetadataTaxonomyNode"',
    });
  }
  const ancestors: undefined | readonly MetadataTaxonomyAncestor[] =
    val.ancestors == void 0
      ? void 0
      : sdIsList(val.ancestors)
        ? (val.ancestors.map(function (
            itm: SerializedData,
          ): MetadataTaxonomyAncestor {
            return deserializeMetadataTaxonomyAncestor(itm);
          }) as readonly any[])
        : [];
  return {
    id: id,
    displayName: displayName,
    level: level,
    parentId: parentId,
    nodePath: nodePath,
    ancestors: ancestors,
  } satisfies MetadataTaxonomyNode;
}
