const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
}) // migrate
beforeEach(async () => {
  await db.seed.run()
}) // truncate and seed fresh data
afterAll(async () => {
  await db.destroy()
}) // disconnect from the db

describe('[GET] /resource', () => {
  test('gets all resources from the table', async () => {
    const res = await request(server).get('/resource')
    expect(res.body).toHaveLength(0)
    expect(res.body).toBeTruthy()
  })
  test('snapshot test', async () => {
    const res = await request(server).get('/resource')
    expect(res.body).toMatchSnapshot()
  })
})

describe('[POST] /resource', () => {
  test('responds with status code 201', async () => {
    const res = await request(server).post('/resource').send({
      name: 'Yellow Pages'
    })

    expect(res.status).toBe(201)
  })

  test('responds with newly created resource', async () => {
    const res = await request(server).post('/resource').send({
      name: 'Yellow Pages'
    })
    expect(res.body).toMatchObject({ id: 2, name: 'Yellow Pages'})
  })
})

describe('[DELETE] /resource', () => {
  test('responds with status code 200', async () => {
    
  })
})
