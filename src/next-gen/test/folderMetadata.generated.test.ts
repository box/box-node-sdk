import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeMetadatas } from '../schemas/metadatas.generated.js';
import { deserializeMetadatas } from '../schemas/metadatas.generated.js';
import { serializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { deserializeMetadataFull } from '../schemas/metadataFull.generated.js';
import { serializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { deserializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { serializeGetFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { deserializeGetFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { serializeUpdateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { deserializeUpdateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { serializeUpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.generated.js';
import { deserializeUpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.generated.js';
import { serializeUpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.generated.js';
import { deserializeUpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.generated.js';
import { serializeDeleteFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { deserializeDeleteFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { serializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { deserializeMetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { serializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { Metadatas } from '../schemas/metadatas.generated.js';
import { MetadataFull } from '../schemas/metadataFull.generated.js';
import { CreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { GetFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { UpdateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { UpdateFolderMetadataByIdRequestBody } from '../managers/folderMetadata.generated.js';
import { UpdateFolderMetadataByIdRequestBodyOpField } from '../managers/folderMetadata.generated.js';
import { DeleteFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { MetadataTemplate } from '../schemas/metadataTemplate.generated.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '../managers/metadataTemplates.generated.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties',
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
    ],
  );
  const receivedUpdatedMetadata: MetadataFull =
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties',
    );
  if (
    !((toString(receivedUpdatedMetadata.extraData!.abc) as string) == newValue)
  ) {
    throw new Error('Assertion failed');
  }
  await client.folderMetadata.deleteFolderMetadataById(
    folder.id,
    'global' as DeleteFolderMetadataByIdScope,
    'properties',
  );
  await expect(async () => {
    await client.folderMetadata.getFolderMetadataById(
      folder.id,
      'global' as GetFolderMetadataByIdScope,
      'properties',
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
  await client.folderMetadata.deleteFolderMetadataById(
    folder.id,
    'enterprise' as DeleteFolderMetadataByIdScope,
    templateKey,
  );
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey,
  );
  await client.folders.deleteFolderById(folder.id);
});
export {};
