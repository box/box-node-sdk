import { serializeDevicePinner } from './devicePinner.generated.js';
import { deserializeDevicePinner } from './devicePinner.generated.js';
import { DevicePinner } from './devicePinner.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type DevicePinnersOrderByField = 'id' | string;
export type DevicePinnersOrderDirectionField = 'asc' | 'desc' | string;
export interface DevicePinnersOrderField {
  /**
   * The field that is ordered by. */
  readonly by?: DevicePinnersOrderByField;
  /**
   * The direction to order by, either ascending or descending. */
  readonly direction?: DevicePinnersOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface DevicePinners {
  /**
   * A list of device pins. */
  readonly entries?: readonly DevicePinner[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: number;
  /**
   * The order by which items are returned. */
  readonly order?: readonly DevicePinnersOrderField[];
  readonly rawData?: SerializedData;
}
export function serializeDevicePinnersOrderByField(
  val: DevicePinnersOrderByField,
): SerializedData {
  return val;
}
export function deserializeDevicePinnersOrderByField(
  val: SerializedData,
): DevicePinnersOrderByField {
  if (val == 'id') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DevicePinnersOrderByField",
  });
}
export function serializeDevicePinnersOrderDirectionField(
  val: DevicePinnersOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeDevicePinnersOrderDirectionField(
  val: SerializedData,
): DevicePinnersOrderDirectionField {
  if (val == 'asc') {
    return val;
  }
  if (val == 'desc') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DevicePinnersOrderDirectionField",
  });
}
export function serializeDevicePinnersOrderField(
  val: DevicePinnersOrderField,
): SerializedData {
  return {
    ['by']:
      val.by == void 0 ? val.by : serializeDevicePinnersOrderByField(val.by),
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeDevicePinnersOrderDirectionField(val.direction),
  };
}
export function deserializeDevicePinnersOrderField(
  val: SerializedData,
): DevicePinnersOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DevicePinnersOrderField"',
    });
  }
  const by: undefined | DevicePinnersOrderByField =
    val.by == void 0 ? void 0 : deserializeDevicePinnersOrderByField(val.by);
  const direction: undefined | DevicePinnersOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeDevicePinnersOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies DevicePinnersOrderField;
}
export function serializeDevicePinners(val: DevicePinners): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: DevicePinner): SerializedData {
            return serializeDevicePinner(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (
            item: DevicePinnersOrderField,
          ): SerializedData {
            return serializeDevicePinnersOrderField(item);
          }) as readonly any[]),
  };
}
export function deserializeDevicePinners(val: SerializedData): DevicePinners {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "DevicePinners"' });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "DevicePinners"',
    });
  }
  const entries: undefined | readonly DevicePinner[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): DevicePinner {
            return deserializeDevicePinner(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "DevicePinners"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsNumber(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting number for "next_marker" of type "DevicePinners"',
    });
  }
  const nextMarker: undefined | number =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "DevicePinners"',
    });
  }
  const order: undefined | readonly DevicePinnersOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (
            itm: SerializedData,
          ): DevicePinnersOrderField {
            return deserializeDevicePinnersOrderField(itm);
          }) as readonly any[])
        : [];
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
    order: order,
  } satisfies DevicePinners;
}
