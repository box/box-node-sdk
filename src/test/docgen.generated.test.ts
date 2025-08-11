import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { deserializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { serializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { deserializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { serializeFileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.generated.js';
import { deserializeFileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.generated.js';
import { serializeDocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { deserializeDocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { serializeDocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { deserializeDocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { serializeDocGenBatchCreateRequestV2025R0DestinationFolderField } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { deserializeDocGenBatchCreateRequestV2025R0DestinationFolderField } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { serializeDocGenDocumentGenerationDataV2025R0 } from '../schemas/v2025R0/docGenDocumentGenerationDataV2025R0.generated.js';
import { deserializeDocGenDocumentGenerationDataV2025R0 } from '../schemas/v2025R0/docGenDocumentGenerationDataV2025R0.generated.js';
import { serializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { deserializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { serializeDocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { deserializeDocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { serializeDocGenJobFullV2025R0 } from '../schemas/v2025R0/docGenJobFullV2025R0.generated.js';
import { deserializeDocGenJobFullV2025R0 } from '../schemas/v2025R0/docGenJobFullV2025R0.generated.js';
import { serializeDocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { deserializeDocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { DocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.generated.js';
import { DocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.generated.js';
import { FileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.generated.js';
import { DocGenBatchBaseV2025R0 } from '../schemas/v2025R0/docGenBatchBaseV2025R0.generated.js';
import { DocGenBatchCreateRequestV2025R0 } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { DocGenBatchCreateRequestV2025R0DestinationFolderField } from '../schemas/v2025R0/docGenBatchCreateRequestV2025R0.generated.js';
import { DocGenDocumentGenerationDataV2025R0 } from '../schemas/v2025R0/docGenDocumentGenerationDataV2025R0.generated.js';
import { DocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.generated.js';
import { DocGenJobsFullV2025R0 } from '../schemas/v2025R0/docGenJobsFullV2025R0.generated.js';
import { GetDocgenJobsV2025R0QueryParams } from '../managers/docgen.generated.js';
import { DocGenJobFullV2025R0 } from '../schemas/v2025R0/docGenJobFullV2025R0.generated.js';
import { DocGenJobV2025R0 } from '../schemas/v2025R0/docGenJobV2025R0.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testDocgenBatchAndJobs', async function testDocgenBatchAndJobs(): Promise<any> {
  const uploadedFile: FileFull = await uploadNewFile();
  const folder: FolderFull = await createNewFolder();
  const createdDocgenTemplate: DocGenTemplateBaseV2025R0 =
    await client.docgenTemplate.createDocgenTemplateV2025R0({
      file: new FileReferenceV2025R0({ id: uploadedFile.id }),
    } satisfies DocGenTemplateCreateRequestV2025R0);
  const docgenBatch: DocGenBatchBaseV2025R0 =
    await client.docgen.createDocgenBatchV2025R0({
      file: new FileReferenceV2025R0({ id: uploadedFile.id }),
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
  if (!(docgenBatchJobs.entries![0].templateFile.id == uploadedFile.id)) {
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
  await client.files.deleteFileById(uploadedFile.id);
});
export {};
