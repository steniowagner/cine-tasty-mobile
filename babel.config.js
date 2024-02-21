module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    ['@babel/plugin-transform-flow-strip-types', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': ['./src'],
          '@styles': './src/styles',
          '@app-types': './src/types/index.ts',
          '@schema-types': './src/types/schema.ts',
          '@hooks': './src/hooks/index.ts',
          '@providers': './src/providers/index.ts',
          '@common-components': './src/components/common/index.ts',
          '@utils': './src/utils/index.ts',
          '@navigation': './src/navigation/index.ts',
          '@stacks': './src/components/stacks/index.ts',
          '@i18n': './src/i18n',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
