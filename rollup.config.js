import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import {uglify} from 'rollup-plugin-uglify';

const rollupOptions = {
  plugins: [
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.jsx']
    }),
    eslint({
      throwOnError: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify({
      sourcemap: true
    })
  ],
  external: [
    'react',
    '@storybook/addons',
    '@storybook/components',
    '@storybook/core-events',
    '@storybook/theming'
  ]
};

export default [{
  ...rollupOptions,
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    sourcemap: true
  }
}, {
  ...rollupOptions,
  input: 'src/register.js',
  output: {
    file: 'register.js',
    format: 'cjs',
    sourcemap: true
  }
}, {
  ...rollupOptions,
  input: 'src/registerToolbar.js',
  output: {
    file: 'registerToolbar.js',
    format: 'cjs',
    sourcemap: true
  }
}]
