import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeDocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { deserializeDocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { serializeDocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { deserializeDocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { serializeFileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { deserializeFileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { serializeDocGenTemplatesV2025R0 } from '@/schemas/v2025R0/docGenTemplatesV2025R0';
import { deserializeDocGenTemplatesV2025R0 } from '@/schemas/v2025R0/docGenTemplatesV2025R0';
import { serializeDocGenTemplateV2025R0 } from '@/schemas/v2025R0/docGenTemplateV2025R0';
import { deserializeDocGenTemplateV2025R0 } from '@/schemas/v2025R0/docGenTemplateV2025R0';
import { serializeDocGenTagsV2025R0 } from '@/schemas/v2025R0/docGenTagsV2025R0';
import { deserializeDocGenTagsV2025R0 } from '@/schemas/v2025R0/docGenTagsV2025R0';
import { serializeDocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { deserializeDocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { DocGenTemplateBaseV2025R0 } from '@/schemas/v2025R0/docGenTemplateBaseV2025R0';
import { DocGenTemplateCreateRequestV2025R0 } from '@/schemas/v2025R0/docGenTemplateCreateRequestV2025R0';
import { FileReferenceV2025R0 } from '@/schemas/v2025R0/fileReferenceV2025R0';
import { DocGenTemplatesV2025R0 } from '@/schemas/v2025R0/docGenTemplatesV2025R0';
import { DocGenTemplateV2025R0 } from '@/schemas/v2025R0/docGenTemplateV2025R0';
import { DocGenTagsV2025R0 } from '@/schemas/v2025R0/docGenTagsV2025R0';
import { DocGenJobsV2025R0 } from '@/schemas/v2025R0/docGenJobsV2025R0';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
      createdDocgenTemplate.file!.id,
    );
  if (!(fetchedDocgenTemplate.file!.id == createdDocgenTemplate.file!.id)) {
    throw new Error('Assertion failed');
  }
  const docgenTemplateTags: DocGenTagsV2025R0 =
    await client.docgenTemplate.getDocgenTemplateTagsV2025R0(
      fetchedDocgenTemplate.file!.id,
    );
  const docgenTemplateJobs: DocGenJobsV2025R0 =
    await client.docgenTemplate.getDocgenTemplateJobByIdV2025R0(
      fetchedDocgenTemplate.file!.id,
    );
  if (!(docgenTemplateJobs.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.docgenTemplate.deleteDocgenTemplateByIdV2025R0(
    createdDocgenTemplate.file!.id,
  );
  await client.files.deleteFileById(file.id);
});
export {};
