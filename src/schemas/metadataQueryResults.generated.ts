import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { serializeFolderFull } from './folderFull.generated.js';
import { deserializeFolderFull } from './folderFull.generated.js';
import { serializeFileFullOrFolderFull } from './fileFullOrFolderFull.generated.js';
import { deserializeFileFullOrFolderFull } from './fileFullOrFolderFull.generated.js';
import { FileFull } from './fileFull.generated.js';
import { FolderFull } from './folderFull.generated.js';
import { FileFullOrFolderFull } from './fileFullOrFolderFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface MetadataQueryResults {
  /**
   * The mini representation of the files and folders that match the search
   * terms.
   *
   * By default, this endpoint returns only the most basic info about the
   * items. To get additional fields for each item, including any of the
   * metadata, use the `fields` attribute in the query. */
  readonly entries?: readonly FileFullOrFolderFull[];
  /**
   * The limit that was used for this search. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string;
  readonly rawData?: SerializedData;
}
export function serializeMetadataQueryResults(
  val: MetadataQueryResults,
): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: FileFullOrFolderFull,
          ): SerializedData {
            return serializeFileFullOrFolderFull(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeMetadataQueryResults(
  val: SerializedData,
): MetadataQueryResults {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataQueryResults"',
    });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "MetadataQueryResults"',
    });
  }
  const entries: undefined | readonly FileFullOrFolderFull[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): FileFullOrFolderFull {
            return deserializeFileFullOrFolderFull(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "MetadataQueryResults"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "MetadataQueryResults"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies MetadataQueryResults;
}
