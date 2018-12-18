// @flow
export default class CommandNotFoundError extends Error {
  constructor(notFoundCommand: string) {
    super(`Error: ${notFoundCommand} is not a valid glover command`);
  }
}
