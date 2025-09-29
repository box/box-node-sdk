import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { deserializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { serializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { serializeMetadataFull } from '@/schemas/metadataFull';
import { deserializeMetadataFull } from '@/schemas/metadataFull';
import { serializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { serializeUpdateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeUpdateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { serializeUpdateFileMetadataByIdRequestBody } from '@/managers/fileMetadata';
import { deserializeUpdateFileMetadataByIdRequestBody } from '@/managers/fileMetadata';
import { serializeUpdateFileMetadataByIdRequestBodyOpField } from '@/managers/fileMetadata';
import { deserializeUpdateFileMetadataByIdRequestBodyOpField } from '@/managers/fileMetadata';
import { serializeDeleteFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeDeleteFileMetadataByIdScope } from '@/managers/fileMetadata';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { serializeMetadatas } from '@/schemas/metadatas';
import { deserializeMetadatas } from '@/schemas/metadatas';
import { serializeGetFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeGetFileMetadataByIdScope } from '@/managers/fileMetadata';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { MetadataTemplate } from '@/schemas/metadataTemplate';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { MetadataFull } from '@/schemas/metadataFull';
import { CreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { UpdateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { UpdateFileMetadataByIdRequestBody } from '@/managers/fileMetadata';
import { UpdateFileMetadataByIdRequestBodyOpField } from '@/managers/fileMetadata';
import { DeleteFileMetadataByIdScope } from '@/managers/fileMetadata';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { Metadatas } from '@/schemas/metadatas';
import { GetFileMetadataByIdScope } from '@/managers/fileMetadata';
import { generateByteStream } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
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
test('testUpdatingFileMetadata', async function testUpdatingFileMetadata(): Promise<any> {
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
          key: 'name',
          displayName: 'name',
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
  const createdMetadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      {
        ['name']: 'John',
        ['age']: 23,
        ['birthDate']: '2001-01-03T02:20:50.520Z',
        ['countryCode']: 'US',
        ['sports']: ['basketball', 'tennis'],
      },
    );
  const updatedMetadata: MetadataFull =
    await client.fileMetadata.updateFileMetadataById(
      file.id,
      'enterprise' as UpdateFileMetadataByIdScope,
      templateKey,
      [
        {
          op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
          path: '/name',
          value: 'Jack',
        } satisfies UpdateFileMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
          path: '/age',
          value: 24,
        } satisfies UpdateFileMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
          path: '/birthDate',
          value: '2000-01-03T02:20:50.520Z',
        } satisfies UpdateFileMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
          path: '/countryCode',
          value: 'CA',
        } satisfies UpdateFileMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
          path: '/sports',
          value: ['football'],
        } satisfies UpdateFileMetadataByIdRequestBody,
      ],
    );
  if (!((toString(updatedMetadata.template) as string) == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedMetadata.extraData!.name) as string) == 'Jack')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedMetadata.extraData!.age) as string) == '24')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(updatedMetadata.extraData!.birthDate) as string) ==
      '2000-01-03T02:20:50.520Z'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedMetadata.extraData!.countryCode) as string) == 'CA')) {
    throw new Error('Assertion failed');
  }
  const sports: readonly string[] = updatedMetadata.extraData!.sports;
  if (!(sports[0] == 'football')) {
    throw new Error('Assertion failed');
  }
  await client.fileMetadata.deleteFileMetadataById(
    file.id,
    'enterprise' as DeleteFileMetadataByIdScope,
    templateKey,
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey,
  );
  await client.files.deleteFileById(file.id);
});
test('testGlobalFileMetadata', async function testGlobalFileMetadata(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const fileMetadata: Metadatas = await client.fileMetadata.getFileMetadata(
    file.id,
  );
  if (!(fileMetadata.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  const createdMetadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'global' as CreateFileMetadataByIdScope,
      'properties',
      { ['abc']: 'xyz' },
    );
  if (!((toString(createdMetadata.template) as string) == 'properties')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdMetadata.scope) as string) == 'global')) {
    throw new Error('Assertion failed');
  }
  if (!(createdMetadata.version == 0)) {
    throw new Error('Assertion failed');
  }
  const receivedMetadata: MetadataFull =
    await client.fileMetadata.getFileMetadataById(
      file.id,
      'global' as GetFileMetadataByIdScope,
      'properties',
    );
  if (!((toString(receivedMetadata.extraData!.abc) as string) == 'xyz')) {
    throw new Error('Assertion failed');
  }
  const newValue: string = 'bar';
  await client.fileMetadata.updateFileMetadataById(
    file.id,
    'global' as UpdateFileMetadataByIdScope,
    'properties',
    [
      {
        op: 'replace' as UpdateFileMetadataByIdRequestBodyOpField,
        path: '/abc',
        value: newValue,
      } satisfies UpdateFileMetadataByIdRequestBody,
    ],
  );
  const receivedUpdatedMetadata: MetadataFull =
    await client.fileMetadata.getFileMetadataById(
      file.id,
      'global' as GetFileMetadataByIdScope,
      'properties',
    );
  if (
    !((toString(receivedUpdatedMetadata.extraData!.abc) as string) == newValue)
  ) {
    throw new Error('Assertion failed');
  }
  await client.fileMetadata.deleteFileMetadataById(
    file.id,
    'global' as DeleteFileMetadataByIdScope,
    'properties',
  );
  await expect(async () => {
    await client.fileMetadata.getFileMetadataById(
      file.id,
      'global' as GetFileMetadataByIdScope,
      'properties',
    );
  }).rejects.toThrow();
  await client.files.deleteFileById(file.id);
});
test('testEnterpriseFileMetadata', async function testEnterpriseFileMetadata(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const templateKey: string = ''.concat('key', getUuid()) as string;
  await client.metadataTemplates.createMetadataTemplate({
    scope: 'enterprise',
    displayName: templateKey,
    templateKey: templateKey,
    fields: [
      {
        type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
        key: 'name',
        displayName: 'name',
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
  const createdMetadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      {
        ['name']: 'John',
        ['age']: 23,
        ['birthDate']: '2001-01-03T02:20:50.520Z',
        ['countryCode']: 'US',
        ['sports']: ['basketball', 'tennis'],
      },
    );
  if (!((toString(createdMetadata.template) as string) == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdMetadata.extraData!.name) as string) == 'John')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdMetadata.extraData!.age) as string) == '23')) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(createdMetadata.extraData!.birthDate) as string) ==
      '2001-01-03T02:20:50.520Z'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdMetadata.extraData!.countryCode) as string) == 'US')) {
    throw new Error('Assertion failed');
  }
  const sports: readonly string[] = createdMetadata.extraData!.sports;
  if (!(sports[0] == 'basketball')) {
    throw new Error('Assertion failed');
  }
  if (!(sports[1] == 'tennis')) {
    throw new Error('Assertion failed');
  }
  await client.fileMetadata.deleteFileMetadataById(
    file.id,
    'enterprise' as DeleteFileMetadataByIdScope,
    templateKey,
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey,
  );
  await client.files.deleteFileById(file.id);
});
export {};
