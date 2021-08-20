/*
 * Custom Babel config, overrides config in Sanity CLI
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/plugin-transform-typescript',
      {
        targets: {
          node: '10',
        },
      },
    ],
  ],
}
