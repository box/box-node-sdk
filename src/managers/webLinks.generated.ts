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
import { SerializedData } from '../serialization/json.js';
import { sdToJson } from '../serialization/json.js';
import { DateTime } from '../internal/utils.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class CreateWebLinkOptionals {
  readonly headers: CreateWebLinkHeaders = new CreateWebLinkHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateWebLinkOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateWebLinkOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateWebLinkOptionalsInput {
  readonly headers?: CreateWebLinkHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetWebLinkByIdOptionals {
  readonly headers: GetWebLinkByIdHeaders = new GetWebLinkByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetWebLinkByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetWebLinkByIdOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetWebLinkByIdOptionalsInput {
  readonly headers?: GetWebLinkByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class UpdateWebLinkByIdOptionals {
  readonly requestBody: UpdateWebLinkByIdRequestBody =
    {} satisfies UpdateWebLinkByIdRequestBody;
  readonly headers: UpdateWebLinkByIdHeaders = new UpdateWebLinkByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateWebLinkByIdOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateWebLinkByIdOptionals,
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
export interface UpdateWebLinkByIdOptionalsInput {
  readonly requestBody?: UpdateWebLinkByIdRequestBody;
  readonly headers?: UpdateWebLinkByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteWebLinkByIdOptionals {
  readonly headers: DeleteWebLinkByIdHeaders = new DeleteWebLinkByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteWebLinkByIdOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<DeleteWebLinkByIdOptionals, 'headers' | 'cancellationToken'>
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
export interface DeleteWebLinkByIdOptionalsInput {
  readonly headers?: DeleteWebLinkByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface CreateWebLinkRequestBodyParentField {
  /**
   * The ID of parent folder. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface CreateWebLinkRequestBody {
  /**
   * The URL that this web link links to. Must start with
   * `"http://"` or `"https://"`. */
  readonly url: string;
  /**
   * The parent folder to create the web link within. */
  readonly parent: CreateWebLinkRequestBodyParentField;
  /**
   * Name of the web link. Defaults to the URL if not set. */
  readonly name?: string;
  /**
   * Description of the web link. */
  readonly description?: string;
  readonly rawData?: SerializedData;
}
export class CreateWebLinkHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateWebLinkHeaders, 'extraHeaders'> &
      Partial<Pick<CreateWebLinkHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateWebLinkHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetWebLinkByIdHeaders {
  /**
   * The URL, and optional password, for the shared link of this item.
   *
   * This header can be used to access items that have not been
   * explicitly shared with a user.
   *
   * Use the format `shared_link=[link]` or if a password is required then
   * use `shared_link=[link]&shared_link_password=[password]`.
   *
   * This header can be used on the file or folder shared, as well as on any files
   * or folders nested within the item. */
  readonly boxapi?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetWebLinkByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetWebLinkByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetWebLinkByIdHeadersInput {
  /**
   * The URL, and optional password, for the shared link of this item.
   *
   * This header can be used to access items that have not been
   * explicitly shared with a user.
   *
   * Use the format `shared_link=[link]` or if a password is required then
   * use `shared_link=[link]&shared_link_password=[password]`.
   *
   * This header can be used on the file or folder shared, as well as on any files
   * or folders nested within the item. */
  readonly boxapi?: string;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface UpdateWebLinkByIdRequestBodyParentField {
  /**
   * The ID of parent item. */
  readonly id?: string;
  /**
   * The input for `user_id` is optional. Moving to non-root folder is not allowed when `user_id` is present. Parent folder id should be zero when `user_id` is provided. */
  readonly userId?: string;
  readonly rawData?: SerializedData;
}
export type UpdateWebLinkByIdRequestBodySharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export interface UpdateWebLinkByIdRequestBodySharedLinkField {
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
  readonly access?: UpdateWebLinkByIdRequestBodySharedLinkAccessField;
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
  readonly rawData?: SerializedData;
}
export interface UpdateWebLinkByIdRequestBody {
  /**
   * The new URL that the web link links to. Must start with
   * `"http://"` or `"https://"`. */
  readonly url?: string;
  readonly parent?: UpdateWebLinkByIdRequestBodyParentField;
  /**
   * A new name for the web link. Defaults to the URL if not set. */
  readonly name?: string;
  /**
   * A new description of the web link. */
  readonly description?: string;
  /**
   * The settings for the shared link to update. */
  readonly sharedLink?: UpdateWebLinkByIdRequestBodySharedLinkField;
  readonly rawData?: SerializedData;
}
export class UpdateWebLinkByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateWebLinkByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateWebLinkByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateWebLinkByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteWebLinkByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteWebLinkByIdHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteWebLinkByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteWebLinkByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class WebLinksManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      WebLinksManager,
      | 'networkSession'
      | 'createWebLink'
      | 'getWebLinkById'
      | 'updateWebLinkById'
      | 'deleteWebLinkById'
    > &
      Partial<Pick<WebLinksManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Creates a web link object within a folder.
   * @param {CreateWebLinkRequestBody} requestBody Request body of createWebLink method
   * @param {CreateWebLinkOptionalsInput} optionalsInput
   * @returns {Promise<WebLink>}
   */
  async createWebLink(
    requestBody: CreateWebLinkRequestBody,
    optionalsInput: CreateWebLinkOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: CreateWebLinkOptionals = new CreateWebLinkOptionals({
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
            '/2.0/web_links',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateWebLinkRequestBody(requestBody),
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
     * Retrieve information about a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {GetWebLinkByIdOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async getWebLinkById(
    webLinkId: string,
    optionalsInput: GetWebLinkByIdOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: GetWebLinkByIdOptionals = new GetWebLinkByIdOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['boxapi']: toString(headers.boxapi) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/web_links/',
            toString(webLinkId) as string,
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
      ...deserializeWebLink(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates a web link object.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {UpdateWebLinkByIdOptionalsInput} optionalsInput
     * @returns {Promise<WebLink>}
     */
  async updateWebLinkById(
    webLinkId: string,
    optionalsInput: UpdateWebLinkByIdOptionalsInput = {},
  ): Promise<WebLink> {
    const optionals: UpdateWebLinkByIdOptionals =
      new UpdateWebLinkByIdOptionals({
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
            '/2.0/web_links/',
            toString(webLinkId) as string,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeUpdateWebLinkByIdRequestBody(requestBody),
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
     * Deletes a web link.
     * @param {string} webLinkId The ID of the web link.
    Example: "12345"
     * @param {DeleteWebLinkByIdOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteWebLinkById(
    webLinkId: string,
    optionalsInput: DeleteWebLinkByIdOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteWebLinkByIdOptionals =
      new DeleteWebLinkByIdOptionals({
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
export interface WebLinksManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateWebLinkRequestBodyParentField(
  val: CreateWebLinkRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeCreateWebLinkRequestBodyParentField(
  val: SerializedData,
): CreateWebLinkRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateWebLinkRequestBodyParentField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "CreateWebLinkRequestBodyParentField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CreateWebLinkRequestBodyParentField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies CreateWebLinkRequestBodyParentField;
}
export function serializeCreateWebLinkRequestBody(
  val: CreateWebLinkRequestBody,
): SerializedData {
  return {
    ['url']: val.url,
    ['parent']: serializeCreateWebLinkRequestBodyParentField(val.parent),
    ['name']: val.name,
    ['description']: val.description,
  };
}
export function deserializeCreateWebLinkRequestBody(
  val: SerializedData,
): CreateWebLinkRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateWebLinkRequestBody"',
    });
  }
  if (val.url == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "url" of type "CreateWebLinkRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "CreateWebLinkRequestBody"',
    });
  }
  const url: string = val.url;
  if (val.parent == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "parent" of type "CreateWebLinkRequestBody" to be defined',
    });
  }
  const parent: CreateWebLinkRequestBodyParentField =
    deserializeCreateWebLinkRequestBodyParentField(val.parent);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "CreateWebLinkRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "CreateWebLinkRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    url: url,
    parent: parent,
    name: name,
    description: description,
  } satisfies CreateWebLinkRequestBody;
}
export function serializeUpdateWebLinkByIdRequestBodyParentField(
  val: UpdateWebLinkByIdRequestBodyParentField,
): SerializedData {
  return { ['id']: val.id, ['user_id']: val.userId };
}
export function deserializeUpdateWebLinkByIdRequestBodyParentField(
  val: SerializedData,
): UpdateWebLinkByIdRequestBodyParentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateWebLinkByIdRequestBodyParentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UpdateWebLinkByIdRequestBodyParentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.user_id == void 0) && !sdIsString(val.user_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "user_id" of type "UpdateWebLinkByIdRequestBodyParentField"',
    });
  }
  const userId: undefined | string =
    val.user_id == void 0 ? void 0 : val.user_id;
  return {
    id: id,
    userId: userId,
  } satisfies UpdateWebLinkByIdRequestBodyParentField;
}
export function serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(
  val: UpdateWebLinkByIdRequestBodySharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(
  val: SerializedData,
): UpdateWebLinkByIdRequestBodySharedLinkAccessField {
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
      "Can't deserialize UpdateWebLinkByIdRequestBodySharedLinkAccessField",
  });
}
export function serializeUpdateWebLinkByIdRequestBodySharedLinkField(
  val: UpdateWebLinkByIdRequestBodySharedLinkField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(
            val.access,
          ),
    ['password']: val.password,
    ['vanity_name']: val.vanityName,
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
  };
}
export function deserializeUpdateWebLinkByIdRequestBodySharedLinkField(
  val: SerializedData,
): UpdateWebLinkByIdRequestBodySharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateWebLinkByIdRequestBodySharedLinkField"',
    });
  }
  const access: undefined | UpdateWebLinkByIdRequestBodySharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(
          val.access,
        );
  if (!(val.password == void 0) && !sdIsString(val.password)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "password" of type "UpdateWebLinkByIdRequestBodySharedLinkField"',
    });
  }
  const password: undefined | string =
    val.password == void 0 ? void 0 : val.password;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "UpdateWebLinkByIdRequestBodySharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "UpdateWebLinkByIdRequestBodySharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  return {
    access: access,
    password: password,
    vanityName: vanityName,
    unsharedAt: unsharedAt,
  } satisfies UpdateWebLinkByIdRequestBodySharedLinkField;
}
export function serializeUpdateWebLinkByIdRequestBody(
  val: UpdateWebLinkByIdRequestBody,
): SerializedData {
  return {
    ['url']: val.url,
    ['parent']:
      val.parent == void 0
        ? val.parent
        : serializeUpdateWebLinkByIdRequestBodyParentField(val.parent),
    ['name']: val.name,
    ['description']: val.description,
    ['shared_link']:
      val.sharedLink == void 0
        ? val.sharedLink
        : serializeUpdateWebLinkByIdRequestBodySharedLinkField(val.sharedLink),
  };
}
export function deserializeUpdateWebLinkByIdRequestBody(
  val: SerializedData,
): UpdateWebLinkByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateWebLinkByIdRequestBody"',
    });
  }
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "url" of type "UpdateWebLinkByIdRequestBody"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  const parent: undefined | UpdateWebLinkByIdRequestBodyParentField =
    val.parent == void 0
      ? void 0
      : deserializeUpdateWebLinkByIdRequestBodyParentField(val.parent);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "UpdateWebLinkByIdRequestBody"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateWebLinkByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const sharedLink: undefined | UpdateWebLinkByIdRequestBodySharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeUpdateWebLinkByIdRequestBodySharedLinkField(val.shared_link);
  return {
    url: url,
    parent: parent,
    name: name,
    description: description,
    sharedLink: sharedLink,
  } satisfies UpdateWebLinkByIdRequestBody;
}
