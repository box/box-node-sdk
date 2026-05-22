import { serializeNotesConvertResponseV2026R0 } from '../schemas/v2026R0/notesConvertResponseV2026R0';
import { deserializeNotesConvertResponseV2026R0 } from '../schemas/v2026R0/notesConvertResponseV2026R0';
import { serializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { deserializeClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { serializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { deserializeBoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { serializeNotesConvertRequestBodyV2026R0 } from '../schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { deserializeNotesConvertRequestBodyV2026R0 } from '../schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { NotesConvertRequestBodyV2026R0Input } from '../schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { ResponseFormat } from '../networking/fetchOptions';
import { NotesConvertResponseV2026R0 } from '../schemas/v2026R0/notesConvertResponseV2026R0';
import { ClientErrorV2026R0 } from '../schemas/v2026R0/clientErrorV2026R0';
import { BoxVersionHeaderV2026R0 } from '../parameters/v2026R0/boxVersionHeaderV2026R0';
import { NotesConvertRequestBodyV2026R0 } from '../schemas/v2026R0/notesConvertRequestBodyV2026R0';
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
export class CreateNoteConvertV2026R0Optionals {
  readonly headers: CreateNoteConvertV2026R0Headers =
    new CreateNoteConvertV2026R0Headers({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateNoteConvertV2026R0Optionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateNoteConvertV2026R0Optionals, 'headers' | 'cancellationToken'>
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
export interface CreateNoteConvertV2026R0OptionalsInput {
  readonly headers?: CreateNoteConvertV2026R0Headers;
  readonly cancellationToken?: CancellationToken;
}
export class CreateNoteConvertV2026R0Headers {
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
      CreateNoteConvertV2026R0Headers,
      'boxVersion' | 'extraHeaders'
    > &
      Partial<
        Pick<CreateNoteConvertV2026R0Headers, 'boxVersion' | 'extraHeaders'>
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
export interface CreateNoteConvertV2026R0HeadersInput {
  /**
   * Version header. */
  readonly boxVersion?: BoxVersionHeaderV2026R0;
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class NotesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<NotesManager, 'networkSession' | 'createNoteConvertV2026R0'> &
      Partial<Pick<NotesManager, 'networkSession'>>
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Creates a Box Note (`.boxnote` file) from supported source content. See the `content_format` field for supported formats.
   * @param {NotesConvertRequestBodyV2026R0Input} requestBodyInput Request body of createNoteConvertV2026R0 method
   * @param {CreateNoteConvertV2026R0OptionalsInput} optionalsInput
   * @returns {Promise<NotesConvertResponseV2026R0>}
   */
  async createNoteConvertV2026R0(
    requestBodyInput: NotesConvertRequestBodyV2026R0Input,
    optionalsInput: CreateNoteConvertV2026R0OptionalsInput = {}
  ): Promise<NotesConvertResponseV2026R0> {
    const requestBody: NotesConvertRequestBodyV2026R0 =
      new NotesConvertRequestBodyV2026R0({
        content: requestBodyInput.content,
        contentFormat: requestBodyInput.contentFormat,
        parent: requestBodyInput.parent,
        name: requestBodyInput.name,
      });
    const optionals: CreateNoteConvertV2026R0Optionals =
      new CreateNoteConvertV2026R0Optionals({
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
            '/2.0/notes/convert'
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeNotesConvertRequestBodyV2026R0(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        })
      );
    return {
      ...deserializeNotesConvertResponseV2026R0(response.data!),
      rawData: response.data!,
    };
  }
}
export interface NotesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
