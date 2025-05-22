import { serializeWebhookMiniTypeField } from './webhookMini.generated.js';
import { deserializeWebhookMiniTypeField } from './webhookMini.generated.js';
import { serializeWebhookMiniTargetField } from './webhookMini.generated.js';
import { deserializeWebhookMiniTargetField } from './webhookMini.generated.js';
import { serializeWebhookMini } from './webhookMini.generated.js';
import { deserializeWebhookMini } from './webhookMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { WebhookMiniTypeField } from './webhookMini.generated.js';
import { WebhookMiniTargetField } from './webhookMini.generated.js';
import { WebhookMini } from './webhookMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type WebhookTriggersField =
  | 'FILE.UPLOADED'
  | 'FILE.PREVIEWED'
  | 'FILE.DOWNLOADED'
  | 'FILE.TRASHED'
  | 'FILE.DELETED'
  | 'FILE.RESTORED'
  | 'FILE.COPIED'
  | 'FILE.MOVED'
  | 'FILE.LOCKED'
  | 'FILE.UNLOCKED'
  | 'FILE.RENAMED'
  | 'COMMENT.CREATED'
  | 'COMMENT.UPDATED'
  | 'COMMENT.DELETED'
  | 'TASK_ASSIGNMENT.CREATED'
  | 'TASK_ASSIGNMENT.UPDATED'
  | 'METADATA_INSTANCE.CREATED'
  | 'METADATA_INSTANCE.UPDATED'
  | 'METADATA_INSTANCE.DELETED'
  | 'FOLDER.CREATED'
  | 'FOLDER.RENAMED'
  | 'FOLDER.DOWNLOADED'
  | 'FOLDER.RESTORED'
  | 'FOLDER.DELETED'
  | 'FOLDER.COPIED'
  | 'FOLDER.MOVED'
  | 'FOLDER.TRASHED'
  | 'WEBHOOK.DELETED'
  | 'COLLABORATION.CREATED'
  | 'COLLABORATION.ACCEPTED'
  | 'COLLABORATION.REJECTED'
  | 'COLLABORATION.REMOVED'
  | 'COLLABORATION.UPDATED'
  | 'SHARED_LINK.DELETED'
  | 'SHARED_LINK.CREATED'
  | 'SHARED_LINK.UPDATED'
  | 'SIGN_REQUEST.COMPLETED'
  | 'SIGN_REQUEST.DECLINED'
  | 'SIGN_REQUEST.EXPIRED'
  | 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED'
  | string;
export type Webhook = WebhookMini & {
  readonly createdBy?: UserMini;
  /**
   * A timestamp identifying the time that
   * the webhook was created. */
  readonly createdAt?: DateTime;
  /**
   * The URL that is notified by this webhook */
  readonly address?: string;
  /**
   * An array of event names that this webhook is
   * to be triggered for */
  readonly triggers?: readonly WebhookTriggersField[];
};
export function serializeWebhookTriggersField(
  val: WebhookTriggersField,
): SerializedData {
  return val;
}
export function deserializeWebhookTriggersField(
  val: SerializedData,
): WebhookTriggersField {
  if (val == 'FILE.UPLOADED') {
    return val;
  }
  if (val == 'FILE.PREVIEWED') {
    return val;
  }
  if (val == 'FILE.DOWNLOADED') {
    return val;
  }
  if (val == 'FILE.TRASHED') {
    return val;
  }
  if (val == 'FILE.DELETED') {
    return val;
  }
  if (val == 'FILE.RESTORED') {
    return val;
  }
  if (val == 'FILE.COPIED') {
    return val;
  }
  if (val == 'FILE.MOVED') {
    return val;
  }
  if (val == 'FILE.LOCKED') {
    return val;
  }
  if (val == 'FILE.UNLOCKED') {
    return val;
  }
  if (val == 'FILE.RENAMED') {
    return val;
  }
  if (val == 'COMMENT.CREATED') {
    return val;
  }
  if (val == 'COMMENT.UPDATED') {
    return val;
  }
  if (val == 'COMMENT.DELETED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.CREATED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.CREATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.DELETED') {
    return val;
  }
  if (val == 'FOLDER.CREATED') {
    return val;
  }
  if (val == 'FOLDER.RENAMED') {
    return val;
  }
  if (val == 'FOLDER.DOWNLOADED') {
    return val;
  }
  if (val == 'FOLDER.RESTORED') {
    return val;
  }
  if (val == 'FOLDER.DELETED') {
    return val;
  }
  if (val == 'FOLDER.COPIED') {
    return val;
  }
  if (val == 'FOLDER.MOVED') {
    return val;
  }
  if (val == 'FOLDER.TRASHED') {
    return val;
  }
  if (val == 'WEBHOOK.DELETED') {
    return val;
  }
  if (val == 'COLLABORATION.CREATED') {
    return val;
  }
  if (val == 'COLLABORATION.ACCEPTED') {
    return val;
  }
  if (val == 'COLLABORATION.REJECTED') {
    return val;
  }
  if (val == 'COLLABORATION.REMOVED') {
    return val;
  }
  if (val == 'COLLABORATION.UPDATED') {
    return val;
  }
  if (val == 'SHARED_LINK.DELETED') {
    return val;
  }
  if (val == 'SHARED_LINK.CREATED') {
    return val;
  }
  if (val == 'SHARED_LINK.UPDATED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.COMPLETED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.DECLINED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.EXPIRED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize WebhookTriggersField" });
}
export function serializeWebhook(val: Webhook): SerializedData {
  const base: any = serializeWebhookMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Webhook"' });
  }
  return {
    ...base,
    ...{
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserMini(val.createdBy),
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['address']: val.address,
      ['triggers']:
        val.triggers == void 0
          ? val.triggers
          : (val.triggers.map(function (
              item: WebhookTriggersField,
            ): SerializedData {
              return serializeWebhookTriggersField(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeWebhook(val: SerializedData): Webhook {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Webhook"' });
  }
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Webhook"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.address == void 0) && !sdIsString(val.address)) {
    throw new BoxSdkError({
      message: 'Expecting string for "address" of type "Webhook"',
    });
  }
  const address: undefined | string =
    val.address == void 0 ? void 0 : val.address;
  if (!(val.triggers == void 0) && !sdIsList(val.triggers)) {
    throw new BoxSdkError({
      message: 'Expecting array for "triggers" of type "Webhook"',
    });
  }
  const triggers: undefined | readonly WebhookTriggersField[] =
    val.triggers == void 0
      ? void 0
      : sdIsList(val.triggers)
        ? (val.triggers.map(function (
            itm: SerializedData,
          ): WebhookTriggersField {
            return deserializeWebhookTriggersField(itm);
          }) as readonly any[])
        : [];
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Webhook"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WebhookMiniTypeField =
    val.type == void 0 ? void 0 : deserializeWebhookMiniTypeField(val.type);
  const target: undefined | WebhookMiniTargetField =
    val.target == void 0
      ? void 0
      : deserializeWebhookMiniTargetField(val.target);
  return {
    createdBy: createdBy,
    createdAt: createdAt,
    address: address,
    triggers: triggers,
    id: id,
    type: type,
    target: target,
  } satisfies Webhook;
}
