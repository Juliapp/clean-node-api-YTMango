class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error()
    }
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
    expect(promise).rejects.toThrow()
  })
})
