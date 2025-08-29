import { Buffer } from 'buffer';
import { createHMAC, createSHA1, createSHA256, sha1 } from 'hash-wasm';

export { Buffer };
export type ByteStream = ReadableStream;
export class FormData {}
export type AgentOptions = any;
export type Agent = any;
export type HashName = 'sha1';
export type DigestHashType = 'base64';

export class utilLib {
  static inspect = {
    custom: 'inspect.custom',
  };
}

export class Hash {
  hash: any;
  algorithm: HashName;

  constructor({ algorithm }: { algorithm: HashName }) {
    this.algorithm = algorithm;
    this.hash = undefined;
  }

  async initializeBrowserHash() {
    switch (this.algorithm) {
      case 'sha1':
        this.hash = await createSHA1();
        this.hash.init();
        break;
      default:
        throw new Error(`Unsupported algorithm: ${this.algorithm}`);
    }
  }

  async updateHash(data: Buffer) {
    if (!this.hash) {
      await this.initializeBrowserHash();
    }
    this.hash.update(data);
  }

  async digestHash(encoding: DigestHashType = 'base64'): Promise<string> {
    if (!this.hash) {
      await this.initializeBrowserHash();
    }
    const d = this.hash.digest('binary');
    switch (encoding) {
      case 'base64':
        return Buffer.from(d).toString('base64');
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }
}

export function generateByteBuffer(size: number): Buffer {
  // Maximum size for crypto.getRandomValues is 65536 bytes
  const MAX_CHUNK_SIZE = 65536;
  const buffer = new Uint8Array(size);

  for (let offset = 0; offset < size; offset += MAX_CHUNK_SIZE) {
    const length = Math.min(MAX_CHUNK_SIZE, size - offset);
    const chunk = new Uint8Array(length);
    window.crypto.getRandomValues(chunk);
    buffer.set(chunk, offset);
  }

  return Buffer.from(buffer);
}

export function generateReadableStreamFromFile(
  file: any,
  chunkSize: number = 1024 * 1024,
): ReadableStream {
  let offset = 0;

  return new ReadableStream({
    async pull(controller) {
      if (offset >= file.size) {
        controller.close();
        return;
      }

      const chunk = file.slice(offset, offset + chunkSize);
      const arrayBuffer = await chunk.arrayBuffer();
      controller.enqueue(new Uint8Array(arrayBuffer));

      offset += chunkSize;
    },
  });
}

export function generateByteStreamFromBuffer(
  buffer: Buffer | ArrayBuffer,
): ReadableStream {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array(buffer));
      controller.close();
    },
  });
}

export function decodeBase64ByteStream(data: string): ReadableStream {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      const decodedStr = atob(data);
      const buffer = new ArrayBuffer(decodedStr.length);
      const array = new Uint8Array(buffer);
      for (let i = 0; i < decodedStr.length; i++) {
        array[i] = decodedStr.charCodeAt(i);
      }
      controller.enqueue(array);
      controller.close();
    },
  });
}

export function stringToByteStream(data: string): ReadableStream {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      const buffer = new ArrayBuffer(data.length);
      const array = new Uint8Array(buffer);
      for (let i = 0; i < data.length; i++) {
        array[i] = data.charCodeAt(i);
      }
      controller.enqueue(array);
      controller.close();
    },
  });
}

export function getEnvVar(name: string): string {
  if (
    typeof window !== 'undefined' &&
    (window as any).env &&
    (window as any).env[name]
  ) {
    return (window as any).env[name];
  }
  return '';
}

export function setEnvVar(name: string, value: string): void {
  if (typeof window === 'undefined') {
    throw new Error('This function requires a browser environment');
  }
  if (!(window as any).env) {
    (window as any).env = {};
  }
  (window as any).env[name] = value;
}

export async function readByteStream(byteStream: ByteStream): Promise<Buffer> {
  const buffers: Buffer[] = [];

  // Browser ReadableStream
  const reader = byteStream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffers.push(Buffer.from(value));
  }

  return Buffer.concat(buffers);
}

