const { MissingParamError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw MissingParamError('userId')
    }
    if (!accessToken) {
      throw MissingParamError('userId')
    }
    this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}
