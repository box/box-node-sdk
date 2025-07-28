import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type ShieldListContentCountryV2025R0TypeField = 'country';
export class ShieldListContentCountryV2025R0 {
  /**
   * The type of content in the shield list. */
  readonly type: ShieldListContentCountryV2025R0TypeField =
    'country' as ShieldListContentCountryV2025R0TypeField;
  /**
   * List of country codes values. */
  readonly countryCodes!: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListContentCountryV2025R0, 'type'> &
      Partial<Pick<ShieldListContentCountryV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.countryCodes !== undefined) {
      this.countryCodes = fields.countryCodes;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListContentCountryV2025R0Input {
  /**
   * The type of content in the shield list. */
  readonly type?: ShieldListContentCountryV2025R0TypeField;
  /**
   * List of country codes values. */
  readonly countryCodes: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShieldListContentCountryV2025R0TypeField(
  val: ShieldListContentCountryV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListContentCountryV2025R0TypeField(
  val: SerializedData,
): ShieldListContentCountryV2025R0TypeField {
  if (val == 'country') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListContentCountryV2025R0TypeField",
  });
}
export function serializeShieldListContentCountryV2025R0(
  val: ShieldListContentCountryV2025R0,
): SerializedData {
  return {
    ['type']: serializeShieldListContentCountryV2025R0TypeField(val.type),
    ['country_codes']: val.countryCodes.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentCountryV2025R0(
  val: SerializedData,
): ShieldListContentCountryV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentCountryV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShieldListContentCountryV2025R0" to be defined',
    });
  }
  const type: ShieldListContentCountryV2025R0TypeField =
    deserializeShieldListContentCountryV2025R0TypeField(val.type);
  if (val.country_codes == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "country_codes" of type "ShieldListContentCountryV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.country_codes)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "country_codes" of type "ShieldListContentCountryV2025R0"',
    });
  }
  const countryCodes: readonly string[] = sdIsList(val.country_codes)
    ? (val.country_codes.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShieldListContentCountryV2025R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    countryCodes: countryCodes,
  } satisfies ShieldListContentCountryV2025R0;
}
export function serializeShieldListContentCountryV2025R0Input(
  val: ShieldListContentCountryV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListContentCountryV2025R0TypeField(val.type),
    ['country_codes']: val.countryCodes.map(function (
      item: string,
    ): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentCountryV2025R0Input(
  val: SerializedData,
): ShieldListContentCountryV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentCountryV2025R0Input"',
    });
  }
  const type: undefined | ShieldListContentCountryV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListContentCountryV2025R0TypeField(val.type);
  if (val.country_codes == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "country_codes" of type "ShieldListContentCountryV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.country_codes)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "country_codes" of type "ShieldListContentCountryV2025R0Input"',
    });
  }
  const countryCodes: readonly string[] = sdIsList(val.country_codes)
    ? (val.country_codes.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message:
              'Expecting string for "ShieldListContentCountryV2025R0Input"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    countryCodes: countryCodes,
  } satisfies ShieldListContentCountryV2025R0Input;
}
