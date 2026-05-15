import nodeFetch, { RequestInit } from 'node-fetch';

import { BoxApiError, BoxSdkError } from '../box/errors';
import {
  ByteStream,
  FormData,
  generateByteStreamFromBuffer,
  isBrowser,
  readByteStream,
  calculateMD5Hash,
  multipartStreamToBuffer,
  multipartBufferToStream,
} from '../internal/utils';
import { sdkVersion } from './version';
import { NetworkClient } from './networkClient';
import {
  SerializedData,
  jsonToSerializedData,
  sdIsMap,
  sdToJson,
  sdToUrlParams,
} from '../serialization/json';
import { Interceptor } from './interceptors';
import { FetchOptions } from './fetchOptions';
import { FetchResponse } from './fetchResponse';
import { RetryStrategy } from './retries';
import { BoxRetryStrategy } from './retries';
import { DataSanitizer } from '../internal/logging';

export const userAgentHeader = `Box JavaScript generated SDK v${sdkVersion} (${
  isBrowser() ? navigator.userAgent : `Node ${process.version}`
})`;

export const xBoxUaHeader = constructBoxUAHeader();
export const shouldIncludeBoxUaHeader = (options: FetchOptions) => {
  return !(
    isBrowser() &&
    (options.responseFormat === 'binary' ||
      options.responseFormat === 'no_content')
  );
};

function createAbortSignalWithTimeout(
  baseSignal: RequestInit['signal'],
  timeoutMs: number
): {
  signal: AbortSignal;
  clearTimeout: () => void;
  didTimeout: () => boolean;
} {
  const controller = new AbortController();
  const upstream = baseSignal as unknown as AbortSignal | undefined;
  let timedOut = false;

  const abortFromUpstream = () => {
    try {
      (controller as any).abort((upstream as any)?.reason);
    } catch {
      controller.abort();
    }
  };

  if (upstream) {
    if (upstream.aborted) {
      abortFromUpstream();
    } else {
      upstream.addEventListener('abort', abortFromUpstream, { once: true });
    }
  }

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  // Node.js timers keep the event loop alive. If the only pending work is this
  // watchdog timeout, we don't want it to prevent process exit (e.g. short CLI
  // runs, tests, scripts). `unref()` detaches the timer from the event loop.
  // It’s a no-op in environments where `unref` isn’t available.
  (timeoutId as any)?.unref?.();

  return {
    signal: controller.signal,
    clearTimeout: () => {
      clearTimeout(timeoutId);
      if (upstream) upstream.removeEventListener('abort', abortFromUpstream);
    },
    didTimeout: () => timedOut,
  };
}

type FetchOptionsExtended = FetchOptions & {
  attemptNumber?: number;
  numberOfRetriesOnException?: number;
};

