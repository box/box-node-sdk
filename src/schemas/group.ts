import { serializeGroupBaseTypeField } from './groupBase';
import { deserializeGroupBaseTypeField } from './groupBase';
import { serializeGroupBase } from './groupBase';
import { deserializeGroupBase } from './groupBase';
import { serializeGroupMiniGroupTypeField } from './groupMini';
import { deserializeGroupMiniGroupTypeField } from './groupMini';
import { serializeGroupMini } from './groupMini';
import { deserializeGroupMini } from './groupMini';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { GroupBaseTypeField } from './groupBase';
import { GroupBase } from './groupBase';
import { GroupMiniGroupTypeField } from './groupMini';
import { GroupMini } from './groupMini';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class Group extends GroupMini {
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  constructor(fields: Group) {
    super(fields);
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
  }
}
export function serializeGroup(val: Group): SerializedData {
  const base: any = serializeGroupMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Group"' });
  }
  return {
    ...base,
    ...{
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
    },
  };
}
export function deserializeGroup(val: SerializedData): Group {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Group"' });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Group"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "Group"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "Group"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const groupType: undefined | GroupMiniGroupTypeField =
    val.group_type == void 0
      ? void 0
      : deserializeGroupMiniGroupTypeField(val.group_type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "Group" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Group"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "Group" to be defined',
    });
  }
  const type: GroupBaseTypeField = deserializeGroupBaseTypeField(val.type);
  return {
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    name: name,
    groupType: groupType,
    id: id,
    type: type,
  } satisfies Group;
}
