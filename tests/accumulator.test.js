'use strict'

const { expect } = require('chai')
const Accumulator = require('../lib/accumulator')

describe('Unit: Accumulator', function () {
  describe('constructor', function () {
    it('should construct instance with initial success and errors', function () {
      const accumulator = new Accumulator()
      expect(accumulator.success_).to.be.an('array').that.be.empty
      expect(accumulator.errors_).to.be.an('array').that.be.empty
    })
  })
  describe('fulfilled', function () {
    it('should add item on success_ array', function () {
      const value = 'foo'
      const accumulator = new Accumulator()
      accumulator.fulfilled(value)
      expect(accumulator.success_).to.deep.equal([ value ])
    })
  })
  describe('rejected', function () {
    it('should add item on errors_ array', function () {
      const err = new Error()
      const accumulator = new Accumulator()
      accumulator.rejected(err)
      expect(accumulator.errors_).to.deep.equal([ err ])
    })
  })
  describe('accumulated', function () {
    const err = new Error()
    const value = 'foo'
    const accumulator = new Accumulator()
    accumulator.fulfilled(value)
    accumulator.rejected(err)
    const actual = accumulator.accumulated()
    expect(actual).to.have.all.keys([ 'success', 'errors' ])
    expect(actual.success).to.deep.equal([ value ])
    expect(actual.errors).to.deep.equal([ err ])
  })
})
