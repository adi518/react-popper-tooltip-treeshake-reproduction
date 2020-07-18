// https://www.infoq.com/news/2020/05/babel-7-10-react-treeshaking/

module.exports = {
  exclude: 'node_modules/**',
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', 'ie >= 11'],
            },
          },
        ],
        '@babel/typescript',
      ],
    },
  },
};
