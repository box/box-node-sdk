import { serializeHubDocumentPageV2025R0 } from './hubDocumentPageV2025R0';
import { deserializeHubDocumentPageV2025R0 } from './hubDocumentPageV2025R0';
import { HubDocumentPageV2025R0 } from './hubDocumentPageV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubDocumentPagesV2025R0TypeField = 'document_pages';
export class HubDocumentPagesV2025R0 {
  /**
   * Ordered list of pages. */
  readonly entries!: readonly HubDocumentPageV2025R0[];
  /**
   * The value will always be `document_pages`. */
  readonly type: HubDocumentPagesV2025R0TypeField =
    'document_pages' as HubDocumentPagesV2025R0TypeField;
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
    fields: Omit<HubDocumentPagesV2025R0, 'type'> &
      Partial<Pick<HubDocumentPagesV2025R0, 'type'>>,
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
export interface HubDocumentPagesV2025R0Input {
  /**
   * Ordered list of pages. */
  readonly entries: readonly HubDocumentPageV2025R0[];
  /**
   * The value will always be `document_pages`. */
  readonly type?: HubDocumentPagesV2025R0TypeField;
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
export function serializeHubDocumentPagesV2025R0TypeField(
  val: HubDocumentPagesV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubDocumentPagesV2025R0TypeField(
  val: SerializedData,
): HubDocumentPagesV2025R0TypeField {
  if (val == 'document_pages') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubDocumentPagesV2025R0TypeField",
  });
}
export function serializeHubDocumentPagesV2025R0(
  val: HubDocumentPagesV2025R0,
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: HubDocumentPageV2025R0,
    ): SerializedData {
      return serializeHubDocumentPageV2025R0(item);
    }) as readonly any[],
    ['type']: serializeHubDocumentPagesV2025R0TypeField(val.type),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeHubDocumentPagesV2025R0(
  val: SerializedData,
): HubDocumentPagesV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentPagesV2025R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "HubDocumentPagesV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "HubDocumentPagesV2025R0"',
    });
  }
  const entries: readonly HubDocumentPageV2025R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): HubDocumentPageV2025R0 {
        return deserializeHubDocumentPageV2025R0(itm);
      }) as readonly any[])
    : [];
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubDocumentPagesV2025R0" to be defined',
    });
  }
  const type: HubDocumentPagesV2025R0TypeField =
    deserializeHubDocumentPagesV2025R0TypeField(val.type);
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "HubDocumentPagesV2025R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "HubDocumentPagesV2025R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    type: type,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies HubDocumentPagesV2025R0;
}
export function serializeHubDocumentPagesV2025R0Input(
  val: HubDocumentPagesV2025R0Input,
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: HubDocumentPageV2025R0,
    ): SerializedData {
      return serializeHubDocumentPageV2025R0(item);
    }) as readonly any[],
    ['type']:
      val.type == void 0
        ? val.type
        : serializeHubDocumentPagesV2025R0TypeField(val.type),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeHubDocumentPagesV2025R0Input(
  val: SerializedData,
): HubDocumentPagesV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentPagesV2025R0Input"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "HubDocumentPagesV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "HubDocumentPagesV2025R0Input"',
    });
  }
  const entries: readonly HubDocumentPageV2025R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): HubDocumentPageV2025R0 {
        return deserializeHubDocumentPageV2025R0(itm);
      }) as readonly any[])
    : [];
  const type: undefined | HubDocumentPagesV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeHubDocumentPagesV2025R0TypeField(val.type);
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "HubDocumentPagesV2025R0Input"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "HubDocumentPagesV2025R0Input"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    type: type,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies HubDocumentPagesV2025R0Input;
}
