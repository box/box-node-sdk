import { serializeSearchResults } from './searchResults.generated.js';
import { deserializeSearchResults } from './searchResults.generated.js';
import { serializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.generated.js';
import { deserializeSearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.generated.js';
import { SearchResults } from './searchResults.generated.js';
import { SearchResultsWithSharedLinks } from './searchResultsWithSharedLinks.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SearchResultsOrSearchResultsWithSharedLinks =
  | SearchResults
  | SearchResultsWithSharedLinks;
export function serializeSearchResultsOrSearchResultsWithSharedLinks(
  val: any,
): SerializedData {
  if (val.type == 'search_results_items') {
    return serializeSearchResults(val);
  }
  if (val.type == 'search_results_with_shared_links') {
    return serializeSearchResultsWithSharedLinks(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeSearchResultsOrSearchResultsWithSharedLinks(
  val: SerializedData,
): SearchResultsOrSearchResultsWithSharedLinks {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SearchResultsOrSearchResultsWithSharedLinks"',
    });
  }
  if (val.type == 'search_results_items') {
    return deserializeSearchResults(val);
  }
  if (val.type == 'search_results_with_shared_links') {
    return deserializeSearchResultsWithSharedLinks(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize SearchResultsOrSearchResultsWithSharedLinks",
  });
}
