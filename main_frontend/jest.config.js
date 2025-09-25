const nextJest = require('next/jest');

// Create a Jest config that loads the Next.js config to apply SWC/Babel transforms
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Only include tests inside src to avoid accidental pickup in .next/out
  testMatch: ['**/src/**/__tests__/**/*.{test,spec}.{ts,tsx}'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = createJestConfig(customJestConfig);
