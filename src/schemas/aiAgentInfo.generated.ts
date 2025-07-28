import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiAgentInfoModelsField {
  /**
   * The name of the model used for the request. */
  readonly name?: string;
  /**
   * The provider that owns the model used for the request. */
  readonly provider?: string;
  /**
   * The supported purpose utilized by the model used for the request. */
  readonly supportedPurpose?: string;
  readonly rawData?: SerializedData;
}
export interface AiAgentInfo {
  /**
   * The models used for the request. */
  readonly models?: readonly AiAgentInfoModelsField[];
  /**
   * The processor used for the request. */
  readonly processor?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentInfoModelsField(
  val: AiAgentInfoModelsField,
): SerializedData {
  return {
    ['name']: val.name,
    ['provider']: val.provider,
    ['supported_purpose']: val.supportedPurpose,
  };
}
export function deserializeAiAgentInfoModelsField(
  val: SerializedData,
): AiAgentInfoModelsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentInfoModelsField"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "AiAgentInfoModelsField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.provider == void 0) && !sdIsString(val.provider)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "provider" of type "AiAgentInfoModelsField"',
    });
  }
  const provider: undefined | string =
    val.provider == void 0 ? void 0 : val.provider;
  if (
    !(val.supported_purpose == void 0) &&
    !sdIsString(val.supported_purpose)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "supported_purpose" of type "AiAgentInfoModelsField"',
    });
  }
  const supportedPurpose: undefined | string =
    val.supported_purpose == void 0 ? void 0 : val.supported_purpose;
  return {
    name: name,
    provider: provider,
    supportedPurpose: supportedPurpose,
  } satisfies AiAgentInfoModelsField;
}
export function serializeAiAgentInfo(val: AiAgentInfo): SerializedData {
  return {
    ['models']:
      val.models == void 0
        ? val.models
        : (val.models.map(function (
            item: AiAgentInfoModelsField,
          ): SerializedData {
            return serializeAiAgentInfoModelsField(item);
          }) as readonly any[]),
    ['processor']: val.processor,
  };
}
export function deserializeAiAgentInfo(val: SerializedData): AiAgentInfo {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiAgentInfo"' });
  }
  if (!(val.models == void 0) && !sdIsList(val.models)) {
    throw new BoxSdkError({
      message: 'Expecting array for "models" of type "AiAgentInfo"',
    });
  }
  const models: undefined | readonly AiAgentInfoModelsField[] =
    val.models == void 0
      ? void 0
      : sdIsList(val.models)
        ? (val.models.map(function (
            itm: SerializedData,
          ): AiAgentInfoModelsField {
            return deserializeAiAgentInfoModelsField(itm);
          }) as readonly any[])
        : [];
  if (!(val.processor == void 0) && !sdIsString(val.processor)) {
    throw new BoxSdkError({
      message: 'Expecting string for "processor" of type "AiAgentInfo"',
    });
  }
  const processor: undefined | string =
    val.processor == void 0 ? void 0 : val.processor;
  return { models: models, processor: processor } satisfies AiAgentInfo;
}
