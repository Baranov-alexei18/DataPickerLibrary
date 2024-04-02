/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    scss({
      output: 'dist/bundle.css',
      failOnError: true,
      modules: true,
      includePaths: [path.resolve(__dirname, './src')],
      processor: (css) => require('postcss')([require('cssnano')()])
        .process(css)
        .then((result) => result.css),
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    del({ targets: 'dist/*' }),
    terser(),
  ],
};
