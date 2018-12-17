// @flow
import type { Command } from 'types/Command';
import type { Argv } from 'types/Yargs';

export type RunConfig = {
  argv: Argv,
  command: Command,
  output: string,
  rawArgv: Array<string>,
};
