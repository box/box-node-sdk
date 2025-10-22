import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShieldRuleItemV2025R0TypeField = 'shield_rule';
export type ShieldRuleItemV2025R0PriorityField =
  | 'informational'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | string;
export interface ShieldRuleItemV2025R0 {
  /**
   * The identifier of the shield rule. */
  readonly id?: string;
  /**
   * The value will always be `shield_rule`. */
  readonly type?: ShieldRuleItemV2025R0TypeField;
  /**
   * The category of the shield rule. */
  readonly ruleCategory?: string;
  /**
   * The name of the shield rule. */
  readonly name?: string;
  /**
   * The description of the shield rule. */
  readonly description?: string;
  /**
   * The priority level of the shield rule. */
  readonly priority?: ShieldRuleItemV2025R0PriorityField;
  /**
   * The date and time when the shield rule was created. */
  readonly createdAt?: DateTime;
  /**
   * The date and time when the shield rule was last modified. */
  readonly modifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeShieldRuleItemV2025R0TypeField(
  val: ShieldRuleItemV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldRuleItemV2025R0TypeField(
  val: SerializedData,
): ShieldRuleItemV2025R0TypeField {
  if (val == 'shield_rule') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldRuleItemV2025R0TypeField",
  });
}
export function serializeShieldRuleItemV2025R0PriorityField(
  val: ShieldRuleItemV2025R0PriorityField,
): SerializedData {
  return val;
}
export function deserializeShieldRuleItemV2025R0PriorityField(
  val: SerializedData,
): ShieldRuleItemV2025R0PriorityField {
  if (val == 'informational') {
    return val;
  }
  if (val == 'low') {
    return val;
  }
  if (val == 'medium') {
    return val;
  }
  if (val == 'high') {
    return val;
  }
  if (val == 'critical') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldRuleItemV2025R0PriorityField",
  });
}
export function serializeShieldRuleItemV2025R0(
  val: ShieldRuleItemV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldRuleItemV2025R0TypeField(val.type),
    ['rule_category']: val.ruleCategory,
    ['name']: val.name,
    ['description']: val.description,
    ['priority']:
      val.priority == void 0
        ? val.priority
        : serializeShieldRuleItemV2025R0PriorityField(val.priority),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
  };
}
export function deserializeShieldRuleItemV2025R0(
  val: SerializedData,
): ShieldRuleItemV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldRuleItemV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShieldRuleItemV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldRuleItemV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldRuleItemV2025R0TypeField(val.type);
  if (!(val.rule_category == void 0) && !sdIsString(val.rule_category)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "rule_category" of type "ShieldRuleItemV2025R0"',
    });
  }
  const ruleCategory: undefined | string =
    val.rule_category == void 0 ? void 0 : val.rule_category;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShieldRuleItemV2025R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShieldRuleItemV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const priority: undefined | ShieldRuleItemV2025R0PriorityField =
    val.priority == void 0
      ? void 0
      : deserializeShieldRuleItemV2025R0PriorityField(val.priority);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldRuleItemV2025R0"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "ShieldRuleItemV2025R0"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  return {
    id: id,
    type: type,
    ruleCategory: ruleCategory,
    name: name,
    description: description,
    priority: priority,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
  } satisfies ShieldRuleItemV2025R0;
}
