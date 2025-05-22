import { serializeShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { deserializeShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { serializeShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { deserializeShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { serializeShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
import { deserializeShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { ShieldInformationBarrierReports } from '../schemas/shieldInformationBarrierReports.generated.js';
import { ClientError } from '../schemas/clientError.generated.js';
import { ShieldInformationBarrierReport } from '../schemas/shieldInformationBarrierReport.generated.js';
import { ShieldInformationBarrierReference } from '../schemas/shieldInformationBarrierReference.generated.js';
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
export class GetShieldInformationBarrierReportsOptionals {
  readonly headers: GetShieldInformationBarrierReportsHeaders =
    new GetShieldInformationBarrierReportsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierReportsOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierReportsOptionals,
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
export interface GetShieldInformationBarrierReportsOptionalsInput {
  readonly headers?: GetShieldInformationBarrierReportsHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class CreateShieldInformationBarrierReportOptionals {
  readonly headers: CreateShieldInformationBarrierReportHeaders =
    new CreateShieldInformationBarrierReportHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateShieldInformationBarrierReportOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateShieldInformationBarrierReportOptionals,
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
export interface CreateShieldInformationBarrierReportOptionalsInput {
  readonly headers?: CreateShieldInformationBarrierReportHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export class GetShieldInformationBarrierReportByIdOptionals {
  readonly headers: GetShieldInformationBarrierReportByIdHeaders =
    new GetShieldInformationBarrierReportByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetShieldInformationBarrierReportByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetShieldInformationBarrierReportByIdOptionals,
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
export interface GetShieldInformationBarrierReportByIdOptionalsInput {
  readonly headers?: GetShieldInformationBarrierReportByIdHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface GetShieldInformationBarrierReportsQueryParams {
  /**
   * The ID of the shield information barrier. */
  readonly shieldInformationBarrierId: string;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetShieldInformationBarrierReportsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetShieldInformationBarrierReportsHeaders, 'extraHeaders'> &
      Partial<Pick<GetShieldInformationBarrierReportsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierReportsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class CreateShieldInformationBarrierReportHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateShieldInformationBarrierReportHeaders, 'extraHeaders'> &
      Partial<
        Pick<CreateShieldInformationBarrierReportHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateShieldInformationBarrierReportHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class GetShieldInformationBarrierReportByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetShieldInformationBarrierReportByIdHeaders, 'extraHeaders'> &
      Partial<
        Pick<GetShieldInformationBarrierReportByIdHeaders, 'extraHeaders'>
      >,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetShieldInformationBarrierReportByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class ShieldInformationBarrierReportsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ShieldInformationBarrierReportsManager,
      | 'networkSession'
      | 'getShieldInformationBarrierReports'
      | 'createShieldInformationBarrierReport'
      | 'getShieldInformationBarrierReportById'
    > &
      Partial<Pick<ShieldInformationBarrierReportsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Lists shield information barrier reports.
   * @param {GetShieldInformationBarrierReportsQueryParams} queryParams Query parameters of getShieldInformationBarrierReports method
   * @param {GetShieldInformationBarrierReportsOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierReports>}
   */
  async getShieldInformationBarrierReports(
    queryParams: GetShieldInformationBarrierReportsQueryParams,
    optionalsInput: GetShieldInformationBarrierReportsOptionalsInput = {},
  ): Promise<ShieldInformationBarrierReports> {
    const optionals: GetShieldInformationBarrierReportsOptionals =
      new GetShieldInformationBarrierReportsOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['shield_information_barrier_id']: toString(
        queryParams.shieldInformationBarrierId,
      ) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/shield_information_barrier_reports',
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
      ...deserializeShieldInformationBarrierReports(response.data!),
      rawData: response.data!,
    };
  }
  /**
   * Creates a shield information barrier report for a given barrier.
   * @param {ShieldInformationBarrierReference} requestBody Request body of createShieldInformationBarrierReport method
   * @param {CreateShieldInformationBarrierReportOptionalsInput} optionalsInput
   * @returns {Promise<ShieldInformationBarrierReport>}
   */
  async createShieldInformationBarrierReport(
    requestBody: ShieldInformationBarrierReference,
    optionalsInput: CreateShieldInformationBarrierReportOptionalsInput = {},
  ): Promise<ShieldInformationBarrierReport> {
    const optionals: CreateShieldInformationBarrierReportOptionals =
      new CreateShieldInformationBarrierReportOptionals({
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
            '/2.0/shield_information_barrier_reports',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeShieldInformationBarrierReference(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeShieldInformationBarrierReport(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a shield information barrier report by its ID.
     * @param {string} shieldInformationBarrierReportId The ID of the shield information barrier Report.
    Example: "3423"
     * @param {GetShieldInformationBarrierReportByIdOptionalsInput} optionalsInput
     * @returns {Promise<ShieldInformationBarrierReport>}
     */
  async getShieldInformationBarrierReportById(
    shieldInformationBarrierReportId: string,
    optionalsInput: GetShieldInformationBarrierReportByIdOptionalsInput = {},
  ): Promise<ShieldInformationBarrierReport> {
    const optionals: GetShieldInformationBarrierReportByIdOptionals =
      new GetShieldInformationBarrierReportByIdOptionals({
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
            '/2.0/shield_information_barrier_reports/',
            toString(shieldInformationBarrierReportId) as string,
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
      ...deserializeShieldInformationBarrierReport(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ShieldInformationBarrierReportsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
