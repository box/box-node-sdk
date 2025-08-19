import { serializeUserBase } from './userBase.js';
import { deserializeUserBase } from './userBase.js';
import { serializeGroupBase } from './groupBase.js';
import { deserializeGroupBase } from './groupBase.js';
import { UserBase } from './userBase.js';
import { GroupBase } from './groupBase.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