async function createRequestInit(options: FetchOptions): Promise<RequestInit> {
  const {
    method = 'GET',
    headers = {},
    contentType: contentTypeInput = 'application/json',
    data,
    fileStream,
  } = options;

  const { contentHeaders = {}, body } = await (async (): Promise<{
    contentHeaders: { [key: string]: string };
    body: ByteStream | string | Buffer;
  }> => {
    const contentHeaders: { [key: string]: string } = {};
    if (options.multipartData) {
      const FormDataClass = isBrowser() ? window.FormData : FormData;
      const formData: any = new FormDataClass();
      for (const item of options.multipartData) {
        if (item.fileStream) {
          const buffer = await readByteStream(item.fileStream);
          const blob = isBrowser()
            ? new Blob([new Uint8Array(buffer)])
            : buffer;
          contentHeaders['content-md5'] = await calculateMD5Hash(buffer);
          formData.append(item.partName, blob, {
            filename: item.fileName ?? 'file',
            contentType: item.contentType ?? 'application/octet-stream',
          });
        } else if (item.data) {
          formData.append(item.partName, sdToJson(item.data));
        } else {
          throw new BoxSdkError({
            message: 'Multipart item must have either body or fileStream',
          });
        }
      }
      return {
        contentHeaders: {
          ...(!isBrowser() && {
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
          }),
          ...contentHeaders,
        },
        body: formData,
      };
    }

    contentHeaders['Content-Type'] = contentTypeInput;
    switch (contentTypeInput) {
      case 'application/json':
      case 'application/json-patch+json':
        return { contentHeaders, body: sdToJson(data) };

      case 'application/x-www-form-urlencoded':
        return { contentHeaders, body: sdToUrlParams(data) };

      case 'application/octet-stream':
        if (!fileStream) {
          throw new BoxSdkError({
            message:
              'fileStream required for application/octet-stream content type',
          });
        }
        return {
          contentHeaders,
          body: isBrowser()
            ? await readByteStream(fileStream)
            : (fileStream as any),
        };

      default:
        throw new BoxSdkError({
          message: `Unsupported content type : ${contentTypeInput}`,
        });
    }
  })();

  return {
    method,
    headers: {
      // Only set content type if it is not a GET request
      ...(method != 'GET' && contentHeaders),
      ...headers,
      ...(options.auth && {
        Authorization: await options.auth.retrieveAuthorizationHeader(
          options.networkSession
        ),
      }),
      ...(shouldIncludeBoxUaHeader(options) && {
        'User-Agent': userAgentHeader,
        'X-Box-UA': xBoxUaHeader,
      }),
      // Additional headers will override the default headers
      ...options.networkSession?.additionalHeaders,
    },
    body: body as any,
    signal: options.cancellationToken as RequestInit['signal'],
    agent: options.networkSession?.agent,
    ...(fileStream && isBrowser() && { duplex: 'half' }),
  };
}

