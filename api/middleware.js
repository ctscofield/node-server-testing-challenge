const Person = require('../api/model')

async function validateUserId(req, res, next) {
  try {
    const user = await Person.getById(req.params.id);
    if (!user) {
      next({status: 404, message: "record not found"});
    } else {
      req.user = user;
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding record"
    })
  }
}

module.exports = {validateUserId}