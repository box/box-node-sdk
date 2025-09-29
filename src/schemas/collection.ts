import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type CollectionTypeField = 'collection';
export type CollectionNameField = 'Favorites' | string;
export type CollectionCollectionTypeField = 'favorites' | string;
export interface Collection {
  /**
   * The unique identifier for this collection. */
  readonly id?: string;
  /**
   * The value will always be `collection`. */
  readonly type?: CollectionTypeField;
  /**
   * The name of the collection. */
  readonly name?: CollectionNameField;
  /**
   * The type of the collection. This is used to
   * determine the proper visual treatment for
   * collections. */
  readonly collectionType?: CollectionCollectionTypeField;
  readonly rawData?: SerializedData;
}
export function serializeCollectionTypeField(
  val: CollectionTypeField,
): SerializedData {
  return val;
}
export function deserializeCollectionTypeField(
  val: SerializedData,
): CollectionTypeField {
  if (val == 'collection') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize CollectionTypeField" });
}
export function serializeCollectionNameField(
  val: CollectionNameField,
): SerializedData {
  return val;
}
export function deserializeCollectionNameField(
  val: SerializedData,
): CollectionNameField {
  if (val == 'Favorites') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize CollectionNameField" });
}
export function serializeCollectionCollectionTypeField(
  val: CollectionCollectionTypeField,
): SerializedData {
  return val;
}
export function deserializeCollectionCollectionTypeField(
  val: SerializedData,
): CollectionCollectionTypeField {
  if (val == 'favorites') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollectionCollectionTypeField",
  });
}
export function serializeCollection(val: Collection): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeCollectionTypeField(val.type),
    ['name']:
      val.name == void 0 ? val.name : serializeCollectionNameField(val.name),
    ['collection_type']:
      val.collectionType == void 0
        ? val.collectionType
        : serializeCollectionCollectionTypeField(val.collectionType),
  };
}
export function deserializeCollection(val: SerializedData): Collection {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Collection"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Collection"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CollectionTypeField =
    val.type == void 0 ? void 0 : deserializeCollectionTypeField(val.type);
  const name: undefined | CollectionNameField =
    val.name == void 0 ? void 0 : deserializeCollectionNameField(val.name);
  const collectionType: undefined | CollectionCollectionTypeField =
    val.collection_type == void 0
      ? void 0
      : deserializeCollectionCollectionTypeField(val.collection_type);
  return {
    id: id,
    type: type,
    name: name,
    collectionType: collectionType,
  } satisfies Collection;
}
