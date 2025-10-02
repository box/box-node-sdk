import { serializeCreateFileUploadSessionRequestBody } from '@/managers/chunkedUploads';
import { deserializeCreateFileUploadSessionRequestBody } from '@/managers/chunkedUploads';
import { serializeCreateFileUploadSessionCommitRequestBody } from '@/managers/chunkedUploads';
import { deserializeCreateFileUploadSessionCommitRequestBody } from '@/managers/chunkedUploads';
import { serializeCreateFileUploadSessionCommitByUrlRequestBody } from '@/managers/chunkedUploads';
import { deserializeCreateFileUploadSessionCommitByUrlRequestBody } from '@/managers/chunkedUploads';
import { serializeFile } from '@/schemas/file';
import { deserializeFile } from '@/schemas/file';
import { serializeUploadSession } from '@/schemas/uploadSession';
import { deserializeUploadSession } from '@/schemas/uploadSession';
import { serializeUploadPart } from '@/schemas/uploadPart';
import { deserializeUploadPart } from '@/schemas/uploadPart';
import { serializeUploadParts } from '@/schemas/uploadParts';
import { deserializeUploadParts } from '@/schemas/uploadParts';
import { serializeUploadedPart } from '@/schemas/uploadedPart';
import { deserializeUploadedPart } from '@/schemas/uploadedPart';
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { UploadFilePartHeadersInput } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionCommitHeadersInput } from '@/managers/chunkedUploads';
import { UploadFilePartByUrlHeadersInput } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionCommitByUrlHeadersInput } from '@/managers/chunkedUploads';
import { Buffer } from '@/internal/utils';
import { HashName } from '@/internal/utils';
import { UploadFilePartHeaders } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionRequestBody } from '@/managers/chunkedUploads';
import { Iterator } from '@/internal/utils';
import { CreateFileUploadSessionCommitRequestBody } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionCommitHeaders } from '@/managers/chunkedUploads';
import { UploadFilePartByUrlHeaders } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionCommitByUrlRequestBody } from '@/managers/chunkedUploads';
import { CreateFileUploadSessionCommitByUrlHeaders } from '@/managers/chunkedUploads';
import { generateByteStreamFromBuffer } from '@/internal/utils';
import { hexToBase64 } from '@/internal/utils';
import { iterateChunks } from '@/internal/utils';
import { readByteStream } from '@/internal/utils';
import { reduceIterator } from '@/internal/utils';
import { Hash } from '@/internal/utils';
import { bufferLength } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { ByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { File } from '@/schemas/file';
import { UploadSession } from '@/schemas/uploadSession';
import { UploadPart } from '@/schemas/uploadPart';
import { UploadParts } from '@/schemas/uploadParts';
import { UploadedPart } from '@/schemas/uploadedPart';
import { Files } from '@/schemas/files';
import { BoxClient } from '@/client';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
export class TestPartAccumulator {
  readonly lastIndex!: number;
  readonly parts!: readonly UploadPart[];
  readonly fileSize!: number;
  readonly uploadPartUrl: string = '';
  readonly uploadSessionId: string = '';
  readonly fileHash!: Hash;
  constructor(
    fields: Omit<TestPartAccumulator, 'uploadPartUrl' | 'uploadSessionId'> &
      Partial<Pick<TestPartAccumulator, 'uploadPartUrl' | 'uploadSessionId'>>,
  ) {
    if (fields.lastIndex !== undefined) {
      this.lastIndex = fields.lastIndex;
    }
    if (fields.parts !== undefined) {
      this.parts = fields.parts;
    }
    if (fields.fileSize !== undefined) {
      this.fileSize = fields.fileSize;
    }
    if (fields.uploadPartUrl !== undefined) {
      this.uploadPartUrl = fields.uploadPartUrl;
    }
    if (fields.uploadSessionId !== undefined) {
      this.uploadSessionId = fields.uploadSessionId;
    }
    if (fields.fileHash !== undefined) {
      this.fileHash = fields.fileHash;
    }
  }
}
export interface TestPartAccumulatorInput {
  readonly lastIndex: number;
  readonly parts: readonly UploadPart[];
  readonly fileSize: number;
  readonly uploadPartUrl?: string;
  readonly uploadSessionId?: string;
  readonly fileHash: Hash;
}
async function reducerById(
  accInput: TestPartAccumulatorInput,
  chunk: ByteStream,
): Promise<TestPartAccumulator> {
  const acc: TestPartAccumulator = new TestPartAccumulator({
    lastIndex: accInput.lastIndex,
    parts: accInput.parts,
    fileSize: accInput.fileSize,
    uploadPartUrl: accInput.uploadPartUrl,
    uploadSessionId: accInput.uploadSessionId,
    fileHash: accInput.fileHash,
  });
  const lastIndex: number = acc.lastIndex;
  const parts: readonly UploadPart[] = acc.parts;
  const chunkBuffer: Buffer = await readByteStream(chunk);
  const hash: Hash = new Hash({ algorithm: 'sha1' as HashName });
  await hash.updateHash(chunkBuffer);
  const sha1: string = await hash.digestHash('base64');
  const digest: string = ''.concat('sha=', sha1) as string;
  const chunkSize: number = bufferLength(chunkBuffer);
  const bytesStart: number = lastIndex + 1;
  const bytesEnd: number = lastIndex + chunkSize;
  const contentRange: string = ''.concat(
    'bytes ',
    (toString(bytesStart) as string)!,
    '-',
    (toString(bytesEnd) as string)!,
    '/',
    (toString(acc.fileSize) as string)!,
  ) as string;
  const uploadedPart: UploadedPart = await client.chunkedUploads.uploadFilePart(
    acc.uploadSessionId,
    generateByteStreamFromBuffer(chunkBuffer),
    {
      digest: digest,
      contentRange: contentRange,
    } satisfies UploadFilePartHeadersInput,
  );
  const part: UploadPart = uploadedPart.part!;
  const partSha1: string = hexToBase64(part.sha1!);
  if (!(partSha1 == sha1)) {
    throw new Error('Assertion failed');
  }
  if (!(part.size! == chunkSize)) {
    throw new Error('Assertion failed');
  }
  if (!(part.offset! == bytesStart)) {
    throw new Error('Assertion failed');
  }
  await acc.fileHash.updateHash(chunkBuffer);
  return new TestPartAccumulator({
    lastIndex: bytesEnd,
    parts: parts.concat([part]),
    fileSize: acc.fileSize,
    uploadSessionId: acc.uploadSessionId,
    fileHash: acc.fileHash,
  });
}
async function reducerByUrl(
  accInput: TestPartAccumulatorInput,
  chunk: ByteStream,
): Promise<TestPartAccumulator> {
  const acc: TestPartAccumulator = new TestPartAccumulator({
    lastIndex: accInput.lastIndex,
    parts: accInput.parts,
    fileSize: accInput.fileSize,
    uploadPartUrl: accInput.uploadPartUrl,
    uploadSessionId: accInput.uploadSessionId,
    fileHash: accInput.fileHash,
  });
  const lastIndex: number = acc.lastIndex;
  const parts: readonly UploadPart[] = acc.parts;
  const chunkBuffer: Buffer = await readByteStream(chunk);
  const hash: Hash = new Hash({ algorithm: 'sha1' as HashName });
  await hash.updateHash(chunkBuffer);
  const sha1: string = await hash.digestHash('base64');
  const digest: string = ''.concat('sha=', sha1) as string;
  const chunkSize: number = bufferLength(chunkBuffer);
  const bytesStart: number = lastIndex + 1;
  const bytesEnd: number = lastIndex + chunkSize;
  const contentRange: string = ''.concat(
    'bytes ',
    (toString(bytesStart) as string)!,
    '-',
    (toString(bytesEnd) as string)!,
    '/',
    (toString(acc.fileSize) as string)!,
  ) as string;
  const uploadedPart: UploadedPart =
    await client.chunkedUploads.uploadFilePartByUrl(
      acc.uploadPartUrl,
      generateByteStreamFromBuffer(chunkBuffer),
      {
        digest: digest,
        contentRange: contentRange,
      } satisfies UploadFilePartByUrlHeadersInput,
    );
  const part: UploadPart = uploadedPart.part!;
  const partSha1: string = hexToBase64(part.sha1!);
  if (!(partSha1 == sha1)) {
    throw new Error('Assertion failed');
  }
  if (!(part.size! == chunkSize)) {
    throw new Error('Assertion failed');
  }
  if (!(part.offset! == bytesStart)) {
    throw new Error('Assertion failed');
  }
  await acc.fileHash.updateHash(chunkBuffer);
  return new TestPartAccumulator({
    lastIndex: bytesEnd,
    parts: parts.concat([part]),
    fileSize: acc.fileSize,
    uploadPartUrl: acc.uploadPartUrl,
    fileHash: acc.fileHash,
  });
}
test('testChunkedManualProcessById', async function testChunkedManualProcessById(): Promise<any> {
  const fileSize: number = 20 * 1024 * 1024;
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const fileName: string = getUuid();
  const parentFolderId: string = '0';
  const uploadSession: UploadSession =
    await client.chunkedUploads.createFileUploadSession({
      fileName: fileName,
      fileSize: fileSize,
      folderId: parentFolderId,
    } satisfies CreateFileUploadSessionRequestBody);
  const uploadSessionId: string = uploadSession.id!;
  const partSize: number = uploadSession.partSize!;
  const totalParts: number = uploadSession.totalParts!;
  if (!(partSize * totalParts >= fileSize)) {
    throw new Error('Assertion failed');
  }
  if (!(uploadSession.numPartsProcessed == 0)) {
    throw new Error('Assertion failed');
  }
  const fileHash: Hash = new Hash({ algorithm: 'sha1' as HashName });
  const chunksIterator: Iterator = iterateChunks(
    fileByteStream,
    partSize,
    fileSize,
  );
  const results: TestPartAccumulator = await reduceIterator(
    chunksIterator,
    reducerById,
    new TestPartAccumulator({
      lastIndex: -1,
      parts: [],
      fileSize: fileSize,
      uploadSessionId: uploadSessionId,
      fileHash: fileHash,
    }),
  );
  const parts: readonly UploadPart[] = results.parts;
  const processedSessionParts: UploadParts =
    await client.chunkedUploads.getFileUploadSessionParts(uploadSessionId);
  if (!(processedSessionParts.totalCount! == totalParts)) {
    throw new Error('Assertion failed');
  }
  const processedSession: UploadSession =
    await client.chunkedUploads.getFileUploadSessionById(uploadSessionId);
  if (!(processedSession.id! == uploadSessionId)) {
    throw new Error('Assertion failed');
  }
  const sha1: string = await fileHash.digestHash('base64');
  const digest: string = ''.concat('sha=', sha1) as string;
  const committedSession: undefined | Files =
    await client.chunkedUploads.createFileUploadSessionCommit(
      uploadSessionId,
      { parts: parts } satisfies CreateFileUploadSessionCommitRequestBody,
      { digest: digest } satisfies CreateFileUploadSessionCommitHeadersInput,
    );
  if (!(committedSession!.entries![0].name! == fileName)) {
    throw new Error('Assertion failed');
  }
  await client.chunkedUploads.deleteFileUploadSessionById(uploadSessionId);
});
test('testChunkedManualProcessByUrl', async function testChunkedManualProcessByUrl(): Promise<any> {
  const fileSize: number = 20 * 1024 * 1024;
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const fileName: string = getUuid();
  const parentFolderId: string = '0';
  const uploadSession: UploadSession =
    await client.chunkedUploads.createFileUploadSession({
      fileName: fileName,
      fileSize: fileSize,
      folderId: parentFolderId,
    } satisfies CreateFileUploadSessionRequestBody);
  const uploadPartUrl: string = uploadSession.sessionEndpoints!.uploadPart!;
  const commitUrl: string = uploadSession.sessionEndpoints!.commit!;
  const listPartsUrl: string = uploadSession.sessionEndpoints!.listParts!;
  const statusUrl: string = uploadSession.sessionEndpoints!.status!;
  const abortUrl: string = uploadSession.sessionEndpoints!.abort!;
  const uploadSessionId: string = uploadSession.id!;
  const partSize: number = uploadSession.partSize!;
  const totalParts: number = uploadSession.totalParts!;
  if (!(partSize * totalParts >= fileSize)) {
    throw new Error('Assertion failed');
  }
  if (!(uploadSession.numPartsProcessed == 0)) {
    throw new Error('Assertion failed');
  }
  const fileHash: Hash = new Hash({ algorithm: 'sha1' as HashName });
  const chunksIterator: Iterator = iterateChunks(
    fileByteStream,
    partSize,
    fileSize,
  );
  const results: TestPartAccumulator = await reduceIterator(
    chunksIterator,
    reducerByUrl,
    new TestPartAccumulator({
      lastIndex: -1,
      parts: [],
      fileSize: fileSize,
      uploadPartUrl: uploadPartUrl,
      fileHash: fileHash,
    }),
  );
  const parts: readonly UploadPart[] = results.parts;
  const processedSessionParts: UploadParts =
    await client.chunkedUploads.getFileUploadSessionPartsByUrl(listPartsUrl);
  if (!(processedSessionParts.totalCount! == totalParts)) {
    throw new Error('Assertion failed');
  }
  const processedSession: UploadSession =
    await client.chunkedUploads.getFileUploadSessionByUrl(statusUrl);
  if (!(processedSession.id! == uploadSessionId)) {
    throw new Error('Assertion failed');
  }
  const sha1: string = await fileHash.digestHash('base64');
  const digest: string = ''.concat('sha=', sha1) as string;
  const committedSession: undefined | Files =
    await client.chunkedUploads.createFileUploadSessionCommitByUrl(
      commitUrl,
      { parts: parts } satisfies CreateFileUploadSessionCommitByUrlRequestBody,
      {
        digest: digest,
      } satisfies CreateFileUploadSessionCommitByUrlHeadersInput,
    );
  if (!(committedSession!.entries![0].name! == fileName)) {
    throw new Error('Assertion failed');
  }
  await client.chunkedUploads.deleteFileUploadSessionByUrl(abortUrl);
});
test('testChunkedUploadConvenienceMethod', async function testChunkedUploadConvenienceMethod(): Promise<any> {
  const fileSize: number = 20 * 1024 * 1024;
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const fileName: string = getUuid();
  const parentFolderId: string = '0';
  const uploadedFile: File = await client.chunkedUploads.uploadBigFile(
    fileByteStream,
    fileName,
    fileSize,
    parentFolderId,
  );
  if (!(uploadedFile.name! == fileName)) {
    throw new Error('Assertion failed');
  }
  if (!(uploadedFile.size! == fileSize)) {
    throw new Error('Assertion failed');
  }
  if (!(uploadedFile.parent!.id == parentFolderId)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(uploadedFile.id);
});
export {};
