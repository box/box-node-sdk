import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiTaxonomyFileReferenceTypeField = 'file';
export interface AiTaxonomyFileReference {
  /**
   * The type of the taxonomy source. */
  readonly type?: AiTaxonomyFileReferenceTypeField;
  /**
   * The identifier for a taxonomy, which corresponds to the `taxonomy_key` of the taxonomy source. */
  readonly taxonomyKey?: string;
  /**
   * The ID of the taxonomy source. Required if the type is `file` and unsupported if the type is `taxonomy`. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiTaxonomyFileReferenceTypeField(
  val: AiTaxonomyFileReferenceTypeField,
): SerializedData {
  return val;
}
export function deserializeAiTaxonomyFileReferenceTypeField(
  val: SerializedData,
): AiTaxonomyFileReferenceTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiTaxonomyFileReferenceTypeField",
  });
}
export function serializeAiTaxonomyFileReference(
  val: AiTaxonomyFileReference,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiTaxonomyFileReferenceTypeField(val.type),
    ['taxonomy_key']: val.taxonomyKey,
    ['id']: val.id,
  };
}
export function deserializeAiTaxonomyFileReference(
  val: SerializedData,
): AiTaxonomyFileReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiTaxonomyFileReference"',
    });
  }
  const type: undefined | AiTaxonomyFileReferenceTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiTaxonomyFileReferenceTypeField(val.type);
  if (!(val.taxonomy_key == void 0) && !sdIsString(val.taxonomy_key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "taxonomy_key" of type "AiTaxonomyFileReference"',
    });
  }
  const taxonomyKey: undefined | string =
    val.taxonomy_key == void 0 ? void 0 : val.taxonomy_key;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiTaxonomyFileReference"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    taxonomyKey: taxonomyKey,
    id: id,
  } satisfies AiTaxonomyFileReference;
}
