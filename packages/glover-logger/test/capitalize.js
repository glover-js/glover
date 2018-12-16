import capitalize from '../src/capitalize';

describe('Tests for capitalize', () => {
  it('capitalizes the string', () => {
    expect([
      capitalize('test'),
      capitalize('Test'),
      capitalize('TEST'),
    ]).toEqual(['Test', 'Test', 'TEST']);
  });
});
