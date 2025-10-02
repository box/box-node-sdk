import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubBaseV2025R0TypeField = 'hubs';
export class HubBaseV2025R0 {
  /**
   * The unique identifier that represent a Box Hub.
   *
   * The ID for any Box Hub can be determined
   * by visiting a Box Hub in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/hubs/123`
   * the `hub_id` is `123`. */
  readonly id!: string;
  /**
   * The value will always be `hubs`. */
  readonly type: HubBaseV2025R0TypeField = 'hubs' as HubBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<HubBaseV2025R0, 'type'> &
      Partial<Pick<HubBaseV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface HubBaseV2025R0Input {
  /**
   * The unique identifier that represent a Box Hub.
   *
   * The ID for any Box Hub can be determined
   * by visiting a Box Hub in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/hubs/123`
   * the `hub_id` is `123`. */
  readonly id: string;
  /**
   * The value will always be `hubs`. */
  readonly type?: HubBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeHubBaseV2025R0TypeField(
  val: HubBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeHubBaseV2025R0TypeField(
  val: SerializedData,
): HubBaseV2025R0TypeField {
  if (val == 'hubs') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubBaseV2025R0TypeField",
  });
}
export function serializeHubBaseV2025R0(val: HubBaseV2025R0): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeHubBaseV2025R0TypeField(val.type),
  };
}
export function deserializeHubBaseV2025R0(val: SerializedData): HubBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "HubBaseV2025R0"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "HubBaseV2025R0" to be defined',
    });
  }
  const type: HubBaseV2025R0TypeField = deserializeHubBaseV2025R0TypeField(
    val.type,
  );
  return { id: id, type: type } satisfies HubBaseV2025R0;
}
export function serializeHubBaseV2025R0Input(
  val: HubBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeHubBaseV2025R0TypeField(val.type),
  };
}
export function deserializeHubBaseV2025R0Input(
  val: SerializedData,
): HubBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | HubBaseV2025R0TypeField =
    val.type == void 0 ? void 0 : deserializeHubBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies HubBaseV2025R0Input;
}
