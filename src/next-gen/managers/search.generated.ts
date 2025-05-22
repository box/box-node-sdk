import { serializeMetadataQueryResults } from '../schemas/metadataQueryResults.generated.js';
import { deserializeMetadataQueryResults } from '../schemas/metadataQueryResults.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeMetadataQuery } from '../schemas/metadataQuery.generated.js';
import { deserializeMetadataQuery } from '../schemas/metadataQuery.generated.js';
import { serializeSearchResultsOrSearchResultsWithSharedLinks } from '../schemas/searchResultsOrSearchResultsWithSharedLinks.generated.js';
import { deserializeSearchResultsOrSearchResultsWithSharedLinks } from '../schemas/searchResultsOrSearchResultsWithSharedLinks.generated.js';
import { serializeMetadataFilter } from '../schemas/metadataFilter.generated.js';
import { deserializeMetadataFilter } from '../schemas/metadataFilter.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { MetadataQueryResults } from '../schemas/metadataQueryResults.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { MetadataQuery } from '../schemas/metadataQuery.generated.js';
import { SearchResultsOrSearchResultsWithSharedLinks } from '../schemas/searchResultsOrSearchResultsWithSharedLinks.generated.js';
import { MetadataFilter } from '../schemas/metadataFilter.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { prepareParams } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdToJson } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class SearchByMetadataQueryOptionals {
  readonly headers: SearchByMetadataQueryHeaders =
    new SearchByMetadataQueryHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      SearchByMetadataQueryOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<SearchByMetadataQueryOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface SearchByMetadataQueryOptionalsInput {
  readonly headers?: SearchByMetadataQueryHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class SearchByMetadataQueryHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<SearchByMetadataQueryHeaders, 'extraHeaders'> &
      Partial<Pick<SearchByMetadataQueryHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface SearchByMetadataQueryHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type SearchForContentQueryParamsScopeField =
  | 'user_content'
  | 'enterprise_content'
  | string;
export type SearchForContentQueryParamsContentTypesField =
  | 'name'
  | 'description'
  | 'file_content'
  | 'comments'
  | 'tag'
  | string;
export type SearchForContentQueryParamsTypeField =
  | 'file'
  | 'folder'
  | 'web_link';
export type SearchForContentQueryParamsTrashContentField =
  | 'non_trashed_only'
  | 'trashed_only'
  | 'all_items'
  | string;
export type SearchForContentQueryParamsSortField =
  | 'modified_at'
  | 'relevance'
  | string;
export type SearchForContentQueryParamsDirectionField = 'DESC' | 'ASC' | string;
export interface SearchForContentQueryParams {
  /**
   * The string to search for. This query is matched against item names,
   * descriptions, text content of files, and various other fields of
   * the different item types.
   *
   * This parameter supports a variety of operators to further refine
   * the results returns.
   *
   * * `""` - by wrapping a query in double quotes only exact matches are
   *   returned by the API. Exact searches do not return search matches
   *   based on specific character sequences. Instead, they return
   *   matches based on phrases, that is, word sequences. For example:
   *   A search for `"Blue-Box"` may return search results including
   *   the sequence `"blue.box"`, `"Blue Box"`, and `"Blue-Box"`;
   *   any item containing the words `Blue` and `Box` consecutively, in
   *   the order specified.
   * * `AND` - returns items that contain both the search terms. For
   *   example, a search for `marketing AND BoxWorks` returns items
   *   that have both `marketing` and `BoxWorks` within its text in any order.
   *   It does not return a result that only has `BoxWorks` in its text.
   * * `OR` - returns items that contain either of the search terms. For
   *   example, a search for `marketing OR BoxWorks` returns a result that
   *   has either `marketing` or `BoxWorks` within its text. Using this
   *   operator is not necessary as we implicitly interpret multi-word
   *   queries as `OR` unless another supported boolean term is used.
   * * `NOT` - returns items that do not contain the search term provided.
   *   For example, a search for `marketing AND NOT BoxWorks` returns a result
   *   that has only `marketing` within its text. Results containing
   *   `BoxWorks` are omitted.
   *
   * We do not support lower case (that is,
   * `and`, `or`, and `not`) or mixed case (that is, `And`, `Or`, and `Not`)
   * operators.
   *
   * This field is required unless the `mdfilters` parameter is defined. */
  readonly query?: string;
  /**
   * Limits the search results to either the files that the user has
   * access to, or to files available to the entire enterprise.
   *
   * The scope defaults to `user_content`, which limits the search
   * results to content that is available to the currently authenticated
   * user.
   *
   * The `enterprise_content` can be requested by an admin through our
   * support channels. Once this scope has been enabled for a user, it
   * will allow that use to query for content across the entire
   * enterprise and not only the content that they have access to. */
  readonly scope?: SearchForContentQueryParamsScopeField;
  /**
   * Limits the search results to any files that match any of the provided
   * file extensions. This list is a comma-separated list of file extensions
   * without the dots. */
  readonly fileExtensions?: readonly string[];
  /**
   * Limits the search results to any items created within
   * a given date range.
   *
   * Date ranges are defined as comma separated RFC3339
   * timestamps.
   *
   * If the the start date is omitted (`,2014-05-17T13:35:01-07:00`)
   * anything created before the end date will be returned.
   *
   * If the end date is omitted (`2014-05-15T13:35:01-07:00,`) the
   * current date will be used as the end date instead. */
  readonly createdAtRange?: readonly string[];
  /**
   * Limits the search results to any items updated within
   * a given date range.
   *
   * Date ranges are defined as comma separated RFC3339
   * timestamps.
   *
   * If the start date is omitted (`,2014-05-17T13:35:01-07:00`)
   * anything updated before the end date will be returned.
   *
   * If the end date is omitted (`2014-05-15T13:35:01-07:00,`) the
   * current date will be used as the end date instead. */
  readonly updatedAtRange?: readonly string[];
  /**
   * Limits the search results to any items with a size within
   * a given file size range. This applied to files and folders.
   *
   * Size ranges are defined as comma separated list of a lower
   * and upper byte size limit (inclusive).
   *
   * The upper and lower bound can be omitted to create open ranges. */
  readonly sizeRange?: readonly number[];
  /**
   * Limits the search results to any items that are owned
   * by the given list of owners, defined as a list of comma separated
   * user IDs.
   *
   * The items still need to be owned or shared with
   * the currently authenticated user for them to show up in the search
   * results. If the user does not have access to any files owned by any of
   * the users an empty result set will be returned.
   *
   * To search across an entire enterprise, we recommend using the
   * `enterprise_content` scope parameter which can be requested with our
   * support team. */
  readonly ownerUserIds?: readonly string[];
  /**
   * Limits the search results to any items that have been updated
   * by the given list of users, defined as a list of comma separated
   * user IDs.
   *
   * The items still need to be owned or shared with
   * the currently authenticated user for them to show up in the search
   * results. If the user does not have access to any files owned by any of
   * the users an empty result set will be returned.
   *
   * This feature only searches back to the last 10 versions of an item. */
  readonly recentUpdaterUserIds?: readonly string[];
  /**
   * Limits the search results to items within the given
   * list of folders, defined as a comma separated lists
   * of folder IDs.
   *
   * Search results will also include items within any subfolders
   * of those ancestor folders.
   *
   * The folders still need to be owned or shared with
   * the currently authenticated user. If the folder is not accessible by this
   * user, or it does not exist, a `HTTP 404` error code will be returned
   * instead.
   *
   * To search across an entire enterprise, we recommend using the
   * `enterprise_content` scope parameter which can be requested with our
   * support team. */
  readonly ancestorFolderIds?: readonly string[];
  /**
   * Limits the search results to any items that match the search query
   * for a specific part of the file, for example the file description.
   *
   * Content types are defined as a comma separated lists
   * of Box recognized content types. The allowed content types are as follows.
   *
   * * `name` - The name of the item, as defined by its `name` field.
   * * `description` - The description of the item, as defined by its
   *   `description` field.
   * * `file_content` - The actual content of the file.
   * * `comments` - The content of any of the comments on a file or
   *    folder.
   * * `tags` - Any tags that are applied to an item, as defined by its
   *    `tags` field. */
  readonly contentTypes?: readonly SearchForContentQueryParamsContentTypesField[];
  /**
   * Limits the search results to any items of this type. This
   * parameter only takes one value. By default the API returns
   * items that match any of these types.
   *
   * * `file` - Limits the search results to files
   * * `folder` - Limits the search results to folders
   * * `web_link` - Limits the search results to web links, also known
   *    as bookmarks */
  readonly type?: SearchForContentQueryParamsTypeField;
  /**
   * Determines if the search should look in the trash for items.
   *
   * By default, this API only returns search results for items
   * not currently in the trash (`non_trashed_only`).
   *
   * * `trashed_only` - Only searches for items currently in the trash
   * * `non_trashed_only` - Only searches for items currently not in
   *   the trash
   * * `all_items` - Searches for both trashed and non-trashed items. */
  readonly trashContent?: SearchForContentQueryParamsTrashContentField;
  /**
   * Limits the search results to any items for which the metadata matches the provided filter.
   * This parameter is a list that specifies exactly **one** metadata template used to filter the search results.
   * The parameter is required unless the `query` parameter is provided. */
  readonly mdfilters?: readonly MetadataFilter[];
  /**
   * Defines the order in which search results are returned. This API
   * defaults to returning items by relevance unless this parameter is
   * explicitly specified.
   *
   * * `relevance` (default) returns the results sorted by relevance to the
   * query search term. The relevance is based on the occurrence of the search
   * term in the items name, description, content, and additional properties.
   * * `modified_at` returns the results ordered in descending order by date
   * at which the item was last modified. */
  readonly sort?: SearchForContentQueryParamsSortField;
  /**
   * Defines the direction in which search results are ordered. This API
   * defaults to returning items in descending (`DESC`) order unless this
   * parameter is explicitly specified.
   *
   * When results are sorted by `relevance` the ordering is locked to returning
   * items in descending order of relevance, and this parameter is ignored. */
  readonly direction?: SearchForContentQueryParamsDirectionField;
  /**
   * Defines the maximum number of items to return as part of a page of
   * results. */
  readonly limit?: number;
  /**
   * Defines whether the search results should include any items
   * that the user recently accessed through a shared link.
   *
   * When this parameter has been set to true,
   * the format of the response of this API changes to return
   * a list of [Search Results with
   * Shared Links](r://search_results_with_shared_links) */
  readonly includeRecentSharedLinks?: boolean;
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
  /**
   * The offset of the item at which to begin the response.
   *
   * Queries with offset parameter value
   * exceeding 10000 will be rejected
   * with a 400 response. */
  readonly offset?: number;
  /**
   * Limits the search results to items that were deleted by the given
   * list of users, defined as a list of comma separated user IDs.
   *
   * The `trash_content` parameter needs to be set to `trashed_only`.
   *
   * If searching in trash is not performed, an empty result set
   * is returned. The items need to be owned or shared with
   * the currently authenticated user for them to show up in the search
   * results.
   *
   * If the user does not have access to any files owned by
   * any of the users, an empty result set is returned.
   *
   * Data available from 2023-02-01 onwards. */
  readonly deletedUserIds?: readonly string[];
  /**
   * Limits the search results to any items deleted within a given
   * date range.
   *
   * Date ranges are defined as comma separated RFC3339 timestamps.
   *
   * If the the start date is omitted (`2014-05-17T13:35:01-07:00`),
   * anything deleted before the end date will be returned.
   *
   * If the end date is omitted (`2014-05-15T13:35:01-07:00`),
   * the current date will be used as the end date instead.
   *
   * The `trash_content` parameter needs to be set to `trashed_only`.
   *
   * If searching in trash is not performed, then an empty result
   * is returned.
   *
   * Data available from 2023-02-01 onwards. */
  readonly deletedAtRange?: readonly string[];
}
export class SearchForContentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<SearchForContentHeaders, 'extraHeaders'> &
      Partial<Pick<SearchForContentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface SearchForContentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SearchManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SearchManager,
      'networkSession' | 'searchByMetadataQuery' | 'searchForContent'
    > &
      Partial<Pick<SearchManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Create a search using SQL-like syntax to return items that match specific
   * metadata.
   *
   * By default, this endpoint returns only the most basic info about the items for
   * which the query matches. To get additional fields for each item, including any
   * of the metadata, use the `fields` attribute in the query.
   * @param {MetadataQuery} requestBody Request body of searchByMetadataQuery method
   * @param {SearchByMetadataQueryOptionalsInput} optionalsInput
   * @returns {Promise<MetadataQueryResults>}
   */
  async searchByMetadataQuery(
    requestBody: MetadataQuery,
    optionalsInput: SearchByMetadataQueryOptionalsInput = {},
  ): Promise<MetadataQueryResults> {
    const optionals: SearchByMetadataQueryOptionals =
      new SearchByMetadataQueryOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_queries/execute_read',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeMetadataQuery(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataQueryResults(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Searches for files, folders, web links, and shared files across the
   * users content or across the entire enterprise.
   * @param {SearchForContentQueryParams} queryParams Query parameters of searchForContent method
   * @param {SearchForContentHeadersInput} headersInput Headers of searchForContent method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<SearchResultsOrSearchResultsWithSharedLinks>}
   */
  async searchForContent(
    queryParams: SearchForContentQueryParams = {} satisfies SearchForContentQueryParams,
    headersInput: SearchForContentHeadersInput = new SearchForContentHeaders(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<SearchResultsOrSearchResultsWithSharedLinks> {
    const headers: SearchForContentHeaders = new SearchForContentHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['query']: toString(queryParams.query) as string,
      ['scope']: toString(queryParams.scope) as string,
      ['file_extensions']: queryParams.fileExtensions
        ? queryParams.fileExtensions.map(toString).join(',')
        : undefined,
      ['created_at_range']: queryParams.createdAtRange
        ? queryParams.createdAtRange.map(toString).join(',')
        : undefined,
      ['updated_at_range']: queryParams.updatedAtRange
        ? queryParams.updatedAtRange.map(toString).join(',')
        : undefined,
      ['size_range']: queryParams.sizeRange
        ? queryParams.sizeRange.map(toString).join(',')
        : undefined,
      ['owner_user_ids']: queryParams.ownerUserIds
        ? queryParams.ownerUserIds.map(toString).join(',')
        : undefined,
      ['recent_updater_user_ids']: queryParams.recentUpdaterUserIds
        ? queryParams.recentUpdaterUserIds.map(toString).join(',')
        : undefined,
      ['ancestor_folder_ids']: queryParams.ancestorFolderIds
        ? queryParams.ancestorFolderIds.map(toString).join(',')
        : undefined,
      ['content_types']: queryParams.contentTypes
        ? queryParams.contentTypes.map(toString).join(',')
        : undefined,
      ['type']: toString(queryParams.type) as string,
      ['trash_content']: toString(queryParams.trashContent) as string,
      ['mdfilters']: queryParams.mdfilters
        ? sdToJson(queryParams.mdfilters.map(serializeMetadataFilter))
        : undefined,
      ['sort']: toString(queryParams.sort) as string,
      ['direction']: toString(queryParams.direction) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['include_recent_shared_links']: toString(
        queryParams.includeRecentSharedLinks,
      ) as string,
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['offset']: toString(queryParams.offset) as string,
      ['deleted_user_ids']: queryParams.deletedUserIds
        ? queryParams.deletedUserIds.map(toString).join(',')
        : undefined,
      ['deleted_at_range']: queryParams.deletedAtRange
        ? queryParams.deletedAtRange.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/search',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeSearchResultsOrSearchResultsWithSharedLinks(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SearchManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeSearchForContentQueryParamsScopeField(
  val: SearchForContentQueryParamsScopeField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsScopeField(
  val: SerializedData,
): SearchForContentQueryParamsScopeField {
  if (val == 'user_content') {
    return val;
  }
  if (val == 'enterprise_content') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsScopeField",
  });
}
export function serializeSearchForContentQueryParamsContentTypesField(
  val: SearchForContentQueryParamsContentTypesField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsContentTypesField(
  val: SerializedData,
): SearchForContentQueryParamsContentTypesField {
  if (val == 'name') {
    return val;
  }
  if (val == 'description') {
    return val;
  }
  if (val == 'file_content') {
    return val;
  }
  if (val == 'comments') {
    return val;
  }
  if (val == 'tag') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsContentTypesField",
  });
}
export function serializeSearchForContentQueryParamsTypeField(
  val: SearchForContentQueryParamsTypeField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsTypeField(
  val: SerializedData,
): SearchForContentQueryParamsTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsTypeField",
  });
}
export function serializeSearchForContentQueryParamsTrashContentField(
  val: SearchForContentQueryParamsTrashContentField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsTrashContentField(
  val: SerializedData,
): SearchForContentQueryParamsTrashContentField {
  if (val == 'non_trashed_only') {
    return val;
  }
  if (val == 'trashed_only') {
    return val;
  }
  if (val == 'all_items') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsTrashContentField",
  });
}
export function serializeSearchForContentQueryParamsSortField(
  val: SearchForContentQueryParamsSortField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsSortField(
  val: SerializedData,
): SearchForContentQueryParamsSortField {
  if (val == 'modified_at') {
    return val;
  }
  if (val == 'relevance') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsSortField",
  });
}
export function serializeSearchForContentQueryParamsDirectionField(
  val: SearchForContentQueryParamsDirectionField,
): SerializedData {
  return val;
}
export function deserializeSearchForContentQueryParamsDirectionField(
  val: SerializedData,
): SearchForContentQueryParamsDirectionField {
  if (val == 'DESC') {
    return val;
  }
  if (val == 'ASC') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchForContentQueryParamsDirectionField",
  });
}
