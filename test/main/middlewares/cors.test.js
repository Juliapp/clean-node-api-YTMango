const app = require('../../../src/main/config/app')
const request = require('supertest')
describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })

    const response = await request(app).get('/test_cors')
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})
