const MongoDbHelper = require('../../../src/infra/helpers/mongo-helper')
const LoadUserByEmailRepository = require('../../../src/infra/repositories/load-user-by-email-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
  // CONFIGURAÇÕES DO BANCO

  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL)
    db = await MongoDbHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if no user is found', async () => {
    const { sut, userModel } = makeSut()

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_stage',
      password: 'hashed_password'
    })

    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })
})
