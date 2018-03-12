'use strict'

/**
 *
 * @param {*} value
 * @param {Number} timeout
 * @param {Boolean} rejected Indicates if the promise should be rejected
 * @returns {Function} Function that creates the promise
 */
module.exports.createPromise = (value, timeout = 0, rejected = false) =>
  () => new Promise((resolve, reject) =>
    setTimeout(() => {
      if (rejected) {
        return reject(value)
      }
      resolve(value)
    }, timeout)
  )
