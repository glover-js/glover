// @flow
import type { LogMessage } from 'types/Log';
import type { Path } from 'types/Path';

import os from 'os';
import fs from 'fs';
import path from 'path';

export default class LogFile {
  _filename: string;
  _dir: Path;
  _outputPath: Path;
  _outputStream: fs.WriteStream;

  constructor(outputPath: ?string) {
    this._filename = 'glover-debug.log';
    this._dir = process.cwd();
    this._outputPath = outputPath || path.join(this._dir, this._filename);
    this._outputStream = fs.createWriteStream(this._outputPath);
    this._outputStream.setDefaultEncoding('utf8');
    this._outputStream.on('error', err => this._handleError(err));
    this._ensureStreamIsWritable();
  }

  write(message: LogMessage): void {
    const timeString = new Date().toISOString();
    const lineBreak = os.EOL || '\n';
    const formattedMessage = `${timeString}: ${message} ${lineBreak}`;
    this._outputStream.write(formattedMessage);
  }

  close(): Promise<void> {
    return new Promise(resolve => {
      this._outputStream.end(resolve);
    });
  }

  _handleError(err: Error & { code?: string }): void {
    const code = err.code ? `(${err.code})` : '';
    const error: any = new Error();
    error.code = err.code;
    error.message = `Could not write log to: ${this._outputPath} (${code})`;
    throw error;
  }

  _ensureStreamIsWritable(): void {
    // Synchronously check if we will be able to write to this._outputPath
    try {
      fs.accessSync(this._outputPath, fs.constants.W_OK);
    } catch (err) {
      this._handleError(err);
    }
  }
}
