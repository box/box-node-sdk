import { testConfig } from '../../sdkTest.config.mjs';

export type TestResult = {
  name: string;
  status: 'not_started' | 'running' | 'passed' | 'failed' | 'skipped';
  error?: string;
  startTime?: Date;
  endTime?: Date;
};

export type TestRegistry = {
  tests: Array<{ name: string; fn: () => Promise<void> }>;
  register: (name: string, fn: () => Promise<void>) => void;
  runAll: () => Promise<void>;
  runByName: (name: string) => Promise<void>;
};

export function createTestRegistry(
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
): TestRegistry {
  return {
    tests: [] as Array<{ name: string; fn: () => Promise<void> }>,

    register(name: string, fn: () => Promise<void>) {
      this.tests.push({ name, fn });
      setTestResults((prev) => [...prev, { name, status: 'not_started' }]);
      console.log(`Registered test: ${name}`);
    },

    async runAll() {
      console.log(
        `Running ${this.tests.length} tests with 10 concurrent tests...`,
      );

      try {
        const concurrencyLimit = 10;
        const runningTests = new Set<string>();
        const testQueue = [...this.tests];

        // Function to run next test if we have capacity
        const runNextTest = async () => {
          if (runningTests.size >= concurrencyLimit || testQueue.length === 0) {
            return;
          }

          const test = testQueue.shift()!;
          runningTests.add(test.name);

          try {
            await this.runByName(test.name);
          } finally {
            runningTests.delete(test.name);
            // Try to run another test if we have capacity
            await runNextTest();
          }
        };

        // Start initial tests up to concurrency limit
        const initialTests = Math.min(concurrencyLimit, testQueue.length);
        await Promise.all(
          Array(initialTests)
            .fill(null)
            .map(() => runNextTest()),
        );
      } catch (e) {
        console.error('Error running tests:', e);
        setError(
          'Error running tests: ' +
            (e instanceof Error ? e.message : 'Unknown error'),
        );
      }
    },

    async runByName(name: string) {
      const test = this.tests.find(
        (t: { name: string; fn: () => Promise<void> }) => t.name === name,
      );
      if (!test) {
        console.error(`Test not found: ${name}`);
        return;
      }
      if (testConfig[name as keyof typeof testConfig] === 'skip') {
        console.log(`Skipping test: ${name}`);
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === test.name ? { ...r, status: 'skipped' } : r,
          ),
        );
        return;
      }
      try {
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === test.name
              ? {
                  ...r,
                  status: 'running',
                  startTime: new Date(),
                  endTime: undefined,
                  error: undefined,
                }
              : r,
          ),
        );
        console.log(`Running test: ${test.name}`);
        await test.fn();
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === test.name
              ? {
                  ...r,
                  status: 'passed',
                  endTime: new Date(),
                  error: undefined,
                }
              : r,
          ),
        );
        console.log(`✓ Test passed: ${test.name}`);
      } catch (e) {
        const error = e instanceof Error ? e.message : 'Unknown error';
        setTestResults((prev) =>
          prev.map((r) =>
            r.name === test.name
              ? { ...r, status: 'failed', error, endTime: new Date() }
              : r,
          ),
        );
        console.error(`✗ Test failed: ${test.name}`, e);
      }
    },
  };
}
