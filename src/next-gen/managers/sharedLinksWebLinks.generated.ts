import { serializeWebLink } from '../schemas/webLink.generated.js';
import { deserializeWebLink } from '../schemas/webLink.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { WebLink } from '../schemas/webLink.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
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
export class FindWebLinkForSharedLinkOptionals {
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<FindWebLinkForSharedLinkOptionals, 'cancellationToken'> &
      Partial<Pick<FindWebLinkForSharedLinkOptionals, 'cancellationToken'>>,
  ) {
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface FindWebLinkForSharedLinkOptionalsInput {
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetSharedLinkForWebLinkOptionals {
  readonly headers: GetSharedLinkForWebLinkHeaders =
    new GetSharedLinkForWebLinkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetSharedLinkForWebLinkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetSharedLinkForWebLinkOptionals, 'headers' | 'cancellationToken'>
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
export interface GetSharedLinkForWebLinkOptionalsInput {
  readonly headers?: GetSharedLinkForWebLinkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class AddShareLinkToWebLinkOptionals {
  readonly headers: AddShareLinkToWebLinkHeaders =
    new AddShareLinkToWebLinkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      AddShareLinkToWebLinkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<AddShareLinkToWebLinkOptionals, 'headers' | 'cancellationToken'>
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
export interface AddShareLinkToWebLinkOptionalsInput {
  readonly headers?: AddShareLinkToWebLinkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateSharedLinkOnWebLinkOptionals {
  readonly headers: UpdateSharedLinkOnWebLinkHeaders =
    new UpdateSharedLinkOnWebLinkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateSharedLinkOnWebLinkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateSharedLinkOnWebLinkOptionals,
          'headers' | 'cancellationToken'
        >
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
export interface UpdateSharedLinkOnWebLinkOptionalsInput {
  readonly headers?: UpdateSharedLinkOnWebLinkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class RemoveSharedLinkFromWebLinkOptionals {
  readonly headers: RemoveSharedLinkFromWebLinkHeaders =
    new RemoveSharedLinkFromWebLinkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      RemoveSharedLinkFromWebLinkOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          RemoveSharedLinkFromWebLinkOptionals,
          'headers' | 'cancellationToken'
        >
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
export interface RemoveSharedLinkFromWebLinkOptionalsInput {
  readonly headers?: RemoveSharedLinkFromWebLinkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface FindWebLinkForSharedLinkQueryParams {
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
export class FindWebLinkForSharedLinkHeaders {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * A header containing the shared link and optional password for the
   * shared link.
   *
   * The format for this header is as follows.
   *
   * `shared_link=[link]&shared_link_password=[password]` */
  readonly boxapi!: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<FindWebLinkForSharedLinkHeaders, 'extraHeaders'> &
      Partial<Pick<FindWebLinkForSharedLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.ifNoneMatch !== undefined) {
      this.ifNoneMatch = fields.ifNoneMatch;
    }
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface FindWebLinkForSharedLinkHeadersInput {
  /**
   * Ensures an item is only returned if it has changed.
   *
   * Pass in the item's last observed `etag` value
   * into this header and the endpoint will fail
   * with a `304 Not Modified` if the item has not
   * changed since. */
  readonly ifNoneMatch?: string;
  /**
   * A header containing the shared link and optional password for the
   * shared link.
   *
   * The format for this header is as follows.
   *
   * `shared_link=[link]&shared_link_password=[password]` */
  readonly boxapi: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetSharedLinkForWebLinkQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class GetSharedLinkForWebLinkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetSharedLinkForWebLinkHeaders, 'extraHeaders'> &
      Partial<Pick<GetSharedLinkForWebLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetSharedLinkForWebLinkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type AddShareLinkToWebLinkRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  /**
   * If the shared link allows for previewing of files.
   * This value is always `true`. For shared links on folders
   * this also applies to any items in the folder. */
  readonly canPreview?: boolean;
  /**
   * This value can only be `true` is `type` is `file`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToWebLinkRequestBodySharedLinkField {
  /**
   * The level of access for the shared link. This can be
   * restricted to anyone with the link (`open`), only people
   * within the company (`company`) and only those who
   * have been invited to the file (`collaborators`).
   *
   * If not set, this field defaults to the access level specified
   * by the enterprise admin. To create a shared link with this
   * default setting pass the `shared_link` object with
   * no `access` field, for example `{ "shared_link": {} }`.
   *
   * The `company` access level is only available to paid
   * accounts. */
  readonly access?: AddShareLinkToWebLinkRequestBodySharedLinkAccessField;
  /**
   * The password required to access the shared link. Set the
   * password to `null` to remove it.
   * Passwords must now be at least eight characters
   * long and include a number, upper case letter, or
   * a non-numeric or non-alphabetic character.
   * A password can only be set when `access` is set to `open`. */
  readonly password?: string | null;
  /**
   * Defines a custom vanity name to use in the shared link URL,
   * for example `https://app.box.com/v/my-shared-link`.
   *
   * Custom URLs should not be used when sharing sensitive content
   * as vanity URLs are a lot easier to guess than regular shared
   * links. */
  readonly vanityName?: string;
  /**
   * The timestamp at which this shared link will
   * expire. This field can only be set by
   * users with paid accounts. The value must be greater than the
   * current date and time. */
  readonly unsharedAt?: DateTime;
  readonly permissions?: AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToWebLinkRequestBody {
  /**
   * The settings for the shared link to create on the web link.
   *
   * Use an empty object (`{}`) to use the default settings for shared
   * links. */
  readonly sharedLink?: AddShareLinkToWebLinkRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface AddShareLinkToWebLinkQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class AddShareLinkToWebLinkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddShareLinkToWebLinkHeaders, 'extraHeaders'> &
      Partial<Pick<AddShareLinkToWebLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddShareLinkToWebLinkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export type UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField {
  /**
   * If the shared link allows for downloading of files.
   * This can only be set when `access` is set to
   * `open` or `company`. */
  readonly canDownload?: boolean;
  /**
   * If the shared link allows for previewing of files.
   * This value is always `true`. For shared links on folders
   * this also applies to any items in the folder. */
  readonly canPreview?: boolean;
  /**
   * This value can only be `true` is `type` is `file`. */
  readonly canEdit?: boolean;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnWebLinkRequestBodySharedLinkField {
  /**
   * The level of access for the shared link. This can be
   * restricted to anyone with the link (`open`), only people
   * within the company (`company`) and only those who
   * have been invited to the folder (`collaborators`).
   *
   * If not set, this field defaults to the access level specified
   * by the enterprise admin. To create a shared link with this
   * default setting pass the `shared_link` object with
   * no `access` field, for example `{ "shared_link": {} }`.
   *
   * The `company` access level is only available to paid
   * accounts. */
  readonly access?: UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField;
  /**
   * The password required to access the shared link. Set the
   * password to `null` to remove it.
   * Passwords must now be at least eight characters
   * long and include a number, upper case letter, or
   * a non-numeric or non-alphabetic character.
   * A password can only be set when `access` is set to `open`. */
  readonly password?: string | null;
  /**
   * Defines a custom vanity name to use in the shared link URL,
   * for example `https://app.box.com/v/my-shared-link`.
   *
   * Custom URLs should not be used when sharing sensitive content
   * as vanity URLs are a lot easier to guess than regular shared
   * links. */
  readonly vanityName?: string;
  /**
   * The timestamp at which this shared link will
   * expire. This field can only be set by
   * users with paid accounts. The value must be greater than the
   * current date and time. */
  readonly unsharedAt?: DateTime;
  readonly permissions?: UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnWebLinkRequestBody {
  /**
   * The settings for the shared link to update. */
  readonly sharedLink?: UpdateSharedLinkOnWebLinkRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export interface UpdateSharedLinkOnWebLinkQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class UpdateSharedLinkOnWebLinkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateSharedLinkOnWebLinkHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateSharedLinkOnWebLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateSharedLinkOnWebLinkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface RemoveSharedLinkFromWebLinkRequestBodySharedLinkField {
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromWebLinkRequestBody {
  /**
   * By setting this value to `null`, the shared link
   * is removed from the web link. */
  readonly sharedLink?: RemoveSharedLinkFromWebLinkRequestBodySharedLinkField | null;
  readonly rawData?: SerializedData;
}
export interface RemoveSharedLinkFromWebLinkQueryParams {
  /**
   * Explicitly request the `shared_link` fields
   * to be returned for this item. */
  readonly fields: string;
}
export class RemoveSharedLinkFromWebLinkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<RemoveSharedLinkFromWebLinkHeaders, 'extraHeaders'> &
      Partial<Pick<RemoveSharedLinkFromWebLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface RemoveSharedLinkFromWebLinkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class SharedLinksWebLinksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      SharedLinksWebLinksManager,
      | 'networkSession'
      | 'findWebLinkForSharedLink'
      | 'getSharedLinkForWebLink'
      | 'addShareLinkToWebLink'
      | 'updateSharedLinkOnWebLink'
      | 'removeSharedLinkFromWebLink'
    > &
      Partial<Pick<SharedLinksWebLinksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Returns the web link represented by a shared link.
   *
   * A shared web link can be represented by a shared link,
   * which can originate within the current enterprise or within another.
   *
   * This endpoint allows an application to retrieve information about a
   * shared web link when only given a shared link.
   * @param {FindWebLinkForSharedLinkQueryParams} queryParams Query parameters of findWebLinkForSharedLink method
   * @param {FindWebLinkForSharedLinkHeadersInput} headersInput Headers of findWebLinkForSharedLink method
   * @param {FindWebLinkForSharedLinkOptionalsInput} optionalsInput
   * @returns {Promise<WebLink>}
   */
  async findWebLinkForSharedLink(
    queryParams: FindWebLinkForSharedLinkQueryParams = {} satisfies FindWebLinkForSharedLinkQueryParams,
    headersInput: FindWebLinkForSharedLinkHeadersInput,
    optionalsInput: FindWebLinkForSharedLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const headers: FindWebLinkForSharedLinkHeaders =
      new FindWebLinkForSharedLinkHeaders({
        ifNoneMatch: headersInput.ifNoneMatch,
        boxapi: headersInput.boxapi,
        extraHeaders: headersInput.extraHeaders,
      });
    const optionals: FindWebLinkForSharedLinkOptionals =
      new FindWebLinkForSharedLinkOptionals({
        cancellationToken: optionalsInput.cancellationToken,
      });
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
    } = prepareParams({
      ...{
        ['if-none-match']: toString(headers.ifNoneMatch) as string,
        ['boxapi']: toString(headers.boxapi) as string,
      },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/shared_items#web_links',
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
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Gets the information for a shared link on a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {GetSharedLinkForWebLinkQueryParams} queryParams Query parameters of getSharedLinkForWebLink method
     * @param {GetSharedLinkForWebLinkOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async getSharedLinkForWebLink(
    webLinkId: string,
    queryParams: GetSharedLinkForWebLinkQueryParams,
    optionalsInput: GetSharedLinkForWebLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: GetSharedLinkForWebLinkOptionals =
      new GetSharedLinkForWebLinkOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#get_shared_link',
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
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Adds a shared link to a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {AddShareLinkToWebLinkRequestBody} requestBody Request body of addShareLinkToWebLink method
     * @param {AddShareLinkToWebLinkQueryParams} queryParams Query parameters of addShareLinkToWebLink method
     * @param {AddShareLinkToWebLinkOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async addShareLinkToWebLink(
    webLinkId: string,
    requestBody: AddShareLinkToWebLinkRequestBody = {} satisfies AddShareLinkToWebLinkRequestBody,
    queryParams: AddShareLinkToWebLinkQueryParams,
    optionalsInput: AddShareLinkToWebLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: AddShareLinkToWebLinkOptionals =
      new AddShareLinkToWebLinkOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#add_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeAddShareLinkToWebLinkRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a shared link on a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {UpdateSharedLinkOnWebLinkRequestBody} requestBody Request body of updateSharedLinkOnWebLink method
     * @param {UpdateSharedLinkOnWebLinkQueryParams} queryParams Query parameters of updateSharedLinkOnWebLink method
     * @param {UpdateSharedLinkOnWebLinkOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async updateSharedLinkOnWebLink(
    webLinkId: string,
    requestBody: UpdateSharedLinkOnWebLinkRequestBody = {} satisfies UpdateSharedLinkOnWebLinkRequestBody,
    queryParams: UpdateSharedLinkOnWebLinkQueryParams,
    optionalsInput: UpdateSharedLinkOnWebLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: UpdateSharedLinkOnWebLinkOptionals =
      new UpdateSharedLinkOnWebLinkOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#update_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeUpdateSharedLinkOnWebLinkRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes a shared link from a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {RemoveSharedLinkFromWebLinkRequestBody} requestBody Request body of removeSharedLinkFromWebLink method
     * @param {RemoveSharedLinkFromWebLinkQueryParams} queryParams Query parameters of removeSharedLinkFromWebLink method
     * @param {RemoveSharedLinkFromWebLinkOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async removeSharedLinkFromWebLink(
    webLinkId: string,
    requestBody: RemoveSharedLinkFromWebLinkRequestBody = {} satisfies RemoveSharedLinkFromWebLinkRequestBody,
    queryParams: RemoveSharedLinkFromWebLinkQueryParams,
    optionalsInput: RemoveSharedLinkFromWebLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: RemoveSharedLinkFromWebLinkOptionals =
      new RemoveSharedLinkFromWebLinkOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({ ['fields']: toString(queryParams.fields) as string });
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
            '#remove_shared_link',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeRemoveSharedLinkFromWebLinkRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
}
export interface SharedLinksWebLinksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(
  val: AddShareLinkToWebLinkRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(
  val: SerializedData,
): AddShareLinkToWebLinkRequestBodySharedLinkAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize AddShareLinkToWebLinkRequestBodySharedLinkAccessField",
  });
}
export function serializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(
  val: AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField;
}
export function serializeAddShareLinkToWebLinkRequestBodySharedLinkField(
  val: AddShareLinkToWebLinkRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(
            val.access,
          ),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeAddShareLinkToWebLinkRequestBodySharedLinkField(
  val: SerializedData,
): AddShareLinkToWebLinkRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AddShareLinkToWebLinkRequestBodySharedLinkField"',
    });
  }
  const access:
    | undefined
    | AddShareLinkToWebLinkRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "AddShareLinkToWebLinkRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "AddShareLinkToWebLinkRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "AddShareLinkToWebLinkRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | AddShareLinkToWebLinkRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies AddShareLinkToWebLinkRequestBodySharedLinkField;
}
export function serializeAddShareLinkToWebLinkRequestBody(
  val: AddShareLinkToWebLinkRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeAddShareLinkToWebLinkRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeAddShareLinkToWebLinkRequestBody(
  val: SerializedData,
): AddShareLinkToWebLinkRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddShareLinkToWebLinkRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | AddShareLinkToWebLinkRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeAddShareLinkToWebLinkRequestBodySharedLinkField(
          val.shared_link,
        );
  return { sharedLink: sharedLink } satisfies AddShareLinkToWebLinkRequestBody;
}
export function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(
  val: UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(
  val: UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(
  val: SerializedData,
): UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  if (!(val.can_download == void 0) && !sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canDownload: undefined | boolean =
    val.can_download == void 0 ? void 0 : val.can_download;
  if (!(val.can_preview == void 0) && !sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canPreview: undefined | boolean =
    val.can_preview == void 0 ? void 0 : val.can_preview;
  if (!(val.can_edit == void 0) && !sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField"',
    });
  }
  const canEdit: undefined | boolean =
    val.can_edit == void 0 ? void 0 : val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField;
}
export function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(
  val: UpdateSharedLinkOnWebLinkRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(
            val.access,
          ),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(
            val.permissions,
          ),
  };
}
export function deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(
  val: SerializedData,
): UpdateSharedLinkOnWebLinkRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateSharedLinkOnWebLinkRequestBodySharedLinkField"',
    });
  }
  const access:
    | undefined
    | UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateSharedLinkOnWebLinkRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  const permissions:
    | undefined
    | UpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(
          val.permissions,
        );
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
    permissions: permissions,
  } satisfies UpdateSharedLinkOnWebLinkRequestBodySharedLinkField;
}
export function serializeUpdateSharedLinkOnWebLinkRequestBody(
  val: UpdateSharedLinkOnWebLinkRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeUpdateSharedLinkOnWebLinkRequestBody(
  val: SerializedData,
): UpdateSharedLinkOnWebLinkRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateSharedLinkOnWebLinkRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | UpdateSharedLinkOnWebLinkRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(
          val.shared_link,
        );
  return {
    sharedLink: sharedLink,
  } satisfies UpdateSharedLinkOnWebLinkRequestBody;
}
export function serializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(
  val: RemoveSharedLinkFromWebLinkRequestBodySharedLinkField,
): SerializedData {
  return {};
}
export function deserializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(
  val: SerializedData,
): RemoveSharedLinkFromWebLinkRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "RemoveSharedLinkFromWebLinkRequestBodySharedLinkField"',
    });
  }
  return {} satisfies RemoveSharedLinkFromWebLinkRequestBodySharedLinkField;
}
export function serializeRemoveSharedLinkFromWebLinkRequestBody(
  val: RemoveSharedLinkFromWebLinkRequestBody,
): SerializedData {
  return {
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(
            val.sharedLink,
          ),
  };
}
export function deserializeRemoveSharedLinkFromWebLinkRequestBody(
  val: SerializedData,
): RemoveSharedLinkFromWebLinkRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RemoveSharedLinkFromWebLinkRequestBody"',
    });
  }
  const sharedLink:
    | undefined
    | RemoveSharedLinkFromWebLinkRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(
          val.shared_link,
        );
  return {
    sharedLink: sharedLink,
  } satisfies RemoveSharedLinkFromWebLinkRequestBody;
}
