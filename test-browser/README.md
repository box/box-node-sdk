# Box TypeScript SDK Gen Browser Test Runner

A browser-based test runner for Box TypeScript SDK, built with Next.js and Cypress.

## Features

- Run Box TypeScript SDK Gen tests in the browser in headless mode.

## Prerequisites

- Node.js (v18 or higher)
- Chrome or Firefox browser

## Installation

1. This project comes together with the Box TypeScript SDK Gen repository. To run the test runner, you need have the Box TypeScript SDK Gen repository checked out in parent directory and build it.
2. Setup the Environment Variables align with `sdkTest.config.mjs` file.
3. Install dependencies:

```bash
npm install
```

4. Run the test runner:

```bash
npm run cypress:run:all
```

## Configuration

Inside `sdkTest.config.mjs` file we have a list of tests that we need to skip as it's not supported in the browser.
