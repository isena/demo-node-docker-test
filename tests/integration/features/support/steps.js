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

When('I make a GET request to {string}', function (keyword, callback) {
  this.get(keyword, (response) => {
    this.setResponse(response)
    callback()
  })
})

Then('The response status code should be {int}', function (statusCode) {
  expect(this.response.statusCode).toBe(statusCode)
})

Then('The response property {string} should be {string}', function (name, country) {
  const body = JSON.parse(this.response.body)
  expect(body[name]).toBe(country)
})

Then('The response should be an array', function () {
  const body = JSON.parse(this.response.body)

  expect(Array.isArray(body)).toBe(true)
})

Then('The response should be not an empty array', function () {
  const body = JSON.parse(this.response.body)

  expect(body.length).toBeGreaterThan(0)
})
