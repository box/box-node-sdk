import { serializeSearchResults } from './searchResults';
import { deserializeSearchResults } from './searchResults';
import { serializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks';
import { deserializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks';
import { SearchResults } from './searchResults';
import { SearchResultsWithSharedLinks } from './searchResultsWithSharedLinks';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
