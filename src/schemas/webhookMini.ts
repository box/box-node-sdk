import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type WebhookMiniTypeField = 'webhook';
export type WebhookMiniTargetTypeField = 'file' | 'folder';
export interface WebhookMiniTargetField {
  /**
   * The ID of the item to trigger a webhook. */
  readonly id?: string;
  /**
   * The type of item to trigger a webhook. */
  readonly type?: WebhookMiniTargetTypeField;
  readonly rawData?: SerializedData;
}
export interface WebhookMini {
  /**
   * The unique identifier for this webhook. */
  readonly id?: string;
  /**
   * The value will always be `webhook`. */
  readonly type?: WebhookMiniTypeField;
  /**
   * The item that will trigger the webhook. */
  readonly target?: WebhookMiniTargetField;
  readonly rawData?: SerializedData;
}
export function serializeWebhookMiniTypeField(
  val: WebhookMiniTypeField,
): SerializedData {
  return val;
}
export function deserializeWebhookMiniTypeField(
  val: SerializedData,
): WebhookMiniTypeField {
  if (val == 'webhook') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize WebhookMiniTypeField" });
}
export function serializeWebhookMiniTargetTypeField(
  val: WebhookMiniTargetTypeField,
): SerializedData {
  return val;
}
export function deserializeWebhookMiniTargetTypeField(
  val: SerializedData,
): WebhookMiniTargetTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebhookMiniTargetTypeField",
  });
}
export function serializeWebhookMiniTargetField(
  val: WebhookMiniTargetField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWebhookMiniTargetTypeField(val.type),
  };
}
export function deserializeWebhookMiniTargetField(
  val: SerializedData,
): WebhookMiniTargetField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebhookMiniTargetField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebhookMiniTargetField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WebhookMiniTargetTypeField =
    val.type == void 0
      ? void 0
      : deserializeWebhookMiniTargetTypeField(val.type);
  return { id: id, type: type } satisfies WebhookMiniTargetField;
}
export function serializeWebhookMini(val: WebhookMini): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeWebhookMiniTypeField(val.type),
    ['target']:
      val.target == void 0
        ? val.target
        : serializeWebhookMiniTargetField(val.target),
  };
}
export function deserializeWebhookMini(val: SerializedData): WebhookMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebhookMini"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebhookMini"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WebhookMiniTypeField =
    val.type == void 0 ? void 0 : deserializeWebhookMiniTypeField(val.type);
  const target: undefined | WebhookMiniTargetField =
    val.target == void 0
      ? void 0
      : deserializeWebhookMiniTargetField(val.target);
  return { id: id, type: type, target: target } satisfies WebhookMini;
}
