import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import glover from './packages/glover/package.json';
import gloverJest from './packages/glover-jest/package.json';
import gloverLogger from './packages/glover-logger/package.json';
import gloverMock from './packages/glover-mock/package.json';
import gloverResolver from './packages/glover-resolver/package.json';

export default [
  {
    // glover
    input: 'packages/glover/src/index.js',
    output: [
      { file: glover.main, format: 'cjs', dir: 'packages/glover/dist' },
      { file: glover.module, format: 'es', dir: 'packages/glover/dist' }
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**']
      }),
      commonjs()
    ]
  },
  {
    // glover (cli)
    input: 'packages/glover/src/bin/cli.js',
    output: [{ file: glover.bin.glover, format: 'cjs', dir: 'packages/glover/dist/cli' }],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      commonjs()
    ],
    external: ['yargs']
  },
  {
    // glover-jest
    input: 'packages/glover-jest/src/index.js',
    output: [
      { file: gloverJest.main, format: 'cjs', dir: 'packages/glover-jest/dist' },
      { file: gloverJest.module, format: 'es', dir: 'packages/glover-jest/dist' }
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**']
      }),
      commonjs()
    ]
  },
  {
    // glover-logger
    input: 'packages/glover-logger/src/index.js',
    output: [
      { file: gloverLogger.main, format: 'cjs', dir: 'packages/glover-logger/dist' },
      { file: gloverLogger.module, format: 'es', dir: 'packages/glover-logger/dist' }
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**']
      }),
      commonjs()
    ]
  },
  {
    // glover-mock
    input: 'packages/glover-mock/src/index.js',
    output: [
      { file: gloverMock.main, format: 'cjs', dir: 'packages/glover-mock/dist' },
      { file: gloverMock.module, format: 'es', dir: 'packages/glover-mock/dist' }
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**']
      }),
      commonjs()
    ]
  },
  {
    // glover-resolver
    input: 'packages/glover-resolver/src/index.js',
    output: [
      { file: gloverResolver.main, format: 'cjs', dir: 'packages/glover-resolver/dist' },
      { file: gloverResolver.module, format: 'es', dir: 'packages/glover-resolver/dist' }
    ],
    plugins: [
      babel({
        exclude: ['**/node_modules/**']
      }),
      commonjs()
    ]
  }
];
