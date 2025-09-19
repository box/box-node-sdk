import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
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
import { serializeMetadataFull } from '../schemas/metadataFull.js';
import { deserializeMetadataFull } from '../schemas/metadataFull.js';
import { serializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { deserializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { serializeUpdateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { deserializeUpdateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { serializeUpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.js';
import { deserializeUpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.js';
import { serializeUpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.js';
import { deserializeUpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.js';
import { serializeDeleteFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { deserializeDeleteFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { serializeMetadatas } from '../schemas/metadatas.js';
import { deserializeMetadatas } from '../schemas/metadatas.js';
import { serializeGetFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { deserializeGetFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { BoxClient } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.js';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.js';
import { MetadataFull } from '../schemas/metadataFull.js';
import { CreateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { UpdateFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { UpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.js';
import { UpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.js';
import { DeleteFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.js';
import { Metadatas } from '../schemas/metadatas.js';
import { GetFolderMetadataByIdScope } from '../managers/folderMetadata.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { createNewFolder } from './commons.js';
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
test('testUpdatingFolderMetadata', async function testUpdatingFolderMetadata(): Promise<any> {
  const folder: FolderFull = await createNewFolder();
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
    await client.folderMetadata.createFolderMetadataById(
      folder.id,
      'enterprise' as CreateFolderMetadataByIdScope,
      templateKey,
      {
        ['name']: 'John',
        ['age']: 23,
        ['birthDate']: '2001-01-03T02:20:50.520Z',
        ['countryCode']: 'US',
        ['sports']: ['basketball', 'tennis'],
      }
    );
  const updatedMetadata: MetadataFull =
    await client.folderMetadata.updateFolderMetadataById(
      folder.id,
      'enterprise' as UpdateFolderMetadataByIdScope,
      templateKey,
      [
        {
          op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
          path: '/name',
          value: 'Jack',
        } satisfies UpdateFolderMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
          path: '/age',
          value: 24,
        } satisfies UpdateFolderMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
          path: '/birthDate',
          value: '2000-01-03T02:20:50.520Z',
        } satisfies UpdateFolderMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
          path: '/countryCode',
          value: 'CA',
        } satisfies UpdateFolderMetadataByIdRequestBody,
        {
          op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
          path: '/sports',
          value: ['football'],
        } satisfies UpdateFolderMetadataByIdRequestBody,
      ]
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
  await client.folderMetadata.deleteFolderMetadataById(
    folder.id,
    'enterprise' as DeleteFolderMetadataByIdScope,
    templateKey
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey
  );
  await client.folders.deleteFolderById(folder.id);
});
test('testGlobalFolderMetadata', async function testGlobalFolderMetadata(): Promise<any> {
  const folder: FolderFull = await createNewFolder();
  const folderMetadata: Metadatas =
    await client.folderMetadata.getFolderMetadata(folder.id);
  if (!(folderMetadata.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  const createdMetadata: MetadataFull =
    await client.folderMetadata.createFolderMetadataById(
      folder.id,
      'global' as CreateFolderMetadataByIdScope,
      'properties',
      { ['abc']: 'xyz' }
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
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties'
    );
  if (!((toString(receivedMetadata.extraData!.abc) as string) == 'xyz')) {
    throw new Error('Assertion failed');
  }
  const newValue: string = 'bar';
  await client.folderMetadata.updateFolderMetadataById(
    folder.id,
    'global' as UpdateFolderMetadataByIdScope,
    'properties',
    [
      {
        op: 'replace' as UpdateFolderMetadataByIdRequestBodyOpField,
        path: '/abc',
        value: newValue,
      } satisfies UpdateFolderMetadataByIdRequestBody,
    ]
  );
  const receivedUpdatedMetadata: MetadataFull =
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties'
    );
  if (
    !((toString(receivedUpdatedMetadata.extraData!.abc) as string) == newValue)
  ) {
    throw new Error('Assertion failed');
  }
  await client.folderMetadata.deleteFolderMetadataById(
    folder.id,
    'global' as DeleteFolderMetadataByIdScope,
    'properties'
  );
  await expect(async () => {
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties'
    );
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
test('testEnterpriseFolderMetadata', async function testEnterpriseFolderMetadata(): Promise<any> {
  const folder: FolderFull = await createNewFolder();
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
    await client.folderMetadata.createFolderMetadataById(
      folder.id,
      'enterprise' as CreateFolderMetadataByIdScope,
      templateKey,
      {
        ['name']: 'John',
        ['age']: 23,
        ['birthDate']: '2001-01-03T02:20:50.520Z',
        ['countryCode']: 'US',
        ['sports']: ['basketball', 'tennis'],
      }
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
  await client.folderMetadata.deleteFolderMetadataById(
    folder.id,
    'enterprise' as DeleteFolderMetadataByIdScope,
    templateKey
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey
  );
  await client.folders.deleteFolderById(folder.id);
});
export {};
