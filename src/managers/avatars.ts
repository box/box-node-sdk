import { serializeClientError } from '../schemas/clientError';
import { deserializeClientError } from '../schemas/clientError';
import { serializeUserAvatar } from '../schemas/userAvatar';
import { deserializeUserAvatar } from '../schemas/userAvatar';
import { ResponseFormat } from '../networking/fetchOptions';
import { ClientError } from '../schemas/clientError';
import { UserAvatar } from '../schemas/userAvatar';
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
import { MultipartItem } from '../networking/fetchOptions';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class GetUserAvatarOptionals {
  readonly headers: GetUserAvatarHeaders = new GetUserAvatarHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<GetUserAvatarOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<GetUserAvatarOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetUserAvatarOptionalsInput {
  readonly headers?: GetUserAvatarHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class CreateUserAvatarOptionals {
  readonly headers: CreateUserAvatarHeaders = new CreateUserAvatarHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<CreateUserAvatarOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<CreateUserAvatarOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateUserAvatarOptionalsInput {
  readonly headers?: CreateUserAvatarHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteUserAvatarOptionals {
  readonly headers: DeleteUserAvatarHeaders = new DeleteUserAvatarHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<DeleteUserAvatarOptionals, 'headers' | 'cancellationToken'> &
      Partial<Pick<DeleteUserAvatarOptionals, 'headers' | 'cancellationToken'>>,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteUserAvatarOptionalsInput {
  readonly headers?: DeleteUserAvatarHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetUserAvatarHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetUserAvatarHeaders, 'extraHeaders'> &
      Partial<Pick<GetUserAvatarHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetUserAvatarHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface CreateUserAvatarRequestBody {
  /**
   * The image file to be uploaded to Box.
   * Accepted file extensions are `.jpg` or `.png`.
   * The maximum file size is 1MB. */
  readonly pic: ByteStream;
  readonly picFileName?: string;
  readonly picContentType?: string;
}
export class CreateUserAvatarHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateUserAvatarHeaders, 'extraHeaders'> &
      Partial<Pick<CreateUserAvatarHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateUserAvatarHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteUserAvatarHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteUserAvatarHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteUserAvatarHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteUserAvatarHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class AvatarsManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      AvatarsManager,
      | 'networkSession'
      | 'getUserAvatar'
      | 'createUserAvatar'
      | 'deleteUserAvatar'
    > &
      Partial<Pick<AvatarsManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Retrieves an image of a the user's avatar.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {GetUserAvatarOptionalsInput} optionalsInput
     * @returns {Promise<ByteStream>}
     */
  async getUserAvatar(
    userId: string,
    optionalsInput: GetUserAvatarOptionalsInput = {},
  ): Promise<ByteStream> {
    const optionals: GetUserAvatarOptionals = new GetUserAvatarOptionals({
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
            '/2.0/users/',
            (toString(userId) as string)!,
            '/avatar',
          ) as string,
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
     * Adds or updates a user avatar.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {CreateUserAvatarRequestBody} requestBody Request body of createUserAvatar method
     * @param {CreateUserAvatarOptionalsInput} optionalsInput
     * @returns {Promise<UserAvatar>}
     */
  async createUserAvatar(
    userId: string,
    requestBody: CreateUserAvatarRequestBody,
    optionalsInput: CreateUserAvatarOptionalsInput = {},
  ): Promise<UserAvatar> {
    const optionals: CreateUserAvatarOptionals = new CreateUserAvatarOptionals({
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
            '/2.0/users/',
            (toString(userId) as string)!,
            '/avatar',
          ) as string,
          method: 'POST',
          headers: headersMap,
          multipartData: [
            {
              partName: 'pic',
              fileStream: requestBody.pic,
              fileName: requestBody.picFileName,
              contentType: requestBody.picContentType,
            } satisfies MultipartItem,
          ],
          contentType: 'multipart/form-data',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeUserAvatar(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Removes an existing user avatar.
     * You cannot reverse this operation.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {DeleteUserAvatarOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteUserAvatar(
    userId: string,
    optionalsInput: DeleteUserAvatarOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteUserAvatarOptionals = new DeleteUserAvatarOptionals({
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
            '/2.0/users/',
            (toString(userId) as string)!,
            '/avatar',
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
export interface AvatarsManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
