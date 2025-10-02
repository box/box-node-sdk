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
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeMetadataFull } from '@/schemas/metadataFull';
import { deserializeMetadataFull } from '@/schemas/metadataFull';
import { serializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { deserializeCreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { serializeMetadataQueryResults } from '@/schemas/metadataQueryResults';
import { deserializeMetadataQueryResults } from '@/schemas/metadataQueryResults';
import { serializeMetadataQuery } from '@/schemas/metadataQuery';
import { deserializeMetadataQuery } from '@/schemas/metadataQuery';
import { serializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { deserializeDeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { serializeSearchResultsResponse } from '@/schemas/searchResultsResponse';
import { deserializeSearchResultsResponse } from '@/schemas/searchResultsResponse';
import { serializeMetadataFilter } from '@/schemas/metadataFilter';
import { deserializeMetadataFilter } from '@/schemas/metadataFilter';
import { serializeMetadataFilterScopeField } from '@/schemas/metadataFilter';
import { deserializeMetadataFilterScopeField } from '@/schemas/metadataFilter';
import { serializeSearchForContentQueryParamsTrashContentField } from '@/managers/search';
import { deserializeSearchForContentQueryParamsTrashContentField } from '@/managers/search';
import { serializeMetadataFieldFilterDateRange } from '@/schemas/metadataFieldFilterDateRange';
import { deserializeMetadataFieldFilterDateRange } from '@/schemas/metadataFieldFilterDateRange';
import { serializeMetadataFieldFilterFloatRange } from '@/schemas/metadataFieldFilterFloatRange';
import { deserializeMetadataFieldFilterFloatRange } from '@/schemas/metadataFieldFilterFloatRange';
import { serializeSearchResults } from '@/schemas/searchResults';
import { deserializeSearchResults } from '@/schemas/searchResults';
import { serializeSearchResultsWithSharedLinks } from '@/schemas/searchResultsWithSharedLinks';
import { deserializeSearchResultsWithSharedLinks } from '@/schemas/searchResultsWithSharedLinks';
import { serializeMetadataFilterValue } from '@/schemas/metadataFilterValue';
import { deserializeMetadataFilterValue } from '@/schemas/metadataFilterValue';
import { BoxClient } from '@/client';
import { MetadataTemplate } from '@/schemas/metadataTemplate';
import { CreateMetadataTemplateRequestBody } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsTypeField } from '@/managers/metadataTemplates';
import { CreateMetadataTemplateRequestBodyFieldsOptionsField } from '@/managers/metadataTemplates';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { MetadataFull } from '@/schemas/metadataFull';
import { CreateFileMetadataByIdScope } from '@/managers/fileMetadata';
import { MetadataQueryResults } from '@/schemas/metadataQueryResults';
import { MetadataQuery } from '@/schemas/metadataQuery';
import { DeleteMetadataTemplateScope } from '@/managers/metadataTemplates';
import { SearchResultsResponse } from '@/schemas/searchResultsResponse';
import { SearchForContentQueryParams } from '@/managers/search';
import { MetadataFilter } from '@/schemas/metadataFilter';
import { MetadataFilterScopeField } from '@/schemas/metadataFilter';
import { SearchForContentQueryParamsTrashContentField } from '@/managers/search';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { dateTimeFromString } from '@/internal/utils';
import { delayInSeconds } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { MetadataFieldFilterDateRange } from '@/schemas/metadataFieldFilterDateRange';
import { MetadataFieldFilterFloatRange } from '@/schemas/metadataFieldFilterFloatRange';
import { SearchResults } from '@/schemas/searchResults';
import { SearchResultsWithSharedLinks } from '@/schemas/searchResultsWithSharedLinks';
import { MetadataFilterValue } from '@/schemas/metadataFilterValue';
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
test('testCreateMetaDataQueryExecuteRead', async function testCreateMetaDataQueryExecuteRead(): Promise<any> {
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
  if (!(template.templateKey == templateKey)) {
    throw new Error('Assertion failed');
  }
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  const metadata: MetadataFull =
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
  if (!(metadata.template == templateKey)) {
    throw new Error('Assertion failed');
  }
  if (!(metadata.scope == template.scope)) {
    throw new Error('Assertion failed');
  }
  await delayInSeconds(5);
  const searchFrom: string = ''.concat(
    template.scope!,
    '.',
    template.templateKey!,
  ) as string;
  const query: MetadataQueryResults = await client.search.searchByMetadataQuery(
    {
      ancestorFolderId: '0',
      from: searchFrom,
      query:
        'name = :name AND age < :age AND birthDate >= :birthDate AND countryCode = :countryCode AND sports = :sports',
      queryParams: {
        ['name']: 'John',
        ['age']: 50,
        ['birthDate']: '2001-01-01T02:20:10.120Z',
        ['countryCode']: 'US',
        ['sports']: ['basketball', 'tennis'],
      },
    } satisfies MetadataQuery,
  );
  if (!(query.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!,
  );
  await client.files.deleteFileById(file.id);
});
test('testMetadataFilters', async function testMetadataFilters(): Promise<any> {
  const templateKey: string = ''.concat('key', getUuid()) as string;
  const template: MetadataTemplate =
    await client.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: templateKey,
      templateKey: templateKey,
      fields: [
        {
          type: 'float' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'floatField',
          displayName: 'floatField',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'string' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'stringField',
          displayName: 'stringField',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'date' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'dateField',
          displayName: 'dateField',
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'enum' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'enumField',
          displayName: 'enumField',
          options: [
            {
              key: 'enumValue1',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'enumValue2',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
        {
          type: 'multiSelect' as CreateMetadataTemplateRequestBodyFieldsTypeField,
          key: 'multiSelectField',
          displayName: 'multiSelectField',
          options: [
            {
              key: 'multiSelectValue1',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
            {
              key: 'multiSelectValue2',
            } satisfies CreateMetadataTemplateRequestBodyFieldsOptionsField,
          ],
        } satisfies CreateMetadataTemplateRequestBodyFieldsField,
      ],
    } satisfies CreateMetadataTemplateRequestBody);
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  const metadata: MetadataFull =
    await client.fileMetadata.createFileMetadataById(
      file.id,
      'enterprise' as CreateFileMetadataByIdScope,
      templateKey,
      {
        ['floatField']: 10,
        ['stringField']: 'stringValue',
        ['dateField']: '2035-01-02T00:00:00Z',
        ['enumField']: 'enumValue2',
        ['multiSelectField']: ['multiSelectValue1', 'multiSelectValue2'],
      },
    );
  const searchFilters: {
    readonly [key: string]: MetadataFilterValue;
  } = {
    ['stringField']: 'stringValue',
    ['dateField']: {
      lt: dateTimeFromString('2035-01-01T00:00:00Z'),
      gt: dateTimeFromString('2035-01-03T00:00:00Z'),
    } satisfies MetadataFieldFilterDateRange,
    ['floatField']: {
      lt: 9.5,
      gt: 10.5,
    } satisfies MetadataFieldFilterFloatRange,
    ['enumField']: 'enumValue2',
    ['multiSelectField']: ['multiSelectValue1', 'multiSelectValue2'],
  };
  const query: SearchResultsResponse = await client.search.searchForContent({
    ancestorFolderIds: ['0'],
    mdfilters: [
      {
        filters: searchFilters,
        scope: 'enterprise' as MetadataFilterScopeField,
        templateKey: templateKey,
      } satisfies MetadataFilter,
    ],
  } satisfies SearchForContentQueryParams);
  const queryResults: SearchResults = query as SearchResults;
  if (!(queryResults.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  await client.metadataTemplates.deleteMetadataTemplate(
    'enterprise' as DeleteMetadataTemplateScope,
    template.templateKey!,
  );
  await client.files.deleteFileById(file.id);
});
test('testGetSearch', async function testGetSearch(): Promise<any> {
  const keyword: string = 'test';
  const search: SearchResultsResponse = await client.search.searchForContent({
    ancestorFolderIds: ['0'],
    query: keyword,
    trashContent:
      'non_trashed_only' as SearchForContentQueryParamsTrashContentField,
  } satisfies SearchForContentQueryParams);
  if (!((toString(search.type) as string) == 'search_results_items')) {
    throw new Error('Assertion failed');
  }
  const searchResults: SearchResults = search as SearchResults;
  if (!(searchResults.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const searchWithSharedLink: SearchResultsResponse =
    await client.search.searchForContent({
      ancestorFolderIds: ['0'],
      query: keyword,
      trashContent:
        'non_trashed_only' as SearchForContentQueryParamsTrashContentField,
      includeRecentSharedLinks: true,
    } satisfies SearchForContentQueryParams);
  if (
    !(
      (toString(searchWithSharedLink.type) as string) ==
      'search_results_with_shared_links'
    )
  ) {
    throw new Error('Assertion failed');
  }
  const searchResultsWithSharedLink: SearchResultsWithSharedLinks =
    searchWithSharedLink as SearchResultsWithSharedLinks;
  if (!(searchResultsWithSharedLink.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
});
export {};