export class BoxNetworkClient implements NetworkClient {
  constructor(
    fields?: Omit<BoxNetworkClient, 'fetch'> &
      Partial<Pick<BoxNetworkClient, 'fetch'>>
  ) {
    Object.assign(this, fields);
  }
  async fetch(options: FetchOptionsExtended): Promise<FetchResponse> {
    const attemptNumber = options.attemptNumber ?? 1;
    let numberOfRetriesOnException = options.numberOfRetriesOnException ?? 0;
    const interceptors: readonly Interceptor[] =
      options.networkSession?.interceptors ?? [];
    const retryStrategy: RetryStrategy =
      options.networkSession?.retryStrategy ?? new BoxRetryStrategy({});
    const dataSanitizer: DataSanitizer =
      options.networkSession?.dataSanitizer ?? new DataSanitizer({});
    const fetchOptions: typeof options = interceptors.length
      ? interceptors.reduce(
          (modifiedOptions: FetchOptions, interceptor: Interceptor) =>
            interceptor.beforeRequest(modifiedOptions),
          options
        )
      : options;
    const fileStreamBuffer = fetchOptions.fileStream
      ? await readByteStream(fetchOptions.fileStream)
      : void 0;
    const multipartBuffer = fetchOptions.multipartData
      ? await multipartStreamToBuffer(fetchOptions.multipartData)
      : void 0;

    let isExceptionCase: boolean = false;
    let fetchResponse: FetchResponse | undefined;
    let responseBytesBuffer;
    let caughtError: Error | undefined;
    const { params = {} } = fetchOptions;

    const requestInit = await createRequestInit({
      ...fetchOptions,
      fileStream: fileStreamBuffer
        ? generateByteStreamFromBuffer(fileStreamBuffer)
        : void 0,
      multipartData: multipartBuffer
        ? multipartBufferToStream(multipartBuffer)
        : void 0,
    });

    const timeoutConfig = fetchOptions.networkSession?.timeoutConfig;
    const timeoutMs = timeoutConfig?.timeoutMs;

    const requestTimeout =
      timeoutMs != null && timeoutMs > 0
        ? createAbortSignalWithTimeout(requestInit.signal, timeoutMs)
        : undefined;
    const requestInitWithTimeout: RequestInit = requestTimeout
      ? {
          ...requestInit,
          signal: requestTimeout.signal as unknown as RequestInit['signal'],
        }
      : requestInit;

    try {
      const requestUrl = ''.concat(
        fetchOptions.url,
        Object.keys(params).length === 0 || fetchOptions.url.endsWith('?')
          ? ''
          : '?',
        new URLSearchParams(params).toString()
      );
      const response = await nodeFetch(requestUrl, {
        ...requestInitWithTimeout,
        redirect: isBrowser() ? 'follow' : 'manual',
      });

      const ignoreResponseBody = fetchOptions.followRedirects === false;

      let data: SerializedData | undefined;
      let content: ByteStream = generateByteStreamFromBuffer(
        new Uint8Array().buffer
      );

      if (!ignoreResponseBody) {
        if (options.responseFormat === 'binary') {
          content = response.body as unknown as ByteStream;
          responseBytesBuffer = new Uint8Array();
        } else if (options.responseFormat === 'json') {
          responseBytesBuffer = await response.arrayBuffer();
          const text = new TextDecoder().decode(responseBytesBuffer);
          if (text) {
            data = jsonToSerializedData(text);
          }
          content = generateByteStreamFromBuffer(responseBytesBuffer);
        }
      }

      fetchResponse = {
        url: response.url,
        status: response.status,
        data,
        content,
        headers: Object.fromEntries(Array.from(response.headers.entries())),
      };
      if (interceptors.length) {
        fetchResponse = interceptors.reduce(
          (modifiedResponse: FetchResponse, interceptor: Interceptor) =>
            interceptor.afterRequest(modifiedResponse),
          fetchResponse
        );
      }
    } catch (error) {
      isExceptionCase = true;
      numberOfRetriesOnException++;
      if (requestTimeout?.didTimeout()) {
        caughtError = new Error(`Connection timeout after ${timeoutMs}ms`);
      } else {
        caughtError = error instanceof Error ? error : new Error(String(error));
      }
      fetchResponse = fetchResponse ?? { status: 0, headers: {} };
    } finally {
      requestTimeout?.clearTimeout();
    }
    const attemptForRetry = isExceptionCase
      ? numberOfRetriesOnException
      : attemptNumber;

    const shouldRetry = await retryStrategy.shouldRetry(
      fetchOptions,
      fetchResponse,
      attemptForRetry
    );

    if (shouldRetry) {
      const retryTimeout = retryStrategy.retryAfter(
        fetchOptions,
        fetchResponse,
        attemptForRetry
      );
      await new Promise((resolve) => setTimeout(resolve, retryTimeout * 1000));
      return this.fetch({
        ...options,
        attemptNumber: attemptNumber + 1,
        numberOfRetriesOnException: numberOfRetriesOnException,
        fileStream: fileStreamBuffer
          ? generateByteStreamFromBuffer(fileStreamBuffer)
          : void 0,
        multipartData: multipartBuffer
          ? multipartBufferToStream(multipartBuffer)
          : void 0,
      });
    }

    if (
      fetchResponse.status >= 300 &&
      fetchResponse.status < 400 &&
      fetchOptions.followRedirects !== false
    ) {
      if (!fetchResponse.headers['location']) {
        throw new BoxSdkError({
          message: `Unable to follow redirect for ${fetchOptions.url}`,
        });
      }
      const sameOrigin =
        new URL(fetchResponse.headers['location']).origin ===
        new URL(fetchOptions.url).origin;
      return this.fetch({
        ...options,
        params: undefined,
        auth: sameOrigin ? fetchOptions.auth : undefined,
        url: fetchResponse.headers['location'],
      });
    }

    if (fetchResponse.status >= 200 && fetchResponse.status < 400) {
      return fetchResponse;
    }

    const [
      code,
      contextInfo,
      requestId,
      helpUrl,
      message,
      error,
      errorDescription,
    ] = sdIsMap(fetchResponse.data)
      ? [
          sdToJson(fetchResponse.data['code']),
          sdIsMap(fetchResponse.data['context_info'])
            ? fetchResponse.data['context_info']
            : undefined,
          sdToJson(fetchResponse.data['request_id']),
          sdToJson(fetchResponse.data['help_url']),
          sdToJson(fetchResponse.data['message']),
          sdToJson(fetchResponse.data['error']),
          sdToJson(fetchResponse.data['error_description']),
        ]
      : [];
    if (fetchResponse.status === 0) {
      throw new BoxSdkError({
        message: caughtError?.message || `Unexpected Error occurred`,
        timestamp: `${Date.now()}`,
        error: caughtError,
      });
    }

    const errorMessage = [
      [fetchResponse.status, code, message].filter(Boolean).join(' '),
      requestId && `Request ID: ${requestId}`,
      error && `${error} - ${errorDescription}`,
    ]
      .filter(Boolean)
      .join('; ');
    throw new BoxApiError({
      message: errorMessage,
      timestamp: `${Date.now()}`,
      requestInfo: {
        contentType: fetchOptions.contentType,
        method: requestInit.method!,
        url: fetchOptions.url,
        queryParams: params,
        headers: (requestInit.headers as { [key: string]: string }) ?? {},
        body:
          typeof requestInit.body === 'string' ? requestInit.body : undefined,
      },
      responseInfo: {
        statusCode: fetchResponse.status,
        headers: fetchResponse.headers,
        body: fetchResponse.data,
        rawBody: new TextDecoder().decode(responseBytesBuffer),
        code: code,
        contextInfo: contextInfo,
        requestId: requestId,
        helpUrl: helpUrl,
      },
      dataSanitizer: dataSanitizer,
    });
  }
}

