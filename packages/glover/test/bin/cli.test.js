import { parseArgv } from '../../src/bin/cli';
import { version } from '../../package.json';

describe('Tests for cli', () => {
  describe('command: brew', () => {
    it('defaults to brew', async () => {
      const { command } = await parseArgv(['./', './', 'recipe-test']);
      expect(command).toEqual('brew');
    });
    it('can be invoked with brew', async () => {
      const { command } = await parseArgv(['./', './', 'brew', 'recipe-test']);
      expect(command).toEqual('brew');
    });
    it('handles arguments to the recipe', async () => {
      const args = await parseArgv([
        './',
        './',
        'brew',
        'recipe-test',
        '--title',
        'example',
        '--license',
        'MIT',
      ]);
      expect(args.arguments.title).toEqual('example');
      expect(args.arguments.license).toEqual('MIT');
    });
    it('handles the --skipInstall flag', async () => {
      const argsA = await parseArgv([
        './',
        './',
        'recipe-test',
        '--skipInstall',
      ]);
      const argsB = await parseArgv(['./', './', 'recipe-test']);
      expect(argsA.arguments.skipInstall).toEqual(true);
      expect(argsB.arguments.skipInstall).toEqual(false);
    });
    it('handles the --skipIngredient flag', async () => {
      const argsA = await parseArgv([
        './',
        './',
        'recipe-test',
        '--skipIngredient',
        'a',
      ]);
      const argsB = await parseArgv([
        './',
        './',
        'recipe-test',
        '--skipIngredient',
        'a',
        'b',
        'c',
      ]);
      const argsC = await parseArgv(['./', './', 'recipe-test']);
      expect(argsA.arguments.skipIngredient).toEqual(['a']);
      expect(argsB.arguments.skipIngredient).toEqual(['a', 'b', 'c']);
      expect(argsC.arguments.skipIngredient).toEqual([]);
    });
    it('handles the --skipStep flag', async () => {
      const argsA = await parseArgv([
        './',
        './',
        'recipe-test',
        '--skipStep',
        'a',
      ]);
      const argsB = await parseArgv([
        './',
        './',
        'recipe-test',
        '--skipStep',
        'a',
        'b',
        'c',
      ]);
      const argsC = await parseArgv(['./', './', 'recipe-test']);
      expect(argsA.arguments.skipStep).toEqual(['a']);
      expect(argsB.arguments.skipStep).toEqual(['a', 'b', 'c']);
      expect(argsC.arguments.skipStep).toEqual([]);
    });
  });
  describe('command: pick', () => {
    it('handles the ingredients argument', async () => {
      const argsA = await parseArgv(['./', './', 'pick', 'index.html']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', 'b']);
      expect(argsA.command).toEqual('pick');
      expect(argsA.arguments.ingredients).toEqual(['index.html']);
      expect(argsB.arguments.ingredients).toEqual(['a', 'b']);
    });
    it('handles additional arguments to the picked ingredient', async () => {
      const args = await parseArgv(['./', './', 'pick', 'a', '--title', 'b']);
      expect(args.arguments.ingredients).toEqual(['a']);
      expect(args.arguments.title).toEqual('b');
    });
    it('handles the --prompt flag', async () => {
      const argsA = await parseArgv(['./', './', 'pick', 'a', '--prompt']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--p']);
      const argsC = await parseArgv(['./', './', 'pick', 'a']);
      expect(argsA.arguments.prompt).toEqual(true);
      expect(argsB.arguments.prompt).toEqual(true);
      expect(argsC.arguments.prompt).toEqual(false);
    });
    it('handles the --output flag', async () => {
      const argsA = await parseArgv(['./', './', 'pick', 'a', '--output', 'p']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--o', 'p']);
      const argsC = await parseArgv(['./', './', 'pick', 'a']);
      expect(argsA.arguments.output).toEqual('p');
      expect(argsB.arguments.output).toEqual('p');
      expect(argsC.arguments.output).toEqual(process.cwd());
    });
  });
  describe('command: compose', () => {
    it('handles the name argument', async () => {
      const args = await parseArgv(['./', './', 'compose', 'recipe-name']);
      expect(args.command).toEqual('compose');
      expect(args.arguments.name).toEqual('recipe-name');
    });
    it('handles the ingredients argument', async () => {
      const argsA = await parseArgv(['./', './', 'compose', 'name', 'a']);
      const argsB = await parseArgv(['./', './', 'compose', 'name', 'a', 'b']);
      expect(argsA.arguments.ingredients).toEqual(['a']);
      expect(argsB.arguments.ingredients).toEqual(['a', 'b']);
    });
    it('handles the --extend flag', async () => {
      const argsA = await parseArgv([
        './',
        './',
        'compose',
        'name',
        '--extend',
        'a',
      ]);
      const argsB = await parseArgv([
        './',
        './',
        'compose',
        'name',
        '--e',
        'a',
        'b',
      ]);
      const argsC = await parseArgv(['./', './', 'compose', 'name']);
      expect(argsA.arguments.extend).toEqual(['a']);
      expect(argsB.arguments.extend).toEqual(['a', 'b']);
      expect(argsC.arguments.extend).toEqual([]);
    });
    it('handles the --output flag', async () => {
      const argsA = await parseArgv([
        './',
        './',
        'compose',
        'name',
        '--output',
        'p',
      ]);
      const argsB = await parseArgv(['./', './', 'compose', 'name', '-o', 'p']);
      const argsC = await parseArgv(['./', './', 'compose', 'name']);
      expect(argsA.arguments.output).toEqual('p');
      expect(argsB.arguments.output).toEqual('p');
      expect(argsC.arguments.output).toEqual(process.cwd());
    });
  });
  describe('global options', () => {
    it('handles the --dryRun flag', async () => {
      const argsA = await parseArgv(['./', './', 'recipe-test', '--dryRun']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--dryRun']);
      const argsC = await parseArgv(['./', './', 'compose', 'b', '--dryRun']);
      expect(argsA.arguments.dryRun).toEqual(true);
      expect(argsB.arguments.dryRun).toEqual(true);
      expect(argsC.arguments.dryRun).toEqual(true);
    });
    it('handles the --silent flag', async () => {
      const argsA = await parseArgv(['./', './', 'recipe-test', '--silent']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--silent']);
      const argsC = await parseArgv(['./', './', 'compose', 'b', '--silent']);
      expect(argsA.arguments.silent).toEqual(true);
      expect(argsB.arguments.silent).toEqual(true);
      expect(argsC.arguments.silent).toEqual(true);
    });
    it('handles the --noPrompt flag', async () => {
      const argsA = await parseArgv(['./', './', 'recipe-test', '--noPrompt']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--noPrompt']);
      const argsC = await parseArgv(['./', './', 'compose', 'b', '--noPrompt']);
      expect(argsA.arguments.noPrompt).toEqual(true);
      expect(argsB.arguments.noPrompt).toEqual(true);
      expect(argsC.arguments.noPrompt).toEqual(true);
    });
    it('handles the --debug flag', async () => {
      const argsA = await parseArgv(['./', './', 'recipe-test', '--debug']);
      const argsB = await parseArgv(['./', './', 'pick', 'a', '--debug']);
      const argsC = await parseArgv(['./', './', 'compose', 'b', '--debug']);
      expect(argsA.arguments.debug).toEqual(true);
      expect(argsB.arguments.debug).toEqual(true);
      expect(argsC.arguments.debug).toEqual(true);
    });
  });
  describe('--help', () => {
    it('generates usage information', async () => {
      const { output } = await parseArgv(['./', './', '--help']);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for brew command', async () => {
      const { output } = await parseArgv(['path', 'path', 'brew', '--help']);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for pick command', async () => {
      const { output } = await parseArgv(['path', 'path', 'pick', '--help']);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for compose command', async () => {
      const { output } = await parseArgv(['path', 'path', 'compose', '--help']);
      expect(output).toMatchSnapshot();
    });
  });
  describe('--version', () => {
    it('generates version information', async () => {
      const { output } = await parseArgv(['path', 'path', '--version']);
      expect(output).toEqual(version);
    });
  });
});
