// @flow
import type {
  LogLevel,
  LogEntry,
  LogType,
  LogMessage,
  LogConfig,
} from 'types/Log';

import addColorForLogType from './addColorForLogType';
import addSymbolForLogType from './addSymbolForLogType';
import LogFile from './LogFile';

export default class Logger {
  _logLevel: LogLevel;
  _logEntries: Array<LogEntry>;
  _useSymbols: boolean;
  _useColors: boolean;
  _saveEntries: boolean;
  _writeToFile: boolean;
  _logFile: LogFile;

  constructor({
    logLevel = 'default',
    useSymbols = true,
    useColors = true,
    saveEntries = false,
    writeToFile = false,
    logFilePath,
  }: LogConfig = {}) {
    this._logLevel = logLevel;
    this._logEntries = [];
    this._useSymbols = useSymbols;
    this._useColors = useColors;
    this._saveEntries = saveEntries;
    this._writeToFile = writeToFile;
    this._logFile = new LogFile(logFilePath);
  }

  log(message: LogMessage): void {
    this._printAndSave(message, 'default');
  }

  info(message: LogMessage): void {
    this._printAndSave(message, 'info');
  }

  success(message: LogMessage): void {
    this._printAndSave(message, 'success');
  }

  warn(message: LogMessage): void {
    this._printAndSave(message, 'warn');
  }

  error(message: LogMessage): void {
    this._printAndSave(message, 'error');
  }

  debug(message: LogMessage): void {
    if (this._logLevel !== 'debug') {
      return;
    }
    this._printAndSave(message, 'debug');
  }

  getLogLevel(): LogLevel {
    return this._logLevel;
  }

  setLogLevel(logLevel: LogLevel): void {
    this._logLevel = logLevel;
  }

  getLogEntries(): Array<LogEntry> {
    return this._logEntries;
  }

  getLogEntriesOfType(type: LogType): Array<LogEntry> {
    return this._logEntries.filter(entry => entry.type === type);
  }

  clearLogEntries(): void {
    this._logEntries = [];
  }

  containsMessage(message: LogMessage): boolean {
    return this._logEntries.findIndex(entry => entry.message === message) > -1;
  }

  _printAndSave(message: LogMessage, type: LogType): void {
    if (this._logLevel !== 'silent') {
      const withSymbol = this._useSymbols
        ? addSymbolForLogType(message, type)
        : message;
      const withColor = this._useColors
        ? addColorForLogType(withSymbol, type)
        : withSymbol;
      console.log(withColor); // eslint-disable-line no-console
    }
    if (this._saveEntries) {
      this._logEntries.push({ message, type });
    }
    if (this._writeToFile) {
      this._logFile.write(`[${type}] ${message}`);
    }
  }
}
