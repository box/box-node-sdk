import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryResultEntryV2026R0 {
  /**
   * The unique identifier of the matching item. */
  readonly id: string;
  /**
   * The type of the matching item. */
  readonly type: string;
  readonly extraData?: {
    readonly [key: string]: any;
  };
  readonly rawData?: SerializedData;
}
export function serializeQueryResultEntryV2026R0(
  val: QueryResultEntryV2026R0
): SerializedData {
  return { ...{ ['id']: val.id, ['type']: val.type }, ...val.extraData };
}
export function deserializeQueryResultEntryV2026R0(
  val: SerializedData
): QueryResultEntryV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryResultEntryV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "QueryResultEntryV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "QueryResultEntryV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "QueryResultEntryV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "QueryResultEntryV2026R0"',
    });
  }
  const type: string = val.type;
  if (!(val == void 0) && !sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "extraData" of type "QueryResultEntryV2026R0"',
    });
  }
  const extraData:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val == void 0
      ? void 0
      : sdIsMap(val)
        ? (Object.fromEntries(
            Object.entries(val).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ])
          ) as {
            readonly [key: string]: any;
          })
        : {};
  return {
    id: id,
    type: type,
    extraData: extraData,
  } satisfies QueryResultEntryV2026R0;
}
