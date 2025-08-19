import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type KeywordSkillCardTypeField = 'skill_card';
export type KeywordSkillCardSkillCardTypeField = 'keyword';
export interface KeywordSkillCardSkillCardTitleField {
  /**
   * An optional identifier for the title. */
  readonly code?: string;
  /**
   * The actual title to show in the UI. */
  readonly message: string;
  readonly rawData?: SerializedData;
}
export type KeywordSkillCardSkillTypeField = 'service';
export class KeywordSkillCardSkillField {
  /**
   * The value will always be `service`. */
  readonly type: KeywordSkillCardSkillTypeField =
    'service' as KeywordSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<KeywordSkillCardSkillField, 'type'> &
      Partial<Pick<KeywordSkillCardSkillField, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface KeywordSkillCardSkillFieldInput {
  /**
   * The value will always be `service`. */
  readonly type?: KeywordSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type KeywordSkillCardInvocationTypeField = 'skill_invocation';
export class KeywordSkillCardInvocationField {
  /**
   * The value will always be `skill_invocation`. */
  readonly type: KeywordSkillCardInvocationTypeField =
    'skill_invocation' as KeywordSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<KeywordSkillCardInvocationField, 'type'> &
      Partial<Pick<KeywordSkillCardInvocationField, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface KeywordSkillCardInvocationFieldInput {
  /**
   * The value will always be `skill_invocation`. */
  readonly type?: KeywordSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface KeywordSkillCardEntriesField {
  /**
   * The text of the keyword. */
  readonly text?: string;
  readonly rawData?: SerializedData;
}
export class KeywordSkillCard {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * The value will always be `skill_card`. */
  readonly type: KeywordSkillCardTypeField =
    'skill_card' as KeywordSkillCardTypeField;
  /**
   * The value will always be `keyword`. */
  readonly skillCardType: KeywordSkillCardSkillCardTypeField =
    'keyword' as KeywordSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: KeywordSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill!: KeywordSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation!: KeywordSkillCardInvocationField;
  /**
   * An list of entries in the metadata card. */
  readonly entries!: readonly KeywordSkillCardEntriesField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<KeywordSkillCard, 'type' | 'skillCardType'> &
      Partial<Pick<KeywordSkillCard, 'type' | 'skillCardType'>>,
  ) {
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.skillCardType !== undefined) {
      this.skillCardType = fields.skillCardType;
    }
    if (fields.skillCardTitle !== undefined) {
      this.skillCardTitle = fields.skillCardTitle;
    }
    if (fields.skill !== undefined) {
      this.skill = fields.skill;
    }
    if (fields.invocation !== undefined) {
      this.invocation = fields.invocation;
    }
    if (fields.entries !== undefined) {
      this.entries = fields.entries;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface KeywordSkillCardInput {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * The value will always be `skill_card`. */
  readonly type?: KeywordSkillCardTypeField;
  /**
   * The value will always be `keyword`. */
  readonly skillCardType?: KeywordSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: KeywordSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill: KeywordSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation: KeywordSkillCardInvocationField;
  /**
   * An list of entries in the metadata card. */
  readonly entries: readonly KeywordSkillCardEntriesField[];
  readonly rawData?: SerializedData;
}
export function serializeKeywordSkillCardTypeField(
  val: KeywordSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeKeywordSkillCardTypeField(
  val: SerializedData,
): KeywordSkillCardTypeField {
  if (val == 'skill_card') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize KeywordSkillCardTypeField",
  });
}
export function serializeKeywordSkillCardSkillCardTypeField(
  val: KeywordSkillCardSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeKeywordSkillCardSkillCardTypeField(
  val: SerializedData,
): KeywordSkillCardSkillCardTypeField {
  if (val == 'keyword') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize KeywordSkillCardSkillCardTypeField",
  });
}
export function serializeKeywordSkillCardSkillCardTitleField(
  val: KeywordSkillCardSkillCardTitleField,
): SerializedData {
  return { ['code']: val.code, ['message']: val.message };
}
export function deserializeKeywordSkillCardSkillCardTitleField(
  val: SerializedData,
): KeywordSkillCardSkillCardTitleField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardSkillCardTitleField"',
    });
  }
  if (!(val.code == void 0) && !sdIsString(val.code)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "code" of type "KeywordSkillCardSkillCardTitleField"',
    });
  }
  const code: undefined | string = val.code == void 0 ? void 0 : val.code;
  if (val.message == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "message" of type "KeywordSkillCardSkillCardTitleField" to be defined',
    });
  }
  if (!sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "KeywordSkillCardSkillCardTitleField"',
    });
  }
  const message: string = val.message;
  return {
    code: code,
    message: message,
  } satisfies KeywordSkillCardSkillCardTitleField;
}
export function serializeKeywordSkillCardSkillTypeField(
  val: KeywordSkillCardSkillTypeField,
): SerializedData {
  return val;
}
export function deserializeKeywordSkillCardSkillTypeField(
  val: SerializedData,
): KeywordSkillCardSkillTypeField {
  if (val == 'service') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize KeywordSkillCardSkillTypeField",
  });
}
export function serializeKeywordSkillCardSkillField(
  val: KeywordSkillCardSkillField,
): SerializedData {
  return {
    ['type']: serializeKeywordSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeKeywordSkillCardSkillField(
  val: SerializedData,
): KeywordSkillCardSkillField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardSkillField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "KeywordSkillCardSkillField" to be defined',
    });
  }
  const type: KeywordSkillCardSkillTypeField =
    deserializeKeywordSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "KeywordSkillCardSkillField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "KeywordSkillCardSkillField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies KeywordSkillCardSkillField;
}
export function serializeKeywordSkillCardSkillFieldInput(
  val: KeywordSkillCardSkillFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeKeywordSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeKeywordSkillCardSkillFieldInput(
  val: SerializedData,
): KeywordSkillCardSkillFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardSkillFieldInput"',
    });
  }
  const type: undefined | KeywordSkillCardSkillTypeField =
    val.type == void 0
      ? void 0
      : deserializeKeywordSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "KeywordSkillCardSkillFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "KeywordSkillCardSkillFieldInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies KeywordSkillCardSkillFieldInput;
}
export function serializeKeywordSkillCardInvocationTypeField(
  val: KeywordSkillCardInvocationTypeField,
): SerializedData {
  return val;
}
export function deserializeKeywordSkillCardInvocationTypeField(
  val: SerializedData,
): KeywordSkillCardInvocationTypeField {
  if (val == 'skill_invocation') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize KeywordSkillCardInvocationTypeField",
  });
}
export function serializeKeywordSkillCardInvocationField(
  val: KeywordSkillCardInvocationField,
): SerializedData {
  return {
    ['type']: serializeKeywordSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeKeywordSkillCardInvocationField(
  val: SerializedData,
): KeywordSkillCardInvocationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardInvocationField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "KeywordSkillCardInvocationField" to be defined',
    });
  }
  const type: KeywordSkillCardInvocationTypeField =
    deserializeKeywordSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "KeywordSkillCardInvocationField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "KeywordSkillCardInvocationField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies KeywordSkillCardInvocationField;
}
export function serializeKeywordSkillCardInvocationFieldInput(
  val: KeywordSkillCardInvocationFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeKeywordSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeKeywordSkillCardInvocationFieldInput(
  val: SerializedData,
): KeywordSkillCardInvocationFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardInvocationFieldInput"',
    });
  }
  const type: undefined | KeywordSkillCardInvocationTypeField =
    val.type == void 0
      ? void 0
      : deserializeKeywordSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "KeywordSkillCardInvocationFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "KeywordSkillCardInvocationFieldInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies KeywordSkillCardInvocationFieldInput;
}
export function serializeKeywordSkillCardEntriesField(
  val: KeywordSkillCardEntriesField,
): SerializedData {
  return { ['text']: val.text };
}
export function deserializeKeywordSkillCardEntriesField(
  val: SerializedData,
): KeywordSkillCardEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardEntriesField"',
    });
  }
  if (!(val.text == void 0) && !sdIsString(val.text)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text" of type "KeywordSkillCardEntriesField"',
    });
  }
  const text: undefined | string = val.text == void 0 ? void 0 : val.text;
  return { text: text } satisfies KeywordSkillCardEntriesField;
}
export function serializeKeywordSkillCard(
  val: KeywordSkillCard,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']: serializeKeywordSkillCardTypeField(val.type),
    ['skill_card_type']: serializeKeywordSkillCardSkillCardTypeField(
      val.skillCardType,
    ),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeKeywordSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeKeywordSkillCardSkillField(val.skill),
    ['invocation']: serializeKeywordSkillCardInvocationField(val.invocation),
    ['entries']: val.entries.map(function (
      item: KeywordSkillCardEntriesField,
    ): SerializedData {
      return serializeKeywordSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeKeywordSkillCard(
  val: SerializedData,
): KeywordSkillCard {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCard"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "KeywordSkillCard"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "KeywordSkillCard" to be defined',
    });
  }
  const type: KeywordSkillCardTypeField = deserializeKeywordSkillCardTypeField(
    val.type,
  );
  if (val.skill_card_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill_card_type" of type "KeywordSkillCard" to be defined',
    });
  }
  const skillCardType: KeywordSkillCardSkillCardTypeField =
    deserializeKeywordSkillCardSkillCardTypeField(val.skill_card_type);
  const skillCardTitle: undefined | KeywordSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeKeywordSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "skill" of type "KeywordSkillCard" to be defined',
    });
  }
  const skill: KeywordSkillCardSkillField =
    deserializeKeywordSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "KeywordSkillCard" to be defined',
    });
  }
  const invocation: KeywordSkillCardInvocationField =
    deserializeKeywordSkillCardInvocationField(val.invocation);
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "entries" of type "KeywordSkillCard" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "KeywordSkillCard"',
    });
  }
  const entries: readonly KeywordSkillCardEntriesField[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData,
      ): KeywordSkillCardEntriesField {
        return deserializeKeywordSkillCardEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    createdAt: createdAt,
    type: type,
    skillCardType: skillCardType,
    skillCardTitle: skillCardTitle,
    skill: skill,
    invocation: invocation,
    entries: entries,
  } satisfies KeywordSkillCard;
}
export function serializeKeywordSkillCardInput(
  val: KeywordSkillCardInput,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']:
      val.type == void 0
        ? val.type
        : serializeKeywordSkillCardTypeField(val.type),
    ['skillCardType']:
      val.skillCardType == void 0
        ? val.skillCardType
        : serializeKeywordSkillCardSkillCardTypeField(val.skillCardType),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeKeywordSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeKeywordSkillCardSkillField(val.skill),
    ['invocation']: serializeKeywordSkillCardInvocationField(val.invocation),
    ['entries']: val.entries.map(function (
      item: KeywordSkillCardEntriesField,
    ): SerializedData {
      return serializeKeywordSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeKeywordSkillCardInput(
  val: SerializedData,
): KeywordSkillCardInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeywordSkillCardInput"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "KeywordSkillCardInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const type: undefined | KeywordSkillCardTypeField =
    val.type == void 0
      ? void 0
      : deserializeKeywordSkillCardTypeField(val.type);
  const skillCardType: undefined | KeywordSkillCardSkillCardTypeField =
    val.skillCardType == void 0
      ? void 0
      : deserializeKeywordSkillCardSkillCardTypeField(val.skillCardType);
  const skillCardTitle: undefined | KeywordSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeKeywordSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill" of type "KeywordSkillCardInput" to be defined',
    });
  }
  const skill: KeywordSkillCardSkillField =
    deserializeKeywordSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "KeywordSkillCardInput" to be defined',
    });
  }
  const invocation: KeywordSkillCardInvocationField =
    deserializeKeywordSkillCardInvocationField(val.invocation);
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "KeywordSkillCardInput" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "KeywordSkillCardInput"',
    });
  }
  const entries: readonly KeywordSkillCardEntriesField[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData,
      ): KeywordSkillCardEntriesField {
        return deserializeKeywordSkillCardEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    createdAt: createdAt,
    type: type,
    skillCardType: skillCardType,
    skillCardTitle: skillCardTitle,
    skill: skill,
    invocation: invocation,
    entries: entries,
  } satisfies KeywordSkillCardInput;
}
