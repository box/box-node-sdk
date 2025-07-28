import { serializeTaskAssignments } from '../schemas/taskAssignments.generated.js';
import { deserializeTaskAssignments } from '../schemas/taskAssignments.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTaskAssignment } from '../schemas/taskAssignment.generated.js';
import { deserializeTaskAssignment } from '../schemas/taskAssignment.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { TaskAssignments } from '../schemas/taskAssignments.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { TaskAssignment } from '../schemas/taskAssignment.generated.js';
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
export class GetTaskAssignmentsOptionals {
  readonly headers: GetTaskAssignmentsHeaders = new GetTaskAssignmentsHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetTaskAssignmentsOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<GetTaskAssignmentsOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetTaskAssignmentsOptionalsInput {
  readonly headers?: GetTaskAssignmentsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateTaskAssignmentOptionals {
  readonly headers: CreateTaskAssignmentHeaders =
    new CreateTaskAssignmentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateTaskAssignmentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateTaskAssignmentOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateTaskAssignmentOptionalsInput {
  readonly headers?: CreateTaskAssignmentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTaskAssignmentByIdOptionals {
  readonly headers: GetTaskAssignmentByIdHeaders =
    new GetTaskAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetTaskAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetTaskAssignmentByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetTaskAssignmentByIdOptionalsInput {
  readonly headers?: GetTaskAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateTaskAssignmentByIdOptionals {
  readonly requestBody: UpdateTaskAssignmentByIdRequestBody =
    {} satisfies UpdateTaskAssignmentByIdRequestBody;
  readonly headers: UpdateTaskAssignmentByIdHeaders =
    new UpdateTaskAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateTaskAssignmentByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateTaskAssignmentByIdOptionals,
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
export interface UpdateTaskAssignmentByIdOptionalsInput {
  readonly requestBody?: UpdateTaskAssignmentByIdRequestBody;
  readonly headers?: UpdateTaskAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTaskAssignmentByIdOptionals {
  readonly headers: DeleteTaskAssignmentByIdHeaders =
    new DeleteTaskAssignmentByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteTaskAssignmentByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteTaskAssignmentByIdOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteTaskAssignmentByIdOptionalsInput {
  readonly headers?: DeleteTaskAssignmentByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTaskAssignmentsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTaskAssignmentsHeaders, 'extraHeaders'> &
      Partial<Pick<GetTaskAssignmentsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTaskAssignmentsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateTaskAssignmentRequestBodyTaskTypeField = 'task';
export class CreateTaskAssignmentRequestBodyTaskField {
  /**
   * The ID of the task. */
  readonly id!: string;
  /**
   * The type of the item to assign. */
  readonly type: CreateTaskAssignmentRequestBodyTaskTypeField =
    'task' as CreateTaskAssignmentRequestBodyTaskTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<CreateTaskAssignmentRequestBodyTaskField, 'type'> &
      Partial<Pick<CreateTaskAssignmentRequestBodyTaskField, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface CreateTaskAssignmentRequestBodyTaskFieldInput {
  /**
   * The ID of the task. */
  readonly id: string;
  /**
   * The type of the item to assign. */
  readonly type?: CreateTaskAssignmentRequestBodyTaskTypeField;
  readonly rawData?: SerializedData;
}
export interface CreateTaskAssignmentRequestBodyAssignToField {
  /**
   * The ID of the user to assign to the
   * task.
   *
   * To specify a user by their email
   * address use the `login` parameter. */
  readonly id?: string;
  /**
   * The email address of the user to assign to the task.
   * To specify a user by their user ID please use the `id` parameter. */
  readonly login?: string;
  readonly rawData?: SerializedData;
}
export interface CreateTaskAssignmentRequestBody {
  /**
   * The task to assign to a user. */
  readonly task: CreateTaskAssignmentRequestBodyTaskField;
  /**
   * The user to assign the task to. */
  readonly assignTo: CreateTaskAssignmentRequestBodyAssignToField;
  readonly rawData?: SerializedData;
}
export class CreateTaskAssignmentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateTaskAssignmentHeaders, 'extraHeaders'> &
      Partial<Pick<CreateTaskAssignmentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateTaskAssignmentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetTaskAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTaskAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTaskAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTaskAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateTaskAssignmentByIdRequestBodyResolutionStateField =
  | 'completed'
  | 'incomplete'
  | 'approved'
  | 'rejected'
  | string;
export interface UpdateTaskAssignmentByIdRequestBody {
  /**
   * An optional message by the assignee that can be added to the task. */
  readonly message?: string;
  /**
   * The state of the task assigned to the user.
   *
   * * For a task with an `action` value of `complete` this can be
   * `incomplete` or `completed`.
   * * For a task with an `action` of `review` this can be
   * `incomplete`, `approved`, or `rejected`. */
  readonly resolutionState?: UpdateTaskAssignmentByIdRequestBodyResolutionStateField;
  readonly rawData?: SerializedData;
}
export class UpdateTaskAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateTaskAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateTaskAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateTaskAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTaskAssignmentByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTaskAssignmentByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTaskAssignmentByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTaskAssignmentByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TaskAssignmentsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TaskAssignmentsManager,
      | 'networkSession'
      | 'getTaskAssignments'
      | 'createTaskAssignment'
      | 'getTaskAssignmentById'
      | 'updateTaskAssignmentById'
      | 'deleteTaskAssignmentById'
    > &
      Partial<Pick<TaskAssignmentsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Lists all of the assignments for a given task.
     * @param {string} taskId The ID of the task.
    Example: "12345"
     * @param {GetTaskAssignmentsOptionalsInput} optionalsInput
     * @returns {Promise<TaskAssignments>}
     */
  async getTaskAssignments(
    taskId: string,
    optionalsInput: GetTaskAssignmentsOptionalsInput = {},
  ): Promise<TaskAssignments> {
    const optionals: GetTaskAssignmentsOptionals =
      new GetTaskAssignmentsOptionals({
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
            '/assignments',
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
      ...deserializeTaskAssignments(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Assigns a task to a user.
   *
   * A task can be assigned to more than one user by creating multiple
   * assignments.
   * @param {CreateTaskAssignmentRequestBody} requestBody Request body of createTaskAssignment method
   * @param {CreateTaskAssignmentOptionalsInput} optionalsInput
   * @returns {Promise<TaskAssignment>}
   */
  async createTaskAssignment(
    requestBody: CreateTaskAssignmentRequestBody,
    optionalsInput: CreateTaskAssignmentOptionalsInput = {},
  ): Promise<TaskAssignment> {
    const optionals: CreateTaskAssignmentOptionals =
      new CreateTaskAssignmentOptionals({
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
            '/2.0/task_assignments',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateTaskAssignmentRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTaskAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves information about a task assignment.
     * @param {string} taskAssignmentId The ID of the task assignment.
    Example: "12345"
     * @param {GetTaskAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<TaskAssignment>}
     */
  async getTaskAssignmentById(
    taskAssignmentId: string,
    optionalsInput: GetTaskAssignmentByIdOptionalsInput = {},
  ): Promise<TaskAssignment> {
    const optionals: GetTaskAssignmentByIdOptionals =
      new GetTaskAssignmentByIdOptionals({
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
            '/2.0/task_assignments/',
            toString(taskAssignmentId) as string,
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
      ...deserializeTaskAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a task assignment. This endpoint can be
     * used to update the state of a task assigned to a user.
     * @param {string} taskAssignmentId The ID of the task assignment.
    Example: "12345"
     * @param {UpdateTaskAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<TaskAssignment>}
     */
  async updateTaskAssignmentById(
    taskAssignmentId: string,
    optionalsInput: UpdateTaskAssignmentByIdOptionalsInput = {},
  ): Promise<TaskAssignment> {
    const optionals: UpdateTaskAssignmentByIdOptionals =
      new UpdateTaskAssignmentByIdOptionals({
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
            '/2.0/task_assignments/',
            toString(taskAssignmentId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateTaskAssignmentByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTaskAssignment(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a specific task assignment.
     * @param {string} taskAssignmentId The ID of the task assignment.
    Example: "12345"
     * @param {DeleteTaskAssignmentByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTaskAssignmentById(
    taskAssignmentId: string,
    optionalsInput: DeleteTaskAssignmentByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTaskAssignmentByIdOptionals =
      new DeleteTaskAssignmentByIdOptionals({
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
            '/2.0/task_assignments/',
            toString(taskAssignmentId) as string,
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
export interface TaskAssignmentsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateTaskAssignmentRequestBodyTaskTypeField(
  val: CreateTaskAssignmentRequestBodyTaskTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateTaskAssignmentRequestBodyTaskTypeField(
  val: SerializedData,
): CreateTaskAssignmentRequestBodyTaskTypeField {
  if (val == 'task') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateTaskAssignmentRequestBodyTaskTypeField",
  });
}
export function serializeCreateTaskAssignmentRequestBodyTaskField(
  val: CreateTaskAssignmentRequestBodyTaskField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeCreateTaskAssignmentRequestBodyTaskTypeField(val.type),
  };
}
export function deserializeCreateTaskAssignmentRequestBodyTaskField(
  val: SerializedData,
): CreateTaskAssignmentRequestBodyTaskField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateTaskAssignmentRequestBodyTaskField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateTaskAssignmentRequestBodyTaskField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateTaskAssignmentRequestBodyTaskField"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "CreateTaskAssignmentRequestBodyTaskField" to be defined',
    });
  }
  const type: CreateTaskAssignmentRequestBodyTaskTypeField =
    deserializeCreateTaskAssignmentRequestBodyTaskTypeField(val.type);
  return {
    id: id,
    type: type,
  } satisfies CreateTaskAssignmentRequestBodyTaskField;
}
export function serializeCreateTaskAssignmentRequestBodyTaskFieldInput(
  val: CreateTaskAssignmentRequestBodyTaskFieldInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateTaskAssignmentRequestBodyTaskTypeField(val.type),
  };
}
export function deserializeCreateTaskAssignmentRequestBodyTaskFieldInput(
  val: SerializedData,
): CreateTaskAssignmentRequestBodyTaskFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateTaskAssignmentRequestBodyTaskFieldInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateTaskAssignmentRequestBodyTaskFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateTaskAssignmentRequestBodyTaskFieldInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | CreateTaskAssignmentRequestBodyTaskTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateTaskAssignmentRequestBodyTaskTypeField(val.type);
  return {
    id: id,
    type: type,
  } satisfies CreateTaskAssignmentRequestBodyTaskFieldInput;
}
export function serializeCreateTaskAssignmentRequestBodyAssignToField(
  val: CreateTaskAssignmentRequestBodyAssignToField,
): SerializedData {
  return { ['id']: val.id, ['login']: val.login };
}
export function deserializeCreateTaskAssignmentRequestBodyAssignToField(
  val: SerializedData,
): CreateTaskAssignmentRequestBodyAssignToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "CreateTaskAssignmentRequestBodyAssignToField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateTaskAssignmentRequestBodyAssignToField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "login" of type "CreateTaskAssignmentRequestBodyAssignToField"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  return {
    id: id,
    login: login,
  } satisfies CreateTaskAssignmentRequestBodyAssignToField;
}
export function serializeCreateTaskAssignmentRequestBody(
  val: CreateTaskAssignmentRequestBody,
): SerializedData {
  return {
    ['task']: serializeCreateTaskAssignmentRequestBodyTaskField(val.task),
    ['assign_to']: serializeCreateTaskAssignmentRequestBodyAssignToField(
      val.assignTo,
    ),
  };
}
export function deserializeCreateTaskAssignmentRequestBody(
  val: SerializedData,
): CreateTaskAssignmentRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateTaskAssignmentRequestBody"',
    });
  }
  if (val.task == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "task" of type "CreateTaskAssignmentRequestBody" to be defined',
    });
  }
  const task: CreateTaskAssignmentRequestBodyTaskField =
    deserializeCreateTaskAssignmentRequestBodyTaskField(val.task);
  if (val.assign_to == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "assign_to" of type "CreateTaskAssignmentRequestBody" to be defined',
    });
  }
  const assignTo: CreateTaskAssignmentRequestBodyAssignToField =
    deserializeCreateTaskAssignmentRequestBodyAssignToField(val.assign_to);
  return {
    task: task,
    assignTo: assignTo,
  } satisfies CreateTaskAssignmentRequestBody;
}
export function serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(
  val: UpdateTaskAssignmentByIdRequestBodyResolutionStateField,
): SerializedData {
  return val;
}
export function deserializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(
  val: SerializedData,
): UpdateTaskAssignmentByIdRequestBodyResolutionStateField {
  if (val == 'completed') {
    return val;
  }
  if (val == 'incomplete') {
    return val;
  }
  if (val == 'approved') {
    return val;
  }
  if (val == 'rejected') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateTaskAssignmentByIdRequestBodyResolutionStateField",
  });
}
export function serializeUpdateTaskAssignmentByIdRequestBody(
  val: UpdateTaskAssignmentByIdRequestBody,
): SerializedData {
  return {
    ['message']: val.message,
    ['resolution_state']:
      val.resolutionState == void 0
        ? val.resolutionState
        : serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(
            val.resolutionState,
          ),
  };
}
export function deserializeUpdateTaskAssignmentByIdRequestBody(
  val: SerializedData,
): UpdateTaskAssignmentByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateTaskAssignmentByIdRequestBody"',
    });
  }
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "UpdateTaskAssignmentByIdRequestBody"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  const resolutionState:
    | undefined
    | UpdateTaskAssignmentByIdRequestBodyResolutionStateField =
    val.resolution_state == void 0
      ? void 0
      : deserializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(
          val.resolution_state,
        );
  return {
    message: message,
    resolutionState: resolutionState,
  } satisfies UpdateTaskAssignmentByIdRequestBody;
}
