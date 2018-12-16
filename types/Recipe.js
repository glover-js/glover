// @flow
export type RecipeType = 'recipe' | 'generator';
export type Recipe = {
  name: string,
  type: RecipeType,
};
