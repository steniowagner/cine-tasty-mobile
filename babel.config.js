module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
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
          components: './src/components',
          routes: './src/routes',
          config: './src/config',
          styles: './src/styles',
          utils: './src/utils',
          types: './src/types',
          i18n: './src/i18n',
        },
      },
    ],
  ],
};
