import { serializeMetadata } from './metadata';
import { deserializeMetadata } from './metadata';
import { Metadata } from './metadata';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface Metadatas {
  /**
   * A list of metadata instances, as applied to this file or folder. */
  readonly entries?: readonly Metadata[];
  /**
   * The limit that was used for this page of results. */
  readonly limit?: number;
  readonly rawData?: SerializedData;
}
export function serializeMetadatas(val: Metadatas): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Metadata): SerializedData {
            return serializeMetadata(item);
          }) as readonly any[]),
    ['limit']: val.limit,
  };
}
export function deserializeMetadatas(val: SerializedData): Metadatas {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Metadatas"' });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Metadatas"',
    });
  }
  const entries: undefined | readonly Metadata[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Metadata {
            return deserializeMetadata(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Metadatas"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  return { entries: entries, limit: limit } satisfies Metadatas;
}
