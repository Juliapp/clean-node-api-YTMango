module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('Unauthorized:')
    this.name = 'UnauthorizedError'
  }
}
