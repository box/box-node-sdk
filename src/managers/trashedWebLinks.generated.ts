import { serializeTrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { deserializeTrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeTrashWebLink } from '../schemas/trashWebLink.generated.js';
import { deserializeTrashWebLink } from '../schemas/trashWebLink.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { TrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { TrashWebLink } from '../schemas/trashWebLink.generated.js';
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
export class RestoreWeblinkFromTrashOptionals {
  readonly requestBody: RestoreWeblinkFromTrashRequestBody =
    {} satisfies RestoreWeblinkFromTrashRequestBody;
  readonly queryParams: RestoreWeblinkFromTrashQueryParams =
    {} satisfies RestoreWeblinkFromTrashQueryParams;
  readonly headers: RestoreWeblinkFromTrashHeaders =
    new RestoreWeblinkFromTrashHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RestoreWeblinkFromTrashOptionals,
      'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          RestoreWeblinkFromTrashOptionals,
          'requestBody' | 'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface RestoreWeblinkFromTrashOptionalsInput {
  readonly requestBody?: RestoreWeblinkFromTrashRequestBody;
  readonly queryParams?: RestoreWeblinkFromTrashQueryParams;
  readonly headers?: RestoreWeblinkFromTrashHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetTrashedWebLinkByIdOptionals {
  readonly queryParams: GetTrashedWebLinkByIdQueryParams =
    {} satisfies GetTrashedWebLinkByIdQueryParams;
  readonly headers: GetTrashedWebLinkByIdHeaders =
    new GetTrashedWebLinkByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetTrashedWebLinkByIdOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetTrashedWebLinkByIdOptionals,
          'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetTrashedWebLinkByIdOptionalsInput {
  readonly queryParams?: GetTrashedWebLinkByIdQueryParams;
  readonly headers?: GetTrashedWebLinkByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteTrashedWebLinkByIdOptionals {
  readonly headers: DeleteTrashedWebLinkByIdHeaders =
    new DeleteTrashedWebLinkByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteTrashedWebLinkByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteTrashedWebLinkByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteTrashedWebLinkByIdOptionalsInput {
  readonly headers?: DeleteTrashedWebLinkByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface RestoreWeblinkFromTrashRequestBodyParentField {
  /**
   * The ID of parent item. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface RestoreWeblinkFromTrashRequestBody {
  /**
   * An optional new name for the web link. */
  readonly name?: string;
  readonly parent?: RestoreWeblinkFromTrashRequestBodyParentField;
  readonly rawData?: SerializedData;
}
export interface RestoreWeblinkFromTrashQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class RestoreWeblinkFromTrashHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RestoreWeblinkFromTrashHeaders, 'extraHeaders'> &
      Partial<Pick<RestoreWeblinkFromTrashHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RestoreWeblinkFromTrashHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetTrashedWebLinkByIdQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
}
export class GetTrashedWebLinkByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetTrashedWebLinkByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetTrashedWebLinkByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetTrashedWebLinkByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteTrashedWebLinkByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteTrashedWebLinkByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteTrashedWebLinkByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteTrashedWebLinkByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TrashedWebLinksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      TrashedWebLinksManager,
      | 'networkSession'
      | 'restoreWeblinkFromTrash'
      | 'getTrashedWebLinkById'
      | 'deleteTrashedWebLinkById'
    > &
      Partial<Pick<TrashedWebLinksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Restores a web link that has been moved to the trash.
     *
     * An optional new parent ID can be provided to restore the  web link to in case
     * the original folder has been deleted.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {RestoreWeblinkFromTrashOptionalsInput} optionalsInput
     * @returns {Promise<TrashWebLinkRestored>}
     */
  async restoreWeblinkFromTrash(
    webLinkId: string,
    optionalsInput: RestoreWeblinkFromTrashOptionalsInput = {},
  ): Promise<TrashWebLinkRestored> {
    const optionals: RestoreWeblinkFromTrashOptionals =
      new RestoreWeblinkFromTrashOptionals({
        requestBody: optionalsInput.requestBody,
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/web_links/',
            toString(webLinkId) as string,
          ) as string,
          method: 'POST',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRestoreWeblinkFromTrashRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeTrashWebLinkRestored(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a web link that has been moved to the trash.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {GetTrashedWebLinkByIdOptionalsInput} optionalsInput
     * @returns {Promise<TrashWebLink>}
     */
  async getTrashedWebLinkById(
    webLinkId: string,
    optionalsInput: GetTrashedWebLinkByIdOptionalsInput = {},
  ): Promise<TrashWebLink> {
    const optionals: GetTrashedWebLinkByIdOptionals =
      new GetTrashedWebLinkByIdOptionals({
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/web_links/',
            toString(webLinkId) as string,
            '/trash',
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
      ...deserializeTrashWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes a web link that is in the trash.
     * This action cannot be undone.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {DeleteTrashedWebLinkByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteTrashedWebLinkById(
    webLinkId: string,
    optionalsInput: DeleteTrashedWebLinkByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteTrashedWebLinkByIdOptionals =
      new DeleteTrashedWebLinkByIdOptionals({
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
            '/2.0/web_links/',
            toString(webLinkId) as string,
            '/trash',
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
export interface TrashedWebLinksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeRestoreWeblinkFromTrashRequestBodyParentField(
  val: RestoreWeblinkFromTrashRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeRestoreWeblinkFromTrashRequestBodyParentField(
  val: SerializedData,
): RestoreWeblinkFromTrashRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RestoreWeblinkFromTrashRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "RestoreWeblinkFromTrashRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { id: id } satisfies RestoreWeblinkFromTrashRequestBodyParentField;
}
export function serializeRestoreWeblinkFromTrashRequestBody(
  val: RestoreWeblinkFromTrashRequestBody,
): SerializedData {
  return {
    ['name']: val.name,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeRestoreWeblinkFromTrashRequestBodyParentField(val.parent),
  };
}
export function deserializeRestoreWeblinkFromTrashRequestBody(
  val: SerializedData,
): RestoreWeblinkFromTrashRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RestoreWeblinkFromTrashRequestBody"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "RestoreWeblinkFromTrashRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const parent: undefined | RestoreWeblinkFromTrashRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeRestoreWeblinkFromTrashRequestBodyParentField(val.parent);
  return {
    name: name,
    parent: parent,
  } satisfies RestoreWeblinkFromTrashRequestBody;
}
