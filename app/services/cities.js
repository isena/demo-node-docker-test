'use strict'

const geolib = require('geolib')
const dependencies = require('../configs/dependency_injection')
const cities = dependencies.get('cities')

const distance = (city, latitude, longitude) =>
  geolib.getDistance(
    { latitude: city.coord.lat, longitude: city.coord.lon },
    { latitude, longitude }
  )

class Service {
  constructor (errors) {
    this.errors = errors
  }

  getCity (id) {
    const city = cities.find(_ => _.id === parseInt(id))

    if (!city) {
      const error = new this.errors.NotFoundError(`not found`)
      error.code = 'NotFoundError'
      return error
    }

    return city
  }

  getCities (latitude, longitude) {
    const maxRadius = 10000
    return cities.filter(
      city => distance(city, latitude, longitude) <= maxRadius
    )
  }
}

module.exports = Service
