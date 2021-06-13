module.exports = {
  '**/*.ts?(x)': () => [
    "prettier '**/*.+(ts|js|tsx)' --write",
    'eslint --fix --ext .js,.ts,.tsx .',
    'tsc -p tsconfig.json --noEmit',
    'jest',
  ],
};
