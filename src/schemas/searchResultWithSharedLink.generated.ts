import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderFull } from './folderFull.generated.js';
import { deserializeFolderFull } from './folderFull.generated.js';
import { serializeWebLink } from './webLink.generated.js';
import { deserializeWebLink } from './webLink.generated.js';
import { serializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { deserializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderFull } from './folderFull.generated.js';
import { WebLink } from './webLink.generated.js';
import { FileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface SearchResultWithSharedLink {
  /**
   * The optional shared link through which the user has access to this
   * item. This value is only returned for items for which the user has
   * recently accessed the file through a shared link. For all other
   * items this value will return `null`. */
  readonly accessibleViaSharedLink?: string;
  readonly item?: FileFullOrFolderFullOrWebLink;
  /**
   * The result type. The value is always `search_result`. */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export function serializeSearchResultWithSharedLink(
  val: SearchResultWithSharedLink,
): SerializedData {
  return {
    ['accessible_via_shared_link']: val.accessibleViaSharedLink,
    ['item']:
      val.item == void 0
        ? val.item
        : serializeFileFullOrFolderFullOrWebLink(val.item),
    ['type']: val.type,
  };
}
export function deserializeSearchResultWithSharedLink(
  val: SerializedData,
): SearchResultWithSharedLink {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SearchResultWithSharedLink"',
    });
  }
  if (
    !(val.accessible_via_shared_link == void 0) &&
    !sdIsString(val.accessible_via_shared_link)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "accessible_via_shared_link" of type "SearchResultWithSharedLink"',
    });
  }
  const accessibleViaSharedLink: undefined | string =
    val.accessible_via_shared_link == void 0
      ? void 0
      : val.accessible_via_shared_link;
  const item: undefined | FileFullOrFolderFullOrWebLink =
    val.item == void 0
      ? void 0
      : deserializeFileFullOrFolderFullOrWebLink(val.item);
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "SearchResultWithSharedLink"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return {
    accessibleViaSharedLink: accessibleViaSharedLink,
    item: item,
    type: type,
  } satisfies SearchResultWithSharedLink;
}
