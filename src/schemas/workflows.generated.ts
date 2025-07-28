import { serializeWorkflow } from './workflow.generated.js';
import { deserializeWorkflow } from './workflow.generated.js';
import { Workflow } from './workflow.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface Workflows {
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * The marker for the start of the previous page of results. */
  readonly prevMarker?: string | null;
  /**
   * A list of workflows. */
  readonly entries?: readonly Workflow[];
  readonly rawData?: SerializedData;
}
export function serializeWorkflows(val: Workflows): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Workflow): SerializedData {
            return serializeWorkflow(item);
          }) as readonly any[]),
  };
}
export function deserializeWorkflows(val: SerializedData): Workflows {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Workflows"' });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Workflows"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "Workflows"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prev_marker" of type "Workflows"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Workflows"',
    });
  }
  const entries: undefined | readonly Workflow[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Workflow {
            return deserializeWorkflow(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
    entries: entries,
  } satisfies Workflows;
}
