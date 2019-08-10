'use strict'

const { Given, When, Then } = require('cucumber')
const expect = require('expect')

Given('The city id {int}', function (id) {
  this.setID(id)
})

Given('The latitude {float} and longitude {float}', function (latitude, longitude) {
  this.setCoordinate(latitude, longitude)
})

When('I make a GET request to {string}', function (path, callback) {
  this.get(path, (response) => {
    expect(response.statusCode).toBe(200)
    this.setResponse(response)
    callback()
  })
})

Then('The response property {string} should be {string}', function (name, country) {
  const body = JSON.parse(this.response.body)
  expect(body.data[name]).toBe(country)
})

Then('The response should be an array', function () {
  const body = JSON.parse(this.response.body)
  expect(Array.isArray(body.data)).toBe(true)
})

Then('The response should be not an empty array', function () {
  const body = JSON.parse(this.response.body)
  expect(body.data.length).toBeGreaterThan(0)
})
