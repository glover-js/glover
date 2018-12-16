// @flow
import type { Recipe } from 'types/Recipe';

export default function getNotFoundMessage(
  recipe: Recipe,
  searchedLocally: boolean = false,
) {
  if (searchedLocally) {
    return `Could not find local ${recipe.type}: ${recipe.name}`;
  }
  return `Could not find ${recipe.type}: ${recipe.name}`;
}
