'use strict'

const host = process.env.APP_HOST || 'localhost'
const port = process.env.APP_PORT || 5000
const BASE_URL = `http://${host}:${port}`

console.log(`BASE_URL: ${BASE_URL}`)

exports.BASE_URL = BASE_URL
