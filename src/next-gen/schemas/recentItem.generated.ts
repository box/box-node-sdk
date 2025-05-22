import { serializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { deserializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type RecentItemInteractionTypeField =
  | 'item_preview'
  | 'item_upload'
  | 'item_comment'
  | 'item_open'
  | 'item_modify'
  | string;
export interface RecentItem {
  /**
   * `recent_item` */
  readonly type?: string;
  readonly item?: FileFullOrFolderFullOrWebLink;
  /**
   * The most recent type of access the user performed on
   * the item. */
  readonly interactionType?: RecentItemInteractionTypeField;
  /**
   * The time of the most recent interaction. */
  readonly interactedAt?: DateTime;
  /**
   * If the item was accessed through a shared link it will appear here,
   * otherwise this will be null. */
  readonly interactionSharedLink?: string;
  readonly rawData?: SerializedData;
}
export function serializeRecentItemInteractionTypeField(
  val: RecentItemInteractionTypeField,
): SerializedData {
  return val;
}
export function deserializeRecentItemInteractionTypeField(
  val: SerializedData,
): RecentItemInteractionTypeField {
  if (val == 'item_preview') {
    return val;
  }
  if (val == 'item_upload') {
    return val;
  }
  if (val == 'item_comment') {
    return val;
  }
  if (val == 'item_open') {
    return val;
  }
  if (val == 'item_modify') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RecentItemInteractionTypeField",
  });
}
export function serializeRecentItem(val: RecentItem): SerializedData {
  return {
    ['type']: val.type,
    ['item']:
      val.item == void 0
        ? val.item
        : serializeFileFullOrFolderFullOrWebLink(val.item),
    ['interaction_type']:
      val.interactionType == void 0
        ? val.interactionType
        : serializeRecentItemInteractionTypeField(val.interactionType),
    ['interacted_at']:
      val.interactedAt == void 0
        ? val.interactedAt
        : serializeDateTime(val.interactedAt),
    ['interaction_shared_link']: val.interactionSharedLink,
  };
}
export function deserializeRecentItem(val: SerializedData): RecentItem {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RecentItem"' });
  }
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "RecentItem"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  const item: undefined | FileFullOrFolderFullOrWebLink =
    val.item == void 0
      ? void 0
      : deserializeFileFullOrFolderFullOrWebLink(val.item);
  const interactionType: undefined | RecentItemInteractionTypeField =
    val.interaction_type == void 0
      ? void 0
      : deserializeRecentItemInteractionTypeField(val.interaction_type);
  if (!(val.interacted_at == void 0) && !sdIsString(val.interacted_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "interacted_at" of type "RecentItem"',
    });
  }
  const interactedAt: undefined | DateTime =
    val.interacted_at == void 0
      ? void 0
      : deserializeDateTime(val.interacted_at);
  if (
    !(val.interaction_shared_link == void 0) &&
    !sdIsString(val.interaction_shared_link)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "interaction_shared_link" of type "RecentItem"',
    });
  }
  const interactionSharedLink: undefined | string =
    val.interaction_shared_link == void 0
      ? void 0
      : val.interaction_shared_link;
  return {
    type: type,
    item: item,
    interactionType: interactionType,
    interactedAt: interactedAt,
    interactionSharedLink: interactionSharedLink,
  } satisfies RecentItem;
}
