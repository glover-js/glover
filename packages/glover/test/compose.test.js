import glover from '../src';

describe('Tests for glover.compose', () => {
  it('runs', async () => {
    const runConfig = { command: 'compose' };
    await expect(glover.compose(runConfig)).resolves.toEqual({
      command: 'compose',
    });
  });
});
