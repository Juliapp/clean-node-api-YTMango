const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unautorized-error copy')

// Design pattern Factory
const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCase = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCase)
  return {
    sut, authUseCase
  }
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut().sut // sut = sistem under test
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = makeSut().sut // sut = sistem under test
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = makeSut().sut // sut = sistem under test
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter() // sut = sistem under test
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCase } = makeSut() // sut = sistem under test
    // sut = sistem under test
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCase.email).toBe(httpRequest.body.email)
    expect(authUseCase.password).toBe(httpRequest.body.password)
  })
  /* 401 é usado quando o sustema não encontra o usuário
      403 o sistema reconhece o usuário mas ele vai fazer uma ação inválida
  */
  test('Should return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut() // sut = sistem under test
    // sut = sistem under test
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
})
