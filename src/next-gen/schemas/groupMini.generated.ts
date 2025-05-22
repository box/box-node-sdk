import { serializeGroupBaseTypeField } from './groupBase.generated.js';
import { deserializeGroupBaseTypeField } from './groupBase.generated.js';
import { serializeGroupBase } from './groupBase.generated.js';
import { deserializeGroupBase } from './groupBase.generated.js';
import { GroupBaseTypeField } from './groupBase.generated.js';
import { GroupBase } from './groupBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type GroupMiniGroupTypeField =
  | 'managed_group'
  | 'all_users_group'
  | string;
export class GroupMini extends GroupBase {
  readonly name?: string;
  readonly groupType?: GroupMiniGroupTypeField;
  constructor(fields: GroupMini) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.groupType !== undefined) {
      this.groupType = fields.groupType;
    }
  }
}
export function serializeGroupMiniGroupTypeField(
  val: GroupMiniGroupTypeField,
): SerializedData {
  return val;
}
export function deserializeGroupMiniGroupTypeField(
  val: SerializedData,
): GroupMiniGroupTypeField {
  if (val == 'managed_group') {
    return val;
  }
  if (val == 'all_users_group') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GroupMiniGroupTypeField",
  });
}
export function serializeGroupMini(val: GroupMini): SerializedData {
  const base: any = serializeGroupBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "GroupMini"' });
  }
  return {
    ...base,
    ...{
      ['name']: val.name,
      ['group_type']:
        val.groupType == void 0
          ? val.groupType
          : serializeGroupMiniGroupTypeField(val.groupType),
    },
  };
}
export function deserializeGroupMini(val: SerializedData): GroupMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "GroupMini"' });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "GroupMini"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const groupType: undefined | GroupMiniGroupTypeField =
    val.group_type == void 0
      ? void 0
      : deserializeGroupMiniGroupTypeField(val.group_type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "GroupMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "GroupMini"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "GroupMini" to be defined',
    });
  }
  const type: GroupBaseTypeField = deserializeGroupBaseTypeField(val.type);
  return {
    name: name,
    groupType: groupType,
    id: id,
    type: type,
  } satisfies GroupMini;
}
