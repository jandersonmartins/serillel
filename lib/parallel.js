'use strict'

const Accumulator = require('./accumulator')

/**
 * Execute an array of promises in parallel.
 * @async
 * @param {Array<Function>} tasks Async tasks that returns promises.
 * @returns {Promise<Object>} Promise with result
 */
function parallel (tasks) {
  return new Promise(resolve => {
    const accumulator = new Accumulator()
    const { length: total } = tasks
    let finished = 0

    tasks.forEach(async task => {
      try {
        accumulator.fulfilled(await task())
      } catch (error) {
        accumulator.rejected(error)
      }
      if (++finished === total) {
        resolve(accumulator.accumulated())
      }
    })
  })
}

module.exports = parallel
