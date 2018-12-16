import getDeprecatedMessage from '../src/getDeprecatedMessage';

describe('Tests for getDeprecatedMessage', () => {
  it('returns the correct message for recipes', () => {
    const recipe = { name: 'recipe-name', type: 'recipe' };
    const expected = 'Recipe: recipe-name is deprecated';
    const actual = getDeprecatedMessage(recipe);
    expect(actual).toEqual(expected);
  });
  it('returns the correct message for generators', () => {
    const recipe = { name: 'generator-name', type: 'generator' };
    const expected = 'Generator: generator-name is deprecated';
    const actual = getDeprecatedMessage(recipe);
    expect(actual).toEqual(expected);
  });
});
