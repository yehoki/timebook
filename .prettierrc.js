module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@progwise/(.*)$', '^[./]'],
  importOrderSeparation: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}
