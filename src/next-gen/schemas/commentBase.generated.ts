import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CommentBaseTypeField = 'comment';
export interface CommentBase {
  /**
   * The unique identifier for this comment. */
  readonly id?: string;
  /**
   * `comment` */
  readonly type?: CommentBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeCommentBaseTypeField(
  val: CommentBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeCommentBaseTypeField(
  val: SerializedData,
): CommentBaseTypeField {
  if (val == 'comment') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize CommentBaseTypeField" });
}
export function serializeCommentBase(val: CommentBase): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeCommentBaseTypeField(val.type),
  };
}
export function deserializeCommentBase(val: SerializedData): CommentBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "CommentBase"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "CommentBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CommentBaseTypeField =
    val.type == void 0 ? void 0 : deserializeCommentBaseTypeField(val.type);
  return { id: id, type: type } satisfies CommentBase;
}
