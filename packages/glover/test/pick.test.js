import glover from '../src';

describe('Tests for glover.pick', () => {
  it('runs', async () => {
    const runConfig = { command: 'pick' };
    await expect(glover.pick(runConfig)).resolves.toEqual({ command: 'pick' });
  });
});
