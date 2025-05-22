import { serializeTask } from './task.generated.js';
import { deserializeTask } from './task.generated.js';
import { Task } from './task.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface Tasks {
  /**
   * One greater than the offset of the last entry in the entire collection.
   * The total number of entries in the collection may be less than
   * `total_count`. */
  readonly totalCount?: number;
  /**
   * A list of tasks */
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
