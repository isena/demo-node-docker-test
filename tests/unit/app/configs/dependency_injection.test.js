/* eslint-env jest */
'use strict'

const dependencies = require('../../../../app/configs/dependency_injection')

describe('dependencies', () => {
  it('has property dependencyMap', () =>
    expect(dependencies).toHaveProperty('dependencyMap')
  )

  it('dependecyMap propoerty links to objects', () => {
    Object.keys(dependencies.dependencyMap).map(
      _ => expect(typeof dependencies.get(_)).toBe('object')
    )
  })
})
