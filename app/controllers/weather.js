'use strict'

class Controller {
  constructor (log, service) {
    this.log = log
    this.service = service
  }

  get (req, res) {
    try {
      const { id } = req.params
      this.service.get(id, (result) => {
        res.send(result)
      })
    } catch (err) {
      this.log.error(err.message)
      res.send(err)
    }
  }
}

module.exports = Controller
