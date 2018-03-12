'use strict'

const { expect } = require('chai')
const parallel = require('../lib/parallel')
const { createPromise } = require('./helper')

describe('Unit: parallel', function () {
  describe('when all promises is fulfilled', function () {
    it('should return all promises result in success property', async function () {
      const first = 'first'
      const second = 'second'
      const promises = [ createPromise(first, 100), createPromise(second, 0) ]
      const actual = await parallel(promises)
      expect(actual.errors).to.be.an('array').that.be.empty
      // second should be first because the promise is settled first
      expect(actual.success).to.deep.equal([ second, first ])
    })
    describe('when all promises is rejected', function () {
      it('should return all promises result in error property', async function () {
        const e1 = new Error('foo')
        const e2 = new TypeError('bar')
        const promises = [ createPromise(e1, 100, true), createPromise(e2, 0, true) ]
        const actual = await parallel(promises)
        expect(actual.success).to.be.an('array').that.be.empty
        expect(actual.errors).to.deep.equal([ e2, e1 ])
      })
    })
    describe('when has fulfilled and rejected promises', function () {
      it('should return promises in property accordingly their result', async function () {
        const first = 'first'
        const second = 'second'
        const e1 = new Error('foo')
        const e2 = new TypeError('bar')
        const promises = [
          createPromise(e1, 100, true),
          createPromise(first, 100),
          createPromise(e2, 0, true),
          createPromise(second, 0)
        ]
        const actual = await parallel(promises)
        expect(actual.success).to.deep.equal([ second, first ])
        expect(actual.errors).to.deep.equal([ e2, e1 ])
      })
    })
  })
})
