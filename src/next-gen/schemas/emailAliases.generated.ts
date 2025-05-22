import { serializeEmailAlias } from './emailAlias.generated.js';
import { deserializeEmailAlias } from './emailAlias.generated.js';
import { EmailAlias } from './emailAlias.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface EmailAliases {
  /**
   * The number of email aliases. */
  readonly totalCount?: number;
  /**
   * A list of email aliases */
  readonly entries?: readonly EmailAlias[];
  readonly rawData?: SerializedData;
}
export function serializeEmailAliases(val: EmailAliases): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: EmailAlias): SerializedData {
            return serializeEmailAlias(item);
          }) as readonly any[]),
  };
}
export function deserializeEmailAliases(val: SerializedData): EmailAliases {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "EmailAliases"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "EmailAliases"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "EmailAliases"',
    });
  }
  const entries: undefined | readonly EmailAlias[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): EmailAlias {
            return deserializeEmailAlias(itm);
          }) as readonly any[])
        : [];
  return { totalCount: totalCount, entries: entries } satisfies EmailAliases;
}
