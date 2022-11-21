import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export function createRollupConfig({ name, format, input, tsconfig }) {
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
      sourcemaps(),
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
