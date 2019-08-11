/* eslint-env jest */
'use strict'

const errors = require('restify-errors')
const Service = require('../../../../app/services/weather')

describe('weather service', () => {
  it('returns an object', () => {
    const requests = (url, callback) =>
      callback(undefined, { body: '{"message":"body msg"}' })
    const requestResult = _ =>
      expect(_).toMatchObject({ message: 'body msg' })

    const service = new Service(errors, requests)
    service.get(1, requestResult)
  })

  it('returns an error', () => {
    const requests = (url, callback) =>
      callback(undefined, {
        body: '{"message":"not found"}',
        statusCode: 404
      })
    const requestResult = _ =>
      expect(_).toMatchObject({
        message: 'not found',
        code: 'NotFoundError',
        statusCode: 404,
        body: { code: 'BadRequest', message: '' }
      })

    const service = new Service(errors, requests)
    service.get(1, requestResult)
  })
})
