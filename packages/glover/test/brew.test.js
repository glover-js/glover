import glover from '../src';

describe('Tests for glover.brew', () => {
  it('runs', async () => {
    const runConfig = { command: 'brew' };
    await expect(glover.brew(runConfig)).resolves.toEqual({ command: 'brew' });
  });
});
