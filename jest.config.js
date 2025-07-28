/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  displayName: 'jest',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/(src|scripts)/**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^(\.\.?\/.+)\\.jsx?$': '$1',
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  collectCoverage: false, // true on CI
  coverageDirectory: '<rootDir>/coverage',
};
