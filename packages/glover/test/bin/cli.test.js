import { parseArgv } from '../../src/bin/cli';
import { version } from '../../package.json';

describe('Tests for cli', () => {
  describe('command: brew', () => {
    it('defaults to brew', async () => {
      const input = ['', '', 'recipe-test'];
      const { command } = await parseArgv(input);
      expect(command).toEqual('brew');
    });
    it('can be invoked with brew', async () => {
      const input = ['', '', 'brew', 'recipe-test'];
      const { command } = await parseArgv(input);
      expect(command).toEqual('brew');
    });
    it('handles arguments to the recipe', async () => {
      const input = ['', '', 'brew', 'recipe-test', '--a', 'b', '--c', 'd'];
      const { argv } = await parseArgv(input);
      expect(argv.a).toEqual('b');
      expect(argv.c).toEqual('d');
    });
    it('handles the --skipInstall flag', async () => {
      const inputA = ['', '', 'recipe-test', '--skipInstall'];
      const inputB = ['', '', 'recipe-test'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      expect(configA.argv.skipInstall).toEqual(true);
      expect(configB.argv.skipInstall).toEqual(false);
    });
    it('handles the --skipIngredient flag', async () => {
      const inputA = ['', '', 'recipe-test', '--skipIngredient', 'a'];
      const inputB = ['', '', 'recipe-test', '--skipIngredient', 'a', 'b'];
      const inputC = ['', '', 'recipe-test'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.skipIngredient).toEqual(['a']);
      expect(configB.argv.skipIngredient).toEqual(['a', 'b']);
      expect(configC.argv.skipIngredient).toEqual([]);
    });
    it('handles the --skipStep flag', async () => {
      const inputA = ['', '', 'recipe-test', '--skipStep', 'a'];
      const inputB = ['', '', 'recipe-test', '--skipStep', 'a', 'b'];
      const inputC = ['', '', 'recipe-test'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.skipStep).toEqual(['a']);
      expect(configB.argv.skipStep).toEqual(['a', 'b']);
      expect(configC.argv.skipStep).toEqual([]);
    });
  });
  describe('command: pick', () => {
    it('handles the ingredients argument', async () => {
      const inputA = ['', '', 'pick', 'index.html'];
      const inputB = ['', '', 'pick', 'a', 'b'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      expect(configA.command).toEqual('pick');
      expect(configA.argv.ingredients).toEqual(['index.html']);
      expect(configB.argv.ingredients).toEqual(['a', 'b']);
    });
    it('handles additional arguments to the picked ingredient', async () => {
      const input = ['', '', 'pick', 'a', '--title', 'b'];
      const { argv } = await parseArgv(input);
      expect(argv.ingredients).toEqual(['a']);
      expect(argv.title).toEqual('b');
    });
    it('handles the --prompt flag', async () => {
      const inputA = ['', '', 'pick', 'a', '--prompt'];
      const inputB = ['', '', 'pick', 'a', '--p'];
      const inputC = ['', '', 'pick', 'a'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.prompt).toEqual(true);
      expect(configB.argv.prompt).toEqual(true);
      expect(configC.argv.prompt).toEqual(false);
    });
    it('handles the --output flag', async () => {
      const inputA = ['', '', 'pick', 'a', '--output', 'p'];
      const inputB = ['', '', 'pick', 'a', '--o', 'p'];
      const inputC = ['', '', 'pick', 'a'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.output).toEqual('p');
      expect(configB.argv.output).toEqual('p');
      expect(configC.argv.output).toEqual('cwd');
    });
  });
  describe('command: compose', () => {
    it('handles the name argument', async () => {
      const input = ['', '', 'compose', 'recipe-name'];
      const { command, argv } = await parseArgv(input);
      expect(command).toEqual('compose');
      expect(argv.name).toEqual('recipe-name');
    });
    it('handles the ingredients argument', async () => {
      const inputA = ['', '', 'compose', 'name', 'a'];
      const inputB = ['', '', 'compose', 'name', 'a', 'b'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      expect(configA.argv.ingredients).toEqual(['a']);
      expect(configB.argv.ingredients).toEqual(['a', 'b']);
    });
    it('handles the --extend flag', async () => {
      const inputA = ['', '', 'compose', 'name', '--extend', 'a'];
      const inputB = ['', '', 'compose', 'name', '--e', 'a', 'b'];
      const inputC = ['', '', 'compose', 'name'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.extend).toEqual(['a']);
      expect(configB.argv.extend).toEqual(['a', 'b']);
      expect(configC.argv.extend).toEqual([]);
    });
    it('handles the --output flag', async () => {
      const inputA = ['', '', 'compose', 'name', '--output', 'p'];
      const inputB = ['', '', 'compose', 'name', '-o', 'p'];
      const inputC = ['', '', 'compose', 'name'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.output).toEqual('p');
      expect(configB.argv.output).toEqual('p');
      expect(configC.argv.output).toEqual('cwd');
    });
  });
  describe('global options', () => {
    it('handles the --dryRun flag', async () => {
      const inputA = ['', '', 'recipe-test', '--dryRun'];
      const inputB = ['', '', 'pick', 'a', '--dryRun'];
      const inputC = ['', '', 'compose', 'b', '--dryRun'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.dryRun).toEqual(true);
      expect(configB.argv.dryRun).toEqual(true);
      expect(configC.argv.dryRun).toEqual(true);
    });
    it('handles the --silent flag', async () => {
      const inputA = ['', '', 'recipe-test', '--silent'];
      const inputB = ['', '', 'pick', 'a', '--silent'];
      const inputC = ['', '', 'compose', 'b', '--silent'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.silent).toEqual(true);
      expect(configB.argv.silent).toEqual(true);
      expect(configC.argv.silent).toEqual(true);
    });
    it('handles the --noPrompt flag', async () => {
      const inputA = ['', '', 'recipe-test', '--noPrompt'];
      const inputB = ['', '', 'pick', 'a', '--noPrompt'];
      const inputC = ['', '', 'compose', 'b', '--noPrompt'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.noPrompt).toEqual(true);
      expect(configB.argv.noPrompt).toEqual(true);
      expect(configC.argv.noPrompt).toEqual(true);
    });
    it('handles the --debug flag', async () => {
      const inputA = ['', '', 'recipe-test', '--debug'];
      const inputB = ['', '', 'pick', 'a', '--debug'];
      const inputC = ['', '', 'compose', 'b', '--debug'];
      const configA = await parseArgv(inputA);
      const configB = await parseArgv(inputB);
      const configC = await parseArgv(inputC);
      expect(configA.argv.debug).toEqual(true);
      expect(configB.argv.debug).toEqual(true);
      expect(configC.argv.debug).toEqual(true);
    });
  });
  describe('--help', () => {
    it('generates usage information', async () => {
      const input = ['', '', '--help'];
      const { output } = await parseArgv(input);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for brew command', async () => {
      const input = ['', '', 'brew', '--help'];
      const { output } = await parseArgv(input);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for pick command', async () => {
      const input = ['', '', 'pick', '--help'];
      const { output } = await parseArgv(input);
      expect(output).toMatchSnapshot();
    });
    it('generates usage information for compose command', async () => {
      const input = ['', '', 'compose', '--help'];
      const { output } = await parseArgv(input);
      expect(output).toMatchSnapshot();
    });
  });
  describe('--version', () => {
    it('generates version information', async () => {
      const input = ['', '', '--version'];
      const { output } = await parseArgv(input);
      expect(output).toEqual(version);
    });
  });
});
