import { serializeAiTaxonomyReference } from './aiTaxonomyReference';
import { deserializeAiTaxonomyReference } from './aiTaxonomyReference';
import { serializeAiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { deserializeAiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { AiTaxonomyReference } from './aiTaxonomyReference';
import { AiTaxonomyFileReference } from './aiTaxonomyFileReference';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiTaxonomySource = AiTaxonomyReference | AiTaxonomyFileReference;
export function serializeAiTaxonomySource(val: any): SerializedData {
  if (val.type == 'taxonomy') {
    return serializeAiTaxonomyReference(val);
  }
  if (val.type == 'file') {
    return serializeAiTaxonomyFileReference(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiTaxonomySource(
  val: SerializedData
): AiTaxonomySource {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiTaxonomySource"',
    });
  }
  if (val.type == 'taxonomy') {
    return deserializeAiTaxonomyReference(val);
  }
  if (val.type == 'file') {
    return deserializeAiTaxonomyFileReference(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiTaxonomySource" });
}
