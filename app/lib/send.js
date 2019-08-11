'use strict'

const formatSend = (req, res, body) => {
  const formatError = (res, body) => {
    const isClientError = res.statusCode >= 400 && res.statusCode < 500
    if (isClientError) {
      return {
        status: 'error',
        message: body.message,
        code: body.code
      }
    } else {
      const inDebugMode = process.env.NODE_ENV === 'development'

      return {
        status: 'error',
        message: inDebugMode ? body.message : 'Internal Server Error',
        code: inDebugMode ? body.code : 'INTERNAL_SERVER_ERROR',
        data: inDebugMode ? body.stack : undefined
      }
    }
  }

  const formatSuccess = (res, body) => body

  let response = (body instanceof Error) ? formatError(res, body) : formatSuccess(res, body)

  response = JSON.stringify(response)
  res.header('Content-Length', Buffer.byteLength(response))
  res.header('Content-Type', 'application/json')

  return response
}

module.exports = formatSend
