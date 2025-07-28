'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { setEnvVar } from 'box-typescript-sdk-gen/internal/utils';
import { setupExpect } from '@/utils/expect';
import { TestResult, createTestRegistry } from '@/utils/testRegistry';
import { testConfig } from '@/../sdkTest.config.mjs';

declare global {
  interface Window {
    testRegistry: ReturnType<typeof createTestRegistry>;
    test: (name: string, fn: () => Promise<void>) => void;
  }
}

export default function Home() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [error, setError] = useState<string>();

  const registerTestMethod = () => {
    window.testRegistry = createTestRegistry(setTestResults, setError);
    // @ts-expect-error - Ignore Mocha TestFunction type conflict
    window.test = async (name: string, fn: () => Promise<void>) => {
      window.testRegistry.register(name, fn);
      if (testConfig[name as keyof typeof testConfig] === 'skip') {
        console.log(`Skipping test: ${name}`);
        setTestResults((prev) =>
          prev.map((r) => (r.name === name ? { ...r, status: 'skipped' } : r)),
        );
      }
    };
  };

  const setupEnvironment = async () => {
    await fetch('/api/env')
      .then((res) => res.json())
      .then((data) => {
        for (const [key, value] of Object.entries(data)) {
          setEnvVar(key, value as string);
        }
      });
  };

  useEffect(() => {
    registerTestMethod();
    setupExpect();
    setupEnvironment().then(async () => {
      try {
        await import('../utils/importTests');
        setTimeout(() => {
          window.testRegistry.runAll();
        }, 3000);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Failed to import test files',
        );
      }
    });
  }, []);

  // Add new useEffect to update test results label
  useEffect(() => {
    const passed = testResults.filter((r) => r.status === 'passed').length;
    const failed = testResults.filter((r) => r.status === 'failed').length;
    const running = testResults.filter((r) => r.status === 'running').length;
    const skipped = testResults.filter((r) => r.status === 'skipped').length;
    const total = testResults.length;
    setError(
      `Test Results: ${passed}/${total} passed, ${running} running, ${failed} failed, ${skipped} skipped`,
    );
  }, [testResults]);

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      case 'running':
        return 'orange';
      case 'skipped':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatDuration = (startTime?: Date, endTime?: Date) => {
    if (!startTime || !endTime) return '-';
    const duration = endTime.getTime() - startTime.getTime();
    return `${duration}ms`;
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Test Results</h1>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            Error: {error}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px' }}>Test Name</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Duration</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Error</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map((result, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{result.name}</td>
                <td
                  style={{
                    padding: '8px',
                    color: getStatusColor(result.status),
                  }}
                >
                  {result.status.toUpperCase()}
                </td>
                <td style={{ padding: '8px' }}>
                  {formatDuration(result.startTime, result.endTime)}
                </td>
                <td style={{ padding: '8px', color: 'red' }}>{result.error}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => window.testRegistry.runByName(result.name)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    disabled={result.status === 'running'}
                  >
                    Run
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
