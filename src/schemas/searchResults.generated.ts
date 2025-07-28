import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderFull } from './folderFull.generated.js';
import { deserializeFolderFull } from './folderFull.generated.js';
import { serializeWebLink } from './webLink.generated.js';
import { deserializeWebLink } from './webLink.generated.js';
import { serializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { deserializeFileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderFull } from './folderFull.generated.js';
import { WebLink } from './webLink.generated.js';
import { FileFullOrFolderFullOrWebLink } from './fileFullOrFolderFullOrWebLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SearchResultsTypeField = 'search_results_items';
export class SearchResults {
  /**
   * One greater than the offset of the last entry in the search results.
   * The total number of entries in the collection may be less than
   * `total_count`. */
  readonly totalCount?: number;
  /**
   * The limit that was used for this search. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. */
  readonly limit?: number;
  /**
   * The 0-based offset of the first entry in this set. This will be the same
   * as the `offset` query parameter used. */
  readonly offset?: number;
  /**
   * Specifies the response as search result items without shared links. */
  readonly type: SearchResultsTypeField =
    'search_results_items' as SearchResultsTypeField;
  /**
   * The search results for the query provided. */
  readonly entries?: readonly FileFullOrFolderFullOrWebLink[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SearchResults, 'type'> & Partial<Pick<SearchResults, 'type'>>,
  ) {
    if (fields.totalCount !== undefined) {
      this.totalCount = fields.totalCount;
    }
    if (fields.limit !== undefined) {
      this.limit = fields.limit;
    }
    if (fields.offset !== undefined) {
      this.offset = fields.offset;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.entries !== undefined) {
      this.entries = fields.entries;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SearchResultsInput {
  /**
   * One greater than the offset of the last entry in the search results.
   * The total number of entries in the collection may be less than
   * `total_count`. */
  readonly totalCount?: number;
  /**
   * The limit that was used for this search. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. */
  readonly limit?: number;
  /**
   * The 0-based offset of the first entry in this set. This will be the same
   * as the `offset` query parameter used. */
  readonly offset?: number;
  /**
   * Specifies the response as search result items without shared links. */
  readonly type?: SearchResultsTypeField;
  /**
   * The search results for the query provided. */
  readonly entries?: readonly FileFullOrFolderFullOrWebLink[];
  readonly rawData?: SerializedData;
}
export function serializeSearchResultsTypeField(
  val: SearchResultsTypeField,
): SerializedData {
  return val;
}
export function deserializeSearchResultsTypeField(
  val: SerializedData,
): SearchResultsTypeField {
  if (val == 'search_results_items') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchResultsTypeField",
  });
}
export function serializeSearchResults(val: SearchResults): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['type']: serializeSearchResultsTypeField(val.type),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: FileFullOrFolderFullOrWebLink,
          ): SerializedData {
            return serializeFileFullOrFolderFullOrWebLink(item);
          }) as readonly any[]),
  };
}
export function deserializeSearchResults(val: SerializedData): SearchResults {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "SearchResults"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "SearchResults"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "SearchResults"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "SearchResults"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "SearchResults" to be defined',
    });
  }
  const type: SearchResultsTypeField = deserializeSearchResultsTypeField(
    val.type,
  );
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "SearchResults"',
    });
  }
  const entries: undefined | readonly FileFullOrFolderFullOrWebLink[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): FileFullOrFolderFullOrWebLink {
            return deserializeFileFullOrFolderFullOrWebLink(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    type: type,
    entries: entries,
  } satisfies SearchResults;
}
export function serializeSearchResultsInput(
  val: SearchResultsInput,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['type']:
      val.type == void 0 ? val.type : serializeSearchResultsTypeField(val.type),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: FileFullOrFolderFullOrWebLink,
          ): SerializedData {
            return serializeFileFullOrFolderFullOrWebLink(item);
          }) as readonly any[]),
  };
}
export function deserializeSearchResultsInput(
  val: SerializedData,
): SearchResultsInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SearchResultsInput"',
    });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "SearchResultsInput"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "SearchResultsInput"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "SearchResultsInput"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  const type: undefined | SearchResultsTypeField =
    val.type == void 0 ? void 0 : deserializeSearchResultsTypeField(val.type);
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "SearchResultsInput"',
    });
  }
  const entries: undefined | readonly FileFullOrFolderFullOrWebLink[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): FileFullOrFolderFullOrWebLink {
            return deserializeFileFullOrFolderFullOrWebLink(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    type: type,
    entries: entries,
  } satisfies SearchResultsInput;
}
