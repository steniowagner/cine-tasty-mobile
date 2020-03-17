const dependenciesToBeTranspiled = [
  'react-native',
  'react-navigation',
  '@react-navigation',
  'react-native-screens',
  '@react-native-community',
  'react-native-gesture-handler',
  'react-native-vector-icons',
  'react-native-iphone-x-helper',
  'react-native-linear-gradient',
  'react-native-shimmer-placeholder',
].join('|');

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  transformIgnorePatterns: [`node_modules/(?!(${dependenciesToBeTranspiled})/)`],
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.spec.(ts|tsx)'],
};
