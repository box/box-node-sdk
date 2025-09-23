import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type GenericSource = {
  readonly [key: string]: any;
};
export function serializeGenericSource(val: GenericSource): SerializedData {
  return Object.fromEntries(
    Object.entries(val).map(([k, v]: [string, any]) => [
      k,
      (function (v: any): any {
        return v;
      })(v),
    ]),
  ) as {
    readonly [key: string]: any;
  };
}
export function deserializeGenericSource(val: SerializedData): GenericSource {
  return sdIsMap(val)
    ? (Object.fromEntries(
        Object.entries(val).map(([k, v]: [string, any]) => [
          k,
          (function (v: any): any {
            return v;
          })(v),
        ]),
      ) as {
        readonly [key: string]: any;
      })
    : {};
}
