import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeComments } from '../schemas/comments.js';
import { deserializeComments } from '../schemas/comments.js';
import { serializeCommentFull } from '../schemas/commentFull.js';
import { deserializeCommentFull } from '../schemas/commentFull.js';
import { serializeCreateCommentRequestBody } from '../managers/comments.js';
import { deserializeCreateCommentRequestBody } from '../managers/comments.js';
import { serializeCreateCommentRequestBodyItemField } from '../managers/comments.js';
import { deserializeCreateCommentRequestBodyItemField } from '../managers/comments.js';
import { serializeCreateCommentRequestBodyItemTypeField } from '../managers/comments.js';
import { deserializeCreateCommentRequestBodyItemTypeField } from '../managers/comments.js';
import { serializeUpdateCommentByIdRequestBody } from '../managers/comments.js';
import { deserializeUpdateCommentByIdRequestBody } from '../managers/comments.js';
import { UpdateCommentByIdOptionalsInput } from '../managers/comments.js';
import { UpdateCommentByIdOptionals } from '../managers/comments.js';
import { BoxClient } from '../client.js';
import { ByteStream } from '../internal/utils.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { Comments } from '../schemas/comments.js';
import { CommentFull } from '../schemas/commentFull.js';
import { CreateCommentRequestBody } from '../managers/comments.js';
import { CreateCommentRequestBodyItemField } from '../managers/comments.js';
import { CreateCommentRequestBodyItemTypeField } from '../managers/comments.js';
import { UpdateCommentByIdRequestBody } from '../managers/comments.js';
import { generateByteStream } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testComments', async function testComments(): Promise<any> {
  const fileSize: number = 256;
  const fileName: string = getUuid();
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const parentId: string = '0';
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: fileName,
      parent: {
        id: parentId,
      } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileByteStream,
  } satisfies UploadFileRequestBody);
  const fileId: string = uploadedFiles.entries![0].id;
  const comments: Comments = await client.comments.getFileComments(fileId);
  if (!(comments.totalCount == 0)) {
    throw new Error('Assertion failed');
  }
  const message: string = 'Hello there!';
  const newComment: CommentFull = await client.comments.createComment({
    message: message,
    item: {
      id: fileId,
      type: 'file' as CreateCommentRequestBodyItemTypeField,
    } satisfies CreateCommentRequestBodyItemField,
  } satisfies CreateCommentRequestBody);
  if (!(newComment.message == message)) {
    throw new Error('Assertion failed');
  }
  if (!(newComment.isReplyComment == false)) {
    throw new Error('Assertion failed');
  }
  if (!(newComment.item!.id == fileId)) {
    throw new Error('Assertion failed');
  }
  const newReplyComment: CommentFull = await client.comments.createComment({
    message: message,
    item: {
      id: newComment.id!,
      type: 'comment' as CreateCommentRequestBodyItemTypeField,
    } satisfies CreateCommentRequestBodyItemField,
  } satisfies CreateCommentRequestBody);
  if (!(newReplyComment.message == message)) {
    throw new Error('Assertion failed');
  }
  if (!(newReplyComment.isReplyComment == true)) {
    throw new Error('Assertion failed');
  }
  const newMessage: string = 'Hi!';
  await client.comments.updateCommentById(newReplyComment.id!, {
    requestBody: { message: newMessage } satisfies UpdateCommentByIdRequestBody,
  } satisfies UpdateCommentByIdOptionalsInput);
  const newComments: Comments = await client.comments.getFileComments(fileId);
  if (!(newComments.totalCount == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(newComments.entries![1].message == newMessage)) {
    throw new Error('Assertion failed');
  }
  const receivedComment: CommentFull = await client.comments.getCommentById(
    newComment.id!
  );
  if (!(receivedComment.message! == newComment.message!)) {
    throw new Error('Assertion failed');
  }
  await client.comments.deleteCommentById(newComment.id!);
  await expect(async () => {
    await client.comments.getCommentById(newComment.id!);
  }).rejects.toThrow();
  await client.files.deleteFileById(fileId);
});
export {};
