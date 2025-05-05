import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // Handle CSS imports (if you use CSS Modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // Handle module path aliases (adjust paths according to your tsconfig)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // The setup files to run before each test file
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    // Use ts-jest for ts/tsx files, explicitly pointing to the correct tsconfig
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      // Ensure JSX transform is recognized by ts-jest
      // Note: This might duplicate tsconfig.app.json but ensures jest sees it
      babelConfig: false, // Ensure ts-jest handles transformation
      diagnostics: {
        ignoreCodes: [151001] // Optionally ignore esModuleInterop warning if tsconfig handles it
      },
    }],
  },
  // Ignore paths
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  // Indicate whether each individual test should be reported during the run
  verbose: true,
};

export default config;
