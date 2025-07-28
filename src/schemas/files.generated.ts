import { serializeFileFull } from './fileFull.generated.js';
import { deserializeFileFull } from './fileFull.generated.js';
import { FileFull } from './fileFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface Files {
  /**
   * The number of files. */
  readonly totalCount?: number;
  /**
   * A list of files. */
  readonly entries?: readonly FileFull[];
  readonly rawData?: SerializedData;
}
export function serializeFiles(val: Files): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: FileFull): SerializedData {
            return serializeFileFull(item);
          }) as readonly any[]),
  };
}
export function deserializeFiles(val: SerializedData): Files {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Files"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Files"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Files"',
    });
  }
  const entries: undefined | readonly FileFull[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): FileFull {
            return deserializeFileFull(itm);
          }) as readonly any[])
        : [];
  return { totalCount: totalCount, entries: entries } satisfies Files;
}
