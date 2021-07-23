const db = require("../data/dbConfig")
const Resource = require("./model")


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


describe('resources model', () => {

  describe('practice get', () => {
    test('get exists', async () => {
      const resource = await Resource.get()
      expect(resource).toHaveLength(0)
      expect(resource).toMatchObject([])
    })
  })

  describe('practice getById', () => {
    test('getById exists', async () => {
      const resource = await Resource.get()
      expect(resource).toHaveLength(0)
      expect(resource).toMatchObject([])
    })
  })

  describe('insert', () => {
    test('insert adds entry to resource table', async () => {
      const resource = { name: 'Wikipedia' }
      await Resource.insert(resource)
      const newEntry = await db('resource').where('id', 1).first()
      expect(newEntry).toMatchObject({ id: 1, name: "Wikipedia" })
    })
    test("It doesn't get rid of previous entry", async () => {
      const resource = { name: 'Wikipedia' }
      const newEntry = await Resource.insert(resource)
      expect(newEntry).toMatchObject({ id: 2, name: "Wikipedia" })
    })
  })

  describe('remove', () => {
    test('removes entry from resource table', async () => {
      const dell = [
        {id: 1, name: "Wikipedia"},
        {id: 2, name: "Wikipedia"},
        {id: 3, name: "Wikipedia"},
      ]
      const results = await Resource.remove(dell[2].id)
      const req = await Resource.getById(results)
      expect(req).toBeFalsy()
    })
    
  })

})

