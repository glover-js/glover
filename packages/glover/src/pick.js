// @flow
import type { RunConfig } from 'types/Config';
import type { RunResult } from 'types/Result';

export default async function pick(config: RunConfig): Promise<RunResult> {
  return { command: config.command };
}
