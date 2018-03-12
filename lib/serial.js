'use strict'

const Accumulator = require('./accumulator')

/**
 * Execute an array of promises in series.
 * @async
 * @param {Array<Function>} tasks Async tasks that returns promises.
 * @returns {Promise<Object>} Promise with result
 */
async function serial (tasks) {
  const initial = Promise.resolve(new Accumulator())
  const accumulator = await tasks.reduce(serialReduce, initial)
  return accumulator.accumulated()
}

/**
 * Handle each task.
 * @param {Promise<Object>} prev Accumulated result
 * @param {Promise<Function>} next Next task in array
 * @returns {Promise<Object>}
 */
async function serialReduce (prev, next) {
  const accumulator = await prev
  try {
    const nextResolved = await next()
    accumulator.fulfilled(nextResolved)
  } catch (error) {
    accumulator.rejected(error)
  }
  return Promise.resolve(accumulator)
}

module.exports = serial
