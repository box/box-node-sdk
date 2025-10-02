import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type GroupBaseTypeField = 'group';
export class GroupBase {
  /**
   * The unique identifier for this object. */
  readonly id!: string;
  /**
   * The value will always be `group`. */
  readonly type: GroupBaseTypeField = 'group' as GroupBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<GroupBase, 'type'> & Partial<Pick<GroupBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface GroupBaseInput {
  /**
   * The unique identifier for this object. */
  readonly id: string;
  /**
   * The value will always be `group`. */
  readonly type?: GroupBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeGroupBaseTypeField(
  val: GroupBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeGroupBaseTypeField(
  val: SerializedData,
): GroupBaseTypeField {
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize GroupBaseTypeField" });
}
export function serializeGroupBase(val: GroupBase): SerializedData {
  return { ['id']: val.id, ['type']: serializeGroupBaseTypeField(val.type) };
}
export function deserializeGroupBase(val: SerializedData): GroupBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "GroupBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "GroupBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "GroupBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "GroupBase" to be defined',
    });
  }
  const type: GroupBaseTypeField = deserializeGroupBaseTypeField(val.type);
  return { id: id, type: type } satisfies GroupBase;
}
export function serializeGroupBaseInput(val: GroupBaseInput): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeGroupBaseTypeField(val.type),
  };
}
export function deserializeGroupBaseInput(val: SerializedData): GroupBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "GroupBaseInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "GroupBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "GroupBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | GroupBaseTypeField =
    val.type == void 0 ? void 0 : deserializeGroupBaseTypeField(val.type);
  return { id: id, type: type } satisfies GroupBaseInput;
}
