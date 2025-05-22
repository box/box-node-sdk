import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeClientError } from '../schemas/clientError.generated.js';
import { deserializeClientError } from '../schemas/clientError.generated.js';
import { ResponseFormat } from '../networking/fetchOptions.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
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
export class TransferOwnedFolderOptionals {
  readonly queryParams: TransferOwnedFolderQueryParams =
    {} satisfies TransferOwnedFolderQueryParams;
  readonly headers: TransferOwnedFolderHeaders = new TransferOwnedFolderHeaders(
    {},
  );
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      TransferOwnedFolderOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          TransferOwnedFolderOptionals,
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
export interface TransferOwnedFolderOptionalsInput {
  readonly queryParams?: TransferOwnedFolderQueryParams;
  readonly headers?: TransferOwnedFolderHeaders;
  readonly cancellationToken?: undefined | CancellationToken;
}
export interface TransferOwnedFolderRequestBodyOwnedByField {
  /**
   * The ID of the user who the folder will be
   * transferred to */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface TransferOwnedFolderRequestBody {
  /**
   * The user who the folder will be transferred to */
  readonly ownedBy: TransferOwnedFolderRequestBodyOwnedByField;
  readonly rawData?: SerializedData;
}
export interface TransferOwnedFolderQueryParams {
  /**
   * A comma-separated list of attributes to include in the
   * response. This can be used to request fields that are
   * not normally returned in a standard response.
   *
   * Be aware that specifying this parameter will have the
   * effect that none of the standard fields are returned in
   * the response unless explicitly specified, instead only
   * fields for the mini representation are returned, additional
   * to the fields requested. */
  readonly fields?: readonly string[];
  /**
   * Determines if users should receive email notification
   * for the action performed. */
  readonly notify?: boolean;
}
export class TransferOwnedFolderHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<TransferOwnedFolderHeaders, 'extraHeaders'> &
      Partial<Pick<TransferOwnedFolderHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface TransferOwnedFolderHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?:
    | undefined
    | {
        readonly [key: string]: undefined | string;
      };
}
export class TransferManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<TransferManager, 'networkSession' | 'transferOwnedFolder'> &
      Partial<Pick<TransferManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
     * Move all of the items (files, folders and workflows) owned by a user into
     * another user's account
     *
     * Only the root folder (`0`) can be transferred.
     *
     * Folders can only be moved across users by users with administrative
     * permissions.
     *
     * All existing shared links and folder-level collaborations are transferred
     * during the operation. Please note that while collaborations at the individual
     * file-level are transferred during the operation, the collaborations are
     * deleted when the original user is deleted.
     *
     * This call will be performed synchronously which might lead to a slow response
     * when the source user has a large number of items in all of its folders.
     *
     * If the destination path has a metadata cascade policy attached to any of
     * the parent folders, a metadata cascade operation will be kicked off
     * asynchronously.
     *
     * There is currently no way to check for when this operation is finished.
     *
     * The destination folder's name will be in the format `{User}'s Files and
     * Folders`, where `{User}` is the display name of the user.
     *
     * To make this API call your application will need to have the "Read and write
     * all files and folders stored in Box" scope enabled.
     *
     * Please make sure the destination user has access to `Relay` or `Relay Lite`,
     * and has access to the files and folders involved in the workflows being
     * transferred.
     *
     * Admins will receive an email when the operation is completed.
     * @param {string} userId The ID of the user.
    Example: "12345"
     * @param {TransferOwnedFolderRequestBody} requestBody Request body of transferOwnedFolder method
     * @param {TransferOwnedFolderOptionalsInput} optionalsInput
     * @returns {Promise<FolderFull>}
     */
  async transferOwnedFolder(
    userId: string,
    requestBody: TransferOwnedFolderRequestBody,
    optionalsInput: TransferOwnedFolderOptionalsInput = {},
  ): Promise<FolderFull> {
    const optionals: TransferOwnedFolderOptionals =
      new TransferOwnedFolderOptionals({
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
      ['fields']: queryParams.fields
        ? queryParams.fields.map(toString).join(',')
        : undefined,
      ['notify']: toString(queryParams.notify) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/users/',
            toString(userId) as string,
            '/folders/0',
          ) as string,
          method: 'PUT',
          params: queryParamsMap,
          headers: headersMap,
          data: serializeTransferOwnedFolderRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeFolderFull(response.data!),
      rawData: response.data!,
    };
  }
}
export interface TransferManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeTransferOwnedFolderRequestBodyOwnedByField(
  val: TransferOwnedFolderRequestBodyOwnedByField,
): SerializedData {
  return { ['id']: val.id };
}
export function deserializeTransferOwnedFolderRequestBodyOwnedByField(
  val: SerializedData,
): TransferOwnedFolderRequestBodyOwnedByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "TransferOwnedFolderRequestBodyOwnedByField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TransferOwnedFolderRequestBodyOwnedByField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TransferOwnedFolderRequestBodyOwnedByField"',
    });
  }
  const id: string = val.id;
  return { id: id } satisfies TransferOwnedFolderRequestBodyOwnedByField;
}
export function serializeTransferOwnedFolderRequestBody(
  val: TransferOwnedFolderRequestBody,
): SerializedData {
  return {
    ['owned_by']: serializeTransferOwnedFolderRequestBodyOwnedByField(
      val.ownedBy,
    ),
  };
}
export function deserializeTransferOwnedFolderRequestBody(
  val: SerializedData,
): TransferOwnedFolderRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TransferOwnedFolderRequestBody"',
    });
  }
  if (val.owned_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "owned_by" of type "TransferOwnedFolderRequestBody" to be defined',
    });
  }
  const ownedBy: TransferOwnedFolderRequestBodyOwnedByField =
    deserializeTransferOwnedFolderRequestBodyOwnedByField(val.owned_by);
  return { ownedBy: ownedBy } satisfies TransferOwnedFolderRequestBody;
}
