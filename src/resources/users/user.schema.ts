const Joi = require('joi');

module.exports = Joi.object.keys({
  name: Joi.String().required(),
  login: Joi.String().required(),
  password: Joi.String().required()
});
