'use strict'

module.exports.register = (server, serviceLocator) => {
  server.get(
    {
      path: '/cities/:id',
      name: 'Get City',
      validation: {
        params: require('../validations/get_city.js')
      }
    },
    (req, res, next) =>
      serviceLocator.get('citiesController').getCity(req, res, next)
  )
  server.get(
    {
      path: '/cities',
      name: 'Get City',
      validation: {
        query: require('../validations/get_cities.js')
      }
    },
    (req, res, next) =>
      serviceLocator.get('citiesController').getCities(req, res, next)
  )
}
