import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShieldListContentEmailV2025R0TypeField = 'email';
export class ShieldListContentEmailV2025R0 {
  /**
   * The type of content in the shield list. */
  readonly type: ShieldListContentEmailV2025R0TypeField =
    'email' as ShieldListContentEmailV2025R0TypeField;
  /**
   * List of emails. */
  readonly emailAddresses!: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListContentEmailV2025R0, 'type'> &
      Partial<Pick<ShieldListContentEmailV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.emailAddresses !== undefined) {
      this.emailAddresses = fields.emailAddresses;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListContentEmailV2025R0Input {
  /**
   * The type of content in the shield list. */
  readonly type?: ShieldListContentEmailV2025R0TypeField;
  /**
   * List of emails. */
  readonly emailAddresses: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShieldListContentEmailV2025R0TypeField(
  val: ShieldListContentEmailV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListContentEmailV2025R0TypeField(
  val: SerializedData,
): ShieldListContentEmailV2025R0TypeField {
  if (val == 'email') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListContentEmailV2025R0TypeField",
  });
}
export function serializeShieldListContentEmailV2025R0(
  val: ShieldListContentEmailV2025R0,
): SerializedData {
  return {
    ['type']: serializeShieldListContentEmailV2025R0TypeField(val.type),
    ['email_addresses']: val.emailAddresses.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentEmailV2025R0(
  val: SerializedData,
): ShieldListContentEmailV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentEmailV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShieldListContentEmailV2025R0" to be defined',
    });
  }
  const type: ShieldListContentEmailV2025R0TypeField =
    deserializeShieldListContentEmailV2025R0TypeField(val.type);
  if (val.email_addresses == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "email_addresses" of type "ShieldListContentEmailV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.email_addresses)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "email_addresses" of type "ShieldListContentEmailV2025R0"',
    });
  }
  const emailAddresses: readonly string[] = sdIsList(val.email_addresses)
    ? (val.email_addresses.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShieldListContentEmailV2025R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    emailAddresses: emailAddresses,
  } satisfies ShieldListContentEmailV2025R0;
}
export function serializeShieldListContentEmailV2025R0Input(
  val: ShieldListContentEmailV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListContentEmailV2025R0TypeField(val.type),
    ['email_addresses']: val.emailAddresses.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentEmailV2025R0Input(
  val: SerializedData,
): ShieldListContentEmailV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentEmailV2025R0Input"',
    });
  }
  const type: undefined | ShieldListContentEmailV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListContentEmailV2025R0TypeField(val.type);
  if (val.email_addresses == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "email_addresses" of type "ShieldListContentEmailV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.email_addresses)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "email_addresses" of type "ShieldListContentEmailV2025R0Input"',
    });
  }
  const emailAddresses: readonly string[] = sdIsList(val.email_addresses)
    ? (val.email_addresses.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message:
              'Expecting string for "ShieldListContentEmailV2025R0Input"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    emailAddresses: emailAddresses,
  } satisfies ShieldListContentEmailV2025R0Input;
}
