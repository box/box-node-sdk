import { serializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeMetadataCascadePolicy } from '@/schemas/metadataCascadePolicy';
import { deserializeMetadataCascadePolicy } from '@/schemas/metadataCascadePolicy';
import { serializeCreateMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { deserializeCreateMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { serializeCreateMetadataCascadePolicyRequestBodyScopeField } from '@/managers/metadataCascadePolicies';
import { deserializeCreateMetadataCascadePolicyRequestBodyScopeField } from '@/managers/metadataCascadePolicies';
import { serializeMetadataCascadePolicies } from '@/schemas/metadataCascadePolicies';
import { deserializeMetadataCascadePolicies } from '@/schemas/metadataCascadePolicies';
import { serializeApplyMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { deserializeApplyMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '@/managers/metadataCascadePolicies';
import { deserializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '@/managers/metadataCascadePolicies';
import { serializeCreateFolderMetadataByIdScope } from '@/managers/folderMetadata';
import { deserializeCreateFolderMetadataByIdScope } from '@/managers/folderMetadata';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { BoxClient } from '@/client';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { FolderFull } from '@/schemas/folderFull';
import { MetadataCascadePolicy } from '@/schemas/metadataCascadePolicy';
import { CreateMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { CreateMetadataCascadePolicyRequestBodyScopeField } from '@/managers/metadataCascadePolicies';
import { MetadataCascadePolicies } from '@/schemas/metadataCascadePolicies';
import { GetMetadataCascadePoliciesQueryParams } from '@/managers/metadataCascadePolicies';
import { ApplyMetadataCascadePolicyRequestBody } from '@/managers/metadataCascadePolicies';
import { ApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '@/managers/metadataCascadePolicies';
import { CreateFolderMetadataByIdScope } from '@/managers/folderMetadata';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { createNewFolder } from './commons';
import { uploadNewFile } from './commons';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testMetadataCascadePolicies', async function testMetadataCascadePolicies(): Promise<any> {
  const templateKey: string = ''.concat('key', getUuid()) as string;
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
  const folder: FolderFull = await createNewFolder();
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const cascadePolicy: MetadataCascadePolicy =
    await client.metadataCascadePolicies.createMetadataCascadePolicy({
      folderId: folder.id,
      scope: 'enterprise' as CreateMetadataCascadePolicyRequestBodyScopeField,
      templateKey: templateKey,
    } satisfies CreateMetadataCascadePolicyRequestBody);
  if (
    !((toString(cascadePolicy.type) as string) == 'metadata_cascade_policy')
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(cascadePolicy.ownerEnterprise!.type!) as string) == 'enterprise'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(cascadePolicy.ownerEnterprise!.id!) as string) == enterpriseId)
  ) {
    throw new Error('Assertion failed');
  }
  if (!((toString(cascadePolicy.parent!.type!) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
  if (!(cascadePolicy.parent!.id! == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(cascadePolicy.scope!) as string) ==
      (''.concat('enterprise_', enterpriseId) as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(cascadePolicy.templateKey! == templateKey)) {
    throw new Error('Assertion failed');
  }
  const cascadePolicyId: string = cascadePolicy.id;
  const policyFromTheApi: MetadataCascadePolicy =
    await client.metadataCascadePolicies.getMetadataCascadePolicyById(
      cascadePolicyId,
    );
  if (!(cascadePolicyId == policyFromTheApi.id)) {
    throw new Error('Assertion failed');
  }
  const policies: MetadataCascadePolicies =
    await client.metadataCascadePolicies.getMetadataCascadePolicies({
      folderId: folder.id,
    } satisfies GetMetadataCascadePoliciesQueryParams);
  if (!(policies.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.metadataCascadePolicies.applyMetadataCascadePolicy(
      cascadePolicyId,
      {
        conflictResolution:
          'overwrite' as ApplyMetadataCascadePolicyRequestBodyConflictResolutionField,
      } satisfies ApplyMetadataCascadePolicyRequestBody,
    );
  }).rejects.toThrow();
  await client.folderMetadata.createFolderMetadataById(
    folder.id,
    'enterprise' as CreateFolderMetadataByIdScope,
    templateKey,
    { ['testName']: 'xyz' },
  );
  await client.metadataCascadePolicies.applyMetadataCascadePolicy(
    cascadePolicyId,
    {
      conflictResolution:
        'overwrite' as ApplyMetadataCascadePolicyRequestBodyConflictResolutionField,
    } satisfies ApplyMetadataCascadePolicyRequestBody,
  );
  await client.metadataCascadePolicies.deleteMetadataCascadePolicyById(
    cascadePolicyId,
  );
  await expect(async () => {
    await client.metadataCascadePolicies.getMetadataCascadePolicyById(
      cascadePolicyId,
    );
  }).rejects.toThrow();
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    templateKey,
  );
  await client.folders.deleteFolderById(folder.id);
});
export {};
