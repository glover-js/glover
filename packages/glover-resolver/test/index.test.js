import gloverResolver from '../src';

describe('Tests for glover-resolver', () => {
  test('setup', () => {
    expect(gloverResolver()).toEqual('glover-resolver');
  });
});
