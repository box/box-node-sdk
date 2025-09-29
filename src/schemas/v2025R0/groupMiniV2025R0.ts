import { serializeGroupBaseV2025R0TypeField } from './groupBaseV2025R0';
import { deserializeGroupBaseV2025R0TypeField } from './groupBaseV2025R0';
import { serializeGroupBaseV2025R0 } from './groupBaseV2025R0';
import { deserializeGroupBaseV2025R0 } from './groupBaseV2025R0';
import { GroupBaseV2025R0TypeField } from './groupBaseV2025R0';
import { GroupBaseV2025R0 } from './groupBaseV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type GroupMiniV2025R0GroupTypeField =
  | 'managed_group'
  | 'all_users_group'
  | string;
export class GroupMiniV2025R0 extends GroupBaseV2025R0 {
  readonly name?: string;
  readonly groupType?: GroupMiniV2025R0GroupTypeField;
  constructor(fields: GroupMiniV2025R0) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.groupType !== undefined) {
      this.groupType = fields.groupType;
    }
  }
}
export function serializeGroupMiniV2025R0GroupTypeField(
  val: GroupMiniV2025R0GroupTypeField,
): SerializedData {
  return val;
}
export function deserializeGroupMiniV2025R0GroupTypeField(
  val: SerializedData,
): GroupMiniV2025R0GroupTypeField {
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
    message: "Can't deserialize GroupMiniV2025R0GroupTypeField",
  });
}
export function serializeGroupMiniV2025R0(
  val: GroupMiniV2025R0,
): SerializedData {
  const base: any = serializeGroupBaseV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "GroupMiniV2025R0"',
    });
  }
  return {
    ...base,
    ...{
      ['name']: val.name,
      ['group_type']:
        val.groupType == void 0
          ? val.groupType
          : serializeGroupMiniV2025R0GroupTypeField(val.groupType),
    },
  };
}
export function deserializeGroupMiniV2025R0(
  val: SerializedData,
): GroupMiniV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "GroupMiniV2025R0"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "GroupMiniV2025R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const groupType: undefined | GroupMiniV2025R0GroupTypeField =
    val.group_type == void 0
      ? void 0
      : deserializeGroupMiniV2025R0GroupTypeField(val.group_type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "GroupMiniV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "GroupMiniV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "GroupMiniV2025R0" to be defined',
    });
  }
  const type: GroupBaseV2025R0TypeField = deserializeGroupBaseV2025R0TypeField(
    val.type,
  );
  return {
    name: name,
    groupType: groupType,
    id: id,
    type: type,
  } satisfies GroupMiniV2025R0;
}
