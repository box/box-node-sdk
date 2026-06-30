import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface HubCopyRequestV2025R0 {
  /**
   * Title of the Box Hub. It cannot be empty and should be less than 50 characters. */
  readonly title?: string;
  /**
   * Description of the Box Hub. */
  readonly description?: string;
  /**
   * If true, the items which the user has Editor or Owner access to in the original Box Hub will be copied to the new Box Hub.
   * Defaults to false. */
  readonly includeItems?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeHubCopyRequestV2025R0(
  val: HubCopyRequestV2025R0,
): SerializedData {
  return {
    ['title']: val.title,
    ['description']: val.description,
    ['include_items']: val.includeItems,
  };
}
export function deserializeHubCopyRequestV2025R0(
  val: SerializedData,
): HubCopyRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCopyRequestV2025R0"',
    });
  }
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "HubCopyRequestV2025R0"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "HubCopyRequestV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.include_items == void 0) && !sdIsBoolean(val.include_items)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "include_items" of type "HubCopyRequestV2025R0"',
    });
  }
  const includeItems: undefined | boolean =
    val.include_items == void 0 ? void 0 : val.include_items;
  return {
    title: title,
    description: description,
    includeItems: includeItems,
  } satisfies HubCopyRequestV2025R0;
}
