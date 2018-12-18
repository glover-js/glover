// @flow
import type { Command } from 'types/Command';
import type { Argv } from 'types/Yargs';

const commands = {
  brew: 'brew',
  pick: 'pick',
  compose: 'compose',
};

export default function parseCommand(argv: Argv): Command {
  const [command] = argv._;
  if (commands[command]) {
    return commands[command];
  }
  if (!command) {
    return 'brew';
  }
  throw new Error(`Command: ${command} not found`);
}
