import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiTaxonomyReferenceTypeField = 'taxonomy';
export interface AiTaxonomyReference {
  /**
   * The type of the taxonomy source. */
  readonly type?: AiTaxonomyReferenceTypeField;
  /**
   * The identifier for a taxonomy, which corresponds to the `taxonomy_key` of the taxonomy source. */
  readonly taxonomyKey?: string;
  /**
   * The namespace of the taxonomy source. */
  readonly namespace?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiTaxonomyReferenceTypeField(
  val: AiTaxonomyReferenceTypeField
): SerializedData {
  return val;
}
export function deserializeAiTaxonomyReferenceTypeField(
  val: SerializedData
): AiTaxonomyReferenceTypeField {
  if (val == 'taxonomy') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiTaxonomyReferenceTypeField",
  });
}
export function serializeAiTaxonomyReference(
  val: AiTaxonomyReference
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiTaxonomyReferenceTypeField(val.type),
    ['taxonomy_key']: val.taxonomyKey,
    ['namespace']: val.namespace,
  };
}
export function deserializeAiTaxonomyReference(
  val: SerializedData
): AiTaxonomyReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiTaxonomyReference"',
    });
  }
  const type: undefined | AiTaxonomyReferenceTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiTaxonomyReferenceTypeField(val.type);
  if (!(val.taxonomy_key == void 0) && !sdIsString(val.taxonomy_key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "taxonomy_key" of type "AiTaxonomyReference"',
    });
  }
  const taxonomyKey: undefined | string =
    val.taxonomy_key == void 0 ? void 0 : val.taxonomy_key;
  if (!(val.namespace == void 0) && !sdIsString(val.namespace)) {
    throw new BoxSdkError({
      message: 'Expecting string for "namespace" of type "AiTaxonomyReference"',
    });
  }
  const namespace: undefined | string =
    val.namespace == void 0 ? void 0 : val.namespace;
  return {
    type: type,
    taxonomyKey: taxonomyKey,
    namespace: namespace,
  } satisfies AiTaxonomyReference;
}
