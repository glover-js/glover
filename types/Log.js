// @flow
export type LogLevel = 'default' | 'debug' | 'silent';

export type LogType =
  | 'default'
  | 'info'
  | 'success'
  | 'debug'
  | 'warn'
  | 'error';

export type LogMessage = string;

export type LogEntry = {|
  message: LogMessage,
  type: LogType,
|};

export type LogConfig = {
  logLevel: LogLevel,
  useSymbols: boolean,
  useColors: boolean,
  saveEntries: boolean,
  writeToFile: boolean,
  logFilePath: string,
};
