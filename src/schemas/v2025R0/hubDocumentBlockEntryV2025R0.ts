import { serializeHubParagraphTextBlockV2025R0 } from './hubParagraphTextBlockV2025R0';
import { deserializeHubParagraphTextBlockV2025R0 } from './hubParagraphTextBlockV2025R0';
import { serializeHubSectionTitleTextBlockV2025R0 } from './hubSectionTitleTextBlockV2025R0';
import { deserializeHubSectionTitleTextBlockV2025R0 } from './hubSectionTitleTextBlockV2025R0';
import { serializeHubCalloutBoxTextBlockV2025R0 } from './hubCalloutBoxTextBlockV2025R0';
import { deserializeHubCalloutBoxTextBlockV2025R0 } from './hubCalloutBoxTextBlockV2025R0';
import { serializeHubItemListBlockV2025R0 } from './hubItemListBlockV2025R0';
import { deserializeHubItemListBlockV2025R0 } from './hubItemListBlockV2025R0';
import { serializeHubDividerBlockV2025R0 } from './hubDividerBlockV2025R0';
import { deserializeHubDividerBlockV2025R0 } from './hubDividerBlockV2025R0';
import { HubParagraphTextBlockV2025R0 } from './hubParagraphTextBlockV2025R0';
import { HubSectionTitleTextBlockV2025R0 } from './hubSectionTitleTextBlockV2025R0';
import { HubCalloutBoxTextBlockV2025R0 } from './hubCalloutBoxTextBlockV2025R0';
import { HubItemListBlockV2025R0 } from './hubItemListBlockV2025R0';
import { HubDividerBlockV2025R0 } from './hubDividerBlockV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubDocumentBlockEntryV2025R0 =
  | HubParagraphTextBlockV2025R0
  | HubSectionTitleTextBlockV2025R0
  | HubCalloutBoxTextBlockV2025R0
  | HubItemListBlockV2025R0
  | HubDividerBlockV2025R0;
export function serializeHubDocumentBlockEntryV2025R0(
  val: any,
): SerializedData {
  if (val.type == 'paragraph') {
    return serializeHubParagraphTextBlockV2025R0(val);
  }
  if (val.type == 'section_title') {
    return serializeHubSectionTitleTextBlockV2025R0(val);
  }
  if (val.type == 'callout_box') {
    return serializeHubCalloutBoxTextBlockV2025R0(val);
  }
  if (val.type == 'item_list') {
    return serializeHubItemListBlockV2025R0(val);
  }
  if (val.type == 'divider') {
    return serializeHubDividerBlockV2025R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeHubDocumentBlockEntryV2025R0(
  val: SerializedData,
): HubDocumentBlockEntryV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentBlockEntryV2025R0"',
    });
  }
  if (val.type == 'paragraph') {
    return deserializeHubParagraphTextBlockV2025R0(val);
  }
  if (val.type == 'section_title') {
    return deserializeHubSectionTitleTextBlockV2025R0(val);
  }
  if (val.type == 'callout_box') {
    return deserializeHubCalloutBoxTextBlockV2025R0(val);
  }
  if (val.type == 'item_list') {
    return deserializeHubItemListBlockV2025R0(val);
  }
  if (val.type == 'divider') {
    return deserializeHubDividerBlockV2025R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubDocumentBlockEntryV2025R0",
  });
}
