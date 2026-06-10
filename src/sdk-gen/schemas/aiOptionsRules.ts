import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiOptionsRules {
  /**
   * Indicates whether the field is a multi-select field.
   * If true, the field can have multiple values. */
  readonly multiSelect?: boolean;
  /**
   * The selectable levels for the field.
   * This is used to limit the levels of the taxonomy that can be selected. */
  readonly selectableLevels?: readonly number[];
  readonly rawData?: SerializedData;
}
export function serializeAiOptionsRules(val: AiOptionsRules): SerializedData {
  return {
    ['multi_select']: val.multiSelect,
    ['selectable_levels']:
      val.selectableLevels == void 0
        ? val.selectableLevels
        : (val.selectableLevels.map(function (item: number): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeAiOptionsRules(val: SerializedData): AiOptionsRules {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiOptionsRules"' });
  }
  if (!(val.multi_select == void 0) && !sdIsBoolean(val.multi_select)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "multi_select" of type "AiOptionsRules"',
    });
  }
  const multiSelect: undefined | boolean =
    val.multi_select == void 0 ? void 0 : val.multi_select;
  if (!(val.selectable_levels == void 0) && !sdIsList(val.selectable_levels)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "selectable_levels" of type "AiOptionsRules"',
    });
  }
  const selectableLevels: undefined | readonly number[] =
    val.selectable_levels == void 0
      ? void 0
      : sdIsList(val.selectable_levels)
        ? (val.selectable_levels.map(function (itm: SerializedData): number {
            if (!sdIsNumber(itm)) {
              throw new BoxSdkError({
                message: 'Expecting number for "AiOptionsRules"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    multiSelect: multiSelect,
    selectableLevels: selectableLevels,
  } satisfies AiOptionsRules;
}
