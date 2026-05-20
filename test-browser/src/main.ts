import { setEnvVar } from 'box-node-sdk/internal';
import { setupExpect } from './utils/expect';
import { createTestRegistry } from './utils/testRegistry';
import { testConfig } from '../sdkTest.config.mjs';

declare global {
  interface Window {
    testRegistry: ReturnType<typeof createTestRegistry>;
    test: (name: string, fn: () => Promise<void>) => void;
  }
}

const statusEl = document.getElementById('status')!;
const tbodyEl = document.getElementById('test-results')!;

function updateStatus() {
  const rows = tbodyEl.querySelectorAll('tr');
  let passed = 0,
    failed = 0,
    running = 0,
    skipped = 0;
  rows.forEach((row) => {
    const status = row.dataset.status;
    if (status === 'passed') passed++;
    else if (status === 'failed') failed++;
    else if (status === 'running') running++;
    else if (status === 'skipped') skipped++;
  });
  const total = rows.length;
  statusEl.textContent = `Test Results: ${passed}/${total} passed, ${running} running, ${failed} failed, ${skipped} skipped`;
}

function renderRow(
  name: string,
  status: string,
  duration: string,
  error: string
) {
  let row = tbodyEl.querySelector(
    `tr[data-test="${CSS.escape(name)}"]`
  ) as HTMLTableRowElement | null;
  if (!row) {
    row = document.createElement('tr');
    row.dataset.test = name;
    tbodyEl.appendChild(row);
  }
  row.dataset.status = status;
  row.innerHTML = `
    <td>${name}</td>
    <td class="status-${status}">${status.toUpperCase()}</td>
    <td>${duration}</td>
    <td class="error-cell">${error}</td>
    <td><button ${status === 'running' ? 'disabled' : ''}>Run</button></td>
  `;
  row.querySelector('button')!.addEventListener('click', () => {
    window.testRegistry.runByName(name);
  });
  updateStatus();
}

window.testRegistry = createTestRegistry(renderRow);

window.test = (name: string, fn: () => Promise<void>) => {
  window.testRegistry.register(name, fn);
  if (testConfig[name as keyof typeof testConfig] === 'skip') {
    console.log(`Skipping test: ${name}`);
    renderRow(name, 'skipped', '-', '');
  }
};

setupExpect();

async function init() {
  const res = await fetch('/api/env');
  const data = await res.json();
  for (const [key, value] of Object.entries(data)) {
    setEnvVar(key, value as string);
  }

  try {
    await import('./utils/importTests');
    setTimeout(() => {
      window.testRegistry.runAll();
    }, 3000);
  } catch (e) {
    statusEl.textContent =
      e instanceof Error ? e.message : 'Failed to import test files';
  }
}

init();
