'use strict'

require('dotenv').config()

const { setWorldConstructor } = require('cucumber')
const request = require('request')
const env = require('./env')

class CustomWorld {
  constructor () {
    this.id = ''
    this.queryParams = ''
    this.latitude = ''
    this.longitude = ''
  }

  get (path, callback) {
    const uri = this.id
      ? `${env.BASE_URL}/${path}/${this.id}`
      : `${env.BASE_URL}/${path}?lat=${this.latitude}&lng=${this.longitude}`

    request({
      url: uri,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' } },
    (error, response) => {
      if (error) {
        return callback(new Error(`Error on GET request to ${uri}: ${error.message}`))
      }
      callback(response)
    })
  }

  setID (id) {
    this.id = id
  }

  setCoordinate (latitude, longitude) {
    this.latitude = latitude
    this.longitude = longitude
  }

  setResponse (response) {
    this.response = response
  }
}

setWorldConstructor(CustomWorld)
