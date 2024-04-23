import path from 'path';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.scss$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(scss)$': path.resolve(__dirname, 'src', 'theme', 'index.scss'),
    '\\.svg$': path.resolve(__dirname, 'src', 'constants', 'mocks', 'mock.ts'),
    '^@/(.*)$': path.resolve(__dirname, 'src', '$1'),
  },
};
