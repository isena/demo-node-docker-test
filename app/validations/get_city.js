'use strict'

const joi = require('@hapi/joi')

module.exports = {
  id: joi.number().integer().min(1).required()
}
