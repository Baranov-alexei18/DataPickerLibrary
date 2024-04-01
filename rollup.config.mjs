import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';

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
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    del({ targets: 'dist/*' }),
  ],
};
