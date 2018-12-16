import Logger from '../src/Logger';

jest.mock('../src/LogFile.js', () =>
  jest.fn(() => ({
    write: jest.fn(),
  })),
);

function callAllLogMethods(logger) {
  ['log', 'info', 'success', 'warn', 'error', 'debug'].forEach(method => {
    logger[method](`${method}-message`);
  });
}

describe('Tests for Logger', () => {
  describe('logging', () => {
    it('formats and logs messages to the console', () => {
      const logger = new Logger({});
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      callAllLogMethods(logger);
      expect(log.mock.calls).toMatchSnapshot();
      log.mockRestore();
    });
    it('stays silent if logLevel = silent', () => {
      const logger = new Logger({ logLevel: 'silent' });
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      callAllLogMethods(logger);
      expect(log).not.toHaveBeenCalled();
      log.mockRestore();
    });
    it('logs debug messages if logLevel = debug', () => {
      const logger = new Logger({ logLevel: 'debug' });
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      callAllLogMethods(logger);
      expect(log.mock.calls).toMatchSnapshot();
      log.mockRestore();
    });
    it('does not use any symbols if useSymbols = false', () => {
      const logger = new Logger({ logLevel: 'debug', useSymbols: false });
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      callAllLogMethods(logger);
      expect(log.mock.calls).toMatchSnapshot();
      log.mockRestore();
    });
    it('does not use any colors if useColors = false', () => {
      const logger = new Logger({ logLevel: 'debug', useColors: false });
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      callAllLogMethods(logger);
      expect(log.mock.calls).toMatchSnapshot();
      log.mockRestore();
    });
  });
  describe('save entries', () => {
    it('saves all logged messages if saveEntries = true', () => {
      const logger = new Logger({ logLevel: 'silent', saveEntries: true });
      callAllLogMethods(logger);
      expect(logger.getLogEntries()).toMatchSnapshot();
    });
    it('only saves logged messages if saveEntries = true', () => {
      const logger = new Logger({ logLevel: 'silent' });
      callAllLogMethods(logger);
      expect(logger.getLogEntries()).toHaveLength(0);
    });
  });
  describe('write to logfile', () => {
    it('writes all logged messages to a logfile if writeToFile = true', () => {
      const logger = new Logger({ logLevel: 'debug', writeToFile: true });
      const write = jest.spyOn(logger._logFile, 'write'); // eslint-disable-line no-underscore-dangle
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => {});
      expect(write.mock.calls).toMatchSnapshot();
      write.mockRestore();
      log.mockRestore();
    });
    it('only writes to logfile if writeToFile = true', () => {
      const logger = new Logger({ logLevel: 'silent' });
      const write = jest.spyOn(logger._logFile, 'write'); // eslint-disable-line no-underscore-dangle
      expect(write.mock.calls).toMatchSnapshot();
      write.mockRestore();
    });
  });
  describe('.getLogEntriesOfType', () => {
    it('returns all log entries of the specified type', () => {
      const logger = new Logger({ logLevel: 'silent', saveEntries: true });
      callAllLogMethods(logger);
      expect(logger.getLogEntriesOfType('warn')).toMatchSnapshot();
    });
  });
  describe('.clearLogEntries', () => {
    it('clears all saved log entries', () => {
      const logger = new Logger({ logLevel: 'silent', saveEntries: true });
      callAllLogMethods(logger);
      expect(logger.getLogEntries()).toHaveLength(5);
      logger.clearLogEntries();
      expect(logger.getLogEntries()).toHaveLength(0);
    });
  });
  describe('.containsMessage', () => {
    it('returns true if the saved log contains the given message', () => {
      const logger = new Logger({ logLevel: 'silent', saveEntries: true });
      logger.log('a message');
      expect(logger.containsMessage('a message')).toEqual(true);
    });
    it('returns false if the saved log does not contain the given message', () => {
      const logger = new Logger({ logLevel: 'silent', saveEntries: true });
      logger.log('a message');
      expect(logger.containsMessage('some other message')).toEqual(false);
    });
  });
  describe('.getLogLevel', () => {
    it('return the log level', () => {
      const silentLogger = new Logger({ logLevel: 'silent' });
      const debugLogger = new Logger({ logLevel: 'debug' });
      const defaultLogger = new Logger();
      expect([
        silentLogger.getLogLevel(),
        debugLogger.getLogLevel(),
        defaultLogger.getLogLevel(),
      ]).toEqual(['silent', 'debug', 'default']);
    });
  });
  describe('.setLogLevel', () => {
    it('sets the log level', () => {
      const logger = new Logger({ logLevel: 'silent' });
      logger.setLogLevel('debug');
      expect(logger.getLogLevel()).toEqual('debug');
    });
  });
});
