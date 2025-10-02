type ExpectFunction = {
  toBe: (expected: unknown) => void;
  toBeTruthy: () => void;
  toBeFalsy: () => void;
  toBeNull: () => void;
  toBeUndefined: () => void;
  toBeDefined: () => void;
  toBeInstanceOf: (constructor: new (...args: unknown[]) => unknown) => void;
  toHaveLength: (length: number) => void;
  toContain: (item: unknown) => void;
  toEqual: (expected: unknown) => void;
  rejects: {
    toThrow: (expectedError?: string | RegExp) => Promise<void>;
  };
};

declare global {
  interface Window {
    expect: (
      actual: unknown | (() => unknown | Promise<unknown>),
    ) => ExpectFunction;
  }
}

export function setupExpect() {
  // @ts-expect-error - Ignore Mocha TestFunction type conflict
  window.expect = function (
    actual: unknown | (() => unknown | Promise<unknown>),
  ): ExpectFunction {
    const assert = (condition: boolean, message: string) => {
      if (!condition) {
        throw new Error(message);
      }
    };

    const isFunction = typeof actual === 'function';

    return {
      toBe: (expected: unknown) => {
        assert(actual === expected, `Expected ${expected} but got ${actual}`);
      },
      toBeTruthy: () => {
        assert(!!actual, `Expected truthy but got ${actual}`);
      },
      toBeFalsy: () => {
        assert(!actual, `Expected falsy but got ${actual}`);
      },
      toBeNull: () => {
        assert(actual === null, `Expected null but got ${actual}`);
      },
      toBeUndefined: () => {
        assert(actual === undefined, `Expected undefined but got ${actual}`);
      },
      toBeDefined: () => {
        assert(actual !== undefined, `Expected defined but got undefined`);
      },
      toBeInstanceOf: (constructor: new (...args: unknown[]) => unknown) => {
        assert(
          actual instanceof constructor,
          `Expected instance of ${constructor.name} but got ${actual}`,
        );
      },
      toHaveLength: (length: number) => {
        if (typeof actual !== 'string' && !Array.isArray(actual)) {
          throw new Error(
            'toHaveLength can only be used with strings or arrays',
          );
        }
        assert(
          actual.length === length,
          `Expected length ${length} but got ${actual.length}`,
        );
      },
      toContain: (item: unknown) => {
        if (typeof actual === 'string') {
          assert(
            actual.includes(String(item)),
            `Expected to contain ${item} but got ${actual}`,
          );
        } else if (Array.isArray(actual)) {
          assert(
            actual.includes(item),
            `Expected to contain ${item} but got ${actual}`,
          );
        } else {
          throw new Error('toContain can only be used with strings or arrays');
        }
      },
      toEqual: (expected: unknown) => {
        assert(
          JSON.stringify(actual) === JSON.stringify(expected),
          `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(
            actual,
          )}`,
        );
      },
      rejects: {
        toThrow: async (expectedError?: string | RegExp) => {
          if (!isFunction) {
            throw new Error('rejects.toThrow can only be used with functions');
          }

          try {
            const result = (actual as () => unknown | Promise<unknown>)();
            if (result instanceof Promise) {
              await result;
            }
            throw new Error('Expected function to throw but it did not');
          } catch (error) {
            if (expectedError) {
              const errorMessage =
                error instanceof Error ? error.message : String(error);
              if (typeof expectedError === 'string') {
                assert(
                  errorMessage.includes(expectedError),
                  `Expected error to contain "${expectedError}" but got "${errorMessage}"`,
                );
              } else {
                assert(
                  expectedError.test(errorMessage),
                  `Expected error to match ${expectedError} but got "${errorMessage}"`,
                );
              }
            }
          }
        },
      },
    };
  };
}
