import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeWebhooks } from '../schemas/webhooks.generated.js';
import { deserializeWebhooks } from '../schemas/webhooks.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeWebhook } from '../schemas/webhook.generated.js';
import { deserializeWebhook } from '../schemas/webhook.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { DateTime } from '../internal/utils.js';
import { Webhooks } from '../schemas/webhooks.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { Webhook } from '../schemas/webhook.generated.js';
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
import { computeWebhookSignature } from '../internal/utils.js';
import { compareSignatures } from '../internal/utils.js';
import { dateTimeFromString } from '../internal/utils.js';
import { getEpochTimeInSeconds } from '../internal/utils.js';
import { dateTimeToEpochSeconds } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class CreateWebhookOptionals {
  readonly headers: CreateWebhookHeaders = new CreateWebhookHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateWebhookOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateWebhookOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateWebhookOptionalsInput {
  readonly headers?: CreateWebhookHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetWebhookByIdOptionals {
  readonly headers: GetWebhookByIdHeaders = new GetWebhookByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetWebhookByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetWebhookByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetWebhookByIdOptionalsInput {
  readonly headers?: GetWebhookByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateWebhookByIdOptionals {
  readonly requestBody: UpdateWebhookByIdRequestBody =
    {} satisfies UpdateWebhookByIdRequestBody;
  readonly headers: UpdateWebhookByIdHeaders = new UpdateWebhookByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateWebhookByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateWebhookByIdOptionals,
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
export interface UpdateWebhookByIdOptionalsInput {
  readonly requestBody?: UpdateWebhookByIdRequestBody;
  readonly headers?: UpdateWebhookByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteWebhookByIdOptionals {
  readonly headers: DeleteWebhookByIdHeaders = new DeleteWebhookByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteWebhookByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<DeleteWebhookByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteWebhookByIdOptionalsInput {
  readonly headers?: DeleteWebhookByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class ValidateMessageOptionals {
  readonly secondaryKey?: string = void 0;
  readonly maxAge?: number = 600;
  constructor(
    fields: Omit<ValidateMessageOptionals, 'secondaryKey' | 'maxAge'> &
      Partial<Pick<ValidateMessageOptionals, 'secondaryKey' | 'maxAge'>>,
  ) {
    if (fields.secondaryKey !== undefined) {
      this.secondaryKey = fields.secondaryKey;
    }
    if (fields.maxAge !== undefined) {
      this.maxAge = fields.maxAge;
    }
  }
}
export interface ValidateMessageOptionalsInput {
  readonly secondaryKey?: undefined | string;
  readonly maxAge?: undefined | number;
}
export interface GetWebhooksQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetWebhooksHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetWebhooksHeaders, 'extraHeaders'> &
      Partial<Pick<GetWebhooksHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetWebhooksHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type CreateWebhookRequestBodyTargetTypeField = 'file' | 'folder';
export interface CreateWebhookRequestBodyTargetField {
  /**
   * The ID of the item to trigger a webhook. */
  readonly id?: string;
  /**
   * The type of item to trigger a webhook. */
  readonly type?: CreateWebhookRequestBodyTargetTypeField;
  readonly rawData?: SerializedData;
}
export type CreateWebhookRequestBodyTriggersField =
  | 'FILE.UPLOADED'
  | 'FILE.PREVIEWED'
  | 'FILE.DOWNLOADED'
  | 'FILE.TRASHED'
  | 'FILE.DELETED'
  | 'FILE.RESTORED'
  | 'FILE.COPIED'
  | 'FILE.MOVED'
  | 'FILE.LOCKED'
  | 'FILE.UNLOCKED'
  | 'FILE.RENAMED'
  | 'COMMENT.CREATED'
  | 'COMMENT.UPDATED'
  | 'COMMENT.DELETED'
  | 'TASK_ASSIGNMENT.CREATED'
  | 'TASK_ASSIGNMENT.UPDATED'
  | 'METADATA_INSTANCE.CREATED'
  | 'METADATA_INSTANCE.UPDATED'
  | 'METADATA_INSTANCE.DELETED'
  | 'FOLDER.CREATED'
  | 'FOLDER.RENAMED'
  | 'FOLDER.DOWNLOADED'
  | 'FOLDER.RESTORED'
  | 'FOLDER.DELETED'
  | 'FOLDER.COPIED'
  | 'FOLDER.MOVED'
  | 'FOLDER.TRASHED'
  | 'WEBHOOK.DELETED'
  | 'COLLABORATION.CREATED'
  | 'COLLABORATION.ACCEPTED'
  | 'COLLABORATION.REJECTED'
  | 'COLLABORATION.REMOVED'
  | 'COLLABORATION.UPDATED'
  | 'SHARED_LINK.DELETED'
  | 'SHARED_LINK.CREATED'
  | 'SHARED_LINK.UPDATED'
  | 'SIGN_REQUEST.COMPLETED'
  | 'SIGN_REQUEST.DECLINED'
  | 'SIGN_REQUEST.EXPIRED'
  | 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED'
  | string;
export interface CreateWebhookRequestBody {
  /**
   * The item that will trigger the webhook. */
  readonly target: CreateWebhookRequestBodyTargetField;
  /**
   * The URL that is notified by this webhook. */
  readonly address: string;
  /**
   * An array of event names that this webhook is
   * to be triggered for. */
  readonly triggers: readonly CreateWebhookRequestBodyTriggersField[];
  readonly rawData?: SerializedData;
}
export class CreateWebhookHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateWebhookHeaders, 'extraHeaders'> &
      Partial<Pick<CreateWebhookHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateWebhookHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetWebhookByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetWebhookByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetWebhookByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetWebhookByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateWebhookByIdRequestBodyTargetTypeField = 'file' | 'folder';
export interface UpdateWebhookByIdRequestBodyTargetField {
  /**
   * The ID of the item to trigger a webhook. */
  readonly id?: string;
  /**
   * The type of item to trigger a webhook. */
  readonly type?: UpdateWebhookByIdRequestBodyTargetTypeField;
  readonly rawData?: SerializedData;
}
export type UpdateWebhookByIdRequestBodyTriggersField =
  | 'FILE.UPLOADED'
  | 'FILE.PREVIEWED'
  | 'FILE.DOWNLOADED'
  | 'FILE.TRASHED'
  | 'FILE.DELETED'
  | 'FILE.RESTORED'
  | 'FILE.COPIED'
  | 'FILE.MOVED'
  | 'FILE.LOCKED'
  | 'FILE.UNLOCKED'
  | 'FILE.RENAMED'
  | 'COMMENT.CREATED'
  | 'COMMENT.UPDATED'
  | 'COMMENT.DELETED'
  | 'TASK_ASSIGNMENT.CREATED'
  | 'TASK_ASSIGNMENT.UPDATED'
  | 'METADATA_INSTANCE.CREATED'
  | 'METADATA_INSTANCE.UPDATED'
  | 'METADATA_INSTANCE.DELETED'
  | 'FOLDER.CREATED'
  | 'FOLDER.RENAMED'
  | 'FOLDER.DOWNLOADED'
  | 'FOLDER.RESTORED'
  | 'FOLDER.DELETED'
  | 'FOLDER.COPIED'
  | 'FOLDER.MOVED'
  | 'FOLDER.TRASHED'
  | 'WEBHOOK.DELETED'
  | 'COLLABORATION.CREATED'
  | 'COLLABORATION.ACCEPTED'
  | 'COLLABORATION.REJECTED'
  | 'COLLABORATION.REMOVED'
  | 'COLLABORATION.UPDATED'
  | 'SHARED_LINK.DELETED'
  | 'SHARED_LINK.CREATED'
  | 'SHARED_LINK.UPDATED'
  | 'SIGN_REQUEST.COMPLETED'
  | 'SIGN_REQUEST.DECLINED'
  | 'SIGN_REQUEST.EXPIRED'
  | 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED'
  | string;
export interface UpdateWebhookByIdRequestBody {
  /**
   * The item that will trigger the webhook. */
  readonly target?: UpdateWebhookByIdRequestBodyTargetField;
  /**
   * The URL that is notified by this webhook. */
  readonly address?: string;
  /**
   * An array of event names that this webhook is
   * to be triggered for. */
  readonly triggers?: readonly UpdateWebhookByIdRequestBodyTriggersField[];
  readonly rawData?: SerializedData;
}
export class UpdateWebhookByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateWebhookByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateWebhookByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateWebhookByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteWebhookByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteWebhookByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteWebhookByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteWebhookByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class WebhooksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      WebhooksManager,
      | 'networkSession'
      | 'getWebhooks'
      | 'createWebhook'
      | 'getWebhookById'
      | 'updateWebhookById'
      | 'deleteWebhookById'
      | 'validateMessage'
    > &
      Partial<Pick<WebhooksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns all defined webhooks for the requesting application.
   *
   * This API only returns webhooks that are applied to files or folders that are
   * owned by the authenticated user. This means that an admin can not see webhooks
   * created by a service account unless the admin has access to those folders, and
   * vice versa.
   * @param {GetWebhooksQueryParams} queryParams Query parameters of getWebhooks method
   * @param {GetWebhooksHeadersInput} headersInput Headers of getWebhooks method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<Webhooks>}
   */
  async getWebhooks(
    queryParams: GetWebhooksQueryParams = {} satisfies GetWebhooksQueryParams,
    headersInput: GetWebhooksHeadersInput = new GetWebhooksHeaders({}),
    cancellationToken?: CancellationToken,
  ): Promise<Webhooks> {
    const headers: GetWebhooksHeaders = new GetWebhooksHeaders({
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/webhooks',
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
      ...deserializeWebhooks(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a webhook.
   * @param {CreateWebhookRequestBody} requestBody Request body of createWebhook method
   * @param {CreateWebhookOptionalsInput} optionalsInput
   * @returns {Promise<Webhook>}
   */
  async createWebhook(
    requestBody: CreateWebhookRequestBody,
    optionalsInput: CreateWebhookOptionalsInput = {},
  ): Promise<Webhook> {
    const optionals: CreateWebhookOptionals = new CreateWebhookOptionals({
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
            '/2.0/webhooks',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateWebhookRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWebhook(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a specific webhook.
     * @param {string} webhookId The ID of the webhook.
    Example: "3321123"
     * @param {GetWebhookByIdOptionalsInput} optionalsInput
     * @returns {Promise<Webhook>}
     */
  async getWebhookById(
    webhookId: string,
    optionalsInput: GetWebhookByIdOptionalsInput = {},
  ): Promise<Webhook> {
    const optionals: GetWebhookByIdOptionals = new GetWebhookByIdOptionals({
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
            '/2.0/webhooks/',
            toString(webhookId) as string,
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
      ...deserializeWebhook(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a webhook.
     * @param {string} webhookId The ID of the webhook.
    Example: "3321123"
     * @param {UpdateWebhookByIdOptionalsInput} optionalsInput
     * @returns {Promise<Webhook>}
     */
  async updateWebhookById(
    webhookId: string,
    optionalsInput: UpdateWebhookByIdOptionalsInput = {},
  ): Promise<Webhook> {
    const optionals: UpdateWebhookByIdOptionals =
      new UpdateWebhookByIdOptionals({
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
            '/2.0/webhooks/',
            toString(webhookId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateWebhookByIdRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWebhook(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes a webhook.
     * @param {string} webhookId The ID of the webhook.
    Example: "3321123"
     * @param {DeleteWebhookByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteWebhookById(
    webhookId: string,
    optionalsInput: DeleteWebhookByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteWebhookByIdOptionals =
      new DeleteWebhookByIdOptionals({
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
            '/2.0/webhooks/',
            toString(webhookId) as string,
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
  /**
     * Validate a webhook message by verifying the signature and the delivery timestamp
     * @param {string} body The request body of the webhook message
     * @param {{
        readonly [key: string]: string;
    }} headers The headers of the webhook message
     * @param {string} primaryKey The primary signature to verify the message with
     * @param {ValidateMessageOptionalsInput} optionalsInput
     * @returns {Promise<boolean>}
     */
  static async validateMessage(
    body: string,
    headers: {
      readonly [key: string]: string;
    },
    primaryKey: string,
    optionalsInput: ValidateMessageOptionalsInput = {},
  ): Promise<boolean> {
    const optionals: ValidateMessageOptionals = new ValidateMessageOptionals({
      secondaryKey: optionalsInput.secondaryKey,
      maxAge: optionalsInput.maxAge,
    });
    const secondaryKey: any = optionals.secondaryKey;
    const maxAge: any = optionals.maxAge;
    const deliveryTimestamp: DateTime = dateTimeFromString(
      headers['box-delivery-timestamp'],
    );
    const currentEpoch: number = getEpochTimeInSeconds();
    if (
      currentEpoch - maxAge > dateTimeToEpochSeconds(deliveryTimestamp) ||
      dateTimeToEpochSeconds(deliveryTimestamp) > currentEpoch
    ) {
      return false;
    }
    if (
      !(primaryKey == void 0) &&
      !(headers['box-signature-primary'] == void 0) &&
      (await compareSignatures(
        await computeWebhookSignature(body, headers, primaryKey, false),
        headers['box-signature-primary'],
      ))
    ) {
      return true;
    }
    if (
      !(primaryKey == void 0) &&
      !(headers['box-signature-primary'] == void 0) &&
      (await compareSignatures(
        await computeWebhookSignature(body, headers, primaryKey, true),
        headers['box-signature-primary'],
      ))
    ) {
      return true;
    }
    if (
      !(secondaryKey == void 0) &&
      !(headers['box-signature-secondary'] == void 0) &&
      (await compareSignatures(
        await computeWebhookSignature(body, headers, secondaryKey, false),
        headers['box-signature-secondary'],
      ))
    ) {
      return true;
    }
    if (
      !(secondaryKey == void 0) &&
      !(headers['box-signature-secondary'] == void 0) &&
      (await compareSignatures(
        await computeWebhookSignature(body, headers, secondaryKey, true),
        headers['box-signature-secondary'],
      ))
    ) {
      return true;
    }
    return false;
  }
}
export interface WebhooksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateWebhookRequestBodyTargetTypeField(
  val: CreateWebhookRequestBodyTargetTypeField,
): SerializedData {
  return val;
}
export function deserializeCreateWebhookRequestBodyTargetTypeField(
  val: SerializedData,
): CreateWebhookRequestBodyTargetTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateWebhookRequestBodyTargetTypeField",
  });
}
export function serializeCreateWebhookRequestBodyTargetField(
  val: CreateWebhookRequestBodyTargetField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeCreateWebhookRequestBodyTargetTypeField(val.type),
  };
}
export function deserializeCreateWebhookRequestBodyTargetField(
  val: SerializedData,
): CreateWebhookRequestBodyTargetField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateWebhookRequestBodyTargetField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateWebhookRequestBodyTargetField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | CreateWebhookRequestBodyTargetTypeField =
    val.type == void 0
      ? void 0
      : deserializeCreateWebhookRequestBodyTargetTypeField(val.type);
  return { id: id, type: type } satisfies CreateWebhookRequestBodyTargetField;
}
export function serializeCreateWebhookRequestBodyTriggersField(
  val: CreateWebhookRequestBodyTriggersField,
): SerializedData {
  return val;
}
export function deserializeCreateWebhookRequestBodyTriggersField(
  val: SerializedData,
): CreateWebhookRequestBodyTriggersField {
  if (val == 'FILE.UPLOADED') {
    return val;
  }
  if (val == 'FILE.PREVIEWED') {
    return val;
  }
  if (val == 'FILE.DOWNLOADED') {
    return val;
  }
  if (val == 'FILE.TRASHED') {
    return val;
  }
  if (val == 'FILE.DELETED') {
    return val;
  }
  if (val == 'FILE.RESTORED') {
    return val;
  }
  if (val == 'FILE.COPIED') {
    return val;
  }
  if (val == 'FILE.MOVED') {
    return val;
  }
  if (val == 'FILE.LOCKED') {
    return val;
  }
  if (val == 'FILE.UNLOCKED') {
    return val;
  }
  if (val == 'FILE.RENAMED') {
    return val;
  }
  if (val == 'COMMENT.CREATED') {
    return val;
  }
  if (val == 'COMMENT.UPDATED') {
    return val;
  }
  if (val == 'COMMENT.DELETED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.CREATED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.CREATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.DELETED') {
    return val;
  }
  if (val == 'FOLDER.CREATED') {
    return val;
  }
  if (val == 'FOLDER.RENAMED') {
    return val;
  }
  if (val == 'FOLDER.DOWNLOADED') {
    return val;
  }
  if (val == 'FOLDER.RESTORED') {
    return val;
  }
  if (val == 'FOLDER.DELETED') {
    return val;
  }
  if (val == 'FOLDER.COPIED') {
    return val;
  }
  if (val == 'FOLDER.MOVED') {
    return val;
  }
  if (val == 'FOLDER.TRASHED') {
    return val;
  }
  if (val == 'WEBHOOK.DELETED') {
    return val;
  }
  if (val == 'COLLABORATION.CREATED') {
    return val;
  }
  if (val == 'COLLABORATION.ACCEPTED') {
    return val;
  }
  if (val == 'COLLABORATION.REJECTED') {
    return val;
  }
  if (val == 'COLLABORATION.REMOVED') {
    return val;
  }
  if (val == 'COLLABORATION.UPDATED') {
    return val;
  }
  if (val == 'SHARED_LINK.DELETED') {
    return val;
  }
  if (val == 'SHARED_LINK.CREATED') {
    return val;
  }
  if (val == 'SHARED_LINK.UPDATED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.COMPLETED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.DECLINED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.EXPIRED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CreateWebhookRequestBodyTriggersField",
  });
}
export function serializeCreateWebhookRequestBody(
  val: CreateWebhookRequestBody,
): SerializedData {
  return {
    ['target']: serializeCreateWebhookRequestBodyTargetField(val.target),
    ['address']: val.address,
    ['triggers']: val.triggers.map(function (
      item: CreateWebhookRequestBodyTriggersField,
    ): SerializedData {
      return serializeCreateWebhookRequestBodyTriggersField(item);
    }) as readonly any[],
  };
}
export function deserializeCreateWebhookRequestBody(
  val: SerializedData,
): CreateWebhookRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateWebhookRequestBody"',
    });
  }
  if (val.target == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "target" of type "CreateWebhookRequestBody" to be defined',
    });
  }
  const target: CreateWebhookRequestBodyTargetField =
    deserializeCreateWebhookRequestBodyTargetField(val.target);
  if (val.address == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "address" of type "CreateWebhookRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.address)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "address" of type "CreateWebhookRequestBody"',
    });
  }
  const address: string = val.address;
  if (val.triggers == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "triggers" of type "CreateWebhookRequestBody" to be defined',
    });
  }
  if (!sdIsList(val.triggers)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "triggers" of type "CreateWebhookRequestBody"',
    });
  }
  const triggers: readonly CreateWebhookRequestBodyTriggersField[] = sdIsList(
    val.triggers,
  )
    ? (val.triggers.map(function (
        itm: SerializedData,
      ): CreateWebhookRequestBodyTriggersField {
        return deserializeCreateWebhookRequestBodyTriggersField(itm);
      }) as readonly any[])
    : [];
  return {
    target: target,
    address: address,
    triggers: triggers,
  } satisfies CreateWebhookRequestBody;
}
export function serializeUpdateWebhookByIdRequestBodyTargetTypeField(
  val: UpdateWebhookByIdRequestBodyTargetTypeField,
): SerializedData {
  return val;
}
export function deserializeUpdateWebhookByIdRequestBodyTargetTypeField(
  val: SerializedData,
): UpdateWebhookByIdRequestBodyTargetTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateWebhookByIdRequestBodyTargetTypeField",
  });
}
export function serializeUpdateWebhookByIdRequestBodyTargetField(
  val: UpdateWebhookByIdRequestBodyTargetField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUpdateWebhookByIdRequestBodyTargetTypeField(val.type),
  };
}
export function deserializeUpdateWebhookByIdRequestBodyTargetField(
  val: SerializedData,
): UpdateWebhookByIdRequestBodyTargetField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateWebhookByIdRequestBodyTargetField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateWebhookByIdRequestBodyTargetField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | UpdateWebhookByIdRequestBodyTargetTypeField =
    val.type == void 0
      ? void 0
      : deserializeUpdateWebhookByIdRequestBodyTargetTypeField(val.type);
  return {
    id: id,
    type: type,
  } satisfies UpdateWebhookByIdRequestBodyTargetField;
}
export function serializeUpdateWebhookByIdRequestBodyTriggersField(
  val: UpdateWebhookByIdRequestBodyTriggersField,
): SerializedData {
  return val;
}
export function deserializeUpdateWebhookByIdRequestBodyTriggersField(
  val: SerializedData,
): UpdateWebhookByIdRequestBodyTriggersField {
  if (val == 'FILE.UPLOADED') {
    return val;
  }
  if (val == 'FILE.PREVIEWED') {
    return val;
  }
  if (val == 'FILE.DOWNLOADED') {
    return val;
  }
  if (val == 'FILE.TRASHED') {
    return val;
  }
  if (val == 'FILE.DELETED') {
    return val;
  }
  if (val == 'FILE.RESTORED') {
    return val;
  }
  if (val == 'FILE.COPIED') {
    return val;
  }
  if (val == 'FILE.MOVED') {
    return val;
  }
  if (val == 'FILE.LOCKED') {
    return val;
  }
  if (val == 'FILE.UNLOCKED') {
    return val;
  }
  if (val == 'FILE.RENAMED') {
    return val;
  }
  if (val == 'COMMENT.CREATED') {
    return val;
  }
  if (val == 'COMMENT.UPDATED') {
    return val;
  }
  if (val == 'COMMENT.DELETED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.CREATED') {
    return val;
  }
  if (val == 'TASK_ASSIGNMENT.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.CREATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.UPDATED') {
    return val;
  }
  if (val == 'METADATA_INSTANCE.DELETED') {
    return val;
  }
  if (val == 'FOLDER.CREATED') {
    return val;
  }
  if (val == 'FOLDER.RENAMED') {
    return val;
  }
  if (val == 'FOLDER.DOWNLOADED') {
    return val;
  }
  if (val == 'FOLDER.RESTORED') {
    return val;
  }
  if (val == 'FOLDER.DELETED') {
    return val;
  }
  if (val == 'FOLDER.COPIED') {
    return val;
  }
  if (val == 'FOLDER.MOVED') {
    return val;
  }
  if (val == 'FOLDER.TRASHED') {
    return val;
  }
  if (val == 'WEBHOOK.DELETED') {
    return val;
  }
  if (val == 'COLLABORATION.CREATED') {
    return val;
  }
  if (val == 'COLLABORATION.ACCEPTED') {
    return val;
  }
  if (val == 'COLLABORATION.REJECTED') {
    return val;
  }
  if (val == 'COLLABORATION.REMOVED') {
    return val;
  }
  if (val == 'COLLABORATION.UPDATED') {
    return val;
  }
  if (val == 'SHARED_LINK.DELETED') {
    return val;
  }
  if (val == 'SHARED_LINK.CREATED') {
    return val;
  }
  if (val == 'SHARED_LINK.UPDATED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.COMPLETED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.DECLINED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.EXPIRED') {
    return val;
  }
  if (val == 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UpdateWebhookByIdRequestBodyTriggersField",
  });
}
export function serializeUpdateWebhookByIdRequestBody(
  val: UpdateWebhookByIdRequestBody,
): SerializedData {
  return {
    ['target']:
      val.target == void 0
        ? val.target
        : serializeUpdateWebhookByIdRequestBodyTargetField(val.target),
    ['address']: val.address,
    ['triggers']:
      val.triggers == void 0
        ? val.triggers
        : (val.triggers.map(function (
            item: UpdateWebhookByIdRequestBodyTriggersField,
          ): SerializedData {
            return serializeUpdateWebhookByIdRequestBodyTriggersField(item);
          }) as readonly any[]),
  };
}
export function deserializeUpdateWebhookByIdRequestBody(
  val: SerializedData,
): UpdateWebhookByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateWebhookByIdRequestBody"',
    });
  }
  const target: undefined | UpdateWebhookByIdRequestBodyTargetField =
    val.target == void 0
      ? void 0
      : deserializeUpdateWebhookByIdRequestBodyTargetField(val.target);
  if (!(val.address == void 0) && !sdIsString(val.address)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "address" of type "UpdateWebhookByIdRequestBody"',
    });
  }
  const address: undefined | string =
    val.address == void 0 ? void 0 : val.address;
  if (!(val.triggers == void 0) && !sdIsList(val.triggers)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "triggers" of type "UpdateWebhookByIdRequestBody"',
    });
  }
  const triggers:
    | undefined
    | readonly UpdateWebhookByIdRequestBodyTriggersField[] =
    val.triggers == void 0
      ? void 0
      : sdIsList(val.triggers)
        ? (val.triggers.map(function (
            itm: SerializedData,
          ): UpdateWebhookByIdRequestBodyTriggersField {
            return deserializeUpdateWebhookByIdRequestBodyTriggersField(itm);
          }) as readonly any[])
        : [];
  return {
    target: target,
    address: address,
    triggers: triggers,
  } satisfies UpdateWebhookByIdRequestBody;
}
