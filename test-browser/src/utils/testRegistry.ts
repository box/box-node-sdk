import { testConfig } from '../../sdkTest.config.mjs';

export type TestResult = {
  name: string;
  status: 'not_started' | 'running' | 'passed' | 'failed' | 'skipped';
  error?: string;
  startTime?: Date;
  endTime?: Date;
};

export type RenderFn = (
  name: string,
  status: string,
  duration: string,
  error: string,
) => void;

export type TestRegistry = {
  tests: Array<{ name: string; fn: () => Promise<void> }>;
  register: (name: string, fn: () => Promise<void>) => void;
  runAll: () => Promise<void>;
  runByName: (name: string) => Promise<void>;
};

function formatDuration(startTime?: Date, endTime?: Date): string {
  if (!startTime || !endTime) return '-';
  return `${endTime.getTime() - startTime.getTime()}ms`;
}

export function createTestRegistry(render: RenderFn): TestRegistry {
  const results = new Map<string, TestResult>();

  return {
    tests: [] as Array<{ name: string; fn: () => Promise<void> }>,

    register(name: string, fn: () => Promise<void>) {
      this.tests.push({ name, fn });
      results.set(name, { name, status: 'not_started' });
      render(name, 'not_started', '-', '');
      console.log(`Registered test: ${name}`);
    },

    async runAll() {
      console.log(
        `Running ${this.tests.length} tests with 10 concurrent tests...`,
      );

      const concurrencyLimit = 10;
      const runningTests = new Set<string>();
      const testQueue = [...this.tests];

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
          await runNextTest();
        }
      };

      const initialTests = Math.min(concurrencyLimit, testQueue.length);
      await Promise.all(
        Array(initialTests)
          .fill(null)
          .map(() => runNextTest()),
      );
    },

    async runByName(name: string) {
      const test = this.tests.find((t) => t.name === name);
      if (!test) {
        console.error(`Test not found: ${name}`);
        return;
      }
      if (testConfig[name as keyof typeof testConfig] === 'skip') {
        console.log(`Skipping test: ${name}`);
        results.set(name, { name, status: 'skipped' });
        render(name, 'skipped', '-', '');
        return;
      }
      try {
        const startTime = new Date();
        results.set(name, { name, status: 'running', startTime });
        render(name, 'running', '-', '');
        console.log(`Running test: ${test.name}`);
        await test.fn();
        const endTime = new Date();
        results.set(name, { name, status: 'passed', startTime, endTime });
        render(name, 'passed', formatDuration(startTime, endTime), '');
        console.log(`✓ Test passed: ${test.name}`);
      } catch (e) {
        const error = e instanceof Error ? e.message : 'Unknown error';
        const result = results.get(name)!;
        const endTime = new Date();
        results.set(name, { ...result, status: 'failed', error, endTime });
        render(
          name,
          'failed',
          formatDuration(result.startTime, endTime),
          error,
        );
        console.error(`✗ Test failed: ${test.name}`, e);
      }
    },
  };
}
