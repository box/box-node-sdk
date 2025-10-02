import { serializeMetadataBase } from './metadataBase';
import { deserializeMetadataBase } from './metadataBase';
import { MetadataBase } from './metadataBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type Metadata = MetadataBase;
export function serializeMetadata(val: Metadata): SerializedData {
  return serializeMetadataBase(val);
}
export function deserializeMetadata(val: SerializedData): Metadata {
  return deserializeMetadataBase(val);
}
