module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
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
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@schema-types': './src/types/schema.ts',
          '@providers': './src/providers/index.ts',
          '@local-types': './src/types/index.ts',
          '@components': './src/components',
          '@hooks': './src/hooks/index.ts',
          '@graphql': './src/graphql',
          '@routes': './src/routes',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@i18n': './src/i18n',
          '@src': './src',
        },
      },
    ],
  ],
};
