const db = require("../data/dbConfig")

module.exports = {
  insert,
  remove,
  getById,
  get
}

function get() {
  return db('resource')
}

function getById(id) {
  return db('resource').where('id', id).first()
}

async function insert(resource) {
  const [id] = await db('resource').insert(resource)
  return getById(id)
}

function remove(id) {
  return db('resource')
    .where('id', id)
    .del();
}