module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super('Unauthorized:')
    this.name = 'UnauthorizedError'
  }
}
