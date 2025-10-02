import { SerializedData } from '../serialization/json';
import { ByteStream } from '../internal/utils';
export interface FetchResponse {
  /**
   * URL of the response */
  readonly url?: string;
  /**
   * HTTP status code of the response */
  readonly status: number;
  /**
   * Response body of the response */
  readonly data?: SerializedData;
  /**
   * Streamed content of the response */
  readonly content?: ByteStream;
  /**
   * HTTP headers of the response */
  readonly headers: {
    readonly [key: string]: string;
  };
}
