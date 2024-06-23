const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1"
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

module.exports = createJestConfig(config);
