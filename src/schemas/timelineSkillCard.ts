import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TimelineSkillCardTypeField = 'skill_card';
export type TimelineSkillCardSkillCardTypeField = 'timeline';
export interface TimelineSkillCardSkillCardTitleField {
  /**
   * An optional identifier for the title. */
  readonly code?: string;
  /**
   * The actual title to show in the UI. */
  readonly message: string;
  readonly rawData?: SerializedData;
}
export type TimelineSkillCardSkillTypeField = 'service';
export class TimelineSkillCardSkillField {
  /**
   * The value will always be `service`. */
  readonly type: TimelineSkillCardSkillTypeField =
    'service' as TimelineSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TimelineSkillCardSkillField, 'type'> &
      Partial<Pick<TimelineSkillCardSkillField, 'type'>>,
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
export interface TimelineSkillCardSkillFieldInput {
  /**
   * The value will always be `service`. */
  readonly type?: TimelineSkillCardSkillTypeField;
  /**
   * A custom identifier that represent the service that
   * applied this metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export type TimelineSkillCardInvocationTypeField = 'skill_invocation';
export class TimelineSkillCardInvocationField {
  /**
   * The value will always be `skill_invocation`. */
  readonly type: TimelineSkillCardInvocationTypeField =
    'skill_invocation' as TimelineSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TimelineSkillCardInvocationField, 'type'> &
      Partial<Pick<TimelineSkillCardInvocationField, 'type'>>,
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
export interface TimelineSkillCardInvocationFieldInput {
  /**
   * The value will always be `skill_invocation`. */
  readonly type?: TimelineSkillCardInvocationTypeField;
  /**
   * A custom identifier that represent the instance of
   * the service that applied this metadata. For example,
   * if your `image-recognition-service` runs on multiple
   * nodes, this field can be used to identify the ID of
   * the node that was used to apply the metadata. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface TimelineSkillCardEntriesAppearsField {
  /**
   * The time in seconds when an
   * entry should start appearing on a timeline. */
  readonly start?: number;
  /**
   * The time in seconds when an
   * entry should stop appearing on a timeline. */
  readonly end?: number;
  readonly rawData?: SerializedData;
}
export interface TimelineSkillCardEntriesField {
  /**
   * The text of the entry. This would be the display
   * name for an item being placed on the timeline, for example the name
   * of the person who was detected in a video. */
  readonly text?: string;
  /**
   * Defines a list of timestamps for when this item should appear on the
   * timeline. */
  readonly appears?: readonly TimelineSkillCardEntriesAppearsField[];
  /**
   * The image to show on a for an entry that appears
   * on a timeline. This image URL is required for every entry.
   *
   * The image will be shown in a
   * list of items (for example faces), and clicking
   * the image will show the user where that entry
   * appears during the duration of this entry. */
  readonly imageUrl?: string;
  readonly rawData?: SerializedData;
}
export class TimelineSkillCard {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * The value will always be `skill_card`. */
  readonly type: TimelineSkillCardTypeField =
    'skill_card' as TimelineSkillCardTypeField;
  /**
   * The value will always be `timeline`. */
  readonly skillCardType: TimelineSkillCardSkillCardTypeField =
    'timeline' as TimelineSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: TimelineSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill!: TimelineSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation!: TimelineSkillCardInvocationField;
  /**
   * An total duration in seconds of the timeline. */
  readonly duration?: number;
  /**
   * A list of entries on the timeline. */
  readonly entries!: readonly TimelineSkillCardEntriesField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TimelineSkillCard, 'type' | 'skillCardType'> &
      Partial<Pick<TimelineSkillCard, 'type' | 'skillCardType'>>,
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
export interface TimelineSkillCardInput {
  /**
   * The optional date and time this card was created at. */
  readonly createdAt?: DateTime;
  /**
   * The value will always be `skill_card`. */
  readonly type?: TimelineSkillCardTypeField;
  /**
   * The value will always be `timeline`. */
  readonly skillCardType?: TimelineSkillCardSkillCardTypeField;
  /**
   * The title of the card. */
  readonly skillCardTitle?: TimelineSkillCardSkillCardTitleField;
  /**
   * The service that applied this metadata. */
  readonly skill: TimelineSkillCardSkillField;
  /**
   * The invocation of this service, used to track
   * which instance of a service applied the metadata. */
  readonly invocation: TimelineSkillCardInvocationField;
  /**
   * An total duration in seconds of the timeline. */
  readonly duration?: number;
  /**
   * A list of entries on the timeline. */
  readonly entries: readonly TimelineSkillCardEntriesField[];
  readonly rawData?: SerializedData;
}
export function serializeTimelineSkillCardTypeField(
  val: TimelineSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeTimelineSkillCardTypeField(
  val: SerializedData,
): TimelineSkillCardTypeField {
  if (val == 'skill_card') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TimelineSkillCardTypeField",
  });
}
export function serializeTimelineSkillCardSkillCardTypeField(
  val: TimelineSkillCardSkillCardTypeField,
): SerializedData {
  return val;
}
export function deserializeTimelineSkillCardSkillCardTypeField(
  val: SerializedData,
): TimelineSkillCardSkillCardTypeField {
  if (val == 'timeline') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TimelineSkillCardSkillCardTypeField",
  });
}
export function serializeTimelineSkillCardSkillCardTitleField(
  val: TimelineSkillCardSkillCardTitleField,
): SerializedData {
  return { ['code']: val.code, ['message']: val.message };
}
export function deserializeTimelineSkillCardSkillCardTitleField(
  val: SerializedData,
): TimelineSkillCardSkillCardTitleField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardSkillCardTitleField"',
    });
  }
  if (!(val.code == void 0) && !sdIsString(val.code)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "code" of type "TimelineSkillCardSkillCardTitleField"',
    });
  }
  const code: undefined | string = val.code == void 0 ? void 0 : val.code;
  if (val.message == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "message" of type "TimelineSkillCardSkillCardTitleField" to be defined',
    });
  }
  if (!sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "TimelineSkillCardSkillCardTitleField"',
    });
  }
  const message: string = val.message;
  return {
    code: code,
    message: message,
  } satisfies TimelineSkillCardSkillCardTitleField;
}
export function serializeTimelineSkillCardSkillTypeField(
  val: TimelineSkillCardSkillTypeField,
): SerializedData {
  return val;
}
export function deserializeTimelineSkillCardSkillTypeField(
  val: SerializedData,
): TimelineSkillCardSkillTypeField {
  if (val == 'service') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TimelineSkillCardSkillTypeField",
  });
}
export function serializeTimelineSkillCardSkillField(
  val: TimelineSkillCardSkillField,
): SerializedData {
  return {
    ['type']: serializeTimelineSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTimelineSkillCardSkillField(
  val: SerializedData,
): TimelineSkillCardSkillField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardSkillField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TimelineSkillCardSkillField" to be defined',
    });
  }
  const type: TimelineSkillCardSkillTypeField =
    deserializeTimelineSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TimelineSkillCardSkillField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TimelineSkillCardSkillField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TimelineSkillCardSkillField;
}
export function serializeTimelineSkillCardSkillFieldInput(
  val: TimelineSkillCardSkillFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTimelineSkillCardSkillTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTimelineSkillCardSkillFieldInput(
  val: SerializedData,
): TimelineSkillCardSkillFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardSkillFieldInput"',
    });
  }
  const type: undefined | TimelineSkillCardSkillTypeField =
    val.type == void 0
      ? void 0
      : deserializeTimelineSkillCardSkillTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TimelineSkillCardSkillFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TimelineSkillCardSkillFieldInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TimelineSkillCardSkillFieldInput;
}
export function serializeTimelineSkillCardInvocationTypeField(
  val: TimelineSkillCardInvocationTypeField,
): SerializedData {
  return val;
}
export function deserializeTimelineSkillCardInvocationTypeField(
  val: SerializedData,
): TimelineSkillCardInvocationTypeField {
  if (val == 'skill_invocation') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TimelineSkillCardInvocationTypeField",
  });
}
export function serializeTimelineSkillCardInvocationField(
  val: TimelineSkillCardInvocationField,
): SerializedData {
  return {
    ['type']: serializeTimelineSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTimelineSkillCardInvocationField(
  val: SerializedData,
): TimelineSkillCardInvocationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardInvocationField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TimelineSkillCardInvocationField" to be defined',
    });
  }
  const type: TimelineSkillCardInvocationTypeField =
    deserializeTimelineSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TimelineSkillCardInvocationField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TimelineSkillCardInvocationField"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TimelineSkillCardInvocationField;
}
export function serializeTimelineSkillCardInvocationFieldInput(
  val: TimelineSkillCardInvocationFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTimelineSkillCardInvocationTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeTimelineSkillCardInvocationFieldInput(
  val: SerializedData,
): TimelineSkillCardInvocationFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardInvocationFieldInput"',
    });
  }
  const type: undefined | TimelineSkillCardInvocationTypeField =
    val.type == void 0
      ? void 0
      : deserializeTimelineSkillCardInvocationTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TimelineSkillCardInvocationFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TimelineSkillCardInvocationFieldInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies TimelineSkillCardInvocationFieldInput;
}
export function serializeTimelineSkillCardEntriesAppearsField(
  val: TimelineSkillCardEntriesAppearsField,
): SerializedData {
  return { ['start']: val.start, ['end']: val.end };
}
export function deserializeTimelineSkillCardEntriesAppearsField(
  val: SerializedData,
): TimelineSkillCardEntriesAppearsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardEntriesAppearsField"',
    });
  }
  if (!(val.start == void 0) && !sdIsNumber(val.start)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "start" of type "TimelineSkillCardEntriesAppearsField"',
    });
  }
  const start: undefined | number = val.start == void 0 ? void 0 : val.start;
  if (!(val.end == void 0) && !sdIsNumber(val.end)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "end" of type "TimelineSkillCardEntriesAppearsField"',
    });
  }
  const end: undefined | number = val.end == void 0 ? void 0 : val.end;
  return {
    start: start,
    end: end,
  } satisfies TimelineSkillCardEntriesAppearsField;
}
export function serializeTimelineSkillCardEntriesField(
  val: TimelineSkillCardEntriesField,
): SerializedData {
  return {
    ['text']: val.text,
    ['appears']:
      val.appears == void 0
        ? val.appears
        : (val.appears.map(function (
            item: TimelineSkillCardEntriesAppearsField,
          ): SerializedData {
            return serializeTimelineSkillCardEntriesAppearsField(item);
          }) as readonly any[]),
    ['image_url']: val.imageUrl,
  };
}
export function deserializeTimelineSkillCardEntriesField(
  val: SerializedData,
): TimelineSkillCardEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardEntriesField"',
    });
  }
  if (!(val.text == void 0) && !sdIsString(val.text)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "text" of type "TimelineSkillCardEntriesField"',
    });
  }
  const text: undefined | string = val.text == void 0 ? void 0 : val.text;
  if (!(val.appears == void 0) && !sdIsList(val.appears)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "appears" of type "TimelineSkillCardEntriesField"',
    });
  }
  const appears: undefined | readonly TimelineSkillCardEntriesAppearsField[] =
    val.appears == void 0
      ? void 0
      : sdIsList(val.appears)
        ? (val.appears.map(function (
            itm: SerializedData,
          ): TimelineSkillCardEntriesAppearsField {
            return deserializeTimelineSkillCardEntriesAppearsField(itm);
          }) as readonly any[])
        : [];
  if (!(val.image_url == void 0) && !sdIsString(val.image_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "image_url" of type "TimelineSkillCardEntriesField"',
    });
  }
  const imageUrl: undefined | string =
    val.image_url == void 0 ? void 0 : val.image_url;
  return {
    text: text,
    appears: appears,
    imageUrl: imageUrl,
  } satisfies TimelineSkillCardEntriesField;
}
export function serializeTimelineSkillCard(
  val: TimelineSkillCard,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']: serializeTimelineSkillCardTypeField(val.type),
    ['skill_card_type']: serializeTimelineSkillCardSkillCardTypeField(
      val.skillCardType,
    ),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeTimelineSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeTimelineSkillCardSkillField(val.skill),
    ['invocation']: serializeTimelineSkillCardInvocationField(val.invocation),
    ['duration']: val.duration,
    ['entries']: val.entries.map(function (
      item: TimelineSkillCardEntriesField,
    ): SerializedData {
      return serializeTimelineSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTimelineSkillCard(
  val: SerializedData,
): TimelineSkillCard {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCard"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TimelineSkillCard"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "TimelineSkillCard" to be defined',
    });
  }
  const type: TimelineSkillCardTypeField =
    deserializeTimelineSkillCardTypeField(val.type);
  if (val.skill_card_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill_card_type" of type "TimelineSkillCard" to be defined',
    });
  }
  const skillCardType: TimelineSkillCardSkillCardTypeField =
    deserializeTimelineSkillCardSkillCardTypeField(val.skill_card_type);
  const skillCardTitle: undefined | TimelineSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeTimelineSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "skill" of type "TimelineSkillCard" to be defined',
    });
  }
  const skill: TimelineSkillCardSkillField =
    deserializeTimelineSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "TimelineSkillCard" to be defined',
    });
  }
  const invocation: TimelineSkillCardInvocationField =
    deserializeTimelineSkillCardInvocationField(val.invocation);
  if (!(val.duration == void 0) && !sdIsNumber(val.duration)) {
    throw new BoxSdkError({
      message: 'Expecting number for "duration" of type "TimelineSkillCard"',
    });
  }
  const duration: undefined | number =
    val.duration == void 0 ? void 0 : val.duration;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "entries" of type "TimelineSkillCard" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "TimelineSkillCard"',
    });
  }
  const entries: readonly TimelineSkillCardEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TimelineSkillCardEntriesField {
        return deserializeTimelineSkillCardEntriesField(itm);
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
  } satisfies TimelineSkillCard;
}
export function serializeTimelineSkillCardInput(
  val: TimelineSkillCardInput,
): SerializedData {
  return {
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTimelineSkillCardTypeField(val.type),
    ['skillCardType']:
      val.skillCardType == void 0
        ? val.skillCardType
        : serializeTimelineSkillCardSkillCardTypeField(val.skillCardType),
    ['skill_card_title']:
      val.skillCardTitle == void 0
        ? val.skillCardTitle
        : serializeTimelineSkillCardSkillCardTitleField(val.skillCardTitle),
    ['skill']: serializeTimelineSkillCardSkillField(val.skill),
    ['invocation']: serializeTimelineSkillCardInvocationField(val.invocation),
    ['duration']: val.duration,
    ['entries']: val.entries.map(function (
      item: TimelineSkillCardEntriesField,
    ): SerializedData {
      return serializeTimelineSkillCardEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTimelineSkillCardInput(
  val: SerializedData,
): TimelineSkillCardInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TimelineSkillCardInput"',
    });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TimelineSkillCardInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const type: undefined | TimelineSkillCardTypeField =
    val.type == void 0
      ? void 0
      : deserializeTimelineSkillCardTypeField(val.type);
  const skillCardType: undefined | TimelineSkillCardSkillCardTypeField =
    val.skillCardType == void 0
      ? void 0
      : deserializeTimelineSkillCardSkillCardTypeField(val.skillCardType);
  const skillCardTitle: undefined | TimelineSkillCardSkillCardTitleField =
    val.skill_card_title == void 0
      ? void 0
      : deserializeTimelineSkillCardSkillCardTitleField(val.skill_card_title);
  if (val.skill == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "skill" of type "TimelineSkillCardInput" to be defined',
    });
  }
  const skill: TimelineSkillCardSkillField =
    deserializeTimelineSkillCardSkillField(val.skill);
  if (val.invocation == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "invocation" of type "TimelineSkillCardInput" to be defined',
    });
  }
  const invocation: TimelineSkillCardInvocationField =
    deserializeTimelineSkillCardInvocationField(val.invocation);
  if (!(val.duration == void 0) && !sdIsNumber(val.duration)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "duration" of type "TimelineSkillCardInput"',
    });
  }
  const duration: undefined | number =
    val.duration == void 0 ? void 0 : val.duration;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TimelineSkillCardInput" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "TimelineSkillCardInput"',
    });
  }
  const entries: readonly TimelineSkillCardEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TimelineSkillCardEntriesField {
        return deserializeTimelineSkillCardEntriesField(itm);
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
  } satisfies TimelineSkillCardInput;
}
