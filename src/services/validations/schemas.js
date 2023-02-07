const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addPassengerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(20).required(),
});

module.exports = {
  idSchema,
  addPassengerSchema,
};