import gloverLogger from '../src';

describe('Tests for glover-logger', () => {
  test('setup', () => {
    expect(gloverLogger()).toEqual('glover-logger');
  });
});
