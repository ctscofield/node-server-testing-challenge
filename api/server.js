const express = require("express");
const {validateUserId} = require('./middleware')
const server = express();

server.use(express.json());

const Person = require("./model")

//[GET]
server.get('/resource', (req, res, next) => {
  Person.get()
  .then(resources => {
    res.status(200).json(resources)
  })
  .catch(next)
})

//[POST]
server.post('/resource', async (req, res, next) => {
  try {
    res.status(201).json(await Person.insert(req.body))
  } catch (err) {
    next(err)
  }
})

//[DELETE]
server.delete('/resource/:id', validateUserId, async (req, res, next) => {
  try {
    await Person.remove(req.params.id)
    res.json(req.resource)
  } catch (err) {
    next(err)
  }
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
