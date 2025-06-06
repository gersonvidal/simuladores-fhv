/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    globals: {
      'ts-jest': {
        isolatedModules: true
      }
    }
  };  