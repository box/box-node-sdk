# Configuration

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Retry Strategy](#retry-strategy)
  - [Overview](#overview)
  - [Default Configuration](#default-configuration)
  - [Retry Decision Flow](#retry-decision-flow)
  - [Exponential Backoff Algorithm](#exponential-backoff-algorithm)
    - [Example Delays (with default settings)](#example-delays-with-default-settings)
  - [Retry-After Header](#retry-after-header)
  - [Network Exception Handling](#network-exception-handling)
  - [Customizing Retry Parameters](#customizing-retry-parameters)
  - [Custom Retry Strategy](#custom-retry-strategy)
- [Timeouts](#timeouts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Retry Strategy

### Overview

The SDK ships with a built-in retry strategy (`BoxRetryStrategy`) that implements the `RetryStrategy` interface. The `BoxNetworkClient`, which serves as the default network client, uses this strategy to automatically retry failed API requests with exponential backoff.

The retry strategy exposes two methods:

- **`shouldRetry`** — Determines whether a failed request should be retried based on the HTTP status code, response headers, attempt count, and authentication state.
- **`retryAfter`** — Computes the delay (in seconds) before the next retry attempt, using either the server-provided `Retry-After` header or an exponential backoff formula.

### Default Configuration

| Parameter                  | Default      | Description                                                                                                                                              |
| -------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxAttempts`              | `5`          | Maximum number of retry attempts for HTTP error responses (status 4xx/5xx).                                                                              |
| `retryBaseInterval`        | `1` (second) | Base interval used in the exponential backoff calculation.                                                                                               |
| `retryRandomizationFactor` | `0.5`        | Jitter factor applied to the backoff delay. The actual delay is multiplied by a random value between `1 - factor` and `1 + factor`.                      |
| `maxRetriesOnException`    | `2`          | Maximum number of retries for network-level exceptions (connection failures, timeouts). These are tracked by a separate counter from HTTP error retries. |

### Retry Decision Flow

The following diagram shows how `BoxRetryStrategy.shouldRetry` decides whether to retry a request:

```
                    shouldRetry(fetchOptions, fetchResponse, attemptNumber)
                                        |
                                        v
                             +-----------------------+
                             | status == 0           |     Yes
                             | (network exception)?  |----------> attemptNumber <= maxRetriesOnException?
                             +-----------------------+               |            |
                                        | No                        Yes          No
                                        v                            |            |
                             +-----------------------+           [RETRY]      [NO RETRY]
                             | attemptNumber >=      |
                             | maxAttempts?          |
                             +-----------------------+
                                  |            |
                                 Yes          No
                                  |            |
                             [NO RETRY]        v
                             +-----------------------+
                             | status == 202 AND     |     Yes
                             | Retry-After header?   |----------> [RETRY]
                             +-----------------------+
                                        | No
                                        v
                             +-----------------------+
                             | status >= 500         |     Yes
                             | (server error)?       |----------> [RETRY]
                             +-----------------------+
                                        | No
                                        v
                             +-----------------------+
                             | status == 429         |     Yes
                             | (rate limited)?       |----------> [RETRY]
                             +-----------------------+
                                        | No
                                        v
                             +-----------------------+
                             | status == 401 AND     |     Yes
                             | auth available?       |----------> Refresh token, then [RETRY]
                             +-----------------------+
                                        | No
                                        v
                                   [NO RETRY]
```

### Exponential Backoff Algorithm

When the response does not include a `Retry-After` header, the retry delay is computed using exponential backoff with randomized jitter:

```
delay = 2^attemptNumber * retryBaseInterval * random(1 - factor, 1 + factor)
```

Where:

- `attemptNumber` is the current attempt (1-based)
- `retryBaseInterval` defaults to `1` second
- `factor` is `retryRandomizationFactor` (default `0.5`)
- `random(min, max)` returns a uniformly distributed value in `[min, max]`

#### Example Delays (with default settings)

| Attempt | Base Delay | Min Delay (factor=0.5) | Max Delay (factor=0.5) |
| ------- | ---------- | ---------------------- | ---------------------- |
| 1       | 2s         | 1.0s                   | 3.0s                   |
| 2       | 4s         | 2.0s                   | 6.0s                   |
| 3       | 8s         | 4.0s                   | 12.0s                  |
| 4       | 16s        | 8.0s                   | 24.0s                  |

### Retry-After Header

When the server includes a `Retry-After` header in the response, the SDK uses the header value directly as the delay in seconds instead of computing an exponential backoff delay. This applies to any retryable response that includes the header, including:

- `202 Accepted` with `Retry-After` (long-running operations)
- `429 Too Many Requests` with `Retry-After`
- `5xx` server errors with `Retry-After`

The header value is parsed as a floating-point number representing seconds.

### Network Exception Handling

Network-level failures (connection refused, DNS resolution errors, timeouts, TLS errors) are represented internally as responses with status `0`. These exceptions are tracked by a **separate counter** (`maxRetriesOnException`, default `2`) from the regular HTTP error retry counter (`maxAttempts`).

This means:

- Network exception retries are tracked independently from HTTP error retries, each with their own counter and backoff progression.
- A request can fail up to `maxRetriesOnException` times due to network exceptions, but each exception retry also increments the overall attempt counter, so the total number of retries across both exception and HTTP error types is bounded by `maxAttempts`.

### Customizing Retry Parameters

You can customize all retry parameters by initializing `BoxRetryStrategy` with the desired values and passing it to `NetworkSession`:

```ts
const auth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN_GOES_HERE' });
const networkSession = new NetworkSession({
  retryStrategy: new BoxRetryStrategy({
    maxAttempts: 3,
    retryBaseInterval: 2,
    retryRandomizationFactor: 0.3,
    maxRetriesOnException: 1,
  }),
});
const client = new BoxClient({ auth, networkSession });
```

### Custom Retry Strategy

You can implement your own retry strategy by implementing the `RetryStrategy` interface and overriding the `shouldRetry` and `retryAfter` methods:

```ts
class CustomRetryStrategy implements RetryStrategy {
  async shouldRetry(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): Promise<boolean> {
    return fetchResponse.status >= 500 && attemptNumber < 3;
  }

  retryAfter(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): number {
    return 1.0;
  }
}

const auth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN_GOES_HERE' });
const networkSession = new NetworkSession({
  retryStrategy: new CustomRetryStrategy(),
});
const client = new BoxClient({ auth, networkSession });
```

## Timeouts

You can configure request timeout using `timeoutConfig` on `NetworkSession`.
`timeoutMs` is in milliseconds and applies to each HTTP request attempt.

```js
const auth = new BoxDeveloperTokenAuth({ token: 'DEVELOPER_TOKEN_GOES_HERE' });
const networkSession = new NetworkSession({
  timeoutConfig: { timeoutMs: 30000 },
});
const client = new BoxClient({ auth, networkSession });
```

How timeout handling works:

- The SDK applies timeout only when `timeoutMs` is provided and greater than `0`.
- To disable SDK timeout handling, set `timeoutMs` to `0` (or a negative value), or omit `timeoutMs`.
- On timeout, the request is aborted and treated as a network error (`Connection timeout after <timeoutMs>ms`); if retries are exhausted, the SDK throws `BoxSdkError`.
- Timeout failures are handled as request exceptions, then retry behavior is controlled by the configured retry strategy.
- Timeout applies to a single HTTP request attempt to the Box API (not the total time across all retries).
