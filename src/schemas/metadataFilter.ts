import { serializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { deserializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { serializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { deserializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { serializeMetadataFilterValue } from './metadataFilterValue';
import { deserializeMetadataFilterValue } from './metadataFilterValue';
import { MetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { MetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { MetadataFilterValue } from './metadataFilterValue';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type MetadataFilterScopeField =
  | 'global'
  | 'enterprise'
  | 'enterprise_{enterprise_id}'
  | string;
export interface MetadataFilter {
  /**
   * Specifies the scope of the template to filter search results by.
   *
   * This will be `enterprise_{enterprise_id}` for templates defined
   * for use in this enterprise, and `global` for general templates
   * that are available to all enterprises using Box. */
  readonly scope?: MetadataFilterScopeField;
  /**
   * The key of the template used to filter search results.
   *
   * In many cases the template key is automatically derived
   * of its display name, for example `Contract Template` would
   * become `contractTemplate`. In some cases the creator of the
   * template will have provided its own template key.
   *
   * Please [list the templates for an enterprise][list], or
   * get all instances on a [file][file] or [folder][folder]
   * to inspect a template's key.
   *
   * [list]: https://developer.box.com/reference/get-metadata-templates-enterprise
   * [file]: https://developer.box.com/reference/get-files-id-metadata
   * [folder]: https://developer.box.com/reference/get-folders-id-metadata */
  readonly templateKey?: string;
  /**
   * Specifies which fields on the template to filter the search
   * results by. When more than one field is specified, the query
   * performs a logical `AND` to ensure that the instance of the
   * template matches each of the fields specified. */
  readonly filters?: {
    readonly [key: string]: MetadataFilterValue;
  };
  readonly rawData?: SerializedData;
}
export function serializeMetadataFilterScopeField(
  val: MetadataFilterScopeField,
): SerializedData {
  return val;
}
export function deserializeMetadataFilterScopeField(
  val: SerializedData,
): MetadataFilterScopeField {
  if (val == 'global') {
    return val;
  }
  if (val == 'enterprise') {
    return val;
  }
  if (val == 'enterprise_{enterprise_id}') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataFilterScopeField",
  });
}
export function serializeMetadataFilter(val: MetadataFilter): SerializedData {
  return {
    ['scope']:
      val.scope == void 0
        ? val.scope
        : serializeMetadataFilterScopeField(val.scope),
    ['templateKey']: val.templateKey,
    ['filters']:
      val.filters == void 0
        ? val.filters
        : (Object.fromEntries(
            Object.entries(val.filters).map(([k, v]: [string, any]) => [
              k,
              serializeMetadataFilterValue(v),
            ]),
          ) as {
            readonly [key: string]: any;
          }),
  };
}
export function deserializeMetadataFilter(val: SerializedData): MetadataFilter {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataFilter"' });
  }
  const scope: undefined | MetadataFilterScopeField =
    val.scope == void 0
      ? void 0
      : deserializeMetadataFilterScopeField(val.scope);
  if (!(val.templateKey == void 0) && !sdIsString(val.templateKey)) {
    throw new BoxSdkError({
      message: 'Expecting string for "templateKey" of type "MetadataFilter"',
    });
  }
  const templateKey: undefined | string =
    val.templateKey == void 0 ? void 0 : val.templateKey;
  if (!(val.filters == void 0) && !sdIsMap(val.filters)) {
    throw new BoxSdkError({
      message: 'Expecting object for "filters" of type "MetadataFilter"',
    });
  }
  const filters:
    | undefined
    | {
        readonly [key: string]: MetadataFilterValue;
      } =
    val.filters == void 0
      ? void 0
      : sdIsMap(val.filters)
        ? (Object.fromEntries(
            Object.entries(val.filters).map(([k, v]: [string, any]) => [
              k,
              deserializeMetadataFilterValue(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  return {
    scope: scope,
    templateKey: templateKey,
    filters: filters,
  } satisfies MetadataFilter;
}
