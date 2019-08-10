'use strict'

const joi = require('@hapi/joi')

module.exports = {
  lat: joi.number().precision(8).required(),
  lng: joi.number().precision(8).required()
}
