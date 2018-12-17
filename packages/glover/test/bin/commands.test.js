import { brew, pick, compose } from '../../src/bin/commands';

describe('Tests for commands', () => {
  describe('brew', () => {
    it('exposes the correct cmd and desc properties', () => {
      expect(brew.cmd).toEqual(['brew [recipe]', '$0']);
      expect(brew.desc).toEqual('Brew a recipe');
    });
    it('exposes a correct builder function', () => {
      const yargs = { positional: jest.fn(), option: jest.fn() };
      brew.builder(yargs);
      expect(yargs.positional.mock.calls).toMatchSnapshot();
      expect(yargs.option.mock.calls).toMatchSnapshot();
    });
  });
  describe('pick', () => {
    it('exposes the correct cmd and desc properties', () => {
      expect(pick.cmd).toEqual('pick [ingredients...]');
      expect(pick.desc).toEqual('Pick ingredients from a recipe');
    });
    it('exposes a correct builder function', () => {
      const yargs = { positional: jest.fn(), option: jest.fn() };
      pick.builder(yargs);
      expect(yargs.positional.mock.calls).toMatchSnapshot();
      expect(yargs.option.mock.calls).toMatchSnapshot();
    });
  });
  describe('compose', () => {
    it('exposes the correct cmd and desc properties', () => {
      expect(compose.cmd).toEqual('compose [name] [ingredients...]');
      expect(compose.desc).toEqual('compose a new recipe');
    });
    it('exposes a correct builder function', () => {
      const yargs = { positional: jest.fn(), option: jest.fn() };
      compose.builder(yargs);
      expect(yargs.positional.mock.calls).toMatchSnapshot();
      expect(yargs.option.mock.calls).toMatchSnapshot();
    });
  });
});
