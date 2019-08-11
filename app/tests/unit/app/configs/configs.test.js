/* eslint-env jest */
'use strict'

const config = require('../../../../configs/configs')()

describe('config', () => {
  it('has property app', () =>
    expect(config).toHaveProperty('app'))

  it('has property application_logging', () =>
    expect(config).toHaveProperty('application_logging')
  )
})