export async function* iterateChunks(
  stream: ByteStream,
  chunkSize: number,
  fileSize: number,
): AsyncGenerator<ByteStream> {
  let buffers: Buffer[] = [];
  let totalSize = 0;
  let consumedSize = 0;

  const reader = stream.getReader();
  while (consumedSize < fileSize) {
    const { done, value } = await reader.read();
    if (done) break;

    const data = Buffer.from(value);
    consumedSize += data.length;
    buffers.push(data);
    totalSize += data.length;

    yield* yieldChunks();
  }

  if (consumedSize !== fileSize) {
    throw new Error(
      `Stream size ${consumedSize} does not match expected file size ${fileSize}`,
    );
  }

  if (totalSize > 0) {
    yield await generateByteStreamFromBuffer(Buffer.concat(buffers));
  }

  /**
   * Yields chunks of the desired `chunkSize` if enough data is available.
   */
  async function* yieldChunks() {
    if (totalSize < chunkSize) return;

    const buffer = Buffer.concat(buffers);
    let start = 0;

    while (totalSize >= chunkSize) {
      yield await generateByteStreamFromBuffer(
        buffer.subarray(start, start + chunkSize),
      );
      start += chunkSize;
      totalSize -= chunkSize;
    }

    buffers = totalSize > 0 ? [buffer.subarray(start)] : [];
  }
}

export type JwtKey = any;

export type JwtAlgorithm = any;

export type JwtSignOptions = any;

export interface PrivateKeyDecryptor {}

export class DefaultPrivateKeyDecryptor implements PrivateKeyDecryptor {
  constructor(fields: any) {}
}

/**
 * Creates a JWT assertion.
 *
 * @param claims
 * @param key
 * @param options
 * @returns
 */
export async function createJwtAssertion(
  claims: {
    readonly [key: string]: any;
  },
  key: JwtKey,
  options: JwtSignOptions,
): Promise<string> {
  throw new Error('This function is not supported in the browser');
}

/**
 * Reads a text file and returns its content.
 */
export function readTextFromFile(filepath: string): string {
  throw new Error('This function is not supported in the browser');
}

/**
 * Create web agent from proxy agent options.
 */
export function createAgent(options?: AgentOptions, proxyConfig?: any): Agent {
  return undefined;
}

/**
 * Stringify JSON with escaped multibyte Unicode characters to ensure computed signatures match PHP's default behavior
 *
 * @param {Object} body - The parsed JSON object
 * @returns {string} - Stringified JSON with escaped multibyte Unicode characters
 * @private
 */
export function jsonStringifyWithEscapedUnicode(body: string) {
  return body
    .replace(
      /[\u007f-\uffff]/g,
      (char) => `\\u${`0000${char.charCodeAt(0).toString(16)}`.slice(-4)}`,
    )
    .replace(/(?<!\\)\//g, '\\/');
}

/**
 * Compute the message signature
 * @see {@Link https://developer.box.com/en/guides/webhooks/handle/setup-signatures/}
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {string} signatureKey - The signature to verify the message with
 * @param {string} escapeBody - Indicates if payload should be escaped or left as is
 * @returns {?string} - The message signature (or null, if it can't be computed)
 * @private
 */
export async function computeWebhookSignature(
  body: string,
  headers: {
    [key: string]: string;
  },
  signatureKey: string,
  escapeBody: boolean = false,
): Promise<string | null> {
  if (headers['box-signature-version'] !== '1') {
    return null;
  }
  if (headers['box-signature-algorithm'] !== 'HmacSHA256') {
    return null;
  }
  let signature: string | null = null;
  const escapedBody = escapeBody ? jsonStringifyWithEscapedUnicode(body) : body;
  const hashFunc = createSHA256();
  const hmac = await createHMAC(hashFunc, signatureKey);
  hmac.init();
  hmac.update(escapedBody);
  hmac.update(headers['box-delivery-timestamp']);
  const result = await hmac.digest('binary');
  signature = Buffer.from(result).toString('base64');

  return signature;
}

export async function compareSignatures(
  expectedSignature: string | null,
  receivedSignature: string | null,
): Promise<boolean> {
  if (!expectedSignature || !receivedSignature) {
    return false;
  }
  if (expectedSignature.length !== receivedSignature.length) return false;

  let result = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    result |= expectedSignature.charCodeAt(i) ^ receivedSignature.charCodeAt(i);
  }

  return result === 0;
}

export async function calculateMD5Hash(data: string | Buffer): Promise<string> {
  return await sha1(data);
}
