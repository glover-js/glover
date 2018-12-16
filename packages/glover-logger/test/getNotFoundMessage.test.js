import getNotFoundMessage from '../src/getNotFoundMessage';

describe('Tests for getNotFoundMessage', () => {
  it('returns the correct message for recipes', () => {
    const recipe = { name: 'recipe-name', type: 'recipe' };
    const expected = 'Could not find recipe: recipe-name';
    const actual = getNotFoundMessage(recipe);
    expect(actual).toEqual(expected);
  });
  it('returns the correct message for generators', () => {
    const recipe = { name: 'generator-name', type: 'generator' };
    const expected = 'Could not find generator: generator-name';
    const actual = getNotFoundMessage(recipe);
    expect(actual).toEqual(expected);
  });
  it('returns the correct message when searchedLocally = true', () => {
    const recipe = { name: 'generator-name', type: 'generator' };
    const expected = 'Could not find local generator: generator-name';
    const actual = getNotFoundMessage(recipe, true);
    expect(actual).toEqual(expected);
  });
});
