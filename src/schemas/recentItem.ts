import { serializeFileFull } from './fileFull';
import { deserializeFileFull } from './fileFull';
import { serializeFolderFull } from './folderFull';
import { deserializeFolderFull } from './folderFull';
import { serializeWebLink } from './webLink';
import { deserializeWebLink } from './webLink';
import { serializeRecentItemResource } from './recentItemResource';
import { deserializeRecentItemResource } from './recentItemResource';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { FileFull } from './fileFull';
import { FolderFull } from './folderFull';
import { WebLink } from './webLink';
import { RecentItemResource } from './recentItemResource';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type RecentItemInteractionTypeField =
  | 'item_preview'
  | 'item_upload'
  | 'item_comment'
  | 'item_open'
  | 'item_modify'
  | string;
export interface RecentItem {
  /**
   * The value will always be `recent_item`. */
  readonly type?: string;
  readonly item?: RecentItemResource;
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
      val.item == void 0 ? val.item : serializeRecentItemResource(val.item),
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
  const item: undefined | RecentItemResource =
    val.item == void 0 ? void 0 : deserializeRecentItemResource(val.item);
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
