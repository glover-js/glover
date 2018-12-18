// @flow
import type { Command } from 'types/Command';
import type { Argv } from 'types/Yargs';

import CommandNotFoundError from './CommandNotFoundError';

const commands = {
  brew: 'brew',
  pick: 'pick',
  compose: 'compose',
};

export default function parseCommand(
  argv: Argv,
  rawArgv: Array<string>,
): Command {
  const [command] = argv._;
  if (commands[command]) {
    return commands[command];
  }
  if (!command) {
    return 'brew';
  }
  throw new CommandNotFoundError(rawArgv[2]);
}
