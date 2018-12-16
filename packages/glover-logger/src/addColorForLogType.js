// @flow
import type { LogType, LogMessage } from 'types/Log';

import chalk from 'chalk';

export default function addColorForType(
  message: LogMessage,
  type: LogType,
): LogMessage {
  if (type === 'warn') {
    return chalk.yellow(message);
  }
  if (type === 'error') {
    return chalk.red(message);
  }
  if (type === 'info') {
    return chalk.blue(message);
  }
  if (type === 'debug') {
    return chalk.magenta(message);
  }
  if (type === 'success') {
    return chalk.green(message);
  }
  return message;
}
