import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
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
import { isBrowser } from '../internal/utils.js';
import { CancellationController } from '../internal/utils.js';
import { createCancellationController } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class GetDownloadFileUrlOptionals {
  readonly queryParams: GetDownloadFileUrlQueryParams =
    {} satisfies GetDownloadFileUrlQueryParams;
  readonly headers: GetDownloadFileUrlHeaders = new GetDownloadFileUrlHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetDownloadFileUrlOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetDownloadFileUrlOptionals,
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
export interface GetDownloadFileUrlOptionalsInput {
  readonly queryParams?: GetDownloadFileUrlQueryParams;
  readonly headers?: GetDownloadFileUrlHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DownloadFileOptionals {
  readonly queryParams: DownloadFileQueryParams =
    {} satisfies DownloadFileQueryParams;
  readonly headers: DownloadFileHeaders = new DownloadFileHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DownloadFileOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DownloadFileOptionals,
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
export interface DownloadFileOptionalsInput {
  readonly queryParams?: DownloadFileQueryParams;
  readonly headers?: DownloadFileHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetDownloadFileUrlQueryParams {
  /**
   * The file version to download. */
  readonly version?: string;
  /**
   * An optional access token that can be used to pre-authenticate this request, which means that a download link can be shared with a browser or a third party service without them needing to know how to handle the authentication.
   * When using this parameter, please make sure that the access token is sufficiently scoped down to only allow read access to that file and no other files or folders. */
  readonly accessToken?: string;
}
export class GetDownloadFileUrlHeaders {
  /**
   * The byte range of the content to download.
   *
   * The format `bytes={start_byte}-{end_byte}` can be used to specify
   * what section of the file to download. */
  readonly range?: string;
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
    fields: Omit<GetDownloadFileUrlHeaders, 'extraHeaders'> &
      Partial<Pick<GetDownloadFileUrlHeaders, 'extraHeaders'>>,
  ) {
    if (fields.range !== undefined) {
      this.range = fields.range;
    }
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetDownloadFileUrlHeadersInput {
  /**
   * The byte range of the content to download.
   *
   * The format `bytes={start_byte}-{end_byte}` can be used to specify
   * what section of the file to download. */
  readonly range?: string;
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
export interface DownloadFileQueryParams {
  /**
   * The file version to download. */
  readonly version?: string;
  /**
   * An optional access token that can be used to pre-authenticate this request, which means that a download link can be shared with a browser or a third party service without them needing to know how to handle the authentication.
   * When using this parameter, please make sure that the access token is sufficiently scoped down to only allow read access to that file and no other files or folders. */
  readonly accessToken?: string;
}
export class DownloadFileHeaders {
  /**
   * The byte range of the content to download.
   *
   * The format `bytes={start_byte}-{end_byte}` can be used to specify
   * what section of the file to download. */
  readonly range?: string;
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
    fields: Omit<DownloadFileHeaders, 'extraHeaders'> &
      Partial<Pick<DownloadFileHeaders, 'extraHeaders'>>,
  ) {
    if (fields.range !== undefined) {
      this.range = fields.range;
    }
    if (fields.boxapi !== undefined) {
      this.boxapi = fields.boxapi;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DownloadFileHeadersInput {
  /**
   * The byte range of the content to download.
   *
   * The format `bytes={start_byte}-{end_byte}` can be used to specify
   * what section of the file to download. */
  readonly range?: string;
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
export class DownloadsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      DownloadsManager,
      'networkSession' | 'getDownloadFileUrl' | 'downloadFile'
    > &
      Partial<Pick<DownloadsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Returns the contents of a file in binary format.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {GetDownloadFileUrlOptionalsInput} optionalsInput
     * @returns {Promise<string>}
     */
  async getDownloadFileUrl(
    fileId: string,
    optionalsInput: GetDownloadFileUrlOptionalsInput = {},
  ): Promise<string> {
    const optionals: GetDownloadFileUrlOptionals =
      new GetDownloadFileUrlOptionals({
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
      ['version']: toString(queryParams.version) as string,
      ['access_token']: toString(queryParams.accessToken) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{
        ['range']: toString(headers.range) as string,
        ['boxapi']: toString(headers.boxapi) as string,
      },
      ...headers.extraHeaders,
    });
    const cancellationController: CancellationController =
      createCancellationController();
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/content',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken:
            cancellationToken == void 0
              ? cancellationController.signal
              : cancellationToken,
          followRedirects: false,
        }),
      );
    if (isBrowser()) {
      cancellationController.abort();
      if (response.url == void 0) {
        throw new BoxSdkError({ message: 'Unable to get response URL' });
      }
      return response.url;
    }
    if ('location' in response.headers) {
      return response.headers.location!;
    }
    if ('Location' in response.headers) {
      return response.headers.Location!;
    }
    throw new BoxSdkError({ message: 'No location header in response' });
  }
  /**
     * Returns the contents of a file in binary format.
     * @param {string} fileId The unique identifier that represents a file.
    
    The ID for any file can be determined
    by visiting a file in the web application
    and copying the ID from the URL. For example,
    for the URL `https://*.app.box.com/files/123`
    the `file_id` is `123`.
    Example: "12345"
     * @param {DownloadFileOptionalsInput} optionalsInput
     * @returns {Promise<undefined | ByteStream>}
     */
  async downloadFile(
    fileId: string,
    optionalsInput: DownloadFileOptionalsInput = {},
  ): Promise<undefined | ByteStream> {
    const optionals: DownloadFileOptionals = new DownloadFileOptionals({
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
      ['version']: toString(queryParams.version) as string,
      ['access_token']: toString(queryParams.accessToken) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{
        ['range']: toString(headers.range) as string,
        ['boxapi']: toString(headers.boxapi) as string,
      },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/files/',
            toString(fileId) as string,
            '/content',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'binary' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    if ((toString(response.status) as string) == '202') {
      return void 0;
    }
    return response.content;
  }
}
export interface DownloadsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
