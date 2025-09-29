import { serializeTask } from './task';
import { deserializeTask } from './task';
import { Task } from './task';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface Tasks {
  /**
   * One greater than the offset of the last entry in the entire collection.
   * The total number of entries in the collection may be less than
   * `total_count`. */
  readonly totalCount?: number;
  /**
   * A list of tasks. */
  readonly entries?: readonly Task[];
  readonly rawData?: SerializedData;
}
export function serializeTasks(val: Tasks): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Task): SerializedData {
            return serializeTask(item);
          }) as readonly any[]),
  };
}
export function deserializeTasks(val: SerializedData): Tasks {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Tasks"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Tasks"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Tasks"',
    });
  }
  const entries: undefined | readonly Task[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Task {
            return deserializeTask(itm);
          }) as readonly any[])
        : [];
  return { totalCount: totalCount, entries: entries } satisfies Tasks;
}
