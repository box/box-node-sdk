import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type ShieldListContentIpV2025R0TypeField = 'ip';
export class ShieldListContentIpV2025R0 {
  /**
   * The type of content in the shield list. */
  readonly type: ShieldListContentIpV2025R0TypeField =
    'ip' as ShieldListContentIpV2025R0TypeField;
  /**
   * List of ips and cidrs. */
  readonly ipAddresses!: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListContentIpV2025R0, 'type'> &
      Partial<Pick<ShieldListContentIpV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.ipAddresses !== undefined) {
      this.ipAddresses = fields.ipAddresses;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListContentIpV2025R0Input {
  /**
   * The type of content in the shield list. */
  readonly type?: ShieldListContentIpV2025R0TypeField;
  /**
   * List of ips and cidrs. */
  readonly ipAddresses: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShieldListContentIpV2025R0TypeField(
  val: ShieldListContentIpV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListContentIpV2025R0TypeField(
  val: SerializedData,
): ShieldListContentIpV2025R0TypeField {
  if (val == 'ip') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListContentIpV2025R0TypeField",
  });
}
export function serializeShieldListContentIpV2025R0(
  val: ShieldListContentIpV2025R0,
): SerializedData {
  return {
    ['type']: serializeShieldListContentIpV2025R0TypeField(val.type),
    ['ip_addresses']: val.ipAddresses.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentIpV2025R0(
  val: SerializedData,
): ShieldListContentIpV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentIpV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShieldListContentIpV2025R0" to be defined',
    });
  }
  const type: ShieldListContentIpV2025R0TypeField =
    deserializeShieldListContentIpV2025R0TypeField(val.type);
  if (val.ip_addresses == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "ip_addresses" of type "ShieldListContentIpV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.ip_addresses)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "ip_addresses" of type "ShieldListContentIpV2025R0"',
    });
  }
  const ipAddresses: readonly string[] = sdIsList(val.ip_addresses)
    ? (val.ip_addresses.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShieldListContentIpV2025R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    ipAddresses: ipAddresses,
  } satisfies ShieldListContentIpV2025R0;
}
export function serializeShieldListContentIpV2025R0Input(
  val: ShieldListContentIpV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListContentIpV2025R0TypeField(val.type),
    ['ip_addresses']: val.ipAddresses.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentIpV2025R0Input(
  val: SerializedData,
): ShieldListContentIpV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentIpV2025R0Input"',
    });
  }
  const type: undefined | ShieldListContentIpV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListContentIpV2025R0TypeField(val.type);
  if (val.ip_addresses == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "ip_addresses" of type "ShieldListContentIpV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.ip_addresses)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "ip_addresses" of type "ShieldListContentIpV2025R0Input"',
    });
  }
  const ipAddresses: readonly string[] = sdIsList(val.ip_addresses)
    ? (val.ip_addresses.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShieldListContentIpV2025R0Input"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    ipAddresses: ipAddresses,
  } satisfies ShieldListContentIpV2025R0Input;
}
