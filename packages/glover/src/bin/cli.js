// @flow
import type { Argv } from 'types/Yargs';
import type { ResolveFn, RejectFn } from 'types/Promise';
import type { RunConfig } from 'types/config';

import yargs from 'yargs';
import { brew, pick, compose } from './commands';
import { dryRun, silent, noPrompt, debug } from './options';
import run from '..';

export function parseArgv(rawArgv: Array<string>): Promise<RunConfig> {
  return new Promise((resolve: ResolveFn<RunConfig>, reject: RejectFn) => {
    yargs
      .scriptName('glover')
      .command(brew.cmd, brew.desc, brew.builder)
      .command(pick.cmd, pick.desc, pick.builder)
      .command(compose.cmd, compose.desc, compose.builder)
      .option(dryRun.key, dryRun.options)
      .option(silent.key, silent.options)
      .option(noPrompt.key, noPrompt.options)
      .option(debug.key, debug.options)
      .wrap(120)
      .parse(rawArgv.slice(2), (err: Error, argv: Argv, output: string) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          argv,
          // $FlowFixMe
          command: argv._[0] || 'brew',
          output,
          rawArgv,
        });
      });
  });
}

if (process.env.NODE_ENV !== 'test') {
  parseArgv(process.argv)
    .then((runConfig: RunConfig) => {
      if (runConfig.output) {
        console.log(runConfig.output); // eslint-disable-line no-console
        process.exit(0);
      }
      return run(runConfig);
    })
    .catch((err: Error) => {
      console.log(err); // eslint-disable-line no-console
      process.exit(1);
    });
}
