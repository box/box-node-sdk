import { serializeFolderLock } from './folderLock';
import { deserializeFolderLock } from './folderLock';
import { FolderLock } from './folderLock';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface FolderLocks {
  /**
   * A list of folder locks. */
  readonly entries?: readonly FolderLock[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: string;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeFolderLocks(val: FolderLocks): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: FolderLock): SerializedData {
            return serializeFolderLock(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeFolderLocks(val: SerializedData): FolderLocks {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderLocks"' });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "FolderLocks"',
    });
  }
  const entries: undefined | readonly FolderLock[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): FolderLock {
            return deserializeFolderLock(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsString(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting string for "limit" of type "FolderLocks"',
    });
  }
  const limit: undefined | string = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "FolderLocks"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies FolderLocks;
}
