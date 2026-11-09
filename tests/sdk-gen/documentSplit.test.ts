import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeDocumentSplitCreateResponseV2026R0 } from '@/schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { deserializeDocumentSplitCreateResponseV2026R0 } from '@/schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { serializeDocumentSplitCreateRequestV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { deserializeDocumentSplitCreateRequestV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { serializeDocumentSplitCreateRequestV2026R0InputSourceField } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { deserializeDocumentSplitCreateRequestV2026R0InputSourceField } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { serializeDocumentSplitCreateRequestManualV2026R0SplitTypeField } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
import { deserializeDocumentSplitCreateRequestManualV2026R0SplitTypeField } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
import { serializeDocumentSplitPageRangeV2026R0 } from '@/schemas/v2026R0/documentSplitPageRangeV2026R0';
import { deserializeDocumentSplitPageRangeV2026R0 } from '@/schemas/v2026R0/documentSplitPageRangeV2026R0';
import { serializeDocumentSplitV2026R0 } from '@/schemas/v2026R0/documentSplitV2026R0';
import { deserializeDocumentSplitV2026R0 } from '@/schemas/v2026R0/documentSplitV2026R0';
import { serializeDocumentSplitsV2026R0 } from '@/schemas/v2026R0/documentSplitsV2026R0';
import { deserializeDocumentSplitsV2026R0 } from '@/schemas/v2026R0/documentSplitsV2026R0';
import { serializeDocumentSplitCreateRequestManualV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
import { deserializeDocumentSplitCreateRequestManualV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
import { DeleteFolderByIdOptionalsInput } from '@/managers/folders';
import { DeleteFolderByIdOptionals } from '@/managers/folders';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { FolderFull } from '@/schemas/folderFull';
import { DocumentSplitCreateResponseV2026R0 } from '@/schemas/v2026R0/documentSplitCreateResponseV2026R0';
import { DocumentSplitCreateRequestV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { DocumentSplitCreateRequestV2026R0InputSourceField } from '@/schemas/v2026R0/documentSplitCreateRequestV2026R0';
import { DocumentSplitCreateRequestManualV2026R0SplitTypeField } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
import { DocumentSplitPageRangeV2026R0 } from '@/schemas/v2026R0/documentSplitPageRangeV2026R0';
import { DocumentSplitV2026R0 } from '@/schemas/v2026R0/documentSplitV2026R0';
import { DeleteFolderByIdQueryParams } from '@/managers/folders';
import { DocumentSplitsV2026R0 } from '@/schemas/v2026R0/documentSplitsV2026R0';
import { GetDocumentSplitsV2026R0QueryParams } from '@/managers/documentSplit';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { createNewFolder } from './commons';
import { DocumentSplitCreateRequestManualV2026R0 } from '@/schemas/v2026R0/documentSplitCreateRequestManualV2026R0';
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
test('testCreateDocumentSplitV2026R0', async function testCreateDocumentSplitV2026R0(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const folder: FolderFull = await createNewFolder();
  const externalId: string = getUuid();
  const createdDocumentSplit: DocumentSplitCreateResponseV2026R0 =
    await client.documentSplit.createDocumentSplitV2026R0({
      sourceFileId: file.id,
      destinationFolderId: folder.id,
      inputSource: 'api' as DocumentSplitCreateRequestV2026R0InputSourceField,
      splitInput: new DocumentSplitCreateRequestManualV2026R0({
        splitType:
          'manual' as DocumentSplitCreateRequestManualV2026R0SplitTypeField,
        splitDefinition: [
          { start: 1, end: 1 } satisfies DocumentSplitPageRangeV2026R0,
        ],
      }),
      externalId: externalId,
    } satisfies DocumentSplitCreateRequestV2026R0);
  if (!!(createdDocumentSplit.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdDocumentSplit.type) as string) == 'document_split')) {
    throw new Error('Assertion failed');
  }
  const documentSplit: DocumentSplitV2026R0 =
    await client.documentSplit.getDocumentSplitByIdV2026R0(
      createdDocumentSplit.id
    );
  if (!(documentSplit.id == createdDocumentSplit.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(documentSplit.type) as string) == 'document_split')) {
    throw new Error('Assertion failed');
  }
  if (!(documentSplit.sourceFile.id == file.id)) {
    throw new Error('Assertion failed');
  }
  if (!(documentSplit.destinationFolder.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(documentSplit.inputSource) as string) == 'api')) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(documentSplit.status) as string) == '')) {
    throw new Error('Assertion failed');
  }
  if (!(documentSplit.externalId == externalId)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(folder.id, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
  await client.files.deleteFileById(file.id);
});
test('testGetDocumentSplitsV2026R0', async function testGetDocumentSplitsV2026R0(): Promise<any> {
  const documentSplits: DocumentSplitsV2026R0 =
    await client.documentSplit.getDocumentSplitsV2026R0({
      limit: 10,
    } satisfies GetDocumentSplitsV2026R0QueryParams);
  if (!(documentSplits.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
});
export {};
