/* eslint-disable no-console */
const { Logger } = require('../dist/index.cjs');

// Default
console.log('Default:');
const defaultLogger = new Logger({});
defaultLogger.log('... some message');
defaultLogger.info('... some info');
defaultLogger.success('... some success message');
defaultLogger.warn('... some warning');
defaultLogger.error('... some error');
defaultLogger.debug('this will not show');

// Debug
console.log('\n');
console.log('Debug:');
const debugLogger = new Logger({ logLevel: 'debug' });
debugLogger.debug('some value');
debugLogger.debug('some other value');
debugLogger.info('and some info');

// Silent
console.log('\n');
console.log('Silent:');
const silentLogger = new Logger({ logLevel: 'silent', saveEntries: true });
silentLogger.log('this will not show');
silentLogger.info('this will not show');
silentLogger.success('this will not show');
silentLogger.warn('this will not show');
silentLogger.error('this will not show');
silentLogger.debug('this will not show');
const entries = silentLogger.getLogEntries();
console.log('Nothing was logged above, but everything was saved..');
console.log(`..and '${entries[0].message}' was logged ${entries.length} times`);

// Disabled colors and symbols
console.log('\n');
console.log('No color/symbols:');
const boringLogger = new Logger({ useColors: false, useSymbols: false });
boringLogger.log('... some message');
boringLogger.info('... some info');
boringLogger.success('... some success message');
boringLogger.warn('... some warning');
boringLogger.error('... some error');
boringLogger.debug('this will not show');

// Write to file
console.log('\n');
console.log('Write to file:');
const fileLogger = new Logger({ writeToFile: true, logLevel: 'debug' });
fileLogger.log('... some message');
fileLogger.info('... some info');
fileLogger.success('... some success message');
fileLogger.warn('... some warning');
fileLogger.error('... some error');
fileLogger.debug('... some debug message');
