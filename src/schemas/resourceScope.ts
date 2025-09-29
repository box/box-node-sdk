import { serializeFolderMini } from './folderMini';
import { deserializeFolderMini } from './folderMini';
import { serializeFileMini } from './fileMini';
import { deserializeFileMini } from './fileMini';
import { serializeResource } from './resource';
import { deserializeResource } from './resource';
import { FolderMini } from './folderMini';
import { FileMini } from './fileMini';
import { Resource } from './resource';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
  val: ResourceScopeScopeField,
): SerializedData {
  return val;
}
export function deserializeResourceScopeScopeField(
  val: SerializedData,
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
