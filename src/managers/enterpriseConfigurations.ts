import { serializeEnterpriseConfigurationV2025R0 } from '../schemas/v2025R0/enterpriseConfigurationV2025R0';
import { deserializeEnterpriseConfigurationV2025R0 } from '../schemas/v2025R0/enterpriseConfigurationV2025R0';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { EnterpriseConfigurationV2025R0 } from '../schemas/v2025R0/enterpriseConfigurationV2025R0';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
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
export class GetEnterpriseConfigurationByIdV2025R0Optionals {
  readonly headers: GetEnterpriseConfigurationByIdV2025R0Headers =
    new GetEnterpriseConfigurationByIdV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetEnterpriseConfigurationByIdV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetEnterpriseConfigurationByIdV2025R0Optionals,
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
export interface GetEnterpriseConfigurationByIdV2025R0OptionalsInput {
  readonly headers?: GetEnterpriseConfigurationByIdV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export interface GetEnterpriseConfigurationByIdV2025R0QueryParams {
  /**
   * A comma-separated list of the enterprise configuration categories.
   * Allowed values: `security`, `content_and_sharing`, `user_settings`, `shield`. */
  readonly categories: readonly string[];
}
export class GetEnterpriseConfigurationByIdV2025R0Headers {
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
      GetEnterpriseConfigurationByIdV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          GetEnterpriseConfigurationByIdV2025R0Headers,
          'boxVersion' | 'extraHeaders'
        >
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
export interface GetEnterpriseConfigurationByIdV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class EnterpriseConfigurationsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      EnterpriseConfigurationsManager,
      'networkSession' | 'getEnterpriseConfigurationByIdV2025R0'
    > &
      Partial<Pick<EnterpriseConfigurationsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves the configuration for an enterprise.
     * @param {string} enterpriseId The ID of the enterprise.
    Example: "3442311"
     * @param {GetEnterpriseConfigurationByIdV2025R0QueryParams} queryParams Query parameters of getEnterpriseConfigurationByIdV2025R0 method
     * @param {GetEnterpriseConfigurationByIdV2025R0OptionalsInput} optionalsInput
     * @returns {Promise<EnterpriseConfigurationV2025R0>}
     */
  async getEnterpriseConfigurationByIdV2025R0(
    enterpriseId: string,
    queryParams: GetEnterpriseConfigurationByIdV2025R0QueryParams,
    optionalsInput: GetEnterpriseConfigurationByIdV2025R0OptionalsInput = {},
  ): Promise<EnterpriseConfigurationV2025R0> {
    const optionals: GetEnterpriseConfigurationByIdV2025R0Optionals =
      new GetEnterpriseConfigurationByIdV2025R0Optionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['categories']: queryParams.categories
        ? queryParams.categories.map(toString).join(',')
        : undefined,
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
            '/2.0/enterprise_configurations/',
            (toString(enterpriseId) as string)!,
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
      ...deserializeEnterpriseConfigurationV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface EnterpriseConfigurationsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
