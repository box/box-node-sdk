import { serializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { deserializeMetadataTemplate } from '@/schemas/metadataTemplate';
import { serializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeMetadataFull } from '@/schemas/metadataFull';
import { deserializeMetadataFull } from '@/schemas/metadataFull';
import { serializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { serializeQueryResultsV2026R0 } from '@/schemas/v2026R0/queryResultsV2026R0';
import { deserializeQueryResultsV2026R0 } from '@/schemas/v2026R0/queryResultsV2026R0';
import { serializeQueryRequestBodyV2026R0 } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { deserializeQueryRequestBodyV2026R0 } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { serializeQueryRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { deserializeQueryRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { serializeQueryAncestorReferenceV2026R0 } from '@/schemas/v2026R0/queryAncestorReferenceV2026R0';
import { deserializeQueryAncestorReferenceV2026R0 } from '@/schemas/v2026R0/queryAncestorReferenceV2026R0';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { serializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { deserializeCreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { serializeQueryInsightsMetricDefinitionV2026R0TypeField } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { deserializeQueryInsightsMetricDefinitionV2026R0TypeField } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { serializeQueryInsightsV2026R0 } from '@/schemas/v2026R0/queryInsightsV2026R0';
import { deserializeQueryInsightsV2026R0 } from '@/schemas/v2026R0/queryInsightsV2026R0';
import { serializeQueryInsightsRequestBodyV2026R0 } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { deserializeQueryInsightsRequestBodyV2026R0 } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { serializeQueryInsightsRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { deserializeQueryInsightsRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { serializeQueryInsightsGroupByV2026R0 } from '@/schemas/v2026R0/queryInsightsGroupByV2026R0';
import { deserializeQueryInsightsGroupByV2026R0 } from '@/schemas/v2026R0/queryInsightsGroupByV2026R0';
import { serializeQueryInsightsMetricDefinitionV2026R0 } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { deserializeQueryInsightsMetricDefinitionV2026R0 } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { BoxClient } from '@/client';
import { MetadataTemplate } from '@/schemas/metadataTemplate';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { FileFull } from '@/schemas/fileFull';
import { MetadataFull } from '@/schemas/metadataFull';
import { CreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { QueryResultsV2026R0 } from '@/schemas/v2026R0/queryResultsV2026R0';
import { QueryRequestBodyV2026R0 } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { QueryRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryRequestBodyV2026R0';
import { QueryAncestorReferenceV2026R0 } from '@/schemas/v2026R0/queryAncestorReferenceV2026R0';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { QueryInsightsMetricDefinitionV2026R0TypeField } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { QueryInsightsV2026R0 } from '@/schemas/v2026R0/queryInsightsV2026R0';
import { QueryInsightsRequestBodyV2026R0 } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { QueryInsightsRequestBodyV2026R0QueryField } from '@/schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { QueryInsightsGroupByV2026R0 } from '@/schemas/v2026R0/queryInsightsGroupByV2026R0';
import { getUuid } from '@/internal/utils';
import { delayInSeconds } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { QueryInsightsMetricDefinitionV2026R0 } from '@/schemas/v2026R0/queryInsightsMetricDefinitionV2026R0';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateQueryV2026R0', async function testCreateQueryV2026R0(): Promise<any> {
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
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  if (!(template.templateKey == templateKey)) {
    throw new Error('Assertion failed');
  }
  const file: FileFull = await uploadNewFile();
  const metadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      {
        ['name']: 'John',
        ['age']: 23,
        ['birthDate']: '2001-01-03T02:20:50.520Z',
      },
    );
  if (!(metadata.template == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(metadata.scope == template.scope)) {
    throw new Error('Assertion failed');
  }
  await delayInSeconds(10);
  const searchFrom: string = ''.concat(
    template.scope!,
    ':',
    template.templateKey!,
  ) as string;
  const mdPrefix: string = ''.concat(
    'metadata.',
    template.scope!,
    '."',
    template.templateKey!,
    '"',
  ) as string;
  const predicate: string = ''.concat(
    mdPrefix,
    '.name = :name AND ',
    mdPrefix,
    '.age < :age',
  ) as string;
  const queryResult: QueryResultsV2026R0 =
    await client.query.createQueryV2026R0({
      query: {
        predicate: predicate,
        params: { ['name']: 'John', ['age']: 50 },
        ancestors: [
          { id: '0', type: 'folder' } satisfies QueryAncestorReferenceV2026R0,
        ],
      } satisfies QueryRequestBodyV2026R0QueryField,
      limit: 10,
      fields: ['box:item:name', searchFrom],
    } satisfies QueryRequestBodyV2026R0);
  if (!(queryResult.entries.length >= 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!,
  );
  await client.files.deleteFileById(file.id);
});
test('testCreateQueryInsightV2026R0', async function testCreateQueryInsightV2026R0(): Promise<any> {
  const templateKey: string = ''.concat('key', getUuid()) as string;
  const template: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: templateKey,
      templateKey: templateKey,
      fields: [
        {
          type: 'enum' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'category',
          displayName: 'category',
          options: [
            {
              key: 'Sales',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'Support',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'float' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'amount',
          displayName: 'amount',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  if (!(template.templateKey == templateKey)) {
    throw new Error('Assertion failed');
  }
  const file: FileFull = await uploadNewFile();
  const metadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      { ['category']: 'Sales', ['amount']: 150 },
    );
  if (!(metadata.template == templateKey)) {
    throw new Error('Assertion failed');
  }
  await delayInSeconds(5);
  const mdPrefix: string = ''.concat(
    'metadata.',
    template.scope!,
    '."',
    template.templateKey!,
    '"',
  ) as string;
  const predicate: string = ''.concat(
    mdPrefix,
    '.amount > :minAmount',
  ) as string;
  const metrics: {
    readonly [key: string]: QueryInsightsMetricDefinitionV2026R0;
  } = {
    ['totalAmount']: {
      type: 'sum' as QueryInsightsMetricDefinitionV2026R0TypeField,
      field: ''.concat(mdPrefix, '.amount') as string,
    } satisfies QueryInsightsMetricDefinitionV2026R0,
    ['countItems']: {
      type: 'count' as QueryInsightsMetricDefinitionV2026R0TypeField,
      field: ''.concat(mdPrefix, '.category') as string,
    } satisfies QueryInsightsMetricDefinitionV2026R0,
  };
  const insightResult: QueryInsightsV2026R0 =
    await client.query.createQueryInsightV2026R0({
      query: {
        predicate: predicate,
        params: { ['minAmount']: 0 },
        ancestors: [
          { id: '0', type: 'folder' } satisfies QueryAncestorReferenceV2026R0,
        ],
        groupBy: [
          {
            field: ''.concat(mdPrefix, '.category') as string,
            bucketLimit: 5,
          } satisfies QueryInsightsGroupByV2026R0,
        ],
      } satisfies QueryInsightsRequestBodyV2026R0QueryField,
      metrics: metrics,
    } satisfies QueryInsightsRequestBodyV2026R0);
  if (!(insightResult.insights.length >= 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!,
  );
  await client.files.deleteFileById(file.id);
});
export {};
