'use strict'

const joi = require('@hapi/joi')

module.exports = {
  lat: joi.number().precision(8).required().error(errors => {
    return {
      message: 'lat/lng required'
    }
  }),
  lng: joi.number().precision(8).required().error(errors => {
    return {
      message: 'lat/lng required'
    }
  })
}
