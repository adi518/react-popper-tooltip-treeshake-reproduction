// https://iamturns.com/typescript-babel/
// https://florian.ec/blog/rollup-scss-css-modules/
// https://rollupjs.org/guide/en/#big-list-of-options
// https://github.com/egoist/rollup-plugin-postcss/issues/98
// https://shipshape.io/blog/converting-a-webpack-build-to-rollup/
// https://dev.to/lukasbombach/how-to-write-a-tree-shakable-component-library-4ied

const url = require('@rollup/plugin-url');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const visualizer = require('rollup-plugin-visualizer');

const cleaner = require('rollup-plugin-cleaner');
const filesize = require('rollup-plugin-filesize');
const commonjs = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');

const { default: svgr } = require('@svgr/rollup');
const { default: babel } = require('@rollup/plugin-babel');
const { default: resolve } = require('@rollup/plugin-node-resolve');

const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  classnames: 'classnames',
};

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: pkg.name,
      format: 'umd',
      amd: { id: pkg.name },
      sourcemap: true,
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals,
    },
  ],
  external: (id) => !id.startsWith('.') && !id.startsWith('/'),
  plugins: [
    cleaner({ targets: ['dist', 'lib'] }),
    // `resolve` and `commonjs` order mustn't change!
    // see: https://github.com/rollup/rollup-plugin-commonjs/issues/201.
    // https://github.com/rollup/rollup-plugin-commonjs/issues/201#issuecomment-306581617
    resolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    url(),
    svgr(),
    json(),
    babel({
      extensions,
      exclude: ['stories'],
      babelHelpers: 'bundled',
    }),
    postcss(),
    filesize(),
    external(),
    ...[
      process.env.ANALYZE_BUNDLE
        ? visualizer({ open: true, gzipSize: true })
        : [],
    ],
  ],
};
