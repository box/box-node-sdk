/**
 * Test runner for test-node
 *
 * This script:
 * 1. Finds all test directories in the current folder
 * 2. For each test directory:
 *    - Cleans up previous runs (removes node_modules and package-lock.json)
 *    - Installs dependencies with npm install
 *    - Runs the test with npm start
 * 3. Reports results for each test
 */

const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

// Promisify exec for better async/await support
const execAsync = promisify(exec);

/**
 * Colors for console output
 */
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Utility functions for colored console output
 */
const log = {
  info: (message) =>
    console.log(`${colors.blue}[INFO]${colors.reset} ${message}`),
  success: (message) =>
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`),
  warning: (message) =>
    console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`),
  error: (message) =>
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`),
  step: (message) =>
    console.log(`${colors.cyan}[STEP]${colors.reset} ${message}`),
};

/**
 * Clean up previous test artifacts
 * @param {string} testDir - Path to the test directory
 */
async function cleanupTestDir(testDir) {
  const nodeModulesPath = path.join(testDir, 'node_modules');
  const packageLockPath = path.join(testDir, 'package-lock.json');

  try {
    // Remove node_modules if it exists
    if (fs.existsSync(nodeModulesPath)) {
      log.step(`Removing node_modules from ${path.basename(testDir)}`);
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    }

    // Remove package-lock.json if it exists
    if (fs.existsSync(packageLockPath)) {
      log.step(`Removing package-lock.json from ${path.basename(testDir)}`);
      fs.unlinkSync(packageLockPath);
    }

    log.success(`Cleanup completed for ${path.basename(testDir)}`);
  } catch (error) {
    log.warning(
      `Cleanup failed for ${path.basename(testDir)}: ${error.message}`,
    );
  }
}

/**
 * Install dependencies for a test directory
 * @param {string} testDir - Path to the test directory
 * @returns {Promise<boolean>} - Success status
 */
async function installDependencies(testDir) {
  const testName = path.basename(testDir);

  try {
    log.step(`Installing dependencies for ${testName}...`);

    const { stdout, stderr } = await execAsync('npm install', {
      cwd: testDir,
      timeout: 60000, // 60 second timeout
    });

    log.success(`Dependencies installed for ${testName}`);

    // Log any warnings from npm install
    if (stderr && stderr.trim()) {
      log.warning(`npm install warnings for ${testName}:\n${stderr}`);
    }

    return true;
  } catch (error) {
    log.error(
      `Failed to install dependencies for ${testName}: ${error.message}`,
    );
    return false;
  }
}

/**
 * Run the test for a specific directory
 * @param {string} testDir - Path to the test directory
 * @returns {Promise<boolean>} - Success status
 */
async function runTestScript(testDir) {
  const testName = path.basename(testDir);

  try {
    log.step(`Running test script for ${testName}...`);

    const { stdout, stderr } = await execAsync('npm start', {
      cwd: testDir,
      timeout: 30000, // 30 second timeout
    });

    // Log the output from the test
    if (stdout && stdout.trim()) {
      console.log(
        `\n${colors.cyan}--- Output from ${testName} ---${colors.reset}`,
      );
      console.log(stdout.trim());
      console.log(
        `${colors.cyan}--- End of ${testName} output ---${colors.reset}\n`,
      );
    }

    log.success(`Test completed successfully for ${testName}`);
    return true;
  } catch (error) {
    log.error(`Test failed for ${testName}: ${error.message}`);

    // Log stderr if available
    if (error.stderr && error.stderr.trim()) {
      console.log(
        `\n${colors.red}--- Error output from ${testName} ---${colors.reset}`,
      );
      console.log(error.stderr.trim());
      console.log(
        `${colors.red}--- End of ${testName} error output ---${colors.reset}\n`,
      );
    }

    return false;
  }
}

/**
 * Run a complete test for a directory (cleanup, install, run)
 * @param {string} testDir - Path to the test directory
 * @returns {Promise<boolean>} - Success status
 */
async function runCompleteTest(testDir) {
  const testName = path.basename(testDir);

  log.info(`\n${'='.repeat(50)}`);
  log.info(`Starting test: ${testName}`);
  log.info(`${'='.repeat(50)}`);

  try {
    // Step 1: Cleanup
    await cleanupTestDir(testDir);

    // Step 2: Install dependencies
    const installSuccess = await installDependencies(testDir);
    if (!installSuccess) {
      log.error(
        `Skipping test execution for ${testName} due to dependency installation failure`,
      );
      return false;
    }

    // Step 3: Run test
    const testSuccess = await runTestScript(testDir);

    if (testSuccess) {
      log.success(`All steps completed successfully for ${testName}`);
    } else {
      log.error(`Test execution failed for ${testName}`);
    }

    return testSuccess;
  } catch (error) {
    log.error(`Unexpected error running test ${testName}: ${error.message}`);
    return false;
  }
}

/**
 * Discover all test directories in the current folder
 * @returns {string[]} - Array of test directory paths
 */
function discoverTestDirectories() {
  try {
    const entries = fs.readdirSync(__dirname);
    const testDirs = entries
      .map((entry) => path.join(__dirname, entry))
      .filter((fullPath) => {
        try {
          return fs.statSync(fullPath).isDirectory();
        } catch {
          return false;
        }
      });

    log.info(
      `Found ${testDirs.length} test directories: ${testDirs.map((dir) => path.basename(dir)).join(', ')}`,
    );
    return testDirs;
  } catch (error) {
    log.error(`Failed to discover test directories: ${error.message}`);
    return [];
  }
}

/**
 * Main function to run all tests
 */
async function main() {
  log.info('Starting test-node runner...');

  const testDirectories = discoverTestDirectories();

  if (testDirectories.length === 0) {
    log.warning('No test directories found. Exiting.');
    return;
  }

  const results = [];

  // Run tests sequentially to avoid conflicts
  for (const testDir of testDirectories) {
    const success = await runCompleteTest(testDir);
    results.push({
      name: path.basename(testDir),
      success,
    });
  }

  // Print summary
  log.info('\n' + '='.repeat(60));
  log.info('TEST SUMMARY');
  log.info('='.repeat(60));

  const passed = results.filter((r) => r.success).length;
  const total = results.length;

  results.forEach((result) => {
    const status = result.success
      ? `${colors.green}PASSED${colors.reset}`
      : `${colors.red}FAILED${colors.reset}`;
    console.log(`  ${result.name}: ${status}`);
  });

  console.log(
    `\nTotal: ${total}, Passed: ${passed}, Failed: ${total - passed}`,
  );

  if (passed === total) {
    log.success('All tests passed! 🎉');
    process.exit(0);
  } else {
    log.error(`${total - passed} test(s) failed`);
    process.exit(1);
  }
}

// Run the main function and handle any uncaught errors
main().catch((error) => {
  log.error(`Uncaught error in main: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
