import p from '../package.json';

import { createRollupConfig } from './createRollupConfig';

const buildsOptions = [
  {
    name: 'index',
    format: 'cjs',
    input: p.source,
  },
  {
    name: 'index',
    format: 'esm',
    input: p.source },
  {
    name: 'index',
    format: 'umd',
    input: p.source,
  },
];

export default buildsOptions.map(createRollupConfig);
