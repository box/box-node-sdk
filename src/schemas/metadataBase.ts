import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface MetadataBase {
  /**
   * The identifier of the item that this metadata instance
   * has been attached to. This combines the `type` and the `id`
   * of the parent in the form `{type}_{id}`. */
  readonly parent?: string;
  /**
   * The name of the template. */
  readonly template?: string;
  /**
   * An ID for the scope in which this template
   * has been applied. This will be `enterprise_{enterprise_id}` for templates
   * defined for use in this enterprise, and `global` for general templates
   * that are available to all enterprises using Box. */
  readonly scope?: string;
  /**
   * The version of the metadata instance. This version starts at 0 and
   * increases every time a user-defined property is modified. */
  readonly version?: number;
  readonly rawData?: SerializedData;
}
export function serializeMetadataBase(val: MetadataBase): SerializedData {
  return {
    ['$parent']: val.parent,
    ['$template']: val.template,
    ['$scope']: val.scope,
    ['$version']: val.version,
  };
}
export function deserializeMetadataBase(val: SerializedData): MetadataBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataBase"' });
  }
  if (!(val.$parent == void 0) && !sdIsString(val.$parent)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$parent" of type "MetadataBase"',
    });
  }
  const parent: undefined | string =
    val.$parent == void 0 ? void 0 : val.$parent;
  if (!(val.$template == void 0) && !sdIsString(val.$template)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$template" of type "MetadataBase"',
    });
  }
  const template: undefined | string =
    val.$template == void 0 ? void 0 : val.$template;
  if (!(val.$scope == void 0) && !sdIsString(val.$scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$scope" of type "MetadataBase"',
    });
  }
  const scope: undefined | string = val.$scope == void 0 ? void 0 : val.$scope;
  if (!(val.$version == void 0) && !sdIsNumber(val.$version)) {
    throw new BoxSdkError({
      message: 'Expecting number for "$version" of type "MetadataBase"',
    });
  }
  const version: undefined | number =
    val.$version == void 0 ? void 0 : val.$version;
  return {
    parent: parent,
    template: template,
    scope: scope,
    version: version,
  } satisfies MetadataBase;
}
