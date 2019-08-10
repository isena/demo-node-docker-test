'use strict'

const { Given, When, Then } = require('cucumber')
const expect = require('expect')

Given('The city id {int}', function (id) {
  this.setID(id)
})

Given('The latitude {float} and longitude {float}', function (latitude, longitude) {
  this.setCoordinate(latitude, longitude)
})

Given('There are no latitude and longitude', function () {})

When('I make a GET request to {string}', function (path, callback) {
  this.get(path, (response) => {
    this.setResponse(response)
    callback()
  })
})

Then('The response status code should be {int}', function (statusCode) {
  expect(this.response.statusCode).toBe(statusCode)
})

Then('The response property {string} should be {string}', function (name, country) {
  const body = JSON.parse(this.response.body)
  const result = body.data || body

  expect(result[name]).toBe(country)
})

Then('The response should be an array', function () {
  const body = JSON.parse(this.response.body)

  expect(Array.isArray(body.data)).toBe(true)
})

Then('The response should be not an empty array', function () {
  const body = JSON.parse(this.response.body)

  expect(body.data.length).toBeGreaterThan(0)
})
