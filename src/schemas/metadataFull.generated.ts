import { serializeMetadataBase } from './metadataBase.generated.js';
import { deserializeMetadataBase } from './metadataBase.generated.js';
import { serializeMetadata } from './metadata.generated.js';
import { deserializeMetadata } from './metadata.generated.js';
import { MetadataBase } from './metadataBase.generated.js';
import { Metadata } from './metadata.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataFull = Metadata & {
  /**
   * Whether the user can edit this metadata instance. */
  readonly canEdit?: boolean;
  /**
   * A UUID to identify the metadata instance. */
  readonly id?: string;
  /**
   * A unique identifier for the "type" of this instance. This is an
   * internal system property and should not be used by a client
   * application. */
  readonly type?: string;
  /**
   * The last-known version of the template of the object. This is an
   * internal system property and should not be used by a client
   * application. */
  readonly typeVersion?: number;
  readonly extraData?: {
    readonly [key: string]: any;
  };
};
export function serializeMetadataFull(val: MetadataFull): SerializedData {
  const base: any = serializeMetadata(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataFull"' });
  }
  return {
    ...base,
    ...{
      ...{
        ['$canEdit']: val.canEdit,
        ['$id']: val.id,
        ['$type']: val.type,
        ['$typeVersion']: val.typeVersion,
      },
      ...val.extraData,
    },
  };
}
export function deserializeMetadataFull(val: SerializedData): MetadataFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataFull"' });
  }
  if (!(val.$canEdit == void 0) && !sdIsBoolean(val.$canEdit)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "$canEdit" of type "MetadataFull"',
    });
  }
  const canEdit: undefined | boolean =
    val.$canEdit == void 0 ? void 0 : val.$canEdit;
  if (!(val.$id == void 0) && !sdIsString(val.$id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$id" of type "MetadataFull"',
    });
  }
  const id: undefined | string = val.$id == void 0 ? void 0 : val.$id;
  if (!(val.$type == void 0) && !sdIsString(val.$type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$type" of type "MetadataFull"',
    });
  }
  const type: undefined | string = val.$type == void 0 ? void 0 : val.$type;
  if (!(val.$typeVersion == void 0) && !sdIsNumber(val.$typeVersion)) {
    throw new BoxSdkError({
      message: 'Expecting number for "$typeVersion" of type "MetadataFull"',
    });
  }
  const typeVersion: undefined | number =
    val.$typeVersion == void 0 ? void 0 : val.$typeVersion;
  if (!(val == void 0) && !sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting object for "extraData" of type "MetadataFull"',
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
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (!(val.$parent == void 0) && !sdIsString(val.$parent)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$parent" of type "MetadataFull"',
    });
  }
  const parent: undefined | string =
    val.$parent == void 0 ? void 0 : val.$parent;
  if (!(val.$template == void 0) && !sdIsString(val.$template)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$template" of type "MetadataFull"',
    });
  }
  const template: undefined | string =
    val.$template == void 0 ? void 0 : val.$template;
  if (!(val.$scope == void 0) && !sdIsString(val.$scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$scope" of type "MetadataFull"',
    });
  }
  const scope: undefined | string = val.$scope == void 0 ? void 0 : val.$scope;
  if (!(val.$version == void 0) && !sdIsNumber(val.$version)) {
    throw new BoxSdkError({
      message: 'Expecting number for "$version" of type "MetadataFull"',
    });
  }
  const version: undefined | number =
    val.$version == void 0 ? void 0 : val.$version;
  return {
    canEdit: canEdit,
    id: id,
    type: type,
    typeVersion: typeVersion,
    extraData: extraData,
    parent: parent,
    template: template,
    scope: scope,
    version: version,
  } satisfies MetadataFull;
}
