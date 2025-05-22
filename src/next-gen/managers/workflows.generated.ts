import { serializeWorkflows } from '../schemas/workflows.generated.js';
import { deserializeWorkflows } from '../schemas/workflows.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeOutcome } from '../schemas/outcome.generated.js';
import { deserializeOutcome } from '../schemas/outcome.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Workflows } from '../schemas/workflows.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { Outcome } from '../schemas/outcome.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { Authentication } from '../networking/auth.generated.js';
import { NetworkSession } from '../networking/network.generated.js';
import { FetchOptions } from '../networking/fetchOptions.generated.js';
import { FetchResponse } from '../networking/fetchResponse.generated.js';
import { prepareParams } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetWorkflowsOptionals {
  readonly headers: GetWorkflowsHeaders = new GetWorkflowsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetWorkflowsOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetWorkflowsOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetWorkflowsOptionalsInput {
  readonly headers?: GetWorkflowsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class StartWorkflowOptionals {
  readonly headers: StartWorkflowHeaders = new StartWorkflowHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<StartWorkflowOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<StartWorkflowOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface StartWorkflowOptionalsInput {
  readonly headers?: StartWorkflowHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetWorkflowsQueryParams {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting this folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folder/123`
   * the `folder_id` is `123`.
   *
   * The root folder of a Box account is
   * always represented by the ID `0`. */
  readonly folderId: string;
  /**
   * Type of trigger to search for. */
  readonly triggerType?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
}
export class GetWorkflowsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetWorkflowsHeaders, 'extraHeaders'> &
      Partial<Pick<GetWorkflowsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetWorkflowsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type StartWorkflowRequestBodyTypeField = 'workflow_parameters';
export interface StartWorkflowRequestBodyFlowField {
  /**
   * The type of the flow object */
  readonly type?: string;
  /**
   * The id of the flow */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export type StartWorkflowRequestBodyFilesTypeField = 'file';
export interface StartWorkflowRequestBodyFilesField {
  /**
   * The type of the file object */
  readonly type?: StartWorkflowRequestBodyFilesTypeField;
  /**
   * The id of the file */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export type StartWorkflowRequestBodyFolderTypeField = 'folder';
export interface StartWorkflowRequestBodyFolderField {
  /**
   * The type of the folder object */
  readonly type?: StartWorkflowRequestBodyFolderTypeField;
  /**
   * The id of the folder */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface StartWorkflowRequestBody {
  /**
   * The type of the parameters object */
  readonly type?: StartWorkflowRequestBodyTypeField;
  /**
   * The flow that will be triggered */
  readonly flow: StartWorkflowRequestBodyFlowField;
  /**
   * The array of files for which the workflow should start. All files
   * must be in the workflow's configured folder. */
  readonly files: readonly StartWorkflowRequestBodyFilesField[];
  /**
   * The folder object for which the workflow is configured. */
  readonly folder: StartWorkflowRequestBodyFolderField;
  /**
   * A configurable outcome the workflow should complete. */
  readonly outcomes?: readonly Outcome[];
  readonly rawData?: SerializedData;
}
export class StartWorkflowHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<StartWorkflowHeaders, 'extraHeaders'> &
      Partial<Pick<StartWorkflowHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface StartWorkflowHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class WorkflowsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      WorkflowsManager,
      'networkSession' | 'getWorkflows' | 'startWorkflow'
    > &
      Partial<Pick<WorkflowsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns list of workflows that act on a given `folder ID`, and
   * have a flow with a trigger type of `WORKFLOW_MANUAL_START`.
   *
   * You application must be authorized to use the `Manage Box Relay` application
   * scope within the developer console in to use this endpoint.
   * @param {GetWorkflowsQueryParams} queryParams Query parameters of getWorkflows method
   * @param {GetWorkflowsOptionalsInput} optionalsInput
   * @returns {Promise<Workflows>}
   */
  async getWorkflows(
    queryParams: GetWorkflowsQueryParams,
    optionalsInput: GetWorkflowsOptionalsInput = {},
  ): Promise<Workflows> {
    const optionals: GetWorkflowsOptionals = new GetWorkflowsOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['folder_id']: toString(queryParams.folderId) as string,
      ['trigger_type']: toString(queryParams.triggerType) as string,
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/workflows',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWorkflows(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Initiates a flow with a trigger type of `WORKFLOW_MANUAL_START`.
     *
     * You application must be authorized to use the `Manage Box Relay` application
     * scope within the developer console.
     * @param {string} workflowId The ID of the workflow.
    Example: "12345"
     * @param {StartWorkflowRequestBody} requestBody Request body of startWorkflow method
     * @param {StartWorkflowOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async startWorkflow(
    workflowId: string,
    requestBody: StartWorkflowRequestBody,
    optionalsInput: StartWorkflowOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: StartWorkflowOptionals = new StartWorkflowOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/workflows/',
            toString(workflowId) as string,
            '/start',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeStartWorkflowRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
}
export interface WorkflowsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeStartWorkflowRequestBodyTypeField(
  val: StartWorkflowRequestBodyTypeField,
): SerializedData {
  return val;
}
export function deserializeStartWorkflowRequestBodyTypeField(
  val: SerializedData,
): StartWorkflowRequestBodyTypeField {
  if (val == 'workflow_parameters') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize StartWorkflowRequestBodyTypeField",
  });
}
export function serializeStartWorkflowRequestBodyFlowField(
  val: StartWorkflowRequestBodyFlowField,
): SerializedData {
  return { ['type']: val.type, ['id']: val.id };
}
export function deserializeStartWorkflowRequestBodyFlowField(
  val: SerializedData,
): StartWorkflowRequestBodyFlowField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StartWorkflowRequestBodyFlowField"',
    });
  }
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "StartWorkflowRequestBodyFlowField"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "StartWorkflowRequestBodyFlowField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies StartWorkflowRequestBodyFlowField;
}
export function serializeStartWorkflowRequestBodyFilesTypeField(
  val: StartWorkflowRequestBodyFilesTypeField,
): SerializedData {
  return val;
}
export function deserializeStartWorkflowRequestBodyFilesTypeField(
  val: SerializedData,
): StartWorkflowRequestBodyFilesTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize StartWorkflowRequestBodyFilesTypeField",
  });
}
export function serializeStartWorkflowRequestBodyFilesField(
  val: StartWorkflowRequestBodyFilesField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeStartWorkflowRequestBodyFilesTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeStartWorkflowRequestBodyFilesField(
  val: SerializedData,
): StartWorkflowRequestBodyFilesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StartWorkflowRequestBodyFilesField"',
    });
  }
  const type: undefined | StartWorkflowRequestBodyFilesTypeField =
    val.type == void 0
      ? void 0
      : deserializeStartWorkflowRequestBodyFilesTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "StartWorkflowRequestBodyFilesField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies StartWorkflowRequestBodyFilesField;
}
export function serializeStartWorkflowRequestBodyFolderTypeField(
  val: StartWorkflowRequestBodyFolderTypeField,
): SerializedData {
  return val;
}
export function deserializeStartWorkflowRequestBodyFolderTypeField(
  val: SerializedData,
): StartWorkflowRequestBodyFolderTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize StartWorkflowRequestBodyFolderTypeField",
  });
}
export function serializeStartWorkflowRequestBodyFolderField(
  val: StartWorkflowRequestBodyFolderField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeStartWorkflowRequestBodyFolderTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeStartWorkflowRequestBodyFolderField(
  val: SerializedData,
): StartWorkflowRequestBodyFolderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StartWorkflowRequestBodyFolderField"',
    });
  }
  const type: undefined | StartWorkflowRequestBodyFolderTypeField =
    val.type == void 0
      ? void 0
      : deserializeStartWorkflowRequestBodyFolderTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "StartWorkflowRequestBodyFolderField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies StartWorkflowRequestBodyFolderField;
}
export function serializeStartWorkflowRequestBody(
  val: StartWorkflowRequestBody,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeStartWorkflowRequestBodyTypeField(val.type),
    ['flow']: serializeStartWorkflowRequestBodyFlowField(val.flow),
    ['files']: val.files.map(function (
      item: StartWorkflowRequestBodyFilesField,
    ): SerializedData {
      return serializeStartWorkflowRequestBodyFilesField(item);
    }) as readonly any[],
    ['folder']: serializeStartWorkflowRequestBodyFolderField(val.folder),
    ['outcomes']:
      val.outcomes == void 0
        ? val.outcomes
        : (val.outcomes.map(function (item: Outcome): SerializedData {
            return serializeOutcome(item);
          }) as readonly any[]),
  };
}
export function deserializeStartWorkflowRequestBody(
  val: SerializedData,
): StartWorkflowRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "StartWorkflowRequestBody"',
    });
  }
  const type: undefined | StartWorkflowRequestBodyTypeField =
    val.type == void 0
      ? void 0
      : deserializeStartWorkflowRequestBodyTypeField(val.type);
  if (val.flow == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "flow" of type "StartWorkflowRequestBody" to be defined',
    });
  }
  const flow: StartWorkflowRequestBodyFlowField =
    deserializeStartWorkflowRequestBodyFlowField(val.flow);
  if (val.files == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "files" of type "StartWorkflowRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.files)) {
    throw new BoxSdkError({
      message: 'Expecting array for "files" of type "StartWorkflowRequestBody"',
    });
  }
  const files: readonly StartWorkflowRequestBodyFilesField[] = sdIsList(
    val.files,
  )
    ? (val.files.map(function (
        itm: SerializedData,
      ): StartWorkflowRequestBodyFilesField {
        return deserializeStartWorkflowRequestBodyFilesField(itm);
      }) as readonly any[])
    : [];
  if (val.folder == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "folder" of type "StartWorkflowRequestBody" to be defined',
    });
  }
  const folder: StartWorkflowRequestBodyFolderField =
    deserializeStartWorkflowRequestBodyFolderField(val.folder);
  if (!(val.outcomes == void 0) && !sdIsList(val.outcomes)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "outcomes" of type "StartWorkflowRequestBody"',
    });
  }
  const outcomes: undefined | readonly Outcome[] =
    val.outcomes == void 0
      ? void 0
      : sdIsList(val.outcomes)
        ? (val.outcomes.map(function (itm: SerializedData): Outcome {
            return deserializeOutcome(itm);
          }) as readonly any[])
        : [];
  return {
    type: type,
    flow: flow,
    files: files,
    folder: folder,
    outcomes: outcomes,
  } satisfies StartWorkflowRequestBody;
}
