import { serializeQueryResultsV2026R0 } from '../schemas/v2026R0/queryResultsV2026R0';
import { deserializeQueryResultsV2026R0 } from '../schemas/v2026R0/queryResultsV2026R0';
import { serializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { deserializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { serializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { deserializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { serializeQueryRequestBodyV2026R0 } from '../schemas/v2026R0/queryRequestBodyV2026R0';
import { deserializeQueryRequestBodyV2026R0 } from '../schemas/v2026R0/queryRequestBodyV2026R0';
import { serializeQueryInsightsV2026R0 } from '../schemas/v2026R0/queryInsightsV2026R0';
import { deserializeQueryInsightsV2026R0 } from '../schemas/v2026R0/queryInsightsV2026R0';
import { serializeQueryInsightsRequestBodyV2026R0 } from '../schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { deserializeQueryInsightsRequestBodyV2026R0 } from '../schemas/v2026R0/queryInsightsRequestBodyV2026R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { QueryResultsV2026R0 } from '../schemas/v2026R0/queryResultsV2026R0';
import { ClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { BoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { QueryRequestBodyV2026R0 } from '../schemas/v2026R0/queryRequestBodyV2026R0';
import { QueryInsightsV2026R0 } from '../schemas/v2026R0/queryInsightsV2026R0';
import { QueryInsightsRequestBodyV2026R0 } from '../schemas/v2026R0/queryInsightsRequestBodyV2026R0';
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
export class CreateQueryV2026R0Optionals {
  readonly headers: CreateQueryV2026R0Headers = new CreateQueryV2026R0Headers(
    {}
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateQueryV2026R0Optionals, 'headers' | 'cancellationToken'> &
      Partial<
        Pick<CreateQueryV2026R0Optionals, 'headers' | 'cancellationToken'>
      >
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateQueryV2026R0OptionalsInput {
  readonly headers?: CreateQueryV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class CreateQueryInsightV2026R0Optionals {
  readonly headers: CreateQueryInsightV2026R0Headers =
    new CreateQueryInsightV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateQueryInsightV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateQueryInsightV2026R0Optionals,
          'headers' | 'cancellationToken'
        >
      >
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateQueryInsightV2026R0OptionalsInput {
  readonly headers?: CreateQueryInsightV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class CreateQueryV2026R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2026R0 =
    '2026.0' as BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateQueryV2026R0Headers, 'boxVersion' | 'extraHeaders'> &
      Partial<Pick<CreateQueryV2026R0Headers, 'boxVersion' | 'extraHeaders'>>
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateQueryV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class CreateQueryInsightV2026R0Headers {
  /**
   * Version header. */
  readonly boxVersion: BoxVersionHeaderV2026R0 =
    '2026.0' as BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<
      CreateQueryInsightV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateQueryInsightV2026R0Headers, 'boxVersion' | 'extraHeaders'>
      >
  ) {
    if (fields.boxVersion !== undefined) {
      this.boxVersion = fields.boxVersion;
    }
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateQueryInsightV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class QueryManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      QueryManager,
      'networkSession' | 'createQueryV2026R0' | 'createQueryInsightV2026R0'
    > &
      Partial<Pick<QueryManager, 'networkSession'>>
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Runs a query to discover Box items using a logical predicate that can filter
   * across item fields and metadata templates. Results can be sorted, paginated,
   * and shaped to include additional item or metadata fields.
   * @param {QueryRequestBodyV2026R0} requestBody Request body of createQueryV2026R0 method
   * @param {CreateQueryV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<QueryResultsV2026R0>}
   */
  async createQueryV2026R0(
    requestBody: QueryRequestBodyV2026R0,
    optionalsInput: CreateQueryV2026R0OptionalsInput = {}
  ): Promise<QueryResultsV2026R0> {
    const optionals: CreateQueryV2026R0Optionals =
      new CreateQueryV2026R0Optionals({
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
            '/2.0/query'
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeQueryRequestBodyV2026R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        })
      );
    return {
      ...deserializeQueryResultsV2026R0(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Computes aggregated metrics over Box items matching a query predicate.
   * Filters are applied first, followed by optional grouping, after which the
   * requested metrics (such as `sum`, `avg`, `min`, `max`, and `count`) are
   * computed for each resulting group or over the entire filtered dataset.
   * @param {QueryInsightsRequestBodyV2026R0} requestBody Request body of createQueryInsightV2026R0 method
   * @param {CreateQueryInsightV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<QueryInsightsV2026R0>}
   */
  async createQueryInsightV2026R0(
    requestBody: QueryInsightsRequestBodyV2026R0,
    optionalsInput: CreateQueryInsightV2026R0OptionalsInput = {}
  ): Promise<QueryInsightsV2026R0> {
    const optionals: CreateQueryInsightV2026R0Optionals =
      new CreateQueryInsightV2026R0Optionals({
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
            '/2.0/query_insights'
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeQueryInsightsRequestBodyV2026R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        })
      );
    return {
      ...deserializeQueryInsightsV2026R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface QueryManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
