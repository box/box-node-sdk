import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShieldListContentDomainV2025R0TypeField = 'domain';
export class ShieldListContentDomainV2025R0 {
  /**
   * The type of content in the shield list. */
  readonly type: ShieldListContentDomainV2025R0TypeField =
    'domain' as ShieldListContentDomainV2025R0TypeField;
  /**
   * List of domain. */
  readonly domains!: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListContentDomainV2025R0, 'type'> &
      Partial<Pick<ShieldListContentDomainV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.domains !== undefined) {
      this.domains = fields.domains;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListContentDomainV2025R0Input {
  /**
   * The type of content in the shield list. */
  readonly type?: ShieldListContentDomainV2025R0TypeField;
  /**
   * List of domain. */
  readonly domains: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShieldListContentDomainV2025R0TypeField(
  val: ShieldListContentDomainV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListContentDomainV2025R0TypeField(
  val: SerializedData,
): ShieldListContentDomainV2025R0TypeField {
  if (val == 'domain') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListContentDomainV2025R0TypeField",
  });
}
export function serializeShieldListContentDomainV2025R0(
  val: ShieldListContentDomainV2025R0,
): SerializedData {
  return {
    ['type']: serializeShieldListContentDomainV2025R0TypeField(val.type),
    ['domains']: val.domains.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentDomainV2025R0(
  val: SerializedData,
): ShieldListContentDomainV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentDomainV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShieldListContentDomainV2025R0" to be defined',
    });
  }
  const type: ShieldListContentDomainV2025R0TypeField =
    deserializeShieldListContentDomainV2025R0TypeField(val.type);
  if (val.domains == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "domains" of type "ShieldListContentDomainV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.domains)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "domains" of type "ShieldListContentDomainV2025R0"',
    });
  }
  const domains: readonly string[] = sdIsList(val.domains)
    ? (val.domains.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShieldListContentDomainV2025R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    domains: domains,
  } satisfies ShieldListContentDomainV2025R0;
}
export function serializeShieldListContentDomainV2025R0Input(
  val: ShieldListContentDomainV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListContentDomainV2025R0TypeField(val.type),
    ['domains']: val.domains.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeShieldListContentDomainV2025R0Input(
  val: SerializedData,
): ShieldListContentDomainV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentDomainV2025R0Input"',
    });
  }
  const type: undefined | ShieldListContentDomainV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListContentDomainV2025R0TypeField(val.type);
  if (val.domains == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "domains" of type "ShieldListContentDomainV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.domains)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "domains" of type "ShieldListContentDomainV2025R0Input"',
    });
  }
  const domains: readonly string[] = sdIsList(val.domains)
    ? (val.domains.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message:
              'Expecting string for "ShieldListContentDomainV2025R0Input"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    type: type,
    domains: domains,
  } satisfies ShieldListContentDomainV2025R0Input;
}
