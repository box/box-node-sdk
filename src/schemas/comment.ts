import { serializeCommentBaseTypeField } from './commentBase';
import { deserializeCommentBaseTypeField } from './commentBase';
import { serializeCommentBase } from './commentBase';
import { deserializeCommentBase } from './commentBase';
import { serializeUserMini } from './userMini';
import { deserializeUserMini } from './userMini';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { CommentBaseTypeField } from './commentBase';
import { CommentBase } from './commentBase';
import { UserMini } from './userMini';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface CommentItemField {
  /**
   * The unique identifier for this object. */
  readonly id?: string;
  /**
   * The type for this object. */
  readonly type?: string;
  readonly rawData?: SerializedData;
}
export type Comment = CommentBase & {
  /**
   * Whether or not this comment is a reply to another
   * comment. */
  readonly isReplyComment?: boolean;
  /**
   * The text of the comment, as provided by the user. */
  readonly message?: string;
  readonly createdBy?: UserMini;
  /**
   * The time this comment was created. */
  readonly createdAt?: DateTime;
  /**
   * The time this comment was last modified. */
  readonly modifiedAt?: DateTime;
  readonly item?: CommentItemField;
};
export function serializeCommentItemField(
  val: CommentItemField,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeCommentItemField(
  val: SerializedData,
): CommentItemField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CommentItemField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "CommentItemField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "CommentItemField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  return { id: id, type: type } satisfies CommentItemField;
}
export function serializeComment(val: Comment): SerializedData {
  const base: any = serializeCommentBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Comment"' });
  }
  return {
    ...base,
    ...{
      ['is_reply_comment']: val.isReplyComment,
      ['message']: val.message,
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserMini(val.createdBy),
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
      ['item']:
        val.item == void 0 ? val.item : serializeCommentItemField(val.item),
    },
  };
}
export function deserializeComment(val: SerializedData): Comment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Comment"' });
  }
  if (!(val.is_reply_comment == void 0) && !sdIsBoolean(val.is_reply_comment)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_reply_comment" of type "Comment"',
    });
  }
  const isReplyComment: undefined | boolean =
    val.is_reply_comment == void 0 ? void 0 : val.is_reply_comment;
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "Comment"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Comment"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "Comment"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  const item: undefined | CommentItemField =
    val.item == void 0 ? void 0 : deserializeCommentItemField(val.item);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Comment"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CommentBaseTypeField =
    val.type == void 0 ? void 0 : deserializeCommentBaseTypeField(val.type);
  return {
    isReplyComment: isReplyComment,
    message: message,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    item: item,
    id: id,
    type: type,
  } satisfies Comment;
}
