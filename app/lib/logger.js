'use strict'

const winston = require('winston')
const { format, transports } = winston
const CreateLogger = winston.createLogger
const { combine, timestamp, label, prettyPrint } = format

const createTransports = (config) => {
  const customTransports = []

  if (config.file) {
    customTransports.push(
      new transports.File({
        filename: config.file,
        level: config.level
      })
    )
  }

  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level
      })
    )
  }

  return customTransports
}

module.exports = {
  create: (config) => {
    return new CreateLogger({
      transports: createTransports(config),
      format: combine(
        label({ label: 'Demo - Weather' }),
        timestamp(),
        prettyPrint()
      )
    })
  }
}
