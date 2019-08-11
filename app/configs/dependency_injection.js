'use strict'

const serviceLocator = require('../lib/service_locator')
const config = require('./configs')()

serviceLocator.register('logger', () =>
  require('../lib/logger').create(config.application_logging)
)

serviceLocator.register('httpStatus', () => require('http-status'))

serviceLocator.register('errors', () => require('restify-errors'))

serviceLocator.register('requests', () => require('request'))

serviceLocator.register('cities', () => require('../resources/city.list.json'))

serviceLocator.register('citiesService', (serviceLocator) => {
  const errors = serviceLocator.get('errors')
  const Service = require('../services/cities')

  return new Service(errors)
})

serviceLocator.register('weatherService', (serviceLocator) => {
  const errors = serviceLocator.get('errors')
  const requests = serviceLocator.get('requests')
  const Service = require('../services/weather')

  return new Service(errors, requests)
})

serviceLocator.register('citiesController', (serviceLocator) => {
  const log = serviceLocator.get('logger')
  const service = serviceLocator.get('citiesService')
  const Controller = require('../controllers/cities')

  return new Controller(log, service)
})

serviceLocator.register('weatherController', (serviceLocator) => {
  const log = serviceLocator.get('logger')
  const service = serviceLocator.get('weatherService')
  const Controller = require('../controllers/weather')

  return new Controller(log, service)
})

module.exports = serviceLocator
