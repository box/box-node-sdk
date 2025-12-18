import { serializeMetadataTaxonomy } from '@/schemas/metadataTaxonomy';
import { deserializeMetadataTaxonomy } from '@/schemas/metadataTaxonomy';
import { serializeCreateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeCreateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { serializeMetadataTaxonomies } from '@/schemas/metadataTaxonomies';
import { deserializeMetadataTaxonomies } from '@/schemas/metadataTaxonomies';
import { serializeUpdateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeUpdateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { serializeMetadataTaxonomyLevels } from '@/schemas/metadataTaxonomyLevels';
import { deserializeMetadataTaxonomyLevels } from '@/schemas/metadataTaxonomyLevels';
import { serializeMetadataTaxonomyLevel } from '@/schemas/metadataTaxonomyLevel';
import { deserializeMetadataTaxonomyLevel } from '@/schemas/metadataTaxonomyLevel';
import { serializeUpdateMetadataTaxonomyLevelByIdRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeUpdateMetadataTaxonomyLevelByIdRequestBody } from '@/managers/metadataTaxonomies';
import { serializeAddMetadataTaxonomyLevelRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeAddMetadataTaxonomyLevelRequestBody } from '@/managers/metadataTaxonomies';
import { serializeMetadataTaxonomyNode } from '@/schemas/metadataTaxonomyNode';
import { deserializeMetadataTaxonomyNode } from '@/schemas/metadataTaxonomyNode';
import { serializeCreateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeCreateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { serializeMetadataTaxonomyNodes } from '@/schemas/metadataTaxonomyNodes';
import { deserializeMetadataTaxonomyNodes } from '@/schemas/metadataTaxonomyNodes';
import { serializeUpdateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { deserializeUpdateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { serializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { deserializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { serializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsRulesField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsRulesField } from '@/managers/metadataTemplates';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { UpdateMetadataTaxonomyNodeOptionalsInput } from '@/managers/metadataTaxonomies';
import { UpdateMetadataTaxonomyNodeOptionals } from '@/managers/metadataTaxonomies';
import { BoxClient } from '@/client';
import { MetadataTaxonomy } from '@/schemas/metadataTaxonomy';
import { CreateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { MetadataTaxonomies } from '@/schemas/metadataTaxonomies';
import { UpdateMetadataTaxonomyRequestBody } from '@/managers/metadataTaxonomies';
import { MetadataTaxonomyLevels } from '@/schemas/metadataTaxonomyLevels';
import { MetadataTaxonomyLevel } from '@/schemas/metadataTaxonomyLevel';
import { UpdateMetadataTaxonomyLevelByIdRequestBody } from '@/managers/metadataTaxonomies';
import { AddMetadataTaxonomyLevelRequestBody } from '@/managers/metadataTaxonomies';
import { MetadataTaxonomyNode } from '@/schemas/metadataTaxonomyNode';
import { CreateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { MetadataTaxonomyNodes } from '@/schemas/metadataTaxonomyNodes';
import { UpdateMetadataTaxonomyNodeRequestBody } from '@/managers/metadataTaxonomies';
import { MetadataTemplate } from '@/schemas/metadataTemplate';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsOptionsRulesField } from '@/managers/metadataTemplates';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { delayInSeconds } from '@/internal/utils';
import { getDefaultClient } from './commons';
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
test('testMetadataTaxonomiesCRUD', async function testMetadataTaxonomiesCRUD(): Promise<any> {
  const namespace: string = ''.concat(
    'enterprise_',
    getEnvVar('ENTERPRISE_ID'),
  ) as string;
  const uuid: string = getUuid();
  const taxonomyKey: string = ''.concat('geography', uuid) as string;
  const displayName: string = ''.concat('Geography Taxonomy', uuid) as string;
  const createdTaxonomy: MetadataTaxonomy =
    await client.metadataTaxonomies.createMetadataTaxonomy({
      displayName: displayName,
      key: taxonomyKey,
      namespace: namespace,
    } satisfies CreateMetadataTaxonomyRequestBody);
  if (!(createdTaxonomy.displayName == displayName)) {
    throw new Error('Assertion failed');
  }
  if (!(createdTaxonomy.namespace == namespace)) {
    throw new Error('Assertion failed');
  }
  const taxonomies: MetadataTaxonomies =
    await client.metadataTaxonomies.getMetadataTaxonomies(namespace);
  if (!(taxonomies.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  if (!(taxonomies.entries![0].namespace == namespace)) {
    throw new Error('Assertion failed');
  }
  const updatedDisplayName: string = ''.concat(
    'Geography Taxonomy UPDATED',
    uuid,
  ) as string;
  const updatedTaxonomy: MetadataTaxonomy =
    await client.metadataTaxonomies.updateMetadataTaxonomy(
      namespace,
      taxonomyKey,
      {
        displayName: updatedDisplayName,
      } satisfies UpdateMetadataTaxonomyRequestBody,
    );
  if (!(updatedTaxonomy.displayName == updatedDisplayName)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTaxonomy.namespace == namespace)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTaxonomy.id == createdTaxonomy.id)) {
    throw new Error('Assertion failed');
  }
  const getTaxonomy: MetadataTaxonomy =
    await client.metadataTaxonomies.getMetadataTaxonomyByKey(
      namespace,
      taxonomyKey,
    );
  if (!(getTaxonomy.displayName == updatedDisplayName)) {
    throw new Error('Assertion failed');
  }
  if (!(getTaxonomy.namespace == namespace)) {
    throw new Error('Assertion failed');
  }
  if (!(getTaxonomy.id == createdTaxonomy.id)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTaxonomies.deleteMetadataTaxonomy(
    namespace,
    taxonomyKey,
  );
  await expect(async () => {
    await client.metadataTaxonomies.getMetadataTaxonomyByKey(
      namespace,
      taxonomyKey,
    );
  }).rejects.toThrow();
});
test('testMetadataTaxonomiesNodes', async function testMetadataTaxonomiesNodes(): Promise<any> {
  const namespace: string = ''.concat(
    'enterprise_',
    getEnvVar('ENTERPRISE_ID'),
  ) as string;
  const uuid: string = getUuid();
  const taxonomyKey: string = ''.concat('geography', uuid) as string;
  const displayName: string = ''.concat('Geography Taxonomy', uuid) as string;
  const createdTaxonomy: MetadataTaxonomy =
    await client.metadataTaxonomies.createMetadataTaxonomy({
      displayName: displayName,
      key: taxonomyKey,
      namespace: namespace,
    } satisfies CreateMetadataTaxonomyRequestBody);
  if (!(createdTaxonomy.displayName == displayName)) {
    throw new Error('Assertion failed');
  }
  if (!(createdTaxonomy.namespace == namespace)) {
    throw new Error('Assertion failed');
  }
  const taxonomyLevels: MetadataTaxonomyLevels =
    await client.metadataTaxonomies.createMetadataTaxonomyLevel(
      namespace,
      taxonomyKey,
      [
        {
          displayName: 'Continent',
          description: 'Continent Level',
        } satisfies MetadataTaxonomyLevel,
        {
          displayName: 'Country',
          description: 'Country Level',
        } satisfies MetadataTaxonomyLevel,
      ],
    );
  if (!(taxonomyLevels.entries!.length == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(taxonomyLevels.entries![0].displayName == 'Continent')) {
    throw new Error('Assertion failed');
  }
  if (!(taxonomyLevels.entries![1].displayName == 'Country')) {
    throw new Error('Assertion failed');
  }
  const updatedTaxonomyLevels: MetadataTaxonomyLevel =
    await client.metadataTaxonomies.updateMetadataTaxonomyLevelById(
      namespace,
      taxonomyKey,
      1,
      {
        displayName: 'Continent UPDATED',
        description: 'Continent Level UPDATED',
      } satisfies UpdateMetadataTaxonomyLevelByIdRequestBody,
    );
  if (!(updatedTaxonomyLevels.displayName == 'Continent UPDATED')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTaxonomyLevels.description == 'Continent Level UPDATED')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedTaxonomyLevels.level == taxonomyLevels.entries![0].level)) {
    throw new Error('Assertion failed');
  }
  const taxonomyLevelsAfterAddition: MetadataTaxonomyLevels =
    await client.metadataTaxonomies.addMetadataTaxonomyLevel(
      namespace,
      taxonomyKey,
      {
        displayName: 'Region',
        description: 'Region Description',
      } satisfies AddMetadataTaxonomyLevelRequestBody,
    );
  if (!(taxonomyLevelsAfterAddition.entries!.length == 3)) {
    throw new Error('Assertion failed');
  }
  if (!(taxonomyLevelsAfterAddition.entries![2].displayName == 'Region')) {
    throw new Error('Assertion failed');
  }
  const taxonomyLevelsAfterDeletion: MetadataTaxonomyLevels =
    await client.metadataTaxonomies.deleteMetadataTaxonomyLevel(
      namespace,
      taxonomyKey,
    );
  if (!(taxonomyLevelsAfterDeletion.entries!.length == 2)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      taxonomyLevelsAfterDeletion.entries![0].displayName == 'Continent UPDATED'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(taxonomyLevelsAfterDeletion.entries![1].displayName == 'Country')) {
    throw new Error('Assertion failed');
  }
  const continentNode: MetadataTaxonomyNode =
    await client.metadataTaxonomies.createMetadataTaxonomyNode(
      namespace,
      taxonomyKey,
      {
        displayName: 'Europe',
        level: 1,
      } satisfies CreateMetadataTaxonomyNodeRequestBody,
    );
  if (!(continentNode.displayName == 'Europe')) {
    throw new Error('Assertion failed');
  }
  if (!(continentNode.level == 1)) {
    throw new Error('Assertion failed');
  }
  const countryNode: MetadataTaxonomyNode =
    await client.metadataTaxonomies.createMetadataTaxonomyNode(
      namespace,
      taxonomyKey,
      {
        displayName: 'Poland',
        level: 2,
        parentId: continentNode.id,
      } satisfies CreateMetadataTaxonomyNodeRequestBody,
    );
  if (!(countryNode.displayName == 'Poland')) {
    throw new Error('Assertion failed');
  }
  if (!(countryNode.level == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(countryNode.parentId == continentNode.id)) {
    throw new Error('Assertion failed');
  }
  await delayInSeconds(5);
  const allNodes: MetadataTaxonomyNodes =
    await client.metadataTaxonomies.getMetadataTaxonomyNodes(
      namespace,
      taxonomyKey,
    );
  if (!(allNodes.entries!.length == 2)) {
    throw new Error('Assertion failed');
  }
  const updatedCountryNode: MetadataTaxonomyNode =
    await client.metadataTaxonomies.updateMetadataTaxonomyNode(
      namespace,
      taxonomyKey,
      countryNode.id,
      {
        requestBody: {
          displayName: 'Poland UPDATED',
        } satisfies UpdateMetadataTaxonomyNodeRequestBody,
      } satisfies UpdateMetadataTaxonomyNodeOptionalsInput,
    );
  if (!(updatedCountryNode.displayName == 'Poland UPDATED')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCountryNode.level == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCountryNode.parentId == countryNode.parentId)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCountryNode.id == countryNode.id)) {
    throw new Error('Assertion failed');
  }
  const getCountryNode: MetadataTaxonomyNode =
    await client.metadataTaxonomies.getMetadataTaxonomyNodeById(
      namespace,
      taxonomyKey,
      countryNode.id,
    );
  if (!(getCountryNode.displayName == 'Poland UPDATED')) {
    throw new Error('Assertion failed');
  }
  if (!(getCountryNode.id == countryNode.id)) {
    throw new Error('Assertion failed');
  }
  const metadataTemplateKey: string = ''.concat(
    'templateKey',
    getUuid(),
  ) as string;
  const metadataTemplate: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: metadataTemplateKey,
      templateKey: metadataTemplateKey,
      fields: [
        {
          type: 'taxonomy' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'taxonomy',
          displayName: 'taxonomy',
          taxonomyKey: taxonomyKey,
          namespace: namespace,
          optionsRules: {
            multiSelect: true,
            selectableLevels: [1],
          } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsRulesField,
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  if (!(metadataTemplate.templateKey == metadataTemplateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(metadataTemplate.displayName == metadataTemplateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(metadataTemplate.fields!.length == 1)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(metadataTemplate.fields![0].type) as string) == 'taxonomy')) {
    throw new Error('Assertion failed');
  }
  const options: MetadataTaxonomyNodes =
    await client.metadataTaxonomies.getMetadataTemplateFieldOptions(
      namespace,
      metadataTemplateKey,
      'taxonomy',
    );
  if (!(options.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    metadataTemplateKey,
  );
  await client.metadataTaxonomies.deleteMetadataTaxonomyNode(
    namespace,
    taxonomyKey,
    countryNode.id,
  );
  await client.metadataTaxonomies.deleteMetadataTaxonomyNode(
    namespace,
    taxonomyKey,
    continentNode.id,
  );
  await delayInSeconds(5);
  const allNodesAfterDeletion: MetadataTaxonomyNodes =
    await client.metadataTaxonomies.getMetadataTaxonomyNodes(
      namespace,
      taxonomyKey,
    );
  if (!(allNodesAfterDeletion.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTaxonomies.deleteMetadataTaxonomy(
    namespace,
    taxonomyKey,
  );
});
export {};
