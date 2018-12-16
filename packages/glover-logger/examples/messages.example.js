const {
  Logger,
  getDeprecatedMessage,
  getNotFoundMessage,
  getOnDenylistMessage,
} = require('../dist/index.cjs');

const logger = new Logger();
const mockRecipe = { name: 'webapp', type: 'recipe' };

// Deprecation message
logger.error(getDeprecatedMessage(mockRecipe));

// Not found message
logger.error(getNotFoundMessage(mockRecipe));

// On denylist message
logger.error(getOnDenylistMessage(mockRecipe));
