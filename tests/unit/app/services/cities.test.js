/* eslint-env jest */
'use strict'

const error = require('restify-errors')
const CitiesService = require('../../../../app/services/cities')
const cities = [
  {
    id: 2873891,
    name: 'Mannheim',
    country: 'DE',
    coord: {
      lon: 8.46472,
      lat: 49.488331
    }
  },
  {
    id: 2867310,
    name: 'Mutterstadt',
    country: 'DE',
    coord: {
      lon: 8.35611,
      lat: 49.441391
    }
  }
]
const citiesService = new CitiesService(error, cities)

describe('citiesService', () => {
  it('returns an object with a valid id', () => {
    expect(citiesService.getCity(2873891)).toMatchObject(
      {
        id: 2873891,
        name: 'Mannheim',
        country: 'DE',
        coord: { lon: 8.46472, lat: 49.488331 }
      }
    )
  })

  it('returns an error with an ivalid id', () => {
    expect(citiesService.getCity('invalid').body).toMatchObject(
      {
        code: 'NotFound',
        message: 'not found'
      }
    )
  })

  it('returns a list of cities with valid latitude and longitude', () => {
    const cities = citiesService.getCities(49.48, 8.46)
    expect(Array.isArray(cities)).toBe(true)
    expect(cities.length).toBeGreaterThan(0)
    expect(cities[0]).toHaveProperty('id', 'name', 'country', 'coord')
  })

  it('returns an empty list invalid latitude and longitude', () => {
    const cities = citiesService.getCities(999999, 999999)
    expect(Array.isArray(cities)).toBe(true)
    expect(cities.length).toEqual(0)
  })
})
