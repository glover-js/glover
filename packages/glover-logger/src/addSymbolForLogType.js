// @flow
import type { LogType, LogMessage } from 'types/Log';

const warnSymbol = '⚠';
const errorSymbol = '✖';
const infoSymbol = 'ℹ';
const successSymbol = '✔';
const debugSymbol = '[DEBUG]';

export default function getLogTypeSymbol(
  message: LogMessage,
  type: LogType,
): LogMessage {
  if (type === 'warn') {
    return `${warnSymbol}  ${message}`;
  }
  if (type === 'error') {
    return `${errorSymbol}  ${message}`;
  }
  if (type === 'info') {
    return `${infoSymbol}  ${message}`;
  }
  if (type === 'success') {
    return `${successSymbol}  ${message}`;
  }
  if (type === 'debug') {
    return `${debugSymbol}  ${message}`;
  }
  return `   ${message}`;
}
