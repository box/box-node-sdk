import { Authentication } from './auth.generated.js';
import { NetworkSession } from './network.generated.js';
import { SerializedData } from '../serialization/json.js';
import { ByteStream } from '../internal/utils.js';
import { CancellationToken } from '../internal/utils.js';
export type ResponseFormat = 'json' | 'binary' | 'no_content';
export interface MultipartItem {
  /**
   * Name of the part */
  readonly partName: string;
  /**
   * Data of the part */
  readonly data?: SerializedData;
  /**
   * File stream of the part */
  readonly fileStream?: ByteStream;
  /**
   * File name of the part */
  readonly fileName?: string;
  /**
   * Content type of the part */
  readonly contentType?: string;
}
export class FetchOptions {
  /**
   * URL of the request */
  readonly url!: string;
  /**
   * HTTP verb of the request */
  readonly method!: string;
  /**
   * HTTP query parameters */
  readonly params?: {
    readonly [key: string]: string;
  };
  /**
   * HTTP headers */
  readonly headers?: {
    readonly [key: string]: string;
  };
  /**
   * Request body of the request */
  readonly data?: SerializedData;
  /**
   * Stream data of the request */
  readonly fileStream?: ByteStream;
  /**
   * Multipart data of the request */
  readonly multipartData?: readonly MultipartItem[];
  /**
   * Content type of the request body */
  readonly contentType: string = 'application/json';
  /**
   * Expected response format */
  readonly responseFormat: ResponseFormat = 'json' as ResponseFormat;
  /**
   * Authentication object */
  readonly auth?: Authentication;
  /**
   * Network session object */
  readonly networkSession?: NetworkSession;
  /**
   * Cancellation token */
  readonly cancellationToken?: CancellationToken;
  /**
   * A boolean value indicate if the request should follow redirects. Defaults to True. Not supported in Browser environment. */
  readonly followRedirects?: boolean = true;
  constructor(
    fields: Omit<
      FetchOptions,
      'contentType' | 'responseFormat' | 'followRedirects'
    > &
      Partial<
        Pick<FetchOptions, 'contentType' | 'responseFormat' | 'followRedirects'>
      >,
  ) {
    if (fields.url !== undefined) {
      this.url = fields.url;
    }
    if (fields.method !== undefined) {
      this.method = fields.method;
    }
    if (fields.params !== undefined) {
      this.params = fields.params;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.data !== undefined) {
      this.data = fields.data;
    }
    if (fields.fileStream !== undefined) {
      this.fileStream = fields.fileStream;
    }
    if (fields.multipartData !== undefined) {
      this.multipartData = fields.multipartData;
    }
    if (fields.contentType !== undefined) {
      this.contentType = fields.contentType;
    }
    if (fields.responseFormat !== undefined) {
      this.responseFormat = fields.responseFormat;
    }
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
    if (fields.followRedirects !== undefined) {
      this.followRedirects = fields.followRedirects;
    }
  }
}
export interface FetchOptionsInput {
  /**
   * URL of the request */
  readonly url: string;
  /**
   * HTTP verb of the request */
  readonly method: string;
  /**
   * HTTP query parameters */
  readonly params?: {
    readonly [key: string]: string;
  };
  /**
   * HTTP headers */
  readonly headers?: {
    readonly [key: string]: string;
  };
  /**
   * Request body of the request */
  readonly data?: SerializedData;
  /**
   * Stream data of the request */
  readonly fileStream?: ByteStream;
  /**
   * Multipart data of the request */
  readonly multipartData?: readonly MultipartItem[];
  /**
   * Content type of the request body */
  readonly contentType?: string;
  /**
   * Expected response format */
  readonly responseFormat?: ResponseFormat;
  /**
   * Authentication object */
  readonly auth?: Authentication;
  /**
   * Network session object */
  readonly networkSession?: NetworkSession;
  /**
   * Cancellation token */
  readonly cancellationToken?: CancellationToken;
  /**
   * A boolean value indicate if the request should follow redirects. Defaults to True. Not supported in Browser environment. */
  readonly followRedirects?: undefined | boolean;
}
