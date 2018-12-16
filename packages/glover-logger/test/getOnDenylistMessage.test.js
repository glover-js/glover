import getOnDenylistMessage from '../src/getOnDenylistMessage';

describe('Tests for getOnDenylistMessage', () => {
  it('returns the correct message for recipes', () => {
    const recipe = { name: 'recipe-name', type: 'recipe' };
    const expected = 'Recipe: recipe-name is included in the denylist';
    const actual = getOnDenylistMessage(recipe);
    expect(actual).toEqual(expected);
  });
  it('returns the correct message for generators', () => {
    const recipe = { name: 'generator-name', type: 'generator' };
    const expected = 'Generator: generator-name is included in the denylist';
    const actual = getOnDenylistMessage(recipe);
    expect(actual).toEqual(expected);
  });
});
