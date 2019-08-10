'use strict'

const serviceLocator = require('../lib/service_locator')
const config = require('./configs')()

serviceLocator.register('logger', () =>
  require('../lib/logger').create(config.application_logging)
)

serviceLocator.register('httpStatus', () => require('http-status'))

serviceLocator.register('errors', () => require('restify-errors'))

serviceLocator.register('cities', () => require('../resources/city.list.json'))

serviceLocator.register('citiesService', (serviceLocator) => {
  const errors = serviceLocator.get('errors')
  const CitiesService = require('../services/cities')

  return new CitiesService(errors)
})

serviceLocator.register('citiesController', (serviceLocator) => {
  const log = serviceLocator.get('logger')
  const citiesService = serviceLocator.get('citiesService')
  const CitiesController = require('../controllers/cities')

  return new CitiesController(log, citiesService)
})

module.exports = serviceLocator
