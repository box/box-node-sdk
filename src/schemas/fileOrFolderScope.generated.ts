import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeFileMiniOrFolderMini } from './fileMiniOrFolderMini.generated.js';
import { deserializeFileMiniOrFolderMini } from './fileMiniOrFolderMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { FileMiniOrFolderMini } from './fileMiniOrFolderMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileOrFolderScopeScopeField =
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
export interface FileOrFolderScope {
  /**
   * The scopes for the resource access. */
  readonly scope?: FileOrFolderScopeScopeField;
  readonly object?: FileMiniOrFolderMini;
  readonly rawData?: SerializedData;
}
export function serializeFileOrFolderScopeScopeField(
  val: FileOrFolderScopeScopeField,
): SerializedData {
  return val;
}
export function deserializeFileOrFolderScopeScopeField(
  val: SerializedData,
): FileOrFolderScopeScopeField {
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
    message: "Can't deserialize FileOrFolderScopeScopeField",
  });
}
export function serializeFileOrFolderScope(
  val: FileOrFolderScope,
): SerializedData {
  return {
    ['scope']:
      val.scope == void 0
        ? val.scope
        : serializeFileOrFolderScopeScopeField(val.scope),
    ['object']:
      val.object == void 0
        ? val.object
        : serializeFileMiniOrFolderMini(val.object),
  };
}
export function deserializeFileOrFolderScope(
  val: SerializedData,
): FileOrFolderScope {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileOrFolderScope"',
    });
  }
  const scope: undefined | FileOrFolderScopeScopeField =
    val.scope == void 0
      ? void 0
      : deserializeFileOrFolderScopeScopeField(val.scope);
  const object: undefined | FileMiniOrFolderMini =
    val.object == void 0 ? void 0 : deserializeFileMiniOrFolderMini(val.object);
  return { scope: scope, object: object } satisfies FileOrFolderScope;
}
