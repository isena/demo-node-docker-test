'use strict'

function ServiceLocator () {
  this.dependencyMap = {}
  this.dependencyCache = {}
}

ServiceLocator.prototype.register = function (name, constructor) {
  if (typeof constructor !== 'function') {
    throw new Error(`${name}: constructor is not a function`)
  }

  if (!name) {
    throw new Error('Invalid depdendency name')
  }

  this.dependencyMap[name] = constructor
}

ServiceLocator.prototype.get = function (name) {
  if (this.dependencyMap[name] === undefined) {
    throw new Error(`${name}: Attempting to retrieve unknown dependency`)
  }

  if (typeof this.dependencyMap[name] !== 'function') {
    throw new Error(`${name}: constructor is not a function`)
  }

  if (this.dependencyCache[name] === undefined) {
    const dependencyConstructor = this.dependencyMap[name]
    const dependency = dependencyConstructor(this)
    if (dependency) {
      this.dependencyCache[name] = dependency
    }
  }

  return this.dependencyCache[name]
}

ServiceLocator.prototype.clear = function () {
  this.dependencyCache = {}
  this.dependencyMap = {}
}

module.exports = new ServiceLocator()
