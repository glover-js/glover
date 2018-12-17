// @flow
import cli from 'yargs';
import { brew, pick, compose } from './commands';
import { dryRun, silent, noPrompt, debug } from './options';
import run from '..';

export function parseArgv(argv: Array<string>): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    cli
      .scriptName('glover')
      .command(brew.cmd, brew.desc, brew.builder)
      .command(pick.cmd, pick.desc, pick.builder)
      .command(compose.cmd, compose.desc, compose.builder)
      .option(dryRun.key, dryRun.options)
      .option(silent.key, silent.options)
      .option(noPrompt.key, noPrompt.options)
      .option(debug.key, debug.options)
      .wrap(120)
      .parse(argv.slice(2), (err: any, parsedArgs: any, output: any) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          arguments: parsedArgs,
          command: parsedArgs._[0] || 'brew',
          output,
          argv,
        });
      });
  });
}

if (process.env.NODE_ENV !== 'test') {
  parseArgv(process.argv)
    .then(args => {
      if (args.output) {
        console.log(args.output); // eslint-disable-line no-console
        process.exit(0);
      }
      return run(args);
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
      process.exit(1);
    });
}
