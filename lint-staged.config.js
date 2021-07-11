module.exports = {
  '**/*.ts?(x)': () => [
    'yarn prettier:fix',
    'yarn lint:fix',
    'yarn compile',
    'yarn test',
  ],
};
