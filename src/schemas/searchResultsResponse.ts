import { serializeSearchResults } from './searchResults.js';
import { deserializeSearchResults } from './searchResults.js';
import { serializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.js';
import { deserializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.js';
import { SearchResults } from './searchResults.js';
import { SearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SearchResultsResponse =
  | SearchResults
  | SearchResultsWithSharedLinks;
export function serializeSearchResultsResponse(val: any): SerializedData {
  if (val.type == 'search_results_items') {
    return serializeSearchResults(val);
  }
  if (val.type == 'search_results_with_shared_links') {
    return serializeSearchResultsWithSharedLinks(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeSearchResultsResponse(
  val: SerializedData,
): SearchResultsResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SearchResultsResponse"',
    });
  }
  if (val.type == 'search_results_items') {
    return deserializeSearchResults(val);
  }
  if (val.type == 'search_results_with_shared_links') {
    return deserializeSearchResultsWithSharedLinks(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize SearchResultsResponse" });
}
