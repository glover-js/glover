// @flow
import type { RunConfig } from 'types/Config';
import type { RunResult } from 'types/Result';

import brew from './brew';
import pick from './pick';
import compose from './compose';

async function run(config: RunConfig): Promise<RunResult> {
  if (config.command === 'brew') {
    return brew(config);
  }
  if (config.command === 'pick') {
    return pick(config);
  }
  if (config.command === 'compose') {
    return compose(config);
  }
  throw new Error(`Command: ${config.command} not found`);
}

export default {
  run,
  brew,
  pick,
  compose,
};
