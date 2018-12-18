// @flow
import type { Command, Yargs } from 'types/Yargs';

export const brew: Command = {
  cmd: ['brew [recipe]', '$0'],
  desc: 'Brew a recipe',
  builder: (yargs: Yargs) => {
    yargs.positional('recipe', {
      type: 'string',
      describe: 'The recipe you want to brew',
    });
    yargs.option('skipInstall', {
      type: 'boolean',
      describe: 'Skip npm/yarn install',
      default: false,
    });
    yargs.option('skipIngredient', {
      type: 'array',
      describe: 'Skip ingredients in the recipe',
      default: [],
    });
    yargs.option('skipStep', {
      type: 'array',
      describe: 'Skip steps in the recipe',
      default: [],
    });
  },
};

export const pick: Command = {
  cmd: 'pick [ingredients...]',
  desc: 'Pick ingredients from a recipe',
  builder: (yargs: Yargs) => {
    yargs.positional('ingredients', {
      type: 'array',
      describe: 'The ingredients you want to pick',
    });
    yargs.option('prompt', {
      alias: 'p',
      type: 'boolean',
      describe: '',
      default: false,
    });
    yargs.option('output', {
      alias: 'o',
      type: 'string',
      describe: 'Output path',
      default: 'cwd',
    });
  },
};

export const compose: Command = {
  cmd: 'compose [name] [ingredients...]',
  desc: 'Compose a new recipe',
  builder: (yargs: Yargs) => {
    yargs.positional('name', {
      type: 'string',
      describe: 'The name of your recipe',
    });
    yargs.positional('ingredients', {
      type: 'array',
      describe: 'Ingredients you want to include in your recipe',
    });
    yargs.option('extend', {
      alias: 'e',
      type: 'array',
      describe: 'Recipe(s) you want to extend',
      default: [],
    });
    yargs.option('output', {
      alias: 'o',
      type: 'string',
      describe: 'Output path',
      default: 'cwd',
    });
  },
};

export function registerCommands(yargs: Yargs): void {
  const commands = [brew, pick, compose];
  commands.map((cmd: Command) => yargs.command(cmd.cmd, cmd.desc, cmd.builder));
}
