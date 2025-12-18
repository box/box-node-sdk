import { serializeShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0';
import { deserializeShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { serializeShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0';
import { deserializeShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { serializeShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0';
import { deserializeShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0';
import { serializeShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0';
import { deserializeShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { ShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { ShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { ShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0';
import { ShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0';
import { BoxSdkError } from '../box/errors';
import { Authentication } from '../networking/auth';
import { NetworkSession } from '../networking/network';
import { FetchOptions } from '../networking/fetchOptions';
import { FetchResponse } from '../networking/fetchResponse';
import { prepareParams } from '../internal/utils';
import { toString } from '../internal/utils';
import { ByteStream } from '../internal/utils';
import { CancellationToken } from '../internal/utils';
import { sdToJson } from '../serialization/json';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class CreateShieldListV2025R0Optionals {
  readonly headers: CreateShieldListV2025R0Headers =
    new CreateShieldListV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldListV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateShieldListV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface CreateShieldListV2025R0OptionalsInput {
  readonly headers?: CreateShieldListV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class GetShieldListByIdV2025R0Optionals {
  readonly headers: GetShieldListByIdV2025R0Headers =
    new GetShieldListByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldListByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetShieldListByIdV2025R0Optionals, 'headers' | 'cancellationToken'>
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
export interface GetShieldListByIdV2025R0OptionalsInput {
  readonly headers?: GetShieldListByIdV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteShieldListByIdV2025R0Optionals {
  readonly headers: DeleteShieldListByIdV2025R0Headers =
    new DeleteShieldListByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteShieldListByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteShieldListByIdV2025R0Optionals,
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
export interface DeleteShieldListByIdV2025R0OptionalsInput {
  readonly headers?: DeleteShieldListByIdV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class UpdateShieldListByIdV2025R0Optionals {
  readonly headers: UpdateShieldListByIdV2025R0Headers =
    new UpdateShieldListByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateShieldListByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateShieldListByIdV2025R0Optionals,
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
export interface UpdateShieldListByIdV2025R0OptionalsInput {
  readonly headers?: UpdateShieldListByIdV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class GetShieldListsV2025R0Headers {
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
    fields: Omit<GetShieldListsV2025R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<
        Pick<GetShieldListsV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetShieldListsV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class CreateShieldListV2025R0Headers {
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
      CreateShieldListV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateShieldListV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface CreateShieldListV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetShieldListByIdV2025R0Headers {
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
      GetShieldListByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<GetShieldListByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface GetShieldListByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteShieldListByIdV2025R0Headers {
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
      DeleteShieldListByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<DeleteShieldListByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface DeleteShieldListByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class UpdateShieldListByIdV2025R0Headers {
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
      UpdateShieldListByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<UpdateShieldListByIdV2025R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface UpdateShieldListByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class ShieldListsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldListsManager,
      | 'networkSession'
      | 'getShieldListsV2025R0'
      | 'createShieldListV2025R0'
      | 'getShieldListByIdV2025R0'
      | 'deleteShieldListByIdV2025R0'
      | 'updateShieldListByIdV2025R0'
    > &
      Partial<Pick<ShieldListsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Retrieves all shield lists in the enterprise.
   * @param {GetShieldListsV2025R0HeadersInput} headersInput Headers of getShieldListsV2025R0 method
   * @param {CancellationToken} cancellationToken Token used for request cancellation.
   * @returns {Promise<ShieldListsV2025R0>}
   */
  async getShieldListsV2025R0(
    headersInput: GetShieldListsV2025R0HeadersInput = new GetShieldListsV2025R0Headers(
      {},
    ),
    cancellationToken?: CancellationToken,
  ): Promise<ShieldListsV2025R0> {
    const headers: GetShieldListsV2025R0Headers =
      new GetShieldListsV2025R0Headers({
        boxVersion: headersInput.boxVersion,
        extraHeaders: headersInput.extraHeaders,
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
            '/2.0/shield_lists',
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
      ...deserializeShieldListsV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a shield list.
   * @param {ShieldListsCreateV2025R0} requestBody Request body of createShieldListV2025R0 method
   * @param {CreateShieldListV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<ShieldListV2025R0>}
   */
  async createShieldListV2025R0(
    requestBody: ShieldListsCreateV2025R0,
    optionalsInput: CreateShieldListV2025R0OptionalsInput = {},
  ): Promise<ShieldListV2025R0> {
    const optionals: CreateShieldListV2025R0Optionals =
      new CreateShieldListV2025R0Optionals({
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
            '/2.0/shield_lists',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeShieldListsCreateV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeShieldListV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a single shield list by its ID.
     * @param {string} shieldListId The unique identifier that represents a shield list.
    The ID for any Shield List can be determined by the response from the endpoint
    fetching all shield lists for the enterprise.
    Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
     * @param {GetShieldListByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<ShieldListV2025R0>}
     */
  async getShieldListByIdV2025R0(
    shieldListId: string,
    optionalsInput: GetShieldListByIdV2025R0OptionalsInput = {},
  ): Promise<ShieldListV2025R0> {
    const optionals: GetShieldListByIdV2025R0Optionals =
      new GetShieldListByIdV2025R0Optionals({
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
            '/2.0/shield_lists/',
            (toString(shieldListId) as string)!,
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
      ...deserializeShieldListV2025R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete a single shield list by its ID.
     * @param {string} shieldListId The unique identifier that represents a shield list.
    The ID for any Shield List can be determined by the response from the endpoint
    fetching all shield lists for the enterprise.
    Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
     * @param {DeleteShieldListByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteShieldListByIdV2025R0(
    shieldListId: string,
    optionalsInput: DeleteShieldListByIdV2025R0OptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteShieldListByIdV2025R0Optionals =
      new DeleteShieldListByIdV2025R0Optionals({
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
            '/2.0/shield_lists/',
            (toString(shieldListId) as string)!,
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
     * Updates a shield list.
     * @param {string} shieldListId The unique identifier that represents a shield list.
    The ID for any Shield List can be determined by the response from the endpoint
    fetching all shield lists for the enterprise.
    Example: "90fb0e17-c332-40ed-b4f9-fa8908fbbb24 "
     * @param {ShieldListsUpdateV2025R0} requestBody Request body of updateShieldListByIdV2025R0 method
     * @param {UpdateShieldListByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<ShieldListV2025R0>}
     */
  async updateShieldListByIdV2025R0(
    shieldListId: string,
    requestBody: ShieldListsUpdateV2025R0,
    optionalsInput: UpdateShieldListByIdV2025R0OptionalsInput = {},
  ): Promise<ShieldListV2025R0> {
    const optionals: UpdateShieldListByIdV2025R0Optionals =
      new UpdateShieldListByIdV2025R0Optionals({
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
            '/2.0/shield_lists/',
            (toString(shieldListId) as string)!,
          ) as string,
          method: 'PUT',
          headers: headersMap,
          data: serializeShieldListsUpdateV2025R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeShieldListV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldListsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
