'use strict'

require('dotenv').config()

const { setWorldConstructor } = require('cucumber')
const request = require('request')
const env = require('./env')

class CustomWorld {
  constructor () {
    this.endpoint = ''
    this.response = ''
  }

  get (callback) {
    const uri = `${env.BASE_URL}/${this.endpoint}`

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

  setEndpoint (endpoint) {
    this.endpoint = endpoint
  }

  setResponse (response) {
    this.response = response
  }
}

setWorldConstructor(CustomWorld)
