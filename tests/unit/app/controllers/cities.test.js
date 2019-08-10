/* eslint-env jest */
'use strict'

const logger = { error: jest.fn() }
const req = {
  params: { id: 1 },
  query: { lat: 2, lng: 3 }
}
const Controller = require('../../../../app/controllers/cities')

describe('controller', () => {
  it('getCity calls res.send successfully', () => {
    const service = {
      getCity: _ => _
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.getCity(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(req.params.id)
  })

  it('getCity calls res.send with an error', () => {
    const error = new Error('message error')
    const service = {
      getCity: _ => {
        throw error
      }
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.getCity(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(error)
  })

  it('getCities calls res.send successfully', () => {
    const service = {
      getCities: (lat, lng) => lat + lng
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.getCities(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(req.query.lat + req.query.lng)
  })

  it('getCities calls res.send with an error', () => {
    const error = new Error('message error')
    const service = {
      getCities: _ => {
        throw error
      }
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.getCities(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(error)
  })
})