function getBoxBundleVersion(): string | null {
  if (typeof process !== 'undefined' && process.env?.NPM_BOX_VERSION) {
    return process.env.NPM_BOX_VERSION;
  }

  if (
    typeof globalThis !== 'undefined' &&
    (globalThis as any).__BOX_PACKAGE_VERSION
  ) {
    return (globalThis as any).__BOX_PACKAGE_VERSION;
  }

  return null;
}

function constructBoxUAHeader() {
  const analyticsIdentifiers = {
    agent: `box-javascript-generated-sdk/${sdkVersion}`,
    env: isBrowser()
      ? navigator.userAgent
      : `Node/${process.version.replace('v', '')}`,
  } as Record<string, string>;

  // Add bundle information if box-node-sdk is used through npm-box meta-package
  const bundleVersion = getBoxBundleVersion();
  if (bundleVersion) {
    analyticsIdentifiers['bundle'] = `box/${bundleVersion}`;
  }

  return Object.keys(analyticsIdentifiers)
    .map((k) => `${k}=${analyticsIdentifiers[k]}`)
    .join('; ');
}

// Retry intervals are between 50% and 150% of the exponentially increasing base amount
const RETRY_RANDOMIZATION_FACTOR = 0.5;

/**
 * Calculate the exponential backoff time with randomized jitter
 * @param {int} numRetries Which retry number this one will be
 * @param {int} baseInterval The base retry interval set in config
 * @returns {int} The number of milliseconds after which to retry
 */
export function getRetryTimeout(numRetries: number, baseInterval: number) {
  var minRandomization = 1 - RETRY_RANDOMIZATION_FACTOR;
  var maxRandomization = 1 + RETRY_RANDOMIZATION_FACTOR;
  var randomization =
    Math.random() * (maxRandomization - minRandomization) + minRandomization;
  var exponential = Math.pow(2, numRetries - 1);
  return Math.ceil(exponential * baseInterval * randomization);
}
