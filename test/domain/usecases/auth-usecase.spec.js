const AuthUseCase = require('../../../src/domain/usecases/auth-usecase')
const { MissingParamError } = require('../../../src/presentation/utils/errors')
const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }

  const encrypterSpy = new EncrypterSpy()
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepository = new LoadUserByEmailRepository()

  loadUserByEmailRepository.user = {
    password: 'hashed_password'
  }

  const sut = new AuthUseCase(loadUserByEmailRepository, encrypterSpy)

  return {
    sut,
    loadUserByEmailRepository,
    encrypterSpy
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

  test('Should call loadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepository.email).toBe('any_email@mail.com')
  })

  test('Should throw if no loadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if loadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if no valid email is provided', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    loadUserByEmailRepository.user = null
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if invalid password is provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_email@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, loadUserByEmailRepository, encrypterSpy } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_password')
    expect(encrypterSpy.password).toBe('any_password')
    expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepository.user.password)
  })
})
