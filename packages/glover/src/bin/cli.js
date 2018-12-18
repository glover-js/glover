// @flow
import type { Argv } from 'types/Yargs';
import type { ResolveFn, RejectFn } from 'types/Promise';
import type { RunConfig } from 'types/config';
import type { Command } from 'types/Command';

import yargs from 'yargs';
import { registerCommands } from './commands';
import { registerOptions } from './options';
import glover from '..';
import parseCommand from '../utils/parseCommand';

export function parseArgv(rawArgv: Array<string>): Promise<RunConfig> {
  return new Promise((resolve: ResolveFn<RunConfig>, reject: RejectFn) => {
    registerCommands(yargs);
    registerOptions(yargs);
    yargs.scriptName('glover');
    yargs.wrap(120);
    yargs.parse(rawArgv.slice(2), (err: Error, argv: Argv, output: string) => {
      const command: Command = parseCommand(argv);
      if (err) {
        return reject(err);
      }
      return resolve({
        argv,
        command,
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
      return glover.run(runConfig);
    })
    .catch((err: Error) => {
      console.log(err); // eslint-disable-line no-console
      process.exit(1);
    });
}
