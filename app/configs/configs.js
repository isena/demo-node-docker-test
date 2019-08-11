'use strict'

module.exports = () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT || 5000,
    environment: process.env.APPLICATION_ENV,
    logpath: process.env.LOG_PATH,
    weatherAPI: process.env.APP_WEATHER_API,
    weatherAPIKEY: process.env.APP_WEATHER_API_KEY
  },
  application_logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  }
})
