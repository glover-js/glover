import * as options from '../../src/bin/options';

describe('Tests for options', () => {
  it('exposes the correct options', () => {
    expect(options).toMatchSnapshot();
  });
});
