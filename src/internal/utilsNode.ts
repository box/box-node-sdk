import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { SignJWT, importPKCS8 } from 'jose';
import { default as crypto } from 'crypto';
import { default as fs } from 'fs';
import { ProxyAgent } from 'proxy-agent';
import { default as FormData } from 'form-data';
import util from 'util';

export { Buffer, Readable as ByteStream, FormData, util as utilLib };
export type AgentOptions = any;
export type Agent = any;
export type HashName = 'sha1';
export type DigestHashType = 'base64';

export class Hash {
  #hash: any;
  algorithm: HashName;

  constructor({ algorithm }: { algorithm: HashName }) {
    this.algorithm = algorithm;
    this.#hash = crypto.createHash(algorithm);
  }

  async updateHash(data: Buffer) {
    this.#hash.update(data);
  }

  async digestHash(encoding: DigestHashType = 'base64'): Promise<string> {
    return this.#hash.digest(encoding);
  }
}

export function generateByteBuffer(size: number): Buffer {
  return crypto.randomBytes(size);
}

export function generateReadableStreamFromFile(
  file: any,
  chunkSize: number = 1024 * 1024,
): ReadableStream {
  throw new Error('This function is only supported in the browser');
}

export function generateByteStreamFromBuffer(
  buffer: Buffer | ArrayBuffer,
): Readable {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  return Readable.from(buf);
}

export function decodeBase64ByteStream(data: string): Readable {
  return Readable.from(Buffer.from(data, 'base64'));
}

export function stringToByteStream(data: string): Readable {
  return Readable.from(Buffer.from(data, 'ascii'));
}

export async function readByteStream(byteStream: Readable): Promise<Buffer> {
  const buffers: Buffer[] = [];
  for await (const data of byteStream) {
    buffers.push(data);
  }
  return Buffer.concat(buffers);
}

export async function* iterateChunks(
  stream: Readable,
  chunkSize: number,
  fileSize: number,
): AsyncGenerator<Readable> {
  let buffers: Buffer[] = [];
  let totalSize = 0;
  let consumedSize = 0;
  while (consumedSize < fileSize && !stream.readableEnded) {
    for await (const chunk of stream) {
      const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      if (!Buffer.isBuffer(data)) {
        throw new Error('Expecting a chunk of stream to be a Buffer');
      }
      consumedSize += data.length;
      buffers.push(data);
      totalSize += data.length;

      if (totalSize < chunkSize) {
        continue;
      }

      const buffer = Buffer.concat(buffers);

      let start = 0;
      while (totalSize >= chunkSize) {
        yield generateByteStreamFromBuffer(
          buffer.subarray(start, start + chunkSize),
        );
        start += chunkSize;
        totalSize -= chunkSize;
      }

      buffers = totalSize > 0 ? [buffer.subarray(start)] : [];
    }
  }

  if (consumedSize !== fileSize) {
    throw new Error(
      `Stream size ${consumedSize} does not match expected file size ${fileSize}`,
    );
  }
  if (totalSize > 0) {
    yield generateByteStreamFromBuffer(Buffer.concat(buffers));
  }
}

/**
 * Interface used for private key decryption in JWT auth.
 */
export interface PrivateKeyDecryptor {
  /**
   * Decrypts private key using a passphrase.
   */
  decryptPrivateKey(encryptedPrivateKey: string, passphrase: string): string;
}

export class DefaultPrivateKeyDecryptor implements PrivateKeyDecryptor {
  constructor(fields: Omit<DefaultPrivateKeyDecryptor, 'decryptPrivateKey'>) {}
  decryptPrivateKey(encryptedPrivateKey: string, passphrase: string): string {
    const privateKey = crypto.createPrivateKey({
      key: encryptedPrivateKey,
      format: 'pem',
      type: 'pkcs8',
      passphrase: passphrase,
    });
    const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();

    return pem;
  }
}

export type JwtKey = {
  key: string;
  passphrase: string;
};

export type JwtAlgorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

export type JwtSignOptions = {
  algorithm?: JwtAlgorithm;
  keyid?: string | undefined;
  expiresIn?: string | number | undefined;
  notBefore?: string | number | undefined;
  audience?: string | string[] | undefined;
  subject?: string | undefined;
  issuer?: string | undefined;
  jwtid?: string | undefined;
  privateKeyDecryptor: PrivateKeyDecryptor | undefined;
};

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
  const pem = options.privateKeyDecryptor?.decryptPrivateKey(
    key.key,
    key.passphrase,
  );
  if (!pem) {
    throw new Error(`Decrypted jwt private key is empty`);
  }
  const pkcs8 = await importPKCS8(pem, options.algorithm || 'RS256');
  let signer = new SignJWT(claims);
  signer = options.audience ? signer.setAudience(options.audience) : signer;
  signer = options.expiresIn
    ? signer.setExpirationTime(options.expiresIn)
    : signer;
  signer = options.issuer ? signer.setIssuer(options.issuer) : signer;
  signer = options.jwtid ? signer.setJti(options.jwtid) : signer;
  signer = options.notBefore ? signer.setNotBefore(options.notBefore) : signer;
  signer = options.subject ? signer.setSubject(options.subject) : signer;
  signer = options.algorithm
    ? signer.setProtectedHeader({ alg: options.algorithm })
    : signer;
  signer = signer.setIssuedAt();
  return await signer.sign(pkcs8);
}

/**
 * Reads a text file and returns its content.
 */
export function readTextFromFile(filepath: string): string {
  return fs.readFileSync(filepath, 'utf8');
}

/**
 * Create web agent from proxy agent options.
 */
export function createAgent(options?: AgentOptions, proxyConfig?: any): Agent {
  let agentOptions = options;

  if (proxyConfig && proxyConfig.url) {
    if (!proxyConfig.url.startsWith('http')) {
      throw new Error('Invalid proxy URL');
    }

    const proxyHost = proxyConfig.url.split('//')[1];
    const proxyAuth =
      proxyConfig.username && proxyConfig.password
        ? `${proxyConfig.username}:${proxyConfig.password}@`
        : '';
    const proxyUrl = `http://${proxyAuth}${proxyHost}`;
    agentOptions = Object.assign(
      { getProxyForUrl: (url: string) => proxyUrl },
      options || {},
    );
  }

  return agentOptions ? new ProxyAgent(agentOptions) : new ProxyAgent();
}

/**
 * Stringify JSON with escaped multibyte Unicode characters and slashes to ensure computed signatures match PHP's default behavior
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
  let hmac = crypto.createHmac('sha256', signatureKey);
  hmac.update(escapedBody);
  hmac.update(headers['box-delivery-timestamp']);
  signature = hmac.digest('base64');
  return signature;
}

export async function compareSignatures(
  expectedSignature: string | null,
  receivedSignature: string | null,
): Promise<boolean> {
  if (!expectedSignature || !receivedSignature) {
    return false;
  }

  const expectedBuffer = Buffer.from(expectedSignature, 'base64');
  const receivedBuffer = Buffer.from(receivedSignature, 'base64');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export async function calculateMD5Hash(data: string | Buffer): Promise<string> {
  return crypto.createHash('sha1').update(data).digest('hex');
}

export function getEnvVar(name: string): string {
  if (typeof process === 'undefined' || !process.env) {
    throw new Error('This function requires a Node.js environment');
  }
  return process.env[name] || '';
}

export function setEnvVar(name: string, value: string): void {
  if (typeof process === 'undefined' || !process.env) {
    throw new Error('This function requires a Node.js environment');
  }
  process.env[name] = value;
}
