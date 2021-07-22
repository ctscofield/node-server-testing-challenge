const express = require("express");

const server = express();

server.use(express.json());

//[GET]
server.get('/', (req, res, next) => {

})

//[POST]
server.post('/api', (req, res, next) => {

})

//[DELETE]
server.delete('/api/:id', (req, res, next) => {

})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
