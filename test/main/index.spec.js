describe('Index', () => {
  test('Should call app listen', () => {
    jest.mock('../../src/main/config/app', () => ({
      listen (port, callback) {
        if (callback) {
          callback()
        }
      }
    }))
    const mock = jest.requireMock('../../src/main/config/app')
    const listen = jest.spyOn(mock, 'listen')
    require('../../src/main/index')
    expect(listen).toHaveBeenCalledTimes(1)
  })
})
