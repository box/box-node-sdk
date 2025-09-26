import { serializeCommentBaseTypeField } from './commentBase';
import { deserializeCommentBaseTypeField } from './commentBase';
import { serializeCommentBase } from './commentBase';
import { deserializeCommentBase } from './commentBase';
import { serializeUserMini } from './userMini';
import { deserializeUserMini } from './userMini';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { serializeCommentItemField } from './comment';
import { deserializeCommentItemField } from './comment';
import { serializeComment } from './comment';
import { deserializeComment } from './comment';
import { CommentBaseTypeField } from './commentBase';
import { CommentBase } from './commentBase';
import { UserMini } from './userMini';
import { DateTime } from '../internal/utils';
import { CommentItemField } from './comment';
import { Comment } from './comment';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type CommentFull = Comment & {
  /**
   * The string representing the comment text with
   * @mentions included. @mention format is @[id:username]
   * where `id` is user's Box ID and `username` is
   * their display name. */
  readonly taggedMessage?: string;
};
export function serializeCommentFull(val: CommentFull): SerializedData {
  const base: any = serializeComment(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "CommentFull"' });
  }
  return { ...base, ...{ ['tagged_message']: val.taggedMessage } };
}
export function deserializeCommentFull(val: SerializedData): CommentFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "CommentFull"' });
  }
  if (!(val.tagged_message == void 0) && !sdIsString(val.tagged_message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "tagged_message" of type "CommentFull"',
    });
  }
  const taggedMessage: undefined | string =
    val.tagged_message == void 0 ? void 0 : val.tagged_message;
  if (!(val.is_reply_comment == void 0) && !sdIsBoolean(val.is_reply_comment)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_reply_comment" of type "CommentFull"',
    });
  }
  const isReplyComment: undefined | boolean =
    val.is_reply_comment == void 0 ? void 0 : val.is_reply_comment;
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "CommentFull"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "CommentFull"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "CommentFull"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  const item: undefined | CommentItemField =
    val.item == void 0 ? void 0 : deserializeCommentItemField(val.item);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "CommentFull"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CommentBaseTypeField =
    val.type == void 0 ? void 0 : deserializeCommentBaseTypeField(val.type);
  return {
    taggedMessage: taggedMessage,
    isReplyComment: isReplyComment,
    message: message,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    item: item,
    id: id,
    type: type,
  } satisfies CommentFull;
}
