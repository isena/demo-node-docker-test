'use strict'

require('dotenv').config()

const restify = require('restify')
const joi = require('@hapi/joi')

const config = require('./configs/configs')()
const dependencies = require('./configs/dependency_injection')
const validator = require('./lib/validator')
const errorHandler = require('./lib/error_handler')
const routes = require('./routes/routes')
const logger = dependencies.get('logger')
const server = restify.createServer({
  name: config.app.name,
  formatters: {
    'application/json': require('./lib/send')
  }
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({ mapParams: false }))

server.use(validator.paramValidation(logger, joi))

errorHandler.register(server)

routes.register(server, dependencies)

server.listen(config.app.port, () => {
  console.log(`${config.app.name} Server is running on port - 
    ${config.app.port}`)
})
