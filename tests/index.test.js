'use strict'

const { expect } = require('chai')

describe('Lib API', function () {
  it('should expose serillel api', function () {
    const lib = require('../lib')
    expect(lib.serial).to.be.a('Function')
    expect(lib.parallel).to.be.a('Function')
  })
})
