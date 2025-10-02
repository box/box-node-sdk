import { serializeTaskAssignment } from './taskAssignment';
import { deserializeTaskAssignment } from './taskAssignment';
import { TaskAssignment } from './taskAssignment';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface TaskAssignments {
  /**
   * The total number of items in this collection. */
  readonly totalCount?: number;
  /**
   * A list of task assignments. */
  readonly entries?: readonly TaskAssignment[];
  readonly rawData?: SerializedData;
}
export function serializeTaskAssignments(val: TaskAssignments): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: TaskAssignment): SerializedData {
            return serializeTaskAssignment(item);
          }) as readonly any[]),
  };
}
export function deserializeTaskAssignments(
  val: SerializedData,
): TaskAssignments {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TaskAssignments"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "TaskAssignments"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "TaskAssignments"',
    });
  }
  const entries: undefined | readonly TaskAssignment[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): TaskAssignment {
            return deserializeTaskAssignment(itm);
          }) as readonly any[])
        : [];
  return { totalCount: totalCount, entries: entries } satisfies TaskAssignments;
}
