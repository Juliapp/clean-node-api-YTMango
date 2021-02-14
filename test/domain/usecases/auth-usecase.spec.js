const { MissingParamError } = require('../../../src/presentation/utils/errors')
class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    await this.loadUserByEmailRepository.load(email)
  }
}

const makeSut = () => {
  const sut = new AuthUseCase()
  return {
    sut
  }
}

describe('Auth UseCase', () => {
  test('Showld throw if no email is provided', async () => {
    const sut = makeSut().sut
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = makeSut().sut
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Showld call loadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepository {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const sut = new AuthUseCase(loadUserByEmailRepository)
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepository.email).toBe('any_email@mail.com')
  })
})
