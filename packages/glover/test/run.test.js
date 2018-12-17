import glover from '../src';

describe('Tests for glover.run', () => {
  it('runs', async () => {
    const runConfig = { command: 'brew' };
    await expect(glover.run(runConfig)).resolves.toEqual('brew');
  });
});
