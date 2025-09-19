import { serializeMetadataTemplate } from '../schemas/metadataTemplate.js';
import { deserializeMetadataTemplate } from '../schemas/metadataTemplate.js';
import { serializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { serializeUpdateMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { deserializeUpdateMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { serializeUpdateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { deserializeUpdateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { serializeUpdateMetadataTemplateRequestBodyOpField } from '../managers/metadataTemplates.js';
import { deserializeUpdateMetadataTemplateRequestBodyOpField } from '../managers/metadataTemplates.js';
import { serializeGetMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { deserializeGetMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { serializeMetadataTemplates } from '../schemas/metadataTemplates.js';
import { deserializeMetadataTemplates } from '../schemas/metadataTemplates.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeMetadataFull } from '../schemas/metadataFull.js';
import { deserializeMetadataFull } from '../schemas/metadataFull.js';
import { serializeCreateFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { deserializeCreateFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { serializeDeleteFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { deserializeDeleteFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { BoxClient } from '../client.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { UpdateMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { UpdateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { UpdateMetadataTemplateRequestBodyOpField } from '../managers/metadataTemplates.js';
import { GetMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { MetadataTemplates } from '../schemas/metadataTemplates.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { FileFull } from '../schemas/fileFull.js';
import { MetadataFull } from '../schemas/metadataFull.js';
import { CreateFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { GetMetadataTemplatesByInstanceIdQueryParams } from '../managers/metadataTemplates.js';
import { DeleteFileMetadataByIdScope } from '../managers/fileMetadata.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { uploadNewFile } from './commons.js';
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
test('testMetadataTemplates', async function testMetadataTemplates(): Promise<any> {
  const templateKey: string = ''.concat('key', getUuid()) as string;
  const template: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: templateKey,
      templateKey: templateKey,
      fields: [
        {
          type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'testName',
          displayName: 'testName',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'float' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'age',
          displayName: 'age',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'date' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'birthDate',
          displayName: 'birthDate',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'enum' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'countryCode',
          displayName: 'countryCode',
          options: [
            {
              key: 'US',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'CA',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'multiSelect' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'sports',
          displayName: 'sports',
          options: [
            {
              key: 'basketball',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'football',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'tennis',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  if (!(template.templateKey == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(template.displayName == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields!.length == 5)) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![0].key == 'testName')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![0].displayName == 'testName')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(template.fields![0].type) as string) == 'string')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![1].key == 'age')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![1].displayName == 'age')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(template.fields![1].type) as string) == 'float')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![2].key == 'birthDate')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![2].displayName == 'birthDate')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(template.fields![2].type) as string) == 'date')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![3].key == 'countryCode')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![3].displayName == 'countryCode')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(template.fields![3].type) as string) == 'enum')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![4].key == 'sports')) {
    throw new Error('Assertion failed');
  }
  if (!(template.fields![4].displayName == 'sports')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(template.fields![4].type) as string) == 'multiSelect')) {
    throw new Error('Assertion failed');
  }
  const updatedTemplate: MetadataTemplate =
    await client.metadataTemplates.updateMetadataTemplate(
      'enterprise' as UpdateMetadataTemplateScope,
      templateKey,
      [
        {
          op: 'addField' as UpdateMetadataTemplateRequestBodyOpField,
          fieldKey: 'newfieldname',
          data: { ['type']: 'string', ['displayName']: 'newFieldName' },
        } satisfies UpdateMetadataTemplateRequestBody,
      ]
    );
  if (!(updatedTemplate.fields!.length == 6)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTemplate.fields![5].key == 'newfieldname')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTemplate.fields![5].displayName == 'newFieldName')) {
    throw new Error('Assertion failed');
  }
  const getMetadataTemplate: MetadataTemplate =
    await client.metadataTemplates.getMetadataTemplateById(template.id);
  if (!(getMetadataTemplate.id == template.id)) {
    throw new Error('Assertion failed');
  }
  const getMetadataTemplateSchema: MetadataTemplate =
    await client.metadataTemplates.getMetadataTemplate(
      'enterprise' as GetMetadataTemplateScope,
      template.templateKey!
    );
  if (!(getMetadataTemplateSchema.id == template.id)) {
    throw new Error('Assertion failed');
  }
  const enterpriseMetadataTemplates: MetadataTemplates =
    await client.metadataTemplates.getEnterpriseMetadataTemplates();
  if (!(enterpriseMetadataTemplates.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const globalMetadataTemplates: MetadataTemplates =
    await client.metadataTemplates.getGlobalMetadataTemplates();
  if (!(globalMetadataTemplates.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!
  );
  await expect(async () => {
    await client.metadataTemplates.deleteMetadataTemplate(
      'enterprise' as DeleteMetadataTemplateScope,
      template.templateKey!
    );
  }).rejects.toThrow();
});
test('testGetMetadataTemplateByInstance', async function testGetMetadataTemplateByInstance(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const templateKey: string = ''.concat('key', getUuid()) as string;
  const template: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: templateKey,
      templateKey: templateKey,
      fields: [
        {
          type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'testName',
          displayName: 'testName',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  const createdMetadataInstance: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      { ['testName']: 'xyz' }
    );
  const metadataTemplates: MetadataTemplates =
    await client.metadataTemplates.getMetadataTemplatesByInstanceId({
      metadataInstanceId: createdMetadataInstance.id!,
    } satisfies GetMetadataTemplatesByInstanceIdQueryParams);
  if (!(metadataTemplates.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  if (!(metadataTemplates.entries![0].displayName == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(metadataTemplates.entries![0].templateKey == templateKey)) {
    throw new Error('Assertion failed');
  }
  await client.fileMetadata.deleteFileMetadataById(
    file.id,
    'enterprise' as DeleteFileMetadataByIdScope,
    templateKey
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!
  );
  await client.files.deleteFileById(file.id);
});
export {};
