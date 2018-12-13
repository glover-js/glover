import gloverMock from '../src';

describe('Tests for glover-mock', () => {
  test('setup', () => {
    expect(gloverMock()).toEqual('glover-mock');
  });
});
