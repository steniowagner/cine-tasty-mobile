const dependenciesToBeTranspiled = [
  '@react-native',
  'react-native',
  '@react-native-community',
  '@react-navigation',
  'react-native-linear-gradient',
  /* 'react-navigation',
  'react-native-screens',
  'react-native-gesture-handler',
  'react-native-iphone-x-helper',
  'react-native-shimmer-placeholder',
  'react-native-status-bar-height', */
].join('|');

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  transformIgnorePatterns: [
    `node_modules/(?!(${dependenciesToBeTranspiled})/)`,
  ],
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleNameMapper: {'^@mocks/(.*)$': '<rootDir>/__mocks__/$1'},
  testEnvironment: 'jsdom',
};
