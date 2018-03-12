'use strict'

const { expect } = require('chai')
const serial = require('../lib/serial')
const { createPromise } = require('./helper')

describe('Unit: serial', function () {
  describe('when all promises is fulfilled', function () {
    it('should return all promises result in success property', async function () {
      const first = 'first'
      const second = 'second'
      const promises = [ createPromise(first, 0), createPromise(second, 0) ]
      const actual = await serial(promises)
      expect(actual.errors).to.be.an('array').that.be.empty
      expect(actual.success).to.deep.equal([ first, second ])
    })
  })
  describe('when all promises is rejected', function () {
    it('should return all promises result in error property', async function () {
      const e1 = new Error('foo')
      const e2 = new TypeError('bar')
      const promises = [ createPromise(e1, 0, true), createPromise(e2, 0, true) ]
      const actual = await serial(promises)
      expect(actual.success).to.be.an('array').that.be.empty
      expect(actual.errors).to.deep.equal([ e1, e2 ])
    })
  })
  describe('when has fulfilled and rejected promises', function () {
    it('should return promises in property accordingly their result', async function () {
      const first = 'first'
      const second = 'second'
      const e1 = new Error('foo')
      const e2 = new TypeError('bar')
      const promises = [
        createPromise(e1, 0, true),
        createPromise(first, 0),
        createPromise(e2, 0, true),
        createPromise(second, 0)
      ]
      const actual = await serial(promises)
      expect(actual.success).to.deep.equal([ first, second ])
      expect(actual.errors).to.deep.equal([ e1, e2 ])
    })
  })
})
