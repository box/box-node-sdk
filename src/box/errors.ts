import { SerializedData } from '../serialization/json.js';
import { GeneratedCodeError } from '../internal/errors.js';
import { utilLib } from '../internal/utils.js';
import { DataSanitizer } from '../internal/logging.generated';

export class BoxSdkError extends GeneratedCodeError {
  readonly timestamp?: string;
  readonly error?: Error;
  constructor(fields: Pick<BoxSdkError, 'message' | 'timestamp' | 'error'>) {
    super(fields);
    this.name = 'BoxSdkError';
    Object.setPrototypeOf(this, BoxSdkError.prototype);
  }
}
export interface RequestInfo {
  readonly method: string;
  readonly url: string;
  readonly queryParams: {
    readonly [key: string]: string;
  };
  readonly headers: {
    readonly [key: string]: string;
  };
  readonly body?: any;
}
export interface ResponseInfo {
  readonly statusCode: number;
  readonly headers: {
    readonly [key: string]: string;
  };
  readonly body?: SerializedData;
  readonly rawBody?: string;
  readonly code?: string;
  readonly contextInfo?: {
    readonly [key: string]: any;
  };
  readonly requestId?: string;
  readonly helpUrl?: string;
}
export class BoxApiError extends BoxSdkError {
  readonly requestInfo!: RequestInfo;
  readonly responseInfo!: ResponseInfo;
  readonly dataSanitizer: DataSanitizer = new DataSanitizer({});
  constructor(
    fields: Pick<
      BoxApiError,
      | 'message'
      | 'timestamp'
      | 'error'
      | 'requestInfo'
      | 'responseInfo'
      | 'dataSanitizer'
    >,
  ) {
    super(fields);
    this.name = 'BoxApiError';
    if (fields.dataSanitizer) {
      this.dataSanitizer = fields.dataSanitizer;
    }
    Object.setPrototypeOf(this, BoxApiError.prototype);
  }

  [utilLib.inspect.custom]() {
    return this.toString();
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      error: this.error,
      requestInfo: {
        method: this.requestInfo.method,
        url: this.requestInfo.url,
        queryParams: this.requestInfo.queryParams,
        headers: this.dataSanitizer.sanitizeHeaders(this.requestInfo.headers),
        body: this.requestInfo.body,
      },
      responseInfo: {
        statusCode: this.responseInfo.statusCode,
        headers: this.dataSanitizer.sanitizeHeaders(this.responseInfo.headers),
        body: this.dataSanitizer.sanitizeBody(this.responseInfo.body),
        code: this.responseInfo.code,
        contextInfo: this.responseInfo.contextInfo,
        requestId: this.responseInfo.requestId,
        helpUrl: this.responseInfo.helpUrl,
      },
    };
  }
}
