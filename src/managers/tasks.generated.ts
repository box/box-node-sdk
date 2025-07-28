import { serializeTasks } from '../schemas/tasks.generated.js';
import { deserializeTasks } from '../schemas/tasks.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTask } from '../schemas/task.generated.js';
import { deserializeTask } from '../schemas/task.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { Tasks } from '../schemas/tasks.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { Task } from '../schemas/task.generated.js';
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
import { DateTime } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetFileTasksOptionals {
  readonly headers: GetFileTasksHeaders = new GetFileTasksHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetFileTasksOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetFileTasksOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetFileTasksOptionalsInput {
  readonly headers?: GetFileTasksHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateTaskOptionals {
  readonly headers: CreateTaskHeaders = new CreateTaskHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateTaskOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateTaskOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateTaskOptionalsInput {
  readonly headers?: CreateTaskHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTaskByIdOptionals {
  readonly headers: GetTaskByIdHeaders = new GetTaskByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetTaskByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetTaskByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetTaskByIdOptionalsInput {
  readonly headers?: GetTaskByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateTaskByIdOptionals {
  readonly requestBody: UpdateTaskByIdRequestBody =
    {} satisfies UpdateTaskByIdRequestBody;
  readonly headers: UpdateTaskByIdHeaders = new UpdateTaskByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateTaskByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateTaskByIdOptionals,
          'requestBody' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateTaskByIdOptionalsInput {
  readonly requestBody?: UpdateTaskByIdRequestBody;
  readonly headers?: UpdateTaskByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTaskByIdOptionals {
  readonly headers: DeleteTaskByIdHeaders = new DeleteTaskByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteTaskByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<DeleteTaskByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteTaskByIdOptionalsInput {
  readonly headers?: DeleteTaskByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFileTasksHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileTasksHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileTasksHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileTasksHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateTaskRequestBodyItemTypeField = 'file';
export interface CreateTaskRequestBodyItemField {
  /**
   * The ID of the file. */
  readonly id?: string;
  /**
   * The value will always be `file`. */
  readonly type?: CreateTaskRequestBodyItemTypeField;
  readonly rawData?: SerializedData;
}
export type CreateTaskRequestBodyActionField = 'review' | 'complete' | string;
export type CreateTaskRequestBodyCompletionRuleField =
  | 'all_assignees'
  | 'any_assignee'
  | string;
export interface CreateTaskRequestBody {
  /**
   * The file to attach the task to. */
  readonly item: CreateTaskRequestBodyItemField;
  /**
   * The action the task assignee will be prompted to do. Must be
   *
   * * `review` defines an approval task that can be approved or,
   * rejected
   * * `complete` defines a general task which can be completed. */
  readonly action?: CreateTaskRequestBodyActionField;
  /**
   * An optional message to include with the task. */
  readonly message?: string;
  /**
   * Defines when the task is due. Defaults to `null` if not
   * provided. */
  readonly dueAt?: DateTime;
  /**
   * Defines which assignees need to complete this task before the task
   * is considered completed.
   *
   * * `all_assignees` (default) requires all assignees to review or
   * approve the the task in order for it to be considered completed.
   * * `any_assignee` accepts any one assignee to review or
   * approve the the task in order for it to be considered completed. */
  readonly completionRule?: CreateTaskRequestBodyCompletionRuleField;
  readonly rawData?: SerializedData;
}
export class CreateTaskHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateTaskHeaders, 'extraHeaders'> &
      Partial<Pick<CreateTaskHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateTaskHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetTaskByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTaskByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTaskByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTaskByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateTaskByIdRequestBodyActionField =
  | 'review'
  | 'complete'
  | string;
export type UpdateTaskByIdRequestBodyCompletionRuleField =
  | 'all_assignees'
  | 'any_assignee'
  | string;
export interface UpdateTaskByIdRequestBody {
  /**
   * The action the task assignee will be prompted to do. Must be
   *
   * * `review` defines an approval task that can be approved or
   * rejected,
   * * `complete` defines a general task which can be completed. */
  readonly action?: UpdateTaskByIdRequestBodyActionField;
  /**
   * The message included with the task. */
  readonly message?: string;
  /**
   * When the task is due at. */
  readonly dueAt?: DateTime;
  /**
   * Defines which assignees need to complete this task before the task
   * is considered completed.
   *
   * * `all_assignees` (default) requires all assignees to review or
   * approve the the task in order for it to be considered completed.
   * * `any_assignee` accepts any one assignee to review or
   * approve the the task in order for it to be considered completed. */
  readonly completionRule?: UpdateTaskByIdRequestBodyCompletionRuleField;
  readonly rawData?: SerializedData;
}
export class UpdateTaskByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateTaskByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateTaskByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateTaskByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTaskByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTaskByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTaskByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTaskByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TasksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TasksManager,
      | 'networkSession'
      | 'getFileTasks'
      | 'createTask'
      | 'getTaskById'
      | 'updateTaskById'
      | 'deleteTaskById'
    > &
      Partial<Pick<TasksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves a list of all the tasks for a file. This
     * endpoint does not support pagination.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileTasksOptionalsInput} optionalsInput
     * @returns {Promise<Tasks>}
     */
  async getFileTasks(
    fileId: string,
    optionalsInput: GetFileTasksOptionalsInput = {},
  ): Promise<Tasks> {
    const optionals: GetFileTasksOptionals = new GetFileTasksOptionals({
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
            '/2.0/files/',
            toString(fileId) as string,
            '/tasks',
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTasks(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a single task on a file. This task is not assigned to any user and
   * will need to be assigned separately.
   * @param {CreateTaskRequestBody} requestBody Request body of createTask method
   * @param {CreateTaskOptionalsInput} optionalsInput
   * @returns {Promise<Task>}
   */
  async createTask(
    requestBody: CreateTaskRequestBody,
    optionalsInput: CreateTaskOptionalsInput = {},
  ): Promise<Task> {
    const optionals: CreateTaskOptionals = new CreateTaskOptionals({
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
            '/2.0/tasks',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateTaskRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTask(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves information about a specific task.
     * @param {string} taskId The ID of the task.
    Example: "12345"
     * @param {GetTaskByIdOptionalsInput} optionalsInput
     * @returns {Promise<Task>}
     */
  async getTaskById(
    taskId: string,
    optionalsInput: GetTaskByIdOptionalsInput = {},
  ): Promise<Task> {
    const optionals: GetTaskByIdOptionals = new GetTaskByIdOptionals({
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
            '/2.0/tasks/',
            toString(taskId) as string,
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTask(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a task. This can be used to update a task's configuration, or to
     * update its completion state.
     * @param {string} taskId The ID of the task.
    Example: "12345"
     * @param {UpdateTaskByIdOptionalsInput} optionalsInput
     * @returns {Promise<Task>}
     */
  async updateTaskById(
    taskId: string,
    optionalsInput: UpdateTaskByIdOptionalsInput = {},
  ): Promise<Task> {
    const optionals: UpdateTaskByIdOptionals = new UpdateTaskByIdOptionals({
      requestBody: optionalsInput.requestBody,
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const requestBody: any = optionals.requestBody;
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
            '/2.0/tasks/',
            toString(taskId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateTaskByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTask(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a task from a file.
     * @param {string} taskId The ID of the task.
    Example: "12345"
     * @param {DeleteTaskByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTaskById(
    taskId: string,
    optionalsInput: DeleteTaskByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTaskByIdOptionals = new DeleteTaskByIdOptionals({
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
            '/2.0/tasks/',
            toString(taskId) as string,
          ) as string,
          method: 'DELETE',
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
}
export interface TasksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateTaskRequestBodyItemTypeField(
  val: CreateTaskRequestBodyItemTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateTaskRequestBodyItemTypeField(
  val: SerializedData,
): CreateTaskRequestBodyItemTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTaskRequestBodyItemTypeField",
  });
}
export function serializeCreateTaskRequestBodyItemField(
  val: CreateTaskRequestBodyItemField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateTaskRequestBodyItemTypeField(val.type),
  };
}
export function deserializeCreateTaskRequestBodyItemField(
  val: SerializedData,
): CreateTaskRequestBodyItemField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateTaskRequestBodyItemField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateTaskRequestBodyItemField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CreateTaskRequestBodyItemTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateTaskRequestBodyItemTypeField(val.type);
  return { id: id, type: type } satisfies CreateTaskRequestBodyItemField;
}
export function serializeCreateTaskRequestBodyActionField(
  val: CreateTaskRequestBodyActionField,
): SerializedData {
  return val;
}
export function deserializeCreateTaskRequestBodyActionField(
  val: SerializedData,
): CreateTaskRequestBodyActionField {
  if (val == 'review') {
    return val;
  }
  if (val == 'complete') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTaskRequestBodyActionField",
  });
}
export function serializeCreateTaskRequestBodyCompletionRuleField(
  val: CreateTaskRequestBodyCompletionRuleField,
): SerializedData {
  return val;
}
export function deserializeCreateTaskRequestBodyCompletionRuleField(
  val: SerializedData,
): CreateTaskRequestBodyCompletionRuleField {
  if (val == 'all_assignees') {
    return val;
  }
  if (val == 'any_assignee') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTaskRequestBodyCompletionRuleField",
  });
}
export function serializeCreateTaskRequestBody(
  val: CreateTaskRequestBody,
): SerializedData {
  return {
    ['item']: serializeCreateTaskRequestBodyItemField(val.item),
    ['action']:
      val.action == void 0
        ? val.action
        : serializeCreateTaskRequestBodyActionField(val.action),
    ['message']: val.message,
    ['due_at']: val.dueAt == void 0 ? val.dueAt : serializeDateTime(val.dueAt),
    ['completion_rule']:
      val.completionRule == void 0
        ? val.completionRule
        : serializeCreateTaskRequestBodyCompletionRuleField(val.completionRule),
  };
}
export function deserializeCreateTaskRequestBody(
  val: SerializedData,
): CreateTaskRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateTaskRequestBody"',
    });
  }
  if (val.item == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item" of type "CreateTaskRequestBody" to be defined',
    });
  }
  const item: CreateTaskRequestBodyItemField =
    deserializeCreateTaskRequestBodyItemField(val.item);
  const action: undefined | CreateTaskRequestBodyActionField =
    val.action == void 0
      ? void 0
      : deserializeCreateTaskRequestBodyActionField(val.action);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "CreateTaskRequestBody"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.due_at == void 0) && !sdIsString(val.due_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "due_at" of type "CreateTaskRequestBody"',
    });
  }
  const dueAt: undefined | DateTime =
    val.due_at == void 0 ? void 0 : deserializeDateTime(val.due_at);
  const completionRule: undefined | CreateTaskRequestBodyCompletionRuleField =
    val.completion_rule == void 0
      ? void 0
      : deserializeCreateTaskRequestBodyCompletionRuleField(
          val.completion_rule,
        );
  return {
    item: item,
    action: action,
    message: message,
    dueAt: dueAt,
    completionRule: completionRule,
  } satisfies CreateTaskRequestBody;
}
export function serializeUpdateTaskByIdRequestBodyActionField(
  val: UpdateTaskByIdRequestBodyActionField,
): SerializedData {
  return val;
}
export function deserializeUpdateTaskByIdRequestBodyActionField(
  val: SerializedData,
): UpdateTaskByIdRequestBodyActionField {
  if (val == 'review') {
    return val;
  }
  if (val == 'complete') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateTaskByIdRequestBodyActionField",
  });
}
export function serializeUpdateTaskByIdRequestBodyCompletionRuleField(
  val: UpdateTaskByIdRequestBodyCompletionRuleField,
): SerializedData {
  return val;
}
export function deserializeUpdateTaskByIdRequestBodyCompletionRuleField(
  val: SerializedData,
): UpdateTaskByIdRequestBodyCompletionRuleField {
  if (val == 'all_assignees') {
    return val;
  }
  if (val == 'any_assignee') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateTaskByIdRequestBodyCompletionRuleField",
  });
}
export function serializeUpdateTaskByIdRequestBody(
  val: UpdateTaskByIdRequestBody,
): SerializedData {
  return {
    ['action']:
      val.action == void 0
        ? val.action
        : serializeUpdateTaskByIdRequestBodyActionField(val.action),
    ['message']: val.message,
    ['due_at']: val.dueAt == void 0 ? val.dueAt : serializeDateTime(val.dueAt),
    ['completion_rule']:
      val.completionRule == void 0
        ? val.completionRule
        : serializeUpdateTaskByIdRequestBodyCompletionRuleField(
            val.completionRule,
          ),
  };
}
export function deserializeUpdateTaskByIdRequestBody(
  val: SerializedData,
): UpdateTaskByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateTaskByIdRequestBody"',
    });
  }
  const action: undefined | UpdateTaskByIdRequestBodyActionField =
    val.action == void 0
      ? void 0
      : deserializeUpdateTaskByIdRequestBodyActionField(val.action);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "UpdateTaskByIdRequestBody"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.due_at == void 0) && !sdIsString(val.due_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "due_at" of type "UpdateTaskByIdRequestBody"',
    });
  }
  const dueAt: undefined | DateTime =
    val.due_at == void 0 ? void 0 : deserializeDateTime(val.due_at);
  const completionRule:
    | undefined
    | UpdateTaskByIdRequestBodyCompletionRuleField =
    val.completion_rule == void 0
      ? void 0
      : deserializeUpdateTaskByIdRequestBodyCompletionRuleField(
          val.completion_rule,
        );
  return {
    action: action,
    message: message,
    dueAt: dueAt,
    completionRule: completionRule,
  } satisfies UpdateTaskByIdRequestBody;
}
