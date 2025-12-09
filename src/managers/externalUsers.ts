import { serializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { deserializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { serializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { deserializeClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { serializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { deserializeBoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { serializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
import { deserializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { ExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { ClientErrorV2025R0 } from '../schemas/v2025R0/clientErrorV2025R0';
import { BoxVersionHeaderV2025R0 } from '../parameters/v2025R0/boxVersionHeaderV2025R0';
import { ExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
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
export class SubmitJobToDeleteExternalUsersV2025R0Optionals {
  readonly headers: SubmitJobToDeleteExternalUsersV2025R0Headers =
    new SubmitJobToDeleteExternalUsersV2025R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      SubmitJobToDeleteExternalUsersV2025R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          SubmitJobToDeleteExternalUsersV2025R0Optionals,
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
export interface SubmitJobToDeleteExternalUsersV2025R0OptionalsInput {
  readonly headers?: SubmitJobToDeleteExternalUsersV2025R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class SubmitJobToDeleteExternalUsersV2025R0Headers {
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
      SubmitJobToDeleteExternalUsersV2025R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<
          SubmitJobToDeleteExternalUsersV2025R0Headers,
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
export interface SubmitJobToDeleteExternalUsersV2025R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2025R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class ExternalUsersManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      ExternalUsersManager,
      'networkSession' | 'submitJobToDeleteExternalUsersV2025R0'
    > &
      Partial<Pick<ExternalUsersManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Delete external users from current user enterprise. This will remove each
   * external user from all invited collaborations within the current enterprise.
   * @param {ExternalUsersSubmitDeleteJobRequestV2025R0} requestBody Request body of submitJobToDeleteExternalUsersV2025R0 method
   * @param {SubmitJobToDeleteExternalUsersV2025R0OptionalsInput} optionalsInput
   * @returns {Promise<ExternalUsersSubmitDeleteJobResponseV2025R0>}
   */
  async submitJobToDeleteExternalUsersV2025R0(
    requestBody: ExternalUsersSubmitDeleteJobRequestV2025R0,
    optionalsInput: SubmitJobToDeleteExternalUsersV2025R0OptionalsInput = {},
  ): Promise<ExternalUsersSubmitDeleteJobResponseV2025R0> {
    const optionals: SubmitJobToDeleteExternalUsersV2025R0Optionals =
      new SubmitJobToDeleteExternalUsersV2025R0Optionals({
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
            '/2.0/external_users/submit_delete_job',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeExternalUsersSubmitDeleteJobRequestV2025R0(
            requestBody,
          ),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeExternalUsersSubmitDeleteJobResponseV2025R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface ExternalUsersManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
