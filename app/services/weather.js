'use strict'

const request = require('request')
const config = require('../configs/configs')()

const responseError = (errors, response, message) => {
  const badError = new errors.BadRequestError()

  if (response.statusCode === 404) {
    message = 'not found'
    badError.code = 'NotFoundError'
  }

  badError.message = message
  badError.statusCode = response.statusCode

  return badError
}

class Service {
  constructor (errors) {
    this.errors = errors
  }

  get (id, result) {
    request(`${config.app.weatherAPI}?id=${id}&APPID=${config.app.weatherAPIKEY}`,
      (error, response) => {
        const body = JSON.parse(response.body)

        if (error) {
          result(error)
          return
        } else if (response.statusCode >= 400) {
          result(
            responseError(this.errors, response, body.message)
          )
          return
        }

        result(body)
      })
  }
}

module.exports = Service
