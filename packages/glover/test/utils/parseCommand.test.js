import parseCommand from '../../src/utils/parseCommand';

describe('Tests for parseCommand', () => {
  it('returns the parsed command from argv', () => {
    const argvA = { _: ['brew'] };
    const argvB = { _: ['pick'] };
    const argvC = { _: ['compose'] };
    expect(parseCommand(argvA)).toEqual('brew');
    expect(parseCommand(argvB)).toEqual('pick');
    expect(parseCommand(argvC)).toEqual('compose');
  });
  it('defaults to brew if it cannot parse the command from argv', () => {
    const argvA = { _: [''] };
    const argvB = { _: [] };
    expect(parseCommand(argvA)).toEqual('brew');
    expect(parseCommand(argvB)).toEqual('brew');
  });
  it('throws an error if the command is invalid', () => {
    const argv = { _: ['invalid-command'] };
    expect(() => parseCommand(argv)).toThrowErrorMatchingSnapshot();
  });
});
