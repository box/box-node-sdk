import http from 'http';
import crypto from 'crypto';
import { BoxJwtAuth, JwtConfig } from '../box';
import { BoxNetworkClient } from '../networking/boxNetworkClient';
import { NetworkSession } from '../networking/network';
import type { SerializedData } from '../serialization/json';

type RequestDataFactory = {
  create(): Promise<SerializedData>;
};

type FetchOptions = {
  data?: SerializedData;
};

type FetchResponse = {
  status: number;
};

type RetryStrategy = {
  shouldRetry(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): Promise<boolean>;
  retryAfter(): number;
};

type ServerPlan = {
  failFirstRequest?: boolean;
  statuses?: number[];
};

async function withTestServer<T>(
  plan: ServerPlan,
  test: (url: string, bodies: string[]) => Promise<T>,
): Promise<T> {
  const bodies: string[] = [];
  let requestCount = 0;

  const server = http.createServer((request, response) => {
    requestCount += 1;
    const chunks: Buffer[] = [];

    request.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    request.on('end', () => {
      bodies.push(Buffer.concat(chunks).toString('utf8'));

      if (plan.failFirstRequest && requestCount === 1) {
        request.socket.destroy();
        return;
      }

      const status = plan.statuses?.shift() ?? 200;
      const responseBody = JSON.stringify({ ok: true });
      response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(responseBody),
        'Retry-After': '0',
      });
      response.end(responseBody);
    });
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (typeof address === 'string' || address == null) {
    throw new Error('Expected local HTTP server port');
  }

  try {
    return await test(`http://127.0.0.1:${address.port}`, bodies);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function createDataFactory(): RequestDataFactory & { calls: number } {
  return {
    calls: 0,
    async create(): Promise<SerializedData> {
      this.calls += 1;
      return { attempt: `D${this.calls + 1}` };
    },
  };
}

function createRetryStrategy(
  shouldRetry: (
    options: FetchOptions,
    response: FetchResponse,
    attemptNumber: number,
  ) => boolean,
  retryAfterSeconds = 0,
): RetryStrategy {
  return {
    async shouldRetry(fetchOptions, fetchResponse, attemptNumber) {
      return shouldRetry(fetchOptions, fetchResponse, attemptNumber);
    },
    retryAfter() {
      return retryAfterSeconds;
    },
  };
}

function parseFormBody(body: string): URLSearchParams {
  return new URLSearchParams(body);
}

function decodeJwtPayload(token: string): { jti: string; exp: number } {
  const [, payload] = token.split('.');
  if (!payload) {
    throw new Error('Expected JWT payload');
  }

  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}

function createJwtAuth(): BoxJwtAuth {
  const { privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'passphrase',
    },
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
  });

  return new BoxJwtAuth({
    config: new JwtConfig({
      clientId: 'client-id',
      clientSecret: 'client-secret',
      enterpriseId: 'enterprise-id',
      jwtKeyId: 'jwt-key-id',
      privateKey: privateKey.toString(),
      privateKeyPassphrase: 'passphrase',
    }),
  });
}

test('network exception retry regenerates request data', async () => {
  await withTestServer({ failFirstRequest: true }, async (url, bodies) => {
    const dataFactory = createDataFactory();

    await new BoxNetworkClient().fetch({
      url,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      responseFormat: 'json',
      data: { attempt: 'D1' },
      dataFactory,
      networkSession: new NetworkSession({
        retryStrategy: createRetryStrategy(
          (_options, response, attemptNumber) =>
            response.status === 0 && attemptNumber < 2,
        ),
      }),
    });

    expect(bodies).toEqual(['attempt=D1', 'attempt=D2']);
    expect(dataFactory.calls).toBe(1);
  });
});

test('500 retry regenerates request data', async () => {
  await withTestServer({ statuses: [500, 200] }, async (url, bodies) => {
    const dataFactory = createDataFactory();

    await new BoxNetworkClient().fetch({
      url,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      responseFormat: 'json',
      data: { attempt: 'D1' },
      dataFactory,
      networkSession: new NetworkSession({
        retryStrategy: createRetryStrategy(
          (_options, response) => response.status === 500,
        ),
      }),
    });

    expect(bodies).toEqual(['attempt=D1', 'attempt=D2']);
    expect(dataFactory.calls).toBe(1);
  });
});

test('retry strategy receives regenerated request data', async () => {
  await withTestServer({ statuses: [500, 200] }, async (url) => {
    const retryData: (SerializedData | undefined)[] = [];
    const dataFactory = createDataFactory();

    await new BoxNetworkClient().fetch({
      url,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      responseFormat: 'json',
      data: { attempt: 'D1' },
      dataFactory,
      networkSession: new NetworkSession({
        retryStrategy: createRetryStrategy((options, response) => {
          retryData.push(options.data);
          return response.status === 500;
        }),
      }),
    });

    expect(retryData).toEqual([{ attempt: 'D1' }, { attempt: 'D2' }]);
  });
});

test('retry without data factory resends same request data', async () => {
  await withTestServer({ statuses: [500, 200] }, async (url, bodies) => {
    await new BoxNetworkClient().fetch({
      url,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      responseFormat: 'json',
      data: { attempt: 'D1' },
      networkSession: new NetworkSession({
        retryStrategy: createRetryStrategy(
          (_options, response) => response.status === 500,
        ),
      }),
    });

    expect(bodies).toEqual(['attempt=D1', 'attempt=D1']);
  });
});

test('BoxJwtAuth regenerates JWT assertion on token request retry', async () => {
  await withTestServer({ statuses: [500, 200] }, async (url, bodies) => {
    const auth = createJwtAuth();

    await auth.refreshToken(
      new NetworkSession({
        baseUrls: {
          baseUrl: url,
          uploadUrl: url,
          oauth2Url: url,
        },
        networkClient: new BoxNetworkClient(),
        retryStrategy: createRetryStrategy(
          (_options, response) => response.status === 500,
          1,
        ),
      }),
    );

    expect(bodies).toHaveLength(2);
    const firstAssertion = parseFormBody(bodies[0]).get('assertion');
    const secondAssertion = parseFormBody(bodies[1]).get('assertion');
    expect(firstAssertion).toBeTruthy();
    expect(secondAssertion).toBeTruthy();

    const firstPayload = decodeJwtPayload(firstAssertion!);
    const secondPayload = decodeJwtPayload(secondAssertion!);
    expect(secondPayload.jti).not.toEqual(firstPayload.jti);
    expect(secondPayload.exp).toBeGreaterThan(firstPayload.exp);
  });
});
