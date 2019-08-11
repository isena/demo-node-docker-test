/* eslint-env jest */
'use strict'

const logger = { error: jest.fn() }
const req = {
  params: { id: 1 }
}
const Controller = require('../../../../app/controllers/weather')

describe('weather controller', () => {
  it('get calls res.send successfully', () => {
    const service = {
      get: (_, result) => result(_)
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.get(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(req.params.id)
  })

  it('get calls res.send with an error', () => {
    const error = new Error('message error')
    const service = {
      get: _ => {
        throw error
      }
    }

    const res = { send: jest.fn() }
    const controller = new Controller(logger, service)
    controller.get(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith(error)
  })
})
