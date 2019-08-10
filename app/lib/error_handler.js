'use strict'

module.exports.register = (server) => {
  const httpStatusCodes = require('http-status')

  server.on('NotFound', (req, res) =>
    res.send(
      httpStatusCodes.NOT_FOUND,
      new Error('Method not Found', 'METHOD_NOT_IMPLEMENTED')
    )
  )

  server.on('MethodNotAllowed', (req, res) =>
    res.send(
      httpStatusCodes.METHOD_NOT_ALLOWED,
      new Error('Method not Allowed', 'METHOD_NOT_ALLOWED')
    )
  )

  server.on('restifyError', (req, res, err) =>
    res.send(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      new Error('Internal Server Error', 'INTERNAL_SERVER_ERROR')
    )
  )
}
