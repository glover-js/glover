// @flow
import type { Recipe } from 'types/Recipe';

import capitalize from './capitalize';

export default function getOnDenylistMessage(recipe: Recipe) {
  const type = capitalize(recipe.type);
  return `${type}: ${recipe.name} is included in the denylist`;
}
