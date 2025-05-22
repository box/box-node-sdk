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
export type TranscriptSkillCardTypeField = 'skill_card';
export type TranscriptSkillCardSkillCardTypeField = 'transcript';
export interface TranscriptSkillCardSkillCardTitleField {
  /**
   * An optional identifier for the title. */
  readonly code?: string;
  /**
   * The actual title to show in the UI. */
  readonly message: string;
  readonly rawData?: SerializedData;
}
export type TranscriptSkillCardSkillTypeField = 'service';
export class TranscriptSkillCardSkillField {
  /**
   * `service` */
  readonly type: TranscriptSkillCardSkillTypeField =
    'service' as TranscriptSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TranscriptSkillCardSkillField, 'type'> &
      Partial<Pick<TranscriptSkillCardSkillField, 'type'>>,
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
export interface TranscriptSkillCardSkillFieldInput {
  /**
   * `service` */
  readonly type?: TranscriptSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type TranscriptSkillCardInvocationTypeField = 'skill_invocation';
export class TranscriptSkillCardInvocationField {
  /**
   * `skill_invocation` */
  readonly type: TranscriptSkillCardInvocationTypeField =
    'skill_invocation' as TranscriptSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TranscriptSkillCardInvocationField, 'type'> &
      Partial<Pick<TranscriptSkillCardInvocationField, 'type'>>,
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
export interface TranscriptSkillCardInvocationFieldInput {
  /**
   * `skill_invocation` */
  readonly type?: TranscriptSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface TranscriptSkillCardEntriesAppearsField {
  /**
   * The time in seconds when an
   * entry should start appearing on a timeline. */
  readonly start?: number;
  readonly rawData?: SerializedData;
}
export interface TranscriptSkillCardEntriesField {
  /**
   * The text of the entry. This would be the transcribed text assigned
   * to the entry on the timeline. */
  readonly text?: string;
  /**
   * Defines when a transcribed bit of text appears. This only includes a
   * start time and no end time. */
  readonly appears?: readonly TranscriptSkillCardEntriesAppearsField[];
  readonly rawData?: SerializedData;
}
export class TranscriptSkillCard {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * `skill_card` */
  readonly type: TranscriptSkillCardTypeField =
    'skill_card' as TranscriptSkillCardTypeField;
  /**
   * `transcript` */
  readonly skillCardType: TranscriptSkillCardSkillCardTypeField =
    'transcript' as TranscriptSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: TranscriptSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill!: TranscriptSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation!: TranscriptSkillCardInvocationField;
  /**
   * An optional total duration in seconds.
   *
   * Used with a `skill_card_type` of `transcript` or
   * `timeline`. */
  readonly duration?: number;
  /**
   * An list of entries for the card. This represents the individual entries of
   * the transcription. */
  readonly entries!: readonly TranscriptSkillCardEntriesField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TranscriptSkillCard, 'type' | 'skillCardType'> &
      Partial<Pick<TranscriptSkillCard, 'type' | 'skillCardType'>>,
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
    if (fields.duration !== undefined) {
      this.duration = fields.duration;
    }
    if (fields.entries !== undefined) {
      this.entries = fields.entries;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TranscriptSkillCardInput {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * `skill_card` */
  readonly type?: TranscriptSkillCardTypeField;
  /**
   * `transcript` */
  readonly skillCardType?: TranscriptSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: TranscriptSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill: TranscriptSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation: TranscriptSkillCardInvocationField;
  /**
   * An optional total duration in seconds.
   *
   * Used with a `skill_card_type` of `transcript` or
   * `timeline`. */
  readonly duration?: number;
  /**
   * An list of entries for the card. This represents the individual entries of
   * the transcription. */
  readonly entries: readonly TranscriptSkillCardEntriesField[];
  readonly rawData?: SerializedData;
}
export function serializeTranscriptSkillCardTypeField(
  val: TranscriptSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeTranscriptSkillCardTypeField(
  val: SerializedData,
): TranscriptSkillCardTypeField {
  if (val == 'skill_card') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TranscriptSkillCardTypeField",
  });
}
export function serializeTranscriptSkillCardSkillCardTypeField(
  val: TranscriptSkillCardSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeTranscriptSkillCardSkillCardTypeField(
  val: SerializedData,
): TranscriptSkillCardSkillCardTypeField {
  if (val == 'transcript') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TranscriptSkillCardSkillCardTypeField",
  });
}
export function serializeTranscriptSkillCardSkillCardTitleField(
  val: TranscriptSkillCardSkillCardTitleField,
): SerializedData {
  return { ['code']: val.code, ['message']: val.message };
}
export function deserializeTranscriptSkillCardSkillCardTitleField(
  val: SerializedData,
): TranscriptSkillCardSkillCardTitleField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardSkillCardTitleField"',
    });
  }
  if (!(val.code == void 0) && !sdIsString(val.code)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "code" of type "TranscriptSkillCardSkillCardTitleField"',
    });
  }
  const code: undefined | string = val.code == void 0 ? void 0 : val.code;
  if (val.message == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "message" of type "TranscriptSkillCardSkillCardTitleField" to be defined',
    });
  }
  if (!sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "TranscriptSkillCardSkillCardTitleField"',
    });
  }
  const message: string = val.message;
  return {
    code: code,
    message: message,
  } satisfies TranscriptSkillCardSkillCardTitleField;
}
export function serializeTranscriptSkillCardSkillTypeField(
  val: TranscriptSkillCardSkillTypeField,
): SerializedData {
  return val;
}
export function deserializeTranscriptSkillCardSkillTypeField(
  val: SerializedData,
): TranscriptSkillCardSkillTypeField {
  if (val == 'service') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TranscriptSkillCardSkillTypeField",
  });
}
export function serializeTranscriptSkillCardSkillField(
  val: TranscriptSkillCardSkillField,
): SerializedData {
  return {
    ['type']: serializeTranscriptSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTranscriptSkillCardSkillField(
  val: SerializedData,
): TranscriptSkillCardSkillField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardSkillField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TranscriptSkillCardSkillField" to be defined',
    });
  }
  const type: TranscriptSkillCardSkillTypeField =
    deserializeTranscriptSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TranscriptSkillCardSkillField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TranscriptSkillCardSkillField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TranscriptSkillCardSkillField;
}
export function serializeTranscriptSkillCardSkillFieldInput(
  val: TranscriptSkillCardSkillFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTranscriptSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTranscriptSkillCardSkillFieldInput(
  val: SerializedData,
): TranscriptSkillCardSkillFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardSkillFieldInput"',
    });
  }
  const type: undefined | TranscriptSkillCardSkillTypeField =
    val.type == void 0
      ? void 0
      : deserializeTranscriptSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TranscriptSkillCardSkillFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TranscriptSkillCardSkillFieldInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TranscriptSkillCardSkillFieldInput;
}
export function serializeTranscriptSkillCardInvocationTypeField(
  val: TranscriptSkillCardInvocationTypeField,
): SerializedData {
  return val;
}
export function deserializeTranscriptSkillCardInvocationTypeField(
  val: SerializedData,
): TranscriptSkillCardInvocationTypeField {
  if (val == 'skill_invocation') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TranscriptSkillCardInvocationTypeField",
  });
}
export function serializeTranscriptSkillCardInvocationField(
  val: TranscriptSkillCardInvocationField,
): SerializedData {
  return {
    ['type']: serializeTranscriptSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTranscriptSkillCardInvocationField(
  val: SerializedData,
): TranscriptSkillCardInvocationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardInvocationField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TranscriptSkillCardInvocationField" to be defined',
    });
  }
  const type: TranscriptSkillCardInvocationTypeField =
    deserializeTranscriptSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TranscriptSkillCardInvocationField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TranscriptSkillCardInvocationField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TranscriptSkillCardInvocationField;
}
export function serializeTranscriptSkillCardInvocationFieldInput(
  val: TranscriptSkillCardInvocationFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTranscriptSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTranscriptSkillCardInvocationFieldInput(
  val: SerializedData,
): TranscriptSkillCardInvocationFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardInvocationFieldInput"',
    });
  }
  const type: undefined | TranscriptSkillCardInvocationTypeField =
    val.type == void 0
      ? void 0
      : deserializeTranscriptSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TranscriptSkillCardInvocationFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TranscriptSkillCardInvocationFieldInput"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies TranscriptSkillCardInvocationFieldInput;
}
export function serializeTranscriptSkillCardEntriesAppearsField(
  val: TranscriptSkillCardEntriesAppearsField,
): SerializedData {
  return { ['start']: val.start };
}
export function deserializeTranscriptSkillCardEntriesAppearsField(
  val: SerializedData,
): TranscriptSkillCardEntriesAppearsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardEntriesAppearsField"',
    });
  }
  if (!(val.start == void 0) && !sdIsNumber(val.start)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "start" of type "TranscriptSkillCardEntriesAppearsField"',
    });
  }
  const start: undefined | number = val.start == void 0 ? void 0 : val.start;
  return { start: start } satisfies TranscriptSkillCardEntriesAppearsField;
}
export function serializeTranscriptSkillCardEntriesField(
  val: TranscriptSkillCardEntriesField,
): SerializedData {
  return {
    ['text']: val.text,
    ['appears']:
      val.appears == void 0
        ? val.appears
        : (val.appears.map(function (
            item: TranscriptSkillCardEntriesAppearsField,
          ): SerializedData {
            return serializeTranscriptSkillCardEntriesAppearsField(item);
          }) as readonly any[]),
  };
}
export function deserializeTranscriptSkillCardEntriesField(
  val: SerializedData,
): TranscriptSkillCardEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardEntriesField"',
    });
  }
  if (!(val.text == void 0) && !sdIsString(val.text)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text" of type "TranscriptSkillCardEntriesField"',
    });
  }
  const text: undefined | string = val.text == void 0 ? void 0 : val.text;
  if (!(val.appears == void 0) && !sdIsList(val.appears)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "appears" of type "TranscriptSkillCardEntriesField"',
    });
  }
  const appears: undefined | readonly TranscriptSkillCardEntriesAppearsField[] =
    val.appears == void 0
      ? void 0
      : sdIsList(val.appears)
        ? (val.appears.map(function (
            itm: SerializedData,
          ): TranscriptSkillCardEntriesAppearsField {
            return deserializeTranscriptSkillCardEntriesAppearsField(itm);
          }) as readonly any[])
        : [];
  return {
    text: text,
    appears: appears,
  } satisfies TranscriptSkillCardEntriesField;
}
export function serializeTranscriptSkillCard(
  val: TranscriptSkillCard,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']: serializeTranscriptSkillCardTypeField(val.type),
    ['skill_card_type']: serializeTranscriptSkillCardSkillCardTypeField(
      val.skillCardType,
    ),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeTranscriptSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeTranscriptSkillCardSkillField(val.skill),
    ['invocation']: serializeTranscriptSkillCardInvocationField(val.invocation),
    ['duration']: val.duration,
    ['entries']: val.entries.map(function (
      item: TranscriptSkillCardEntriesField,
    ): SerializedData {
      return serializeTranscriptSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTranscriptSkillCard(
  val: SerializedData,
): TranscriptSkillCard {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCard"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TranscriptSkillCard"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "TranscriptSkillCard" to be defined',
    });
  }
  const type: TranscriptSkillCardTypeField =
    deserializeTranscriptSkillCardTypeField(val.type);
  if (val.skill_card_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill_card_type" of type "TranscriptSkillCard" to be defined',
    });
  }
  const skillCardType: TranscriptSkillCardSkillCardTypeField =
    deserializeTranscriptSkillCardSkillCardTypeField(val.skill_card_type);
  const skillCardTitle: undefined | TranscriptSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeTranscriptSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "skill" of type "TranscriptSkillCard" to be defined',
    });
  }
  const skill: TranscriptSkillCardSkillField =
    deserializeTranscriptSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "TranscriptSkillCard" to be defined',
    });
  }
  const invocation: TranscriptSkillCardInvocationField =
    deserializeTranscriptSkillCardInvocationField(val.invocation);
  if (!(val.duration == void 0) && !sdIsNumber(val.duration)) {
    throw new BoxSdkError({
      message: 'Expecting number for "duration" of type "TranscriptSkillCard"',
    });
  }
  const duration: undefined | number =
    val.duration == void 0 ? void 0 : val.duration;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TranscriptSkillCard" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "TranscriptSkillCard"',
    });
  }
  const entries: readonly TranscriptSkillCardEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TranscriptSkillCardEntriesField {
        return deserializeTranscriptSkillCardEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    createdAt: createdAt,
    type: type,
    skillCardType: skillCardType,
    skillCardTitle: skillCardTitle,
    skill: skill,
    invocation: invocation,
    duration: duration,
    entries: entries,
  } satisfies TranscriptSkillCard;
}
export function serializeTranscriptSkillCardInput(
  val: TranscriptSkillCardInput,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTranscriptSkillCardTypeField(val.type),
    ['skillCardType']:
      val.skillCardType == void 0
        ? val.skillCardType
        : serializeTranscriptSkillCardSkillCardTypeField(val.skillCardType),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeTranscriptSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeTranscriptSkillCardSkillField(val.skill),
    ['invocation']: serializeTranscriptSkillCardInvocationField(val.invocation),
    ['duration']: val.duration,
    ['entries']: val.entries.map(function (
      item: TranscriptSkillCardEntriesField,
    ): SerializedData {
      return serializeTranscriptSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTranscriptSkillCardInput(
  val: SerializedData,
): TranscriptSkillCardInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TranscriptSkillCardInput"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TranscriptSkillCardInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const type: undefined | TranscriptSkillCardTypeField =
    val.type == void 0
      ? void 0
      : deserializeTranscriptSkillCardTypeField(val.type);
  const skillCardType: undefined | TranscriptSkillCardSkillCardTypeField =
    val.skillCardType == void 0
      ? void 0
      : deserializeTranscriptSkillCardSkillCardTypeField(val.skillCardType);
  const skillCardTitle: undefined | TranscriptSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeTranscriptSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill" of type "TranscriptSkillCardInput" to be defined',
    });
  }
  const skill: TranscriptSkillCardSkillField =
    deserializeTranscriptSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "TranscriptSkillCardInput" to be defined',
    });
  }
  const invocation: TranscriptSkillCardInvocationField =
    deserializeTranscriptSkillCardInvocationField(val.invocation);
  if (!(val.duration == void 0) && !sdIsNumber(val.duration)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "duration" of type "TranscriptSkillCardInput"',
    });
  }
  const duration: undefined | number =
    val.duration == void 0 ? void 0 : val.duration;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TranscriptSkillCardInput" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TranscriptSkillCardInput"',
    });
  }
  const entries: readonly TranscriptSkillCardEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TranscriptSkillCardEntriesField {
        return deserializeTranscriptSkillCardEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    createdAt: createdAt,
    type: type,
    skillCardType: skillCardType,
    skillCardTitle: skillCardTitle,
    skill: skill,
    invocation: invocation,
    duration: duration,
    entries: entries,
  } satisfies TranscriptSkillCardInput;
}
