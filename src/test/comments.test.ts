import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeComments } from '@/schemas/comments';
import { deserializeComments } from '@/schemas/comments';
import { serializeCommentFull } from '@/schemas/commentFull';
import { deserializeCommentFull } from '@/schemas/commentFull';
import { serializeCreateCommentRequestBody } from '@/managers/comments';
import { deserializeCreateCommentRequestBody } from '@/managers/comments';
import { serializeCreateCommentRequestBodyItemField } from '@/managers/comments';
import { deserializeCreateCommentRequestBodyItemField } from '@/managers/comments';
import { serializeCreateCommentRequestBodyItemTypeField } from '@/managers/comments';
import { deserializeCreateCommentRequestBodyItemTypeField } from '@/managers/comments';
import { serializeUpdateCommentByIdRequestBody } from '@/managers/comments';
import { deserializeUpdateCommentByIdRequestBody } from '@/managers/comments';
import { UpdateCommentByIdOptionalsInput } from '@/managers/comments';
import { UpdateCommentByIdOptionals } from '@/managers/comments';
import { BoxClient } from '@/client';
import { ByteStream } from '@/internal/utils';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { Comments } from '@/schemas/comments';
import { CommentFull } from '@/schemas/commentFull';
import { CreateCommentRequestBody } from '@/managers/comments';
import { CreateCommentRequestBodyItemField } from '@/managers/comments';
import { CreateCommentRequestBodyItemTypeField } from '@/managers/comments';
import { UpdateCommentByIdRequestBody } from '@/managers/comments';
import { generateByteStream } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
    newComment.id!,
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
