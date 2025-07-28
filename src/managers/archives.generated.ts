import { serializeArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { deserializeArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { serializeArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
import { deserializeArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ArchivesV2025R0 } from '../schemas/v2025R0/archivesV2025R0.generated.js';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0.generated.js';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0.generated.js';
import { ArchiveV2025R0 } from '../schemas/v2025R0/archiveV2025R0.generated.js';
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
export class CreateArchiveV2025R0Optionals {
  readonly headers: CreateArchiveV2025R0Headers =
    new CreateArchiveV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateArchiveV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateArchiveV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface CreateArchiveV2025R0OptionalsInput {
  readonly headers?: CreateArchiveV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class DeleteArchiveByIdV2025R0Optionals {
  readonly headers: DeleteArchiveByIdV2025R0Headers =
    new DeleteArchiveByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteArchiveByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteArchiveByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface DeleteArchiveByIdV2025R0OptionalsInput {
  readonly headers?: DeleteArchiveByIdV2025R0Headers;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetArchivesV2025R0QueryParams {
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination. */
  readonly marker?: string;
}
export class GetArchivesV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetArchivesV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<GetArchivesV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetArchivesV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export interface CreateArchiveV2025R0RequestBody {
  /**
   * The name of the archive. */
  readonly name: string;
  readonly rawData?: SerializedData;
}
export class CreateArchiveV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateArchiveV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<CreateArchiveV2025R0Headers, 'boxVersion' | 'extraHeaders'>>,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateArchiveV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class DeleteArchiveByIdV2025R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2025R0 =
    '2025.0' as BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      DeleteArchiveByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<DeleteArchiveByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
      >,
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteArchiveByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ArchivesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ArchivesManager,
      | 'networkSession'
      | 'getArchivesV2025R0'
      | 'createArchiveV2025R0'
      | 'deleteArchiveByIdV2025R0'
    > &
      Partial<Pick<ArchivesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves archives for an enterprise.
   * @param {GetArchivesV2025R0QueryParams} queryParams Query parameters of getArchivesV2025R0 method
   * @param {GetArchivesV2025R0HeadersInput} headersInput Headers of getArchivesV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<ArchivesV2025R0>}
   */
  async getArchivesV2025R0(
    queryParams: GetArchivesV2025R0QueryParams = {} satisfies GetArchivesV2025R0QueryParams,
    headersInput: GetArchivesV2025R0HeadersInput = new GetArchivesV2025R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<ArchivesV2025R0> {
    const headers: GetArchivesV2025R0Headers = new GetArchivesV2025R0Headers({
      boxVersion: headersInput.boxVersion,
      extraHeaders: headersInput.extraHeaders,
    });
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['limit']: toString(queryParams.limit) as string,
      ['marker']: toString(queryParams.marker) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/archives',
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
      ...deserializeArchivesV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates an archive.
   * @param {CreateArchiveV2025R0RequestBody} requestBody Request body of createArchiveV2025R0 method
   * @param {CreateArchiveV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<ArchiveV2025R0>}
   */
  async createArchiveV2025R0(
    requestBody: CreateArchiveV2025R0RequestBody,
    optionalsInput: CreateArchiveV2025R0OptionalsInput = {},
  ): Promise<ArchiveV2025R0> {
    const optionals: CreateArchiveV2025R0Optionals =
      new CreateArchiveV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/archives',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateArchiveV2025R0RequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeArchiveV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Permanently deletes an archive.
     * @param {string} archiveId The ID of the archive.
    Example: "982312"
     * @param {DeleteArchiveByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteArchiveByIdV2025R0(
    archiveId: string,
    optionalsInput: DeleteArchiveByIdV2025R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteArchiveByIdV2025R0Optionals =
      new DeleteArchiveByIdV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ...{ ['box-version']: toString(headers.boxVersion) as string },
      ...headers.extraHeaders,
    });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/archives/',
            toString(archiveId) as string,
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
export interface ArchivesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateArchiveV2025R0RequestBody(
  val: CreateArchiveV2025R0RequestBody,
): SerializedData {
  return { ['name']: val.name };
}
export function deserializeCreateArchiveV2025R0RequestBody(
  val: SerializedData,
): CreateArchiveV2025R0RequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateArchiveV2025R0RequestBody"',
    });
  }
  if (val.name == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "name" of type "CreateArchiveV2025R0RequestBody" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "CreateArchiveV2025R0RequestBody"',
    });
  }
  const name: string = val.name;
  return { name: name } satisfies CreateArchiveV2025R0RequestBody;
}
