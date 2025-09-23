import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubCreateRequestV2025R0 {
  /**
   * Title of the Box Hub. It cannot be empty and should be less than 50 characters. */
  readonly title: string;
  /**
   * Description of the Box Hub. */
  readonly description?: string;
  readonly rawData?: SerializedData;
}
export function serializeHubCreateRequestV2025R0(
  val: HubCreateRequestV2025R0,
): SerializedData {
  return { ['title']: val.title, ['description']: val.description };
}
export function deserializeHubCreateRequestV2025R0(
  val: SerializedData,
): HubCreateRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCreateRequestV2025R0"',
    });
  }
  if (val.title == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "title" of type "HubCreateRequestV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "HubCreateRequestV2025R0"',
    });
  }
  const title: string = val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "HubCreateRequestV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    title: title,
    description: description,
  } satisfies HubCreateRequestV2025R0;
}
