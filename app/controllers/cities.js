'use strict'

class Controller {
  constructor (log, service) {
    this.log = log
    this.service = service
  }

  getCity (req, res) {
    try {
      const { id } = req.params
      const result = this.service.getCity(id)
      res.send(result)
    } catch (err) {
      this.log.error(err.message)
      res.send(err)
    }
  }

  getCities (req, res) {
    try {
      const { lat, lng } = req.query
      const result = this.service.getCities(lat, lng)
      res.send(result)
    } catch (err) {
      this.log.error(err.message)
      res.send(err)
    }
  }
}

module.exports = Controller
