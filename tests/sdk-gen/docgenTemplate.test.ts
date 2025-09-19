import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.js';
import { deserializeDocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.js';
import { serializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.js';
import { deserializeDocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.js';
import { serializeFileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.js';
import { deserializeFileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.js';
import { serializeDocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.js';
import { deserializeDocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.js';
import { serializeDocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.js';
import { deserializeDocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.js';
import { serializeDocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.js';
import { deserializeDocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.js';
import { serializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.js';
import { deserializeDocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { DocGenTemplateBaseV2025R0 } from '../schemas/v2025R0/docGenTemplateBaseV2025R0.js';
import { DocGenTemplateCreateRequestV2025R0 } from '../schemas/v2025R0/docGenTemplateCreateRequestV2025R0.js';
import { FileReferenceV2025R0 } from '../schemas/v2025R0/fileReferenceV2025R0.js';
import { DocGenTemplatesV2025R0 } from '../schemas/v2025R0/docGenTemplatesV2025R0.js';
import { DocGenTemplateV2025R0 } from '../schemas/v2025R0/docGenTemplateV2025R0.js';
import { DocGenTagsV2025R0 } from '../schemas/v2025R0/docGenTagsV2025R0.js';
import { DocGenJobsV2025R0 } from '../schemas/v2025R0/docGenJobsV2025R0.js';
import { getDefaultClient } from './commons.js';
import { uploadNewFile } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testDocgenTemplateCRUD', async function testDocgenTemplateCRUD(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const createdDocgenTemplate: DocGenTemplateBaseV2025R0 =
    await client.docgenTemplate.createDocgenTemplateV2025R0({
      file: new FileReferenceV2025R0({ id: file.id }),
    } satisfies DocGenTemplateCreateRequestV2025R0);
  const docgenTemplates: DocGenTemplatesV2025R0 =
    await client.docgenTemplate.getDocgenTemplatesV2025R0();
  if (!(docgenTemplates.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const fetchedDocgenTemplate: DocGenTemplateV2025R0 =
    await client.docgenTemplate.getDocgenTemplateByIdV2025R0(
      createdDocgenTemplate.file!.id
    );
  if (!(fetchedDocgenTemplate.file!.id == createdDocgenTemplate.file!.id)) {
    throw new Error('Assertion failed');
  }
  const docgenTemplateTags: DocGenTagsV2025R0 =
    await client.docgenTemplate.getDocgenTemplateTagsV2025R0(
      fetchedDocgenTemplate.file!.id
    );
  const docgenTemplateJobs: DocGenJobsV2025R0 =
    await client.docgenTemplate.getDocgenTemplateJobByIdV2025R0(
      fetchedDocgenTemplate.file!.id
    );
  if (!(docgenTemplateJobs.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.docgenTemplate.deleteDocgenTemplateByIdV2025R0(
    createdDocgenTemplate.file!.id
  );
  await client.files.deleteFileById(file.id);
});
export {};
