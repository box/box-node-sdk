import { serializeZipDownload } from '../schemas/zipDownload.generated.js';
import { deserializeZipDownload } from '../schemas/zipDownload.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { deserializeZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { serializeZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
import { deserializeZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ZipDownload } from '../schemas/zipDownload.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { ZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
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
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class CreateZipDownloadOptionals {
  readonly headers: CreateZipDownloadHeaders = new CreateZipDownloadHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateZipDownloadOptionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<CreateZipDownloadOptionals, 'headers' | 'cancellationToken'>
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
export interface CreateZipDownloadOptionalsInput {
  readonly headers?: CreateZipDownloadHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetZipDownloadContentOptionals {
  readonly headers: GetZipDownloadContentHeaders =
    new GetZipDownloadContentHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetZipDownloadContentOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetZipDownloadContentOptionals, 'headers' | 'cancellationToken'>
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
export interface GetZipDownloadContentOptionalsInput {
  readonly headers?: GetZipDownloadContentHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetZipDownloadStatusOptionals {
  readonly headers: GetZipDownloadStatusHeaders =
    new GetZipDownloadStatusHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetZipDownloadStatusOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetZipDownloadStatusOptionals, 'headers' | 'cancellationToken'>
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
export interface GetZipDownloadStatusOptionalsInput {
  readonly headers?: GetZipDownloadStatusHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DownloadZipOptionals {
  readonly headers: DownloadZipHeaders = new DownloadZipHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DownloadZipOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<DownloadZipOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DownloadZipOptionalsInput {
  readonly headers?: DownloadZipHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateZipDownloadHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateZipDownloadHeaders, 'extraHeaders'> &
      Partial<Pick<CreateZipDownloadHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateZipDownloadHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetZipDownloadContentHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetZipDownloadContentHeaders, 'extraHeaders'> &
      Partial<Pick<GetZipDownloadContentHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetZipDownloadContentHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetZipDownloadStatusHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetZipDownloadStatusHeaders, 'extraHeaders'> &
      Partial<Pick<GetZipDownloadStatusHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetZipDownloadStatusHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DownloadZipHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DownloadZipHeaders, 'extraHeaders'> &
      Partial<Pick<DownloadZipHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DownloadZipHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ZipDownloadsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ZipDownloadsManager,
      | 'networkSession'
      | 'createZipDownload'
      | 'getZipDownloadContent'
      | 'getZipDownloadStatus'
      | 'downloadZip'
    > &
      Partial<Pick<ZipDownloadsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Creates a request to download multiple files and folders as a single `zip`
   * archive file. This API does not return the archive but instead performs all
   * the checks to ensure that the user has access to all the items, and then
   * returns a `download_url` and a `status_url` that can be used to download the
   * archive.
   *
   * The limit for an archive is either the Account's upload limit or
   * 10,000 files, whichever is met first.
   *
   * **Note**: Downloading a large file can be
   * affected by various
   * factors such as distance, network latency,
   * bandwidth, and congestion, as well as packet loss
   * ratio and current server load.
   * For these reasons we recommend that a maximum ZIP archive
   * total size does not exceed 25GB.
   * @param {ZipDownloadRequest} requestBody Request body of createZipDownload method
   * @param {CreateZipDownloadOptionalsInput} optionalsInput
   * @returns {Promise<ZipDownload>}
   */
  async createZipDownload(
    requestBody: ZipDownloadRequest,
    optionalsInput: CreateZipDownloadOptionalsInput = {},
  ): Promise<ZipDownload> {
    const optionals: CreateZipDownloadOptionals =
      new CreateZipDownloadOptionals({
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
            '/2.0/zip_downloads',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeZipDownloadRequest(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeZipDownload(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Returns the contents of a `zip` archive in binary format. This URL does not
     * require any form of authentication and could be used in a user's browser to
     * download the archive to a user's device.
     *
     * By default, this URL is only valid for a few seconds from the creation of
     * the request for this archive. Once a download has started it can not be
     * stopped and resumed, instead a new request for a zip archive would need to
     * be created.
     *
     * The URL of this endpoint should not be considered as fixed. Instead, use
     * the [Create zip download](e://post_zip_downloads) API to request to create a
     * `zip` archive, and then follow the `download_url` field in the response to
     * this endpoint.
     * @param {string} downloadUrl The URL that can be used to download created `zip` archive.
     Example: `https://dl.boxcloud.com/2.0/zip_downloads/29l00nfxDyHOt7RphI9zT_w==nDnZEDjY2S8iEWWCHEEiptFxwoWojjlibZjJ6geuE5xnXENDTPxzgbks_yY=/content`
     * @param {GetZipDownloadContentOptionalsInput} optionalsInput
     * @returns {Promise<ByteStream>}
     */
  async getZipDownloadContent(
    downloadUrl: string,
    optionalsInput: GetZipDownloadContentOptionalsInput = {},
  ): Promise<ByteStream> {
    const optionals: GetZipDownloadContentOptionals =
      new GetZipDownloadContentOptionals({
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
          url: downloadUrl,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'binary' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return response.content!;
  }
  /**
     * Returns the download status of a `zip` archive, allowing an application to
     * inspect the progress of the download as well as the number of items that
     * might have been skipped.
     *
     * This endpoint can only be accessed once the download has started.
     * Subsequently this endpoint is valid for 12 hours from the start of the
     * download.
     *
     * The URL of this endpoint should not be considered as fixed. Instead, use
     * the [Create zip download](e://post_zip_downloads) API to request to create a
     * `zip` archive, and then follow the `status_url` field in the response to
     * this endpoint.
     * @param {string} statusUrl The URL that can be used to get the status of the `zip` archive being downloaded.
     Example: `https://dl.boxcloud.com/2.0/zip_downloads/29l00nfxDyHOt7RphI9zT_w==nDnZEDjY2S8iEWWCHEEiptFxwoWojjlibZjJ6geuE5xnXENDTPxzgbks_yY=/status`
     * @param {GetZipDownloadStatusOptionalsInput} optionalsInput
     * @returns {Promise<ZipDownloadStatus>}
     */
  async getZipDownloadStatus(
    statusUrl: string,
    optionalsInput: GetZipDownloadStatusOptionalsInput = {},
  ): Promise<ZipDownloadStatus> {
    const optionals: GetZipDownloadStatusOptionals =
      new GetZipDownloadStatusOptionals({
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
          url: statusUrl,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeZipDownloadStatus(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a zip and downloads its content
   * @param {ZipDownloadRequest} requestBody Zip download request body
   * @param {DownloadZipOptionalsInput} optionalsInput
   * @returns {Promise<ByteStream>}
   */
  async downloadZip(
    requestBody: ZipDownloadRequest,
    optionalsInput: DownloadZipOptionalsInput = {},
  ): Promise<ByteStream> {
    const optionals: DownloadZipOptionals = new DownloadZipOptionals({
      headers: optionalsInput.headers,
      cancellationToken: optionalsInput.cancellationToken,
    });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const zipDownloadSession: ZipDownload = await this.createZipDownload(
      {
        items: requestBody.items,
        downloadFileName: requestBody.downloadFileName,
      } satisfies ZipDownloadRequest,
      {
        headers: new CreateZipDownloadHeaders({
          extraHeaders: headers.extraHeaders,
        }),
        cancellationToken: cancellationToken,
      } satisfies CreateZipDownloadOptionalsInput,
    );
    return await this.getZipDownloadContent(zipDownloadSession.downloadUrl!, {
      headers: new GetZipDownloadContentHeaders({
        extraHeaders: headers.extraHeaders,
      }),
      cancellationToken: cancellationToken,
    } satisfies GetZipDownloadContentOptionalsInput);
  }
}
export interface ZipDownloadsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
