import gloverJest from '../src';

describe('Tests for glover-jest', () => {
  test('setup', () => {
    expect(gloverJest()).toEqual('glover-jest');
  });
});
