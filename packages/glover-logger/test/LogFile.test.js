import os from 'os';
import fs from 'fs';
import LogFile from '../src/LogFile';

jest.mock('fs', () => {
  const MemoryFs = require('memory-fs'); // eslint-disable-line global-require
  const memoryFs = new MemoryFs();
  memoryFs.constants = { W_OK: 1 };
  memoryFs.accessSync = () => true;
  return memoryFs;
});

describe('Tests for LogFile', () => {
  describe('constructor', () => {
    it('throws an error when providing a invalid output path', () => {
      const accessSync = jest.spyOn(fs, 'accessSync');
      accessSync.mockImplementation(() => {
        throw new Error(); // Fake that the path cannot be accessed
      });
      const outputPath = '/not-existing-path/test.log';
      expect(() => new LogFile(outputPath)).toThrowErrorMatchingSnapshot();
      accessSync.mockRestore();
    });
  });
  describe('.write', () => {
    it('writes the given message to the logfile', () => {
      const EOL = os.EOL || '\n';
      const toISOString = jest.spyOn(Date.prototype, 'toISOString');
      toISOString.mockImplementation(() => '[DATE]');
      const outputDir = '/log';
      const outputPath = '/log/test.log';
      fs.mkdirpSync(outputDir); // Create the output directory
      const logFile = new LogFile(outputPath);
      logFile.write('[TEST] message');
      logFile.close();
      const actual = fs.readFileSync(outputPath);
      expect(actual.toString('utf8')).toEqual(`[DATE]: [TEST] message ${EOL}`);
    });
  });
});
