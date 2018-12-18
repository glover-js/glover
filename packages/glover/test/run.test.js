import glover from '../src';

describe('Tests for glover.run', () => {
  it('runs brew', async () => {
    const runConfig = { command: 'brew' };
    await expect(glover.run(runConfig)).resolves.toEqual({ command: 'brew' });
  });
  it('runs pick', async () => {
    const runConfig = { command: 'pick' };
    await expect(glover.run(runConfig)).resolves.toEqual({ command: 'pick' });
  });
  it('runs compose', async () => {
    const runConfig = { command: 'compose' };
    await expect(glover.run(runConfig)).resolves.toEqual({
      command: 'compose',
    });
  });
  it('rejects unknown commands', async () => {
    const runConfig = {
      command: 'unknown',
      rawArgv: ['', '', 'unknown', 'argument'],
    };
    await expect(glover.run(runConfig)).rejects.toThrowErrorMatchingSnapshot();
  });
});
