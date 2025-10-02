import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { serializeGroupBase } from './groupBase';
import { deserializeGroupBase } from './groupBase';
import { UserBase } from './userBase';
import { GroupBase } from './groupBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiAgentAllowedEntity = UserBase | GroupBase;
export function serializeAiAgentAllowedEntity(val: any): SerializedData {
  if (val.type == 'user') {
    return serializeUserBase(val);
  }
  if (val.type == 'group') {
    return serializeGroupBase(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgentAllowedEntity(
  val: SerializedData,
): AiAgentAllowedEntity {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentAllowedEntity"',
    });
  }
  if (val.type == 'user') {
    return deserializeUserBase(val);
  }
  if (val.type == 'group') {
    return deserializeGroupBase(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiAgentAllowedEntity" });
}
