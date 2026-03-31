import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface HubDocumentPageV2025R0 {
  /**
   * The unique identifier for this page. */
  readonly id: string;
  /**
   * The type of this resource. The value is always `page`. */
  readonly type: string;
  /**
   * The unique identifier of the parent page. Null for root-level pages. */
  readonly parentId?: string | null;
  /**
   * The title text of the page. Includes rich text formatting. */
  readonly titleFragment: string;
  readonly rawData?: SerializedData;
}
export function serializeHubDocumentPageV2025R0(
  val: HubDocumentPageV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: val.type,
    ['parent_id']: val.parentId,
    ['title_fragment']: val.titleFragment,
  };
}
export function deserializeHubDocumentPageV2025R0(
  val: SerializedData,
): HubDocumentPageV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubDocumentPageV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubDocumentPageV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubDocumentPageV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubDocumentPageV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "HubDocumentPageV2025R0"',
    });
  }
  const type: string = val.type;
  if (!(val.parent_id == void 0) && !sdIsString(val.parent_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parent_id" of type "HubDocumentPageV2025R0"',
    });
  }
  const parentId: undefined | string =
    val.parent_id == void 0 ? void 0 : val.parent_id;
  if (val.title_fragment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "title_fragment" of type "HubDocumentPageV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.title_fragment)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "title_fragment" of type "HubDocumentPageV2025R0"',
    });
  }
  const titleFragment: string = val.title_fragment;
  return {
    id: id,
    type: type,
    parentId: parentId,
    titleFragment: titleFragment,
  } satisfies HubDocumentPageV2025R0;
}
