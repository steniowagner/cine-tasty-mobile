module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
          '@styles': './src/styles',
          '@app-types': './src/types/index.ts',
          '@hooks': './src/hooks/index.ts',
          '@providers': './src/providers/index.ts',
          '@common-components': './src/components/common/index.ts',
          '@utils': './src/utils/index.ts',
          '@navigation': './src/navigation/index.ts',
          '@screens': './src/components/screens/index.ts',
          '@i18n': './src/i18n',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
