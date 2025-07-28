import { serializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeMetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { deserializeMetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { serializeCreateMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { deserializeCreateMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { serializeCreateMetadataCascadePolicyRequestBodyScopeField } from '../managers/metadataCascadePolicies.generated.js';
import { deserializeCreateMetadataCascadePolicyRequestBodyScopeField } from '../managers/metadataCascadePolicies.generated.js';
import { serializeMetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { deserializeMetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { serializeApplyMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { deserializeApplyMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '../managers/metadataCascadePolicies.generated.js';
import { deserializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '../managers/metadataCascadePolicies.generated.js';
import { serializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { deserializeCreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { serializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { deserializeDeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { BoxClient } from '../client.generated.js';
import { CreateMetadataTemplateRequestBody } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsField } from '../managers/metadataTemplates.generated.js';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '../managers/metadataTemplates.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { MetadataCascadePolicy } from '../schemas/metadataCascadePolicy.generated.js';
import { CreateMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { CreateMetadataCascadePolicyRequestBodyScopeField } from '../managers/metadataCascadePolicies.generated.js';
import { MetadataCascadePolicies } from '../schemas/metadataCascadePolicies.generated.js';
import { GetMetadataCascadePoliciesQueryParams } from '../managers/metadataCascadePolicies.generated.js';
import { ApplyMetadataCascadePolicyRequestBody } from '../managers/metadataCascadePolicies.generated.js';
import { ApplyMetadataCascadePolicyRequestBodyConflictResolutionField } from '../managers/metadataCascadePolicies.generated.js';
import { CreateFolderMetadataByIdScope } from '../managers/folderMetadata.generated.js';
import { DeleteMetadataTemplateScope } from '../managers/metadataTemplates.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
