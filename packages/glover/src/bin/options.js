// @flow
import type { Option, Yargs } from 'types/Yargs';

export const dryRun: Option = {
  key: 'dryRun',
  options: {
    type: 'boolean',
    describe: 'Run the command without generating any files',
    default: false,
  },
};

export const silent: Option = {
  key: 'silent',
  options: {
    type: 'boolean',
    describe: 'Prevent the command from printing anything to the console',
    default: false,
  },
};

export const noPrompt: Option = {
  key: 'noPrompt',
  options: {
    type: 'boolean',
    describe: 'Prevent the command from prompting for values',
    default: false,
  },
};

export const debug: Option = {
  key: 'debug',
  options: {
    type: 'boolean',
    describe: 'Print debugging info',
    default: false,
  },
};

export function registerOptions(yargs: Yargs) {
  const options = [dryRun, silent, noPrompt, debug];
  options.map((option: Option) => yargs.option(option.key, option.options));
}
