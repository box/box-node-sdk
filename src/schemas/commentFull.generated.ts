import { serializeCommentBaseTypeField } from './commentBase.generated.js';
import { deserializeCommentBaseTypeField } from './commentBase.generated.js';
import { serializeCommentBase } from './commentBase.generated.js';
import { deserializeCommentBase } from './commentBase.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeCommentItemField } from './comment.generated.js';
import { deserializeCommentItemField } from './comment.generated.js';
import { serializeComment } from './comment.generated.js';
import { deserializeComment } from './comment.generated.js';
import { CommentBaseTypeField } from './commentBase.generated.js';
import { CommentBase } from './commentBase.generated.js';
import { UserMini } from './userMini.generated.js';
import { DateTime } from '../internal/utils.js';
import { CommentItemField } from './comment.generated.js';
import { Comment } from './comment.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
