import { serializeFolderMini } from './folderMini.js';
import { deserializeFolderMini } from './folderMini.js';
import { serializeFileMini } from './fileMini.js';
import { deserializeFileMini } from './fileMini.js';
import { serializeResource } from './resource.js';
import { deserializeResource } from './resource.js';
import { FolderMini } from './folderMini.js';
import { FileMini } from './fileMini.js';
import { Resource } from './resource.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ResourceScopeScopeField =
  | 'annotation_edit'
  | 'annotation_view_all'
  | 'annotation_view_self'
  | 'base_explorer'
  | 'base_picker'
  | 'base_preview'
  | 'base_upload'
  | 'item_delete'
  | 'item_download'
  | 'item_preview'
  | 'item_rename'
  | 'item_share'
  | 'item_upload'
  | 'item_read'
  | string;
export interface ResourceScope {
  /**
   * The scopes for the resource access. */
  readonly scope?: ResourceScopeScopeField;
  readonly object?: Resource;
  readonly rawData?: SerializedData;
}
export function serializeResourceScopeScopeField(
  val: ResourceScopeScopeField
): SerializedData {
  return val;
}
export function deserializeResourceScopeScopeField(
  val: SerializedData
): ResourceScopeScopeField {
  if (val == 'annotation_edit') {
    return val;
  }
  if (val == 'annotation_view_all') {
    return val;
  }
  if (val == 'annotation_view_self') {
    return val;
  }
  if (val == 'base_explorer') {
    return val;
  }
  if (val == 'base_picker') {
    return val;
  }
  if (val == 'base_preview') {
    return val;
  }
  if (val == 'base_upload') {
    return val;
  }
  if (val == 'item_delete') {
    return val;
  }
  if (val == 'item_download') {
    return val;
  }
  if (val == 'item_preview') {
    return val;
  }
  if (val == 'item_rename') {
    return val;
  }
  if (val == 'item_share') {
    return val;
  }
  if (val == 'item_upload') {
    return val;
  }
  if (val == 'item_read') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ResourceScopeScopeField",
  });
}
export function serializeResourceScope(val: ResourceScope): SerializedData {
  return {
    ['scope']:
      val.scope == void 0
        ? val.scope
        : serializeResourceScopeScopeField(val.scope),
    ['object']:
      val.object == void 0 ? val.object : serializeResource(val.object),
  };
}
export function deserializeResourceScope(val: SerializedData): ResourceScope {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ResourceScope"' });
  }
  const scope: undefined | ResourceScopeScopeField =
    val.scope == void 0
      ? void 0
      : deserializeResourceScopeScopeField(val.scope);
  const object: undefined | Resource =
    val.object == void 0 ? void 0 : deserializeResource(val.object);
  return { scope: scope, object: object } satisfies ResourceScope;
}
