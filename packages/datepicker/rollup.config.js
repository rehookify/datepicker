import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

import p from './package.json';

function createRollupConfig({ name, format, input, tsconfig }) {
  /*
   * `.mjs` will always be treated as ES Module, check 👇
   * https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
   */
  const extName = format === 'esm' ? 'mjs' : 'js';
  const outputName = 'dist/' + [name, format, extName].join('.');

  const config = {
    input: input,
    output: {
      file: outputName,
      format: format,
      name: 'RehookifyDatepicker',
      sourcemap: true,
      globals: { react: 'React' },
      exports: 'named',
    },
    plugins: [
      copy({
        targets: [
          { src: './package.json', dest: 'dist/' },
          { src: './README.md', dest: 'dist/' },
        ],
      }),
      external(),
      typescript({
        tsconfig,
        clean: true,
        exclude: ['**/__tests__', '**/*.test.ts', '**/__mock__/*.ts'],
      }),
      format === 'umd' &&
        commonjs({
          include: /\/node_modules\//,
        }),
      format !== 'esm' &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return config;
}

const buildsOptions = [
  {
    name: 'index',
    format: 'cjs',
    input: p.source,
  },
  {
    name: 'index',
    format: 'esm',
    input: p.source,
  },
  {
    name: 'index',
    format: 'umd',
    input: p.source,
  },
];

export default buildsOptions.map(createRollupConfig);
