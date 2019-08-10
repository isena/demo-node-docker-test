'use strict'

class CitiesController {
  constructor (log, citiesService) {
    this.log = log
    this.citiesService = citiesService
  }

  getCity (req, res) {
    try {
      const { id } = req.params
      const result = this.citiesService.getCity(id)
      res.send(result)
    } catch (err) {
      this.log.error(err.message)
      res.send(err)
    }
  }

  getCities (req, res) {
    try {
      const { lat, lng } = req.query
      const result = this.citiesService.getCities(lat, lng)
      res.send(result)
    } catch (err) {
      this.log.error(err.message)
      res.send(err)
    }
  }
}

module.exports = CitiesController
