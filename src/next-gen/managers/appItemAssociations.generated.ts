import { serializeAppItemAssociations } from '../schemas/appItemAssociations.generated.js';
import { deserializeAppItemAssociations } from '../schemas/appItemAssociations.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { AppItemAssociations } from '../schemas/appItemAssociations.generated.js';
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
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetFileAppItemAssociationsOptionals {
  readonly queryParams: GetFileAppItemAssociationsQueryParams =
    {} satisfies GetFileAppItemAssociationsQueryParams;
  readonly headers: GetFileAppItemAssociationsHeaders =
    new GetFileAppItemAssociationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFileAppItemAssociationsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFileAppItemAssociationsOptionals,
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
export interface GetFileAppItemAssociationsOptionalsInput {
  readonly queryParams?: GetFileAppItemAssociationsQueryParams;
  readonly headers?: GetFileAppItemAssociationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetFolderAppItemAssociationsOptionals {
  readonly queryParams: GetFolderAppItemAssociationsQueryParams =
    {} satisfies GetFolderAppItemAssociationsQueryParams;
  readonly headers: GetFolderAppItemAssociationsHeaders =
    new GetFolderAppItemAssociationsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetFolderAppItemAssociationsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetFolderAppItemAssociationsOptionals,
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
export interface GetFolderAppItemAssociationsOptionalsInput {
  readonly queryParams?: GetFolderAppItemAssociationsQueryParams;
  readonly headers?: GetFolderAppItemAssociationsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetFileAppItemAssociationsQueryParams {
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * If given, only return app items for this application type */
  readonly applicationType?: string;
}
export class GetFileAppItemAssociationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFileAppItemAssociationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFileAppItemAssociationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFileAppItemAssociationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface GetFolderAppItemAssociationsQueryParams {
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * If given, returns only app items for this application type */
  readonly applicationType?: string;
}
export class GetFolderAppItemAssociationsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetFolderAppItemAssociationsHeaders, 'extraHeaders'> &
      Partial<Pick<GetFolderAppItemAssociationsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetFolderAppItemAssociationsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class AppItemAssociationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      AppItemAssociationsManager,
      | 'networkSession'
      | 'getFileAppItemAssociations'
      | 'getFolderAppItemAssociations'
    > &
      Partial<Pick<AppItemAssociationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * **This is a beta feature, which means that its availability might be limited.**
     * Returns all app items the file is associated with. This includes app items
     * associated with ancestors of the file. Assuming the context user has access
     * to the file, the type/ids are revealed even if the context user does not
     * have **View** permission on the app item.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetFileAppItemAssociationsOptionalsInput} optionalsInput
     * @returns {Promise<AppItemAssociations>}
     */
  async getFileAppItemAssociations(
    fileId: string,
    optionalsInput: GetFileAppItemAssociationsOptionalsInput = {},
  ): Promise<AppItemAssociations> {
    const optionals: GetFileAppItemAssociationsOptionals =
      new GetFileAppItemAssociationsOptionals({
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
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['application_type']: toString(queryParams.applicationType) as string,
    });
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
            '/app_item_associations',
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
      ...deserializeAppItemAssociations(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * **This is a beta feature, which means that its availability might be limited.**
     * Returns all app items the folder is associated with. This includes app items
     * associated with ancestors of the folder. Assuming the context user has access
     * to the folder, the type/ids are revealed even if the context user does not
     * have **View** permission on the app item.
     * @param {string} folderId The unique identifier that represent a folder.
    
    The ID for any folder can be determined
    by visiting this folder in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/folder/123`
    the `folder_id` is `123`.
    
    The root folder of a Box account is
    always represented by the ID `0`.
    Example: "12345"
     * @param {GetFolderAppItemAssociationsOptionalsInput} optionalsInput
     * @returns {Promise<AppItemAssociations>}
     */
  async getFolderAppItemAssociations(
    folderId: string,
    optionalsInput: GetFolderAppItemAssociationsOptionalsInput = {},
  ): Promise<AppItemAssociations> {
    const optionals: GetFolderAppItemAssociationsOptionals =
      new GetFolderAppItemAssociationsOptionals({
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
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['application_type']: toString(queryParams.applicationType) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/folders/',
            toString(folderId) as string,
            '/app_item_associations',
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
      ...deserializeAppItemAssociations(response.data!),
      rawData: response.data!,
    };
  }
}
export interface AppItemAssociationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
