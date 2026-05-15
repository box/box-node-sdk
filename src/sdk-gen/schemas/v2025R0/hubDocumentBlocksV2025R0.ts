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
import { serializeHubDocumentBlockEntryV2025R0 } from './hubDocumentBlockEntryV2025R0';
import { deserializeHubDocumentBlockEntryV2025R0 } from './hubDocumentBlockEntryV2025R0';
import { HubParagraphTextBlockV2025R0 } from './hubParagraphTextBlockV2025R0';
import { HubSectionTitleTextBlockV2025R0 } from './hubSectionTitleTextBlockV2025R0';
import { HubCalloutBoxTextBlockV2025R0 } from './hubCalloutBoxTextBlockV2025R0';
import { HubItemListBlockV2025R0 } from './hubItemListBlockV2025R0';
import { HubDividerBlockV2025R0 } from './hubDividerBlockV2025R0';
import { HubDocumentBlockEntryV2025R0 } from './hubDocumentBlockEntryV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubDocumentBlocksV2025R0TypeField = 'document_blocks';
export class HubDocumentBlocksV2025R0 {
  /**
   * Ordered list of blocks. */
  readonly entries!: readonly HubDocumentBlockEntryV2025R0[];
  /**
   * The value will always be `document_blocks`. */
  readonly type: HubDocumentBlocksV2025R0TypeField =
    'document_blocks' as HubDocumentBlocksV2025R0TypeField;
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<HubDocumentBlocksV2025R0, 'type'> &
      Partial<Pick<HubDocumentBlocksV2025R0, 'type'>>
  ) {
    if (fields.entries !== undefined) {
      this.entries = fields.entries;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.limit !== undefined) {
      this.limit = fields.limit;
    }
    if (fields.nextMarker !== undefined) {
      this.nextMarker = fields.nextMarker;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface HubDocumentBlocksV2025R0Input {
  /**
   * Ordered list of blocks. */
  readonly entries: readonly HubDocumentBlockEntryV2025R0[];
  /**
   * The value will always be `document_blocks`. */
  readonly type?: HubDocumentBlocksV2025R0TypeField;
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeHubDocumentBlocksV2025R0TypeField(
  val: HubDocumentBlocksV2025R0TypeField
): SerializedData {
  return val;
}
export function deserializeHubDocumentBlocksV2025R0TypeField(
  val: SerializedData
): HubDocumentBlocksV2025R0TypeField {
  if (val == 'document_blocks') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubDocumentBlocksV2025R0TypeField",
  });
}
export function serializeHubDocumentBlocksV2025R0(
  val: HubDocumentBlocksV2025R0
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: HubDocumentBlockEntryV2025R0
    ): SerializedData {
      return serializeHubDocumentBlockEntryV2025R0(item);
    }) as readonly any[],
    ['type']: serializeHubDocumentBlocksV2025R0TypeField(val.type),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeHubDocumentBlocksV2025R0(
  val: SerializedData
): HubDocumentBlocksV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentBlocksV2025R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "HubDocumentBlocksV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "HubDocumentBlocksV2025R0"',
    });
  }
  const entries: readonly HubDocumentBlockEntryV2025R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData
      ): HubDocumentBlockEntryV2025R0 {
        return deserializeHubDocumentBlockEntryV2025R0(itm);
      }) as readonly any[])
    : [];
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubDocumentBlocksV2025R0" to be defined',
    });
  }
  const type: HubDocumentBlocksV2025R0TypeField =
    deserializeHubDocumentBlocksV2025R0TypeField(val.type);
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "HubDocumentBlocksV2025R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "HubDocumentBlocksV2025R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    type: type,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies HubDocumentBlocksV2025R0;
}
export function serializeHubDocumentBlocksV2025R0Input(
  val: HubDocumentBlocksV2025R0Input
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: HubDocumentBlockEntryV2025R0
    ): SerializedData {
      return serializeHubDocumentBlockEntryV2025R0(item);
    }) as readonly any[],
    ['type']:
      val.type == void 0
        ? val.type
        : serializeHubDocumentBlocksV2025R0TypeField(val.type),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeHubDocumentBlocksV2025R0Input(
  val: SerializedData
): HubDocumentBlocksV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentBlocksV2025R0Input"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "HubDocumentBlocksV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "HubDocumentBlocksV2025R0Input"',
    });
  }
  const entries: readonly HubDocumentBlockEntryV2025R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData
      ): HubDocumentBlockEntryV2025R0 {
        return deserializeHubDocumentBlockEntryV2025R0(itm);
      }) as readonly any[])
    : [];
  const type: undefined | HubDocumentBlocksV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeHubDocumentBlocksV2025R0TypeField(val.type);
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "HubDocumentBlocksV2025R0Input"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "HubDocumentBlocksV2025R0Input"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    type: type,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies HubDocumentBlocksV2025R0Input;
}
