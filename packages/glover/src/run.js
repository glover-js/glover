// @flow
import type { RunConfig } from 'types/Config';
import type { Command } from 'types/Command';

export default async function run(config: RunConfig): Promise<Command> {
  return config.command;
}
