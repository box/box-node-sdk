import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type DocGenTagV2025R0TagTypeField =
  | 'text'
  | 'arithmetic'
  | 'conditional'
  | 'for-loop'
  | 'table-loop'
  | 'image'
  | string;
export interface DocGenTagV2025R0 {
  /**
   * The content of the tag. */
  readonly tagContent: string;
  /**
   * Type of the tag. */
  readonly tagType: DocGenTagV2025R0TagTypeField;
  /**
   * List of the paths. */
  readonly jsonPaths: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeDocGenTagV2025R0TagTypeField(
  val: DocGenTagV2025R0TagTypeField,
): SerializedData {
  return val;
}
export function deserializeDocGenTagV2025R0TagTypeField(
  val: SerializedData,
): DocGenTagV2025R0TagTypeField {
  if (val == 'text') {
    return val;
  }
  if (val == 'arithmetic') {
    return val;
  }
  if (val == 'conditional') {
    return val;
  }
  if (val == 'for-loop') {
    return val;
  }
  if (val == 'table-loop') {
    return val;
  }
  if (val == 'image') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize DocGenTagV2025R0TagTypeField",
  });
}
export function serializeDocGenTagV2025R0(
  val: DocGenTagV2025R0,
): SerializedData {
  return {
    ['tag_content']: val.tagContent,
    ['tag_type']: serializeDocGenTagV2025R0TagTypeField(val.tagType),
    ['json_paths']: val.jsonPaths.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
  };
}
export function deserializeDocGenTagV2025R0(
  val: SerializedData,
): DocGenTagV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTagV2025R0"',
    });
  }
  if (val.tag_content == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "tag_content" of type "DocGenTagV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.tag_content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "tag_content" of type "DocGenTagV2025R0"',
    });
  }
  const tagContent: string = val.tag_content;
  if (val.tag_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "tag_type" of type "DocGenTagV2025R0" to be defined',
    });
  }
  const tagType: DocGenTagV2025R0TagTypeField =
    deserializeDocGenTagV2025R0TagTypeField(val.tag_type);
  if (val.json_paths == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "json_paths" of type "DocGenTagV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.json_paths)) {
    throw new BoxSdkError({
      message: 'Expecting array for "json_paths" of type "DocGenTagV2025R0"',
    });
  }
  const jsonPaths: readonly string[] = sdIsList(val.json_paths)
    ? (val.json_paths.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "DocGenTagV2025R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  return {
    tagContent: tagContent,
    tagType: tagType,
    jsonPaths: jsonPaths,
  } satisfies DocGenTagV2025R0;
}
