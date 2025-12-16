import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeUpdateFileByIdRequestBody } from '@/managers/files';
import { deserializeUpdateFileByIdRequestBody } from '@/managers/files';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeDocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { deserializeDocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { serializeDocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { deserializeDocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { serializeFileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { deserializeFileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { serializeDocGenBatchBaseV2025R0 } from '@/schemas/v2025R0/docGenBatchBaseV2025R0';
import { deserializeDocGenBatchBaseV2025R0 } from '@/schemas/v2025R0/docGenBatchBaseV2025R0';
import { serializeDocGenBatchCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { deserializeDocGenBatchCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { serializeDocGenBatchCreateRequestV2025R0DestinationFolderField } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { deserializeDocGenBatchCreateRequestV2025R0DestinationFolderField } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { serializeDocGenDocumentGenerationDataV2025R0 } from '@/schemas/v2025R0/docGenDocumentGenerationDataV2025R0';
import { deserializeDocGenDocumentGenerationDataV2025R0 } from '@/schemas/v2025R0/docGenDocumentGenerationDataV2025R0';
import { serializeDocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { deserializeDocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { serializeDocGenJobsFullV2025R0 } from '@/schemas/v2025R0/docGenJobsFullV2025R0';
import { deserializeDocGenJobsFullV2025R0 } from '@/schemas/v2025R0/docGenJobsFullV2025R0';
import { serializeDocGenJobFullV2025R0 } from '@/schemas/v2025R0/docGenJobFullV2025R0';
import { deserializeDocGenJobFullV2025R0 } from '@/schemas/v2025R0/docGenJobFullV2025R0';
import { serializeDocGenJobV2025R0 } from '@/schemas/v2025R0/docGenJobV2025R0';
import { deserializeDocGenJobV2025R0 } from '@/schemas/v2025R0/docGenJobV2025R0';
import { UpdateFileByIdOptionalsInput } from '@/managers/files';
import { UpdateFileByIdOptionals } from '@/managers/files';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { UpdateFileByIdRequestBody } from '@/managers/files';
import { FolderFull } from '@/schemas/folderFull';
import { DocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { DocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { FileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { DocGenBatchBaseV2025R0 } from '@/schemas/v2025R0/docGenBatchBaseV2025R0';
import { DocGenBatchCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { DocGenBatchCreateRequestV2025R0DestinationFolderField } from '@/schemas/v2025R0/docGenBatchCreateRequestV2025R0';
import { DocGenDocumentGenerationDataV2025R0 } from '@/schemas/v2025R0/docGenDocumentGenerationDataV2025R0';
import { DocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { DocGenJobsFullV2025R0 } from '@/schemas/v2025R0/docGenJobsFullV2025R0';
import { GetDocgenJobsV2025R0QueryParams } from '@/managers/docgen';
import { DocGenJobFullV2025R0 } from '@/schemas/v2025R0/docGenJobFullV2025R0';
import { DocGenJobV2025R0 } from '@/schemas/v2025R0/docGenJobV2025R0';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { createNewFolder } from './commons';
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
test('testDocgenBatchAndJobs', async function testDocgenBatchAndJobs(): Promise<any> {
  const uploadedFilePdf: FileFull = await uploadNewFile();
  const uploadedFileDocx: FileFull = await client.files.updateFileById(
    uploadedFilePdf.id,
    {
      requestBody: {
        name: ''.concat(uploadedFilePdf.name!, '.docx') as string,
      } satisfies UpdateFileByIdRequestBody,
    } satisfies UpdateFileByIdOptionalsInput,
  );
  const folder: FolderFull = await createNewFolder();
  const createdDocgenTemplate: DocGenTemplateBaseV2025R0 =
    await client.docgenTemplate.createDocgenTemplateV2025R0({
      file: new FileReferenceV2025R0({ id: uploadedFileDocx.id }),
    } satisfies DocGenTemplateCreateRequestV2025R0);
  const docgenBatch: DocGenBatchBaseV2025R0 =
    await client.docgen.createDocgenBatchV2025R0({
      file: new FileReferenceV2025R0({ id: uploadedFileDocx.id }),
      inputSource: 'api',
      destinationFolder:
        new DocGenBatchCreateRequestV2025R0DestinationFolderField({
          id: folder.id,
        }),
      outputType: 'pdf',
      documentGenerationData: [
        {
          generatedFileName: 'test',
          userInput: { ['abc']: 'xyz' },
        } satisfies DocGenDocumentGenerationDataV2025R0,
      ],
    } satisfies DocGenBatchCreateRequestV2025R0);
  if (!!(docgenBatch.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(docgenBatch.type) as string) == 'docgen_batch')) {
    throw new Error('Assertion failed');
  }
  const docgenBatchJobs: DocGenJobsV2025R0 =
    await client.docgen.getDocgenBatchJobByIdV2025R0(docgenBatch.id);
  if (!(docgenBatchJobs.entries!.length >= 1)) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenBatchJobs.entries![0].id == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(docgenBatchJobs.entries![0].type) as string) == 'docgen_job')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(docgenBatchJobs.entries![0].outputType == 'pdf')) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(docgenBatchJobs.entries![0].status) as string) == '')) {
    throw new Error('Assertion failed');
  }
  if (!(docgenBatchJobs.entries![0].templateFile.id == uploadedFileDocx.id)) {
    throw new Error('Assertion failed');
  }
  if (!(docgenBatchJobs.entries![0].batch.id == docgenBatch.id)) {
    throw new Error('Assertion failed');
  }
  const docgenJobs: DocGenJobsFullV2025R0 =
    await client.docgen.getDocgenJobsV2025R0({
      limit: 10000,
    } satisfies GetDocgenJobsV2025R0QueryParams);
  if (!(docgenJobs.entries!.length >= 1)) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].batch.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].createdBy.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].enterprise.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].outputType == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].source == '')) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(docgenJobs.entries![0].status) as string) == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(docgenJobs.entries![0].templateFile.type) as string) == 'file')
  ) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].templateFile.id == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(docgenJobs.entries![0].templateFileVersion.type) as string) ==
      'file_version'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJobs.entries![0].templateFileVersion.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(docgenJobs.entries![0].type) as string) == 'docgen_job')) {
    throw new Error('Assertion failed');
  }
  const indexOfItem: number = docgenJobs.entries!.length - 1;
  const docgenJobItemFromList: DocGenJobFullV2025R0 =
    docgenJobs.entries![indexOfItem];
  const docgenJob: DocGenJobV2025R0 =
    await client.docgen.getDocgenJobByIdV2025R0(docgenJobItemFromList.id);
  if (!!(docgenJob.batch.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJob.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJob.outputType == '')) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(docgenJob.status) as string) == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(docgenJob.templateFile.type) as string) == 'file')) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJob.templateFile.id == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(docgenJob.templateFileVersion.type) as string) == 'file_version'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!!(docgenJob.templateFileVersion.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(docgenJob.type) as string) == 'docgen_job')) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(folder.id);
  await client.files.deleteFileById(uploadedFileDocx.id);
});
export {};
