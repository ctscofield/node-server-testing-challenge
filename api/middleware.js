const Person = require('../api/model')

async function validateUserId(req, res, next) {
  try {
    const resource = await Person.getById(req.params.id);
    if (!resource) {
      next({status: 404, message: "record not found"});
    } else {
      req.resource = resource;
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding record"
    })
  }
}

module.exports = {validateUserId}