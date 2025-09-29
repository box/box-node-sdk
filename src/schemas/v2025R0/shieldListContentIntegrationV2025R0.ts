import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShieldListContentIntegrationV2025R0TypeField = 'integration';
export interface ShieldListContentIntegrationV2025R0IntegrationsField {
  /**
   * The ID of the integration. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export class ShieldListContentIntegrationV2025R0 {
  /**
   * The type of content in the shield list. */
  readonly type: ShieldListContentIntegrationV2025R0TypeField =
    'integration' as ShieldListContentIntegrationV2025R0TypeField;
  /**
   * List of integration. */
  readonly integrations!: readonly ShieldListContentIntegrationV2025R0IntegrationsField[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShieldListContentIntegrationV2025R0, 'type'> &
      Partial<Pick<ShieldListContentIntegrationV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.integrations !== undefined) {
      this.integrations = fields.integrations;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShieldListContentIntegrationV2025R0Input {
  /**
   * The type of content in the shield list. */
  readonly type?: ShieldListContentIntegrationV2025R0TypeField;
  /**
   * List of integration. */
  readonly integrations: readonly ShieldListContentIntegrationV2025R0IntegrationsField[];
  readonly rawData?: SerializedData;
}
export function serializeShieldListContentIntegrationV2025R0TypeField(
  val: ShieldListContentIntegrationV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShieldListContentIntegrationV2025R0TypeField(
  val: SerializedData,
): ShieldListContentIntegrationV2025R0TypeField {
  if (val == 'integration') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldListContentIntegrationV2025R0TypeField",
  });
}
export function serializeShieldListContentIntegrationV2025R0IntegrationsField(
  val: ShieldListContentIntegrationV2025R0IntegrationsField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeShieldListContentIntegrationV2025R0IntegrationsField(
  val: SerializedData,
): ShieldListContentIntegrationV2025R0IntegrationsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldListContentIntegrationV2025R0IntegrationsField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldListContentIntegrationV2025R0IntegrationsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    id: id,
  } satisfies ShieldListContentIntegrationV2025R0IntegrationsField;
}
export function serializeShieldListContentIntegrationV2025R0(
  val: ShieldListContentIntegrationV2025R0,
): SerializedData {
  return {
    ['type']: serializeShieldListContentIntegrationV2025R0TypeField(val.type),
    ['integrations']: val.integrations.map(function (
      item: ShieldListContentIntegrationV2025R0IntegrationsField,
    ): SerializedData {
      return serializeShieldListContentIntegrationV2025R0IntegrationsField(
        item,
      );
    }) as readonly any[],
  };
}
export function deserializeShieldListContentIntegrationV2025R0(
  val: SerializedData,
): ShieldListContentIntegrationV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentIntegrationV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShieldListContentIntegrationV2025R0" to be defined',
    });
  }
  const type: ShieldListContentIntegrationV2025R0TypeField =
    deserializeShieldListContentIntegrationV2025R0TypeField(val.type);
  if (val.integrations == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "integrations" of type "ShieldListContentIntegrationV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.integrations)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "integrations" of type "ShieldListContentIntegrationV2025R0"',
    });
  }
  const integrations: readonly ShieldListContentIntegrationV2025R0IntegrationsField[] =
    sdIsList(val.integrations)
      ? (val.integrations.map(function (
          itm: SerializedData,
        ): ShieldListContentIntegrationV2025R0IntegrationsField {
          return deserializeShieldListContentIntegrationV2025R0IntegrationsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    type: type,
    integrations: integrations,
  } satisfies ShieldListContentIntegrationV2025R0;
}
export function serializeShieldListContentIntegrationV2025R0Input(
  val: ShieldListContentIntegrationV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldListContentIntegrationV2025R0TypeField(val.type),
    ['integrations']: val.integrations.map(function (
      item: ShieldListContentIntegrationV2025R0IntegrationsField,
    ): SerializedData {
      return serializeShieldListContentIntegrationV2025R0IntegrationsField(
        item,
      );
    }) as readonly any[],
  };
}
export function deserializeShieldListContentIntegrationV2025R0Input(
  val: SerializedData,
): ShieldListContentIntegrationV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldListContentIntegrationV2025R0Input"',
    });
  }
  const type: undefined | ShieldListContentIntegrationV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldListContentIntegrationV2025R0TypeField(val.type);
  if (val.integrations == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "integrations" of type "ShieldListContentIntegrationV2025R0Input" to be defined',
    });
  }
  if (!sdIsList(val.integrations)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "integrations" of type "ShieldListContentIntegrationV2025R0Input"',
    });
  }
  const integrations: readonly ShieldListContentIntegrationV2025R0IntegrationsField[] =
    sdIsList(val.integrations)
      ? (val.integrations.map(function (
          itm: SerializedData,
        ): ShieldListContentIntegrationV2025R0IntegrationsField {
          return deserializeShieldListContentIntegrationV2025R0IntegrationsField(
            itm,
          );
        }) as readonly any[])
      : [];
  return {
    type: type,
    integrations: integrations,
  } satisfies ShieldListContentIntegrationV2025R0Input;
}
